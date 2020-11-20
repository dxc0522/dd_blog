---
title: Fabric.js
categories: 开发
date: 2019-7-8 14:53:00
tags: 
 - canvas
---
## 入门须知
[官网传送](http://fabricjs.com/)
js引入或者包引入都可。
body创建一个canvas标签加上id与宽高即可。
## 创建图形
``` js
var canvas=new fabric.Canvas('box');//初始化canvasID才可
var rect=new fabric.Rect({//方形
    left:40,
    top:40,
    fill:'red',
    width:100,
    height:100,
})
var circle=new fabric.Circle({//圆圈
    radius:50,//必须要有
    left:200,
    top:200,
    fill:'green',
    height:100,
    width:100,
})
var triangle=new fabric.Triangle({//三角形
    width:80,
    height:100,
    fill:"pink",
    left:300,
    top:300,
})

canvas.add(rect);//添加图形至画布中。
canvas.add(circle);
canvas.add(triangle)
```
## 图片引入与操作
``` js
fabric.Image.fromURL("./timg.jpg", function(img) {
    // 可以进行任何操作后在渲染
    img.scale(0.5);
    canvas.add(img);//此处引入后就不用在外面引入了。
});
```
## 不规则图形
``` js
var path = new fabric.Path("M 0 0 L 200 200 L 100 200 z");
// M代表移动 第一个为x轴第二为Y轴 L为路径的意思 z为结束的意思
path.set({
    left: 100,
    top: 100,
    fill: "red"
});
```
## 动画设置
[官方教程](http://fabricjs.com/fabric-intro-part-2#animation)
``` js
var rect = new fabric.Rect({
    left: 100,
    top: 100,
    width: 200,
    height: 200,
    fill: "red"
});
rect.set("angle", 30);
rect.animate("left", "+=360", {
    //直接写数字是绝对角度，加上+=的话会加上之前定义的角度旋转
    onChange: canvas.renderAll.bind(canvas),
    duration: 1000,
    easing: fabric.util.ease.easeOutBounce,
});
```
## 图像过滤
[官方教程](http://fabricjs.com/fabric-intro-part-2#image_filters)
``` js
fabric.Image.fromURL("./timg.jpg", function(img) {
    img.scale(0.5);
    // add filter
    img.filters.push(
    new fabric.Image.filters.Grayscale(), //过滤方法官网查找
    new fabric.Image.filters.Brightness({
        brightness: 0.2
    }),
    );
    img.applyFilters();
    // add image onto canvas (it also re-render the canvas)
    canvas.add(img);
});
```
## 颜色模式及相互转换
``` js
var canvas = new fabric.Canvas("box");
var color1 = new fabric.Color("#f55");
var color2 = new fabric.Color("#545648");
var color3 = new fabric.Color("545648");
var color4 = new fabric.Color("rgb(100,0,100)");
var color5 = new fabric.Color("rgba(100,0,100,0.8)");

var color11 = color1.toRgb();
var color22 = color2.toRgb();
var color33 = color3.toRgb();
var color44 = color4.toRgb();
var color55 = color5.toHex(); //只有rgb才有颜色，hex都是黑色
var color66 = color1.overlayWith(color5).toRgb(); //覆盖颜色
var rect = new fabric.Rect({
    left: 100,
    top: 100,
    width: 200,
    height: 200,
    fill: color55
});
```
## 渐变填充
```js
var circle = new fabric.Circle({
    left:100,
    top:100,
    width:100,
    height:300,
    radius:50,
    strokWidth:1,//边框
    stroke:'red'
})
circle.setGradient('fill',{
    x1:0,
    y1:0,//坐标点
    x2:0,
    y2:circle.height,
    colorStops:{
    0:'#00f',
    0.2:'orange',//这个是百分比渐变设置
    1:'#f00'
    }
})
```
## 文字
```js
var text = new fabric.Text("hello word", {
    left: 100,
    top: 100,
    fontFamily: "Comic Sans",
    linethrough:true,
    fontSize:20
});
```
## 事件
[官方教程](http://fabricjs.com/fabric-intro-part-2#events)
``` js
var rect = new fabric.Rect({
    width: 100,
    height: 100,
    fill: "red"
});
rect.on("selected",function(point){//选中可以在选区上
    console.log(point)
})
canvas.on("mouse:down", function(point) {//点击只能在画布上
    console.table(point.absolutePointer);
});
```