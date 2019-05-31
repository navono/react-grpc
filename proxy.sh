#! /bin/bash
# proxy.sh

cd ./proxy/grpcwebproxy
go build .
./grpcwebproxy.exe --backend_addr=127.0.0.1:8088 --backend_tls_noverify=true --run_tls_server=false --use_websockets=true --allow_all_origins
# ./grpcwebproxy.exe --backend_addr=127.0.0.1:8088 --allow_all_origins --server_tls_client_ca_files="../../conf/ca.pem" --server_tls_cert_file="../../conf/client/client.pem" --server_tls_key_file="../../conf/client/client.key"
