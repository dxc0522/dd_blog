---
title: Jenkins
authorDesc: 豆豆
categories: 开发
date: 2024-7-15 10:52:00
tags: 
  - CI/CD
  - 运维
---

### 入门
[教程](https://juejin.cn/post/7127302949797101604)

{%  image /assets/img/jenkins/process.png %}

流程说明：

* 开发者在本地开发，然后提交到 Source Respository 中，

* 触发GitHub或者 GitLab 配置的钩子函数程序，继而通知 Jenkins

* Jenkins 收到通知，会通过 Git/SVN 插件，重新从项目配置中的代码仓库中拉取最新代码，放置于 Workspace （Jenkins 存放任务的目录）

* 之后重新触发构建任务，Jenkins 有很多的构建的插件，Java常用的 Maven 、Gradle，前端的 Node 等

* 如果有安装发送邮件的插件并且进行了配置，那么可以在项目中进行配置，构建失败或者成功都可以选择是否给开发者发送邮件

* 构建成功后，Jenkins 会通过一个 SSH 插件，来远程执行 Shell 命令，发布项目，在项目中可以配置多台服务器，也就可以一次性部署到多台服务器上去。

* 补充：当然很多时候，构建成功后，并不会直接部署到服务器上，而是打包到另外一台服务器上存储（应用服务器）或者存储为软件仓库中的一个新版本。

* 原因是一方面为了更好的回退版本，出现错误可以及时恢复，因为一个大型项目，它的构建过程时间说不上短；
另外一方面也是为了更好的扩展，如果出现紧急情况，需要横向扩展，可以在备用机器上，直接进行拉取部署即可。

###  Setup
#### Docker 安装服务
``` docker-compose.yml
version: '3.7'

name: public
services:
  jenkins:
    container_name: jenkins
    image: jenkins/jenkins:latest
    privileged: true 
    ports:
      - "8080:8080"
    volumes:
      - jenkins_data:/var/jenkins_home
      - jenkins_docker_certs:/certs/client
      - /var/run/docker.sock:/var/run/docker.sock
      - /usr/bin/docker:/usr/bin/docker
    environment:
      - DOCKER_TLS_CERTDIR=/certs
    networks:
      - public
    user: root
    restart: always

networks:
  public:
    external: true

volumes:
  jenkins_data: 
  jenkins_docker_certs:
```

#### init 

{%  image /assets/img/jenkins/init.png %}
看到这个图片查看文件内容
``` bash
docker exec -it -uroot jenkins bash # -uroot 是以管理员身份登入容器
cat /var/jenkins_home/secrets/initialAdminPassword
```
{%  image /assets/img/jenkins/installPlugins.png %}
安装默认插件即可,然后用户新建
{%  image /assets/img/jenkins/image.png %}
页面功能分类,开了中文翻译就看得懂了

### 插件安装

> **NodeJS Plugin** ： Nodejs
> **Publish Over SSH** ：SSH 发布工具
> **Blue Ocean** ：团队流水线工具

### 添加凭据
凭据其实就是账号密码，你访问远程服务器都需要账号密码才行，这里的凭据就是相应的账号密码。
{%  image /assets/img/jenkins/auth.png %}

{%  image /assets/img/jenkins/auth2.png %}
#### 服务器凭证
{%  image /assets/img/jenkins/auth3.png %}
#### Github凭证
2021年后https方式不允许登陆账户密码的方式拉取代码, 而ssh的形式可能容器的公钥会更改, 所以我们采用github access token的方式访问仓库.
{%  image /assets/img/jenkins/github6.png %}
最后完成的时候，记得复制
{%  image /assets/img/jenkins/github3.png %}
1. 创建 GithubApi相关凭证, 粘贴token到secret就好
{%  image /assets/img/jenkins/auth5.png %}
2. 创建 Github 仓库凭证

点添加的时候，会弹出一个框 github的账户名, 密码就是复制的github access token

{%  image /assets/img/jenkins/auth4.png %}
描述自己写就行~~

### 系统配置
{%  image /assets/img/jenkins/system.png %}
找到两个配置：

1、SSH remote hosts

2、SSH Servers
{%  image /assets/img/jenkins/ssh1.png %}
{%  image /assets/img/jenkins/ssh2.png %}
{%  image /assets/img/jenkins/ssh3.png %}

### 全局工具配置
node 安装指定版本
{%  image /assets/img/jenkins/tools.png %}

### Github WebHooks
{%  image /assets/img/jenkins/webhook.png %}
{%  image /assets/img/jenkins/webhook2.png %}
像我jenkins是部署在服务器上的 我的 地址就是服务器 IP:port/github-webhook/

找到项目，点击配置

把构建触发器中的 GitHub hook trigger for GITScm polling 勾上
{%  image /assets/img/jenkins/github8.png %}
{%  image /assets/img/jenkins/github9.png %}
记得点击保存。

然后就可以进行测试啦。

