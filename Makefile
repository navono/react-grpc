proto = proto-compiler:0.1.0
proxy = grpcwebproxy:0.9.5

generate:
	docker run -v `pwd -W`:/repo $(proto) \
		protoc -Irepo/proto -Irepo/third_party \
			--js_out=import_style=commonjs,binary:/repo/frontend/react-grpc/proto \
			--ts_out=service=true:/repo/frontend/react-grpc/proto \
			--go_out=plugins=grpc:/repo/backend/go/pkg/api \
			--grpc-gateway_out=logtostderr=true:/repo/backend/go/pkg/api \
			--swagger_out=logtostderr=true:/repo/proto/swagger \
		repo/proto/v1/ping_pong.proto

	docker run -v `pwd -W`:/repo $(proto) \
		protoc -Irepo/proto -Irepo/third_party \
			--js_out=import_style=commonjs,binary:/repo/frontend/react-grpc/proto \
			--ts_out=service=false:/repo/frontend/react-grpc/proto \
		repo/third_party/google/api/annotations.proto \
		repo/third_party/google/api/http.proto \
		repo/third_party/protoc-gen-swagger/options/annotations.proto \
		repo/third_party/protoc-gen-swagger/options/openapiv2.proto

proto-compiler:
	docker build -t $(proto) -f ./proto/compiler/Dockerfile ./proto/compiler/

grpcwebproxy:
	docker build -t $(proxy) -f ./proxy/grpcwebproxy/Dockerfile ./proxy/grpcwebproxy/
