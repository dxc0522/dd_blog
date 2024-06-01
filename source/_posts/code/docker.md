---
title: Docker应用
authorDesc: 豆豆
categories: 开发
date: 2021-5-2 18:00:00
tags: 
  - Docker
  - 运维
---
#### 基本命令

| 作用             | 命令                                                                               | 参数                                                                                                                                           |
| :--------------- | :--------------------------------------------------------------------------------- | :--------------------------------------------------------------------------------------------------------------------------------------------- |
| 检查docker的版本 | `docker version`                                                                   | -                                                                                                                                              |
| 搜索镜像         | `docker search 镜像名字`                                                           | -                                                                                                                                              |
| 下载镜像         | `docker pull 镜像名字` <br/> **例:** `docker run learn/tutorial echo "hello word"` | -                                                                                                                                              |
| 运行镜像         | `docker run -d --network my-network --name study-go -p 6666:8888 study-go:latest`  | -d  后台运行 <br/> --network my-network 指定网络 <br/> --name study-go 指定容器名称 <br/> -p 6666:8888 指定端口映射左为主机端口,右为容器内端口 |
| 查看所有容器     | `docker ps`                                                                        | -a 查看所有容器                                                                                                                                |
| 查看容器详情     | `docker inspect 容器名称/容器ID` <br/> **例:** `docker inspect study-go`           | -                                                                                                                                              |
| 查看所有镜像     | `docker images`                                                                    | -                                                                                                                                              |
| 发布镜像         | `docker push [镜像名]` <br/> **例:** `docker push learn/ping`                      | -                                                                                                                                              |
| 停止容器         | `docker stop 容器名`                                                               | -                                                                                                                                              |
| 删除容器         | `docker container rm 容器名`                                                       | -                                                                                                                                              |
| 删除所有的容器   | `docker container prune`                                                           | -                                                                                                                                              |
| 删除所有的镜像   | `docker container image` <br/> **例:** `sudo docker rmi $(docker images -q)`       | -                                                                                                                                              |
| 进入容器         | `docker exec -it db3 /bin/sh`                                                      | 其中/bin/sh是容器内的文件                                                                                                                      |

#### 可视化工具 portainer

``` shell
docker pull portainer/portainer

docker run -d -p 9000:9000 --name portainer --restart always -v /var/run/docker.sock:/var/run/docker.sock -v portainer_data:/data swr.cn-north-1.myhuaweicloud.com/iivey/portainer-ce:2.1.1
```

#### nginx

`docker run -d -p 8880:80 --name nginx -v C:\Users\dou\Desktop\nginx/scan-code:/usr/share/nginx/html -v C:\Users\dou\Desktop\nginx\conf.d:/etc/nginx/conf.d nginx`

#### mysql

`docker run -itd --name mysql -p 3306:3306 -e MYSQL_ROOT_PASSWORD=123456 mysql`

## Helm基础

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
