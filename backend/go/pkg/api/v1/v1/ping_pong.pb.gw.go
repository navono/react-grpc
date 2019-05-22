// Code generated by protoc-gen-grpc-gateway. DO NOT EDIT.
// source: v1/ping_pong.proto

/*
Package v1 is a reverse proxy.

It translates gRPC into RESTful JSON APIs.
*/
package v1

import (
	"context"
	"io"
	"net/http"

	"github.com/golang/protobuf/proto"
	"github.com/grpc-ecosystem/grpc-gateway/runtime"
	"github.com/grpc-ecosystem/grpc-gateway/utilities"
	"google.golang.org/grpc"
	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/grpclog"
	"google.golang.org/grpc/status"
)

var _ codes.Code
var _ io.Reader
var _ status.Status
var _ = runtime.String
var _ = utilities.NewDoubleArray

var (
	filter_PingPongService_FetchPingCount_0 = &utilities.DoubleArray{Encoding: map[string]int{}, Base: []int(nil), Check: []int(nil)}
)

func request_PingPongService_FetchPingCount_0(ctx context.Context, marshaler runtime.Marshaler, client PingPongServiceClient, req *http.Request, pathParams map[string]string) (proto.Message, runtime.ServerMetadata, error) {
	var protoReq FetchPingCountRequest
	var metadata runtime.ServerMetadata

	if err := runtime.PopulateQueryParameters(&protoReq, req.URL.Query(), filter_PingPongService_FetchPingCount_0); err != nil {
		return nil, metadata, status.Errorf(codes.InvalidArgument, "%v", err)
	}

	msg, err := client.FetchPingCount(ctx, &protoReq, grpc.Header(&metadata.HeaderMD), grpc.Trailer(&metadata.TrailerMD))
	return msg, metadata, err

}

// RegisterPingPongServiceHandlerFromEndpoint is same as RegisterPingPongServiceHandler but
// automatically dials to "endpoint" and closes the connection when "ctx" gets done.
func RegisterPingPongServiceHandlerFromEndpoint(ctx context.Context, mux *runtime.ServeMux, endpoint string, opts []grpc.DialOption) (err error) {
	conn, err := grpc.Dial(endpoint, opts...)
	if err != nil {
		return err
	}
	defer func() {
		if err != nil {
			if cerr := conn.Close(); cerr != nil {
				grpclog.Infof("Failed to close conn to %s: %v", endpoint, cerr)
			}
			return
		}
		go func() {
			<-ctx.Done()
			if cerr := conn.Close(); cerr != nil {
				grpclog.Infof("Failed to close conn to %s: %v", endpoint, cerr)
			}
		}()
	}()

	return RegisterPingPongServiceHandler(ctx, mux, conn)
}

// RegisterPingPongServiceHandler registers the http handlers for service PingPongService to "mux".
// The handlers forward requests to the grpc endpoint over "conn".
func RegisterPingPongServiceHandler(ctx context.Context, mux *runtime.ServeMux, conn *grpc.ClientConn) error {
	return RegisterPingPongServiceHandlerClient(ctx, mux, NewPingPongServiceClient(conn))
}

// RegisterPingPongServiceHandlerClient registers the http handlers for service PingPongService
// to "mux". The handlers forward requests to the grpc endpoint over the given implementation of "PingPongServiceClient".
// Note: the gRPC framework executes interceptors within the gRPC handler. If the passed in "PingPongServiceClient"
// doesn't go through the normal gRPC flow (creating a gRPC client etc.) then it will be up to the passed in
// "PingPongServiceClient" to call the correct interceptors.
func RegisterPingPongServiceHandlerClient(ctx context.Context, mux *runtime.ServeMux, client PingPongServiceClient) error {

	mux.Handle("GET", pattern_PingPongService_FetchPingCount_0, func(w http.ResponseWriter, req *http.Request, pathParams map[string]string) {
		ctx, cancel := context.WithCancel(req.Context())
		defer cancel()
		inboundMarshaler, outboundMarshaler := runtime.MarshalerForRequest(mux, req)
		rctx, err := runtime.AnnotateContext(ctx, mux, req)
		if err != nil {
			runtime.HTTPError(ctx, mux, outboundMarshaler, w, req, err)
			return
		}
		resp, md, err := request_PingPongService_FetchPingCount_0(rctx, inboundMarshaler, client, req, pathParams)
		ctx = runtime.NewServerMetadataContext(ctx, md)
		if err != nil {
			runtime.HTTPError(ctx, mux, outboundMarshaler, w, req, err)
			return
		}

		forward_PingPongService_FetchPingCount_0(ctx, mux, outboundMarshaler, w, req, resp, mux.GetForwardResponseOptions()...)

	})

	return nil
}

var (
	pattern_PingPongService_FetchPingCount_0 = runtime.MustPattern(runtime.NewPattern(1, []int{2, 0, 2, 1}, []string{"v1", "count"}, ""))
)

var (
	forward_PingPongService_FetchPingCount_0 = runtime.ForwardResponseMessage
)
