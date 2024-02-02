---
title: Go开发手册
authorDesc: 豆豆
categories: 开发
date: 2024-02-01 16:14:00
tags:
  - 后端
  - Go
---
## 环境安装
### g 工具安装

[https://github.com/voidint/g](https://github.com/voidint/g)
`curl -sSL https://raw.githubusercontent.com/voidint/g/master/install.sh | bash`
执行后手动source刷新下

### Gin服务模版

`https://github.com/jassue/jassue-gin`

### gen sql go struct

#### install gen tool

`go install github.com/starfishs/sql2struct@latest`

#### gen sql struct command

`sql2struct --dsn "mysql://root:123456@tcp(127.0.0.1:3306)/go_test?charset=utf8mb4&parseTime=True&loc=Local" -t "users" -t "table_test"`

### code gen 
[传送门](https://ldej.nl/post/generating-go-from-openapi-3/)
[oapi-codegen](https://github.com/deepmap/oapi-codegen)

### docker 

#### go

```Dockerfile
FROM golang:1.21

ARG MODULE_NAME
ENV MODULE_PATH=internal/${MODULE_NAME}

COPY go.mod go.sum  /app/
COPY vendor/ /app/vendor/
COPY internal/${MODULE_NAME}/ /app/${MODULE_PATH}
WORKDIR /app
RUN ls -al
WORKDIR /app/${MODULE_PATH}
RUN GOOS=linux GOARCH=amd64  go build main.go
CMD ["./main"]
EXPOSE 8888
```

COMMAND 
`docker build --build-arg MODULE_NAME=gin-study -t gin-study .`

#### web

```nginx.conf
server {
    listen 80;
    server_name dou.com;

    root /var/www/html/;
    index index.html;

    location / {
        try_files $uri /index.html;
    }
}
```

```Dockerfile
FROM nginx

ARG MODULE_NAME
COPY /${MODULE_NAME}/nginx.conf /etc/nginx/conf.d/default.conf
COPY /${MODULE_NAME}/dist/ /var/www/html/
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
```

COMMAND
1. `docker build --build-arg MODULE_NAME=vue-app -t vue-app .`
2. `docker run -d -p 80:80 --rm --name vue-app vue-app`
