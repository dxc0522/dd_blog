---
title: Python
categories: 开发
date: 2020-03-05 11:14:00
tags:
  - 爬虫
  - python
---
## 了解Python
Python的哲学就是简单优雅，尽量写容易看明白的代码，尽量写少的代码。如果一个资深程序员向你炫耀他写的晦涩难懂、动不动就几万行的代码，你可以尽情地嘲笑他。

那Python适合开发哪些类型的应用呢？

首选是网络应用，包括网站、后台服务等等；

其次是许多日常需要的小工具，包括系统管理员需要的脚本任务等等；

另外就是把其他语言开发的程序再包装起来，方便使用。

最后说说Python的缺点。

任何编程语言都有缺点，Python也不例外。优点说过了，那Python有哪些缺点呢？

第一个缺点就是运行速度慢，和C程序相比非常慢，因为Python是解释型语言，你的代码在执行时会一行一行地翻译成CPU能理解的机器码，这个翻译过程非常耗时，所以很慢。而C程序是运行前直接编译成CPU能执行的机器码，所以非常快。

## 须知
Python程序是缩进书写代码并且大小写敏感的
pass 不做任何事情，一般用做占位语句。
## 基础
### 变量赋值
Python 中的变量赋值不需要类型声明。

每个变量在内存中创建，都包括变量的标识，名称和数据这些信息。

每个变量在使用前都必须赋值，变量赋值以后该变量才会被创建。
例：counter = 100 # 赋值整型变量
多个变量赋值
Python允许你同时为多个变量赋值
a = b = c = 1

### 标准数据类型

在内存中存储的数据可以有多种类型。

例如，一个人的年龄可以用数字来存储，他的名字可以用字符来存储。

Python 定义了一些标准类型，用于存储各种类型的数据。

Python有五个标准的数据类型：

Numbers（数字）
String（字符串）
List（列表）
Tuple（元组）
Dictionary（字典）

#### Python数字

Python支持四种不同的数字类型：

int（有符号整型）
long（长整型[也可以代表八进制和十六进制]）
float（浮点型）
complex（复数）

```py
int(x [,base ])         将x转换为一个整数  
long(x [,base ])        将x转换为一个长整数  
float(x )               将x转换到一个浮点数  
complex(real [,imag ])  创建一个复数  
str(x )                 将对象 x 转换为字符串  
repr(x )                将对象 x 转换为表达式字符串  
eval(str )              用来计算在字符串中的有效Python表达式,并返回一个对象  
tuple(s )               将序列 s 转换为一个元组  
list(s )                将序列 s 转换为一个列表  
chr(x )                 将一个整数转换为一个字符  
unichr(x )              将一个整数转换为Unicode字符  
ord(x )                 将一个字符转换为它的整数值  
hex(x )                 将一个整数转换为一个十六进制字符串  
oct(x )                 将一个整数转换为一个八进制字符串  
```

Python math 模块、cmath 模块

{%  img "/assets/img/python/11.png" %}
{%  img "/assets/img/python/12.png" %}
{%  img "/assets/img/python/13.png" %}
#### Python字符串
字符串或串(String)是由数字、字母、下划线组成的一串字符。

一般记为 :

s="a1a2···an"(n>=0)
它是编程语言中表示文本的数据类型。

python的字串列表有2种取值顺序:

从左到右索引默认0开始的，最大范围是字符串长度少1
从右到左索引默认-1开始的，最大范围是字符串开头
如果你要实现从字符串中获取一段子字符串的话，可以使用 [头下标:尾下标] 来截取相应的字符串，其中下标是从 0 开始算起，可以是正数或负数，下标可以为空表示取到头或尾。

[头下标:尾下标] 获取的子字符串包含头下标的字符，但不包含尾下标的字符。

比如:

