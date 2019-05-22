package v1

import (
	"context"
	v1 "go-backend/pkg/api/v1"
)

const (
	// apiVersion is version of API is provided by server
	apiVersion = "v1"
)

// pingPongServer is implementation of ping_pong proto interface
type pingPongServer struct {
	count int64
}

// NewPingPongServiceServer creates pingPong service
func NewPingPongServiceServer() v1.PingPongServiceServer {
	return &pingPongServer{
		count: 1,
	}
}

func (s *pingPongServer) PingPong(_ context.Context, req *v1.PingRequest) (*v1.PongResponse, error) {
	s.count++

	return &v1.PongResponse{
		Pong: "Pong",
	}, nil
}

func (s *pingPongServer) FetchPingCount(_ context.Context, req *v1.FetchPingCountRequest) (*v1.FetchPingCountResponse, error) {
	return &v1.FetchPingCountResponse{
		Api:   apiVersion,
		Count: s.count,
	}, nil
}
