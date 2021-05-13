---
title: 面试题
authorDesc: 豆豆
categories: 开发
date: 2019-6-21 16:41:01
tags: 
 - 资源
---

## HTML
### 浏览器运行机制
1，构建DOM树，将标签转为DOM node（节点，包括js生成的标签）
2，构建渲染树：解析所有的css样式文件信息
3，布局渲染书：从根节点递归调用，计算每一个元素的大小位置给出精确坐标
4，绘制渲染书：遍历渲染树，使用UI层来绘制每个节点。
### 重绘
指一个元素外观的改变所触发的浏览器行为，浏览器会根据元素的新属性进行新属性重新绘制，使元素呈现新的外观。
color，background-color等会触发重绘。
### 重排（重构、回流、reflow）
当渲染树中的一部分或全部因为元素的规模尺寸布局隐藏等改变而需要重新构建，这就成为回流（reflow）。每个页面至少需要一次回流，就是在页面第一次加载的时候。
任何页面布局和几何属性改变都会触发重排。
### 重绘和重排的关系
在回流的时候浏览器会使渲染树中收到影响的部分失效，并重新构造这部分渲染树，完成回流后，浏览器就会重新绘制受影响的部分到屏幕中，该过程称为重绘。
所以，重排必定引发重绘，重绘不一定会引发重排。
### 优化方案
1、直接修改元素的className
2、先设置display:none;然后修改元素，然后在设置display：block；
3、让它脱离文档流
4、创建完dom一次性加入


## React
### React生命周期有哪些
初始化阶段
constructor 构造函数
getDefaultProps props默认值
getInitialState state默认值
挂载阶段
staticgetDerivedStateFromProps(props,state)
render
componentDidMount
getDerivedStateFromProps：组件每次被 rerender的时候，包括在组件构建之后(虚拟 dom之后，实际 dom挂载之前)，每次获取新的 props或 state之后；每次接收新的props之后都会返回一个对象作为新的 state，返回null则说明不需要更新 state；配合 componentDidUpdate，可以覆盖 componentWillReceiveProps的所有用法
更新阶段
staticgetDerivedStateFromProps(props,state)
shouldComponentUpdate
render
getSnapshotBeforeUpdate(prevProps,prevState)
componentDidUpdate
getSnapshotBeforeUpdate：触发时间: update发生的时候，在 render之后，在组件 dom渲染之前；返回一个值，作为 componentDidUpdate的第三个参数；配合 componentDidUpdate, 可以覆盖 componentWillUpdate的所有用法
卸载阶段
componentWillUnmount
错误处理
componentDidCatch
React16新的生命周期弃用了 componentWillMount、componentWillReceivePorps，componentWillUpdate新增了 getDerivedStateFromProps、getSnapshotBeforeUpdate来代替弃用的三个钩子函数。

React16并没有删除这三个钩子函数，但是不能和新增的钩子函数混用， React17将会删除这三个钩子函数，新增了对错误的处理（ componentDidCatch）
### setState是同步的还是异步的？
在 React的生命周期和合成事件中， React仍然处于他的更新机制中，这时无论调用多少次 setState，都会不会立即执行更新，而是将要更新的·存入 _pendingStateQueue，将要更新的组件存入 dirtyComponent。

当上一次更新机制执行完毕，以生命周期为例，所有组件，即最顶层组件 didmount后会将批处理标志设置为 false。这时将取出 dirtyComponent中的组件以及 _pendingStateQueue中的 state进行更新。这样就可以确保组件不会被重新渲染多次。

所以。setState本身并不是异步的，而是 React的批处理机制给人一种异步的假象。

在原生事件中调用 setState并不会出发 React的批处理机制，所以立即能拿到最新结果。
### 为什么有时连续多次setState只有一次生效？
原因就是 React会批处理机制中存储的多个 setState进行合并，
注意， assign函数中对函数做了特殊处理，处理第一个参数传入的是函数，函数的参数 preState是前一次合并后的结果。
### 虚拟Dom比普通Dom更快吗？
直接操作 DOM是非常耗费性能的，这一点毋庸置疑。但是 React使用 VitrualDom也是无法避免操作 DOM的。
如果是首次渲染， VitrualDom不具有任何优势，甚至它要进行更多的计算，消耗更多的内存。
VitrualDom的优势在于 React的 Diff算法和批处理策略， React在页面更新之前，提前计算好了如何进行更新和渲染 DOM。实际上，这个计算过程我们在直接操作 DOM时，也是可以自己判断和实现的，但是一定会耗费非常多的精力和时间，而且往往我们自己做的是不如 React好的。所以，在这个过程中 React帮助我们"提升了性能"。

所以，我更倾向于说， VitrualDom帮助我们提高了开发效率，在重复渲染时它帮助我们计算如何更高效的更新，而不是它比 DOM操作更快。
### React如何实现自己的事件机制？
React事件并没有绑定在真实的 Dom节点上，而是通过事件代理，在最外层的 document上对事件进行统一分发。
组件挂载、更新时：

