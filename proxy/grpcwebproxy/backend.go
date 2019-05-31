package main

import (
	"crypto/tls"
	"crypto/x509"
	"io/ioutil"

	"github.com/mwitkow/grpc-proxy/proxy"
	"github.com/sirupsen/logrus"
	"github.com/spf13/pflag"
	"google.golang.org/grpc"
	"google.golang.org/grpc/credentials"
)

var (
	flagBackendHostPort = pflag.String(
		"backend_addr",
		"",
		"A host:port (IP or hostname) of the gRPC server to forward it to.")

	flagBackendIsUsingTLS = pflag.Bool(
		"backend_tls",
		false,
		"Whether the gRPC server of the backend is serving in plaintext (false) or over TLS (true).",
	)

	flagBackendTLSNoVerify = pflag.Bool(
		"backend_tls_noverify",
		false,
		"Whether to ignore TLS verification checks (cert validity, hostname). *DO NOT USE IN PRODUCTION*.",
	)

	flagBackendTLSClientCert = pflag.String(
		"backend_client_tls_cert_file",
		"",
		"Path to the PEM certificate used when the backend requires client certificates for TLS.")

	flagBackendTLSClientKey = pflag.String(
		"backend_client_tls_key_file",
		"",
		"Path to the PEM key used when the backend requires client certificates for TLS.")

	flagMaxCallRecvMsgSize = pflag.Int(
		"backend_max_call_recv_msg_size",
		1024*1024*4, // The current maximum receive msg size per https://github.com/grpc/grpc-go/blob/v1.8.2/server.go#L54
		"Maximum receive message size limit. If not specified, the default of 4MB will be used.",
	)

	flagBackendTLSCa = pflag.StringSlice(
		"backend_tls_ca_files",
		[]string{},
		"Paths (comma separated) to PEM certificate chains used for verification of backend certificates. If empty, host CA chain will be used.",
	)

	flagBackendDefaultAuthority = pflag.String(
		"backend_default_authority",
		"",
		"Default value to use for the HTTP/2 :authority header commonly used for routing gRPC calls through a backend gateway.",
	)

	flagBackendBackoffMaxDelay = pflag.Duration(
		"backend_backoff_max_delay",
		grpc.DefaultBackoffConfig.MaxDelay,
		"Maximum delay when backing off after failed connection attempts to the backend.",
	)
)

func dialBackendOrFail() *grpc.ClientConn {
	if *flagBackendHostPort == "" {
		logrus.Fatalf("flag 'backend_addr' must be set")
	}
	opt := []grpc.DialOption{}
	opt = append(opt, grpc.WithCodec(proxy.Codec()))

	if *flagBackendDefaultAuthority != "" {
		opt = append(opt, grpc.WithAuthority(*flagBackendDefaultAuthority))
	}

	if *flagBackendIsUsingTLS {
		opt = append(opt, grpc.WithTransportCredentials(credentials.NewTLS(buildBackendTLSOrFail())))
	} else {
		opt = append(opt, grpc.WithInsecure())
	}

	opt = append(opt,
		grpc.WithDefaultCallOptions(grpc.MaxCallRecvMsgSize(*flagMaxCallRecvMsgSize)),
		grpc.WithBackoffMaxDelay(*flagBackendBackoffMaxDelay),
	)

	cc, err := grpc.Dial(*flagBackendHostPort, opt...)
	if err != nil {
		logrus.Fatalf("failed dialing backend: %v", err)
	}
	return cc
}

func buildBackendTLSOrFail() *tls.Config {
	tlsConfig := &tls.Config{}
	tlsConfig.MinVersion = tls.VersionTLS12
	if *flagBackendTLSNoVerify {
		tlsConfig.InsecureSkipVerify = true
	} else {
		if len(*flagBackendTLSCa) > 0 {
			tlsConfig.RootCAs = x509.NewCertPool()
			for _, path := range *flagBackendTLSCa {
				data, err := ioutil.ReadFile(confPath(path))
				if err != nil {
					logrus.Fatalf("failed reading backend CA file %v: %v", path, err)
				}
				if ok := tlsConfig.RootCAs.AppendCertsFromPEM(data); !ok {
					logrus.Fatalf("failed processing backend CA file %v", path)
				}
			}
		}
	}
	if *flagBackendTLSClientCert != "" || *flagBackendTLSClientKey != "" {
		if *flagBackendTLSClientCert == "" {
			logrus.Fatal("flag 'backend_client_tls_cert_file' must be set when 'backend_client_tls_key_file' is set")
		}
		if *flagBackendTLSClientKey == "" {
			logrus.Fatal("flag 'backend_client_tls_key_file' must be set when 'backend_client_tls_cert_file' is set")
		}
		cert, err := tls.LoadX509KeyPair(confPath(*flagBackendTLSClientCert), confPath(*flagBackendTLSClientKey))
		if err != nil {
			logrus.Fatalf("failed reading TLS client keys: %v", err)
		}
		tlsConfig.Certificates = append(tlsConfig.Certificates, cert)
	}
	return tlsConfig
}
