---
title: 前端面试八股文
authorDesc: 豆豆
categories: 学习
date: 2019-6-21 16:41:01
updated: 2023-03-29 16:55:00
tags:
  - 前端面试
---

## 面试资源入口

[flex](https://ruanyifeng.com/blog/2015/07/flex-grammar.html)
[position](https://zhuanlan.zhihu.com/p/34486016)
[ES6](https://es6.ruanyifeng.com/)
[手写防抖、节流](https://juejin.cn/post/7032905194736189477)
[设计模式](https://juejin.cn/post/7052148234097000462)
[算法学习-力扣](https://leetcode.cn/study-plan/algorithms/?progress=xhnxl4w6)
[前端面试题 1](https://muyiy.cn/question/)
[前端面试题 2](https://lucifer.ren/fe-interview/#/)
[你不知道的 async、await 魔鬼细节](https://blog.csdn.net/qq_41581588/article/details/129681857)
[八股文](https://juejin.cn/post/7016593221815910408#heading-17)

## HTML

### 浏览器运行机制

1，构建 DOM 树，将标签转为 DOM node（节点，包括 js 生成的标签）
2，构建渲染树：解析所有的 css 样式文件信息
3，布局渲染书：从根节点递归调用，计算每一个元素的大小位置给出精确坐标
4，绘制渲染书：遍历渲染树，使用 UI 层来绘制每个节点。

### 重绘

指一个元素外观的改变所触发的浏览器行为，浏览器会根据元素的新属性进行新属性重新绘制，使元素呈现新的外观。
color，background-color 等会触发重绘。

### 重排（重构、回流、reflow）

当渲染树中的一部分或全部因为元素的规模尺寸布局隐藏等改变而需要重新构建，这就成为回流（reflow）。每个页面至少需要一次回流，就是在页面第一次加载的时候。
任何页面布局和几何属性改变都会触发重排。

### 重绘和重排的关系

在回流的时候浏览器会使渲染树中收到影响的部分失效，并重新构造这部分渲染树，完成回流后，浏览器就会重新绘制受影响的部分到屏幕中，该过程称为重绘。
所以，重排必定引发重绘，重绘不一定会引发重排。

### 优化方案

1、直接修改元素的 className
2、先设置 display:none;然后修改元素，然后在设置 display：block；
3、让它脱离文档流
4、创建完 dom 一次性加入

## React

### React 生命周期有哪些

初始化阶段
constructor 构造函数
getDefaultProps props 默认值
getInitialState state 默认值
挂载阶段
staticgetDerivedStateFromProps(props,state)
render
componentDidMount
getDerivedStateFromProps：组件每次被 rerender 的时候，包括在组件构建之后(虚拟 dom 之后，实际 dom 挂载之前)，每次获取新的 props 或 state 之后；每次接收新的 props 之后都会返回一个对象作为新的 state，返回 null 则说明不需要更新 state；配合 componentDidUpdate，可以覆盖 componentWillReceiveProps 的所有用法
更新阶段
staticgetDerivedStateFromProps(props,state)
shouldComponentUpdate
render
getSnapshotBeforeUpdate(prevProps,prevState)
componentDidUpdate
getSnapshotBeforeUpdate：触发时间: update 发生的时候，在 render 之后，在组件 dom 渲染之前；返回一个值，作为 componentDidUpdate 的第三个参数；配合 componentDidUpdate, 可以覆盖 componentWillUpdate 的所有用法
卸载阶段
componentWillUnmount
错误处理
componentDidCatch
React16 新的生命周期弃用了 componentWillMount、componentWillReceivePorps，componentWillUpdate 新增了 getDerivedStateFromProps、getSnapshotBeforeUpdate 来代替弃用的三个钩子函数。

React16 并没有删除这三个钩子函数，但是不能和新增的钩子函数混用， React17 将会删除这三个钩子函数，新增了对错误的处理（ componentDidCatch）

### setState 是同步的还是异步的？

在 React 的生命周期和合成事件中， React 仍然处于他的更新机制中，这时无论调用多少次 setState，都会不会立即执行更新，而是将要更新的·存入 \_pendingStateQueue，将要更新的组件存入 dirtyComponent。

当上一次更新机制执行完毕，以生命周期为例，所有组件，即最顶层组件 didmount 后会将批处理标志设置为 false。这时将取出 dirtyComponent 中的组件以及 \_pendingStateQueue 中的 state 进行更新。这样就可以确保组件不会被重新渲染多次。

所以。setState 本身并不是异步的，而是 React 的批处理机制给人一种异步的假象。

在原生事件中调用 setState 并不会出发 React 的批处理机制，所以立即能拿到最新结果。

### 为什么有时连续多次 setState 只有一次生效？

原因就是 React 会批处理机制中存储的多个 setState 进行合并，
注意， assign 函数中对函数做了特殊处理，处理第一个参数传入的是函数，函数的参数 preState 是前一次合并后的结果。

### 虚拟 Dom 比普通 Dom 更快吗？

直接操作 DOM 是非常耗费性能的，这一点毋庸置疑。但是 React 使用 VitrualDom 也是无法避免操作 DOM 的。
如果是首次渲染， VitrualDom 不具有任何优势，甚至它要进行更多的计算，消耗更多的内存。
VitrualDom 的优势在于 React 的 Diff 算法和批处理策略， React 在页面更新之前，提前计算好了如何进行更新和渲染 DOM。实际上，这个计算过程我们在直接操作 DOM 时，也是可以自己判断和实现的，但是一定会耗费非常多的精力和时间，而且往往我们自己做的是不如 React 好的。所以，在这个过程中 React 帮助我们"提升了性能"。

所以，我更倾向于说， VitrualDom 帮助我们提高了开发效率，在重复渲染时它帮助我们计算如何更高效的更新，而不是它比 DOM 操作更快。

### React 如何实现自己的事件机制？

React 事件并没有绑定在真实的 Dom 节点上，而是通过事件代理，在最外层的 document 上对事件进行统一分发。
组件挂载、更新时：

通过 lastProps、 nextProps 判断是否新增、删除事件分别调用事件注册、卸载方法。
调用 EventPluginHub 的 enqueuePutListener 进行事件存储
获取 document 对象。
根据事件名称（如 onClick、 onCaptureClick）判断是进行冒泡还是捕获。
判断是否存在 addEventListener 方法，否则使用 attachEvent（兼容 IE）。
给 document 注册原生事件回调为 dispatchEvent(统一的事件分发机制）。
事件初始化：

EventPluginHub 负责管理 React 合成事件的 callback，它将 callback 存储在 listenerBank 中，另外还存储了负责合成事件的 Plugin。
获取绑定事件的元素的唯一标识 key。
将 callback 根据事件类型，元素的唯一标识 key 存储在 listenerBank 中。
listenerBank 的结构是： listenerBank[registrationName][key]。
触发事件时：

触发 document 注册原生事件的回调 dispatchEvent
获取到触发这个事件最深一级的元素
遍历这个元素的所有父元素，依次对每一级元素进行处理。
构造合成事件。
将每一级的合成事件存储在 eventQueue 事件队列中。
遍历 eventQueue。
通过 isPropagationStopped 判断当前事件是否执行了阻止冒泡方法。
如果阻止了冒泡，停止遍历，否则通过 executeDispatch 执行合成事件。
释放处理完成的事件。

### 为何 React 事件要自己绑定 this？

在上面提到的事件处理流程中， React 在 document 上进行统一的事件分发， dispatchEvent 通过循环调用所有层级的事件来模拟事件冒泡和捕获。

在 React 源码中，当具体到某一事件处理函数将要调用时，将调用 invokeGuardedCallback 方法。

```
function invokeGuardedCallback(name,func,a){
    try{
        func(a);
    }
    catch(x){
        if(caughtError ===null){
            caughtError =x;
        }
    }
}
```

### 原生事件和 React 事件的区别？

React 事件使用驼峰命名，而不是全部小写。

通过 JSX , 你传递一个函数作为事件处理程序，而不是一个字符串。

在 React 中你不能通过返回 false 来阻止默认行为。必须明确调用 preventDefault。

### React 和原生事件的执行顺序是什么？可以混用吗？

React 的所有事件都通过 document 进行统一分发。当真实 Dom 触发事件后冒泡到 document 后才会对 React 事件进行处理。

所以原生的事件会先执行，然后执行 React 合成事件，最后执行真正在 document 上挂载的事件

React 事件和原生事件最好不要混用。原生事件中如果执行了 stopPropagation 方法，则会导致其他 React 事件失效。因为所有元素的事件将无法冒泡到 document 上，导致所有的 React 事件都将无法被触发。。

### 虚拟 Dom 是什么？

在原生的 JavaScript 程序中，我们直接对 DOM 进行创建和更改，而 DOM 元素通过我们监听的事件和我们的应用程序进行通讯。

而 React 会先将你的代码转换成一个 JavaScript 对象，然后这个 JavaScript 对象再转换成真实 DOM。这个 JavaScript 对象就是所谓的虚拟 DOM。

当我们需要创建或更新元素时， React 首先会让这个 VitrualDom 对象进行创建和更改，然后再将 VitrualDom 对象渲染成真实 DOM。

当我们需要对 DOM 进行事件监听时，首先对 VitrualDom 进行事件监听， VitrualDom 会代理原生的 DOM 事件从而做出响应。

### 为什么 React 组件首字母必须大写？

babel 在编译时会判断 JSX 中组件的首字母，当首字母为小写时，其被认定为原生 DOM 标签， createElement 的第一个变量被编译为字符串；当首字母为大写时，其被认定为自定义组件， createElement 的第一个变量被编译为对象；

### 什么是高阶组件？如何实现？

高阶组件可以看作 React 对装饰模式的一种实现，高阶组件就是一个函数，且该函数接受一个组件作为参数，并返回一个新的组件。

### Hook 有哪些优势？

#### 减少状态逻辑复用的风险

Hook 和 Mixin 在用法上有一定的相似之处，但是 Mixin 引入的逻辑和状态是可以相互覆盖的，而多个 Hook 之间互不影响，这让我们不需要在把一部分精力放在防止避免逻辑复用的冲突上。在不遵守约定的情况下使用 HOC 也有可能带来一定冲突，比如 props 覆盖等等，使用 Hook 则可以避免这些问题。

#### 避免地狱式嵌套

大量使用 HOC 的情况下让我们的代码变得嵌套层级非常深，使用 HOC，我们可以实现扁平式的状态逻辑复用，而避免了大量的组件嵌套。

#### 让组件更容易理解

在使用 class 组件构建我们的程序时，他们各自拥有自己的状态，业务逻辑的复杂使这些组件变得越来越庞大，各个生命周期中会调用越来越多的逻辑，越来越难以维护。使用 Hook，可以让你更大限度的将公用逻辑抽离，将一个组件分割成更小的函数，而不是强制基于生命周期方法进行分割。

#### 使用函数代替 class

相比函数，编写一个 class 可能需要掌握更多的知识，需要注意的点也越多，比如 this 指向、绑定事件等等。另外，计算机理解一个 class 比理解一个函数更快。Hooks 让你可以在 classes 之外使用更多 React 的新特性。
