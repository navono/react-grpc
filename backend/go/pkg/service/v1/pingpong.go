package v1

const (
	// apiVersion is version of API is provided by server
	apiVersion = "v1"
)

// pingPongServer is implementation of ping_pong proto interface
type pingPongServer struct {
	count int64;
}

// func NewPingPongServiceServer() v1.ToDoServiceServer {
// 	return &pingPongServer{}
// }

// func (s *pingPongServer) pingPong(req *v1.pingPongRequest) (*v1.pingPongResponse, error) {
// 	s.count++;
// }

// func (s *pingPongServer) fetchPingCount(req *v1.pingPongRequest) (*v1.pingPongResponse, error) {
	
// }