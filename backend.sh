#! /bin/bash
# backend.sh

cd ./backend/go
go build -o go-backend.exe ./cmd/main.go 
./go-backend.exe --tls=true --grpc-port=8088 --http-port=9090 --log-level=-1  --log-time-format=2006-01-02T15:04:05.999999999Z07:00
