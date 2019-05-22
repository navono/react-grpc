package rest

import (
	"context"
	//"github.com/rs/cors"
	"net/http"
	"os"
	"os/signal"
	"time"

	"github.com/gorilla/handlers"

	v1 "go-backend/pkg/api/v1"

	"github.com/grpc-ecosystem/grpc-gateway/runtime"
	"go.uber.org/zap"
	"google.golang.org/grpc"

	"go-backend/pkg/logger"
	"go-backend/pkg/protocol/rest/middleware"
)

// RunServer runs HTTP/REST gateway
func RunServer(ctx context.Context, grpcPort, httpPort string) error {
	ctx, cancel := context.WithCancel(ctx)
	defer cancel()

	mux := runtime.NewServeMux()
	opts := []grpc.DialOption{grpc.WithInsecure()}
	if err := v1.RegisterPingPongServiceHandlerFromEndpoint(ctx, mux, "localhost:"+grpcPort, opts); err != nil {
		logger.Log.Fatal("failed to start HTTP gateway", zap.String("reason", err.Error()))
	}

	//handler := cors.New(cors.Options{
	//	AllowedOrigins: []string{"*"},
	//	AllowedHeaders: []string{"Content-Type", "Accept", "X-Requested-With", "access-control-allow-origin"},
	//}).Handler(mux)

	headersContentType := handlers.AllowedHeaders([]string{"Content-Type", "Access-Control-Allow-Origin"})
	handler := handlers.CORS(headersContentType)(mux)

	srv := &http.Server{
		Addr: ":" + httpPort,
		// add handler with middleware
		Handler: middleware.AddRequestID(
				middleware.AddLogger(logger.Log, handler)),
	}

	// graceful shutdown
	c := make(chan os.Signal, 1)
	signal.Notify(c, os.Interrupt)
	go func() {
		for range c {
			// sig is a ^C, handle it
			logger.Log.Warn("shutting down HTTP/REST server...")
		}

		_, cancel := context.WithTimeout(ctx, 5*time.Second)
		defer cancel()

		_ = srv.Shutdown(ctx)
	}()

	logger.Log.Info("starting HTTP/REST gateway...")
	return srv.ListenAndServe()
}
