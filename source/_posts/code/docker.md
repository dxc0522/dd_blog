---
title: Docker应用
authorDesc: 豆豆
categories: 开发
date: 2021-5-2 18:00:00
update: 2024-7-11 09:46:00
tags: 
  - Docker
  - 运维
---
### 基本命令

| 作用             | 命令                                                                                                                                                   | 参数                                                                                                                                                                                                     |
| :--------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 检查docker的版本 | `docker version`                                                                                                                                       | -                                                                                                                                                                                                        |
| 搜索镜像         | `docker search 镜像名字`                                                                                                                               | -                                                                                                                                                                                                        |
| 下载镜像         | `docker pull 镜像名字` <br/> **例:** `docker run learn/tutorial echo "hello word"`                                                                     | -                                                                                                                                                                                                        |
| 运行镜像         | `docker run -d --network my-network --name study-go -v \\User\\dou\\go_study\\go-study\\settings.yaml:/app/settings.yaml -p 6666:8888 study-go:latest` | -d  后台运行 <br/> --network my-network 指定网络 <br/> --name study-go 指定容器名称 <br/> -p 6666:8888 指定端口映射左为主机端口,右为容器内端口 <br/> -v 映射本地文件到容器内左侧为主机文件右侧为映射文件 |
| 查看所有容器     | `docker ps`                                                                                                                                            | -a 查看所有容器                                                                                                                                                                                          |
| 查看容器详情     | `docker inspect 容器名称/容器ID` <br/> **例:** `docker inspect study-go`                                                                               | -                                                                                                                                                                                                        |
| 查看所有镜像     | `docker images`                                                                                                                                        | -                                                                                                                                                                                                        |
| 发布镜像         | `docker push [镜像名]` <br/> **例:** `docker push learn/ping`                                                                                          | -                                                                                                                                                                                                        |
| 停止容器         | `docker stop 容器名`                                                                                                                                   | -                                                                                                                                                                                                        |
| 删除容器         | `docker container rm 容器名`                                                                                                                           | -                                                                                                                                                                                                        |
| 删除所有的容器   | `docker container prune`                                                                                                                               | -                                                                                                                                                                                                        |
| 删除所有的镜像   | `docker container image` <br/> **例:** `sudo docker rmi $(docker images -q)`                                                                           | -                                                                                                                                                                                                        |
| 进入容器         | `docker exec -it db3 /bin/sh`                                                                                                                          | 其中/bin/sh是容器内的文件                                                                                                                                                                                |

> 创建网络`docker create network --driver bridge my-network` 驱动分为bridge、host、none 

### Dockerfile
```Dockerfile
####### GoLang #######
FROM golang:1.21.6-alpine AS builder

LABEL stage=gobuilder

ENV CGO_ENABLED 0
ENV GOPROXY https://goproxy.cn,direct
RUN sed -i 's/dl-cdn.alpinelinux.org/mirrors.aliyun.com/g' /etc/apk/repositories

RUN apk update --no-cache && apk add --no-cache tzdata

WORKDIR /build

ADD go.mod .
ADD go.sum .
RUN go mod download
COPY . .
COPY app/etc /app/etc
RUN go build -ldflags="-s -w" -o /app/study-go app/app.go

# 空镜像仅用于运行go
FROM scratch
WORKDIR /app
COPY --from=builder /app/study-go /app/study-go
COPY --from=builder /app/etc /app/etc
CMD ["./study-go", "-f", "etc/app-prd.yaml"]
####### Web #######
FROM node:20.15.0 AS builder
WORKDIR /app
COPY . .
RUN npm i -g pnpm
RUN pnpm config set registry https://registry.npmmirror.com/
RUN pnpm i
RUN pnpm build

FROM scratch
WORKDIR /app
COPY --from=builder /app/dist ./
COPY --from=builder /app/nginx.conf ./

CMD [""]
####### Nginx #######
FROM nginx:alpine

COPY --from=builder /etc/ssl/certs/ca-certificates.crt /etc/ssl/certs/ca-certificates.crt
COPY --from=builder /usr/share/zoneinfo/Asia/Shanghai /usr/share/zoneinfo/Asia/Shanghai
ENV TZ Asia/Shanghai

COPY app/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
# 不可出现两个
CMD ["nginx", "-g", "daemon off;"]
```

