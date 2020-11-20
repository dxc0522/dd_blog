---
title: egg+mongodb开发后台
date: 2019-8-16 17:13:00
categories: 开发
tags:
  - 后台
---
## 注意
- mongoose中根据id查的时候不用转ObjectId

## 环境
[开发须知](https://eggjs.org/zh-cn/tutorials/index.html)
[优秀范例](https://github.com/levinhax/Egg-API)
全局安装egg脚手架[egg-init](https://github.com/eggjs/egg-init)
egg-init projectName --type simple
安装相关插件
yarn add egg-validate egg-mongoose
## 项目解析
### 相关目录
[官方解释目录作用](https://eggjs.org/zh-cn/basics/structure.html#mobileAside)

``` 
  //app/extend/xxx.js下的各this指向
  application.js —— this指向：app对象
  调用：this.app

  context.js —— this指向：ctx对象
  调用：this.ctx

  request.js —— this指向：ctx.request对象
  调用：this.ctx.request

  response.js —— this指向：ctx.response对象
  调用：this.ctx.response

  helper.js —— this指向：ctx.helper对象
  调用：this.ctx.helper
```
### 开发须知
1. model文件中的返回的值  return mongoose.model("User", UserSchema, "user");第一个为调用名称，第二位模版，第三为要操作的集合。
## 调试
配置vscode中launch.js文件

```json
{
    "version": "0.2.0",
    "configurations": [
      {
        "name": "Launch Egg",
        "type": "node",
        "request": "launch",
        "cwd": "${workspaceRoot}",
        "runtimeExecutable": "npm",
        "windows": { "runtimeExecutable": "npm.cmd" },
        "runtimeArgs": [ "run", "debug" ],
        "console": "integratedTerminal",
        "protocol": "auto",
        "restart": true,
        "port": 9999
      }
    ]
}
```
## 连接数据库mongodb
### egg配置连接
使用[egg-mongoose](https://github.com/eggjs/egg-mongoose#readme)连接mongodb

```js
  //config/plugin.js中增加
  exports.mongoose = {
    enable: true,
    package: 'egg-mongoose',
  };
  //config/config.default.js中增加
  //这段一定写在module.exports = appInfo => {里面，妈的官网是错的让我捯饬半天。
  config.mongoose = {
    url: "mongodb://127.0.0.1/mypwd",
    //你的数据库地址，端口号不同就直接加载ip后面，没改则不用加，必须有这个库才能连接成功
    options: {
      user: "root",//账号密码
      pass: "root"
    }
  };
    // 关闭安全协议可以在postman中测试，不关只能在浏览器测试
  config.security = {
    csrf: {
      enable: false,
      ignoreJSON: true // 默认为 false，当设置为 true 时，将会放过所有 content-type 为 `application/json` 的请求
    }
    // domainWhiteList: ["http://127.0.0.1:8080"]
  };
```
### mongodb配置
```
 #!/bin/bash
 port=27017
 dbpath=/data/db
 logpath=/data/logs/mongodb/mongodb.log
 logappend=true
 fork=true//后台运行，window中该属性不可用
 maxConns=5000
 auth = true//是否开启用户权限验证
 bind_ip = 0.0.0.0
```
## 传参校验

使用 [egg-validate](https://github.com/eggjs/egg-validate#readme)实现校验
```js
  // config/plugin.js
  exports.validate = {
    enable: true,
    package: 'egg-validate',
  };
  // controller中应用
  const rule = {
    id: { type: "string", required: true, message: "必填项" }
  };
  await ctx.validate(rule, params);
  //错误的话会返回错误信息但是不能手动设置
```
## 扩展方法
### 返回值
```js
  //app/extend/context.js
  "use strict";

  module.exports = {
    returnBody(status, data = null) {
      this.status = 200;
      this.body = {
        status,
        data,
        statusTxt:status==200?'success':'error'
      };
    }
  };
  //调用
  ctx.returnBody(100, "传参有误");
```
