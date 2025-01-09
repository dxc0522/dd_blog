---
title: Nginx
categories: 开发
date: 2019-12-20 16:30:00
tags:
  - 运维
---

## 了解

Nginx 是一款轻量级的 HTTP 服务器，采用事件驱动的异步非阻塞处理方式框架，这让其具有极好的 IO 性能，时常用于服务端的反向代理和负载均衡。
Nginx 的优点
• 支持海量高并发：采用 IO 多路复用 epoll。官方测试 Nginx 能够支持 5 万并发链接，实际生产环境中可以支撑 2-4 万并发连接数。
• 内存消耗少：在主流的服务器中 Nginx 目前是内存消耗最小的了，比如我们用 Nginx+PHP，在 3 万并发链接下，开启 10 个 Nginx 进程消耗 150M 内存。
• 免费使用可以商业化：Nginx 为开源软件，采用的是 2-clause BSD-like 协议，可以免费使用，并且可以用于商业。
• 配置文件简单：网络和程序配置通俗易懂，即使非专业运维也能看懂。
当然它的有点还有很多，比如反向代理功能，负载均衡功能
Nginx 版本说明
• Mainline version ：开发版,主要是给广大 Nginx 爱好者，测试、研究和学习的，但是不建议使用于生产环境。
• Stable version : 稳定版,也就是我们说的长期更新版本。这种版本一般比较成熟，经过长时间的更新测试，所以这种版本也是主流版本。
• legacy version : 历史版本，如果你需要以前的版本，Nginx 也是有提供的。

## 安装/卸载

### 基于 Yum 的方式安装 Nginx

安装必要程序

```
yum -y install gcc gcc-c++ autoconf pcre-devel make automake
yum -y install wget httpd-tools vim
```

