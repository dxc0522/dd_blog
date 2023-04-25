---
title: 前端面试八股文
authorDesc: 豆豆
categories: 学习
date: 2019-6-21 16:41:01
updated: 2023-03-29 16:55:00
tags:
  - 面试
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
[手写promise](https://zhuanlan.zhihu.com/p/183801144)

## CSS

### flex

flex-direction 主轴
flex-wrap 换行
flex-flow 是 flex-direction 属性和 flex-wrap 属性的简写形式，默认值为 row nowrap
justify-content 主轴上的对齐方式
align-items 交叉轴上如何对齐
align-content 多根轴线的对齐方式。如果项目只有一根轴线，该属性不起作用。
order 排列顺序。数值越小，排列越靠前，默认为 0。
flex-basis 属性定义了在分配多余空间之前，项目占据的主轴空间（main size）。
flex-grow 属性定义项目的放大比例，默认为 0
flex-shrink 属性定义了项目的缩小比例，默认为 1，即如果空间不足，该项目将缩小。
flex 属性是 flex-grow, flex-shrink 和 flex-basis 的简写，默认值为 0 1 auto。
align-self 属性允许单个项目有与其他项目不一样的对齐方式，可覆盖 align-items 属性。

### position

position: static;默认值。没有定位
position: inherit;继承父元素的 position 值
position: relative;相对定位，相对于自己的初始位置，不脱离文档流。也就是说元素框偏移某个距离，元素仍保持其未定位前的形状，它原本所占的空间仍保留。
position: absolute;绝对定位的元素的位置相对于最近的已定位祖先元素，如果元素没有已定位的祖先元素，那么它的位置相对于最初的包含块。
position: fixed;脱离正常的文档流，固定在屏幕的某个位置，它不会随着浏览器滚动条的滚动而一起滚动。
position: sticky;粘性定位，但在 css 中的表现更像是吸附。这是一个结合了 position:relative 和 position:fixed 两种定位功能于一体的特殊定位。

> 1、须指定 top、right、bottom、left 四个阈值其中之一，才可使粘性定位生效。否则其行为与相对定位相同。
> 并且 top 和 bottom 同时设置时，top 生效的优先级高，left 和 right 同时设置时，left 的优先级高。
> 2、设定为 position:sticky 元素的任意父节点的 overflow 属性必须是 visible，否则 position:sticky 不会生效。如果 position:sticky 元素的任意父节点定位设置为 overflow:hidden，则父容器无法进行滚动，所以 position:sticky 元素也不会有滚动然后固定的情况。如果 position:sticky 元素的任意父节点定位设置为 position:relative | absolute | fixed，则元素相对父元素进行定位，而不会相对 viewport 定位。
> 3、达到设定的阀值，也就是设定了 position:sticky 的元素表现为 relative 还是 fixed 是根据元素是否达到设定了的阈值决定的。

### 水平垂直居中

[传送门](https://juejin.cn/post/7202501888615399480)
[grid 布局](https://juejin.cn/post/6854573220306255880)
父、子元素宽高未知时

1.table-cell（使用表格样式父级 display: table-cell;text-align: center;vertical-align: middle;）
2.flex 布局（父级 justify-content: center 和 align-items: center 即可）
3.absolute + transform（子级定位的上、左为 50%，translate 上、左负 50%）
4.absolute + margin: auto（子级定位的上下左右为 0）
5.Grid 网格布局 (父级 display: grid;子级 align-self: center;justify-self: center;)

子元素固定宽高已知时（假设子元素宽高为 200px）

1.absolute + calc（定位上、左负 50%时减去子元素宽、高）
2.absolute + 负 margin（定位的上、左为 50%，margin 的上、左负子元素的一半）

## HTML

从输入 url 到页面展示发生了什么?
[传送门](https://juejin.cn/post/6869279683230629896)

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

## JS

### 你不知道的 async、await 魔鬼细节

[传送门](https://blog.csdn.net/qq_41581588/article/details/129681857)
async 函数返回值

结论：async 函数在抛出返回值时，会根据返回值类型开启不同数目的微任务

- return 结果值：非 thenable、非 promise（不等待）
- return 结果值：thenable（等待 1 个 then 的时间）
- return 结果值：promise（等待 2 个 then 的时间）

await 右值类型区别

- 接非 thenable 类型，会立即向微任务队列添加一个微任务 then，但不需等待
- 接 thenable 类型，需要等待一个 then 的时间之后执行
- 接 Promise 类型(有确定的返回值)，会立即向微任务队列添加一个微任务 then，但不需等待
  - TC 39 对 await 后面是 promise 的情况如何处理进行了一次修改，移除了额外的两个微任务，在早期版本，依然会等待两个 then 的时

## React

### React 生命周期有哪些

构造函数 constructor
组件将要挂载时触发的函数：componentWillMount
组件挂载完成时触发的函数：componentDidMount
是否要更新数据时触发的函数：shouldComponentUpdate
将要更新数据时触发的函数：componentWillUpdate
数据更新完成时触发的函数：componentDidUpdate
组件将要销毁时触发的函数：componentWillUnmount
父组件中改变了 props 传值时触发的函数：componentWillReceiveProps
错误处理 componentDidCatch

React16 新的生命周期弃用了 componentWillMount、componentWillReceivePorps，componentWillUpdate 新增了 getDerivedStateFromProps、getSnapshotBeforeUpdate 来代替弃用的三个钩子函数。

React16 并没有删除这三个钩子函数，但是不能和新增的钩子函数混用， React17 将会删除这三个钩子函数，新增了对错误的处理（ componentDidCatch）

### setState 是同步的还是异步的？

[传送门](https://juejin.cn/post/7066423854259765279)

setState 既存在异步情况也存在同步情况

1.异步情况 在 React 事件当中是异步操作

2.同步情况 如果是在 setTimeout 事件或者自定义的 dom 事件中，都是同步的

在合成事件 和 生命周期钩子(除 componentDidUpdate) 中，setState 是"异步"的；
在 原生事件 和 setTimeout 中，setState 是同步的，可以马上获取更新后的值；

批量更新：多个顺序的 setState 不是同步地一个一个执行滴，会一个一个加入队列，然后最后一起执行。在 合成事件 和 生命周期钩子 中，setState 更新队列时，存储的是 合并状态(Object.assign)。因此前面设置的 key 值会被后面所覆盖，最终只会执行一次更新。
函数式： setState 第一个参数为函数形式时，在这个函数中可以回调拿到最新的 state 对象，然后函数 return 出的对象讲被设置成 newState

### 虚拟 Dom 比普通 Dom 更快吗？

直接操作 DOM 是非常耗费性能的，这一点毋庸置疑。但是 React 使用 VitrualDom 也是无法避免操作 DOM 的。
如果是首次渲染， VitrualDom 不具有任何优势，甚至它要进行更多的计算，消耗更多的内存。
VitrualDom 的优势在于 React 的 Diff 算法和批处理策略， React 在页面更新之前，提前计算好了如何进行更新和渲染 DOM。实际上，这个计算过程我们在直接操作 DOM 时，也是可以自己判断和实现的，但是一定会耗费非常多的精力和时间，而且往往我们自己做的是不如 React 好的。所以，在这个过程中 React 帮助我们"提升了性能"。

所以，我更倾向于说， VitrualDom 帮助我们提高了开发效率，在重复渲染时它帮助我们计算如何更高效的更新，而不是它比 DOM 操作更快。

### memo、useMemo、useCallBack 的区别

[传送门](https://juejin.cn/post/6844904032113278990)

memo 与 PureComponent 不同的是，React.memo()是一个高阶组件，用于函数组件，通过对前后 props 进行浅比较，如果前后 props 不一致，该组件将重新渲染，反之，不进行渲染，使用缓存中的组件。
useMemo 缓存的结果是回调函数中 return 回来的值，主要用于缓存计算结果的值，应用场景如需要计算的状态
useCallback 缓存的结果是函数，主要用于缓存函数，应用场景如需要缓存的函数，因为函数式组件每次任何一个 state 发生变化，会触发整个组件更新，一些函数是没有必要更新的，此时就应该缓存起来，提高性能，减少对资源的浪费；另外还需要注意的是，useCallback 应该和 React.memo 配套使用，缺了一个都可能导致性能不升反而下降。

### React 事件机制

[React17 事件系统](https://juejin.cn/post/6967738672279994382)
[React17 的变更](https://juejin.cn/post/7212529038875443259)
正常 w3c 事件机制是从根节点开始直接穿梭到我们的目标元素。这个阶段会执行所有捕获阶段的函数， 然后事件流切换到目标阶段，执行自身的事件函数，这时候事件流再沿着相反的方向一直向上执行所有冒泡函数。

> 像这样利用事件的冒泡特性，把多个子元素的同一类型的监听逻辑，合并到父元素上通过一个监听函数来管理的行为，就是事件委托。

React 基于 Virtual DOM 实现了一个 SyntheticEvent 层(合成事件 层)，定义的事件处理器会接收到一个合成事件对象的实例，它符合 W3C 标准，且与原生的浏览器事件拥有同样的接口，支持冒泡机制， 所有的事件都自动绑定在最外层上。
在 React 底层，主要对合成事件做了两件事:
事件委派:React 会把所有的事件绑定到结构的最外层《html》，使用统一的 事件监听器，这个事件监听器上维持了一个映射来保存所有组件内部 事件监听和处理函数。
自动绑定:React 组件中，每个方法的上下文都会指向该组件的实例， 即自动绑定 this 为当前组件。

React17 的改动:
事件绑定到渲染 React 树的根 DOM 容器上, 并去除事件池, 并创建了合成事件,可以通过合成事件去取消原生冒泡或者合成事件冒泡.

#### 为何 React 事件要自己绑定 this？

在上面提到的事件处理流程中， React 在 document 上进行统一的事件分发， dispatchEvent 通过循环调用所有层级的事件来模拟事件冒泡和捕获。

#### 原生事件和 React 事件的区别？

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

[传送门](https://juejin.cn/post/7220677873584734268)
高阶组件可以看作 React 对装饰模式的一种实现，高阶组件就是一个函数，且该函数接受一个组件作为参数，并返回一个新的组件。

#### 减少状态逻辑复用的风险

Hook 和 Mixin 在用法上有一定的相似之处，但是 Mixin 引入的逻辑和状态是可以相互覆盖的，而多个 Hook 之间互不影响，这让我们不需要在把一部分精力放在防止避免逻辑复用的冲突上。在不遵守约定的情况下使用 HOC 也有可能带来一定冲突，比如 props 覆盖等等，使用 Hook 则可以避免这些问题。

#### 让组件更容易理解

在使用 class 组件构建我们的程序时，他们各自拥有自己的状态，业务逻辑的复杂使这些组件变得越来越庞大，各个生命周期中会调用越来越多的逻辑，越来越难以维护。使用 Hook，可以让你更大限度的将公用逻辑抽离，将一个组件分割成更小的函数，而不是强制基于生命周期方法进行分割。

#### 使用函数代替 class

相比函数，编写一个 class 可能需要掌握更多的知识，需要注意的点也越多，比如 this 指向、绑定事件等等。另外，计算机理解一个 class 比理解一个函数更快。Hooks 让你可以在 classes 之外使用更多 React 的新特性。

```flow
st=>start: 用户登陆
op=>operation: 登陆操作
cond=>condition: 登陆成功 Yes or No?
e=>end: 进入后台

st->op->cond
cond(yes)->e
cond(no)->op
```
