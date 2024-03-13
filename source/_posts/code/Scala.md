---
title: Scala
authorDesc: 豆豆
categories: 开发
date: 2024-03-13 11:38:00
tags:
  - Scala
  - 后端
---

以下都是scala3语法

## 基础

### 字符串

拼接字符串 

``` scala
val firstName: String = John
val mi: Char = C
val lastName: String = Doe
println(s"Name: $firstName $mi $lastName") // Name: John C Doe
```

### 函数

基本函数 `def sum(a: Int,b: Int):Int = a + b`

### 执行语法

``` scala
// if/else
if x < 0 then
  println("negative")
else if x == 0 then
  println("zero")
else
  println("positive")

// while/do
var x = 1

while
  x < 3
do
  println(x)
  x += 1

// for
val ints = List(1, 2, 3, 4, 5)
for i <- ints do println(i)

// 1
// 2
// 3
// 4
// 5

// 双重 for 循环 加 判断
for
i <- 1 to 3
j <- 'a' to 'c'
if i == 2
if j == 'b'
do
println(s"i = $i, j = $j")

// i = 2, j = b

// 循环赋值
val doubles = for i <- ints yield i * 2
// val doubles: List[Int] = List(2, 4, 6, 8, 10)

// math
val i = 1

// later in the code ...
i match
  case 1 => println("one")
  case 2 => println("two")
  case _ => println("other")

val p = Person("Fred")

// later in the code
p match {
  case Person(name) if name == "Fred" =>
    println(s"$name says, Yubba dubba doo")

  case Person(name) if name == "Bam Bam" =>
    println(s"$name says, Bam bam!")

  case _ => println("Watch the Flintstones!")
}
val p = Person("Fred")

// try/catch/finally
try
  writeTextToFile(text)
catch
  case ioe: IOException => println("Got an IOException.")
  case nfe: NumberFormatException => println("Got a NumberFormatException.")
finally
  println("Clean up your resources here.")
```

### class

``` scala
class Person(var firstName: String, var lastName: String):
  def printFullName() = println(s"$firstName $lastName")

val p = Person("John", "Stephens")
println(p.firstName)   // "John"
p.lastName = "Legend"
p.printFullName()      // "John Legend"
```

### 未完待续
[文档](https://docs.scala-lang.org/scala3/book/taste-functions.html)