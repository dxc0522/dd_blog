---
title: TypeScript
categories: 开发
date: 2020-02-14 11:13:00
tags:
  - TypeScript
---

## 了解TypeScript
增强版的JavaScript，目的是为了让前端更加规范合理，TypeScript最大的目的是让程序员更具创造性，提高生产力，它将极大增强JavaScript编写应用的开发和调试环节，让JavaScript能够方便用于编写大型应用和进行多人协作。
### TypeScript 与JavaScript两者的特性对比，主要表现为以下几点：
TypeScript是一个应用程序级的JavaScript开发语言。（这也表示TypeScript比较牛逼，可以开发大型应用，或者说更适合开发大型应用）
TypeScript是JavaScript的超集，可以编译成纯JavaScript。这个和我们CSS离的Less或者Sass是很像的，我们用更好的代码编写方式来进行编写，最后还是有好生成原生的JavaScript语言。
TypeScript跨浏览器、跨操作系统、跨主机、且开源。由于最后他编译成了JavaScript所以只要能运行JS的地方，都可以运行我们写的程序，设置在node.js里。
TypeScript始于JavaScript，终于JavaScript。遵循JavaScript的语法和语义，所以对于我们前端从业者来说，学习前来得心应手，并没有太大的难度。
TypeScript可以重用JavaScript代码，调用流行的JavaScript库。
TypeScript提供了类、模块和接口，更易于构建组件和维护。
## 环境安装
`npm install typescript -g` 全局安装
`tsc --init`生成tsconfig.json配置文件
`tsc -b .\tsconfig.json` 编译ts文件为js文件
## 声明变量
ts声明变量必须制定变量类型
TypeScript中的数据类型有：

Undefined : 未定义（大多数不赋值的话直接编辑器就报错了）
Number:数值类型;
string : 字符串类型;
Boolean: 布尔类型；
enum：枚举类型；
any : 任意类型，一个牛X的类型；
void：空类型；void类型像是与any类型相反，它表示没有任何类型。 当一个函数没有返回值时，你通常会见到其返回值类型是void。声明一个void类型的变量没有什么大用，因为你只能为它赋予undefined和null
Array : 数组类型;
Tuple : 元祖类型；
Null ：空类型。

```ts
var stature:number = 178.5
console.log(stature)
var jspang:string = "技术胖 jspang.com"
console.log(jspang)
var c:boolean = false
# 枚举类型enum
enum REN{ nan , nv ,yao}
console.log(REN.yao)  //返回了2，这是索引index，跟数组很想。
# 如果我们想给这些枚举赋值，可以直接使用=,来进行赋值。

enum REN{
    nan = '男',
    nv = '女',
    yao= '妖'
}
console.log(REN.yao)  //返回了妖 这个字
#任意类型其实就是前端现在的方式，可以对变量赋值任意类型。
var t:any =10 
t = "jspang"
t = true
console.log(t)
```
## 类型断言
有时候你会遇到这样的情况，你会比TypeScript更了解某个值的详细信息。 通常这会发生在你清楚地知道一个实体具有比它现有类型更确切的类型。

通过类型断言这种方式可以告诉编译器，“相信我，我知道自己在干什么”。 类型断言好比其它语言里的类型转换，但是不进行特殊的数据检查和解构。 它没有运行时的影响，只是在编译阶段起作用。 TypeScript会假设你，程序员，已经进行了必须的检查。

类型断言有两种形式。 其一是“尖括号”语法：
```
let someValue: any = "this is a string";

let strLength: number = (<string>someValue).length;
```
另一个为as语法：
```
let someValue: any = "this is a string";

let strLength: number = (someValue as string).length;
```
两种形式是等价的。 至于使用哪个大多数情况下是凭个人喜好；然而，当你在TypeScript里使用JSX时，只有as语法断言是被允许的。
## 函数

