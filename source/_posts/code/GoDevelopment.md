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