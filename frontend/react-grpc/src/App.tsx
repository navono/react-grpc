import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import { PingPongServiceClient, ServiceError } from '../proto/v1/ping_pong_pb_service';
import { PingRequest, PongResponse, ServerStreamPingPongRequest, ServerStreamPingPongResponse, 
  FetchPingCountRequest, FetchPingCountResponse } from '../proto/v1/ping_pong_pb';

const client = new PingPongServiceClient('http://localhost:8080');
// const client = new PingPongServiceClient('http://localhost:8443');

class App extends Component {
  rpcPingRequest = () => {
    // grpc.Code.
    const request = new PingRequest();
    request.setPing('Ping');

    client.pingPong(request, (err: ServiceError|null, res: PongResponse|null) => {
      if (err) {
        console.log(err);
        return;
      }

      console.log('rpc request ping get response: ', res!.getPong());
    });
  };

  streamPingRequest = () => {
    const request = new ServerStreamPingPongRequest();
    request.setPing('Ping');
    request.setPingCount(3);
    request.setPingInterval(2);

    const response = client.serverStreamPingPong(request);
    response.on('data', (msg: ServerStreamPingPongResponse) => {
      console.log('stream request ping get response: ', msg.getPong());
    });
    response.on('end', () => {
      console.log('stream end');
    })
  };

  rpcPingCountRequest = () => {
    const request = new FetchPingCountRequest();
    request.setApi('v1');

    client.fetchPingCount(request, (err: ServiceError|null, res: FetchPingCountResponse|null) => {
      if (err) {
        console.log(err);
        return;
      }

      console.log('rpc request pingCount get response: ', res!.getCount());
    });
  }

  httpPingCountRequest = () => {
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
        console.log('http request pingCount get response: ', myJson);
      })
      .catch((e) => {
        console.error(e);
      });
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <button style={{padding:10}} onClick={this.rpcPingRequest}>rpc request ping</button>
          <button style={{padding:10}} onClick={this.streamPingRequest}>stream request ping</button>
          <button style={{padding:10}} onClick={this.rpcPingCountRequest}>rpc request ping count</button>
          <button style={{padding:10}} onClick={this.httpPingCountRequest}>http request ping count</button>
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