声明（定义）函数必须加 function 关键字；
函数名与变量名一样，命名规则按照标识符规则；
函数参数可有可无，多个参数之间用逗号隔开；
每个参数参数由名字与类型组成，之间用分号隔开；
函数的返回值可有可无，没有时，返回类型为 void；
大括号中是函数体。
小括号后面的类型是函数返回值return的类型
```
  function searchXiaoJieJie(age:number):string{
      return '找到了'+age+'岁的小姐姐' 
  }
  var age:number = 18
  var result:string = searchXiaoJieJie(age)
  console.log(result)
```
### 传参多种方式
正常传参`age:number`,可选传参`stature?:string`,默认传参`style:string='大胸'`,剩余其他参数传参`...other:string[]`。
```
function searchXiaoJieJie2(age:number,stature?:string,style:string='大胸',...other:string[]):string{

    let yy:string = ''
    yy = '找到了'+age+'岁'
    if(stature !=undefined){
        yy = yy + stature
    }
    return yy+'的小姐姐'

}

var result:string  =  searchXiaoJieJie2(22,'大长腿')
console.log(result)
```
### 函数定义多种方式

#### 函数声明法
函数声明法创建函数是最常用的函数定义法。使用function关键字和函数名去定义一个函数。
```
function add(n1:number,n2:number):number{
    return n1+n2
}
```
#### 函数表达式法
函数表达式法是将一个函数赋值给一个变量，这个变量名就是函数名。通过变量名就可以调用函数了。这种方式定义的函数，必须在定义之后，调用函数。下面例子中等号右边的函数没有函数名，称为匿名函数。
```
var add = function(n1:number,n2:number):number{
    return n1+n2
}

console.log(add(1,4))
```
#### 箭头函数
箭头函数是 ES6 中新增的函数定义的新方式，我们的 TypeScript 语言是完全支持 ES6 语法的。箭头函数定义的函数一般都用于回调函数中。
```
var add = (n1:number,n2:number):number=>{
    return n1+n2
}

console.log(add(1,4))
```
## 引用类型数组
初始化数组的两种方法

### 声明数组的方法
```
let arr1:number[ ]     //声明一个数值类型的数组
let arr2:Array<string>  //声明一个字符串类型的数组
```
### 给数组赋值

数组是存储大量数据的集合，声明数组之后，需要给数组存储数据。这时候有两种方法：

字面量赋值法：直接使用“[ ]”对数组进行赋值。
构造函数赋值法：
#### ** 字面量赋值法**
```
//定义一个空数组，数组容量为0
let arr1:number[] = [] 
//定义一个数组时，直接给数组赋值
let arr2:number[] = [1,2,3,4,5]
//定义数组 的同事给数组赋值
let arr3:Array<string> = ['jspang','技术胖','金三胖']
let arr4:Array<boolean> = [ true,false,false]
```
需要注意的是，在TypeScript中指定数据类型的数组只能存储同一类型的数组元素。
```
//报错！ 必须存储number类型的数据
let arr5:number[] = [1,2,true]
```
#### 构造函数赋值法

在 TypeScript 中使用 Array 这个引用类型来表示数组的，那么每一个数组都是 Array 类型的实例。那么，我们在创建数组的时候也可以使用构造函数来进行赋值。
```
let arr1:number[] = new Array()
let ara2:number[] = new Array(1,2,3,4,5)
let arr3:Array<string> = new Array('jspang','技术胖','金三胖')
let arr4:Array<boolean> = new Array(true,false,false)
```
这两种方法，都可以给数组进行赋值，在实际开发中使用哪种方法都是可以的。

### 认识元祖，一种特殊的数组
元祖是一种特殊的数组，元祖类型允许表示一个已知元素数量和类型的数组，各元素的类型不必相同。比如，你可以定义一对值分别为string和number类型的元祖。元祖在实际开发中使用的非常少，大家了解一下就可以了，不做过多介绍。

