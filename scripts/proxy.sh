d ../proxy/grpcwebproxy-0.9.5
go build .
./grpcwebproxy.exe --backend_addr=127.0.0.1:8088 --backend_tls_noverify=true --run_tls_server=false --use_websockets=true --allow_all_origins
