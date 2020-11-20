---
title: 开发常用
categories: 开发
date: 2019-8-14 11:53:00
---
## Git
### .gitignore规则不生效
.gitignore只能忽略那些原来没有被track的文件，如果某些文件已经被纳入了版本管理中，则修改.gitignore是无效的。

解决方法就是先把本地缓存删除（改变成未track状态），然后再提交:

```git
git rm -r --cached .
git add .
git commit -m 'update .gitignore'
``` 

## 基础样式

```css
.dis_n {
  display: none;
}
.dis_b {
  display: block;
}
.w100 {
  width: 100%;
}
.h100 {
  height: 100%;
}
.wh100 {
  width: 100%;
  height: 100%;
}
.ov {
  overflow: hidden;
}
.txo {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap; /*不换行*/
}
/* flex */
.dis_f {
  display: flex;
  display: -webkit-flex;
}
.jus_bt {
  justify-content: space-between;
  -webkit-justify-content: space-between;
}
.jus_ct {
  justify-content: center;
  -webkit-justify-content: center;
}
.jus_rt {
  justify-content: flex-end;
  -webkit-justify-content: flex-end;
}
.jus_cen {
  justify-content: space-around;
  -webkit-justify-content: space-around;
}
.ali_ct {
  align-items: center;
  -webkit-align-items: center;
}
.ali_end {
  align-items: flex-end;
  -webkit-align-items: flex-end;
}
.ali_top {
  align-items: flex-start;
  -webkit-align-items: flex-start;
}
.ali_h100 {
  align-items: stretch;
}
.fl1 {
  flex: 1;
}
/* 溢出向下排列 */
.flw_w {
  flex-wrap: wrap;
}
/* 从上往下 */
.fle_t {
  flex-direction: column;
}
.fle_f {
  flex-direction: column-reverse;
}
/* 不缩放 */
.fle_no {
  flex-shrink: 0;
}
/* 定位 */
.por {
  position: relative;
}
.poa {
  position: absolute;
}
.tbcen {
  top: 50%;
  transform: translateY(-50%);
}
.lrcen {
  left: 50%;
  transform: translateX(-50%);
}
.cen {
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
/* 蒙版 */
.b_box {
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.8);
  position: absolute;
  left: 0;
  top: 0;
}
/* 固定宽高 */
.scroll_class {
  top: 0px;
  left: 0px;
  width: 100%;
  height: 100%;
  overflow: hidden;
  position: fixed;
  z-index: 1;
}
/* 颜色 */
.wht {
  background: #fff;
}
/* 楼层 */
.p2 {
  padding: 0 20rpx;
}
.borB {
  border-bottom: 1px solid #e6e6e6;
}
.borB:last-of-type {
  border: none;
}
.borB20 {
  border-bottom: 20rpx solid #f5f5f5;
}
.wht_box {
  width: 100%;
  height: 100%;
  position: fixed;
  left: 0;
  top: 0;
  z-index: 1;
  overflow: auto;
}
.noscroll {
  top: 0px;
  left: 0px;
  width: 100%;
  height: 100%;
  overflow: hidden;
  position: fixed;
  z-index: 0;
}
```

## 微信小程序基础样式

```css
// ::-webkit-scrollbar {
//   // width: 0;
//   // height: 0;
//   // color: transparent;
//   width: 6px;
//   background-color: #f5f5f5;
// }//滚动条
::-webkit-scrollbar-thumb {//滚动条背景
  background-color: #aaa;
}
/* 怪异模式 */
.bos {
  box-sizing: content-box;
}
.navigator-hover {
  background-color: transparent;
  opacity: 0.5;
}
button {
  padding: 0;
  margin: 0;
}
.button-hover {
  background-color: transparent;
  opacity: 0.5;
}
button::after {
  display: none;
}
page,view,text,image,icon,textarea,switch,input,scroll-view {
  // font-family: "PingFang SC", -apple-system, "Helvetica Neue", Helvetica, STHeiTi, sans-serif;
  box-sizing: border-box;
  line-height: 100%;
  padding: 0;
  margin: 0;
  flex-shrink: 0;
}
```