通过 lastProps、 nextProps判断是否新增、删除事件分别调用事件注册、卸载方法。
调用 EventPluginHub的 enqueuePutListener进行事件存储
获取 document对象。
根据事件名称（如 onClick、 onCaptureClick）判断是进行冒泡还是捕获。
判断是否存在 addEventListener方法，否则使用 attachEvent（兼容IE）。
给 document注册原生事件回调为 dispatchEvent(统一的事件分发机制）。
事件初始化：

EventPluginHub负责管理 React合成事件的 callback，它将 callback存储在 listenerBank中，另外还存储了负责合成事件的 Plugin。
获取绑定事件的元素的唯一标识 key。
将 callback根据事件类型，元素的唯一标识 key存储在 listenerBank中。
listenerBank的结构是： listenerBank[registrationName][key]。
触发事件时：

触发 document注册原生事件的回调 dispatchEvent
获取到触发这个事件最深一级的元素
遍历这个元素的所有父元素，依次对每一级元素进行处理。
构造合成事件。
将每一级的合成事件存储在 eventQueue事件队列中。
遍历 eventQueue。
通过 isPropagationStopped判断当前事件是否执行了阻止冒泡方法。
如果阻止了冒泡，停止遍历，否则通过 executeDispatch执行合成事件。
释放处理完成的事件。
### 为何React事件要自己绑定this？
在上面提到的事件处理流程中， React在 document上进行统一的事件分发， dispatchEvent通过循环调用所有层级的事件来模拟事件冒泡和捕获。

在 React源码中，当具体到某一事件处理函数将要调用时，将调用 invokeGuardedCallback方法。
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
### 原生事件和React事件的区别？
React 事件使用驼峰命名，而不是全部小写。

通过 JSX , 你传递一个函数作为事件处理程序，而不是一个字符串。

在 React 中你不能通过返回 false 来阻止默认行为。必须明确调用 preventDefault。
### React和原生事件的执行顺序是什么？可以混用吗？
React的所有事件都通过 document进行统一分发。当真实 Dom触发事件后冒泡到 document后才会对 React事件进行处理。

所以原生的事件会先执行，然后执行 React合成事件，最后执行真正在 document上挂载的事件

React事件和原生事件最好不要混用。原生事件中如果执行了 stopPropagation方法，则会导致其他 React事件失效。因为所有元素的事件将无法冒泡到 document上，导致所有的 React事件都将无法被触发。。
### 虚拟Dom是什么？
在原生的 JavaScript程序中，我们直接对 DOM进行创建和更改，而 DOM元素通过我们监听的事件和我们的应用程序进行通讯。

而 React会先将你的代码转换成一个 JavaScript对象，然后这个 JavaScript对象再转换成真实 DOM。这个 JavaScript对象就是所谓的虚拟 DOM。

当我们需要创建或更新元素时， React首先会让这个 VitrualDom对象进行创建和更改，然后再将 VitrualDom对象渲染成真实DOM。

当我们需要对 DOM进行事件监听时，首先对 VitrualDom进行事件监听， VitrualDom会代理原生的 DOM事件从而做出响应。
### 为什么React组件首字母必须大写？
babel在编译时会判断 JSX中组件的首字母，当首字母为小写时，其被认定为原生 DOM标签， createElement的第一个变量被编译为字符串；当首字母为大写时，其被认定为自定义组件， createElement的第一个变量被编译为对象；
### 什么是高阶组件？如何实现？
高阶组件可以看作 React对装饰模式的一种实现，高阶组件就是一个函数，且该函数接受一个组件作为参数，并返回一个新的组件。
### Hook有哪些优势？
#### 减少状态逻辑复用的风险

Hook和 Mixin在用法上有一定的相似之处，但是 Mixin引入的逻辑和状态是可以相互覆盖的，而多个 Hook之间互不影响，这让我们不需要在把一部分精力放在防止避免逻辑复用的冲突上。在不遵守约定的情况下使用 HOC也有可能带来一定冲突，比如 props覆盖等等，使用 Hook则可以避免这些问题。

#### 避免地狱式嵌套

大量使用 HOC的情况下让我们的代码变得嵌套层级非常深，使用 HOC，我们可以实现扁平式的状态逻辑复用，而避免了大量的组件嵌套。

#### 让组件更容易理解

在使用 class组件构建我们的程序时，他们各自拥有自己的状态，业务逻辑的复杂使这些组件变得越来越庞大，各个生命周期中会调用越来越多的逻辑，越来越难以维护。使用 Hook，可以让你更大限度的将公用逻辑抽离，将一个组件分割成更小的函数，而不是强制基于生命周期方法进行分割。

#### 使用函数代替class

相比函数，编写一个 class可能需要掌握更多的知识，需要注意的点也越多，比如 this指向、绑定事件等等。另外，计算机理解一个 class比理解一个函数更快。Hooks让你可以在 classes之外使用更多 React的新特性。