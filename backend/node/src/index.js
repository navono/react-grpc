const path = require('path');
const grpc = require('grpc');

const pingPongProto = grpc.load(path.resolve(__dirname, '../proto/ping_pong.proto'));
const server = new grpc.Server();

server.addService(pingPongProto.pingpong.PingPongService.service, {
  pingPong: function(call, callback) {
    console.log("Request from ", call);
    return callback(null, { pong: "Pong" });
  }
});

server.bind('0.0.0.0:8088', grpc.ServerCredentials.createInsecure());
console.log('Start service at 0.0.0.0:8088');
server.start();
