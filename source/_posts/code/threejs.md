---
title: ThreeJS
categories: 开发
date: 2022-8-03 09:49:00
tags:
  - 3D
  - 模型
  - AR
---

## 了解 ThreeJS

[入门教程](https://www.bilibili.com/video/BV1Gg411X7FY)
threejs 由场景，相机，物体，控制四部分组成，物体有大小形状和材质等，相机有多种角度模式，场景是物体对应场景，控制可以设置如何控制物体或者视角。

| 名词   | 单词     | 解释                                             |
| :----- | :------- | :----------------------------------------------- |
| 场景   | scene    | 放置物体、灯光和摄像机的地方。                   |
| 几何体 | geometry | 物体外形的结构模型                               |
| 材质   | texture  | 用于填充几何体，确定几何体透光性等特性           |
| 纹理   | material | 对材质贴上纹理                                   |
| 灯光   | light    | 设置光源，决定物体的阴影和反光等特性效果         |
| 控制   | controls | 控制器用于设置与物体的交互方式                   |
| 摄像机 | camera   | 摄像机用于模拟人眼，决定渲染的内容和看到的角度等 |

### 简单入门

```
    // 1、创建场景
    const scene = new THREE.Scene();
    // 2、创建相机 有多种相机可以选择
    const camera = new THREE.PerspectiveCamera(
        75,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
    );

    // 设置相机位置
    camera.position.set(0, 0, 10);
    scene.add(camera);
    // 设置坐标系
    const axesHelper = new THREE.AxesHelper(5);
    scene.add(axesHelper)
    // 添加物体
    // 创建几何体
    const cubeGeometry = new THREE.BoxGeometry(1, 1, 1);
    const cubeMaterial = new THREE.MeshBasicMaterial({ color: 0xffff00 });
    // 根据几何体和材质创建物体
    const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
    // cube.position.set(1, 0, 0)
    // cube.position.y = 2
    // cube.rotation.set(Math.PI / 4, 0, 0,'XYZ')
    // 将几何体添加到场景中
    scene.add(cube);

    // 初始化渲染器
    const renderer = new THREE.WebGLRenderer();
    // 设置渲染的尺寸大小
    renderer.setSize(window.innerWidth, window.innerHeight);
    // 将webgl渲染的canvas内容添加到body
    document.body.appendChild(renderer.domElement);
    // 有多种控制方式可以选择
    const controls = new OrbitControls(camera, renderer.domElement)
    // 内置时间对象
   const clock = new THREE.Clock()
    function render(timer) {
      // timer 是频率刷新动画的事件
        // 获取时钟运行时长
        let time = clock.getElapsedTime()
        // let deltaTime = clock.getDelta()  //计算间隔是从最后一次调用start  getElapsedTime 或 getDelta 方法开始计算
        console.log('时钟运行总时长', time)
        // console.log('两次获取时间的间隔：' + deltaTime)
        let t = time % 5;
        cube.position.x = t * 1;
        if (cube.position.x > 5) {
            cube.position.x = 0
        }
        renderer.render(scene, camera);
        requestAnimationFrame(render)
    }

    render()

```

### 刷新画面配置

当窗口更改大小的时候同时刷新显示画面,修改配置并不单修改了画布大小，同时修改了展示的比例大小，从而保证内容在任何画面上都可以展示同等效果。

```
// 监听窗口变化 更新
    window.addEventListener('resize', () => {
        console.log('画面变化了')
        // 更新摄像头
        camera.aspect = window.innerWidth / window.innerHeight
        // 更新摄像机的投影矩阵
        camera.updateProjectionMatrix()
        // 更新渲染器
        renderer.setSize(window.innerWidth, window.innerHeight)
        // 设置渲染器的像素比
        renderer.setPixelRatio(window.innerWidth / window.innerHeight)
    })
```

### gsap 动画库

npm i gsap 安装包 就可以直接添加指定数据和进度曲线的动画 [gsap 官网文档](<https://greensock.com/docs/v3/GSAP/gsap.config()>) [TweenMax 文档](https://www.tweenmax.com.cn/index.html)

```
    const animation1 = gsap.to(cube.position, {
        x: 5, duration: 5, ease: 'power1.inOut', repeat: -1, yoyo: true,// 循环
         delay: 2, onStart() {
            console.log('动画开始')
        }, onComplete() {
            console.log('动画完成')
        }
    })
     gsap.to(cube.rotation, { x: 2 * Math.PI, duration: 5, ease: 'power1.inOut', repeat: 1 })

    window.addEventListener('dblclick', () => {
        animation1.isActive() ? animation1.pause() : animation1.play()
    })
```

### 界面调整参数库

npm i dat.gui 安装 gui 库，可以在页面直接调整数据，从而快速调整参数从而达到效果。

```
    // 创建gui  界面参数调整
    const gui = new dat.GUI()
    gui.add(cube.position, 'x').min(0).max(5).step(0.01).name('移动x轴').onChange((value) => {
        console.log('onChange', value)
    }).onFinishChange(value => {
        console.log('onFinishChange', value)
    })
    // 修改物体颜色
    const params = {
        color: "#FFFF00",
        fn() {
            console.log('执行函数')
            gsap.to(cube.position, { x: 5, duration: 2, yoyo: true, repeat: -1 })
        }
    }
    gui.addColor(params, "color").onFinishChange(value => {
        console.log('onFinishChange', value)
        cube.material.color.set(value)
    })
    gui.add(cube, "visible").name('是否显示')
    // 点击触发某个事件 设置选项框
    gui.add(params, 'fn').name('开始动画')
    // 添加文件夹
    const folder = gui.addFolder("设置立方体")
    folder.add(cube.material, "wireframe")
```

### UV 法向属性

图形摊开后以左上角为坐标轴的坐标点为 uv，下图以正方体为例。
{%  image /assets/img/threejs/uv.png %}

### 滤镜参数
magFilter 放大滤镜 minFilter 缩小滤镜，设置图片的滤镜参数可以将模糊的小图尽可能的不模糊失真。

### PBR
物理渲染
#### 灯光属性
1.入射光：
  - 直接照明：直接从光源发射的阴影物体表面的光
  - 间接照明：环境光和直接光经过反弹第二次进入的光
2.反射光
  - 镜面光：在经过表明反射聚焦在同一方向上进入人眼的高亮光
  - 漫反射：光被散射并沿着各个方向离开表面的光
法线：与光垂直的线

#### 阴影
因为阴影消耗计算资源所以默认关闭，如果开启需要：环境开启阴影，灯光开启阴影，物体开启阴影，接受阴影物体开启接收阴影

## 延伸
### HDR
HDR技术是一种改善动态对比的技术，HDR就是高动态范围技术，提升最高和最暗画面的对比度，从而获得更广泛的色彩范围目前市面上使用HDR的作品还很少。用HDR的资源加载环境图更完善。