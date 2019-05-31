#! /bin/bash
# proxy.sh

cd ./proxy/grpcwebproxy
go build .
# ./grpcwebproxy.exe --backend_addr=127.0.0.1:8088 \
#   --backend_tls_noverify=true \
#   --run_tls_server=false \
#   --use_websockets=true \
#   --allow_all_origins

./grpcwebproxy.exe --backend_addr=127.0.0.1:8088 \
  --allow_all_origins \
  --run_tls_server=false
  --backend_tls=true \
  --backend_tls_ca_files="conf/ca.pem" \
  --backend_client_tls_cert_file="conf/client/client.pem" \
  --backend_client_tls_key_file="conf/client/client.key"