```py
>>> s = 'abcdef'
>>> s[1:5]
'bcde'
```
![Picture](https://www.runoob.com/wp-content/uploads/2013/11/o99aU.png)
#### Python列表
List（列表） 是 Python 中使用最频繁的数据类型。

列表可以完成大多数集合类的数据结构实现。它支持字符，数字，字符串甚至可以包含列表（即嵌套）。

列表用 [ ] 标识，是 python 最通用的复合数据类型。

列表中值的切割也可以用到变量 [头下标:尾下标] ，就可以截取相应的列表，从左到右索引默认 0 开始，从右到左索引默认 -1 开始，下标可以为空表示取到头或尾。

{% img "https://www.runoob.com/wp-content/uploads/2013/11/list_slicing1.png" %}

更新列表

list.append('Google')   ## 使用 append() 添加元素

删除列表元素

del list1[2]

Python列表脚本操作符

{%  img "/assets/img/python/19.png" %}

Python列表截取

{%  img "/assets/img/python/20.png" %}

Python列表函数&方法

{%  img "/assets/img/python/21.png" %}

#### Python 元组

元组是另一个数据类型，类似于 List（列表）。

元组用 () 标识。内部元素用逗号隔开。但是元组不能二次赋值，相当于只读列表。

```py
    #!/usr/bin/python
    # -*- coding: UTF-8 -*-
    
    tuple = ( 'runoob', 786 , 2.23, 'john', 70.2 )
    tinytuple = (123, 'john')
    
    print tuple               # 输出完整元组
    print tuple[0]            # 输出元组的第一个元素
    print tuple[1:3]          # 输出第二个至第四个（不包含）的元素 
    print tuple[2:]           # 输出从第三个开始至列表末尾的所有元素
    print tinytuple * 2       # 输出元组两次
    print tuple + tinytuple   # 打印组合的元组
    以上实例输出结果：

    ('runoob', 786, 2.23, 'john', 70.2)
    runoob
    (786, 2.23)
    (2.23, 'john', 70.2)
    (123, 'john', 123, 'john')
    ('runoob', 786, 2.23, 'john', 70.2, 123, 'john')
    以下是元组无效的，因为元组是不允许更新的。而列表是允许更新的：

    实例(Python 2.0+)
    #!/usr/bin/python
    # -*- coding: UTF-8 -*-
    
    tuple = ( 'runoob', 786 , 2.23, 'john', 70.2 )
    list = [ 'runoob', 786 , 2.23, 'john', 70.2 ]
    tuple[2] = 1000    # 元组中是非法应用
    list[2] = 1000     # 列表中是合法应用
```

Python 转义字符

{%  img "/assets/img/python/14.png" %}
{%  img "/assets/img/python/15.png" %}

Python 字符串格式化

Python 支持格式化字符串的输出 。尽管这样可能会用到非常复杂的表达式，但最基本的用法是将一个值插入到一个有字符串格式符 %s 的字符串中。

在 Python 中，字符串格式化使用与 C 中 sprintf 函数一样的语法。

如下实例：

```py
#!/usr/bin/python

print "My name is %s and weight is %d kg!" % ('Zara', 21) 
以上实例输出结果：

My name is Zara and weight is 21 kg!
```

{%  img "/assets/img/python/16.png" %}
{%  img "/assets/img/python/17.png" %}

Python 三引号

Python 中三引号可以将复杂的字符串进行赋值。

Python 三引号允许一个字符串跨多行，字符串中可以包含换行符、制表符以及其他特殊字符。

三引号的语法是一对连续的单引号或者双引号（通常都是成对的用）。

```py
 >>> hi = '''hi 
there'''
>>> hi   # repr()
'hi\nthere'
>>> print hi  # str()
hi 
there  
```

三引号让程序员从引号和特殊字符串的泥潭里面解脱出来，自始至终保持一小块字符串的格式是所谓的WYSIWYG（所见即所得）格式的。

一个典型的用例是，当你需要一块HTML或者SQL时，这时当用三引号标记，使用传统的转义字符体系将十分费神。

```py
 errHTML = '''
<HTML><HEAD><TITLE>
Friends CGI Demo</TITLE></HEAD>
<BODY><H3>ERROR</H3>
<B>%s</B><P>
<FORM><INPUT TYPE=button VALUE=Back
ONCLICK="window.history.back()"></FORM>
</BODY></HTML>
'''
cursor.execute('''
CREATE TABLE users (  
login VARCHAR(8), 
uid INTEGER,
prid INTEGER)
''')
```

Unicode 字符串

Python 中定义一个 Unicode 字符串和定义一个普通字符串一样简单：

```py
>>> u'Hello World !'
u'Hello World !'
引号前小写的"u"表示这里创建的是一个 Unicode 字符串。如果你想加入一个特殊字符，可以使用 Python 的 Unicode-Escape 编码。如下例所示：

>>> u'Hello\u0020World !'
u'Hello World !'
被替换的 \u0020 标识表示在给定位置插入编码值为 0x0020 的 Unicode 字符（空格符）。
python的字符串内建函数
字符串方法是从python1.6到2.0慢慢加进来的——它们也被加到了Jython中。

这些方法实现了string模块的大部分方法，如下表所示列出了目前字符串内建支持的方法，所有的方法都包含了对Unicode的支持，有一些甚至是专门用于Unicode的。
```

{%  img "/assets/img/python/18.png" %}

#### Python 字典

字典(dictionary)是除列表以外python之中最灵活的内置数据结构类型。列表是有序的对象集合，字典是无序的对象集合。

两者之间的区别在于：字典当中的元素是通过键来存取的，而不是通过偏移存取。

字典用"{ }"标识。字典由索引(key)和它对应的值value组成。

```py
#!/usr/bin/python
# -*- coding: UTF-8 -*-
 
dict = {}
dict['one'] = "This is one"
dict[2] = "This is two"
 
tinydict = {'name': 'john','code':6734, 'dept': 'sales'}
 
 
print dict['one']          # 输出键为'one' 的值
print dict[2]              # 输出键为 2 的值
print tinydict             # 输出完整的字典
print tinydict.keys()      # 输出所有键
print tinydict.values()    # 输出所有值
输出结果为：

This is one
This is two
{'dept': 'sales', 'code': 6734, 'name': 'john'}
['dept', 'code', 'name']
['sales', 6734, 'john']
```

字典内置函数&方法

{%  img "/assets/img/python/22.png" %}

### Python数据类型转换
{%  img "/assets/img/python/01.png" %}
### Python算术运算符
{%  img "/assets/img/python/02.png" %}
### Python比较运算符
{%  img "/assets/img/python/03.png" %}
### Python赋值运算符
{%  img "/assets/img/python/04.png" %}
### Python位运算符
{%  img "/assets/img/python/05.png" %}
### Python逻辑运算符
{%  img "/assets/img/python/06.png" %}
### Python成员运算符
{%  img "/assets/img/python/07.png" %}
### Python身份运算符
{%  img "/assets/img/python/08.png" %}
### Python运算符优先级
{%  img "/assets/img/python/09.png" %}
## Python 条件语句

if 判断条件：
    执行语句……
else：
    执行语句……

## Python 循环语句

{%  img "/assets/img/python/10.png" %}

### Python While 循环语句

```py
count = 0
while count < 5:
   print count, " is  less than 5"
   count = count + 1
else:
   print count, " is not less than 5"
```

### Python for 循环语句

```py
for num in range(10,20):  # 迭代 10 到 20 之间的数字
   for i in range(2,num): # 根据因子迭代
      if num%i == 0:      # 确定第一个因子
         j=num/i          # 计算第二个因子
         print '%d 等于 %d * %d' % (num,i,j)
         break            # 跳出当前循环
   else:                  # 循环的 else 部分
      print num, '是一个质数'
```

## 时间 time

[手册](https://www.runoob.com/python/python-date-time.html)

## 函数 大同小异

[菜鸟手册](https://www.runoob.com/python/python-functions.html)

## 个人代码
### 获取代理

```py
import requests
from lxml import etree
import time
from multiprocessing import Pool
import multiprocessing
import sys
from fake_useragent import UserAgent

ua = UserAgent()



class Get_Proxy_IP(object):
    def __init__(self, totalPage=3):
        self.url = "https://ip.ihuan.me/today.html"
        self.totalPage = totalPage
        self.get_proxy_list = []

    def start(self):
        try:
            todayPage = etree.HTML(requests.get(self.url, headers={
                "User-Agent": ua.random,
            }).content.decode()).xpath("//div[position()<=%s][@class='bs-callout bs-callout-info']/a/@href" % (self.totalPage))
            for item_url in todayPage:
                self.get_item_ip(item_url)
                time.sleep(3)
            f = open('ip_proxies_valid.txt', 'w+')
            for ip in self.get_proxy_list:
                f.write(ip)
            f.close()
            print("数据保存至ip_proxies_valid.txt")
        except:
            print("被屏蔽了")

    def get_item_ip(self, item_url):
        try:
            print("https://ip.ihuan.me"+item_url)
            page_content = etree.HTML(requests.get("https://ip.ihuan.me"+item_url, headers={
                "User-Agent": ua.random,
            }).content.decode()).xpath("//p[@class='text-left']/text()")
            for item in page_content:
                item_ip = item[0:item.find("@")].replace(" ", "")
                if len(item_ip) > 6:
                    self.get_proxy_list.append(item_ip+"\n")
        except:
            pass


if __name__ == "__main__":
    Get_Proxy_IP(2).start()

```

### 代理请求封装

```py
import requests
import random
from fake_useragent import UserAgent
from multiprocessing import Pool
import multiprocessing

ua = UserAgent()
proxy_ip_arr = []
with open('ip_proxies_valid.txt', 'r') as f:
    proxy_ip_arr = f.readlines()
f.close()

# 防止报错连接过多
requests.urllib3.disable_warnings()
requests.adapters.DEFAULT_RETRIES = 5
requests.urllib3.PoolManager(num_pools=10000)
s = requests.session()
s.keep_alive = False


def use_proxy_requst(url="https:www.baidu.com", Referer="", proxies={
    'http':   random.choice(proxy_ip_arr).strip("\n"),
}):
    # print("代理IP：%s" % (proxies['http']))
    # print(url,Referer,proxies)
    try:
        response = requests.get(
            url, headers={
                'Connection': 'close',
                "User-Agent": ua.chrome,
                "Referer": Referer
            }, proxies=proxies, timeout=3)
        # },timeout=2, verify=False)
        # print(proxies['http']+"有效！")
        return response
    except BaseException as e:
        # print(e)
        # raise RuntimeError()
        pass
def test_proxy_ip():
    store_ip_list = []
    test_file = "ip_proxies_valid.txt"
    # test_file="test_prixy_ip.txt"
    print("开始验证!")
    with open(test_file, 'r') as f:
        store_ip_list = f.readlines()
    f.close()
    print("共需要测试"+str(len(store_ip_list))+"个ip")
    p = Pool(20)
    for ip in store_ip_list:
        # use_proxy_requst("https://www.baidu.com/", "", {'http': ip.strip("\n")})
        p.apply_async(use_proxy_requst, ("https://www.baidu.com/", "", {'http': ip.strip("\n")},))
    p.close()
    p.join()

if __name__ == "__main__":

    # response = use_proxy_requst("https://7v57.com/")
    # print(response)
    # if response.status_code == 200:
    #     print("有效")
    # else:
    #     print("无效")
    test_proxy_ip()
```

### 删除目录下空文件夹

```py
import os


def remove_null_fille(basePath="./"):
    fileList = os.listdir(basePath)
    fileNum = len(fileList)
    for i in fileList:
        try:
            os.rmdir(basePath+"/"+i)
            print(basePath+"/"+i+"为空文件夹")
        except Exception as e:
            print('Exception', e)
    now_file_num = len(os.listdir(basePath))
    print("完成！已删除%s个空文件夹" % (fileNum-now_file_num))

```

### 稳定爬取图片

```
from lxml import etree
import os
import time
from fake_useragent import UserAgent
from string import Template
from multiprocessing import Pool
import random
import urllib3
from proxy_requst import use_proxy_requst
from tqdm import tqdm



class Spider(object):

    def start_request(self):
        # *1. 获取整体网页的数据 requests
        try:
            for i in range(0, 500):
                print("==========正在抓取%s页==========" % i)
                pageUrl = "https://www.mzitu.com/xinggan/page/" + str(i) + "/"
                response = use_proxy_requst(
                    pageUrl, "https://www.mzitu.com/xinggan/")
                html = etree.HTML(response.content.decode())
                time.sleep(3)
                self.xpath_data(html, pageUrl)
        except:
            print("IP已被屏蔽 等待20s")
            time.sleep(20)
            print("再次尝试访问")
            self.start_request()
    def xpath_data(self, html, pageUrl):
        # *2. 抽取想要的数据 标题 图片 xpath
        alt_list = html.xpath('//ul[@id="pins"]/li/a/img/@alt')
        hrefs_list = html.xpath('//ul[@id="pins"]/li/a/@href')
        # p = Pool(2)
        for href, alt in zip(hrefs_list, alt_list):
            if not os.path.exists("img/"+alt):
                os.makedirs("img/"+alt)
            item_responset = use_proxy_requst(href, pageUrl)
            time.sleep(3)
            item_totalpage = int(etree.HTML(item_responset.content.decode()).xpath(
                "//div[@class='pagenavi']/a[last()-1]/span/text()")[0])
            if not os.path.exists("img/"+alt) or len(os.listdir("./img/"+alt))!=item_totalpage:
                print(alt+"正在下载...")
                for i in tqdm(range(1, item_totalpage+1)):
                    if not os.path.exists("img/"+alt+"/"+alt+str(i)+".jpg"):
                        self.down_img(alt, href+"/"+str(i), alt+str(i), pageUrl)
                        # p.apply_async(self.down_img, (alt, href+"/"+str(i), alt+str(i), pageUrl))
            else:
                print(alt+"已存在")
        # p.close()
        # p.join()
        print("爬取图片结束")

    def down_img(self, alt, href, item_name, pageUrl):
        # *下载图片
        try:
            time.sleep(5*random.random())
            item_responset = use_proxy_requst(href, pageUrl)
            item_src = etree.HTML(item_responset.content.decode()).xpath(
                "//div[@class='main-image']/p/a/img/@src")
            if len(item_src) > 0:
                response = use_proxy_requst(item_src[0], pageUrl)
                # 3. 存储数据 jpg with open
                with open("./img/"+alt+"/"+item_name+".jpg", "wb") as f:
                    f.write(response.content)
        except:
            item_src = etree.HTML(item_responset.content.decode()).xpath("//img/@src")[0]
            print(item_src)
            print("==========文件名有误！==========")


if __name__ == "__main__":

    spider = Spider()
    spider.start_request()

```

### 四种方式爬取视频

```py
# coding=utf-8
from lxml import etree
import os,random
import sys
import you_get
from fake_useragent import UserAgent
import re
from multiprocessing import Pool
import time
from proxy_requst import use_proxy_requst


class Spider(object):
    def __init__(self):
        self.href = "https://7v57.com/"

    def get_channel(self):
        # * 获取类目
        response = etree.HTML(use_proxy_requst(self.href).content.decode(
        )).xpath("//ul[@class='tags-list']/li/*")
        for channel_item in response:
            if channel_item.text:
                self.start_request(
                    channel_item.attrib["href"], "video/"+channel_item.text+"/")

    def start_request(self, href, path):
        # *获取列表分页
        totalpage = int(etree.HTML(use_proxy_requst(self.href+href, self.href).content.decode()).xpath(
            "//ul[@class='pagination']/li[last()-2]/a/text()")[0]) if type(isTotalpage) == bool else isTotalpage
        if not os.path.exists(path):
            os.makedirs(path)
        for i in range(1, int(totalpage)):
            if i == 1:
                item_response = use_proxy_requst(self.href+href, self.href)
            else:
                item_response = use_proxy_requst(
                    self.href+href+"/index_"+str(i)+".html", self.href+href+"/index_"+str(i-1)+".html")

            self.list_data(item_response, path)

    def list_data(self, html, path):
        # *内容详情页操作
        page_list = etree.HTML(html.content.decode()).xpath(
            "//ul[@class='masonry']/li/@data-href")
        path = path.replace(" ", "")
        # pool = Pool(moreThread)
        for href in page_list:
            if len(href) > 2:
                item_response = use_proxy_requst(self.href+href, self.href)
                video_src = etree.HTML(item_response.content.decode()).xpath(
                    "//a[@class='meihua_btn']/@href")[0]
                video_name = etree.HTML(item_response.content.decode()).xpath(
                    "//h1[@class='article-title']/a/text()")[0].replace(" ", "")
                if not os.path.exists(path+video_name+".mp4"):
                    # todo 直接下载可用
                    self.wait_time(video_name)
                    self.down_video(video_src, self.href +href, path, video_name)
                    # pool.apply_async(self.down_video, (video_src, self.href + href, path, video_name))
        # pool.close()
        # pool.join()

    def down_video(self, video_src, url, path, video_name):
        # *常规存储方式
        try:
            response = use_proxy_requst(video_src)
            if response.status_code == 200:
                print(video_name+"完成")
                try:
                    with open(path+video_name+".mp4", "wb") as f:
                        f.write(response.content)
                        f.flush()
                except:
                    print("==========保存出错！==========")
            else:
                raise RuntimeError()
        except:
            print(video_name+"正常下载失败")
            self.blob_download(url, path, video_name)


    def blob_download(self, url, path, video_name):
        # * m3u8下载  太慢
        def is_ts(val):
            return "ts" in val

        def ts_download(ts_item):
            try:
                if not os.path.exists(path+video_name+"/"+ts_item):
                    res_video = use_proxy_requst(base_url+"720kb/hls/"+ts_item)
                    if res_video.status_code == 200:
                        if not os.path.exists(path+video_name):
                            os.makedirs(path+video_name)
                        with open(path+video_name+"/"+ts_item, "wb") as f:
                            f.write(res_video.content)
            except:
                print("download ts fail")
        try:
            response = use_proxy_requst(url).content.decode()
            rIndex = response.find("m3u8")
            lIndex = response.find("vHLSurl")
            findStr = response[lIndex:rIndex+5]
            target_url = self.txt_wrap_by('"', '"', findStr)
            #  ts_urls only two type so we don't get
            # res_blob = requests.get(target_url, headers=self.headers,
            #                         timeout=10).content.decode().splitlines()
            # * get m3u8 file url
            base_url = target_url[0:len(target_url)-10]
            # * 判断是否存在ffmpeg
            b = 1
            self.wait_time(video_name+"m3u8")
            if not isHasffmpeg:
                # download ts file and conact all file
                res_ts = use_proxy_requst(base_url+"720kb/hls/index.m3u8").content.decode().splitlines()
                res_ts = list(filter(is_ts, res_ts))
                # 创建进程池，执行10个任务
                # Thread = Pool(moreThread)
                for i in res_ts:
                    ts_download(i)
                # Thread.apply_async(ts_download, (i))  # 执行任务
                # Thread.close()
                # Thread.join()
                # 调用合并
                print("调用合并")
                try:
                    b = os.system("copy /b %s/*.ts %s.mp4",
                                  (path+video_name, path+video_name))
                except:
                    print("调用合并失败")
                else:
                    os.system("rmdir /s/q %s", (path+video_name))

            else:
                b = os.system("ffmpeg -i %s -acodec copy -vcodec copy -absf aac_adtstoasc %s.mp4 -loglevel quiet" %
                              (base_url+"720kb/hls/index.m3u8", path+video_name))
            if b == 0:
                print(video_name+'下载完成')
            else:
                raise RuntimeError()
        except:
            print(video_name+"m3u8下载失败")
            if isHasyou_get:
                # todo you_get下载方式
                self.you_get_download(url, path, video_name)

    def you_get_download(self, url, path, video_name):
        # *you-get下载方式 太慢
        try:
            self.wait_time(video_name+"you_get")
            sys.argv = ['you-get', '-o', path, '-O', video_name+".mp4", url]
            you_get.main()
        except:
            print(video_name+"you-get 下载失败")

    def txt_wrap_by(self, start_str, end, html):
        start = html.find(start_str)
        if start >= 0:
            start += len(start_str)
            end = html.find(end, start)
            if end >= 0:
                return html[start:end].strip()

    def wait_time(self, name="", timer=3):
        print(name+"准备下载")
        time.sleep(5*random.random())
        # for i in range(timer):
        #     print("%s下载倒计时%s秒"%(name,timer-i))
        #     time.sleep(1)
        print(name+"下载中......")

    def wait_loading(self):
        while True:
            print('\r下载中', end='')
            for i in range(1, 7):
                print('.', end='', flush=True)
                time.sleep(0.3)


if __name__ == "__main__":
    moreThread = 10  # ! 线程数
    isHasffmpeg = True  # ! 是否安装ffmpeg
    isHasyou_get = True  # ! 是否安装you-get
    isTotalpage = 3  # ! 是下载分类全部还是仅下载前几页 int/bool
    spider = Spider()
    spider.get_channel()

```