我们可以先来查看一下 yum 是否已经存在 `yum list | grep nginx`
但是 yum 中的版本一般比较低需要重新设置 yum 源
进入 [Nginx 官网](http://nginx.org/en/download.html)查找最新稳定版本的

{%  img <https://cdn.cbd.int/dd_blog_assets@2.0.1/img/article/nginx0.png> %}

复制这段代码

{%  img <https://cdn.cbd.int/dd_blog_assets@2.0.1/img/article/nginx1.png> %}

然后在服务器终端里输入 `vim /etc/yum.repos.d/nginx.repo` 然后把代码复制进去，
复制完成后，你需要修改一下对应的操作系统和版本号，因为我的是 centos 和 7 的版本，所以改为这样。
`baseurl=http://nginx.org/packages/centos/7/$basearch/`
你可以根据你的系统或需要的版本进行修改。
可以再次查看 Nginx 列表就可看到最新的
如果都已经准备好了，那就可以开始安装了，安装的命令非常简单：`yum install nginx`
安装完成后可以使用命令，来检测 Nginx 的版本。`nginx -v` 如果查询到版本则安装成功。

### 卸载

第一步：输入以下指令全局查找 nginx 相关的文件： `sudo find / -name nginx*`
第二步：删除查找出来的所有 nginx 相关文件 `sudo rm -rf file` 此处跟查找出来的 nginx 文件
说明：全局查找往往会查出很多相关文件，但是前缀基本都是相同，后面不同的部分可以用\*代替，以便快速删除~

```
apt-get remove nginx*
```

原理就是删除关联文件以及文件夹。举例说明：
`sudo rm -rf file /usr/local/nginx*`
删除之后，便可重新安装 nginx 了

## 配置文件

命令行运行
`rpm -ql nginx`
rpm 是 linux 的 rpm 包管理工具，-q 代表询问模式，-l 代表返回列表，这样我们就可以找到 nginx 的所有安装位置了。
nginx.conf 文件解读
nginx.conf 文件是 Nginx 总配置文件，在我们搭建服务器时经常调整的文件。
进入 `etc/nginx` 目录下，然后用 vim 进行打开 `cd /etc/nginx` `vim nginx.conf` 配置文件

```配置文件注释

  # 运行用户，默认即是nginx，可以不进行设置
  user  nginx;
  # Nginx进程，一般设置为和CPU核数一样
  worker_processes  1;
  # 错误日志存放目录
  error_log  /var/log/nginx/error.log warn;
  # 进程pid存放位置
  pid        /var/run/nginx.pid;
  events {
    worker_connections  1024; # 单个后台进程的最大并发数
  }
  http {
    include       /etc/nginx/mime.types;   #文件扩展名与类型映射表
    default_type  application/octet-stream;  #默认文件类型
    #设置日志模式
    log_format  main  '$remote_addr - $remote_user [$time_local] "$request" '
    '$status $body_bytes_sent "$http_referer" '
    '"$http_user_agent" "$http_x_forwarded_for"';
    access_log  /var/log/nginx/access.log  main;   #nginx访问日志存放位置
    sendfile        on;   #开启高效传输模式
    tcp_nopush     on;    #减少网络报文段的数量
    keepalive_timeout  65;  #保持连接的时间，也叫超时时间
    gzip  on;  #开启gzip压缩
    include /etc/nginx/conf.d/*.conf; #包含的子配置项位置和文件
    server {
      listen       80;   #配置监听端口
      server_name  localhost;  #配置域名
      charset koi8-r;
      access_log  /var/log/nginx/host.access.log  main;
      location / {
        root   /usr/share/nginx/html;     #服务默认启动目录
        index  index.html index.htm;    #默认访问文件
      }
      location /file {
        root   /usr/share/nginx/html;     #服务默认启动目录
        try_files $uri /$uri.html /index.html #按指定的file顺序查找存在的文件，并使用第一个找到的文件进行请求处理
      }
      error_page  404              /404.html;   # 配置404页面
      redirect server error pages to the static page /50x.html
      error_page   500 502 503 504  /50x.html;   #错误状态码的显示页面，配置后需要重启
      location = /50x.html {
      root   /usr/share/nginx/html;
      }
      # proxy the PHP scripts to Apache listening on 127.0.0.1:80
      #
      #location ~ \.php$ {
      #    proxy_pass   http://127.0.0.1;
      #}
      # pass the PHP scripts to FastCGI server listening on 127.0.0.1:9000
      #
      #location ~ \.php$ {
      #    root           html;
      #    fastcgi_pass   127.0.0.1:9000;
      #    fastcgi_index  index.php;
      #    fastcgi_param  SCRIPT_FILENAME  /scripts$fastcgi_script_name;
      #    include        fastcgi_params;
      #}
      # deny access to .htaccess files, if Apache's document root
      # concurs with nginx's one
      #
      #location ~ /\.ht {
      #    deny  all;
      #}
    }
  }
```

明白了这些配置项，我们知道我们的服务目录放在了`/usr/share/nginx/html`下，可以使用命令进入看一下目录下的文件。

`ls /usr/share/nginx/html`
可以看到目录下面有两个文件，`50x.html` 和 `index.html`。我们可以使用 vim 进行编辑。
可以直接开启服务查看效果
但是需要开启端口，本地虚拟机的端口开启方式 开启端口
阿里云的安全组配置
如果你使用的是阿里云，记得到 ECS 实例一下打开端口。
步骤如下：

1. 进入阿里云控制台，并找到 ECS 实例。
2. 点击实例后边的“更多”
3. 点击“网络和安全组” ，再点击“安全组配置”
4. 右上角添加“安全组配置”
5. 进行 80 端口的设置，具体设置如图就好。
   {%  img <https://cdn.cbd.int/dd_blog_assets@2.0.1/img/article/nginx2.png> %}

如果访问域名可以查看到页面就正常运行了。

## 命令

### 启动 Nginx 服务

默认的情况下，Nginx 是不会自动启动的，需要我们手动进行启动，当然启动 Nginx 的方法也不是单一的。

#### nginx 直接启动

在 CentOS7.4 版本里（低版本是不行的），是可以直接直接使用 nginx 启动服务的。
`nginx`

#### 使用 systemctl 命令启动

还可以使用个 Linux 的命令进行启动，我一般都是采用这种方法进行使用。因为这种方法无论启动什么服务，都是一样的，只是换一下服务的名字（不用增加额外的记忆点）。
`systemctl start nginx.service` 输入命令后，没有任何提示，那我们如何知道 Nginx 服务已经启动了哪？可以使用 Linux 的组合命令，进行查询服务的运行状况。
`ps aux | grep nginx`如果启动成功会出现如下图片中类似的结果。
{%  img <https://cdn.cbd.int/dd_blog_assets@2.0.1/img/article/nginx3.png> %}

有这三条记录，说明我们 Nginx 被正常开启了。

### 停止 Nginx 服务的四种方法

停止 Nginx 方法有很多种，可以根据需求采用不一样的方法，我们一个一个说明。

#### 立即停止服务

`nginx  -s stop`
这种方法比较强硬，无论进程是否在工作，都直接停止进程。

#### 从容停止服务

`nginx -s quit`
这种方法较 stop 相比就比较温和一些了，需要进程完成当前工作后再停止。

#### killall 方法杀死进程

这种方法也是比较野蛮的，我们直接杀死进程，但是在上面使用没有效果时，我们用这种方法还是比较好的。
`killall nginx`

#### systemctl 停止

`systemctl stop nginx.service`

### 重启 Nginx 服务

有时候我们需要重启 Nginx 服务，这时候可以使用下面的命令。
`systemctl restart nginx.service`

### 重新载入配置文件

在重新编写或者修改 Nginx 的配置文件后，都需要作一下重新载入，这时候可以用 Nginx 给的命令。
`nginx -s reload`

### 查看端口号

在默认情况下，Nginx 启动后会监听 80 端口，从而提供 HTTP 访问，如果 80 端口已经被占用则会启动失败。我么可以使用`netstat -tlnp`命令查看端口号的占用情况。

## 错误页面配置

### 多错误指向一个页面

在`/etc/nginx/conf.d/default.conf` 是可以看到下面这句话的。
`error_page   500 502 503 504  /50x.html;`
`error_page`指令用于自定义错误页面，`500，502，503，504` 这些就是 HTTP 中最常见的错误代码，`/50.html` 用于表示当发生上述指定的任意一个错误的时候，都是用网站根目录下的`/50.html`文件进行处理。

### 单独为错误置顶处理方式

有些时候是要把这些错误页面单独的表现出来，给用户更好的体验。所以就要为每个错误码设置不同的页面。设置方法如下：
`error_page 404  /404_error.html;`
然后到网站目录下新建一个`404_error.html` 文件，并写入一些信息。

```html
<html>
  <meta charset="UTF-8" />
  <body>
    <h1>404页面没有找到!</h1>
  </body>
</html>
```

然后重启我们的服务，再进行访问，你会发现 404 页面发生了变化。

### 把错误码换成一个地址

处理错误的时候，不仅可以只使用本服务器的资源，还可以使用外部的资源。比如我们将配置文件设置成这样。
`error_page  404 http://jspang.com;`
我们使用了技术胖的博客地址作为 404 页面没有找到的提示，就形成了，没有找到文件，就直接跳到了技术胖的博客上了。

## 访问权限

### 简单实现访问控制

有时候我们的服务器只允许特定主机访问，比如内部 OA 系统，或者应用的管理后台系统，更或者是某些应用接口，这时候我们就需要控制一些 IP 访问，我们可以直接在 location 里进行配置。
可以直接在`default.conf`里进行配置。

```
 location / {
      deny   123.9.51.42; #拒绝
      allow  45.76.202.231; #仅允许
  }
```

配置完成后，重启一下服务器就可以实现限制和允许访问了。

### 指令优先级

我们先来看一下代码：

```
 location / {
      allow  45.76.202.231;
      deny   all;
  }
```

上面的配置表示只允许`45.76.202.231`进行访问，其他的 IP 是禁止访问的。但是如果我们把`deny all`指令，移动到 `allow 45.76.202.231`之前，会发生什么那？会发现所有的 IP 都不允许访问了。这说明了一个问题：就是在同一个块下的两个权限指令，先出现的设置会覆盖后出现的设置（也就是谁先触发，谁起作用）。

### 复杂访问控制权限匹配

在工作中，访问权限的控制需求更加复杂，例如，对于网站下的`img`（图片目录）是运行所有用户访问，但对于网站下的`admin`目录则只允许公司内部固定 IP 访问。这时候仅靠 deny 和 allow 这两个指令，是无法实现的。我们需要`location`块来完成相关的需求匹配。
上面的需求，配置代码如下：

```
  location =/img{
      allow all;
  }
  location =/admin{
      deny all;
  }
```

=号代表精确匹配，使用了=后是根据其后的模式进行精确匹配。这个直接关系到我们网站的安全，一定要学会。

### 使用正则表达式设置访问权限

只有精确匹配有时是完不成我们的工作任务的，比如现在我们要禁止访问所有 php 的页面，php 的页面大多是后台的管理或者接口代码，所以为了安全我们经常要禁止所有用户访问，而只开放公司内部访问的。
代码如下：

```nginx
 location ~\.php$ {
      deny all;
  }
```

这样我们再访问的时候就不能访问以 php 结尾的文件了。是不是让网站变的安全很多了那

## 虚拟主机

虚拟主机是指在一台物理主机服务器上划分出多个磁盘空间，每个磁盘空间都是一个虚拟主机，每台虚拟主机都可以对外提供 Web 服务，并且互不干扰。在外界看来，虚拟主机就是一台独立的服务器主机，这意味着用户能够利用虚拟主机把多个不同域名的网站部署在同一台服务器上，而不必再为简历一个网站单独购买一台服务器，既解决了维护服务器技术的难题，同时又极大地节省了服务器硬件成本和相关的维护费用。

### 基于端口号配置虚拟主机

基于端口号来配置虚拟主机，算是 Nginx 中最简单的一种方式了。原理就是 Nginx 监听多个端口，根据不同的端口号，来区分不同的网站。

我们可以直接配置在主文件里 etc/nginx/nginx.conf 文件里， 也可以配置在子配置文件里 etc/nginx/conf.d/default.conf。我这里为了配置方便，就配置在子文件里了。当然你也可以再新建一个文件，只要在 conf.d 文件夹下就可以了。

修改配置文件中的 server 选项，这时候就会有两个 server。

```nginx
  server{
          listen 8001;
          server_name localhost;
          root /usr/share/nginx/html/html8001;
          index index.html;
  }
```

编在`usr/share/nginx/html/html8001/`目录下的 index.html 文件并查看结果。

最后在浏览器中分别访问地址和带端口的地址。看到的结果是不同的。

然后我们就可以在浏览器中访问<http://112.74.164.244:8001了，当然你的IP跟这个肯定不一样，这个IP过几天就会过期的。>

### 基于 IP/域名的虚拟主机

基于 IP 和基于端口的配置几乎一样，只是把 server_name 选项，配置成 IP 就可以了。

比如上面的配置，我们可以修改为：

```
server{
        listen 80;
        server_name 112.74.164.244; #或者直接写个域名也行
        root /usr/share/nginx/html/html8001;
        index index.html;
}
```

## 反向代理

我们现在的 web 模式基本的都是标准的 CS 结构，即 Client 端到 Server 端。那代理就是在 Client 端和 Server 端之间增加一个提供特定功能的服务器，这个服务器就是我们说的代理服务器。

**正向代理：**如果你觉的反向代理不好理解，那先来了解一下正向代理。我相信作为一个手速远超正常人的程序员来说，你一定用过翻墙工具（我这里说的不是物理梯子），它就是一个典型的正向代理工具。它会把我们不让访问的服务器的网页请求，代理到一个可以访问该网站的代理服务器上来，一般叫做 proxy 服务器，再转发给客户。
简单来说就是你想访问目标服务器的权限，但是没有权限。这时候代理服务器有权限访问服务器，并且你有访问代理服务器的权限，这时候你就可以通过访问代理服务器，代理服务器访问真实服务器，把内容给你呈现出来。
反向代理：反向代理跟代理正好相反（需要说明的是，现在基本所有的大型网站的页面都是用了反向代理），客户端发送的请求，想要访问 server 服务器上的内容。发送的内容被发送到代理服务器上，这个代理服务器再把请求发送到自己设置好的内部服务器上，而用户真实想获得的内容就在这些设置好的服务器上。这里 proxy 服务器代理的并不是客户端，而是服务器,即向外部客户端提供了一个统一的代理入口，客户端的请求都要先经过这个 proxy 服务器。具体访问那个服务器 server 是由 Nginx 来控制的。再简单点来讲，一般代理指代理的客户端，反向代理是代理的服务器。

### 反向代理的用途和好处

安全性：正向代理的客户端能够在隐藏自身信息的同时访问任意网站，这个给网络安全代理了极大的威胁。因此，我们必须把服务器保护起来，使用反向代理客户端用户只能通过外来网来访问代理服务器，并且用户并不知道自己访问的真实服务器是那一台，可以很好的提供安全保护。
功能性：反向代理的主要用途是为多个服务器提供负债均衡、缓存等功能。负载均衡就是一个网站的内容被部署在若干服务器上，可以把这些机子看成一个集群，那 Nginx 可以将接收到的客户端请求“均匀地”分配到这个集群中所有的服务器上，从而实现服务器压力的平均分配，也叫负载均衡。
最简单的反向代理

现在我们要访问 `http://a.b.com` 然后反向代理到 b.com 这个网站。我们直接到`etc/nginx/con.d/8001.conf`进行修改。

修改后的配置文件如下：

```shell
server{
        listen 80;
        server_name a.b.com;
        location / {
               proxy_pass http://b.com;
        }
}
```

一般我们反向代理的都是一个 IP，但是我这里代理了一个域名也是可以的。其实这时候我们反向代理就算成功了，我们可以在浏览器中打开`http://a.b.com`来测试一下。（视频中有详细的演示）

其它反向代理指令

反向代理还有些常用的指令，我在这里给大家列出：

- proxy_set_header :在将客户端请求发送给后端服务器之前，更改来自客户端的请求头信息。

- proxy_connect_timeout:配置 Nginx 与后端代理服务器尝试建立连接的超时时间。

- proxy_read_timeout : 配置 Nginx 向后端服务器组发出 read 请求后，等待相应的超时时间。

- proxy_send_timeout：配置 Nginx 向后端服务器组发出 write 请求后，等待相应的超时时间。

- proxy_redirect :用于修改后端服务器返回的响应头中的 Location 和 Refresh。

## Nginx 适配 PC 或 Mobile

`$http_user_agent`的使用：

Nginx 通过内置变量`$http_user_agent`，可以获取到请求客户端的`userAgent`，就可以用户目前处于移动端还是 PC 端，进而展示不同的页面给用户。

操作步骤如下：

在`/usr/share/nginx/`目录下新建两个文件夹，分别为：pc 和 mobile 目录

```shell
cd /usr/share/nginx
mkdir pc
mkdir mobile
```

在 pc 和 miblic 目录下，新建两个 index.html 文件，文件里下面内容

```html
<h1>I am pc!</h1>
<h1>I am mobile!</h1>
```

进入`etc/nginx/conf.d`目录下，修改`8001.conf`文件，改为下面的形式:

```html
server{ listen 80; server_name nginx2.jspang.com; location / { root
/usr/share/nginx/pc; if ($http_user_agent ~*
'(Android|webOS|iPhone|iPod|BlackBerry)') { root /usr/share/nginx/mobile; }
index index.html; } }
```

## Gzip 压缩配置

Gzip 是网页的一种网页压缩技术，经过 gzip 压缩后，页面大小可以变为原来的 30%甚至更小。更小的网页会让用户浏览的体验更好，速度更快。gzip 网页压缩的实现需要浏览器和服务器的支持。

从上图可以清楚的明白，gzip 是需要服务器和浏览器同事支持的。当浏览器支持 gzip 压缩时，会在请求消息中包含 Accept-Encoding:gzip,这样 Nginx 就会向浏览器发送听过 gzip 后的内容，同时在相应信息头中加入`Content-Encoding:gzip`，声明这是 gzip 后的内容，告知浏览器要先解压后才能解析输出。

gzip 的配置项

Nginx 提供了专门的 gzip 模块，并且模块中的指令非常丰富。

- gzip : 该指令用于开启或 关闭 gzip 模块。
- gzip_buffers : 设置系统获取几个单位的缓存用于存储 gzip 的压缩结果数据流。
- gzip_comp_level : gzip 压缩比，压缩级别是 1-9，1 的压缩级别最低，9 的压缩级别最高。压缩级别越高压缩率越大，压缩时间越长。
- gzip_disable : 可以通过该指令对一些特定的 User-Agent 不使用压缩功能。
- gzip_min_length:设置允许压缩的页面最小字节数，页面字节数从相应消息头的 Content-length 中进行获取。
- gzip_http_version：识别 HTTP 协议版本，其值可以是 1.1.或 1.0.
- gzip_proxied : 用于设置启用或禁用从代理服务器上收到相应内容 gzip 压缩。
- gzip_vary : 用于在响应消息头中添加 Vary：Accept-Encoding,使代理服务器根据请求头中的 Accept-Encoding 识别是否启用 gzip 压缩。

gzip 最简单的配置

```shell
http {
    gzip on;
    gzip_types text/plain application/javascript text/css;
}
```

完整配置

```shell
  gzip on;
  gzip_min_length 1k;
  gzip_buffers 4 16k;
  #gzip_http_version 1.0;
  gzip_comp_level 2;
  gzip_types text/plain application/javascript application/x-javascript text/css application/xml text/javascript application/x-httpd-php image/jpeg image/gif image/png;
  gzip_vary off;
  gzip_disable "MSIE [1-6]\."; #IE6对Gzip不怎么友好
```

`gzip on`是启用 gizp 模块，下面的一行是用于在客户端访问网页时，对文本、JavaScript 和 CSS 文件进行压缩输出。

配置好后，我们就可以重启 Nginx 服务，让我们的 gizp 生效了。

如果你是 windows 操作系统，你可以按 F12 键打开开发者工具，单机当前的请求，在标签中选择 Headers，查看 HTTP 响应头信息。你可以清楚的看见 Content-Encoding 为 gzip 类型。

## 服务器压力测试

### apach 测试

#### 安装

装个 apach 然后直接可以运行

#### 使用

```shell
  ab -c 10 -n 100 https://www.baidu.com/
  注意最后必须有斜杠否则不认识

  #服务器超过一千会自动禁止访问，为了防止攻击的，需要暂时关掉。
  # vim /etc/sysctl.conf
  net.ipv4.tcp_syncookies = 0
  # sysctl -p
  #然后就可以超过1000个并发测试了。
```

### WebBench

```shell
  wget http://www.ha97.com/webbench-1.5.tar.gz
  tar -zxvf webbench-1.5.tar.gz
  cd webbench-1.5
  make
  make install


  webbench -c 1000 -t 60 http://192.168.80.157/phpinfo.php

  webbench [option]... URL
    -f|--force               Don't wait for reply from server.
    -r|--reload              Send reload request - Pragma: no-cache.
    -t|--time <sec>          运行测试时间  Run benchmark for <sec> seconds. Default 30.
    -p|--proxy <server:port> Use proxy server for request.
    -c|--clients <n>         并发数  Run <n> HTTP clients at once. Default one.
    -9|--http09              Use HTTP/0.9 style requests.
    -1|--http10              Use HTTP/1.0 protocol.
    -2|--http11              Use HTTP/1.1 protocol.
    --get                    Use GET request method.
    --head                   Use HEAD request method.
    --options                Use OPTIONS request method.
    --trace                  Use TRACE request method.
    -?|-h|--help             This information.
    -V|--version             Display program version.


```

#### 结果说明

每秒钟响应请求数：24525 pages/min，每秒钟传输数据量 20794612 bytes/sec.
并发 1000 运行 60 秒后产生的 TCP 连接数 12000 多个,已经显示有 87 个连接 failed 了，说明超负荷了。

## Nginx 安全

### 基础安全配置

#### 隐藏版本号信息

默认情况下，Nginx 会在响应头中显示版本号，这可能会给攻击者提供服务器信息。攻击者可以根据版本号查找对应版本的已知漏洞进行定向攻击。

```nginx
http {
  # 关闭在响应头中显示Nginx版本号
  # 默认响应头: Server: nginx/1.18.0
  # 关闭后响应头: Server: nginx
  server_tokens off;
}
```

#### 配置安全 Headers

添加安全相关的 HTTP 响应头，可以有效防御常见的 Web 攻击：

```nginx
# 防止网站被嵌入恶意网页中，避免点击劫持
add_header X-Frame-Options "SAMEORIGIN";
# 启用浏览器XSS防护功能，并在检测到攻击时，停止渲染页面
add_header X-XSS-Protection "1; mode=block";
# 禁止浏览器猜测（嗅探）资源的MIME类型，防止资源类型混淆攻击
add_header X-Content-Type-Options "nosniff";
# 控制引用地址信息的传递，增强隐私保护
add_header Referrer-Policy "strict-origin-when-cross-origin";
# 内容安全策略，控制资源加载来源，防止XSS等攻击
# default-src 'self': 只允许加载同源资源
# http: https:: 允许通过HTTP和HTTPS加载资源
# data:: 允许data:URI的资源（如base64编码的图片）
# blob:: 允许blob:URI的资源（如视频流）
# 'unsafe-inline': 允许内联脚本和样式（根据需要配置）
add_header Content-Security-Policy "default-src 'self' http: https: data: blob: 'unsafe-inline'";
```

### 访问控制优化

#### 限制连接数

为防止 DOS 攻击，应该限制单个 IP 的连接数和请求频率：

```nginx
http {
  # 定义一个共享内存区域，用于存储IP连接数信息
  # $binary_remote_addr: 使用二进制格式存储客户端IP，节省空间
  # zone=addr:10m: 指定共享内存区域名称为addr，大小为10MB
  limit_conn_zone $binary_remote_addr zone=addr:10m;

  # 限制每个IP同时最多100个连接
  limit_conn addr 100;

  # 定义请求频率限制，每个IP每秒最多10个请求
  # rate=10r/s: 每秒10个请求
  limit_req_zone $binary_remote_addr zone=req_zone:10m rate=10r/s;

  # 应用请求频率限制，burst=20表示最多允许20个请求排队
  limit_req zone=req_zone burst=20 nodelay;
}
```

#### 配置白名单

对于管理后台等敏感区域，建议配置 IP 白名单：

```nginx
location /admin/ {
  # 允许内网IP段访问
  # 192.168.1.0/24: 允许192.168.1.x网段的所有IP
  allow 192.168.1.0/24;
  # 允许另一个内网IP段访问
  allow 10.0.0.0/8;
  # 拒绝其他所有IP访问
  deny all;
  # 开启基础认证
  auth_basic "Restricted Access";
  auth_basic_user_file /etc/nginx/.htpasswd;
}
```

### SSL/TLS 安全配置

#### 启用 HTTPS

配置 SSL 证书并强制 HTTPS 访问：

```nginx
server {
  # 监听443端口，启用SSL
  listen 443 ssl;

  # 指定SSL证书路径
  ssl_certificate /path/to/cert.pem;
  ssl_certificate_key /path/to/key.pem;

  # 将所有HTTP请求重定向到HTTPS
  if ($scheme != "https") {
    return 301 https://$server_name$request_uri;
  }

  # 启用HSTS，强制浏览器在指定时间内使用HTTPS访问
  add_header Strict-Transport-Security "max-age=31536000" always;
}
```

#### 优化 SSL 配置

使用更安全的 SSL 配置参数：

```nginx
# 只允许TLS 1.2和1.3版本，禁用不安全的SSL和早期TLS版本
ssl_protocols TLSv1.2 TLSv1.3;

# 配置加密套件，按推荐顺序排列
# ECDHE: 使用椭圆曲线密钥交换
# AES-GCM: 使用AES-GCM加密模式
ssl_ciphers ECDHE-ECDSA-AES128-GCM-SHA256:ECDHE-RSA-AES128-GCM-SHA256:ECDHE-ECDSA-AES256-GCM-SHA384:ECDHE-RSA-AES256-GCM-SHA384;

# 优先使用服务器的加密套件
ssl_prefer_server_ciphers on;

# 配置SSL会话缓存，提高性能
# shared:SSL:10m: 所有工作进程共享的缓存，大小为10MB
ssl_session_cache shared:SSL:10m;

# SSL会话超时时间
ssl_session_timeout 10m;

# 启用OCSP Stapling，提供证书状态信息
ssl_stapling on;
ssl_stapling_verify on;
resolver 8.8.8.8 8.8.4.4 valid=300s;
resolver_timeout 5s;
```

### 文件上传安全

#### 限制上传文件大小

防止通过上传大文件耗尽服务器资源：

```nginx
# 限制请求体大小，即上传文件的最大大小为10MB
client_max_body_size 10m;

# 设置请求体缓冲区大小为128KB
# 超过此大小的请求体会被写入临时文件
client_body_buffer_size 128k;

# 配置临时文件存储路径
client_body_temp_path /var/nginx/client_body_temp;
```

#### 配置上传目录权限

确保上传目录的权限配置正确：

```nginx
location /uploads/ {
  # 指定上传根目录
  root /var/www/uploads;

  # 指定临时文件目录
  client_body_temp_path /var/www/tmp;

  # 允许的WebDAV方法
  dav_methods PUT DELETE MKCOL COPY MOVE;

  # 自动创建上传目录
  create_full_put_path on;

  # 设置目录访问权限
  # user:rw - 文件所有者可读写
  # group:rw - 组用户可读写
  # all:r - 其他用户只读
  dav_access user:rw group:rw all:r;

  # 限制上传文件类型
  if ($request_filename ~* ^.*?\.(php|php5|sh|pl|py)$) {
    return 403;
  }
}
```

### 防止常见攻击

#### 防止 SQL 注入

配置特殊字符过滤：

```nginx
# 拒绝包含SQL注入常见关键字的请求
if ($query_string ~* "union.*select.*\(") {
  return 403;
}
if ($query_string ~* "select.*from.*information_schema.tables") {
  return 403;
}
if ($query_string ~* "select.*from.*mysql.db") {
  return 403;
}
```

#### 防止跨站脚本攻击（XSS）

配置特殊字符过滤：

```nginx
# 拒绝包含常见XSS攻击代码的请求
if ($query_string ~* "<script>") {
  return 403;
}
if ($query_string ~* "javascript:") {
  return 403;
}
if ($query_string ~* "vbscript:") {
  return 403;
}
```

#### 防止文件包含攻击

配置特殊字符过滤：

```nginx
# 拒绝包含文件包含攻击代码的请求
if ($query_string ~* "\.\./") {
  return 403;
}
if ($query_string ~* "\.\.\\") {
  return 403;
}
if ($query_string ~* "/etc/passwd") {
  return 403;
}
if ($query_string ~* "/bin/bash") {
  return 403;
}
```

#### 防止目录遍历

禁止访问隐藏文件和目录：

```nginx
# 禁止访问所有以点开头的隐藏文件和目录
location ~ /\. {
  # 拒绝所有请求
  deny all;
  # 禁止记录访问日志
  access_log off;
  # 禁止记录404错误日志
  log_not_found off;
}

# 禁止访问特定目录
location ~* ^/(uploads|images)/.*\.(php|php5|sh|pl|py|asp|aspx|jsp)$ {
  deny all;
}

# 防止目录列表
location / {
  autoindex off;
}
```

### 日志安全

#### 配置访问日志

详细记录访问信息，便于安全分析：

```nginx
# 定义详细的日志格式
log_format detailed '$remote_addr - $remote_user [$time_local] '
          '"$request" $status $body_bytes_sent '
          '"$http_referer" "$http_user_agent" '
          '$request_time $upstream_response_time';

# 配置访问日志
# buffer=32k: 使用32KB缓冲区
# flush=5s: 每5秒刷新一次日志
access_log /var/log/nginx/access.log detailed buffer=32k flush=5s;

# 对于静态资源，可以关闭访问日志以提高性能
location /static/ {
  access_log off;
}
```

#### 配置错误日志

设置适当的错误日志级别：

```nginx
# 设置错误日志级别为warn
# 可选级别: debug, info, notice, warn, error, crit, alert, emerg
error_log /var/log/nginx/error.log warn;

# 对于开发环境，可以使用debug级别获取更多信息
# error_log /var/log/nginx/error.log debug;
```

### 其他安全措施

#### 禁止执行脚本

在静态资源目录中禁止执行脚本：

```nginx
location /static/ {
  # 禁止执行PHP文件
  location ~ \.(php|php5)$ {
    deny all;
  }

  # 只允许特定文件类型
  location ~* \.(css|js|jpg|jpeg|png|gif|ico|svg|woff|woff2|ttf|eot)$ {
    expires 30d;  # 设置缓存时间
    add_header Cache-Control "public, no-transform";
  }
}
```

#### 配置超时时间

设置合理的超时参数，防止慢速攻击：

```nginx
# 客户端请求体超时时间，单位秒
client_body_timeout 10;

# 客户端请求头超时时间
client_header_timeout 10;

# 客户端保持连接超时时间
# 第一个参数是客户端超时时间
# 第二个参数是在响应头中的Keep-Alive超时时间
keepalive_timeout 5 5;

# 向客户端发送响应的超时时间
send_timeout 10;

# 读取代理服务器响应的超时时间
proxy_read_timeout 10;

# 连接代理服务器的超时时间
proxy_connect_timeout 10;
```
