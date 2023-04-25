---
title: 前端面试源码
categories: 学习
date: 2022-12-07 10:36:00
updated: 2023-03-31 11:42:00
tags:
  - 面试
---

## vue2 源码解析

[VUE2 源码解析](https://zhuanlan.zhihu.com/p/419896443)

### new Vue 初始化

new Vue 实例会执行\_init 方法，首先合并全局 api 混入内容，然后触发 beforeCreate 回调函数，接着初始化状态，props，methods，data，computed，watch，初始化成功后调用 created 回调函数，最后 vm.$mount(vm.$options.el)挂载函数。

挂载$mount函数内把用户传入的el挂载在$el，优先看有没有 render 函数如果有直接用，如果没有 render 函数就看有没有 template 模板有的话转为 render 函数，如果都没有就直接获取 el 的 outerHTML 作为渲染模板，最后调用 mount 方法渲染页面。

渲染函数 mountComponent 内，渲染之前调用 beforeMount 生命周期，生成一个渲染 watcher 每次页面依赖的数据更新后会调用 updateComponent 用来得到 Vnode 渲染真实 dom。渲染真实 dom 结束后调用 mounted 生命周期

创建节点 createElm 函数内，首先查看元素 tag 是不是组件，如果是组件就创建组件，如果有子节点递归渲染子节点并给父元素插入子元素。

### 双向数据绑定原理

[核心模块](https://segmentfault.com/a/1190000008377887)

核心是 Object.defineProperty() 方法，vue 双向绑定内部核心就是利用了两个类， Dep 类和 watcher 类。每个在页面上使用了的属性、数组、对象都会有一个 Dep 类，访问属性的时候 get 方法会收集对应的 watcher

同样渲染 watcher 也会收集对应的 Dep

vue 内部实现双向绑定过程：`简单来说就是初始化 data 的时候会调用 observe 方法给，data 里的属性重写 get 方法和 set 方法，到渲染真实 dom 的时，渲染 watcher 会去访问页面上使用的属性变量，给属性的 Dep 都加上渲染函数，每次修改数据时通知渲染 watcher 更新视图`

Observer: 数据的观察者，让数据对象的读写操作都处于自己的监管之下

Watcher: 数据的订阅者，数据的变化会通知到 Watcher，然后由 Watcher 进行相应的操作，例如更新视图

Dep: Observer 与 Watcher 的纽带，当数据变化时，会被 Observer 观察到，然后由 Dep 通知到 Watcher

{% image /assets/img/Interview/Vue.png %}

Observe 中创建 Dep 实例然后使用 Object.defineProperty 定义监听`__ob__`属性的 this 内容，然后如果是数组则重写方法后再尝试监听。递归监听会使用 defineProperty 方法监听对象属性，创建 Dep 实例后，函数中的 Object.defineProperty 会再 get 方法内添加判断，渲染的期间给每个放在页面上的变量添加 watcher，因为只有渲染阶段才会 Dep.target ，有正常访问 target 是没有的，如果有 Dep.target 则添加 watcher 监听。set 方法内在修改后调用 observe，更新数组或者对象的时候也要创建一个新的 dep 给 childDep。并调用 dep 的 notify 方法通知 watcher 更新视图。

### 监听数组变化

该数组是响应式的时候，重写所有数组原生方法，重点！每个响应式数组上都会有一个 **ob** 利用我们保留的 **ob** 属性获取 notify 方法更新视图。

### Watch 监听的实现

核心也是利用 watcher 和 dep 两个类来实现的。区别就是这次 watcher 保留的是用户传入的 watch 回调函数，依然创建 Watcher 实例，传入参数的 user 设置为 true 标识是用户 watch，就会在参数修改时触发的 watch 函数中判断 user 是否为 true 调用 this.cb.call(this.vm, newValue, oldValue)触发回调。

### computed 实现

创建 Watcher lazy:true 默认不执行 ，看是否需要重新计算，computed 是有缓存的。
重点：计算属性方法内部变量的 Dep 上会有两个 watcher 分别是是计算属性 wathcer 和渲染 watcher，计算属性 watcher 的作用只需要控制是否需要重新计算，跟着调用依赖的渲染 watcher 重新计算属性。

### nextTick 原理

vue 用异步队列的方式来控制 DOM 更新和 nextTick 回调先后执行

micro-task 因为其高优先级特性，能确保队列中的微任务在一次事件循环前被执行完毕

因为兼容性问题，vue 不得不做了 microtask 向 macrotask 的降级方案。

### Vue.extend 原理

简单来说就是基于 Vue 构造函数，创建一个子类，然后继承父类的参数和方法，最后再返回这个子类，每个子组件都是一个 Sub 构造函数。子组件创建流程和 new Vue 初始化流程 区别不大。
每一个组件实例都有一个唯一的 cid ，防止重复安装。

子组件创建过程中没有 el ，vue 渲染组件的时候内部自动调用 child.$mount(undefined) 不会挂载到页面上，而是放在 vnode.componentInstance.el 上，通过父组件压入到页面上。

## vue3 源码

[VUE3 mini-vue 仓库](https://github.com/cuixiaorui/mini-vue)

### 为什么要升级到 Vue3

更小：所有 Runtime: 22.5kb(vue2 为 32kb)。
更快：SSR 速度提高了 2 ~ 3 倍，初始渲染/更新最高可提速一倍。
更优：update 性能提高 1.3 ~ 2 倍，内存占用减小了一半。
更易：更好的 TypeScript 支持，更多友好特性和检测。

### Vue3 有哪些新特性

Tree-shaking 支持 ( 按需加载 )
静态树提升
静态属性提升
虚拟 DOM 重构
插槽优化
Suspense、Fragment、Teleport
支持 TS ( 原生 Class Api 和 TSX )
基于 Proxy 的新数据监听系统（Composition API）
自定义渲染平台（Custom Render）
等。。。

### 响应式原理

reactive：将「引用类型」数据转换为「响应式」数据；
ref： 可将基本类型和引用类型都变成响应式，通过监听类的 value 属性的 get 和 set 实现，但是当传入的值为引用类型时实际上内部还是使用 reactive 方法进行的处理。
ref 经修改实现方式后性能更高，推荐使用 ref 一把梭。

ref 方法会 new 一个类 返回的是一个 RefImpl 实例，这个类监听了 value 属性的 get 和 set ，实现了在 get 中收集依赖，在 set 中触发依赖，而如果需要对传入参数深层监听的话，就会调用 reactive 方法。

reactive 方法实际调用的是 createReactiveObject，调用 Proxy 代理 target，使用一个 targetMap 全局 WeakMap 实例来存储依赖。

## vuex 源码

[vuex 源码](https://juejin.cn/post/6844903507057704974)

### 安装

install 代码做了两件事情，一件是防止 Vuex 被重复安装，另一件是执行 applyMixin，目的是执行 vuexInit 方法初始化 Vuex。Vuex 针对 Vue1.0 与 2.0 分别进行了不同的处理，如果是 Vue1.0，Vuex 会将 vuexInit 方法放入 Vue 的\_init 方法中，而对于 Vue2.0，则会将 vuexinit 混淆进 Vue 的 beforeCreacte 钩子中。

```js
/*Vuex的init钩子，会存入每一个Vue实例等钩子列表*/
function vuexInit() {
	const options = this.$options;
	// store injection
	if (options.store) {
		/*存在store其实代表的就是Root节点，直接执行store（function时）或者使用store（非function）*/
		this.$store =
			typeof options.store === 'function' ? options.store() : options.store;
	} else if (options.parent && options.parent.$store) {
		/*子组件直接从父组件中获取$store，这样就保证了所有组件都公用了全局的同一份store*/
		this.$store = options.parent.$store;
	}
}
```

## React

### React 优化

react 的默认做法是调用所有组件的 render，再对生成的虚拟 DOM 进行对比（黄色部分），如不变则不进行更新. 应该避免不必要的 render 行为, 使用 memo,PureComponent,shouldComponentUpdate 等方法.

避免使用内联函数重复创建
使用 fragement(空标签)作为根标签

### fiber

在 React 中，Fiber 就是 React 16 实现的一套新的更新机制，让 React 的更新过程变得可控，避免了之前采用递归需要一气呵成影响性能的做法。
每个元素都会有一个 fiber 对象对应。这些 fiber 对象之间相互关联，构成了 fiber tree。
react fiber 的更新过程是碎片化的，一次更新会分为 n 个任务片。每个片执行完成后就会吧控制权交给调度器。
调度器会查看浏览器是否有级别更高的任务（比如：alert，onclick，等），如果有执行这个高级别任务，如果没有继续执行 fiber 更新。这个功能是基于 requestIdleCallback 实现的。
这样以来你就不用担心浏览器会卡死现象。

### 事件机制

React 基于虚拟 dom 实现了一个合成事件层,定义的事件处理器会接收到一个合成事件对象的实例，它符合 W3C 标准，且与原生的浏览器事件拥有同样的接口，支持冒泡机制， 所有的事件都自动绑定在最外层上。

主要对合成事件做了两件事:
事件委派:React 会把所有的事件绑定到结构的最外层，使用统一的 事件监听器，这个事件监听器上维持了一个映射来保存所有组件内部 事件监听和处理函数。
自动绑定:React 组件中，每个方法的上下文都会指向该组件的实例， 即自动绑定 this 为当前组件。

### 高阶组件

是 React 中用于复用组件逻辑的一种高级技巧。它是一种基于 React 的组合特性而 形成的设计模式。接受一个组件和额外的参 数(如果需要)，返回一个新的组件。HOC 是纯函数，没有副作用。

优点∶ 逻辑服用、不影响被包裹组件的内部逻辑。
缺点∶ hoc 传递给被包裹组件的 props 容易和被包裹后的组件重名， 进而被覆盖