//声明一个元祖类型
let x : [string,number]
//正确的初始化
x = ['hello',10]
//错误的初始化方法
x = [10,'hello']

## 引用类型-字符串
在TypeScript中存在两种类型的字符串：基本类型字符串和引用类型字符串。

### 字符串的两种类型
基本类型字符串：由单引号或者双引号括起来的一串字符串。
引用类型字符串：用new 实例化的 String类型。JavaScript的开发人员为了大家更容易的操作字符串，有了引用类型的字符串就可以给字符串增加一系列方法了。
```
let jspang:string = '技术胖'
let jspanga:String = new String("jspang.com")
console.log(jspang)
console.log(jspanga)
``` 
编译以后我们使用node 运行这段代码，你可以看到控制台输出了的结果，这可能跟你心里想的不太一样。
```
技术胖
[String: 'jspang.com']
```
需要说明的是这两种声明字符串的方法没有什么不同。基本类型的字符串可以直接使用引用类型的属性和方法。

### 字符串的方法
字符串的截取长度等方法与js一样。

## 引用类型-日期对象
TypeScript中使用Date这个引用类型来存储日期对象，如果你要声明一个日期变量时，记得也要注明它的类型是Date。


### 创建日期对象

日期对象是Date的实例，可以使用构造函数的方法进行创建。并且构造函数中可以传递多种类型的参数。

### 1.不传递任何参数
构造函数中不传递参数时，Date（）构造函数将根据当前日期和时间创建一个Date对象。我们看下面的例子理解一下。
```
let d:Date = new Date()
console.log(d)
```
这时候运行node的结果如下：

`2018-09-06T06:48:12.504Z`
### 2.传递一个整数
传递一个整数，这个整数代表的是距离1970-01-01 00:00:00的毫秒数（具体为什么是这个时间，小伙伴可以自己百度一下）。例如：传入参数为1000，将创建一个表示1970-01-01 00:00:01的日期对象。

我们举个例子，传递一个整数，看一下结果。
```
let d:Date = new Date(1000)
let da:Date = new Date(2000)
console.log(d)  //1970-01-01T00:00:01.000Z
console.log(da) //1970-01-01T00:00:02.000Z
```
### 3.传递一个字符串
如果传递一个表示日期的字符串，就会生成相对应的日期对象。字符串的格式常用:yyyy/MM/dd hh:mm:ss，yyyy-MM-dd hh:mm:ss，yyyy-MM-ddThh:mm:ss等,具体可以参看下面的例子。
```
let d1:Date = new Date('2018/09/06 05:30:00')
let d2:Date = new Date('2018-09-06 05:30:00')
let d3:Date = new Date('2018-09-06T05:30:00')
console.log(d1)
console.log(d2)
console.log(d3)
```
当然，他们打印出来的结果时完全相同的，所以在开发中你不用太过于纠结使用哪种方式进行声明。

### 4.传递表示年月日时分秒的变量

`let d:Date = new Date(year,month,day,hours,minutes,seconds,ms);`
year 表示年份，4位数字。
month表示月份，数值是0(1月)~11(12月)之间的整数。
day 表示日期。数值是1~31之间的整数。
hours 表示小时，数值是0-23之间的整数。
minutes 表示分钟数，数值是0~59之间的整数。
seconds 表示秒数，数值是0~59之间的整数。
ms 表示毫秒数，数值是0~999之间的整数。
至于Date类型的方法，跟JavaScript完全一样。

## 引用类型-正则表达式

认识正则表达式
创建正则表达式和字符串犹如一对好基友（类似），创建正则表达式也提供了两种方法，一种是才采用new 关键字，另一种是采用字面量的方式。


### 构造函数法

构造函数中可以传一个参数，也可以传递两个参数。一个是字符串描述，另一个是修饰符，比如g是全局修饰符，i是忽略大小写，m是多行模式。

