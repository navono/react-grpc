// package: v1
// file: v1/ping_pong.proto

import * as jspb from "google-protobuf";
import * as google_api_annotations_pb from "../google/api/annotations_pb";
import * as protoc_gen_swagger_options_annotations_pb from "../protoc-gen-swagger/options/annotations_pb";

export class PingRequest extends jspb.Message {
  getPing(): string;
  setPing(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): PingRequest.AsObject;
  static toObject(includeInstance: boolean, msg: PingRequest): PingRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: PingRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): PingRequest;
  static deserializeBinaryFromReader(message: PingRequest, reader: jspb.BinaryReader): PingRequest;
}

export namespace PingRequest {
  export type AsObject = {
    ping: string,
  }
}

export class PongResponse extends jspb.Message {
  getPong(): string;
  setPong(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): PongResponse.AsObject;
  static toObject(includeInstance: boolean, msg: PongResponse): PongResponse.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: PongResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): PongResponse;
  static deserializeBinaryFromReader(message: PongResponse, reader: jspb.BinaryReader): PongResponse;
}

export namespace PongResponse {
  export type AsObject = {
    pong: string,
  }
}

export class FetchPingCountRequest extends jspb.Message {
  getApi(): string;
  setApi(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): FetchPingCountRequest.AsObject;
  static toObject(includeInstance: boolean, msg: FetchPingCountRequest): FetchPingCountRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: FetchPingCountRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): FetchPingCountRequest;
  static deserializeBinaryFromReader(message: FetchPingCountRequest, reader: jspb.BinaryReader): FetchPingCountRequest;
}

export namespace FetchPingCountRequest {
  export type AsObject = {
    api: string,
  }
}

export class FetchPingCountResponse extends jspb.Message {
  getApi(): string;
  setApi(value: string): void;

  getCount(): number;
  setCount(value: number): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): FetchPingCountResponse.AsObject;
  static toObject(includeInstance: boolean, msg: FetchPingCountResponse): FetchPingCountResponse.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: FetchPingCountResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): FetchPingCountResponse;
  static deserializeBinaryFromReader(message: FetchPingCountResponse, reader: jspb.BinaryReader): FetchPingCountResponse;
}

export namespace FetchPingCountResponse {
  export type AsObject = {
    api: string,
    count: number,
  }
}

export class ServerStreamPingPongRequest extends jspb.Message {
  getPing(): string;
  setPing(value: string): void;

  getPingCount(): number;
  setPingCount(value: number): void;

  getPingInterval(): number;
  setPingInterval(value: number): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ServerStreamPingPongRequest.AsObject;
  static toObject(includeInstance: boolean, msg: ServerStreamPingPongRequest): ServerStreamPingPongRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: ServerStreamPingPongRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ServerStreamPingPongRequest;
  static deserializeBinaryFromReader(message: ServerStreamPingPongRequest, reader: jspb.BinaryReader): ServerStreamPingPongRequest;
}

export namespace ServerStreamPingPongRequest {
  export type AsObject = {
    ping: string,
    pingCount: number,
    pingInterval: number,
  }
}

export class ServerStreamPingPongResponse extends jspb.Message {
  getPong(): string;
  setPong(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ServerStreamPingPongResponse.AsObject;
  static toObject(includeInstance: boolean, msg: ServerStreamPingPongResponse): ServerStreamPingPongResponse.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: ServerStreamPingPongResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ServerStreamPingPongResponse;
  static deserializeBinaryFromReader(message: ServerStreamPingPongResponse, reader: jspb.BinaryReader): ServerStreamPingPongResponse;
}

export namespace ServerStreamPingPongResponse {
  export type AsObject = {
    pong: string,
  }
}

