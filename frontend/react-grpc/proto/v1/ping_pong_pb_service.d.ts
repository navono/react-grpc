// package: v1
// file: v1/ping_pong.proto

import * as v1_ping_pong_pb from "../v1/ping_pong_pb";
import {grpc} from "@improbable-eng/grpc-web";

type PingPongServicepingPong = {
  readonly methodName: string;
  readonly service: typeof PingPongService;
  readonly requestStream: false;
  readonly responseStream: false;
  readonly requestType: typeof v1_ping_pong_pb.PingRequest;
  readonly responseType: typeof v1_ping_pong_pb.PongResponse;
};

type PingPongServicefetchPingCount = {
  readonly methodName: string;
  readonly service: typeof PingPongService;
  readonly requestStream: false;
  readonly responseStream: false;
  readonly requestType: typeof v1_ping_pong_pb.fetchPingCountRequest;
  readonly responseType: typeof v1_ping_pong_pb.fetchPingCountResponse;
};

type PingPongServiceserverStreamPingPong = {
  readonly methodName: string;
  readonly service: typeof PingPongService;
  readonly requestStream: false;
  readonly responseStream: true;
  readonly requestType: typeof v1_ping_pong_pb.ServerStreamPingPongRequest;
  readonly responseType: typeof v1_ping_pong_pb.ServerStreamPingPongResponse;
};

export class PingPongService {
  static readonly serviceName: string;
  static readonly pingPong: PingPongServicepingPong;
  static readonly fetchPingCount: PingPongServicefetchPingCount;
  static readonly serverStreamPingPong: PingPongServiceserverStreamPingPong;
}

export type ServiceError = { message: string, code: number; metadata: grpc.Metadata }
export type Status = { details: string, code: number; metadata: grpc.Metadata }

interface UnaryResponse {
  cancel(): void;
}
interface ResponseStream<T> {
  cancel(): void;
  on(type: 'data', handler: (message: T) => void): ResponseStream<T>;
  on(type: 'end', handler: () => void): ResponseStream<T>;
  on(type: 'status', handler: (status: Status) => void): ResponseStream<T>;
}
interface RequestStream<T> {
  write(message: T): RequestStream<T>;
  end(): void;
  cancel(): void;
  on(type: 'end', handler: () => void): RequestStream<T>;
  on(type: 'status', handler: (status: Status) => void): RequestStream<T>;
}
interface BidirectionalStream<ReqT, ResT> {
  write(message: ReqT): BidirectionalStream<ReqT, ResT>;
  end(): void;
  cancel(): void;
  on(type: 'data', handler: (message: ResT) => void): BidirectionalStream<ReqT, ResT>;
  on(type: 'end', handler: () => void): BidirectionalStream<ReqT, ResT>;
  on(type: 'status', handler: (status: Status) => void): BidirectionalStream<ReqT, ResT>;
}

export class PingPongServiceClient {
  readonly serviceHost: string;

  constructor(serviceHost: string, options?: grpc.RpcOptions);
  pingPong(
    requestMessage: v1_ping_pong_pb.PingRequest,
    metadata: grpc.Metadata,
    callback: (error: ServiceError|null, responseMessage: v1_ping_pong_pb.PongResponse|null) => void
  ): UnaryResponse;
  pingPong(
    requestMessage: v1_ping_pong_pb.PingRequest,
    callback: (error: ServiceError|null, responseMessage: v1_ping_pong_pb.PongResponse|null) => void
  ): UnaryResponse;
  fetchPingCount(
    requestMessage: v1_ping_pong_pb.fetchPingCountRequest,
    metadata: grpc.Metadata,
    callback: (error: ServiceError|null, responseMessage: v1_ping_pong_pb.fetchPingCountResponse|null) => void
  ): UnaryResponse;
  fetchPingCount(
    requestMessage: v1_ping_pong_pb.fetchPingCountRequest,
    callback: (error: ServiceError|null, responseMessage: v1_ping_pong_pb.fetchPingCountResponse|null) => void
  ): UnaryResponse;
  serverStreamPingPong(requestMessage: v1_ping_pong_pb.ServerStreamPingPongRequest, metadata?: grpc.Metadata): ResponseStream<v1_ping_pong_pb.ServerStreamPingPongResponse>;
}

