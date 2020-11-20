---
title: 疑难杂症
categories: 开发
date: 2019-8-26 14:18:00
---
## 微信内置浏览器
### 微信须知
安卓：
  无法自动播放视频，无法自动播放音乐，需要点击后才可播放。
  视频全屏模式的退出需要display即可。
  华为全屏模式顶部有一段空白。
IOS：
  缓存比较顽固，需要使劲刷新。
  更换路径后不自动播放就加个autoplay就好了。
长按二维码识别的功能监听可用touchstart监听开始自行判断是否有touchend判断是否是长按。
### 刷新页面无效
```
  function refresh() {
      var timestamp = new Date().getTime();
      var url = decodeURI(window.location.href);
      if (url.indexOf('?') < 0) {
          url = url + "?_refresh_time_=" + timestamp;
          window.location.href = url;
          return;
      }
      var t_pos0 = url.indexOf('_refresh_time_');
      var t_after_str  = '';
      var t_before_str = url;
      if (t_pos0 >= 0) {
          t_before_str = url.substring(0, t_pos0);

          var t_pos1 = url.indexOf('&', t_pos0 + 1);
          if (t_pos1 >= 0) {
              t_after_str = url.substr(t_pos1);
          }
      }
      url = t_before_str + '&_refresh_time_=' + timestamp;
      url += t_after_str;
      window.location.href = url;
  }
```

## 多媒体兼容

所有的播放媒体都不要放在组件内，重新render的时候会刷新造成卡顿黑屏或停止播放等一堆问题。

### 可以覆盖在video标签上做交互视频

```
  playsinline="true"
  webkit-playsinline="true"
  x5-video-player-type="h5"
  x5-video-player-fullscreen="true"
  x5-video-orientation="portrait"
```

### audio自动播放



``` audio自动播放
  //  引入wx jssdk才可兼容微信
  //  <script src="http://res.wx.qq.com/open/js/jweixin-1.0.0.js"></script>
  window.audioBg = document.getElementById("bgAudio");
  function forceSafariPlayAudio() {
    audioBg.load();
    audioBg.play(); // iOS 7/8 仅需要 play 一下
  }
  // 触摸屏幕
  document.addEventListener("touchend", forceSafariPlayAudio, false);
  audioBg.addEventListener(
    "play",
    function() {
      document.removeEventListener("touchend", forceSafariPlayAudio, false);
    },
    false
  );
  if (
    typeof WeixinJSBridge == "object" &&
    typeof WeixinJSBridge.invoke == "function"
  ) {
    forceSafariPlayAudio();
  }
  // 微信打开
  document.addEventListener(
    "WeixinJSBridgeReady",
    function() {
      forceSafariPlayAudio();
    },
    false
  );
``` 

### video自动播放

``` video自动播放
  //  引入wx jssdk才可兼容微信
  //  <script src="http://res.wx.qq.com/open/js/jweixin-1.0.0.js"></script>
  //  若浏览器支持自动播放则可直接播放若不支持则需要跳转至引导页
  let videoType = false;
  // 微信环境
  if (vUtil.UA.wx) {//vUtil需要引入该包
    document.addEventListener("WeixinJSBridgeReady", myVideo.play, false);
  }
  myVideo.addEventListener(
    "canplaythrough",
    function(e) {
      console.log("加载完毕");
      if (!videoType) {
        try {
          const playPromise = myVideo.play();
          // 调用失败的解决方案
          if (playPromise !== undefined) {
            playPromise.catch(() => {
              console.log("playback prevented");
             //跳转至引导页
            });
          }
        } catch (error) {
          console.log(error);
         //跳转至引导页
        }
      }
    },
    false
  );
  // 播放时间  判断是否成功自动播放
  myVideo.addEventListener(
    "timeupdate",
    function(e) {
      // 查看播放时间   只开一下是0.001
      if (myVideo.currentTime > 0.01 && !videoType) {
        videoType = true;
      }
    },
    false
  );
    //监听播放暂停
  myVideo.addEventListener(
    "pause",
    function() {
      console.log("pause");
      // 若一次都没播放则展示打开按钮
      if (!videoType) {
        //跳转至引导页
      }
    },
    false
  );
```

### media  API
  audio与video的部分属性事件都一致。

```使用
  <!-- video 不支持 IE8及以下版本浏览器，支持三种视频格式：MP4，WebM 和 Ogg -->
  <video src="test.mp4" controls width="400" height="300"></video>

  <!-- 禁止下载 -->
  <video src="test.mp4" controls controlslist="nodownload" width="400" height="300"></video>

  <!-- 禁止下载，禁止全屏 -->
  <video src="test.mp4" controls controlslist="nodownload nofullscreen" width="400" height="300"></video>

  <!-- 自动播放 （不同浏览器的表现不一样） -->
  <video src="test.mp4" controls autoplay width="400" height="300"></video>

  <!-- 默认静音播放（可手动点开继续播放） -->
  <video src="test.mp4" controls muted width="400" height="300"></video>

  <!-- 循环播放 -->
  <video src="test.mp4" controls loop width="400" height="300"></video>

  <!-- 预加载 -->
  <video src="test.mp4" controls preload width="400" height="300"></video>

  <!-- 贴图 -->
  <video src="test.mp4" poster="poster.jpg" controls width="400" height="300"></video>

```

