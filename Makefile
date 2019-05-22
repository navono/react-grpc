generate:
	docker run -v `pwd -W`:/repo proto-compiler \
		protoc -Irepo/proto -Irepo/third_party \
			--js_out=import_style=commonjs,binary:/repo/frontend/react-grpc/proto/ \
			--grpc-web_out=import_style=typescript,mode=grpcwebtext:/repo/frontend/react-grpc/proto/ \
			--go_out=plugins=grpc:/repo/backend/go/pkg/api/v1 \
		repo/proto/v1/ping_pong.proto
