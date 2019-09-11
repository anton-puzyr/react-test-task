import React, { Component } from 'react';
import socketIOClient from 'socket.io-client';

import LineChart from '../../components/LineChart';
import BarChart from '../../components/BarChart';
import './App.scss';

class App extends Component {
  state = {
    data: {}
  };

  componentDidMount() {
    const socket = socketIOClient.connect('http://localhost:3000');
    socket.on('data', data => this.setState({ data }));
  }

  render() {
    const { data } = this.state;

    return (
      <div className="app">
        <LineChart data={data} />
        <BarChart />
      </div>
    );
  }
}

export default App;

