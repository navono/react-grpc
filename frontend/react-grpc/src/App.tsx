import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import { PingPongServiceClient, ServiceError } from '../proto/v1/ping_pong_pb_service';
import { PingRequest, PongResponse } from '../proto/v1/ping_pong_pb';

const client = new PingPongServiceClient('http://localhost:8080');

class App extends Component {
  callRpcService = () => {
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

  callHTTPService = () => {
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
          <button style={{padding:10}} onClick={this.callRpcService}>rpc request</button>
          <button style={{padding:10}} onClick={this.callHTTPService}>http request</button>
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