举个例子：
```
let reg1:RegExp = new RegExp("jspang")  //表示字符串规则里含有jspang
console.log(reg1)
let reg2:RegExp = new RegExp("jspang",'gi')
console.log(reg2)
```
其实现在打印出来的就是字面量的赋值方法。我们可以在视频中看到输出的结果。

### 字面量法

其实构造函数的方法我个人用的是比较少的，我都会使用字面量法来声明正则表达式。
```
let reg3:RegExp = /jspang/
let reg4:RegExp = /jspang/gi
```
### RegExp中的常用方法
RegExp对象包含两个方法：test( )和exec( ),功能基本相似，用于测试字符串匹配。

test(string) ：在字符串中查找是否存在指定的正则表达式并返回布尔值，如果存在则返回 true，不存在则返回 false。
exec(string) : 用于在字符串中查找指定正则表达式，如果 exec() 方法执行成功，则返回包含该查找字符串的相关信息数组。如果执行失败，则返回 null。
来看一个test的例子：
```
let reg1:RegExp =  /jspang/i
let website:string = 'jspang.com'
let result:boolean = reg1.test(website)
console.log(result)    //true
```
这时候控制台打印出来的是true，那么我们再来看一下exec的使用方法。
```
let reg1:RegExp =  /jspang/i
let website:string = 'jspang.com'
console.log(reg1.exec(website))
//[ 'jspang', index: 0, input: 'jspang.com' ]
```
输出的结果变为了`[ 'jspang', index: 0, input: 'jspang.com' ]`。

## 面向对象编程-类的声明和使用

### 声明类
```
class Jspang{
     name:string
     age : number
     skill: string
    constructor(name:string,age:number,skill:string){
        this.name = name
        this.age = age
        this.skill = skill
    }
     interest(){
        console.log('找小姐姐')
    }
}

let jspangObj:Jspang = new Jspang('技术胖',18,'web')
jspangObj.interest()
```
我们先用class关键字声明了一个类，并在里边声明了name和age属性。constructor为构造函数。构造函数的主要作用是给类中封装的属性进行赋值。
### 类的继承

继承：允许我们创建一个类（子类），从已有的类（父类）上继承所有的属性和方法，子类可以新建父类中没有的属性和方法。

现在技术胖要繁衍生息了，跟准备生个儿子（也就是我们说的子类）。那我的儿子一定要比我强啊，他不仅完全继承了我的基因，还增加了帅气的属性和赚钱的本领。

我们看看如何用程序实现。
```
class JsShuai extends Jspang{
    public xingxiang:string = '帅气'
    public zhuangQian(){
        console.log('一天赚了一个亿')
    }
}

let shuai = new JsShuai("技术帅",5,'演讲')
shuai.interest()
shuai.zhuangQian()
```
extends关键字就是继承的重点,但是有一点需要我们注意，TypeScript不支持多重继承。

### 类方法的重写
重写就是在子类中重写父类的方法。例如，我的儿子“技术帅”发现兴趣爱好是找小姐姐，完成不了“”一天赚一个亿“”的目标，它需要多个兴趣，开平台网站。这时候我们就用到了重写。看下面的列子代码：
```
class JsShuai extends Jspang{
    public xingxiang:string = '帅气'
    public interest(){
        super.interest()
        console.log('建立电商平台')
    }
    public zhuangQian(){
        console.log('一天赚了一个亿')
    }
}
```
先是继承了父类的方法，然后通过super关键字调用了父类的方法，实现了技能的增加。
## 面向对象编程-修饰符

