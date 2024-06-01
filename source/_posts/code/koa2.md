---
title: 搭建koa2项目
categories: 开发
date: 2019-7-5 11:46:00
tags: 
 - 后端
 - Nodejs
---
## 创建项目
安装脚手架 npm install -g koa-generator
创建项目 koa2 project_name
[koa2项目文档](https://github.com/17koa/koa2-demo)
routes文件夹中有三种展示方式可以选择
``` js
router.prefix('/users')//这个是前缀路径
#返回页面
router.get('/', async (ctx, next) => {
  await ctx.render('index', {
    title: 'Hello Koa 2!'
  })
})
#返回字符串
router.get('/string', async (ctx, next) => {
  ctx.body = 'koa2 string'
})
#返回对象
router.get('/json', async (ctx, next) => {
  ctx.body = {
    title: 'koa2 json'
  }
})
```

- bin/run(runkoa执行bin/www)
- bin/www是常规koa启动文件，和express的一样
- views是放默认的jade文件
- views-ejs是放ejs文件

## 链接mongodb
引入mongoose包文件，根目录创建dbs文件夹，dbs下新建config.js与models文件夹。
``` js
// 配置mongo 地址
module.exports =  {
    dbs: 'mongodb://127.0.0.1:27017/dbs'
}
```
models文件夹中新建person.js文件
``` js
const mongoose = require('mongoose')

// 创建数据表模型，该文件的名字，即person，就是数据表的名字
// 下面给 person 表声明两个字段name和age

let personSchema = new mongoose.Schema({
    name: String,
    age: Number
})

// 通过建 model 给 person 赋予增删改查等读写的功能
module.exports = mongoose.model('Person', personSchema)
```
``` js
// 一、引入mongoose
const mongoose = require('mongoose')
const dbConfig = require('./dbs/config')
// 二、 连接数据库的服务
mongoose.connect(dbConfig.dbs, {
  useNewUrlParser: true
})
```
操作mongodb数据
```js
// 引入mongo模型
const Person = require('../dbs/models/person')

router.post('/addPerson', async function (ctx) {
  // 创建实例
  const person = new Person({
    name: ctx.query.name,
    age: ctx.query.age
  })

  let code = 0 // 状态码

  try {
    await person.save()
    code = 0
  } catch(e) {
    console.log(e)
    code = -1
  }
  // 返回状态（成功为0， 错误为-1）
  ctx.body = {
    code
  }
})
```

