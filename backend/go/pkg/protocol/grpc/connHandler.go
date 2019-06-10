package grpc

import (
	"context"
	"google.golang.org/grpc/stats"
	"log"
	"sync"
)

var (
	connsMutex sync.Mutex
	conns      map[*stats.ConnTagInfo]string = make(map[*stats.ConnTagInfo]string)
)

//var connsMutex sync.Mutex
//var conns map[*stats.ConnTagInfo]string = make(map[*stats.ConnTagInfo]string)

type statsHandler struct{}

type connCtxKey struct{}

func newStatsHandler() stats.Handler {
	return &statsHandler{}
}

// TagConn 用来给连接打个标签，以此来标识连接(实在是找不出还有什么办法来标识连接).
// 这个标签是个指针，可保证每个连接唯一。
// 将该指针添加到上下文中去，键为 connCtxKey{}.
func (h *statsHandler) TagConn(ctx context.Context, info *stats.ConnTagInfo) context.Context {
	return context.WithValue(ctx, connCtxKey{}, info)
}

// TagRPC 为空.
func (h *statsHandler) TagRPC(ctx context.Context, info *stats.RPCTagInfo) context.Context {
	return ctx
}

// HandleConn 会在连接开始和结束时被调用，分别会输入不同的状态.
func (h *statsHandler) HandleConn(ctx context.Context, s stats.ConnStats) {
	tag, ok := getConnTagFromContext(ctx)
	if !ok {
		log.Fatal("can not get conn tag")
	}

	connsMutex.Lock()
	defer connsMutex.Unlock()

	switch s.(type) {
	case *stats.ConnBegin:
		conns[tag] = ""
		log.Printf("begin conn, tag = (%p)%#v, now connections = %d\n", tag, tag, len(conns))
	case *stats.ConnEnd:
		delete(conns, tag)
		log.Printf("end conn, tag = (%p)%#v, now connections = %d\n", tag, tag, len(conns))
	default:
		log.Printf("illegal ConnStats type\n")
	}
}

// HandleRPC 为空.
func (h *statsHandler) HandleRPC(ctx context.Context, s stats.RPCStats) {

}

func getConnTagFromContext(ctx context.Context) (*stats.ConnTagInfo, bool) {
	tag, ok := ctx.Value(connCtxKey{}).(*stats.ConnTagInfo)
	return tag, ok
}
