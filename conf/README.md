## CA

### 生成 key

> openssl genrsa -out ca.key 2048

### 生成密钥

> openssl req -new -x509 -days 7200 -key ca.key -out ca.pem

<!-- Country Name (2 letter code) [AU]:CN
State or Province Name (full name) [Some-State]:ZheJiang
Locality Name (eg, city) []:Hangzhou
Organization Name (eg, company) [Internet Widgits Pty Ltd]:SUPCON
Organizational Unit Name (eg, section) []:RD
Common Name (e.g. server FQDN or YOUR name) []:react-grpc
Email Address []: -->

## Server

### 生成 Key

> openssl ecparam -genkey -name secp384r1 -out server.key

### 生成 CSR(Cerificate Signing Request)

> openssl req -new -key server.key -out server.csr

### 基于 CA 签发私钥

> openssl x509 -req -sha256 -CA ca.pem -CAkey ca.key -CAcreateserial -days 3650 -in server.csr -out server.pem

## Client

### 生成 Key

> openssl ecparam -genkey -name secp384r1 -out client.key

### 生成 CSR(Cerificate Signing Request)

> openssl req -new -key client.key -out client.csr

### 基于 CA 签发私钥

> openssl x509 -req -sha256 -CA ca.pem -CAkey ca.key -CAcreateserial -days 3650 -in client.csr -out client.pem


## 知识点

### 证书标准

__X.509__ 这是一种证书标准，主要定义了证书中应该包含哪些内容。其详情可以参考 `RFC5280`，`SSL` 使用的就是这种证书标准。

### 编码格式

同样的 __X.509__ 证书，可能有不同的编码格式,目前有以下两种编码格式：
- __PEM__ - Privacy Enhanced Mail。打开看文本格式，以"-----BEGIN..."开头，"-----END..."结尾，内容是 BASE64 编码。查看 `PEM` 格式证书的信息：
  > openssl x509 -in certificate.pem -text -noout
 
  `Apache` 和 `*NIX` 服务器偏向于使用这种编码格式。

- __DER__ - Distinguished Encoding Rules，二进制格式，不可读。查看DER格式证书的信息：
  > openssl x509 -in certificate.der -inform der -text -noout
    
  `Java` 和 `Windows` 服务器偏向于使用这种编码格式。

### 扩展名

我们已经知道有 `PEM` 和 `DER` 这两种编码格式，但文件扩展名并不一定就叫 `PEM` 或者 `DER`，常见的扩展名除了 `PEM` 和 `DER` 还有以下这些，它们除了编码格式可能不同之外，内容也有差别，但大多数都能相互转换编码格式：

- __CRT__ - 应该是 `certificate` 的三个字母，其实还是证书的意思，常见于 `*NIX` 系统，有可能是 `PEM` 编码，也有可能是 `DER` 编码，大多数应该是 `PEM` 编码
- __CER__ - 还是 `certificate`，还是证书，常见于 `Windows` 系统，同样的，可能是 `PEM` 编码，也可能是 `DER` 编码，大多数应该是 `DER` 编码
- __KEY__ - 通常用来存放一个公钥或者私钥，并非 `X.509` 证书，编码同样的，可能是 `PEM`，也可能是 `DER`
- __CSR__ - Certificate Signing Request，即证书签名请求，这个并不是证书，而是向权威证书颁发机构获得签名证书的申请，其核心内容是一个公钥（当然还附带了一些别的信息），在生成这个申请的时候，同时也会生成一个私钥


### 证书编码的转换

- __PEM__ 转为 __DER__ 
  > openssl x509 -in cert.crt -outform der -out cert.der

- __DER__ 转为 __PEM__ 
  > openssl x509 -in cert.der -inform der -outform pem -out cert.pem

### 获得证书

- 向权威证书颁发机构申请
  
  用命令生成 `csr`: 
  > openssl req -newkey rsa:2048 -new -nodes -keyout my.key -out my.csr

  把 `csr` 交给权威证书颁发机构，权威证书颁发机构对此进行签名，完成。保留好 `csr`，当权威证书颁发机构颁发的证书过期的时候，还可以用同样的 `csr` 来申请新的证书，`key` 保持不变。

- 生成自签名的证书
  > openssl x509 -req -sha256 -CA ca.pem -CAkey ca.key -CAcreateserial -days 3650 -in client.csr -out client.pem

  在生成证书的过程中会要填一堆的东西，其实真正要填的只有 `Common Name`，通常填写服务器的域名，如 `yourcompany.com`，或者你服务器的 `IP` 地址，其它都可以留空。