## h5 基础样式

``` css
    // 引入字体
    // @font-face {
    //   font-family: "NotoSansHans-Bold";
    //   src: url("../font/NotoSansHans-Bold.otf");
    //   font-family: "NotoSansHans-Regular";
    //   src: url("../font/NotoSansHans-Regular.otf");
    //   font-weight: normal;
    //   font-style: normal;
    // }
    a,article,aside,audio,::before,::after,b,blockquote,body,canvas,caption,dd,details,div,dl,dt,em,embed,fieldset,figcaption,figure,footer,form,h1,h2,h3,h4,h5,h6,header,hgroup,html,i,iframe,img,label,legend,li,menu,nav,object,ol,output,p,s,section,small,span,strong,sub,summary,sup,table,tbody,td,tfoot,th,thead,time,tr,tt,u,ul,var,video {
        margin: 0;
        padding: 0;
        border: 0;
        -webkit-box-sizing: border-box;
        -webkit-tap-highlight: transparent;
        /*清除点击默认的高亮效果*/
    }
    ol,ul,li {
     list-style: none;
    }
    table {
        border-collapse: collapse;
        /*表格的边线重叠*/
        border-spacing: 0;
    }
    input,textarea {
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
    a,a:link,a:visited {
        text-decoration: none;
        color: #343434;
        -webkit-touch-callout: none;
    }
    .clearfix:after {
        content: "";
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
        font-family: "NotoSansHans-Bold", "microsoft yahei", "\534E\6587\7EC6\9ED1", Verdana, Arial, Helvetica, sans-serif;
        -webkit-user-select: none;
        /*禁止选中内容*/
    }
    /*微软雅黑      华文细黑                                         最后一个字体：ios系统默认 */
```

## 常用正则

``` js
   export default (type, data) => {
       const checkList = {
           name: /^[\u4e00-\u9fa5]{2,8}$/gi,
           phone: /^[1][1-9][0-9]{9}$/,
           iCard: /\d{17}[\d|x]|\d{15}/,
           email: /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/,
       };
       return !checkList[type].test(data);
   };
```

## 常用方法

```js
export const formatDate = data => {
 let date;
 if (!("time" in data)) {
   date = new Date();
 } else {
   date = new Date(Number(data.time));
 }
 var o = {
   "M+": date.getMonth() + 1, //月份
   "d+": date.getDate(), //日
   "h+": date.getHours(), //小时
   "H+": date.getHours(), //小时
   "m+": date.getMinutes(), //分
   "s+": date.getSeconds(), //秒
   "q+": Math.floor((date.getMonth() + 3) / 3), //季度
   S: date.getMilliseconds() //毫秒
 };
 var week = {
   "0": "/u65e5",
   "1": "/u4e00",
   "2": "/u4e8c",
   "3": "/u4e09",
   "4": "/u56db",
   "5": "/u4e94",
   "6": "/u516d"
 };
 //  返回的时间
 let backTime = data.type;
 if (/(y+)/.test(backTime)) {
   backTime = backTime.replace(
     RegExp.$1,
     (date.getFullYear() + "").substr(4 - RegExp.$1.length)
   );
 }
 if (/(E+)/.test(backTime)) {
   backTime = backTime.replace(
     RegExp.$1,
     (RegExp.$1.length > 1
       ? RegExp.$1.length > 2
         ? "/u661f/u671f"
         : "/u5468"
       : "") + week[date.getDay() + ""]
   );
 }
 for (var k in o) {
   if (new RegExp("(" + k + ")").test(backTime)) {
     backTime = backTime.replace(
       RegExp.$1,
       RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length)
     );
   }
 }
 return backTime;
}
```

## 分析打包后文件占比
`yarn add source-map-explorer -D`
增加脚本
`"analyze": "source-map-explorer 'build/static/js/*.js'",`
运行该命令后可以分析打包文件进而进行编辑修改。