```属性
  let video = documnet.getElementById('video');
  //检测该浏览器是否支持某种类型视频，例如MP4
  let ability = video.canPlayType('video/mp4');//返回"probably","maybe",""
  //播放
  video.play();
  //暂停
  video.pause()
  //加载，一般用于更改源，重新加载视频
  video.src='other.mp4';
  video.load();

  属性：

  currentSrc 	当前视频地址 
  currentTime	视频已播放时间
  videoWidth	视频本身的宽度
  videoHeight	视频本身的高度
  duration	视频长度，流返回无限
  ended	是否播放结束
  error	媒体错误（null:正常）
  paused	是否停止
  muted	是否静音
  seeking	是否在seeking
  volume	音量 取值范围：0 到 1，0 是静音，0.5 是一半的音量，1 是最大音量（默认值）
  height	播放框的高度
  width	播放框的宽度
  以上都是官方文档里的一般属性，下面将补充一些属性

  startTime	开始时间，默认为0
  defaultPlaybackRate	默认回放速度
  playbackRate	当前播放速度
```


```事件
  var video = document.getElementById('video')

  // 1、loadstart：视频查找。当浏览器开始寻找指定的音频/视频时触发，也就是当加载过程开始时
  video.addEventListener('loadstart', function(e) {
    console.log('提示视频的元数据已加载')
    console.log(e)
    console.log(video.duration)            // NaN
  })
  loadstart	客户端开始请求数据
  progress	客户端正在请求数据
  suspend	延迟下载
  abort	客户端主动终止下载（不是因为错误引起）
  error	请求数据时遇到错误
  stalled	当浏览器尝试获取媒体数据，但数据不可用时
  play	play()和autoplay开始播放时触发
  pause	pause()触发
  loadedmetadata	成功获取资源长度
  loadeddata	 
  waiting	视频加载等待。当视频由于需要缓冲下一帧而停止，等待时触发
  playing	开始回放
  canplay	可以播放，但中途可能因为加载而暂停
  canplaythrough	可流畅播放。当浏览器预计能够在不停下来进行缓冲的情况下持续播放指定的音频/视频时触发
  seeking	查找开始。当用户开始移动/跳跃到音频/视频中新的位置时触发
  seeked	查找结束。当用户已经移动/跳跃到视频中新的位置时触发
  timeupdate	播放时间改变
  ended	播放结束
  ratechange	当视频的播放速度已更改时
  durationchange	资源长度改变
  volumechange	音量改变
  x5videoenterfullscreen  进入全屏模式
  x5videoexitfullscreen   退出全屏模式
```
## 3D全景图（pannellum）
### 介绍
[多种方案介绍](https://blog.csdn.net/qq_42606051/article/details/83824034)
国外的框架[pannellum](https://pannellum.org/)，实现简单。
[krpano](http://www.krpano360.com/)这个框架最好但是收费，一年一百多欧元相当于一千左右人民币了。pass...
[优秀操作手册](https://www.jianshu.com/p/fdbcb551d75b)
###   注意

- 图片可为4096宽的，注意图片跨域问题。
- 热点图标不可更改不可替换。
- 热点坐标拾取的时候设置hotSpotDebug: true，即可在控制台查看坐标信息。
- 热点内容不但可以是文字还可以是图片或者视频


### 开发
首先下载对应css与js到本地引入项目。

``` css
  #panorama {
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
  }
```
``` body
  <div id="panorama"></div>
  <script>
    pannellum.viewer("panorama", {
      type: "equirectangular",
      panorama: "./111111.jpg",
      autoLoad: true,
      // title: "这是一段文字",
      // preview: "", //预览图
      hotSpots: [
        {
          pitch: -20.534419348137646,
          yaw: -12.163622115720447,
          type: "info",
          text: "这是一段文字"
        }
      ],
      // hotSpotDebug: true,//获取热点坐标的时候开启可以查看坐标
      error: function(data) {
        console.log(data);
      }
    });
  </script>
```

## 自动化部署

### 环境要求
服务器需要node环境
### 配置项目ssh
在linux系统中的 /root/.ssh/  中
复制id_rsa.pub文件中的内容去添加项目ssh
### 服务端新建koa2项目
配置一个简单的服务端项目，在接口被调用的时候运行命令。
``` index.js
const Koa = require("koa2"),
  Router = require("koa-router"),
  process = require("child_process"),
  app = new Koa(),
  router = new Router({});
router.post("/pushCode", async (ctx, next) => {
  //直接调用命令
  const error = await new Promise((resolve, reject) => {
      //这个/home/my_space_formal是demo目录，我只需要pull代码即可，可以根据情况自己设置命令
    process.exec("cd /home/my_project &&git pull origin master", function(error) {
      resolve(error);
    });
  });
  if (error !== null) {
    ctx.body = "exec error: " + error;
  } else {
    ctx.body = "服务端发起自执行";
  }
});
app.use(router.routes());
app.listen(888, () => {
  console.log("serve is start");
});
```
``` package.json
{
  "dependencies": {
    "koa-router": "^7.4.0",
    "koa2": "^2.0.0-alpha.7"
  }
}
```
配置好项目后将项目拉至服务器合适的地方，安装相关安装包 
### 运行项目

- 安装forever.js 运行npm install forever -g 
- 到上述项目文件夹中运行 forever start index.js  即可让node服务在后台一直运行。
- forever stop app.js  #关闭应用
- forever restartall  #重启所有应用
- forever list  显示所有运行的服务 

### 然后代码往github一推服务端就直接自动执行命令了

## 解决git clone速度太慢

### 查询CDN
[查询以下域名最快的cdn](https://www.ipaddress.com/)

- github.com 
- assets-cdn.github.com 
- github.global.ssl.fastly.net

### 修改hosts文件
路径：C:\Windows\System32\drivers\etc

``` hosts
192.30.253.113 github.com
185.199.108.153 assets-cdn.github.com   
151.101.185.194 github.global.ssl.fastly.net
```
### 刷新DNS缓存
window：cmd中敲入   ipconfig /flushdns

### 使用https下载火箭般的速度，怎一个爽字得了！


## React

### React不支持转义部分es6
只能增加配置转义或者增加该api