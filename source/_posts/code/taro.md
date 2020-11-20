---
title: Taro.js
categories: 开发
date: 2019-7-16 10:25:00
tags: 
 - react
 - taro
---
## 初始化项目
### 创建项目
```
使用 npm 安装 CLI
npm install -g @tarojs/cli
OR 使用 yarn 安装 CLI
yarn global add @tarojs/cli

安装指定版本taro
yarn global add @tarojs/cli@1.3.34

更新项目到指定版本
taro update project 2.0.3
更新TaroCLi到指定版本
taro update self 2.0.3

npx直接安装最新版本项目（不建议，会和本地的不兼容）
npx @tarojs/cli init myApp

值得一提的是，如果安装过程出现sass相关的安装错误，请在安装mirror-config-china后重试。
npm install -g mirror-config-china
如果出现使用async方法报错Function则需要安装低版本regenerator-runtime
yarn add regenerator-runtime@0.11.1
```

### 注意

- 1.小程序所有配置文件都在app.jsx
- 2.render中可以使用解构赋值。
- 3.小程序开发会经常报错无法运行，如果找不到文件需要重新退出再打开项目，如果页面展示不正常需要重新打包并退出小程序开发工具重新运行。
- 4.reducer可以合并在一起，没必要那么分散。
- 5.所有小程序中的组件属性如果带-的都转为驼峰命名。
- 6.taro中部分组件生命周期与小程序一致，部分没有需要使用小程序自带的方法。
- 7.async报错[官方文档](https://nervjs.github.io/taro/docs/migrate-to-2.html#%E5%8D%87%E7%BA%A7%E5%B8%B8%E8%A7%81%E9%97%AE%E9%A2%98%E6%95%B4%E7%90%86)

### 修改配置
修改actions文件夹内counter.ts为index.ts
Taro2.0不生成sitemap.json文件,防止小程序报错没有收录文件所以我们自己在根目录生成。
```json
  {
    "rules":[{
      "action": "allow",
      "page": "*"
    }]
  }
```
在config文件夹中的index.js文件中设置别名，并增加sitemap.json自动复制
``` js
  //最顶部引入
  const path = require('path');
  //找到outputRoot在他下面添加路径别名，并copy过去文件
  outputRoot: "dist",
  copy: {
    patterns: [
      {
        from: "sitemap.json",
        to: `dist/sitemap.json`
      }
    ]
  },
  alias: {
    "@": path.resolve(__dirname, "..", "src/"),
    "@img": path.resolve(__dirname, "..", "src/assets/img"),
    "@api": path.resolve(__dirname, "..", "src/utils/api"),
  },
```
修改根目录tsconfig.json文件，让VScode认识我们设置的别名。
```json
 // 在compilerOptions选项中增加
  "paths":{
      "@/*": ["src/*"],
      "@img/*":["src/assets/img/*"],
      "@api*":["src/utils/api/index"],
    }
  // 在对象根部exclude的上面增加引入规则
  "include": ["src/**/*"],
```
### 自动化生成页面
使用Node命令，一行命令生成tsx文件与scss文件，并初始化内容。
根目录新建GenerateTemplate.js文件
```js
const fs = require("fs");
const dirName = titleCase(process.argv[2]);

if (!dirName) {
    console.error("页面或模块名称不能为空");
    process.exit(0);
}

const genType = (process.argv[3]).toLowerCase();
if (genType !== "p" && genType !== "c") {
    console.error("生成类型不能为空");
    process.exit(0);
}

// 页面文件模版
const pageTpl = `
import Taro, { Component, Config } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { ComponentClass } from 'react'
import './index.scss'
import { connect } from '@tarojs/redux'

type PageStateProps = {
  counter: any,
  dispatch: Function,
}
type PageDispatchProps = {
}
type PageOwnProps = {
}
type PageState = {
}
type IProps = PageStateProps & PageDispatchProps & PageOwnProps

interface ${dirName} {
  props: IProps;
 // state: PageState
}
@connect(({ counter }) => ({
  counter
}))
class ${dirName} extends Component {
  config: Config = {
    navigationBarTitleText: '${dirName}页面'
  }
  state:any = {

  }
  componentDidMount() {
    
  }
  render() {
    const { } = this.state;
    const { } = this.props.counter;
    return (
      <View>
      ${dirName}
      </View >
    )
  }
}
export default ${dirName} as ComponentClass<PageOwnProps, PageState>
`;

// 组件文件模版
const compTpl = `
import Taro, { Component, Config, ComponentOptions } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { ComponentClass } from 'react'
import { connect } from '@tarojs/redux'
import './index.scss'

type PageStateProps = {
  counter: any,
  dispatch: Function,
}
type PageDispatchProps = {
}
type PageOwnProps = {
}
type PageState = {
}
type IProps = PageStateProps & PageDispatchProps & PageOwnProps

interface ${dirName} {
  props: IProps;
 // state: PageState
}
const defaultProps = {
    
}
@connect(({ counter }) => ({
  counter
}))
class ${dirName} extends Component {
  static options: ComponentOptions = {
    "addGlobalClass": true
  }
  state:any = {

  }
  componentDidMount() {
    
  }
  render() {
    const { } = this.state;
    const { } = this.props;
    const { } = this.props.counter;
    return (
      <View>
      ${dirName}
      </View >
    )
  }
}
const ${dirName}Class = ${dirName} as ComponentClass<PageOwnProps, PageState>;
${dirName}Class.defaultProps = defaultProps;
export default ${dirName}Class
`;

let parentDir = process.argv[4];
let boo = false;
if (parentDir) {
    parentDir = titleCase(parentDir);
    boo = true;
}

// 创建页面
if (genType === "p") {
    if (boo) {
        if (!fs.existsSync(`./src/pages/${parentDir}`)) {
            fs.mkdirSync(`./src/pages/${parentDir}`);
        }
        fs.mkdirSync(`./src/pages/${parentDir}/${dirName}`);
        process.chdir(`./src/pages/${parentDir}/${dirName}`);
    } else {
        fs.mkdirSync(`./src/pages/${dirName}`);
        process.chdir(`./src/pages/${dirName}`);
    }

    fs.writeFileSync('Index.tsx', pageTpl);
    fs.writeFileSync('Index.scss', '');
}

// 创建组件
if (genType === "c") {
    if (boo) {
        if (!fs.existsSync(`./src/Components/${parentDir}`)) {
            fs.mkdirSync(`./src/Components/${parentDir}`);
        }
        fs.mkdirSync(`./src/Components/${parentDir}/${dirName}`);
        process.chdir(`./src/Components/${parentDir}/${dirName}`);
    } else {
        fs.mkdirSync(`./src/Components/${dirName}`);
        process.chdir(`./src/Components/${dirName}`);
    }

    fs.writeFileSync('Index.tsx', compTpl);
    fs.writeFileSync('Index.scss', '');
}

console.log(`模版${dirName}已创建,请手动至app.tsx文件添加页面路径`);

function titleCase(str) {
    const first = str[0];
    const string = first.toUpperCase() + str.substr(1);
    return string;
}

function insertStr(soure, newStr, start) {
    return soure.slice(0, start) + newStr + soure.slice(start)
}

process.exit(0);
```
在package.json文件内的scripts内增加脚本`"tpl": "node GenerateTemplate"`
运行命令为：`tpl [moduleName] [generateType(c | p)] [rootDir]`
`rootDir`可填可不填,c为组件，p为页面，示例如下：
`yarn run tpl Home p`
## 请求配置
src文件夹内新建文件目录为`utils/api/requst.ts`
``` ts
  import Taro from "@tarojs/taro";

  const baseUrl = "https://www.baidu.com/";
  interface params {
      url: string
      data?: object,
      contentType?: string
  }
  export const baseOptions = async (params: params, method: "GET" | "OPTIONS" | "HEAD" | "POST" | "PUT" | "DELETE" | "TRACE" | "CONNECT" | undefined = "GET") => {
      let { url, data } = params;
      let contentType: string = "application/x-www-form-urlencoded";
      contentType = params.contentType || contentType;
      const option = {
          url: baseUrl + url,
          data: data,
          method: method,
          header: { "content-type": contentType, },
      };
      try {
          const result: any = await Taro.request(option);
          if ("data" in result && result.data.code == 200) {
              return Promise.resolve(result.data.data);
          } else {
              return Promise.reject(result.msg || "请求出错");
          }
      } catch (error) {
          return Promise.reject("请求出错");
      }
  }
  export const get = (url: string, data: object = {}): any => {
      return baseOptions({ url, data });
  }
  export const post = (url: string, data: object, contentType?: string): any => {
      return baseOptions({ url, data, contentType }, "POST");
  }

```
or js version
``` js

import Taro from "@tarojs/taro";

const base = "https://www.easy-mock.com/mock/5ba4bd6191ddb5098ae2c0cd/api";

export default {
  baseOptions(params, method = "GET") {
    let { url, data } = params;
    // let token = getApp().globalData.token
    // if (!token) login()
    let contentType = "application/x-www-form-urlencoded";
    contentType = params.contentType || contentType;
    const option = {
      isShowLoading: false,
      loadingText: "正在加载",
      url: base + url,
      data: data,
      method: method,
      header: { "content-type": contentType, token: token },
      success(res) {
        return res.data;
      },
      error(e) {
        return e;
      }
    };
    return Taro.request(option);
  },
  get(url, data = "") {
    let option = { url, data };
    return this.baseOptions(option);
  },
  post: function(url, data, contentType) {
    let params = { url, data, contentType };
    return this.baseOptions(params, "POST");
  }
};

```
然后在同级新增`index.ts`
```
import { get, post } from './requst'

export const test = (params?: object): any => get("index/getBanners", params);
```
## VScode配置自动重启
按F5打开launch.json文件
```json
  {
      // 使用 IntelliSense 了解相关属性。 
      // 悬停以查看现有属性的描述。
      // 欲了解更多信息，请访问: https://go.microsoft.com/fwlink/?linkid=830387
      "version": "0.2.0",
      "configurations": [
          
          {
              "type": "node",
              "request": "launch",
              "name": "小程序运行",
              "runtimeExecutable": "yarn",
              "runtimeArgs": [
                  "dev:weapp",
              ],
          },

      ]
  }
```
运行时直接按Ctrl+F5来启动项目。

## 表单校验(yup)
[传送门](https://github.com/jquense/yup#yup)
yarn add yup
yarn add  -D @types/yup

``` js
  import * as yup from 'yup'

  <!-- 设置提示文字 必须在最上面 -->
  yup.setLocale({
    mixed: {
      required: '${label}是必填项'
    },
    string: {
      length: '${label}长度为${length}位',
    },
  });
  <!-- 设置数据类型与验证方式添加label 验证函数中直接传入的值直接为报错信息例：required('name不能为空')-->
  this.state.schema = yup.object().shape({
    message: yup.string().required().label("Message"),
    phone: yup.string().label("Phone").length(11),
    title: yup.string().required().label("Title"),
    company: yup.string().required().label("Company"),
    email: yup.string().required().label("Email"),
    name: yup.string().required().label("Name"),
  });
  <!-- 验证数据是否通过，不通过返回错误信息 -->
  this.state.schema.validate(sendData): Promise<any, ValidationError>
  <!-- 验证单独属性是否通过，不通过返回错误信息 验证时同样传入全部数据 常用于输入时判断-->
  schema.validateAt('name', sendData): Promise<any, ValidationError>; 
  <!-- 判断是否通过验证，返回布尔值 -->
  schema.isValid(sendData): Promise<boolean>; 

```