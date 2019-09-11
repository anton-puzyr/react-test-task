import React, { Component } from 'react';
import socketIOClient from 'socket.io-client';

import LineChart from '../../components/LineChart';
import BarChart from '../../components/BarChart';
import './App.scss';

class App extends Component {
  state = {
    data: {},
    coordinatesLine: [],
    coordinatesBar: []
  };

  componentDidMount() {
    const socket = socketIOClient.connect('http://localhost:3000');
    socket.on('data', data => this.setState({ data }));
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.data !== this.state.data) {
      const { data: { value, timestamp } } = this.state;

      const yLine = this.sanitizeData(value);
      const xLine = this.timestampToDate(timestamp);

      (() => {
        console.log(Math.round(value));
      })();

      this.setState({
        coordinatesLine: [...prevState.coordinatesLine, { x: xLine, y: yLine }]
      });
    }
  }

  sanitizeData = value => Math.round(value);

  timestampToDate = date => new Date(date);

  render() {
    const { coordinatesLine, coordinatesBar } = this.state;

    return (
      <div className="app">
        <LineChart data={coordinatesLine} />
        <BarChart data={coordinatesBar} />
      </div>
    );
  }
}

export default App;

