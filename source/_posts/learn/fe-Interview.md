---
title: 前端面试题
categories: 学习
date: 2019-6-21 16:41:01
updated: 2023-03-31 11:42:00
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

## 源码
### vue2 

[VUE2 源码解析](https://zhuanlan.zhihu.com/p/419896443)

#### new Vue 初始化

new Vue 实例会执行\_init 方法，首先合并全局 api 混入内容，然后触发 beforeCreate 回调函数，接着初始化状态，props，methods，data，computed，watch，初始化成功后调用 created 回调函数，最后 vm.$mount(vm.$options.el)挂载函数。

挂载$mount函数内把用户传入的el挂载在$el，优先看有没有 render 函数如果有直接用，如果没有 render 函数就看有没有 template 模板有的话转为 render 函数，如果都没有就直接获取 el 的 outerHTML 作为渲染模板，最后调用 mount 方法渲染页面。

渲染函数 mountComponent 内，渲染之前调用 beforeMount 生命周期，生成一个渲染 watcher 每次页面依赖的数据更新后会调用 updateComponent 用来得到 Vnode 渲染真实 dom。渲染真实 dom 结束后调用 mounted 生命周期

创建节点 createElm 函数内，首先查看元素 tag 是不是组件，如果是组件就创建组件，如果有子节点递归渲染子节点并给父元素插入子元素。

#### 双向数据绑定原理

[核心模块](https://segmentfault.com/a/1190000008377887)

核心是 Object.defineProperty() 方法，vue 双向绑定内部核心就是利用了两个类， Dep 类和 watcher 类。每个在页面上使用了的属性、数组、对象都会有一个 Dep 类，访问属性的时候 get 方法会收集对应的 watcher

同样渲染 watcher 也会收集对应的 Dep

vue 内部实现双向绑定过程：`简单来说就是初始化 data 的时候会调用 observe 方法给，data 里的属性重写 get 方法和 set 方法，到渲染真实 dom 的时，渲染 watcher 会去访问页面上使用的属性变量，给属性的 Dep 都加上渲染函数，每次修改数据时通知渲染 watcher 更新视图`

Observer: 数据的观察者，让数据对象的读写操作都处于自己的监管之下

Watcher: 数据的订阅者，数据的变化会通知到 Watcher，然后由 Watcher 进行相应的操作，例如更新视图

Dep: Observer 与 Watcher 的纽带，当数据变化时，会被 Observer 观察到，然后由 Dep 通知到 Watcher

{% image https://cdn.cbd.int/dd_blog_assets@1.0.0/img/Interview/Vue.png %}

Observe 中创建 Dep 实例然后使用 Object.defineProperty 定义监听`__ob__`属性的 this 内容，然后如果是数组则重写方法后再尝试监听。递归监听会使用 defineProperty 方法监听对象属性，创建 Dep 实例后，函数中的 Object.defineProperty 会再 get 方法内添加判断，渲染的期间给每个放在页面上的变量添加 watcher，因为只有渲染阶段才会 Dep.target ，有正常访问 target 是没有的，如果有 Dep.target 则添加 watcher 监听。set 方法内在修改后调用 observe，更新数组或者对象的时候也要创建一个新的 dep 给 childDep。并调用 dep 的 notify 方法通知 watcher 更新视图。

#### 监听数组变化

该数组是响应式的时候，重写所有数组原生方法，重点！每个响应式数组上都会有一个 **ob** 利用我们保留的 **ob** 属性获取 notify 方法更新视图。

#### Watch 监听的实现

核心也是利用 watcher 和 dep 两个类来实现的。区别就是这次 watcher 保留的是用户传入的 watch 回调函数，依然创建 Watcher 实例，传入参数的 user 设置为 true 标识是用户 watch，就会在参数修改时触发的 watch 函数中判断 user 是否为 true 调用 this.cb.call(this.vm, newValue, oldValue)触发回调。

#### computed 实现

创建 Watcher lazy:true 默认不执行 ，看是否需要重新计算，computed 是有缓存的。
重点：计算属性方法内部变量的 Dep 上会有两个 watcher 分别是是计算属性 wathcer 和渲染 watcher，计算属性 watcher 的作用只需要控制是否需要重新计算，跟着调用依赖的渲染 watcher 重新计算属性。

#### nextTick 原理

vue 用异步队列的方式来控制 DOM 更新和 nextTick 回调先后执行

micro-task 因为其高优先级特性，能确保队列中的微任务在一次事件循环前被执行完毕

因为兼容性问题，vue 不得不做了 microtask 向 macrotask 的降级方案。

#### Vue.extend 原理

简单来说就是基于 Vue 构造函数，创建一个子类，然后继承父类的参数和方法，最后再返回这个子类，每个子组件都是一个 Sub 构造函数。子组件创建流程和 new Vue 初始化流程 区别不大。
每一个组件实例都有一个唯一的 cid ，防止重复安装。

子组件创建过程中没有 el ，vue 渲染组件的时候内部自动调用 child.$mount(undefined) 不会挂载到页面上，而是放在 vnode.componentInstance.el 上，通过父组件压入到页面上。

### vue3 

[VUE3 mini-vue 仓库](https://github.com/cuixiaorui/mini-vue)

#### 为什么要升级到 Vue3

更小：所有 Runtime: 22.5kb(vue2 为 32kb)。
更快：SSR 速度提高了 2 ~ 3 倍，初始渲染/更新最高可提速一倍。
更优：update 性能提高 1.3 ~ 2 倍，内存占用减小了一半。
更易：更好的 TypeScript 支持，更多友好特性和检测。

#### Vue3 有哪些新特性

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

#### 响应式原理

reactive：将「引用类型」数据转换为「响应式」数据；
ref： 可将基本类型和引用类型都变成响应式，通过监听类的 value 属性的 get 和 set 实现，但是当传入的值为引用类型时实际上内部还是使用 reactive 方法进行的处理。
ref 经修改实现方式后性能更高，推荐使用 ref 一把梭。

ref 方法会 new 一个类 返回的是一个 RefImpl 实例，这个类监听了 value 属性的 get 和 set ，实现了在 get 中收集依赖，在 set 中触发依赖，而如果需要对传入参数深层监听的话，就会调用 reactive 方法。

reactive 方法实际调用的是 createReactiveObject，调用 Proxy 代理 target，使用一个 targetMap 全局 WeakMap 实例来存储依赖。

### vuex 

[vuex 源码](https://juejin.cn/post/6844903507057704974)

#### 安装

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

### React

#### React 优化

react 的默认做法是调用所有组件的 render，再对生成的虚拟 DOM 进行对比（黄色部分），如不变则不进行更新. 应该避免不必要的 render 行为, 使用 memo,PureComponent,shouldComponentUpdate 等方法.

避免使用内联函数重复创建
使用 fragement(空标签)作为根标签

#### fiber

在 React 中，Fiber 就是 React 16 实现的一套新的更新机制，让 React 的更新过程变得可控，避免了之前采用递归需要一气呵成影响性能的做法。
每个元素都会有一个 fiber 对象对应。这些 fiber 对象之间相互关联，构成了 fiber tree。
react fiber 的更新过程是碎片化的，一次更新会分为 n 个任务片。每个片执行完成后就会吧控制权交给调度器。
调度器会查看浏览器是否有级别更高的任务（比如：alert，onclick，等），如果有执行这个高级别任务，如果没有继续执行 fiber 更新。这个功能是基于 requestIdleCallback 实现的。
这样以来你就不用担心浏览器会卡死现象。

#### 事件机制

React 基于虚拟 dom 实现了一个合成事件层,定义的事件处理器会接收到一个合成事件对象的实例，它符合 W3C 标准，且与原生的浏览器事件拥有同样的接口，支持冒泡机制， 所有的事件都自动绑定在最外层上。

主要对合成事件做了两件事:
事件委派:React 会把所有的事件绑定到结构的最外层，使用统一的 事件监听器，这个事件监听器上维持了一个映射来保存所有组件内部 事件监听和处理函数。
自动绑定:React 组件中，每个方法的上下文都会指向该组件的实例， 即自动绑定 this 为当前组件。

#### 高阶组件

是 React 中用于复用组件逻辑的一种高级技巧。它是一种基于 React 的组合特性而 形成的设计模式。接受一个组件和额外的参 数(如果需要)，返回一个新的组件。HOC 是纯函数，没有副作用。

优点∶ 逻辑服用、不影响被包裹组件的内部逻辑。
缺点∶ hoc 传递给被包裹组件的 props 容易和被包裹后的组件重名， 进而被覆盖

