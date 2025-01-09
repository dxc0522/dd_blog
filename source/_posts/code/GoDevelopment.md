---
title: Go开发手册
authorDesc: 豆豆
categories: 开发
date: 2024-02-01 16:14:00
updated: 2024-05-30 12:21:00
tags:
  - 后端
  - Go
  - 开发手册
---
### g 工具安装

[https://github.com/voidint/g](https://github.com/voidint/g)
`curl -sSL https://raw.githubusercontent.com/voidint/g/master/install.sh | bash`
执行后手动source刷新下

### 常用命令

> 清除已有缓存 `go clean -modcache`
> 更新依赖 `go mod tidy && go mod vendor`
> 检查api文件配置 `goctl api validate --api app.api`
> 格式化api文件 `goctl api format -dir .`
> 更新api文件 `rm -rf internal/handler && rm -rf internal/types/types.go  && goctl api go -api app.api -dir .`
> 生成dbmodel `goctl model mysql datasource --url "root:123456@tcp(127.0.0.1:3306)/local" -t "users" -t "charging_data"`

### 环境准备

1. [goctl安装](https://go-zero.dev/docs/tasks/installation/goctl)
2. 创建API项目 `goctl api new [name]`
3. 调试API对应的handler、logic `goctl api go -api [name].api -dir .`
4. 从[仓库](https://github.com/dxc0522/go-template/tree/main/common) 复制所需的模块
5. 自动补全先执行`goctl completion zsh -h` 根据系统执行命令 然后安装到命令`goctl completion zsh` 或者可以直接用[fig](https://fig.io/docs/guides/autocomplete-for-internal-tools#a-automatically-with-our-cli-framework-integrations)实现

### 模块修改

若修改template `goctl template init` 先初始化默认的模版

#### 若修改响应值

修改对应template文件 `handler.tpl` 先创建

``` go
package {{.PkgName}}

import (
 "net/http"

 "github.com/go-template/common/response"

 {{if .HasRequest}}"github.com/zeromicro/go-zero/rest/httpx"{{end}}
 {{.ImportPackages}}
)

{{if .HasDoc}}{{.Doc}}{{end}}
func {{.HandlerName}}(svcCtx *svc.ServiceContext) http.HandlerFunc {
 return func(w http.ResponseWriter, r *http.Request) {
  {{if .HasRequest}}var req types.{{.RequestType}}
  if err := httpx.Parse(r, &req); err != nil {
   httpx.ErrorCtx(r.Context(), w, err)
   return
  }

  {{end}}l := {{.LogicName}}.New{{.LogicType}}(r.Context(), svcCtx, r, &w)
  {{if .HasResp}}resp, {{end}}err := l.{{.Call}}({{if .HasRequest}}&req{{end}})
        {{if .HasResp}}response.Response(r, w, resp, err){{else}}response.Response(r, w, nil, err){{end}}
 }
}

```

#### 若增加token增加jwt验证

对应修改template `logic.tpl`

``` go
package {{.pkgName}}

import (
 "net/http" // 增加
 {{.imports}}
)

// 增加对应模块
type {{.logic}} struct {
 logx.Logger
 ctx    context.Context
 svcCtx *svc.ServiceContext
 reqCtx *http.Request
 respCtx *http.ResponseWriter
}
// 传入对应模块
{{if .hasDoc}}{{.doc}}{{end}}
func New{{.logic}}(ctx context.Context, svcCtx *svc.ServiceContext, reqCtx *http.Request, respCtx *http.ResponseWriter) *{{.logic}} {
 return &{{.logic}}{
  Logger: logx.WithContext(ctx),
  ctx:    ctx,
  svcCtx: svcCtx,
  reqCtx: reqCtx,
  respCtx: respCtx,
 }
}
```

修改app.go增加 unauthorized 错误判断

``` go
// 修改main func
server := rest.MustNewServer(c.RestConf, rest.WithUnauthorizedCallback(JwtUnauthorizedResult))
defer server.Stop()
// JwtUnauthorizedResult jwt验证失败的回调
func JwtUnauthorizedResult(w http.ResponseWriter, r *http.Request, err error) {
 logx.Info("jwt unauthorized", err)
 httpx.WriteJson(w, http.StatusUnauthorized, response.Body{http.StatusUnauthorized, http.StatusText(http.StatusUnauthorized), nil})
}
```

### 生成API文档

* 安装goctl-swagger `go install github.com/zeromicro/goctl-swagger@latest`
* 生成json `goctl api plugin -plugin goctl-swagger="swagger -filename doc/app.json" -api app.api -dir .`
* 生成app.json 如果没有doc目录，需要先创建然后更换自己本地地址执行 `docker run -d --name swag -p 8087:8080 -e SWAGGER_JSON=/opt/app.json -v /Users/dou/go/src/github.com/go-template/app/doc/:/opt swaggerapi/swagger-ui`
  
### 连接Mysql

使用命令 `goctl model mysql datasource --url "root:123456@tcp(127.0.0.1:3306)/local" -t "media" -d dbmodel` 生成对应dbmodel 表名可用通配符`*`或者匹配字符`user_*`或-t "user,order"

```go
// servicecontext.go 文件修改
package svc

import (
 "fmt"
 "github.com/go-template/app/internal/config"
 "gorm.io/driver/mysql" // 增加
 "gorm.io/gorm" // 增加
)

type ServiceContext struct {
 Config config.Config
 DB     *gorm.DB // 增加
}

func NewServiceContext(c config.Config) (*ServiceContext, error) {
  // 增加sql注入
 db, err := gorm.Open(mysql.Open(c.DBConfig.Database), &gorm.Config{})
 if err != nil {
  panic("连接mysql数据库失败, error=" + err.Error())
 } else {
  fmt.Println("连接mysql数据库成功")
 }
 return &ServiceContext{
  Config: c,
  DB:     db,
 }, nil
}

```

``` go
// use db in logic page
user := dbmodel.Users{
 Name:     req.UserName,
 Password: req.Password,
 Mobile:   req.Mobile,
}
err = l.svcCtx.DB.Save(&user).Error
if err != nil {
 return "error", err
}
```

### 服务部署

### docker build

#### go

1. 项目目录下生成Dockerfile文件`goctl docker --exe study-go --go app.go --port 8888  --version 1.21.6` --exe指定文件名称 --go指定main文件 --version指定go版本
2. 打包image`docker build -f app/Dockerfile -t study-go:latest  .` 如果Dockerfile文件内没有复制根目录之外的文件则不用加-f指定Dockerfile文件.
3. 运行image `docker run -d --network my-network --name study-go -p 6666:8888 study-go:latest` 注意容器之间的网络状态.

#### web

```nginx.conf
server {
    listen 80;
    server_name dou.com;

    root /var/www/html/;
    index index.html;

    location / {
        try_files $uri /index.html;
    }
}
```

```Dockerfile
FROM nginx

ARG MODULE_NAME
COPY /${MODULE_NAME}/nginx.conf /etc/nginx/conf.d/default.conf
COPY /${MODULE_NAME}/dist/ /var/www/html/
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
```

COMMAND

1. `docker build --build-arg MODULE_NAME=vue-app -t vue-app .`
2. `docker run -d -p 80:80 --rm --name vue-app vue-app`

#### 链接

[部署问题](https://www.fengfengzhidao.com/article/dtyibo4BEG4v2tWkcxXp#%E8%BF%9E%E6%8E%A5%E5%A4%96%E9%83%A8%E6%9C%8D%E5%8A%A1)

## GoZero

* [官方文档源码最全](https://github.com/zeromicro/go-zero-pages)
* [视频教程](https://www.bilibili.com/video/BV1Fr4y177Jf/?spm_id_from=333.788&vd_source=7b375be35b2f577c65ee6446b86f37e9)

### API 文档

* [官方文档](https://go-zero.dev/docs/tutorials?_highlight=syntax#api-%E8%AF%AD%E6%B3%95%E6%A0%87%E8%AE%B0) 有但是不全
* [源码文档页面](https://dohyeon5626.github.io/github-html-preview-page/?https://github.com/zeromicro/go-zero-pages/blob/491478350847eeb7eefb6634e875386a9f58309b/cn/api-grammar.html)

{%  image https://cdn.cbd.int/dd_blog_assets@2.0.1/img/go/goctl-cn.svg %}

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
//  字段的描述是直接在字段后面写上注释例: //字段描述
```

## 相关资源

### Gin服务模版

`https://github.com/jassue/jassue-gin`

### gen sql go struct

#### install gen tool

`go install github.com/starfishs/sql2struct@latest`

#### gen sql struct command
安装
`go install gorm.io/gen/tools/gentool@latest`
使用
` gentool -dsn "root:123456@tcp(127.0.0.1:3306)/local?charset=utf8mb4&parseTime=True&loc=Asia%2FShanghai" -tables "users"  -onlyModel`
配置文件使用
`gentool -conf gen.tool`
``` yaml
version: "0.1"
database:
  # consult[https://gorm.io/docs/connecting_to_the_database.html]"
  dsn : "root:123456@tcp(127.0.0.1:3306)/local?charset=utf8mb4&parseTime=True&loc=Asia%2FShanghai"
  # input mysql or postgres or sqlite or sqlserver. consult[https://gorm.io/docs/connecting_to_the_database.html]
  db  : "mysql"
  # enter the required data table or leave it blank.You can input : orders,users,goods
  tables  :
         - users
  # specify a directory for output
  outPath :  "dbmodel"
  # query code file name, default: gen.go
  outFile :  ""
  # generate unit test for query code
  withUnitTest  : false
  # generated model code's package name
  modelPkgName  : "dbmodel"
  # generate with pointer when field is nullable
  fieldNullable : true
  # generate field with gorm index tag
  fieldWithIndexTag : false
  # generate field with gorm column type tag
  fieldWithTypeTag  : false
  onlyModel : true
```

## 注意
### 发布包相关事项
版本号为tag的标签号. 如`v1.0.0` 发布包时需要带上tag.
#### 安装包路径问题
大概率是因为代理的缓存问题, 首先修改go env 的变量proxy 为direct, 然后执行`go clean -modcache` 清除缓存即可.
