---
title: Scala
authorDesc: 豆豆
categories: 开发
date: 2024-03-13 11:38:00
updated: 2024-04-11 16:24:00
tags:
  - Scala
  - 后端
---

以下都是scala3语法

setup `https://www.scala-lang.org/download/`

## 基础

### 数据类型


| 数据类型 | 描述                                                                                             |
| -------- | ------------------------------------------------------------------------------------------------ |
| Byte     | 8位有符号补码整数。数值区间为 -128 到 127                                                        |
| Short    | 16位有符号补码整数。数值区间为 -32768 到 32767                                                   |
| Int      | 32位有符号补码整数。数值区间为 -2147483648 到 2147483647                                         |
| Long     | 64位有符号补码整数。数值区间为 -9223372036854775808 到 9223372036854775807                       |
| Float    | 32 位, IEEE 754 标准的单精度浮点数                                                               |
| Double   | 64 位 IEEE 754 标准的双精度浮点数                                                                |
| Char     | 16位无符号Unicode字符, 区间值为 U+0000 到 U+FFFF                                                 |
| String   | 字符序列                                                                                         |
| Boolean  | true或false                                                                                      |
| Unit     | 表示无值，和其他语言中void等同。用作不返回任何结果的方法的结果类型。Unit只有一个实例值，写成()。 |
| Null     | null 或空引用                                                                                    |
| Nothing  | Nothing类型在Scala的类层级的最底端；它是任何其他类型的子类型。                                   |
| Any      | Any是所有其他类的超类                                                                            |
| AnyRef   | AnyRef类是Scala里所有引用类(reference class)的基类                                               |

### 字符串


``` scala

// 拼接字符串 
val firstName: String = John
val mi: Char = C
val lastName: String = Doe
println(s"Name: $firstName $mi $lastName") // Name: John C Doe

// 多行字符串
val foo = """菜鸟教程
www.runoob.com
www.w3cschool.cc
www.runnoob.com
以上三个地址都能访问"""

```

### 变量声明

``` scala
val xmax, ymax = 100  // xmax, ymax都声明为100
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

// Immutable collections
// a sample list
val nums = (1 to 10).toList   // List(1,2,3,4,5,6,7,8,9,10)

// methods can be chained together as needed
val x = nums.filter(_ > 3)
            .filter(_ < 7)
            .map(_ * 10)

// result: x == List(40, 50, 60)
```
### object
用于创建单例对象,可以包含方法、字段和其他代码,还可以实现接口、继承等操作.

``` scala
object StringUtils:
  def isNullOrEmpty(s: String): Boolean = s == null || s.trim.isEmpty
  def leftTrim(s: String): String = s.replaceAll("^\\s+", "")
  def rightTrim(s: String): String = s.replaceAll("\\s+$", "")
  val x = StringUtils.isNullOrEmpty("")    // true
val x = StringUtils.isNullOrEmpty("a")   // false
```

### class

``` scala
class Person(var firstName: String, var lastName: String):
  def printFullName() = println(s"$firstName $lastName")

val p = Person("John", "Stephens")
println(p.firstName)   // "John"
p.lastName = "Legend"
p.printFullName()      // "John Legend"

// 使用 extends 关键字来扩展特征。然后使用 override 关键字来实现trait里面的任何抽象成员
trait Iterator[A] {
  def hasNext: Boolean
  def next(): A
}

class IntIterator(to: Int) extends Iterator[Int] {
  private var current = 0
  override def hasNext: Boolean = current < to
  override def next(): Int =  {
    if (hasNext) {
      val t = current
      current += 1
      t
    } else 0
  }
}


val iterator = new IntIterator(10)
iterator.next()  // returns 0
iterator.next()  // returns 1
```

### trait

在 Scala 中，trait 是一种特殊的特征（或者称为特质），类似于 Java 中的接口，但比接口更加强大。trait 可以包含抽象方法、具体方法、字段和属性，同时一个类可以实现多个 trait。

下面是 trait 在 Scala 中的一些特点和用法：

* 多重继承：Scala 中的类只能继承一个类，但可以混合多个 trait。这使得 Scala 中的多重继承更加灵活，可以通过组合不同的 trait 来实现各种功能。
* 抽象和具体方法：trait 可以包含抽象方法（未被实现的方法）和具体方法（已经有实现的方法）。一个类实现 trait 时需要实现其所有的抽象方法。
* 字段和属性：trait 可以包含字段和属性，这些字段和属性可以用于描述特定的特性或状态。
* 代码复用：通过使用 trait，可以将通用功能和行为封装在 trait 中，然后让多个类共享这些功能，实现代码的复用和模块化。
* 混入模式：Scala 中的混入模式（Mixin）允许一个类混入（或组合）一个或多个 trait，从而获得 trait 中定义的方法和属性。

总的来说，trait 是 Scala 中非常重要的特性之一，它提供了一种灵活的代码复用机制，可以帮助程序员实现模块化、多重继承和代码组织等目的。通过合理地设计和使用 trait，可以让 Scala 代码更加具有可维护性、灵活性和可扩展性。

``` scala
trait AddService:
  def add(a: Int, b: Int) = a + b

trait MultiplyService:
  def multiply(a: Int, b: Int) = a * b

// implement those traits as a concrete object
object MathService extends AddService, MultiplyService

// use the object
import MathService.*
println(add(1,1))        // 2
println(multiply(2,2))   // 4
```

### 未完待续
[文档](https://docs.scala-lang.org/scala3/book/taste-functions.html)