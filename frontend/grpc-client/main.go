package main

import (
	"context"
	"flag"
	"google.golang.org/grpc"
	"log"
	"reactGRPC/client/api/v1"
)

func main()  {
	// get configuration
	address := flag.String("server", "", "gRPC server in format host:port")
	flag.Parse()

	// Set up a connection to the server.
	conn, err := grpc.Dial(*address, grpc.WithInsecure())
	if err != nil {
		log.Fatalf("did not connect: %v", err)
	}
	defer conn.Close()

	client:= v1.NewPingPongServiceClient(conn)

	req := &v1.PingRequest{
		Ping: "ping",
	}
	res, err:=client.PingPong(context.Background(), req)
	if err != nil {
		log.Println(err)
		return
	}
	log.Printf("PingPong result: %v\n", res.GetPong())
}
