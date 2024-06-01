---
title: Go-Zero
authorDesc: 豆豆
categories: 开发
date: 2024-05-31 14:52:00
tags:
  - 后端
  - Go
---

* (官方文档源码最全)[https://github.com/zeromicro/go-zero-pages/blob/master/cn/api-grammar.html]
* (视频教程)[https://www.bilibili.com/video/BV1Fr4y177Jf/?spm_id_from=333.788&vd_source=7b375be35b2f577c65ee6446b86f37e9]

### API 文档
(官方文档)[https://go-zero.dev/docs/tutorials?_highlight=syntax#api-%E8%AF%AD%E6%B3%95%E6%A0%87%E8%AE%B0] 有但是不全

(源码文档页面)[https://dohyeon5626.github.io/github-html-preview-page/?https://github.com/zeromicro/go-zero-pages/blob/491478350847eeb7eefb6634e875386a9f58309b/cn/api-grammar.html]

``` go
// tag 有四种 分别是 json、path、form、header
type Request {
	Name string `path:"name"` // 路由path如 /foo/:name
	Name string `json:"name"`
	Name string `form:"name"` // Post请求或Get请求中的params如 /search?name=xx 参数
	Name string `header:"name"`
}
// tag修饰符 对参数的描述
type Request {
	Name string `json:"name,optional"` // 可选字段
	Name string `json:"name,options=you|me""` // 多个枚举值
	Name string `json:"name,range=[0:100]"` // 范围
	Name string `json:"name,default=dou"` // 默认值
}
```