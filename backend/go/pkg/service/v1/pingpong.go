package v1

import (
	"context"
	"time"
	v1 "go-backend/pkg/api/v1"
	"github.com/golang/protobuf/ptypes"
	"github.com/golang/protobuf/ptypes/duration"
	"google.golang.org/grpc/status"
	"google.golang.org/grpc/codes"
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
		count: 0,
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

func (s *pingPongServer) ServerStreamPingPong(req *v1.ServerStreamPingPongRequest, srv v1.PingPongService_ServerStreamPingPongServer) error {
	d, err := ptypes.Duration(&duration.Duration{
		Seconds: int64(req.GetPingInterval()),
	})
	if err != nil {
		return status.Error(codes.InvalidArgument, "invalid duration")
	}

	for i := int32(0); i < req.GetPingCount(); i++ {
		select {
		case <-srv.Context().Done():
			return status.FromContextError(srv.Context().Err()).Err()
		case <-time.After(d):
		}
		err := srv.Send(&v1.ServerStreamPingPongResponse{
			Pong: "Pong",
		})
		if err != nil {
			return err
		}
	}
	return nil
}