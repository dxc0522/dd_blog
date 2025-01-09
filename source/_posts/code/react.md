---
title: 搭建React项目
categories: 开发
date: 2019-6-25 11:21:00
tags: 
 - React
 - 前端
---
## 创建项目
自行配置node环境
npx create-react-app project-name
先使用git保存本地文件
再yarn eject 开启配置模式
如果需要sass就安装node-sass
## 根路径设置
### 未使用react-app-rewired
webpack.config.js中
```  javascript
  alias: {
    'react-native': 'react-native-web',
    "@": path.resolve('src'),//新增根路径设置
  },
```
### 使用react-app-rewired
根目录新建config-overrides.js文件
``` javascript
  const {
    override,
    fixBabelImports,
    addWebpackAlias,
    addPostcssPlugins,
    disableEsLint
  } = require("customize-cra");
  const path = require("path");

  const postcssAspectRatioMini = require("postcss-aspect-ratio-mini");
  const postcssPxToViewport = require("postcss-px-to-viewport");
  const postcssWriteSvg = require("postcss-write-svg");
  const postcssCssnext = require("postcss-cssnext");
  const cssnano = require("cssnano");

  module.exports = override(
    disableEsLint(),//关闭eslint
    fixBabelImports("import", {
      libraryName: "antd-mobile",
      style: true
    }),//引入ant
    addWebpackAlias({
      "@": path.resolve("src") //新增根路径设置
    }),
    addPostcssPlugins([
      postcssAspectRatioMini({}), // 用来处理元素容器宽高比
      postcssWriteSvg({
        // 用来处理移动端1px的解决方案
        utf8: false
      }),
      postcssCssnext({}), // 让项目使用CSS未来特性 并对其做兼容性处理
      postcssPxToViewport({
        viewportWidth: 750, // 视窗的宽度，对应我们设计稿的宽度，一般是750
        viewportHeight: 1334, // 视窗的高度，根据750设备的宽度来指定，一般指定1334，也可以不配置
        unitPrecision: 3, // 指定'px'转换为视窗单位值得小数位数（很多时候无法整除）
        viewportUnit: "vw", // 指定需要转换成的视窗单位,建议使用vw
        selectorBlackList: [".ignore", ".hairliness",".am"], // 指定不转换为视窗单位的类，可以自定义，可以无限添加,建议定义一至两个通用的类名
        minPixelValue: 1, // 小于或等于`1px`不转换为视窗单位，你也可以设置为你想要的值。
        mediaQuery: false // 允许在媒体查询中转换`px`
      }),
      cssnano({
        // 压缩和清理CSS代码
        autoprefixer: false,
        "postcss-zindex": false
      })
    ])
  );
```
## 配置路由
yarn add react-router-dom
src根路径新建router.js配置页面路由
然后在 app.js引入并替换<App/>
```	javascript
  import React, { Component } from 'react'
  import { BrowserRouter, Switch, Route } from 'react-router-dom'
  import home from './pages/home/index'
  import person from './pages/person/index'

  export default class RouterConfig extends Component {
    render() {
      return (
      <BrowserRouter>
        <Switch>
          <Route path="/" exact component={home} />
          <Route path="/person" component={person} />
        </Switch>
      </BrowserRouter>
      )
    }
  }
```
```	javascript
  import React from 'react';
  import RouterConfig from './router'
  function App() {
    return (
      <RouterConfig />
    );
  }
  export default App;
```
## 配置redux
yarn add redux redux-thunk react-redux
在src中新建store目录,若分组开发则拆分reducer，根目录中组合各个reducer，若合并则直接在根目录中写入所有文件。
### 配置redux
```	javascript
  import {createStore,applyMiddleware,compose,} from 'redux';
  import thunk from 'redux-thunk'
  import rootReducer from './reducers';
  // 定义浏览器方法（判断了是否是开发模式，否则不展示redux）
  const composeEnhancers =
  typeof window === 'object' &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ && (process.env.NODE_ENV === "development") ?
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({}) : compose;

  const enhancer = composeEnhancers(
  applyMiddleware(thunk),
  );
  export default createStore(
  rootReducer,
  enhancer,
  );
```
```	javascript
  # 不合并reducer的写法
  const defaultState={
  inputVal:"哈哈",
  list:[1,2,3,"呼呼"]
  };
  export default (state=defaultState,action)=>{


    return state
  }
  # 合并reducer的写法
  import { combineReducers } from "redux";
  import home from '../pages/home/store'
  import person from '../pages/person/store'
  export default combineReducers({
    home,
    person
  })
```
``` javascript
  export default{
    ADD_LIST:"add_list",
  }

```
``` javascript
  import ActionTypes from './actionTypes'
  export default {
    getAddItemAction: value => ({
      type: ActionTypes.ADD_LIST,
      value
    }),
    getTodoList: () => {
      return (dispatch) => {
        ajax("api/list").then(res => {
          const action=creators.initListAction(res.data)//定义action
          dispatch(action)
        }, err => {
          console.log(err)
        })
      }
    }
  }
```
###  组件内使用redux
修改配置根目录的index.js
``` javascript
  import {Provider} from 'react-redux'
  import store from './store'
  const App=(
  <Provider store={store}>
  <Index />
  </Provider>
  )
  ReactDOM.render(App, document.getElementById('root'));
```
  组件内调用redux