### docker-compose
Compose 是用于定义和运行多容器 Docker 应用程序的工具。通过 Compose，您可以使用 YML 文件来配置应用程序需要的所有服务。然后，使用一个命令，就可以从 YML 文件配置中创建并启动所有服务。
#### 命令
docker-compose下的常用命令常用的列出
| 作用               | 命令                                   | 备注                                                                                                                                             |
| :----------------- | :------------------------------------- | :----------------------------------------------------------------------------------------------------------------------------------------------- |
| 运行容器           | `docker-compose up xxx`                | 详细下面展开                                                                                                                                     |
| 停止容器           | `docker-compose stop xxx`              | 默认按顺序停止,也可停止某个                                                                                                                      |
| 停止并删除容器     | `docker-compose down xxx`              |                                                                                                                                                  |
| 清理临时停止的容器 | `docker-compose down --remove-orphans` | 即已经停止但未被移除的容器                                                                                                                       |
| 清理未使用的镜像   | `docker-compose down --rmi 'local'`    | 停止并移除服务，并删除所有本地的镜像。--rmi 'local' 参数告诉 docker-compose 只删除本地的镜像，而不删除通过 build 或者 image 指令定义的远程镜像。 |
| 容器下执行命令     | `docker-compose exec xxx`              |                                                                                                                                                  |

docker-compose up 下常的常用参数
| 作用          | 命令                                  |
| :------------ | :------------------------------------ |
| 后台运行      | `-d`                                  |
| 重新build镜像 | `--build`                             |
| 重新创建容器  | `---force-recreate`                   |
| 指定某个服务  | **eg:**` docker-compose up study-go2` |

#### docker-compose.yml文件配置

```yaml
version: '3.7'

services:
  web: # 服务名称
    image: nginx:latest # 镜像和dockerfile存一个
    container_name: my_nginx_container # 容器名称
    ports: # 端口映射
      - "8080:80"
    volumes: # 文件映射
      - ./html:/usr/share/nginx/html
    build:
      context: ./web/admin-web # 上下文路径
      dockerfile: ./Dockerfile # 基于上下文路径的文件
    environment: # 环境变量
      - ENV_VAR=example
    networks: #网络
      - my_network
    depends_on: # 依赖关系 表明关联服务启动后才能启动该服务
      - mysql
  nginx:
      container_name: nginx
      image: nginx
      volumes:
        - ~/docker/nginx/html:/usr/share/nginx/html
        - ~/docker/nginx/conf/nginx.conf:/etc/nginx/nginx.conf
        - ~/docker/nginx/conf/conf.d:/etc/nginx/conf.d
        - ~/docker/nginx/logs:/var/log/nginx
      ports:
        - "80:80"
      networks:
        - public
      restart: always
      deploy:
        resources:
          limits:
            cpus: '0.2'
            memory: 20M
          reservations:
            cpus: '0.1'
            memory: 10M
  portainer:
    container_name: portainer
    image: portainer/portainer-ce:latest
    ports:
      - "9000:9000"
    volumes:
      - /var/run/docker.sock:/var/run/docker.sock # 操作docker
      - portainer_data:/data
    networks:
      - public
    restart: always
    deploy:
      resources:
        limits:
          cpus: '0.3'
          memory: 150M
        reservations:
          cpus: '0.2'
          memory: 100M
  mysql:
    container_name: mysql
    image: mysql
    ports:
      - "3306:3306"
    volumes:
      - mysql_data:/var/lib/mysql
    environment:
      - MYSQL_ROOT_PASSWORD=12345
    networks:
      - public
    restart: always
    deploy:
      resources:
        limits:
          cpus: '0.5'
          memory: 200M
        reservations:
          cpus: '0.3'
          memory: 100M
  jenkins:
    container_name: jenkins
    image: jenkins/jenkins:latest
    privileged: true
    ports:
      - "8080:8080"
    volumes:
      - jenkins_data:/var/jenkins_home # 持久化数据
      - jenkins_docker_certs:/certs/client # 持久化数据
      - /var/run/docker.sock:/var/run/docker.sock # 访问docker
      - /usr/local/bin/docker:/usr/bin/docker # 访问docker
    environment:
      - DOCKER_TLS_CERTDIR=/certs
    networks:
      - public
    user: root
    restart: always
    deploy:
      resources:
        limits:
          cpus: '0.5'
          memory: 200M
        reservations:
          cpus: '0.3'
          memory: 100M

networks:
  public: # 网络
    external: true # 外部网络

volumes:
  portainer_data: # 定义卷
    external: true # 外部卷
  mysql_data: 
  jenkins_data: 
  jenkins_docker_certs:
```

