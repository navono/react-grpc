ARG GO_VERSION=1.12.4

FROM golang:${GO_VERSION}-alpine AS builder

# Install the Certificate-Authority certificates for the app to be able to make
# calls to HTTPS endpoints.
# Git is required for fetching the dependencies.
RUN apk add --no-cache ca-certificates git

WORKDIR  $PWD/.

ENV GO111MODULE=on CGO_ENABLED=0 GOOS=linux
# ENV GOPROXY=http://192.168.200.101:3000
# ENV GOPROXY="https://athens.azurefd.net"
ENV GOPROXY="https://gocenter.io"

# 设置代理，因为需要下载 google 的包
# ENV http_proxy=http://192.168.200.101:1080
# ENV https_proxy=http://192.168.200.101:1080

# 拷贝 mod 文件
COPY ./go.mod ./go.sum ./

# 下载依赖包
RUN go mod download

# 拷贝源文件
COPY ./ .

RUN go build -a -installsuffix cgo -v -o /go-backend ./cmd/main.go

FROM scratch

COPY --from=builder /go-backend /go-backend

ENTRYPOINT ["/go-backend"]
