import React, { Component } from 'react';
import socketIOClient from 'socket.io-client';
import cogoToast from 'cogo-toast';

import LineChart from '../../components/LineChart';
import BarChart from '../../components/BarChart';
import Input from '../../components/shared/InputField';
import './App.scss';

class App extends Component {
  state = {
    data: {},
    coordinatesLine: [],
    coordinatesBar: [],
    xRange: [],
    inputValue: ''
  };

  componentDidMount() {
    const socket = socketIOClient.connect('http://localhost:3000');
    socket.on('data', data => this.setState({ data }));

    const xRange = this.rangeBarCategories(-100, 100, 10);

    this.setState({ xRange });
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.data !== this.state.data) {
      const { data: { value, timestamp }, xRange, coordinatesBar, inputValue } = this.state;

      this.updateLineChart(value, timestamp);
      this.showAlert(inputValue, value);
      this.calculateAmountOfNumbers(xRange, coordinatesBar, value);
    }
  }

  updateLineChart = (value, timestamp) => {
    const yLine = this.sanitizeData(value);
    const xLine = this.timestampToDate(timestamp);

    this.setState(prevState => ({
      coordinatesLine: [...prevState.coordinatesLine, { x: xLine, y: yLine }]
    }));
  };

  sanitizeData = value => Math.round(value);

  timestampToDate = date => {
    const dt = new Date(date);
    const formattedDate = `${dt.getDate()}/${dt.getMonth() + 1}/${dt.getFullYear()}`;
    const time = `${dt.getHours()}: ${dt.getMinutes()}: ${dt.getSeconds()}`;

    return `${formattedDate} ${time}`;
  };

  rangeBarCategories = (start, end, step = 1) => {
    let a = [];

    while (start < end) {
      a.push([start, start += step]);
    }

    return a;
  };

  isValueInRange = (x, min, max) => x >= min && x <= max;

  handleChange = e => this.setState({ inputValue: e.target.value });

  showAlert = (threshold, payload) => {
    if (threshold && threshold.length && payload > threshold) {
      cogoToast.warn(`Payload number is: ${payload.toFixed(2)}`, { position: 'top-right' });
    }
  };

  calculateAmountOfNumbers = (range, chartCoordinates, payload) => {
    range.forEach(element => {
      if (this.isValueInRange(payload, element[0], element[1])) {
        let coordinates = Object.assign({}, { x: element, y: payload });

        this.setState(prevState => ({ coordinatesBar: [...prevState.coordinatesBar, coordinates] }), () => {
          chartCoordinates.forEach((arr, index) => {
            if (arr.x === element) {
              let array = [...chartCoordinates];
              array.splice(index, 1, { x: element, y: arr.y + payload } );

              this.setState({ coordinatesBar: array });
            }
          });
        });
      }
    });
  };

  render() {
    const { coordinatesLine, coordinatesBar } = this.state;

    return (
      <div className="app">
        <div className="threshold">
          <div>
            <LineChart data={coordinatesLine} />
            <BarChart data={coordinatesBar} />
          </div>
          <div className="threshold__input-group">
            <label htmlFor="threshold">Alert threshold</label>
            <Input placeholder="Enter threshold" name="threshold" onChange={e => this.handleChange(e)} />
          </div>
        </div>
      </div>
    );
  }
}

export default App;

