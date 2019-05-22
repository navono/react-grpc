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

export class fetchPingCountRequest extends jspb.Message {
  getApi(): string;
  setApi(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): fetchPingCountRequest.AsObject;
  static toObject(includeInstance: boolean, msg: fetchPingCountRequest): fetchPingCountRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: fetchPingCountRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): fetchPingCountRequest;
  static deserializeBinaryFromReader(message: fetchPingCountRequest, reader: jspb.BinaryReader): fetchPingCountRequest;
}

export namespace fetchPingCountRequest {
  export type AsObject = {
    api: string,
  }
}

export class fetchPingCountResponse extends jspb.Message {
  getApi(): string;
  setApi(value: string): void;

  getCount(): number;
  setCount(value: number): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): fetchPingCountResponse.AsObject;
  static toObject(includeInstance: boolean, msg: fetchPingCountResponse): fetchPingCountResponse.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: fetchPingCountResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): fetchPingCountResponse;
  static deserializeBinaryFromReader(message: fetchPingCountResponse, reader: jspb.BinaryReader): fetchPingCountResponse;
}

export namespace fetchPingCountResponse {
  export type AsObject = {
    api: string,
    count: number,
  }
}

