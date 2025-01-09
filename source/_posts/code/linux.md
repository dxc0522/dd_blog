---
title: Linux
categories: 开发
date: 2020-04-17 21:14:00
tags:
  - 运维
---

## 基础操作

### 显示 cpu 架构信息

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

### 查看安装位置

| 作用                    | 命令               |
| :---------------------- | :----------------- | ----------- |
| 查看服务位置            | `ps -ef            | grep nginx` |
| 查看端口占用            | `netstat -ntlp`    |
| 查看 nginx 配置文件位置 | `nginx -t`         |
| 刷新环境变量            | `source ~/.bashrc` |

### 传输 scp

```shell
scp local_file remote_username@remote_ip:remote_folder
# 或者
scp local_file remote_username@remote_ip:remote_file
# 或者
scp local_file remote_ip:remote_folder
# 或者
scp local_file remote_ip:remote_file
# 或者
scp -i key.pm file_path remote:remote_file
```

## PM2 常用命令

pm2 常用命令记录

`$ pm2 start app.js` # 启动 app.js 应用程序

`$ pm2 start app.js -i 4` # cluster mode 模式启动 4 个 app.js 的应用实例

4 个应用程序会自动进行负载均衡

```
pm2 start app.js --name="api" # 启动应用程序并命名为 "api"

pm2 start app.js --watch      # 当文件变化时自动重启应用

pm2 start script.sh          # 启动 bash 脚本

pm2 list                      # 列表 PM2 启动的所有的应用程序

pm2 monit                    # 显示每个应用程序的CPU和内存占用情况

pm2 show [app-name]          # 显示应用程序的所有信息

pm2 logs                      # 显示所有应用程序的日志

pm2 logs [app-name]          # 显示指定应用程序的日志

pm2 flush                       # 清空所有日志文件

pm2 stop all                  # 停止所有的应用程序

pm2 stop 0                    # 停止 id为 0的指定应用程序

pm2 restart all              # 重启所有应用

pm2 reload all                # 重启 cluster mode下的所有应用

pm2 gracefulReload all        # Graceful reload all apps in cluster mode

pm2 delete all                # 关闭并删除所有应用

pm2 delete 0                  # 删除指定应用 id 0

pm2 scale api 10              # 把名字叫api的应用扩展到10个实例

pm2 reset [app-name]          # 重置重启数量

pm2 startup                  # 创建开机自启动命令

pm2 save                      # 保存当前应用列表

pm2 resurrect                # 重新加载保存的应用列表

pm2 update                    # Save processes, kill PM2 and restore processes

pm2 generate                  # Generate a sample json configuration file
```

pm2 文档地址：<http://pm2.keymetrics.io/docs/usage/quick-start/>
