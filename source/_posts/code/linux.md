---
title: Linux
categories: 开发
date: 2020-04-17 21:14:00
tags:
  - 服务器
---
## 基础操作
### 显示cpu架构信息

```
 [xxx@localhost ~]$ lscpu
Architecture:          x86_64
CPU op-mode(s):        32-bit, 64-bit
Byte Order:            Little Endian
CPU(s):                4　　　　　　　　　　#总处理器核心数量
On-line CPU(s) list:   0-3
Thread(s) per core:    1　　　　　　　　　　#每个核心支持的线程数量。1表示只支持一个线程，即不支持超线程
Core(s) per socket:    1　　　　　　　　　　#每个处理器的核心数量
Socket(s):             4　　　　　　　　　　#处理器数量
NUMA node(s):          1
Vendor ID:             GenuineIntel
CPU family:            6
Model:                 63
Stepping:              0
CPU MHz:               2599.998
BogoMIPS:              5199.99
Hypervisor vendor:     VMware　　　　　　　#管理程序供应商
Virtualization type:   full
L1d cache:             32K
L1i cache:             32K
L2 cache:              256K
L3 cache:              30720K
NUMA node0 CPU(s):     0-3
```

查看安装位置
`ps  -ef | grep nginx`
 查看nginx配置文件位置
`nginx -t`
 查看端口占用
`netstat -ntlp`
nvm安装
`wget -qO- https://raw.githubusercontent.com/creationix/nvm/v0.35.3/install.sh | bash`
安装后设置快捷方式
`source ~/.bashrc`
列出可安装目录，LTS为稳定版
`nvm ls-remote`

## git安装
[传送门](https://www.cnblogs.com/wulixia/p/11016684.html)


[github](https://github.com/git/git/releases)下载指定版本tar.gz文件并发送至服务器/home文件夹
解压文件 `tar -zxvf git-2.22.0.tar.gz`
`cd git-2.22.0`
安装编译源码相关依赖 
`yum install curl-devel expat-devel gettext-devel openssl-devel zlib-devel gcc perl-ExtUtils-MakeMaker`
安装编译源码所需依赖的时候，yum自动帮你安装了git，这时候你需要先卸载这个旧版的git。
`yum -y remove git`
编译git源码
`make prefix=/home/git all`
安装git至/home/git-version路径
`make prefix=/home/git-version install`
配置环境变量
`vi /etc/profile `
在底部加上
`export PATH=$PATH:/usr/local/git/bin`
( 输入 :wq! 保存修改)
刷新环境变量
`source /etc/profile`
查看Git是否安装完成
`git --version`
至此，从github上下载最新的源码编译后安装git完成。

## PM2 常用命令

pm2常用命令记录

`$ pm2 start app.js` # 启动app.js应用程序

`$ pm2 start app.js -i 4`        # cluster mode 模式启动4个app.js的应用实例

4个应用程序会自动进行负载均衡

```
$ pm2 start app.js --name="api" # 启动应用程序并命名为 "api"

$ pm2 start app.js --watch      # 当文件变化时自动重启应用

$ pm2 start script.sh          # 启动 bash 脚本

$ pm2 list                      # 列表 PM2 启动的所有的应用程序

$ pm2 monit                    # 显示每个应用程序的CPU和内存占用情况

$ pm2 show [app-name]          # 显示应用程序的所有信息

$ pm2 logs                      # 显示所有应用程序的日志

$ pm2 logs [app-name]          # 显示指定应用程序的日志

$ pm2 flush                       # 清空所有日志文件

$ pm2 stop all                  # 停止所有的应用程序

$ pm2 stop 0                    # 停止 id为 0的指定应用程序

$ pm2 restart all              # 重启所有应用

$ pm2 reload all                # 重启 cluster mode下的所有应用

$ pm2 gracefulReload all        # Graceful reload all apps in cluster mode

$ pm2 delete all                # 关闭并删除所有应用

$ pm2 delete 0                  # 删除指定应用 id 0

$ pm2 scale api 10              # 把名字叫api的应用扩展到10个实例

$ pm2 reset [app-name]          # 重置重启数量

$ pm2 startup                  # 创建开机自启动命令

$ pm2 save                      # 保存当前应用列表

$ pm2 resurrect                # 重新加载保存的应用列表

$ pm2 update                    # Save processes, kill PM2 and restore processes

$ pm2 generate                  # Generate a sample json configuration file
```
pm2文档地址：http://pm2.keymetrics.io/docs/usage/quick-start/
