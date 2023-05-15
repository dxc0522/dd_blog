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
go env -w GO111MODULE=off
# 设置不同源
go env -w GOPROXY=https://proxy.golang.com.cn,direct
```

# 须知

## 特殊符号语句

1.var a int = 20 等价于 a := 20 ; go 可以自行推断 但:= 写法只可用于函数哪
2.var ip *int 声明变量为指针存储地址类型
3.ip = &a 获取指针变量的存储地址 //20818a220
4.fmt.Printf("*ip 变量的值: %d\n", \*ip ) 使用指针访问值 //20 5. value.(type) value 是接口类型的变量，type 或 T 是要转换成的类型。 6. type Name interface 中 interface 定义接口，type Name struct 定义结构。 7. go say("world") go 语句开启一个新的运行期线程， 即 goroutine，以一个不同的、新创建的 goroutine 来执行一个函数。 同一个程序中的所有 goroutine 共享同一个地址空间。

### Chanel 通道

通道（channel）是用来传递数据的一个数据结构。

通道可用于两个 goroutine 之间通过传递一个指定类型的值来同步运行和通讯。操作符 <- 用于指定通道的方向，发送或接收。如果未指定方向，则为双向通道。

先进先出。

# Gorm

[传送门](https://juejin.cn/post/7195352760450023481#heading-5)
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
