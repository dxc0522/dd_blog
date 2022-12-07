---
title: 前端八股文
categories: 学习
date: 2022-12-07 10:36:00
tags:
  - 面试
---

## 相关资源

[vue2 源码](https://zhuanlan.zhihu.com/p/419896443)

## vue2 源码解析

### new Vue 初始化

#### 大体流程

init 函数 每个 vue 斗湖有个 uid，然后合并全局 options 到当前实例的$options,触发回调`beforeCreate`,初始化state,然后触发回调`created`，到这里初始化完成，接着挂载$mount 函数。

$mount 函数中获取挂载的属性节点，优先看有没有 render 函数，有的话直接用，没有的话就看 template 模版，如果都没有就拿节点的 outerHTML（包括当前节点的 dom 节点），如果是 template 则将其转换为生成 render 函数进行 mount 挂载（ 直接写 render 函数对 vue 编译效率会更好 ）。

mountComponent 函数中先触发 `beforeMount` 回调，然后定义一个更新渲染 render 的函数，生成一个 new Watcher 实例，每次页面依赖（this）修改的时候都会触发更新渲染 render 的函数，同时 Watcher 实例每次更新触发的 before 函数都会触发`beforeUpdate`函数。最后 mountComponent 函数触发`mounted`回调,挂载完成。

#### 挂载时

mountComponent 函数中生成一个渲染 watcher 每次页面依赖的数据更新后会调用 updateComponent 进行渲染

```js
new Watcher(
	vm,
	updateComponent,
	() => {},
	{
		before() {
			callHook(vm, 'beforeUpdate');
		},
	},
	true
);
```

vue 初次渲染时 watcher 内部调用了 updateComponent 方法

```js
# updateComponent 整个渲染周期最关键的几行。
let updateComponent = () => {
     //获取到虚拟 dom 调用 update 进行渲染
     vm.update(vm._render())
}
```

Watcher 类

```js
export class Watcher {
	constructor(vm, expOrFn, cb, options) {
		if (typeof expOrFn === 'function') {
			// 保留 updateComponent 方法
			this.getters = expOrFn;
		}
		this.get();
	}
	get() {
		pushTarget(this);
		let value;
		// 这里调用了 updateComponent 方法
		value = this.getters.call(this.vm, this.vm);
		popTarget();
		return value;
	}
}
```

#### render 函数

调用\_render 拿到 Vnode，接着 vm.update diff 对比两次的 Vnode

```js
Vue.prototype.update = function (vnode) {
	let vm = this;
	// 获取到上一次的 Vnode 用于 diff 对比
	const prevVnode = vm._vnode;
	if (!prevVnode) {
		//首次渲染走这里
		vm.$el = patch(vm.$el, vnode);
	} else {
		//数据更新驱动视图更新走这里
		vm.$el = patch(prevVnode, vnode);
	}
	//保留 Vnode
	vm._vnode = vnode;
};
```

#### patch 对比 Vnode 函数

首先判断 tag 是否是组件，如果是就创建组件直接 return 空，然后拿到 data，拿到子元素 children，拿到 tag 标签，创建根元素 tag，接着如果判断有子节点则递归渲染子节点，并插入父元素，如果是注释则创建注释节点，如果都不是则创建文本节点并插入父元素。

```js
return function patch(el, vnode, hydrating, removeOnly) {
	//首次渲染使用 Vnode 创建真实 dom
	createElm(vnode, false, el);
	return vnode.elm;
};
function createElm(
	vnode, //虚拟dom
	insertedVnodeQueue,
	parentElm //父节点
) {
	// 查看元素 tag 是不是组件，如果是组件就创建组件
	if (createComponent(vnode, insertedVnodeQueue, parentElm)) {
		return;
	}
	const data = vnode.data; //得到 data 数据
	const children = vnode.children; //得到子元素
	const tag = vnode.tag; //获取标签名
	vnode.elm = document.createElement(tag);
	if (isDef(tag)) {
		//如果有子节点递归渲染子节点
		createChildren(vnode, children, insertedVnodeQueue);
		//给父元素插入子元素
		parentElm.appendChild(elm);
	} else if (isTrue(vnode.isComment)) {
		//创建注释节点
		vnode.elm = document.createComment(vnode.text);
		//给父元素插入注释节点
		parentElm.appendChild(elm);
	} else {
		//创建文本节点
		vnode.elm = document.createTextNode(vnode.text);
		//给父元素插入文本节点
		parentElm.appendChild(elm);
	}
}
function createChildren(vnode, children, insertedVnodeQueue) {
	if (Array.isArray(children)) {
		for (let i = 0; i < children.length; ++i) {
			//渲染子节点
			createElm(children[i], insertedVnodeQueue, vnode.elm);
		}
	}
}
```

### 双向数据绑定原理

Object.defineProperty(obj, prop, descriptor)其中：obj 要在其上定义属性的对象。prop 要定义或修改的属性的名称。descriptor 将被定义或修改的属性描述符。

其实，简单点来说，就是通过此方法来定义一个值。
调用，使用到了 get 方法，
赋值，使用到了 set 方法。

vue 双向绑定内部核心就是利用了两个类， Dep 类和 watcher 类
简单来说就是初始化 data 的时候会调用 observe 方法给，data 里的属性重写 get 方法和 set 方法，到渲染真实 dom 的时，渲染 watcher 会去访问页面上使用的属性变量，给属性的 Dep 都加上渲染函数，每次修改数据时通知渲染 watcher 更新视图

observe 方法会对基本属性直接返回 空，object 属性的参数递归用 Observe 类进行深度监听，用封装的 defineProperty 方法进行监听如果是数组的话重写原型方法（重写的原型方法就是当使用 push 等方法时触发 dep 的更新视图方法）再次尝试监听。

Dep 类主要就是收集用于 watcher。并可以触发所收集 watcher 的渲染函数，也可以设置 Dep 类的 target 和删除 target。

watcher 类 dep 实例在其中判断去重并管理 watcher 。watcher 类中用在被页面访问时会标记 target 给属性重写 get 添加 watch，然后弹出 target 防止 data 每个属性都产生依赖，只有页面上使用的变量需要依赖。渲染函数就是重新触发 get 方法 从而刷新页面。

defineProperty 方法中都会有一个 dep 实例，封装的 get 方法渲染期间，渲染的阶段才会有 Dep 类上的 target 的时候，才给给每个页面中的变量添加 watcher，正常访问是没有的，set 方法判断数值一致则会 return 空，否则若有会更新子属性的 dep，赋值，并触发 dep 的更新视图。

### Watch 监听的实现

页面 watch 中的监听实现，首先遍历 watch 对象，如果一个 watch 函数中传入的 hander 是数组就创建多个 watcher，不是则直接创建 createWatcher。

createWatcher 中首先拿出 hander 方法，然后通过$watch 函数使用 Watcher 类创建设置监听实例。通过设置 user 为 true 标识为该 watcher 为用户自定义，将在每次更新 data 的时候触发 run 函数中调用用户传入 hander 方法。

### computed 实现

`initComputed` 首先创建一个 watchers 空对象，遍历 computed，用拿到的计算属性函数创建一个 watcher 并设置 lazy:true(默认不执行 get,读取时才执行)，并赋值给空 watchers 并初始化该计算属性方法。
判断计算属性参数是对象还是函数，然后封装到 Object.defineProperty。其中传入的 get 方法经过封装判断 watcher 实例中的 watch.dirty 从而判断是否需要从新求值，若需要则 watch.evaluate()重新渲染如果不需要则直接返回，如果渲染还未结束，则给 computed 函数内部的属性添加渲染 watcher。

重点：计算属性方法内部变量的 Dep 上会有两个 watcher 分别是是计算属性 wathcer 和渲染 watcher，计算属性 watcher 的作用只需要控制是否需要重新计算，跟着调用依赖的渲染 watcher 重新计算属性

### nextTick 原理

大白话：调用 nextTick 会向 callbacks 中 push 函数，该函数会等写个微任务等微任务完成前面的计算应该都结束了然后依次触发回调。

vue 的降级策略（兼容策略，浏览器兼容）promise -> MutationObserver -> setImmediate -> setTimeout
原理：利用异步队列
在每个 macro-task（微任务） 运行完以后，UI 都会重渲染，那么在 miscro-task （异步事件回调） 中就完成数据更新，当前 次事件循环 结束就可以得到最新的 UI 了。反之如果新建一个 macro-task 来做数据更新，那么渲染就会进行两次。

vue 用异步队列的方式来控制 DOM 更新和 nextTick 回调先后执行

micro-task 因为其高优先级特性，能确保队列中的微任务在一次事件循环前被执行完毕

因为兼容性问题，vue 不得不做了 microtask 向 macrotask 的降级方案

### Vue.extend 原理

创建缓存，获取扩展名称，继承父类原型，子类 constructor 指向自己，创建子类 cid，合并 options，初始化 props，computed，添加组件，返回子类。