public:公有修饰符，可以在类内或者类外使用public修饰的属性或者行为，默认修饰符。
protected:受保护的修饰符，可以本类和子类中使用protected修饰的属性和行为。
private : 私有修饰符，只可以在类内使用private修饰的属性和行为。
readonly :只读属性修饰符,只读属性必须在生命时或者构造函数里被初始化（注意）。
```
class XiaoJieJie2{
    public readonly sex:string
    protected name:string
    private age:number
    public constructor(sex:string,name:string,age:number){
        this.sex=sex
        this.name=name
        this.age=age
    }
    public sayHello(){
        console.log('小哥哥好')
    }

    protected sayLove(){
        console.log('我爱你')
    }
}

var jiejie2:XiaoJieJie2 = new XiaoJieJie2('女','热巴',22)
jiejie2.sex='男' //报错
console.log(jiejie2.sex)
console.log(jiejie2.name)   //报错
console.log(jiejie2.age)    //报错
jiejie2.sayHello()
jiejie2.sayLove()    //报错
```
你可以在写代码的时候，就会发现，编辑器已经给我们报错了。

## 面向对象编程-接口
在通常情况下，接口是用来定义一些规范，使用这些接口，就必须实现按照接口中的规范来走。

在面向对象的语言中，术语interface经常被用来定义一个不包含数据和逻辑代码但是用来签名定义了行为的抽象类型。

### 认识接口
定义接口的关键字是interface。我们现在就来定义一个接口，这个接口是用来规范丈夫的。
```
interface Husband {
    sex:string
    interest:string
}
let myhusband:Husband ={ sex:'男',interest:'看书、作家务'}
console.log(myhusband)
```
我们通过接口，定义了一个找老公的接口，并且给他了两个必选项：性别和兴趣爱好.

### 可选参数的接口
对老公的标准如果我们有一些可选项，这些并不是都需要显示出来的，在有些情况下，我们只需要传入部分参数。我们可以使用问好的形式来设置可选参数。

比如现在我们还希望老公的标准，有一条是给我“买包包”，但是这个是隐喻的，不是直接显示出来的。我们修改我们的接口。
```
interface Husband {
    sex:string
    interest:string
    maiBaoBao?:Boolean
}
let myhusband:Husband ={ sex:'男',interest:'看书、作家务',maiBaoBao:true}
console.log(myhusband)
```
上面的代码maiBaoBao选项就是可选的，可以写也可以不写。

### 规范函数类型接口
我们还可以使用接口来规范函数类型的接口，比如现在要找老公这件事，我们规定有一些资源，然后我们需要哪些资源，在函数中进行匹配，最后返回是否匹配成功。
```
interface  SearchMan{
    (source:string,subString:string):boolean
}

let mySearch:SearchMan

mySearch = function(source:string,subString:string):boolean{
    let flag =source.search(subString)
    return (flag != -1)
} 

console.log(mySearch('高、富、帅、德','胖')) //false
```
接口还可以规范类，但形式都和上满讲的差不多。工作中利用接口就是规范程序标准化使用的，在大团队中经常使用。但是如果是小团队，我觉的接口使用的并不多。

## 面向对象编程-命名空间
在制作大型应用的时候，为了让程序更加有层次感和变量之间不互相干扰，我们可以使用命名空间来构建程序。举个小例子：比如“德华”这件事，帅哥也有叫德华的，二师兄也有叫德华的。那我们要如何区分那。

### 命名空间的使用
当然命名空间就是解决这个问题的，命名空间，又称内部模块，被用于组织有些具有内在联系的特性和对象。我们来看一个例子：
```
namespace shuaiGe{
    export class Dehua{
        public name:string = '刘德华'
        talk(){
            console.log('我是帅哥刘德华')
        }
    }
}

namespace bajie{
    export class Dehua{
        public name:string = '马德华'
        talk(){
            console.log('我是二师兄马德华')
        }
    }
}

let dehua1:shuaiGe.Dehua   = new shuaiGe.Dehua()
let dehua2:shuaiGe.Dehua   = new bajie.Dehua()
dehua1.talk()
```
程序我会在视频中详细讲解，通过命名空间我们很好的把程序变的清晰了，各位小姐姐也再也不会刘德华和马德华傻傻分不清了。
