---
title: Flutter
categories: 开发
date: 2019-12-31 10:54:00
tags:
  - App
  - 前端
---

## 了解Flutter
Flutter的优点非常明显，如果你选择一个跨平台框架，与众多基于html的跨平台框架相比，Flutter绝对是体验最好，性能与构建思路几乎最接近原生开发的框架。
性能强大，流畅
路由设计优秀
优秀的动画设计
## 环境搭建
### windows环境
#### JAVA环境安装
[java下载](https://www.oracle.com/technetwork/java/javase/downloads/jdk8-downloads-2133151.html)

环境变量-系统变量中新增

| Name | Description | Remark |
| :------- | :---------- | :-------- |
| JAVA_HOME | C:\Program Files (x86)\Java\jdk1.8.0_91  | 实际java安装jdk路径|
| CLASSPATH | .;%JAVA_HOME%\lib\dt.jar;%JAVA_HOME%\lib\tools.jar; | 记得前面有个"." |
| Path      | %JAVA_HOME%\bin;%JAVA_HOME%\jre\bin; | 首选确保jdk与jre是在同一个文件夹下 |

#### Flutter环境安装
[flutter sdk下载](https://flutter.io/docs/development/tools/sdk/archive#windows) 选择稳定版本下载后解压至文件夹然后在系统变量 `Path` 中增加路径

`Path ： C:\_Software\flutter\bin`

#### Android Studio安装
[Android Studio 下载](https://developer.android.google.cn/studio/install)
[Android Studio安装教程](https://www.cnblogs.com/xiadewang/p/7820377.html)

打开Android Studio 依次打开file->setting->Plugins  在右侧搜索Flutter并安装

![android Studio](/assets/article/flutter0.png)

安装Android证书 
运行 `flutter doctor --android-licenses` 全程确定
终端输入 `flutter doctor -v`  进行测试 看是否有报错信息
如果提示没有虚拟机可以用VScode直接打开flutter项目然后可以在右下角直接新建一个虚拟机
项目创建需要使用 Android Studio 创建flutter项目。
#### 疑难杂症
- 如果报错main就尝试修改Android studio里面的java路径。
- 如果报错java_home文件夹不对的话就修改文件中的java_home路径
- [安装证书错误window](https://blog.csdn.net/u013275973/article/details/81134169)
- [安装证书错误mac](https://blog.csdn.net/zanj0525/article/details/79774349)
- 如果是Android的翻墙问题则全都改为阿里的链接。

### 验证

输入命令 `java -version`、`java`、`javac`等有反应，说明环境变量配置成功；

### VScode开发配置

安装 `Flutter` 插件

### 常用命令

- `flutter run` 开始运行项目
- r 键：点击后热加载，也就算是重新加载吧。
- p 键：显示网格，这个可以很好的掌握布局情况，工作中很有用。
- o 键：切换android和ios的预览模式。
- q 键：退出调试预览模式。
- 开启Debug模式，这时就可以实现真正的热加载了（我们保存，效果立即就会改变）
- 使用 `flutter upgrade` 命令升级到最新版本。

## 初步了解

- 所有的数字必须至少精确到小数点后一位
- class retrun的函数最后一定要加上 `;`

### 容器对应了解

#### 注意
| Flutter | H5 | 
| :------- | :---------- |
| Text  | span |
| Container  | div |
| Image  | img |
| ListView  | 静态列表 |
| GridView  | 动态列表 |


#### 加入图片的几种形式
Image.asset:加载资源图片，就是加载项目资源目录中的图片,加入图片后会增大打包的包体体积，用的是相对路径。
Image.network:网络资源图片，意思就是你需要加入一段http://xxxx.xxx的这样的网络路径地址。
Image.file:加载本地图片，就是加载本地文件中的图片，这个是一个绝对路径，跟包体无关。

### 定义

```
var myList = List(): 非固定长度的声明。
var myList = List(2): 固定长度的声明。
var myList= List<String>():固定类型的声明方式。
var myList = [1,2,3]: 对List直接赋值。
```

### 动态列表

```
import 'package:flutter/material.dart';
void main () => runApp(MyApp(
  items: new List<String>.generate(1000, (i)=> "Item $i")//生成1000个数组，内容是Item +下标
));

class MyApp extends StatelessWidget{

  final List<String> items;//定义数组变量
  MyApp({Key key, @required this.items}):super(key:key);//接受传入的数组
  @override
  Widget build(BuildContext context ){
      return MaterialApp(
        title:'ListView widget',
        home:Scaffold(
          body:new ListView.builder(
            itemCount:items.length,
            itemBuilder:(context,index){//遍历
              return new ListTile(
                title:new Text('${items[index]}'),
              );
            }
          )
        ),
      );
  }
}
```
### 网格列表组件

```
import 'package:flutter/material.dart';

void main() => runApp(MyApp());

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: "listView widget",
      home: Scaffold(
        body: GridView(
          gridDelegate: SliverGridDelegateWithFixedCrossAxisCount(
              crossAxisCount: 3,//一行几个
              mainAxisSpacing: 2.0,//上下间距
              crossAxisSpacing: 2.0,//左右列表间距
              childAspectRatio: 0.516),//宽高比
              children: <Widget>[
                 new Image.network('http://img5.mtime.cn/mt/2018/10/22/104316.77318635_180X260X4.jpg',fit: BoxFit.cover),
                 new Image.network('http://img5.mtime.cn/mt/2018/10/22/104316.77318635_180X260X4.jpg',fit: BoxFit.cover),
                 new Image.network('http://img5.mtime.cn/mt/2018/10/22/104316.77318635_180X260X4.jpg',fit: BoxFit.cover),
                 new Image.network('http://img5.mtime.cn/mt/2018/10/22/104316.77318635_180X260X4.jpg',fit: BoxFit.cover),
                 new Image.network('http://img5.mtime.cn/mt/2018/10/22/104316.77318635_180X260X4.jpg',fit: BoxFit.cover),
                 new Image.network('http://img5.mtime.cn/mt/2018/10/22/104316.77318635_180X260X4.jpg',fit: BoxFit.cover),
                 new Image.network('http://img5.mtime.cn/mt/2018/10/22/104316.77318635_180X260X4.jpg',fit: BoxFit.cover),
                 new Image.network('http://img5.mtime.cn/mt/2018/10/22/104316.77318635_180X260X4.jpg',fit: BoxFit.cover),
                 new Image.network('http://img5.mtime.cn/mt/2018/10/22/104316.77318635_180X260X4.jpg',fit: BoxFit.cover),
              ],
        ),
      ),
    );
  }
}
```
### 水平布局
Flutter中的row控件就是水平控件，它可以让Row里边的子元素进行水平排列。

Row控件可以分为灵活排列和非灵活排列两种。Row自带的方式会按照元素本身大小排列，却不会充满。Expanded扩展组件类似flex:1。

```
class MyApp2 extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
        title: "listView widget",
        home: Scaffold(
          appBar: new AppBar(
            title: new Text("水平方向布局"),
          ),
          body: new Row(
            children: <Widget>[
              new RaisedButton(
                onPressed: () {},
                color: Colors.redAccent,
                child: new Text("红色按钮"),
              ),
              Expanded(
                //扩展组件可以填满剩下的空间。类似flex:1
                child: new RaisedButton(
                  onPressed: () {},
                  color: Colors.orangeAccent,
                  child: new Text("黄色按钮"),
                ),
              ),
              new RaisedButton(
                onPressed: () {},
                color: Colors.pinkAccent,
                child: new Text("粉色按钮"),
              ),
            ],
          ),
        ));
  }
}
```
### 垂直布局

CrossAxisAlignment.star：居左对齐。
CrossAxisAlignment.end：居右对齐。
CrossAxisAlignment.center：居中对齐。

主轴和副轴的辨识
在设置对齐方式的时候你会发现右mainAxisAlignment属性，意思就是主轴对齐方式，那什么是主轴，什么又是幅轴那。

main轴：如果你用column组件，那垂直就是主轴，如果你用Row组件，那水平就是主轴。

cross轴：cross轴我们称为幅轴，是和主轴垂直的方向。比如Row组件，那垂直就是幅轴，Column组件的幅轴就是水平方向的。

主轴和幅轴我们搞清楚，才能在实际工作中随心所欲的进行布局。

mainAxisAlignment: MainAxisAlignment.center,

```
class MyApp3 extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
        title: "List View widget",
        home: Scaffold(
          appBar: new AppBar(
            title: new Text("垂直方向布局"),
          ),
          body: Column(
            // 交叉轴/横轴/副轴对齐 cross是副轴的意思方向看容器而言
            crossAxisAlignment: CrossAxisAlignment.start,
            mainAxisAlignment: MainAxisAlignment.center,
            children: <Widget>[
              Center(
                child: Text("i love money"),
              ),
              Expanded(
                child: Text("i very love swim"),
              ),
              Center(
                child: Text("i love china"),
              ),
            ],
          ),
        ));
  }
}
```

### 层叠布局

层叠布局的 alignment 属性
alignment属性是控制层叠的位置的，建议在两个内容进行层叠时使用。它有两个值X轴距离和Y轴距离，值是从0到1的，都是从上层容器的左上角开始算起的。
Positioned组件的属性
bottom: 距离层叠组件下边的距离
left：距离层叠组件左边的距离
top：距离层叠组件上边的距离
right：距离层叠组件右边的距离
width: 层叠定位组件的宽度
height: 层叠定位组件的高度

```
class MyApp4 extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: "listView",
      home: Scaffold(
        appBar: new AppBar(
          title: new Text("垂直布局"),
        ),
        body: Center(
          child: new Stack(
            //叠放的意思，层叠组件多个层叠
            alignment: const FractionalOffset(0.5, 0.8), //传入坐标比例
            children: <Widget>[
              new CircleAvatar(
                backgroundImage: new NetworkImage(
                    "https://custom/avatar.jpeg"),
                radius: 50.0,
              ),
              new Container(
                decoration: new BoxDecoration(color: Colors.lightBlue),
                padding: EdgeInsets.all(5.0),
                child: new Text('娃哈哈'),
              ),
              new Positioned(
                //定位组件，自行更改位置
                top: 10.0,
                left: 10.0,
                child: new Text("第一行"),
              ),
              new Positioned(
                top: 30.0,
                left: 10.0,
                child: new Text("第二行"),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
```

### 卡片布局

卡片式布局默认是撑满整个外部容器的，如果你想设置卡片的宽高，需要在外部容器就进行制定。
代码中使用了一个垂直布局组件Column组件，然后利用了ListTile实现内部列表，这里需要说明的是ListTile不光可以使用在ListView组件中，然后容器组件其实都可以使用.

```
class MyApp5 extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    var card = new Card(
      child: Column(
        children: <Widget>[
          ListTile(
            title: new Text(
              "河南省漯河市",
              style: TextStyle(fontWeight: FontWeight.w500),
            ),
            subtitle: new Text("doudou"),
            leading: new Icon(
              Icons.account_box,
              color: Colors.lightBlue,
            ),
          ),
          new Divider(),//下划线
          ListTile(
            title: new Text(
              "河南省漯河市",
              style: TextStyle(fontWeight: FontWeight.w500),
            ),
            subtitle: new Text("doudou"),
            leading: new Icon(
              Icons.account_box,
              color: Colors.lightBlue,
            ),
          ),
          new Divider(),
        ],
      ),
    );
    return MaterialApp(
      title: "list view",
      home: Scaffold(
        appBar: new AppBar(
          title: new Text("卡片布局"),
        ),
        body: Center(
          child: card,
        ),
      ),
    );
  }
}
```
## 跳转
### Navigator.push 和 Navigator.pop
Navigator.push：是跳转到下一个页面，它要接受两个参数一个是上下文context，另一个是要跳转的函数。

Navigator.pop：是返回到上一个页面，使用时传递一个context（上下文）参数，使用时要注意的是，你必须是有上级页面的，也就是说上级页面使用了Navigator.push。

``` 基本跳转
import 'package:flutter/material.dart';

void main() {
  runApp(MaterialApp(
    title: "导航演示",
    home: new FristScreen(),
  ));
}
class FristScreen extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return new Scaffold(
      appBar: new AppBar(
        title: new Text("导航页面"),
      ),
      body: Center(
        child: new RaisedButton(
          child: Text("查看商品详情"),
          onPressed: () {
            Navigator.push(
                context,
                new MaterialPageRoute(
                    builder: (context) => new SecondScreen()));
          },
        ),
      ),
    );
  }
}

class SecondScreen extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: new AppBar(
        title: new Text("详情页"),
      ),
      body: Center(
        child: RaisedButton(
          child: Text("返回"),
          onPressed: () {
            Navigator.pop(context);
          },
        ),
      ),
    );
  }
}
```
### 参数传递与接收
声明数据结构类
Dart中可以使用类来抽象一个数据，比如我们模仿一个商品信息，有商品标题和商品描述。我们定义了一个Product类，里边有两个字符型变量，title和description。

title:是商品标题。
description: 商品详情描述

``` 参数传递与接收
import 'package:flutter/material.dart';

// 路由参数传递

// 定义数据类型
class Product {
  final String title;
  final String description;
  Product(this.title, this.description);
}

// 生成数据列表
void main() {
  // 传递参数到页面
  runApp(MaterialApp(
    title: "数据传递案例",
    home: ProductList(
        products: List.generate(
            20, (i) => Product('商品  $i', "这是一个商品详情，编号为 :$i"))), //List.generate生成数据
  ));
}

class ProductList extends StatelessWidget {
  // 定义参数
  final List<Product> products;
  // 接收参数
  ProductList({Key key, @required this.products}) : super(key: key);
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text("商品列表")),
      body: ListView.builder(
        itemCount: products.length,
        itemBuilder: (context, index) {
          return ListTile(
            title: Text(products[index].title),
            onTap: () {
              // 跳转传参
              Navigator.push(
                  context,
                  MaterialPageRoute(
                      builder: (context) => new ProductDetail(
                            product: products[index],
                          )));
            },
          );
        },
      ),
    );
  }
}

// 接收页面
class ProductDetail extends StatelessWidget {
  final Product product;//定义参数
  ProductDetail({Key key, @required this.product}) : super(key: key);//接收参数
  @override
  Widget build(BuildContext context) {
    return new Scaffold(
      appBar: AppBar(
        title: Text("${product.title}"),
      ),
      body: Center(
        child: Text('${product.description}'),
      ),
    );
  }
}

```

### 页面跳转并返回数据
#### SnackBar的使用
SnackBar是用户操作后，显示提示信息的一个控件，类似Tost，会自动隐藏。SnackBar是以Scaffold的showSnackBar方法来进行显示的。
Scaffold.of(context).showSnackBar(SnackBar(content:Text('$result')));
返回数据的方式
返回数据其实是特别容易的，只要在返回时带第二个参数就可以了。

 Navigator.pop(context,'xxxx');  //xxx就是返回的参数

``` 页面跳转并返回数据
import 'package:flutter/material.dart';

void main() {
  runApp(MaterialApp(title: "页面跳转返回值", home: FirstPage()));
  //意思好像是只有一层路由就没法往回退of了，所以要加一个基础的widget在runApp
}

class FirstPage extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
        appBar: AppBar(
          title: Text("去要号码"),
        ),
        body: Column(
          children: <Widget>[
            RouterButton(),
            Image.asset(
              "img/jd.png",
              width: 100.0,
              height: 100.0,
            ),
            Image.asset(
              "img/jd.png",
              width: 100.0,
              height: 100.0,
            ),
          ],
        ));
  }
}

class RouterButton extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return RaisedButton(
      onPressed: () {
        _navigateToGetNumber(context);
      },
      child: Text("点击跳转要号码"),
    );
  }

// 自有方法的调用
  _navigateToGetNumber(BuildContext context) async {
    final result = await Navigator.push(
        context, MaterialPageRoute(builder: (context) => SecendPage()));
    // showSnackBar为展示弹框记录下个页面退出后的返回值
    Scaffold.of(context).showSnackBar(SnackBar(
      content: Text("$result"),
    )); //意思好像是只有一层路由就没法往回退of了，所以要加一个基础的widget在runApp
  }
}

class SecendPage extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: new Text("我是号码页面"),
      ),
      body: Center(
        child: Column(
          children: <Widget>[
            RaisedButton(
              child: Text("一号种子选手"),
              onPressed: () {
                // 返回上一页，并且带参数
                Navigator.pop(context, '一号：111111');
              },
            ),
            RaisedButton(
              child: Text("二号种子选手"),
              onPressed: () {
                Navigator.pop(context, '三号：222222');
              },
            ),
            RaisedButton(
              child: Text("三号种子选手"),
              onPressed: () {
                Navigator.pop(context, '三号：333333');
              },
            ),
          ],
        ),
      ),
    );
  }
}

```

## 静态资源

### 声明项目资源

如果想配置项目资源文件，就需要使用pubspec.yaml文件，需要把资源文件在这里声明。

比如在项目根目录下新建了一个images文件夹，文件夹下面放了一个图片，图片的名称叫做blogtouxiang.jpg，那我们在pubspec.yaml文件里就要写如下代码进行声明。

```
  assets:
    - images/blogtouxiang.jpg
```

### 使用项目图片资源

有了声明后，我们就可以直接在项目中引用这个文件了。这里使用最简单的代码结构，只用了一张图片。代码如下:

```
import 'package:flutter/material.dart';

void main()=>runApp(MyApp());

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Container(
      child: Image.asset('images/blogtouxiang.jpg'),
    );
  }
}
```

## 客户端打包

### 配置APP的图标
想配置APP的图片，你需要找到下面的目录：

项目根目录`/android/app/src/main/res/`

进入之后你会看到很多mipmap-为前缀命名的文件夹，后边的是像素密度，可以看出图标的分辨率。

mdpi (中) ~160dpi
hdpi （高） ~240dip
xhdpi （超高） ~320dip
xxhdpi （超超高） ~480dip
xxxhdpi （超超超高） ~640dip
将对应像素密度的图片放入对应的文件夹中,图片记得用png格式，记得名字要统一，才能一次性进行配置。

AndroidManifest.xml 文件
这个文件主要用来配置APP的名称、图标和系统权限，所在的目录在:

项目根目录`/android/app/src/main/AndroidManifest.xml`

```
android:label="flutter_app"   //配置APP的名称，支持中文
android:icon="@mipmap/ic_launcher" //APP图标的文件名称
```
### 生成 keystore

这里的坑挺多的，小伙伴一定要注意。官方写的非常简单，只要在终端运行如下代码就可以成功,但事实是报错。

`keytool -genkey -v -keystore ~/key.jks -keyalg RSA -keysize 2048 -validity 10000 -alias key`


根本找不到这个目录，真的很坑，其实我们只是没有配置环境变量。但是为了一个包配置环境变量是不知道的。

这时候可以用下面的命令找到keytool.exe的位置。

`flutter doctor -v`


这时候你直接拷贝命令并进行输入，但这里也有个坑，就是如果文件夹中间带有空空，你需要用带引号扩上。

`D:\Program\Android\'Android Studio'\jre\bin\keytool -genkey -v -keystore ~/key.jks -keyalg RSA -keysize 2048 -validity 10000 -alias key`
这就可以了吗？那你就太天真了，还是会报错。


如果是目录不存在和没有写权限，所以我们要更换一个有写权限的目录。我们把命令改成了下面的形式。

` D:\Program\Android\'Android Studio'\jre\bin\keytool -genkey -v -keystore D:\key.jks -keyalg RSA -keysize 2048 -validity 10000 -alias key`
这时候就可以创建成功了。你的D盘下面就会有一个Jks的文件，记住这个文件不能共享给任何人。

有了这个`key.jks`文件后，可以到项目目录下的android文件夹下，创建一个名为`key.properties`的文件，并打开粘贴下面的代码。



```
storePassword=123123 //输入上一步创建KEY时输入的 密钥库 密码
keyPassword=123123 //输入上一步创建KEY时输入的 密钥 密码
keyAlias=key
storeFile=D:/key.jks //key.jks的存放路径
```

这个工作中也不要分享出去哦，这个Key就算生成成功了。

### 配置key注册
key生成好后，需要在`build.gradle`文件中进行配置。这个过程其实很简单，就是粘贴复制一些东西，你是不需要知道这些文件的具体用处的。

第一项：

进入项目目录的`/android/app/build.gradle`文件，在`android{`这一行前面,加入如下代码：

```
def keystorePropertiesFile = rootProject.file("key.properties")
def keystoreProperties = new Properties()
keystoreProperties.load(new FileInputStream(keystorePropertiesFile))
```

把如下代码进行替换

```
buildTypes {
    release {
        signingConfig signingConfigs.debug
    }
}
```

替换成的代码：

```
signingConfigs {
    release {
        keyAlias keystoreProperties['keyAlias']
        keyPassword keystoreProperties['keyPassword']
        storeFile file(keystoreProperties['storeFile'])
        storePassword keystoreProperties['storePassword']
    }
}
buildTypes {
    release {
        signingConfig signingConfigs.release
    }
}
```
### 错误情况
如果报错找不到文件，或者一直提示密码错误，直接修改文件`/android/app/build.gradle`并且将key文件放到`android/app/`目录内即可

```
    signingConfigs {
        release {
                keyAlias "key"
                keyPassword "123456"
                storeFile file("./key.jks")
                storePassword "123456"
            }
    }
```

生成apk
直接在终端中输入：

flutter build apk

直接安装到虚拟机

Flutter install 

## 常见底部导航制作
引入文件编写

``` main.dart
import 'package:flutter/material.dart';
import 'bottom_navigation_widget.dart';

void main() => runApp(MyApp());

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: "flutter bottom navigationbar",
       theme: ThemeData.light(),
       home: BottomNavigationWidget(),
    );
  }
}

```
### StatefulWidget
`StatefulWidget`具有可变状态(state)的窗口组件（widget）。使用这个要根据变化状态，调整State值。是编写组件的最佳方法。快捷方式stful.

在lib目录下，新建一个`bottom_navigation_widget.dart`文件。

它的初始化和以前使用的StatelessWidget不同

下面的代码可以清楚的看到，使用StatefulWidget分为两个部分，第一个部分是继承与StatefullWidget，第二个部分是继承于State.其实State部分才是我们的重点，主要的代码都会写在State中。
`..add()`是Dart语言的..语法就是返回调用者本身。这里list后用了`..add()`，还会返回list，然后就一直使用..语法，能一直想list里增加widget元素。 最后我们调用了一些父类的`initState()`方法。
``` bottom_navigation_widget.dart
import 'package:flutter/material.dart';
import 'home_screen.dart';//引入不同的页面
import 'pages_screen.dart';
import 'email_screen.dart';
import 'airplay_screen.dart';

class BottomNavigationWidget extends StatefulWidget {
  @override
  _BottomNavigationWidgetState createState() => _BottomNavigationWidgetState();
}

class _BottomNavigationWidgetState extends State<BottomNavigationWidget> {
  // 定义同一颜色
  final _BottomNavigationColor = Colors.blue;
  // 定义下标
  int _currentIndex = 0;
  // 定义页面列表
  List<Widget> list = List();
  @override
  // 扩展运算填入页面赋值给list
  void initState() {
    list
      ..add(HomeScreen())
      ..add(EmailScreen())
      ..add(PagesScreen())
      ..add(AirplayScreen());
    super.initState();
  }

  Widget build(BuildContext context) {
    return Scaffold(
      body: list[_currentIndex],
      // 根据下标展示页面
      bottomNavigationBar: BottomNavigationBar(
        items: [
          BottomNavigationBarItem(
              icon: Icon(Icons.home, color: _BottomNavigationColor),
              title: Text("Home",
                  style: TextStyle(color: _BottomNavigationColor))),
          BottomNavigationBarItem(
              icon: Icon(Icons.email, color: _BottomNavigationColor),
              title: Text("Email",
                  style: TextStyle(color: _BottomNavigationColor))),
          BottomNavigationBarItem(
              icon: Icon(Icons.pages, color: _BottomNavigationColor),
              title: Text("Pages",
                  style: TextStyle(color: _BottomNavigationColor))),
          BottomNavigationBarItem(
              icon: Icon(Icons.airplay, color: _BottomNavigationColor),
              title: Text("Airplay",
                  style: TextStyle(color: _BottomNavigationColor))),
        ],
        currentIndex: _currentIndex,
        // 显示指定下标
        onTap: (int index) {
          // 点击方法并定义接收参数
          setState(() {
            _currentIndex = index;
          });
        },
      ),
    );
  }
}

```

## 不规则底部工具栏制作 （圆形按钮）

### 自定义主题样本
Flutter支持自定义主题，如果使用自定义主题，设置的内容项是非常多的，这可能让初学者头疼，Flutter贴心的为给我们准备了主题样本。

primarySwatch ：现在支持18种主题样本了。

具体代码如下：

```
theme: ThemeData(
  primarySwatch: Colors.lightBlue,
),
```

主入口文件

``` main.dart
import 'package:flutter/material.dart';
import 'bottom_appbar_demo.dart';

void main() => runApp(MyApp());

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: "flutter bottom navigationbar",
      // 主题颜色
      theme: ThemeData(primarySwatch: Colors.lightBlue),
      home: BottomAppBarDemo(),
    );
  }
}

```

### floatingActionButton Widget (活动浮动按钮)
floatingActionButton工作中我们通常简称它为“FAB”，也许只是我们公司这样称呼，从字面理解可以看出，它是“可交互的浮动按钮”,其实在Flutter默认生成的代码中就有这家伙，只是我们没有正式的接触。

一般来说，它是一个圆形，中间放着图标，会优先显示在其他Widget的前面。

下面我们来看看它的常用属性:

onPressed ：点击相应事件，最常用的一个属性。

tooltip：长按显示的提示文字，因为一般只放一个图标在上面，防止用户不知道，当我们点击长按时就会出现一段文字性解释。非常友好，不妨碍整体布局。

child ：放置子元素，一般放置Icon Widget。3

悬浮按钮还没有和低栏进行融合，这时候需要一个属性。
floatingActionButtonLocation: FloatingActionButtonLocation.centerDocked,
这时候就可以和底栏进行融合了。

### BottomAppBar Widget
BottomAppBar 是 底部工具栏的意思，这个要比BottomNavigationBar widget灵活很多，可以放置文字和图标，当然也可以放置容器。

BottomAppBar的常用属性:

color:这个不用多说，底部工具栏的颜色。
shape：设置底栏的形状，一般使用这个都是为了和floatingActionButton融合，所以使用的值都是CircularNotchedRectangle(),有缺口的圆形矩形。
child ： 里边可以放置大部分Widget，让我们随心所欲的设计底栏。

### 组件子页面

新建一个each_view.dart文件，然后输入如下代码：

``` each_view.dart
import 'package:flutter/material.dart';

class EachView extends StatefulWidget {
  String _title;
  EachView(this._title);
  @override
  _EachViewState createState() => _EachViewState();
}

class _EachViewState extends State<EachView> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar:AppBar(title:Text(widget._title)),
      body: Center(child:Text(widget._title)),
    );
  }
}
```

代码中设置了一个内部的_title变量，这个变量是从主页面传递过来的，然后根据传递过来的具体值显示在APP的标题栏和屏幕中间。

### 底部按钮组件

```
import 'package:flutter/material.dart';
import 'each_view.dart';

class BottomAppBarDemo extends StatefulWidget {
  @override
  _BottomAppBarDemoState createState() => _BottomAppBarDemoState();
}

class _BottomAppBarDemoState extends State<BottomAppBarDemo> {
  List<Widget> _eachView; //创建视图数组
  int _index = 0; //数组索引，通过改变索引值改变视图
  @override
  void initState() { //重写初始化方法
    super.initState();
    _eachView = List();
    _eachView..add(EachView("home"))..add(EachView("Me"));
  }

  Widget build(BuildContext context) {
    return Scaffold(
      body: _eachView[_index],
      // 浮动按钮
      floatingActionButton: FloatingActionButton(
        onPressed: () {
          Navigator.of(context)
              .push(MaterialPageRoute(builder: (BuildContext context) {
            return EachView("New Page");
            //返回页面
          }));
        },
        tooltip: "Increment",
        // 工具提示
        child: Icon(
          Icons.add,
          color: Colors.white,
        ),
      ),
      // 浮动按钮位置：中心对接
      floatingActionButtonLocation: FloatingActionButtonLocation.centerDocked,
      bottomNavigationBar: BottomAppBar(
        color: Colors.lightBlue,
        shape: CircularNotchedRectangle(),
        // 形状：圆形缺口矩阵
        child: Row(
          // 主轴大小
          mainAxisSize: MainAxisSize.max,
          // 主轴对齐方式
          mainAxisAlignment: MainAxisAlignment.spaceAround,
          children: <Widget>[
            IconButton(
              icon: Icon(Icons.home),
              color: Colors.white,
              onPressed: () {
                setState(() {
                  _index = 0;
                });
              },
            ),
            IconButton(
              icon: Icon(Icons.airport_shuttle),
              color: Colors.white,
              onPressed: () {
                setState(() {
                  _index = 1;
                });
              },
            ),
          ],
        ),
      ),
    );
  }
}

```

## 炫酷的路由动画