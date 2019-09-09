import React, { Component } from 'react';
import socketIOClient from 'socket.io-client';

class App extends Component {
    componentDidMount() {
        const socket = socketIOClient.connect('http://localhost:3000');
        socket.on("connection", data => console.log(data));
    }

    render() {
        return (
            <div>conn</div>
        );
    }
}

export default App;

