---
title: Go语言入坑指南
authorDesc: 豆豆
categories: 开发
date: 2023-05-14 19:48:00
tags:
  - 后端
  - Go
---

# 开发环境配置

[传送门](https://golang.google.cn/dl/)安装对应系统的文件, 然后输入命令

```shell
# 强制go为GOPATH模式运行,防止无法自动运行go test
go env -w GO111MODULE=auto
# 设置不同源
go env -w GOPROXY=https://proxy.golang.com.cn,direct
```

- 必须设置
- GOROOT：GOROOT 就是 Go 的安装目录
- GOPATH：GOPATH 是我们的工作空间,保存 go 项目代码和第三方依赖包.所有项目都应该在此文件夹.
## vscode运行
launch.json
```json
{
      "name": "local-suc-planing",
      "type": "go",
      "request": "launch",
      "mode": "debug",
      "program": "${workspaceFolder}/internal/sucplanning/cmd/sucplanning.pen.go",
      "cwd": "${workspaceFolder}/internal/sucplanning",
      "env": {
        "SERVER_PORT": "10087"
      }
    },
```
# 须知

## 特殊符号语句

1.var a int = 20 等价于 a := 20 ; go 可以自行推断 但:= 写法只可用于函数哪
2.var ip *int 声明变量为指针存储地址类型
3.ip = &a 获取指针变量的存储地址 //20818a220
4.fmt.Printf("*ip 变量的值: %d\n", \*ip ) 使用指针访问值 //20 5. value.(type) value 是接口类型的变量，type 或 T 是要转换成的类型。 6. type Name interface 中 interface 定义接口，type Name struct 定义结构。 7. go say("world") go 语句开启一个新的运行期线程， 即 goroutine，以一个不同的、新创建的 goroutine 来执行一个函数。 同一个程序中的所有 goroutine 共享同一个地址空间。
5. _ 是空白符号，用于丢弃不需要的参数

## 基本用法
### 基础用法

```go
// 变量：系统自动赋予它该类型的零值：int 为 0，float 为 0.0，bool 为 false，string 为空字符串，指针为 nil。记住，所有的内存在 Go 中都是经过初始化的。
var (
    a int = 123
    b bool =true
    str *string = &234
)
// 函数内简写
cc := 123
// 常量
const Pi = 3.14159
// 指针：不能进行指针运算。通过给予程序员基本内存布局，Go 语言允许你控制特定集合的数据结构、分配的数量以及内存访问模式
var i1 = 5
var intP *int
intP = &i1
// 	数组：len 定义后就不可更改
var identifier [len]type
var arrAge = [5]int{18, 20, 15, 22, 16}
// 数组截取：不可负数，切片是对原数组的引用，并没有新建
s == s[:i] + s[i:] // i是一个整数且: 0 <= i <= len(s)
len(s) <= cap(s)
// Map
var map1 map[keytype]valuetype
var map1 map[string]int
// Map-判断是否存在
_, ok := map1[key1]
// 遍历range
for _, value := range map1 {
    ...
}
// if判断：可以多段写入，前定义后判断
if initialization; condition {
    // do something
}
// switch 判断：可判断多个，可判断类型，可判断比对
switch num1 {
	case 98, 99:
		fmt.Println("It's equal to 98")
	case i >= 50:
		fmt.Println("It's equal to 100")
	default:
		fmt.Println("It's not equal to 98 or 100")
}
// for 循环：和js差不多就是可以初始化定义多个变量
for 初始化语句; 条件语句; 修饰语句 {
break
continue
}
// 标签与：将代码执行移到标签冒号后
LABEL1:
    for i := 0; i <= 5; i++ {
        for j := 0; j <= 5; j++ {
            if j == 4 {
                continue LABEL1  // 会直接提出本次外循环继续循环
				break LABEL1 // 会直接退出外循环
            }
            fmt.Printf("i is: %d, and j is: %d\n", i, j)
        }
    }
// goto可以模拟循环
func main() {
    i:=0
    HERE:
        print(i)
        i++
        if i==5 {
            return
        }
        goto HERE
}
// 函数：可以返回多个参数
func ThreeValues(a ...int) (int, int, float32) {
	fmt.Print(a)
    return 5, 6, 7.5
}
ThreeValues(1,2,3) // 1,2,3
// 函数-defer：推迟到return前执行
func function1() {
    defer func(){
		fmt.Printf("before return")
	}
    fmt.Printf("In function1 at the bottom!\n")
}
```
### 锁
当变量被一个线程改变时 (临界区)，我们为它上锁，直到这个线程执行完成并解锁后，其他线程才能访问它。
sync.Mutex 是一个互斥锁，它的作用是守护在临界区入口来确保同一时间只能有一个线程进入临界区。
``` go
mut := sync.Mutex{}
mut.Lock()
mut.Unlock()
```
	
### 多路选择/超时控制
``` go
// 多渠道选择
select {
	case ret := <-AsyncService():
		t.Logf('result %s',ret)
	case ret := <-AsyncService2():
		t.Logf('result2 %s',ret)
    default:
        t.Error("No one returned")
	}
// 超时控制
select {
	case ret := <-AsyncService():
		t.Log(ret)
	case <-time.After(time.Second * 1):
		t.Error("time out")
	}
```
### Chanel 通道

通道（channel）是用来传递数据的一个数据结构。

通道可用于两个 goroutine 之间通过传递一个指定类型的值来同步运行和通讯。操作符 <- 用于指定通道的方向，发送或接收。如果未指定方向，则为双向通道。

先进先出。

# Gorm

[官方传送门](https://gorm.io/zh_CN/docs/)
[使用传送门](https://juejin.cn/post/7195352760450023481#heading-5)
Gorm 是 Go 语言目前比较热门的数据库 ORM 操作库，对开发者也比较友好，使用非常简单，使用上主要就是把 struct 类型和数据库表记录进行映射，操作数据库的时候不需要直接手写 SQL 代码。

## 安装

```shell
// 安装MySQL依赖
go get -u gorm.io/driver/mysql
// 安装Gorm依赖
go get -u gorm.io/gorm
```

## 使用

```
import (
    "gorm.io/driver/mysql"
    "gorm.io/gorm"
)

```

### 增

```go
  // 一条
	p := Product{Code: "D42", Price: 100}
	if err := db.Create(&p).Error; err != nil {
		fmt.Println("插入失败", err)
	}
	// 多条
	products := []*Product{{Code: "D42", Price: 100}, {Code: "D43", Price: 200}}
	if err := db.Create(&products).Error; err != nil {
		fmt.Println("插入失败", err)
	}

```

### 查

```go

var product Product

	db.First(&product, 1)
	// 指定条件
	var product Product
	db.First(&product, "Code = ?", "D42")
	readProduct := &Product{}
	db.First(&readProduct, "code = ?", "D42") // find product with code D42
	//  where
	db.Where("Code = ?", "D42").First(&product)

	// find
	products := make([]Product, 0)
	db.Find(&products, "price = ?", 2)

  // in
  products := make([]*Product, 0)
  db.Where("price IN ?", []uint{100, 2}).Find(&products)

  // like
  products := make([]*Product, 0)
  db.Where("code like ?", "%D%").Find(&products)

  // 结构体查询
  db.Where(&Product{Code: "D43", Price: 0}).Find(&products)
```

- 注意：
- 使用 First 查询时，如果查询不到数据会返回 ErrRecordNotFound
- 使用 Find 查询时，查询不到数据不会返回错误
- 使用结构体作为查询条件时，Gorm 只会查询非零值字段，也就是 0、''、false 或其他零值字段将被忽略，可以使用 Map 或 Select 来替换

### 更

```go
db.Model(&Product{}).Update("Price", 200)
// 多字段
db.Model(&Product{}).Updates(Product{Code: "D43", Price: 1})
// 如果使用结构体作为参数的话，可以省略Model这一部分，因为Gorm也会从参数的结构体中查询相关表名。
// 注意在使用结构体时，不会更新零值，如果要更新的话，需要使用map：
db.Model(&Product{}).Updates(map[string]interface{}{"Price": 200, "Code": "F42"})
// 按条件更新
db.Model(&Product{}).Where("Code = ?", "D42").Update("Price", 200)
// 更新选定字段
db.Model(&Product{}).Select("price").Updates(map[string]interface{}{"Price": 200, "Code": "F42"})
// 表达式更新，如果要实现update product set price = price * 2 * 100的话，实现方式如下：
db.Model(&Product{}).Update("price", gorm.Expr("price * ? * ?", 2, 100))

```

### 删

```go
// 物理删除
db.Delete(&Product{}, 1)
db.Delete(&Product{}, "Code = ?", "F42")
db.Delete(&Product{}, []int{1,2,3})
db.Where("code like ?", "%F%").Delete(Product{})
// 条件删除
db.Where("Code = ?", "F42").Delete(&Product{})
// 软删除
// Gorm提供了软删除的能力，需要在结构体中定义一个Deleted字段，此时再调用Delete删除函数，则会生成update语句，并将deleted字段赋值为当前删除时间。
db.Delete(&Product{}, 1)
// 查询软删除操作
db.Unscoped().First(&product, 2)
// 软删除之后物理删除
db.Unscoped().Delete(&Product{}, 1)



```
## 代码规范
### 目录规范
在我看来，一个 Go 项目包含 3 大部分：Go 应用 、项目管理和文档。所以，我们的项目目录也可以分为这 3 大类。同时，Go 应用又贯穿开发阶段、测试阶段和部署阶段，相应的应用类的目录，又可以按开发流程分为更小的子类。当然了，这些是我建议的目录，Go 项目目录中还有一些不建议的目录。所以整体来看，我们的目录结构可以按下图所示的方式来分类：
{%  image https://cdn.cbd.int/dd_blog_assets@1.0.0/img/go/94e521c6eb884096ea107fc4c36f30a3.webp %}

#### Go 应用 ：主要存放前后端代码

首先，我们来说说开发阶段所涉及到的目录。我们开发的代码包含前端代码和后端代码，可以分别存放在前端目录和后端目录中。

1. /web前端代码存放目录，主要用来存放 Web 静态资源，服务端模板和单页应用（SPAs）。
2. /cmd
    一个项目有很多组件，可以把组件 main 函数所在的文件夹统一放在/cmd 目录下，
  例如：

```shell

$ ls cmd/
gendocs  geniamdocs  genman  genswaggertypedocs  genyaml  iam-apiserver  iam-authz-server  iamctl  iam-pump

$ ls cmd/iam-apiserver/
apiserver.go

```

每个组件的目录名应该跟你期望的可执行文件名是一致的。这里要保证 /cmd/<组件名> 目录下不要存放太多的代码，如果你认为代码可以导入并在其他项目中使用，那么它应该位于 /pkg 目录中。如果代码不是可重用的，或者你不希望其他人重用它，请将该代码放到 /internal 目录中。

3./internal

存放私有应用和库代码。如果一些代码，你不希望在其他应用和库中被导入，可以将这部分代码放在/internal 目录下。

/internal 目录大概分为 3 类子目录：
- /internal/pkg：内部共享包存放的目录。
- /internal/authzserver、/internal/apiserver、/internal/pump、/internal/iamctl：应用目录，里面包含应用程序的实现代码。
- /internal/iamctl：对于一些大型项目，可能还会需要一个客户端工具。在每个应用程序内部，也会有一些目录结构，这些目录结构主要根据功能来划分：
- /internal/apiserver/api/v1：HTTP API 接口的具体实现，主要用来做 HTTP 请求的解包、参数校验、业务逻辑处理、返回。注意这里的业务逻辑处理应该是轻量级的，如果业务逻辑比较复杂，代码量比较多，建议放到 /internal/apiserver/service 目录下。该源码文件主要用来串流程。
- /internal/apiserver/options：应用的 command flag。/internal/apiserver/config：根据命令行参数创建应用配置。
- /internal/apiserver/service：存放应用复杂业务处理代码。
- /internal/apiserver/store/mysql：一个应用可能要持久化的存储一些数据，这里主要存放跟数据库交互的代码，比如 Create、Update、Delete、Get、List 等。
- /internal/pkg 目录存放项目内可共享的包，通常可以包含如下目录：
- /internal/pkg/code：项目业务 Code 码。
- /internal/pkg/validation：一些通用的验证函数。
- /internal/pkg/middleware：HTTP 处理链。

4./pkg
/pkg 目录是 Go 语言项目中非常常见的目录，我们几乎能够在所有知名的开源项目（非框架）中找到它的身影，例如 Kubernetes、Prometheus、Moby、Knative 等。

5./vendor
项目依赖，可通过 go mod vendor 创建。需要注意的是，如果是一个 Go 库，不要提交 vendor 依赖包。
6./third_party
外部帮助工具，分支代码或其他第三方应用（例如 Swagger UI）。比如我们 fork 了一个第三方 go 包，并做了一些小的改动，我们可以放在目录 /third_party/forked 下。一方面可以很清楚的知道该包是 fork 第三方的，另一方面又能够方便地和 upstream 同步。

``` shell

├── api
│   ├── openapi
│   └── swagger
├── build
│   ├── ci
│   ├── docker
│   │   ├── iam-apiserver
│   │   ├── iam-authz-server
│   │   └── iam-pump
│   ├── package
├── CHANGELOG
├── cmd
│   ├── iam-apiserver
│   │   └── apiserver.go
│   ├── iam-authz-server
│   │   └── authzserver.go
│   ├── iamctl
│   │   └── iamctl.go
│   └── iam-pump
│       └── pump.go
├── configs
├── CONTRIBUTING.md
├── deployments
├── docs
│   ├── devel
│   │   ├── en-US
│   │   └── zh-CN
│   ├── guide
│   │   ├── en-US
│   │   └── zh-CN
│   ├── images
│   └── README.md
├── examples
├── githooks
├── go.mod
├── go.sum
├── init
├── internal
│   ├── apiserver
│   │   ├── api
│   │   │   └── v1
│   │   │       └── user
│   │   ├── apiserver.go
│   │   ├── options
│   │   ├── service
│   │   ├── store
│   │   │   ├── mysql
│   │   │   ├── fake
│   │   └── testing
│   ├── authzserver
│   │   ├── api
│   │   │   └── v1
│   │   │       └── authorize
│   │   ├── options
│   │   ├── store
│   │   └── testing
│   ├── iamctl
│   │   ├── cmd
│   │   │   ├── completion
│   │   │   ├── user
│   │   └── util
│   ├── pkg
│   │   ├── code
│   │   ├── options
│   │   ├── server
│   │   ├── util
│   │   └── validation
├── LICENSE
├── Makefile
├── _output
│   ├── platforms
│   │   └── linux
│   │       └── amd64
├── pkg
│   ├── util
│   │   └── genutil
├── README.md
├── scripts
│   ├── lib
│   ├── make-rules
├── test
│   ├── testdata
├── third_party
│   └── forked
└── tools
```