---
title: 开发常用
categories: 开发
date: 2019-8-14 11:53:00
updated: 2023-04-01 20:28:00
tags:
  - Coding
---

## 相关生态传送门

### Vue

| 名称         | 功能                      | 链接                                                                |
| :----------- | :------------------------ | ------------------------------------------------------------------- |
| Vue2         | Vue2                      | [传送门](https://v2.cn.vuejs.org/v2/guide/)                         |
| Vue3         | Vue3                      | [传送门](https://cn.vuejs.org/guide/introduction.html)              |
| Vue-Router   | 路由                      | [传送门](https://router.vuejs.org/zh/installation.html)             |
| VueX         | 状态管理库                | [传送门](https://vuex.vuejs.org/zh/guide/)                          |
| Pinia        | 状态管理库                | [传送门](https://pinia.web3doc.top/introduction.html)               |
| Element      | 仅适用于 Vue2 的 UI 库    | [传送门](https://element.eleme.cn/#/zh-CN)                          |
| Element-Plus | 仅适用于 Vue3 的 UI 库    | [传送门](https://element-plus.org/zh-CN/component/button.html)      |
| Vant         | 适用于 Vue 的移动端 UI 库 | [传送门](https://vant-contrib.gitee.io/vant/#/zh-CN)                |
| Navie        | 仅适用于 Vue3 的 UI 库    | [传送门](https://www.naiveui.com/zh-CN/os-theme/docs/introductionr) |

### React

| 名称          | 功能                          | 链接                                                      |
| :------------ | :---------------------------- | --------------------------------------------------------- |
| React         | React                         | [传送门](https://zh-hans.reactjs.org/reference/react)     |
| React-Router  | 路由                          | [传送门](https://reactrouter.com/en/main)                 |
| Redux-toolkit | 状态管理库                    | [传送门](https://cn.redux.js.org/redux-toolkit/overview/) |
| SWR           | 用于数据请求的 React Hooks 库 | [传送门](https://swr.bootcss.com/docs/getting-started)    |
| AntDesign     | React 的 UI 库                | [传送门](https://ant.design/components/overview-cn)       |

### uni-app

| 名称       | 功能       | 链接                                                             |
| :--------- | :--------- | ---------------------------------------------------------------- |
| uview-plus | 高赞 UI 库 | [传送门](https://uiadmin.net/uview-plus/components/install.html) |
| z-paging   | 下拉组件   | [传送门](https://z-paging.zxlee.cn/start/install.html)           |
| uCharts    | 图表组件   | [传送门](https://www.ucharts.cn/v2/#/guide/index)                |

### 项目工具

| 名称         | 功能                | 链接                                                          |
| :----------- | :------------------ | ------------------------------------------------------------- |
| lodash       | 高性能工具库        | [传送门](https://www.lodashjs.com/)                           |
| axios        | 网络请求库          | [传送门](https://www.axios-http.cn/docs/intro)                |
| clipboard    | 复制到剪贴板        | [传送门](https://clipboardjs.com/)                            |
| dayjs        | 日期库              | [传送门](https://dayjs.fenxianglu.cn/category/)               |
| js-cookie    | 设置 cookie 的库    | [传送门](https://www.npmjs.com/package/js-cookie)             |
| xlsx         | 操作 xlsx 文件      | [传送门](https://www.npmjs.com/package/xlsx)                  |
| handsontable | 前端 Excel 表格插件 | [传送门](https://handsontable.com/docs/javascript-data-grid/) |
| localforage  | 优雅的浏览器存储库  | [传送门](http://localforage.docschina.org/#)                  |
| Sass         | Css 辅助工具        | [传送门](https://www.sass.hk/docs/)                           |
| echarts 社区 | 多种 Echarts 配置   | [传送门](https://www.makeapie.cn/echarts)                     |

## 基础样式

### flex

```css
/* flex */
.dis_f {
	display: flex;
}
.dis_inf {
	display: inline-flex;
}
/* 主轴 */
.ali_top {
	align-items: flex-start;
	-webkit-align-items: flex-start;
}
.ali_ct {
	align-items: center;
	-webkit-align-items: center;
}

.ali_end {
	align-items: flex-end;
	-webkit-align-items: flex-end;
}

.ali_st {
	align-items: stretch;
}

.ali_bl {
	align-items: baseline;
}
/* 侧轴 */

.jus_lt {
	justify-content: center;
	-webkit-justify-content: center;
}

.jus_ct {
	justify-content: center;
	-webkit-justify-content: center;
}

.jus_rt {
	justify-content: flex-end;
	-webkit-justify-content: flex-end;
}

.jus_bt {
	justify-content: space-between;
	-webkit-justify-content: space-between;
}

.jus_cen {
	justify-content: space-around;
	-webkit-justify-content: space-around;
}

/* 多主轴对齐方式 */
.alicon_top {
	align-content: flex-start;
	-webkit-align-content: flex-start;
}
.alicon_ct {
	align-content: center;
	-webkit-align-content: center;
}

.alicon_end {
	align-content: flex-end;
	-webkit-align-content: flex-end;
}

.alicon_st {
	align-content: stretch;
	-webkit-align-content: stretch;
}

.alicon_bt {
	align-content: space-between;
	-webkit-align-content: space-between;
}
.alicon_cen {
	align-content: space-around;
	-webkit-align-content: space-around;
}
/* 溢出排列方式 */
.flw_w {
	flex-wrap: wrap;
}
.flw_wr {
	flex-wrap: wrap-reverse;
}

/* 主轴方向 */
.fle_t {
	flex-direction: column;
}
.fle_b {
	flex-direction: column-reverse;
}
.fle_r {
	flex-direction: row-reverse;
}
/* 不缩放 */
.fle_no {
	flex-shrink: 0;
}
/* grow占比 */
.fl1 {
	flex: 1;
}
.fl2 {
	flex: 2;
}
.fl3 {
	flex: 3;
}
```

### 布局 css

```css
/*  字体 */
@for $i from 1 through 10 {
	.f#{$i*2 + 10} {
		font-size: $i * 2 + 10px;
	}
}
.lh100 {
	line-height: 100%;
}
.w100,
.wh100 {
	width: 100%;
}
.h100,
.wh100 {
	height: 100%;
}
.fwb {
	font-weight: bold;
}
/*  边距 */
@for $i from 1 through 3 {
	.mt-#{$i * 10} {
		margin-top: $i * 10px;
	}

	.mb-#{$i * 10} {
		margin-bottom: $i * 10px;
	}

	.ml-#{$i * 10} {
		margin-left: $i * 10px;
	}

	.mr-#{$i * 10} {
		margin-right: $i * 10px;
	}

	.pt-#{$i * 10} {
		padding-top: $i * 10px;
	}

	.pb-#{$i * 10} {
		padding-bottom: $i * 10px;
	}

	.pl-#{$i * 10} {
		padding-left: $i * 10px;
	}

	.pr-#{$i * 10} {
		padding-right: $i * 10px;
	}

	.c#{$i * 333} {
		color: ##{$i * 333};
	}
}
.cfff {
	color: #fff;
}
.por {
	position: relative;
}
.ov {
	overflow: hidden;
}
```

### 微信小程序基础样式

```css
// ::-webkit-scrollbar {
//   // width: 0;
//   // height: 0;
//   // color: transparent;
//   width: 6px;
//   background-color: #f5f5f5;
// }//滚动条
::-webkit-scrollbar-thumb {
	//滚动条背景
	background-color: #aaa;
}
```

### h5 基础样式

```css
// 引入字体
// @font-face {
//   font-family: "NotoSansHans-Bold";
//   src: url("../font/NotoSansHans-Bold.otf");
//   font-family: "NotoSansHans-Regular";
//   src: url("../font/NotoSansHans-Regular.otf");
//   font-weight: normal;
//   font-style: normal;
// }
a,
article,
aside,
audio,
::before,
::after,
b,
blockquote,
body,
canvas,
caption,
dd,
details,
div,
dl,
dt,
em,
embed,
fieldset,
figcaption,
figure,
footer,
form,
h1,
h2,
h3,
h4,
h5,
h6,
header,
hgroup,
html,
i,
iframe,
img,
label,
legend,
li,
menu,
nav,
object,
ol,
output,
p,
s,
section,
small,
span,
strong,
sub,
summary,
sup,
table,
tbody,
td,
tfoot,
th,
thead,
time,
tr,
tt,
u,
ul,
var,
video {
	margin: 0;
	padding: 0;
	border: 0;
	-webkit-box-sizing: border-box;
	-webkit-tap-highlight: transparent;
	/*清除点击默认的高亮效果*/
}
ol,
ul,
li {
	list-style: none;
}
table {
	border-collapse: collapse;
	/*表格的边线重叠*/
	border-spacing: 0;
}
input,
textarea {
	border: 0 none;
	resize: none;
	/*调整尺寸*/
	/*outline:none;*/
	/*清除表单默认的蓝色边框效果*/
	-webkit-appearance: none;
	/* 针对表单的默认的样式进行清除  比如立体效果*/
}
:focus {
	outline: none;
}
img {
	display: block;
	-webkit-touch-callout: none;
	/*当你触摸并按住触摸目标时候，禁止或显示系统默认菜单 */
}
a,
a:link,
a:visited {
	text-decoration: none;
	color: #343434;
	-webkit-touch-callout: none;
}
.clearfix:after {
	content: '';
	display: block;
	height: 0;
	clear: both;
	visibility: hidden;
}
.fl {
	float: left;
}
.fr {
	float: right;
}
html {
	-webkit-text-size-adjust: none;
	/*不调整（拉伸）字大小*/
}
body {
	font-family: 'NotoSansHans-Bold', 'microsoft yahei', '\534E\6587\7EC6\9ED1',
		Verdana, Arial, Helvetica, sans-serif;
	-webkit-user-select: none;
	/*禁止选中内容*/
}
/*微软雅黑      华文细黑                                         最后一个字体：ios系统默认 */
```

## 常用正则

```js
export default (type, data) => {
	const checkList = {
		name: /^[\u4e00-\u9fa5]{2,8}$/gi,
		phone: /^[1][1-9][0-9]{9}$/,
		iCard: /\d{17}[\d|x]|\d{15}/,
		email:
			/^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/,
	};
	return !checkList[type].test(data);
};
```

## 分析打包后文件占比

`yarn add source-map-explorer -D`
增加脚本
`"analyze": "source-map-explorer 'build/static/js/*.js'",`
运行该命令后可以分析打包文件进而进行编辑修改。

## Git

### .gitignore 规则不生效

.gitignore 只能忽略那些原来没有被 track 的文件，如果某些文件已经被纳入了版本管理中，则修改.gitignore 是无效的。

解决方法就是先把本地缓存删除（改变成未 track 状态），然后再提交:

```git
git rm -r --cached .
git add .
git commit -m 'update .gitignore'
```

### 解决 git clone 速度太慢

#### 查询 CDN

[查询以下域名最快的 cdn](https://www.ipaddress.com/)

- github.com
- assets-cdn.github.com
- github.global.ssl.fastly.net

#### 修改 hosts 文件

路径：C:\Windows\System32\drivers\etc

```hosts
192.30.253.113 github.com
185.199.108.153 assets-cdn.github.com
151.101.185.194 github.global.ssl.fastly.net
```

#### 刷新 DNS 缓存

window：cmd 中敲入 ipconfig /flushdns

使用 https 下载火箭般的速度，怎一个爽字得了！

## 微信内置浏览器

### 微信须知

安卓：
无法自动播放视频，无法自动播放音乐，需要点击后才可播放。
视频全屏模式的退出需要 display 即可。
华为全屏模式顶部有一段空白。
IOS：
缓存比较顽固，需要使劲刷新。
更换路径后不自动播放就加个 autoplay 就好了。
长按二维码识别的功能监听可用 touchstart 监听开始自行判断是否有 touchend 判断是否是长按。

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

所有的播放媒体都不要放在组件内，重新 render 的时候会刷新造成卡顿黑屏或停止播放等一堆问题。

### 可以覆盖在 video 标签上做交互视频

```
  playsinline="true"
  webkit-playsinline="true"
  x5-video-player-type="h5"
  x5-video-player-fullscreen="true"
  x5-video-orientation="portrait"
```

### audio 自动播放

```audio自动播放
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

### video 自动播放

```video自动播放
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

### media API

audio 与 video 的部分属性事件都一致。

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

## 3D 全景图（pannellum）

### 介绍

[多种方案介绍](https://blog.csdn.net/qq_42606051/article/details/83824034)
国外的框架[pannellum](https://pannellum.org/)，实现简单。
[krpano](http://www.krpano360.com/)这个框架最好但是收费，一年一百多欧元相当于一千左右人民币了。pass...
[优秀操作手册](https://www.jianshu.com/p/fdbcb551d75b)

### 注意

- 图片可为 4096 宽的，注意图片跨域问题。
- 热点图标不可更改不可替换。
- 热点坐标拾取的时候设置 hotSpotDebug: true，即可在控制台查看坐标信息。
- 热点内容不但可以是文字还可以是图片或者视频

### 开发

首先下载对应 css 与 js 到本地引入项目。

```css
#panorama {
	position: fixed;
	left: 0;
	top: 0;
	width: 100%;
	height: 100%;
}
```

```body
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

## js 动画

requestAnimationFrame 方法制作循环动画最丝滑

requestAnimationFrame 比起 setTimeout、setInterval 的优势主要有两点：
1、requestAnimationFrame 会把每一帧中的所有 DOM 操作集中起来，在一次重绘或回流中就完成，并且重绘或回流的时间间隔紧紧跟随浏览器的刷新频率，一般来说，这个频率为每秒 60 帧。 至于时间间隔为什么是 1000/60,这是因为大多数屏幕渲染的时间间隔是每秒 60 帧。
2、在隐藏或不可见的元素中，requestAnimationFrame 将不会进行重绘或回流，这当然就意味着更少的的 cpu，gpu 和内存使用量。

cancelAnimationFrame()接收一个参数 requestAnimationFrame 默认返回一个 id，cancelAnimationFrame 只需要传入这个 id 就可以停止了。

```
<!doctype html>
<html lang="en">
<head>
    <title>Document</title>
    <style>
        #e{
            width: 100px;
            height: 100px;
            background: red;
            position: absolute;
            left: 0;
            top: 0;
            zoom: 1;
        }
    </style>
</head>
<body>
<div id="e"></div>
<script>


    var e = document.getElementById("e");
    var flag = true;
    var left = 0;
    var rafId = null


    function render() {
        if(flag == true){
            if(left>=100){
                flag = false
            }
            e.style.left = ` ${left++}px`
        }else{
            if(left<=0){
                flag = true
            }
            e.style.left = ` ${left--}px`
        }
    }

    //requestAnimationFrame效果
    (function animloop(time) {
        console.log(time,Date.now())
        render();
        rafId = requestAnimationFrame(animloop);
        //如果left等于50 停止动画
        if(left == 50){
            cancelAnimationFrame(rafId)
        }
    })();

    //setInterval效果
    // setInterval(function(){
    //     render()
    // },1000/60)

</script>
</body>
</html>
```
