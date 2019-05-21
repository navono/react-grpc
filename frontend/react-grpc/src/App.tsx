import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import { PingPongServiceClient, ServiceError } from '../proto/ping_pong_pb_service';
import { PingRequest, PongResponse } from '../proto/ping_pong_pb';

const client = new PingPongServiceClient('http://localhost:8080');

class App extends Component {
  callService = () => {
    const request = new PingRequest();
    request.setPing('Ping');

    client.pingPong(request, (err: ServiceError|null, res: PongResponse|null) => {
      if (err) {
        console.log(err);
        return;
      }

      console.log(res!.getPong());
    });
  };

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.tsx</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
        <button style={{padding:10}} onClick={this.callService}>Click for grpc request</button>
      </div>
    );
  }
}

export default App;