``` conf
server { # 对应web容器内配置, server 不可写localhost
    listen       8081;
    root /usr/share/nginx/html;
    index index.html;

    location / {
        try_files $uri /index.html;
    }
}
```
### 相关应用
#### 可视化工具 portainer

``` shell
docker pull portainer/portainer

docker run -d -p 9000:9000 --name portainer --restart always -v /var/run/docker.sock:/var/run/docker.sock -v portainer_data:/data swr.cn-north-1.myhuaweicloud.com/iivey/portainer-ce:2.1.1
```


## K8s基础

### K8s、Helm、Kubectl 之间的关系

Kubernetes（k8s）是用于容器编排和管理的开源平台，提供了对容器化应用程序的自动化部署、扩展和操作。
kubectl是用于与Kubernetes集群进行交互的命令行工具，可以执行各种操作来管理和控制Kubernetes集群中的资源。
Helm是一个Kubernetes的包管理工具，用于简化应用程序的部署和管理，通过Chart来定义和打包Kubernetes应用程序，以及提供了版本控制和便捷的升级功能。
kubectl 是对实例操作的工具; Helm是对打包模版的管理工具.

### 三大概念

Chart 代表着 Helm 包。它包含在 Kubernetes 集群内部运行应用程序，工具或服务所需的所有资源定义。你可以把它看作是 Homebrew formula，Apt dpkg，或 Yum RPM 在Kubernetes 中的等价物。

Repository（仓库） 是用来存放和共享 charts 的地方。它就像 Perl 的 CPAN 档案库网络 或是 Fedora 的 软件包仓库，只不过它是供 Kubernetes 包所使用的。

Release 是运行在 Kubernetes 集群中的 chart 的实例。一个 chart 通常可以在同一个集群中安装多次。每一次安装都会创建一个新的 release。以 MySQL chart为例，如果你想在你的集群中运行两个数据库，你可以安装该chart两次。每一个数据库都会拥有它自己的 release 和 release name。

在了解了上述这些概念以后，我们就可以这样来解释 Helm：

Helm 安装 charts 到 Kubernetes 集群中，每次安装都会创建一个新的 release。你可以在 Helm 的 chart repositories 中寻找新的 chart。

## 命令

### 集群操作

* 查看本地集群 `kubectl config get-contexts`
* 查看当前集群 `kubectl config current-context`
* 切换当前集群 `kubectl config use-context <context_name>`
* 查看集群状态 `kubectl cluster-info`
  
### 命令操作

* 查看release `helm list [--all]`
* 查看repo  `helm repo list`
* 增加新的repo `helm repo add dev https://example.com/dev-charts`
* 删除release `helm uninstall happy-panda`
* helm lint `helm lint`

#### 打包流程

1. 创建charts `helm create deis-workflow`
2. 打包chart  `helm package deis-workflow`
3. install chart `helm install deis-workflow ./deis-workflow-0.1.0.tgz`

[命令速查](https://helm.sh/zh/docs/intro/cheatsheet/)