``` javascript
  import {connect} from 'react-redux'
  import actions from '@/store/actionCreators'
  const mapStateToProps=(state)=>{
    return{
      list:state.list
    }
  }
  const mapDispatchToProps=(dispatch)=>{
    return{
      handleChange(e){
        const action =actions.getAddItemAction(e)
        dispatch(action)
      }
    }
  }
  // 通过这个方法链接TodoList跟store
  export default connect(mapStateToProps,mapDispatchToProps)(TodoList)
```
## 引入ant
- yarn add antd react-app-rewired customize-cra babel-plugin-import
- yarn add antd-mobile react-app-rewired customize-cra babel-plugin-import

``` javascript
  "scripts": {
  -   "start": "react-scripts start",
  +   "start": "react-app-rewired start",
  -   "build": "react-scripts build",
  +   "build": "react-app-rewired build",
  -   "test": "react-scripts test",
  +   "test": "react-app-rewired test",
  }
```
然后在项目根目录创建一个 config-overrides.js 用于修改默认配置。
``` javascript
  const { override, fixBabelImports } = require('customize-cra');
  module.exports = override(
    fixBabelImports('import', {
      libraryName: 'antd',
      libraryDirectory: 'es',
      style: true,
    }),
  );
```
## React-Bootstrap
### 开始
[官网传送](https://react-bootstrap.netlify.com/getting-started/introduction/)

![Small Picture](https://cdn.cbd.int/dd_blog_assets@2.0.1/img/Bootstrap.png)
### 安装

yarn add react-bootstrap bootstrap
在index.js/App.js中引入css
import 'bootstrap/dist/css/bootstrap.min.css';

### 使用

#### 基本使用

``` js
import { Button } from 'react-bootstrap';
```

#### 隐藏class

hidden  属性即为隐藏
d-xl-block   class用于在合适屏幕展示
d-xl-none   class用于在合适屏幕隐藏

## 引入immuteble
### immuteble相关API
  -	 fromJS(将对象转为immutable对象)
  -	 toJS(将immutable对象转为js对象)
  -	 get(获取对象值使用get方法)
  -	 set(传入需要更改的值和更改后的内容)
  -	 getIn(按照数组的顺序去取值)
  -	 merge(改变多个值merge)

### 使用immuteble
  yarn add redux-immutable
  在全局的reducer文件中更改引入方法combineReducers,不但redux有该插件也有，这样全局的都是immutable对象。
  import { combineReducers } from "redux-immutable";
``` javascript
  import {combineReducers} from 'redux-immutable'
  import {reducer as headerReducer} from '../common/header/store'
  const reducer=combineReducers({
      header:headerReducer
  });
  export default reducer;
```

### 使用方法

``` javascript
  // 因为值已经是immutable对象 ，如果想获取对象值使用get方法。
  state.header.get("inputFocus")
  //或者
  state.getIn(["header","inputFocus"])按照数组的顺序去取值
  //更改需要使用方法set并传入需要更改的值和更改后的内容，immuteble会结合之前的值和更改的值返回一个全新的对象并不会更改之前的数据。
  state.set("inputFocus",action.value)
  state.set("list", action.value).set("totalPage", action.totalPage)
  //或者改变多个值merge
  state.merge({
    list:action.value,
    totalPage:action.totalPage
  })
  //注意，该方法会将数据中的对象等改为普通数组。需要将里面的数据同样改成immuteble对象类型。

```
## 配置路由守卫
### 配置路由结构
```javascript
  import React from "react";
  import { BrowserRouter, Switch, HashRouter } from "react-router-dom";
  import renderRoutesMap from "./renderRoutesMap";
  import routerConfig from "./routerConfig";
  // /**
  //  * renderRoutes 渲染路由
  //  * @param  {array}      routes              路由列表
  //  * @param  {object}     extraProps  = {}    extra的属性
  //  * @param  {object}     switchProps = {}    switch的属性
  //  */
  const renderRoutes = ({ routes, extraProps = {}, switchProps = {} }) => (
    <HashRouter>
      <Switch {...switchProps}>{renderRoutesMap(routes)}</Switch>
    </HashRouter>
  );

  // export default renderRoutes

  //index.js
  const router = () =>
    renderRoutes({
      routes: routerConfig
    });
  export default router;
```
### 配置路由路径
``` javascript
  const routes = [
    {
      path: "/home",
      component: "home",//都是路径名称并不是路径，结合真实路径写
      authorization: true//是否需要权限
    },
    {
      path: "/person",
      component: "person"
    },
    {
      path: "/edt",
      component: "person/edt"
    },
    {
      // path: "/",//path写/或不写都会是默认路由
      component: "load" //若想没有404页面直接指向首页则将页面直接写home
    }
  ];
  export default routes;
```
### 配置路由高级组件
```javascript
  import RouterGuard from "./routerGuard";
  import React from "react";
  import { Route } from "react-router-dom";
  const renderRoutesMap = routes =>
    routes.map((route, index) => {
      return (
        <Route
          key={index}
          path={route.path}
          extra={route.extra}
          render={props => <RouterGuard {...route} {...props} />}
        />
      );
    });

export default renderRoutesMap;
```
### 配置路由的渲染封装（重要）
```javascript
  import React, { Component } from "react";
  import { withRouter } from "react-router-dom";
  import Loadable from "react-loadable";//动态加载页面可减小初始渲染大小
  import { connect } from "react-redux";
  import renderRoutesMap from "./renderRoutesMap";

  const mapStateToProps = state => state;
  const mapDispatchToProps = dispatch => ({ ...dispatch });

  class RouterGuard extends Component {
    constructor(props) {
      super(props);
    }
    componentWillMount() {
      let {
        history: { replace },
        authorization, //登录权限
        location
      } = this.props;
      if (authorization) replace("/person");//权限在此处判断
      if (location.pathname === "/") {//默认路由在此处判断并自动重定向
        replace("/home");
      }
      console.log("路由跳转前的拦截", this.props);
    }
    render() {
      let { component, routes = [] } = this.props;
      console.log("准备渲染compoent前", this.props);
      const LoadableComponent = Loadable({
        loader: () => import(`../pages/${component}/index`),
        loading: () => <span>11111</span>//页面加载前的加载页面
      });
      return (
        <div>
          <LoadableComponent {...this.props} />
          {renderRoutesMap(routes)}
        </div>
      );
    }
  }

  export default withRouter(
    connect(
      mapStateToProps,
      mapDispatchToProps
    )(RouterGuard)
  );
```

## React-Hooks
hooks的目的就是让你不再写class，让function一统江湖。
useState是react自带的一个hook函数，它的作用是用来声明状态变量。

那我们从三个方面来看useState的用法，分别是声明、读取、使用（修改）。这三个方面掌握了，你基本也就会使用useState了.

React Hooks不能出现在条件判断语句中，因为它必须有完全一样的渲染顺序。
### state定义
useState中传的值为默认值；
```javascript
import React, { useState } from 'react';
function Example2(){
    const [ age , setAge ] = useState(18)
    const [ sex , setSex ] = useState('男')
    const [ work , setWork ] = useState('前端程序员')
    return (
        <div>
            <p>JSPang 今年:{age}岁</p>
            <p>性别:{sex}</p>
            <p>工作是:{work}</p>

        </div>
    )
}
export default Example2;
```
### useEffect代替生命周期
学习React Hooks 时，我们要改掉生命周期函数的概念（人往往有先入为主的毛病，所以很难改掉），因为Hooks叫它副作用，所以componentWillUnmount也可以理解成解绑副作用。
#### componentDidMonut和componentDidUpdate
第一次组件渲染和每次组件更新都会执行这个函数。
```javascript
import React, { useState , useEffect } from 'react';
function Example(){
    const [ count , setCount ] = useState(0);
    //---关键代码---------start-------
    useEffect(()=>{
        console.log(`useEffect=>You clicked ${count} times`)
    })
    //---关键代码---------end-------

    return (
        <div>
            <p>You clicked {count} times</p>
            <button onClick={()=>{setCount(count+1)}}>click me</button>
        </div>
    )
}
export default Example;
```
注意：
React首次渲染和之后的每次渲染都会调用一遍useEffect函数，而之前我们要用两个生命周期函数分别表示首次渲染(componentDidMonut)和更新导致的重新渲染(componentDidUpdate)。

useEffect中定义的函数的执行不会阻碍浏览器更新视图，也就是说这些函数时异步执行的，而componentDidMonut和componentDidUpdate中的代码都是同步执行的。个人认为这个有好处也有坏处吧，比如我们要根据页面的大小，然后绘制当前弹出窗口的大小，如果时异步的就不好操作了。

#### componentWillUnmount解绑实现
return的函数即为解绑函数
```javascript
  function Index() {
    useEffect(()=>{
        console.log('useEffect=>老弟你来了！Index页面')
        return ()=>{
            console.log('老弟，你走了!Index页面')
        }
    })
    return <h2>JSPang.com</h2>;
  }

```
那到底要如何实现类似componentWillUnmount的效果那?这就需要请出useEffect的第二个参数，它是一个数组，数组中可以写入很多状态对应的变量，意思是当状态值发生变化时，我们才进行解绑。但是当传空数组[]时，就是当组件将被销毁时才进行解绑，这也就实现了componentWillUnmount的生命周期函数。
```javascript
function Index() {
    useEffect(()=>{
        console.log('useEffect=>老弟你来了！Index页面')
        return ()=>{
            console.log('老弟，你走了!Index页面')
        }
    },[])
    return <h2>JSPang.com</h2>;
}
```
但是如果我们想每次count发生变化，我们都进行解绑，只需要在第二个参数的数组里加入count变量就可以了。
```javascript
function Example(){
    const [ count , setCount ] = useState(0);

    useEffect(()=>{
        console.log(`useEffect=>You clicked ${count} times`)

        return ()=>{
            console.log('====================')
        }
    },[count])

    return (
        <div>
            <p>You clicked {count} times</p>
            <button onClick={()=>{setCount(count+1)}}>click me</button>

            <Router>
                <ul>
                    <li> <Link to="/">首页</Link> </li>
                    <li><Link to="/list/">列表</Link> </li>
                </ul>
                <Route path="/" exact component={Index} />
                <Route path="/list/" component={List} />
            </Router>
        </div>
    )
}
```
#### 实现props
在用类声明组件时，父子组件的传值是通过组件属性和props进行的，那现在使用方法(Function)来声明组件，已经没有了constructor构造函数也就没有了props的接收，那父子组件的传值就成了一个问题。React Hooks 为我们准备了useContext。这节课就学习一下useContext，它可以帮助我们跨越组件层级直接传递变量，实现共享。需要注意的是useContext和redux的作用是不同的，一个解决的是组件之间值传递的问题，一个是应用中统一管理状态的问题，但通过和useReducer的配合使用，可以实现类似Redux的作用。

#### 暂时不学了，感觉没啥大的作用只是换个方式写组件

## 代理

  package.json文件中顶部增加
  "proxy": "http://baidu.com",
  仅写域名就可，会代理到该域名。
## 打包
  如果是部署在后台服务除react-router的配置外还需要设置根路径为当前路径，package.json文件中顶部增加：
  "homepage": ".",