---
title: MongoDB
categories: 开发
date: 2019-9-11 11:06:00
tags:
  - 数据库
  - MongoDB
  - 运维
---

## 安装

下载安装包并解压
选择下载包的时候 os 根据运行环境选择，如果是 centos 可选择 Ubuntu 版本的 linux 安装包，不同选项 OS 仅为针对不同版本的 linux。

```

//解压
tar -zxvf mongodb-linux-x86_64-3.0.6.tgz
//全局变量
export PATH=安装路径/bin:$PATH
// 创建data文件夹其中db存放数据，logs存放运行报错
- data
  - db
  - logs
```

## 启动与重启

### 配置文件

启动配置文件最好放在 mongodb 相关文件夹内
[配置文件详解](https://blog.csdn.net/zhanaolu4821/article/details/87614708)

```
  #!/bin/bash
  port=27017
  dbpath=/data/db
  logpath=/data/logs/mongodb/mongodb.log
  logappend=true
  fork=true
  maxConns=5000
  auth = false
  bind_ip = 0.0.0.0
```

### 启动

配置 mongod.conf 文件并在启动 mongodb 时直接使用该文件启动，若修改端口号许加上 ip 跟端口号 127.0.0.1:8080
linux 命令
mongod --config /data/mongod.conf
windows 命令
mongod -f /data/mongod.conf

### 重启

ps aux |grep mongodb
查看进程号
kill -2 进程号
然后运行启动命令

## 用户操作

```
  //全局用户需进入admin库内，某个库的用户需进入某个库内
  use admin
  //新增系统管理员用户
    db.createUser(
    {
      user: "root",
      pwd: "123456",
      roles:
      [
        {
          role: "root",
          db: "admin"
        }
      ]
    }
  )
  //鉴权用户
  db.auth("root","123456")
  //查看当前库中的所有用户
  show users

```

### 角色分类详解

#### 内建角色：

数据库用户角色：read、readWrite；
数据库管理角色：dbAdmin、dbOwner、userAdmin；
集群管理角色： clusterAdmin、clusterManager、clusterMonitor、hostManager；
备份恢复角色： backup、restore；
所有数据库角色：readAnyDatabase、readWriteAnyDatabase、userAdminAnyDatabase、dbAdminAnyDatabase
超级用户角色： root； 这里还有几个角色间接或直接提供了系统超级用户的访问（dbOwner 、userAdmin、userAdminAnyDatabase）
内部角色： \_\_system；

#### 角色说明：

Read： 允许用户读取指定数据库
readWrite： 允许用户读写指定数据库
dbAdmin： 允许用户在指定数据库中执行管理函数，如索引创建、删除，查看统计或访问 system.profile
userAdmin： 允许用户向 system.users 集合写入，可以找指定数据库里创建、删除和管理用户
dbOwner： 允许在当前 DB 中执行任意操作
readAnyDatabase： 赋予用户所有数据库的读权限，只在 admin 数据库中可用
readWriteAnyDatabase： 赋予用户所有数据库的读写权限，只在 admin 数据库中可用
userAdminAnyDatabase：赋予用户所有数据库管理 User 的权限，只在 admin 数据库中可用
dbAdminAnyDatabase： 赋予管理所有数据库的权限，只在 admin 数据库中可用
root： 超级账号，超级权限，只在 admin 数据库中可用。

#### 集群管理角色：

clusterAdmin： 赋予管理集群的最高权限，只在 admin 数据库中可用
clusterManager： 赋予管理和监控集群的权限
clusterMonitor： 赋予监控集群的权限，对监控工具具有 readonly 的权限
hostManager： 赋予管理 Server

## 索引

db.集合.ensureIndex({username:1})
简历索引可以极大地加快查找速度，但是会对系统与硬盘有所影响。

#### 注意：

• 数据不超万条时，不需要使用索引。性能的提升并不明显，而大大增加了内存和硬盘的消耗。
• 查询数据超过表数据量 30%时，不要使用索引字段查询。实际证明会比不使用索引更慢，因为它大量检索了索引表和我们原表。
• 数字索引，要比字符串索引快的多，在百万级甚至千万级数据量面前，使用数字索引是个明确的选择。
• 把你经常查询的数据做成一个内嵌数据（对象型的数据），然后集体进行索引。

#### 复合索引

复合索引就是两条以上的索引。MongoDB 的复合查询是按照我们的索引顺序进行查询的。那个在前面则先使用那个索引的值开始查。
新增其他的索引并且查看是否添加成功，查找时直接匹配两个值即可。
指定索引查询（hint）
指定首先使用那个索引查找，因为数字的索引要比字符串的索引快，所以通常会指定数字索引。1 为 true
db.randomInfo.find({ "userName":"河绍世国",age:39}).hint({age:1})

#### 全文索引

这节我们先建立一个集合（collections）-info，然后插入一小段文章，作用就是为建立全文索引提供数据，当然我们不再建立百万级数据，我们只是看一下效果。

    • db.info.insert({contextInfo:"I am a programmer, I love life, love family. Every day after work, I write a diary."})
    • db.info.insert({contextInfo:"I am a programmer, I love PlayGame, love drink. Every day after work, I playGame and drink."}

#### 建立全文索引

    • db.info.ensureIndex({contextInfo:'text'})

需要注意的是这里使用 text 关键词来代表全文索引，我们在这里就不建立数据模型了。
例：db.info.find({$text:{$search:"PlayGame"}})
查找多个词
全文索引是支持多个次查找的，比如我们希望查找数据中有 programmer，family，diary，drink 的数据（这是或的关系），所以两条数据都会出现。

    • db.info.find({$text:{$search:"programmer family diary drink"}})

如果我们这时候希望不查找出来有 drink 这个单词的记录，我们可以使用“-”减号来取消。

    • dbd .info.find({$text:{$search:"programmer family diary -drink"}})

转义符：
全文搜索中是支持转义符的，比如我们想搜索的是两个词（love PlayGame 和 drink），这时候需要使用\斜杠来转意。多个单词的时候#### 使用
db.info.find({$text:{$search:"\"love drink\""}})

#### 总结

全文索引在工作还是经常使用的，比如博客文章的搜索，长文件的关键词搜索，这些都需要使用全文索引来进行。

