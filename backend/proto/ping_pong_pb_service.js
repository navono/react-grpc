// package: pingpong
// file: ping_pong.proto

var ping_pong_pb = require("./ping_pong_pb");
var grpc = require("@improbable-eng/grpc-web").grpc;

var PingPongService = (function () {
  function PingPongService() {}
  PingPongService.serviceName = "pingpong.PingPongService";
  return PingPongService;
}());

PingPongService.pingPong = {
  methodName: "pingPong",
  service: PingPongService,
  requestStream: false,
  responseStream: false,
  requestType: ping_pong_pb.PingRequest,
  responseType: ping_pong_pb.PongResponse
};

exports.PingPongService = PingPongService;

function PingPongServiceClient(serviceHost, options) {
  this.serviceHost = serviceHost;
  this.options = options || {};
}

PingPongServiceClient.prototype.pingPong = function pingPong(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  var client = grpc.unary(PingPongService.pingPong, {
    request: requestMessage,
    host: this.serviceHost,
    metadata: metadata,
    transport: this.options.transport,
    debug: this.options.debug,
    onEnd: function (response) {
      if (callback) {
        if (response.status !== grpc.Code.OK) {
          var err = new Error(response.statusMessage);
          err.code = response.status;
          err.metadata = response.trailers;
          callback(err, null);
        } else {
          callback(null, response.message);
        }
      }
    }
  });
  return {
    cancel: function () {
      callback = null;
      client.close();
    }
  };
};

exports.PingPongServiceClient = PingPongServiceClient;

