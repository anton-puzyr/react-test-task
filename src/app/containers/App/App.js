import React, { Component } from 'react';
import socketIOClient from 'socket.io-client';

import LineChart from '../../components/LineChart';
import BarChart from '../../components/BarChart';
import './App.scss';

class App extends Component {
  state = {
    data: {},
    coordinatesLine: [],
    coordinatesBar: [],
    xRange: []
  };

  componentDidMount() {
    const socket = socketIOClient.connect('http://localhost:3000');
    socket.on('data', data => this.setState({ data }));

    const xRange = this.rangeBarCategories(-100, 100, 10);

    this.setState({ xRange });
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.data !== this.state.data) {
      const { data: { value, timestamp }, xRange } = this.state;

      /* Configure LineChart */
      const yLine = this.sanitizeData(value);
      const xLine = this.timestampToDate(timestamp);

      this.setState({
        coordinatesLine: [...prevState.coordinatesLine, { x: xLine, y: yLine }]
      });

      /* Configure BarChart */
      xRange.forEach(element => {
        if (this.isValueInRange(value, element[0], element[1])) {
          const coordinates = Object.assign({}, { x: element.join(' - '), y: value });
          this.setState({ coordinatesBar: [...prevState.coordinatesBar, coordinates] });
        }
      });
    }
  }

  sanitizeData = value => Math.round(value);

  timestampToDate = date => new Date(date);

  rangeBarCategories = (start, end, step = 1) => {
    let a = [];

    while (start < end) {
      a.push([start, start += step]);
    }

    return a;
  };

  isValueInRange = (x, min, max) => x >= min && x <= max;

  render() {
    const { coordinatesLine, coordinatesBar, xRange } = this.state;
    console.log(xRange);
    console.warn(coordinatesBar);
    return (
      <div className="app">
        <LineChart data={coordinatesLine} />
        <BarChart data={coordinatesBar} />
      </div>
    );
  }
}

export default App;

