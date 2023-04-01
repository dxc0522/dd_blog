---
title: NPM包开发
categories: 开发
date: 2021-6-11 13:36:00
tags:
  - NPM
---

## 相关资料

[eslint 文档](https://cn.eslint.org/docs/user-guide/configuring#extending-configuration-files)

## 规范

一般来说根目录下会存在这么几个文件夹：

packages: 多组件源文件
src：源码源文件入口文件。
lib：打包后的插件
node_modules：npm 依赖文件。
bin：二进制可执行文件。
tests：单元测试或集成测试文件。
docs：文档、开发手册。
examples：示例代码或项目。

至于 npm publish 出来的文件包含上述哪些，你即可以在 package.json 的 files 里配置包含哪些，也可以在 .npmignore 里配置忽略哪些。

## 须知

package.json 字段
以下是和发布到 npm 有密切关系的字段(但不仅限于这些字段)

name：库的名字。
version：库的版本号，发布的时候读取的就是这个字段。
main: 指定默认文件
author：库作者，会在 npm 网站库首页显示。
license：开源证书，会在 npm 网站库首页显示。
repository：代码库地址，会在 npm 网站库首页显示。
homepage：库的主页地址，会在 npm 网站库首页显示。
dependencies：你的库依赖的其他库，在开发者 install 你的库的时候会一并下载。

```json
{
	"name": "@bzvue/beizeng-ui", // 库的名字
	"version": "0.0.7", // 库的版本号，发布的时候读取的就是这个字段 每次发布版本号必须更新
	"main": "lib/index.common.min.js", //指定默认文件
	"author": "doudou", //库作者，会在 npm 网站库首页显示。
	"files": [
		// 发布时上传的文件或文件夹
		"lib"
	],
	"keywords": [
		// 关键词
		"vue",
		"components"
	],
	"scripts": {
		"dev": "vue-cli-service serve",
		"lint": "vue-cli-service lint --fix",
		"build:lib": "webpack --config ./build/webpack.common.js"
	},
	"dependencies": {
		"core-js": "^3.6.5",
		"vue": "^2.6.11"
	},
	"devDependencies": {
		"webpack": "^4.14.0",
		"webpack-cli": "^4.9.1"
	}
}
```

## 私有仓库

scoped 库
如果你的库是公开库，则直接 npm publish 就可以了（对了 publish 前记得 login 噢~）。

如果你的库名是 @name/subname，说明你的库是 scoped，那么你还要做这些事情：

1. 登录到 npm 网站，建立一个 @name 的组织：https://www.npmjs.com/org/create （填写 organization name 的时候 @ 符号不用填），付费还是公开按需自己的需要。首次发布，如果不先建立，是发不上去的，会报 Scope not found。

2. 如果你的库名是 @name/subname，且按公开库发布，在运行 npm 发布命令时要加参数：npm publis --access public

3. 第二步中如果不加参数，请在 package.json 中加上如下字段：

{
"publishConfig": {
"access": "public"
}
}
