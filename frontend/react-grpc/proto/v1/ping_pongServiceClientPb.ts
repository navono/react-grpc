/**
 * @fileoverview gRPC-Web generated client stub for v1
 * @enhanceable
 * @public
 */

// GENERATED CODE -- DO NOT EDIT!


import * as grpcWeb from 'grpc-web';

import * as google_api_annotations_pb from '../google/api/annotations_pb';
import * as protoc$gen$swagger_options_annotations_pb from '../protoc-gen-swagger/options/annotations_pb';

import {
  PingRequest,
  PongResponse,
  fetchPingCountRequest,
  fetchPingCountResponse} from './ping_pong_pb';

export class PingPongServiceClient {
  client_: grpcWeb.AbstractClientBase;
  hostname_: string;
  credentials_: null | { [index: string]: string; };
  options_: null | { [index: string]: string; };

  constructor (hostname: string,
               credentials: null | { [index: string]: string; },
               options: null | { [index: string]: string; }) {
    if (!options) options = {};
    options['format'] = 'text';

    this.client_ = new grpcWeb.GrpcWebClientBase(options);
    this.hostname_ = hostname;
    this.credentials_ = credentials;
    this.options_ = options;
  }

  methodInfopingPong = new grpcWeb.AbstractClientBase.MethodInfo(
    PongResponse,
    (request: PingRequest) => {
      return request.serializeBinary();
    },
    PongResponse.deserializeBinary
  );

  pingPong(
    request: PingRequest,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.Error,
               response: PongResponse) => void) {
    return this.client_.rpcCall(
      this.hostname_ +
        '/v1.PingPongService/pingPong',
      request,
      metadata || {},
      this.methodInfopingPong,
      callback);
  }

  methodInfofetchPingCount = new grpcWeb.AbstractClientBase.MethodInfo(
    fetchPingCountResponse,
    (request: fetchPingCountRequest) => {
      return request.serializeBinary();
    },
    fetchPingCountResponse.deserializeBinary
  );

  fetchPingCount(
    request: fetchPingCountRequest,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.Error,
               response: fetchPingCountResponse) => void) {
    return this.client_.rpcCall(
      this.hostname_ +
        '/v1.PingPongService/fetchPingCount',
      request,
      metadata || {},
      this.methodInfofetchPingCount,
      callback);
  }

}

