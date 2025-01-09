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

### Docker

#### 基础配置

官方[网站](https://docs.docker.com/desktop/install/mac-install/)安装包无法下载, 下载镜像文件包[仓库](https://github.com/tech-shrimp/docker_installer/releases/)

docker-compose 在 mac 系统安装包内自带, 就在`~/.docker/cli-plugins/`文件夹内可能需要配置到$PATH

修改国内代理镜像服务器

```daemon.json
{"registry-mirrors": [
    "https://hub.icert.top",
    "https://ghcr.geekery.cn",
  ]
}
```

#### 基本命令

| 命令             | 描述                       | 示例                                     |
| ---------------- | -------------------------- | ---------------------------------------- |
| `docker run`     | 创建并启动一个容器         | `docker run -it ubuntu bash`             |
| `docker ps`      | 列出当前运行的容器         | `docker ps`                              |
| `docker ps -a`   | 列出所有容器，包括未运行的 | `docker ps -a`                           |
| `docker stop`    | 停止一个运行中的容器       | `docker stop [CONTAINER_ID]`             |
| `docker start`   | 启动一个已停止的容器       | `docker start [CONTAINER_ID]`            |
| `docker restart` | 重启容器                   | `docker restart [CONTAINER_ID]`          |
| `docker rm`      | 删除一个或多个容器         | `docker rm [CONTAINER_ID]`               |
| `docker pull`    | 从仓库拉取一个镜像         | `docker pull ubuntu`                     |
| `docker images`  | 列出本地存储的镜像         | `docker images`                          |
| `docker rmi`     | 删除一个或多个镜像         | `docker rmi [IMAGE_ID]`                  |
| `docker build`   | 从 Dockerfile 构建镜像     | `docker build -t my-image:tag .`         |
| `docker exec`    | 在运行的容器中执行命令     | `docker exec -it [CONTAINER_ID] bash`    |
| `docker logs`    | 获取容器的日志             | `docker logs [CONTAINER_ID]`             |
| `docker commit`  | 从修改过的容器创建新的镜像 | `docker commit [CONTAINER_ID] new-image` |
| `docker inspect` | 获取容器或镜像的详细信息   | `docker inspect [CONTAINER_ID/IMAGE_ID]` |
| `docker network` | 管理 Docker 网络           | `docker network ls`                      |
| `docker version` | 检查 Docker 的版本         | `docker version`                         |

#### 镜像管理指令

| 命令             | 描述                         | 示例                                          |
| ---------------- | ---------------------------- | --------------------------------------------- |
| `docker search`  | 搜索镜像                     | `docker search 镜像名字`                      |
| `docker images`  | 列出本地的所有镜像           | `docker images`                               |
| `docker pull`    | 从镜像仓库拉取指定的镜像     | `docker pull ubuntu:18.04`                    |
| `docker push`    | 将本地镜像推送到镜像仓库     | `docker push myrepo/myimage:tag`              |
| `docker rmi`     | 删除一个或多个本地存储的镜像 | `docker rmi ubuntu`                           |
| `docker build`   | 使用 Dockerfile 构建新的镜像 | `docker build -t myimage .`                   |
| `docker history` | 显示镜像的历史信息           | `docker history myimage`                      |
| `docker inspect` | 显示镜像的详细信息           | `docker inspect ubuntu`                       |
| `docker tag`     | 为镜像添加一个新的标签       | `docker tag ubuntu:18.04 myubuntu:latest`     |
| `docker save`    | 将镜像保存为 tar 归档文件    | `docker save myimage > myimage.tar`           |
| `docker load`    | 从 tar 归档文件加载镜像      | `docker load < myimage.tar`                   |
| `docker import`  | 从归档文件创建镜像           | `docker import mycontainer.tar myimage`       |
| `docker export`  | 将容器快照导出为归档文件     | `docker export mycontainer > mycontainer.tar` |
| `docker create`  | 创建一个新容器但不启动它     | `docker create ubuntu:18.04`                  |
| `docker commit`  | 从容器创建镜像               | `docker commit mycontainer mynewimage`        |
| `docker rmi`     | 删除所有的镜像               | `sudo docker rmi $(docker images -q)`         |

#### 容器管理指令

| 命令                     | 描述                                  | 示例                                           |
| ------------------------ | ------------------------------------- | ---------------------------------------------- |
| `docker run`             | 创建一个新容器并运行一个命令          | `docker run -it ubuntu /bin/bash`              |
| `docker ps`              | 列出当前运行中的容器                  | `docker ps`                                    |
| `docker ps -a`           | 列出所有容器，包括未运行的            | `docker ps -a`                                 |
| `docker stop`            | 停止一个或多个运行中的容器            | `docker stop [CONTAINER_ID]`                   |
| `docker start`           | 启动一个或多个已停止的容器            | `docker start [CONTAINER_ID]`                  |
| `docker restart`         | 重启一个或多个容器                    | `docker restart [CONTAINER_ID]`                |
| `docker kill`            | 立即终止容器的运行                    | `docker kill [CONTAINER_ID]`                   |
| `docker rm`              | 删除一个或多个容器                    | `docker rm [CONTAINER_ID]`                     |
| `docker exec`            | 在运行的容器中执行命令                | `docker exec -it [CONTAINER_ID] /bin/bash`     |
| `docker attach`          | 连接到正在运行的容器                  | `docker attach [CONTAINER_ID]`                 |
| `docker cp`              | 从容器中复制文件/目录到主机，反之亦然 | `docker cp [CONTAINER_ID]:/path/to/file /dest` |
| `docker logs`            | 获取容器的日志                        | `docker logs [CONTAINER_ID]`                   |
| `docker container prune` | 删除所有的容器                        | `docker container prune`                       |

#### 数据管理与卷指令

| 命令                    | 描述                         | 示例                                                                                                        |
| ----------------------- | ---------------------------- | ----------------------------------------------------------------------------------------------------------- |
| `docker volume create`  | 创建一个新的卷               | `docker volume create my_volume`                                                                            |
| `docker volume ls`      | 列出所有卷                   | `docker volume ls`                                                                                          |
| `docker volume inspect` | 显示指定卷的详细信息         | `docker volume inspect my_volume`                                                                           |
| `docker volume rm`      | 删除一个或多个卷             | `docker volume rm my_volume`                                                                                |
| `docker volume prune`   | 删除所有未使用的卷           | `docker volume prune`                                                                                       |
| `docker cp`             | 从主机复制文件到容器，或反之 | `docker cp foo.txt mycontainer:/foo.txt`                                                                    |
| `docker create`         | 创建一个新容器，用于数据卷   | `docker create -v /dbdata --name dbstore training/postgres`                                                 |
| `docker run -v`         | 在运行容器时挂载卷           | `docker run -d -P --name web -v /webapp training/webapp app.py`                                             |
| `docker run --mount`    | 使用更详细的挂载配置运行容器 | `docker run --mount source=my_volume,target=/data my_image`                                                 |
| `docker service create` | 在服务中使用卷               | `docker service create --replicas=1 --name my_service --mount type=volume,src=my_volume,dst=/data my_image` |

#### 网络配置指令

| 命令                        | 描述                         | 示例                                                    |
| --------------------------- | ---------------------------- | ------------------------------------------------------- |
| `docker network create`     | 创建一个新的网络             | `docker network create --driver bridge my_network`      |
| `docker network ls`         | 列出所有网络                 | `docker network ls`                                     |
| `docker network rm`         | 删除一个或多个网络           | `docker network rm my_network`                          |
| `docker network inspect`    | 显示一个或多个网络的详细信息 | `docker network inspect my_network`                     |
| `docker network connect`    | 连接一个容器到网络           | `docker network connect my_network my_container`        |
| `docker network disconnect` | 断开容器与网络的连接         | `docker network disconnect my_network my_container`     |
| `docker run --network`      | 在特定网络下运行一个新的容器 | `docker run --network=my_network my_image`              |
| `docker network prune`      | 删除所有未使用的网络         | `docker network prune`                                  |
| `docker service create`     | 在特定网络下创建一个服务     | `docker service create --network my_network my_service` |

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

####### Nginx #######
FROM nginx:alpine

COPY --from=builder /etc/ssl/certs/ca-certificates.crt /etc/ssl/certs/ca-certificates.crt
COPY --from=builder /usr/share/zoneinfo/Asia/Shanghai /usr/share/zoneinfo/Asia/Shanghai
ENV TZ Asia/Shanghai

WORKDIR /app

COPY --from=builder /app/dist /usr/share/nginx/html
COPY --from=builder /app/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
# 不可出现两个
CMD ["nginx", "-g", "daemon off;"]
```

### docker-compose

Compose 是用于定义和运行多容器 Docker 应用程序的工具。通过 Compose，您可以使用 YML 文件来配置应用程序需要的所有服务。然后，使用一个命令，就可以从 YML 文件配置中创建并启动所有服务。

#### 命令

docker-compose 下的常用命令常用的列出

| 作用               | 命令                                   | 备注                                   |
| :----------------- | :------------------------------------- | :------------------------------------- |
| 运行容器           | `docker-compose up xxx`                | 详细下面展开                           |
| 停止容器           | `docker-compose stop xxx`              | 默认按顺序停止,也可停止某个            |
| 停止并删除容器     | `docker-compose down xxx`              | 停止容器                               |
| 清理临时停止的容器 | `docker-compose down --remove-orphans` | 即已经停止但未被移除的容器             |
| 清理未使用的镜像   | `docker-compose down --rmi 'local'`    | 停止并移除服务，并删除所有本地的镜像。 |
| 容器下执行命令     | `docker-compose exec xxx`              | 进入容器命令                           |

docker-compose up 下常的常用参数

| 作用            | 命令                                 |
| :-------------- | :----------------------------------- |
| 后台运行        | `-d`                                 |
| 重新 build 镜像 | `--build`                            |
| 重新创建容器    | `---force-recreate`                  |
| 指定某个服务    | **eg:**`docker-compose up study-go2` |

#### docker-compose.yml 文件配置

```yaml
version: "3.7"

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
          cpus: "0.2"
          memory: 20M
        reservations:
          cpus: "0.1"
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
          cpus: "0.3"
          memory: 150M
        reservations:
          cpus: "0.2"
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
          cpus: "0.5"
          memory: 200M
        reservations:
          cpus: "0.3"
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
          cpus: "0.5"
          memory: 200M
        reservations:
          cpus: "0.3"
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

```conf
server { # 对应web容器内配置, server 不可写localhost
    listen       8081;
    root /usr/share/nginx/html;
    index index.html;

    location / {
        try_files $uri /index.html;
    }
}
```

#### docker-compose 文件的常用字段分类和用途解析

| 分类             | 字段           | 用途解析                                               | 范例                                  |
| ---------------- | -------------- | ------------------------------------------------------ | ------------------------------------- |
| 基础配置         | version        | 指定 docker-compose 文件的版本                         | 3.9                                   |
|                  | services       | 定义多个服务，每个服务表示一个容器                     | 包括服务名称、镜像信息和容器配置      |
| 服务相关字段     | image          | 指定容器运行所需的镜像                                 | nginx:1.21.6                          |
|                  | build          | 用于构建镜像，可以指定构建上下文和 Dockerfile 文件路径 | 适合需要自定义镜像的场景              |
|                  | container_name | 定义容器名称，便于管理和调试                           | my_nginx                              |
|                  | ports          | 映射主机和容器之间的端口                               | 将主机 8080 映射到容器的 80           |
|                  | volumes        | 挂载数据卷，用于数据持久化或主机与容器间文件共享       | 挂载主机目录到容器目录                |
|                  | environment    | 定义环境变量，支持数组或键值对格式                     | NODE_ENV=production                   |
|                  | env_file       | 从外部文件加载环境变量                                 | 使用 .env 文件                        |
|                  | depends_on     | 设置服务启动顺序                                       | web 服务依赖 db 和 redis              |
| 网络与资源管理   | networks       | 定义网络，用于服务间通信                               | 设置 bridge 网络驱动                  |
|                  | restart        | 定义容器的重启策略                                     | always 表示容器总是自动重启           |
|                  | resources      | 设置容器的 CPU 和内存资源限制                          | 限制 CPU 使用为 0.5 个核心            |
| 运行与初始化配置 | command        | 替代容器的默认启动命令                                 | 运行 npm start                        |
|                  | entrypoint     | 覆盖镜像的入口点                                       | 使用自定义脚本 /usr/bin/entrypoint.sh |
|                  | working_dir    | 设置容器的工作目录                                     | /app                                  |
|                  | tty            | 启用伪终端模式                                         | 适合需要交互式调试的场景              |
|                  | stdin_open     | 启用容器的交互模式                                     | true                                  |
|                  | healthcheck    | 定义容器健康检查                                       | 通过 curl 检查 HTTP 服务状态          |
|                  | init           | 使用 init 系统处理僵尸进程                             | true                                  |
| 高级功能         | scale          | 定义服务实例的数量                                     | 设置服务副本数为 3                    |
|                  | secrets        | 使用 Docker Secrets 管理敏感数据                       | 加载文件中的数据库密码                |
|                  | deploy         | 部署配置，适用于 Docker Swarm                          | 定义服务副本数和更新策略              |
| 全局配置         | volumes        | 定义全局数据卷，供多个服务使用                         | db_data                               |
|                  | networks       | 定义全局网络，支持自定义网络驱动                       | app_network 使用 bridge               |
|                  | configs        | 管理配置文件，类似于 secrets                           | 挂载应用程序配置到容器                |

### 相关应用

#### 可视化工具 portainer

```shell
docker pull portainer/portainer

docker run -d -p 9000:9000 --name portainer --restart always -v /var/run/docker.sock:/var/run/docker.sock -v portainer_data:/data swr.cn-north-1.myhuaweicloud.com/iivey/portainer-ce:2.1.1
```

## K8s 基础

### K8s、Helm、Kubectl 之间的关系

Kubernetes（k8s）是用于容器编排和管理的开源平台，提供了对容器化应用程序的自动化部署、扩展和操作。
kubectl 是用于与 Kubernetes 集群进行交互的命令行工具，可以执行各种操作来管理和控制 Kubernetes 集群中的资源。
Helm 是一个 Kubernetes 的包管理工具，用于简化应用程序的部署和管理，通过 Chart 来定义和打包 Kubernetes 应用程序，以及提供了版本控制和便捷的升级功能。
kubectl 是对实例操作的工具; Helm 是对打包模版的管理工具.

### 三大概念

Chart 代表着 Helm 包。它包含在 Kubernetes 集群内部运行应用程序，工具或服务所需的所有资源定义。你可以把它看作是 Homebrew formula，Apt dpkg，或 Yum RPM 在 Kubernetes 中的等价物。

Repository（仓库） 是用来存放和共享 charts 的地方。它就像 Perl 的 CPAN 档案库网络 或是 Fedora 的 软件包仓库，只不过它是供 Kubernetes 包所使用的。

Release 是运行在 Kubernetes 集群中的 chart 的实例。一个 chart 通常可以在同一个集群中安装多次。每一次安装都会创建一个新的 release。以 MySQL chart 为例，如果你想在你的集群中运行两个数据库，你可以安装该 chart 两次。每一个数据库都会拥有它自己的 release 和 release name。

在了解了上述这些概念以后，我们就可以这样来解释 Helm：

Helm 安装 charts 到 Kubernetes 集群中，每次安装都会创建一个新的 release。你可以在 Helm 的 chart repositories 中寻找新的 chart。

## 命令

### 集群操作

- 查看本地集群 `kubectl config get-contexts`
- 查看当前集群 `kubectl config current-context`
- 切换当前集群 `kubectl config use-context <context_name>`
- 查看集群状态 `kubectl cluster-info`

### 命令操作

- 查看 release `helm list [--all]`
- 查看 repo `helm repo list`
- 增加新的 repo `helm repo add dev https://example.com/dev-charts`
- 删除 release `helm uninstall happy-panda`
- helm lint `helm lint`

#### 打包流程

1. 创建 charts `helm create deis-workflow`
2. 打包 chart `helm package deis-workflow`
3. install chart `helm install deis-workflow ./deis-workflow-0.1.0.tgz`

[命令速查](https://helm.sh/zh/docs/intro/cheatsheet/)
