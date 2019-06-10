package grpc

import (
	"context"
	"crypto/tls"
	"crypto/x509"
	"io/ioutil"
	"log"
	"net"
	"os"
	"os/signal"

	"google.golang.org/grpc"
	"google.golang.org/grpc/credentials"

	v1 "go-backend/api/v1"
	"go-backend/configs"
	"go-backend/pkg/logger"
	"go-backend/pkg/protocol/grpc/middleware"
)

// RunServer runs gRPC service to publish ToDo service
func RunServer(ctx context.Context, v1API v1.PingPongServiceServer, port string, tlsEnable bool) error {
	// gRPC server startup options
	opts := []grpc.ServerOption{}

	// add middleware
	opts = middleware.AddLogging(logger.Log, opts)

	if tlsEnable {
		// 从证书相关文件中读取和解析信息，得到证书公钥、密钥对
		cert, err := tls.LoadX509KeyPair(conf.Path("server/server.pem"), conf.Path("server/server.key"))
		if err != nil {
			log.Fatalf("tls.LoadX509KeyPair err: %v", err)
		}

		// 创建一个新的、空的 CertPool
		certPool := x509.NewCertPool()
		ca, err := ioutil.ReadFile(conf.Path("ca.pem"))
		if err != nil {
			log.Fatalf("ioutil.ReadFile err: %v", err)
		}

		// 尝试解析所传入的 PEM 编码的证书。如果解析成功会将其加到 CertPool 中，便于后面的使用
		if ok := certPool.AppendCertsFromPEM(ca); !ok {
			log.Fatalf("certPool.AppendCertsFromPEM err")
		}

		// 构建基于 TLS 的 TransportCredentials 选项
		tls := credentials.NewTLS(&tls.Config{
			Certificates: []tls.Certificate{cert},        // 设置证书链，允许包含一个或多个
			ClientAuth:   tls.RequireAndVerifyClientCert, // 要求必须校验客户端的证书
			ClientCAs:    certPool,                       // 设置根证书的集合，校验方式使用 ClientAuth 中设定的模式
		})

		opts = append(opts, grpc.Creds(tls))
	}

	opts = append(opts, grpc.StatsHandler(newStatsHandler()))
	// register service
	server := grpc.NewServer(opts...)
	v1.RegisterPingPongServiceServer(server, v1API)

	// graceful shutdown
	c := make(chan os.Signal, 1)
	signal.Notify(c, os.Interrupt)
	go func() {
		for range c {
			// sig is a ^C, handle it
			logger.Log.Warn("shutting down gRPC server...")

			server.GracefulStop()

			<-ctx.Done()
		}
	}()

	// start gRPC server
	logger.Log.Info("starting gRPC server...")
	//info := server.GetServiceInfo()

	listen, err := net.Listen("tcp", ":"+port)
	if err != nil {
		return err
	}
	return server.Serve(listen)
}
