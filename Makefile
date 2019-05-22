generate:
	docker run -v `pwd -W`:/repo proto-compiler \
		protoc -Irepo/proto -Irepo/third_party \
			--js_out=import_style=commonjs,binary:/repo/frontend/react-grpc/proto \
			--ts_out=service=true:/repo/frontend/react-grpc/proto \
			--go_out=plugins=grpc:/repo/backend/go/pkg/api \
			--grpc-gateway_out=logtostderr=true:/repo/backend/go/pkg/api \
			--swagger_out=logtostderr=true:/repo/proto/swagger \
		repo/proto/v1/ping_pong.proto
