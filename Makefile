protoCompiler = navono007/proto-compiler:latest

generate:
	docker run -v `pwd -W`:/repo $(protoCompiler) \
		protoc -Irepo/proto -Irepo/third_party \
			--js_out=import_style=commonjs,binary:/repo/frontend/react-grpc/proto \
			--ts_out=service=true:/repo/frontend/react-grpc/proto \
			--go_out=plugins=grpc:/repo/backend/go/api \
			--grpc-gateway_out=logtostderr=true:/repo/backend/go/api \
			--swagger_out=logtostderr=true:/repo/proto/swagger \
		repo/proto/v1/ping_pong.proto

	docker run -v `pwd -W`:/repo $(protoCompiler) \
		protoc -Irepo/proto -Irepo/third_party \
			--js_out=import_style=commonjs,binary:/repo/frontend/react-grpc/proto \
			--ts_out=service=false:/repo/frontend/react-grpc/proto \
		repo/third_party/google/api/annotations.proto \
		repo/third_party/google/api/http.proto \
		repo/third_party/google/rpc/status.proto \
		repo/third_party/google/rpc/code.proto \
		repo/third_party/google/rpc/error_details.proto \
		repo/third_party/protoc-gen-swagger/options/annotations.proto \
		repo/third_party/protoc-gen-swagger/options/openapiv2.proto
