// package: v1
// file: v1/ping_pong.proto

var v1_ping_pong_pb = require("../v1/ping_pong_pb");
var grpc = require("@improbable-eng/grpc-web").grpc;

var PingPongService = (function () {
  function PingPongService() {}
  PingPongService.serviceName = "v1.PingPongService";
  return PingPongService;
}());

PingPongService.PingPong = {
  methodName: "PingPong",
  service: PingPongService,
  requestStream: false,
  responseStream: false,
  requestType: v1_ping_pong_pb.PingRequest,
  responseType: v1_ping_pong_pb.PongResponse
};

PingPongService.FetchPingCount = {
  methodName: "FetchPingCount",
  service: PingPongService,
  requestStream: false,
  responseStream: false,
  requestType: v1_ping_pong_pb.FetchPingCountRequest,
  responseType: v1_ping_pong_pb.FetchPingCountResponse
};

PingPongService.ServerStreamPingPong = {
  methodName: "ServerStreamPingPong",
  service: PingPongService,
  requestStream: false,
  responseStream: true,
  requestType: v1_ping_pong_pb.ServerStreamPingPongRequest,
  responseType: v1_ping_pong_pb.ServerStreamPingPongResponse
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
  var client = grpc.unary(PingPongService.PingPong, {
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

PingPongServiceClient.prototype.fetchPingCount = function fetchPingCount(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  var client = grpc.unary(PingPongService.FetchPingCount, {
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

PingPongServiceClient.prototype.serverStreamPingPong = function serverStreamPingPong(requestMessage, metadata) {
  var listeners = {
    data: [],
    end: [],
    status: []
  };
  var client = grpc.invoke(PingPongService.ServerStreamPingPong, {
    request: requestMessage,
    host: this.serviceHost,
    metadata: metadata,
    transport: this.options.transport,
    debug: this.options.debug,
    onMessage: function (responseMessage) {
      listeners.data.forEach(function (handler) {
        handler(responseMessage);
      });
    },
    onEnd: function (status, statusMessage, trailers) {
      listeners.end.forEach(function (handler) {
        handler();
      });
      listeners.status.forEach(function (handler) {
        handler({ code: status, details: statusMessage, metadata: trailers });
      });
      listeners = null;
    }
  });
  return {
    on: function (type, handler) {
      listeners[type].push(handler);
      return this;
    },
    cancel: function () {
      listeners = null;
      client.close();
    }
  };
};

exports.PingPongServiceClient = PingPongServiceClient;

