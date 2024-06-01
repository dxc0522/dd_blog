---
title: Docker应用
authorDesc: 豆豆
categories: 开发
date: 2021-5-2 18:00:00
tags: 
  - Docker
  - 服务器
---
#### 基本命令

| 作用             | 命令                                                                              | 参数                                                                                                                                           | 示例                                          |
| :--------------- | :-------------------------------------------------------------------------------- | :--------------------------------------------------------------------------------------------------------------------------------------------- | :-------------------------------------------- |
| 检查docker的版本 | `docker version`                                                                  | -                                                                                                                                              | -                                             |
| 搜索镜像         | `docker search 镜像名字`                                                          | -                                                                                                                                              | -                                             |
| 下载镜像         | `docker pull 镜像名字`                                                            | -                                                                                                                                              | `docker run learn/tutorial echo "hello word"` |
| 运行镜像         | `docker run -d --network my-network --name study-go -p 6666:8888 study-go:latest` | -d  后台运行 <br/> --network my-network 指定网络 <br/> --name study-go 指定容器名称 <br/> -p 6666:8888 指定端口映射左为主机端口,右为容器内端口 | -                                             |
| 查看所有容器     | `docker ps`                                                                       | -a 查看所有容器                                                                                                                                | -                                             |
| 查看容器详情     | `docker inspect 容器名称/容器ID`                                                  | -                                                                                                                                              | `docker inspect study-go`                     |
| 查看所有镜像     | `docker images`                                                                   | -                                                                                                                                              | -                                             |
| 发布镜像         | `docker push [镜像名]`                                                            | -                                                                                                                                              | `docker push learn/ping`                      |
| 停止容器         | `docker stop 容器名`                                                              | -                                                                                                                                              | -                                             |
| 删除容器         | `docker container rm 容器名`                                                      | -                                                                                                                                              | -                                             |
| 删除所有的容器   | `docker container prune `                                                         | -                                                                                                                                              | -                                             |
| 删除所有的镜像   | `docker container image `                                                         | -                                                                                                                                              | `sudo docker rmi $(docker images -q)`         |
| 进入容器         | `docker exec -it db3 /bin/sh`                                                     | -                                                                                                                                              | 其中/bin/sh是容器内的文件                     |


#### 可视化工具 portainer 

``` shell
docker pull portainer/portainer

docker run -d -p 9000:9000 --name portainer --restart always -v /var/run/docker.sock:/var/run/docker.sock -v portainer_data:/data swr.cn-north-1.myhuaweicloud.com/iivey/portainer-ce:2.1.1
```

#### nginx
`docker run -d -p 8880:80 --name nginx -v C:\Users\dou\Desktop\nginx/scan-code:/usr/share/nginx/html -v C:\Users\dou\Desktop\nginx\conf.d:/etc/nginx/conf.d nginx`

#### mysql
`docker run -itd --name mysql -p 3306:3306 -e MYSQL_ROOT_PASSWORD=123456 mysql`
