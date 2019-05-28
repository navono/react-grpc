import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import { PingPongServiceClient, ServiceError } from '../proto/v1/ping_pong_pb_service';
import { PingRequest, PongResponse, ServerStreamPingPongRequest, ServerStreamPingPongResponse } from '../proto/v1/ping_pong_pb';

const client = new PingPongServiceClient('http://localhost:8080');

class App extends Component {
  oneshotRPC = () => {
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

  streamResponse = () => {
    const request = new ServerStreamPingPongRequest();
    request.setPing('Ping');
    request.setPingCount(3);
    request.setPingInterval(2);

    const response = client.serverStreamPingPong(request);
    response.on('data', (msg: ServerStreamPingPongResponse) => {
      console.log('stream data: ', msg.getPong());
    });
    response.on('end', () => {
      console.log('stream end');
    })
  };

  httpRequest = () => {
    fetch('http://localhost:9090/v1/count', {
      // mode: 'cors',
      // method: "GET",
      headers: {
        // 'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      }
    })
      .then(function(response) {
        return response.json();
      })
      .then(function(myJson) {
        console.log(myJson);
      })
      .catch((e) => {
        console.error(e);
      });
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <button style={{padding:10}} onClick={this.oneshotRPC}>oneshot request</button>
          <button style={{padding:10}} onClick={this.streamResponse}>stream request</button>
          <button style={{padding:10}} onClick={this.httpRequest}>http request</button>
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
      </div>
    );
  }
}

export default App;
