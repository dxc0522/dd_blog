---
title: Docker应用
authorDesc: 豆豆
categories: 开发
date: 2021-5-2 18:00:00
tags: 
  - Docker
  - 服务器
---
## 基本命令
`docker version`
检查docker的版本，这样可以用来确认docker服务在运行并可通过客户端链接。
`docker search 镜像名字`
搜索可用的docker镜像
`docker pull 镜像名字`
通过docker命令下载tutorial镜像。
执行pull命令的时候要写完整的名字，比如"learn/tutorial"。
`docker run learn/tutorial echo "hello word"`
在docker容器中运行hello world!
docker run命令有两个参数，一个是镜像名，一个是要在镜像中运行的命令。
下一步我们要做的事情是在容器里面安装一个简单的程序(ping)。我们之前下载的tutorial镜像是基于ubuntu的，所以你可以使用ubuntu的apt-get命令来安装ping程序： apt-get install -y ping。

备注：apt-get 命令执行完毕之后，容器就会停止，但对容器的改动不会丢失。
在learn/tutorial镜像里面安装ping程序。
在执行apt-get 命令的时候，要带上-y参数。如果不指定-y参数的话，apt-get命令会进入交互模式，需要用户输入命令来进行确认，但在docker环境中是无法响应这种交互的。
docker run learn/tutorial apt-get install -y ping

`docker ps -l`
查看所有正在运行中的容器列表
` docker inspect 容器id前几位`
使用 docker inspect命令我们可以查看更详细的关于某一个容器的信息。
`docker commit 698 learn/ping`
保存对容器的修改
当你对某一个容器做了修改之后（通过在容器中运行某一个命令），可以把对容器的修改保存下来，这样下次可以从保存后的最新状态运行该容器。docker中保存状态的过程称之为committing，它保存的新旧状态之间的区别，从而产生一个新的版本。

目标：
首先使用 docker ps -l命令获得安装完ping命令之后容器的id。然后把这个镜像保存为learn/ping。

提示：
1. 运行docker commit，可以查看该命令的参数列表。

2. 你需要指定要提交保存容器的ID。(译者按：通过docker ps -l 命令获得)

3. 无需拷贝完整的id，通常来讲最开始的三至四个字母即可区分。（译者按：非常类似git里面的版本号)

执行完docker commit命令之后，会返回新版本镜像的id号。

运行新的镜像
ok，到现在为止，你已经建立了一个完整的、自成体系的docker环境，并且安装了ping命令在里面。它可以在任何支持docker环境的系统中运行啦！

正确的命令：
 docker run lean/ping ping www.google.com

 `docker images`
 命令可以列出所有安装过的镜像。
 `docker push`
 可以将某一个镜像发布到官方网站。
  你只能将镜像发布到自己的空间下面。这个模拟器登录的是learn帐号。
  预期的命令：
docker push learn/ping

删除所有的容器
`docker container prune`
删除所有的镜像
`docker image prune`
`sudo docker rmi $(docker images -q)`

进入容器命令
`docker exec -it db3 /bin/sh`
## 可视化工具 portainer 


``` shell
docker pull portainer/portainer

docker run -d -p 9000:9000 --name portainer --restart always -v /var/run/docker.sock:/var/run/docker.sock -v portainer_data:/data swr.cn-north-1.myhuaweicloud.com/iivey/portainer-ce:2.1.1
```

## nginx
`docker run -d -p 8880:80 --name nginx -v C:\Users\dou\Desktop\nginx/scan-code:/usr/share/nginx/html -v C:\Users\dou\Desktop\nginx\conf.d:/etc/nginx/conf.d nginx`