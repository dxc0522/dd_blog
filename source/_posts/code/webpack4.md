---
title: webpack4打包
categories: 开发
date: 2021-12-17 17:57:00
tags:
  - 前端
  - webpack
  - node
---

因打包需要 vue2 所以用的 [webpack4](http://webpack.html.cn/concepts/module-resolution.html) 打包配置

## 依赖安装

`npm i -D webpack@4.14.0 webpack-cli@4.9.1`

## 配置文件分析

[externals 外部扩展](https://www.tangshuang.net/3343.html)
[element-ui 配置参考](https://github.com/ElemeFE/element/blob/dev/build/config.js)

```webpack.common.js
const path = require("path");
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

const resolve = (dir) => {
    return path.join(__dirname, dir)
}

module.exports={
    mode: 'production', // 指定是本地开发还是线上环境
    entry:'path/a'|[{a:'page/*/1'},{b:'page/*/2'}], // 入口js文件 一个或多个都行
    output:{ // 导出配置
        path: path.resolve(process.cwd(), './lib'), // 导出路径设置
        filename: '[name].js', //多个的时候可以设置name为文件名
        chunkFilename: '[id].js',
        libraryExport: 'default',
        libraryTarget: 'commonjs2'
    },
    resolve: { //模块解析
        extensions: ['.js', '.vue', '.json'], //解析那些文件
        alias: {//设置路径别名
            "~": resolve("../"),
        },
        modules: ['node_modules'] // 指定模块文件夹名称
    },
    externals: { // 将依赖包通过外部引用形式加载进来，减小包体积
        vue: 'vue',
    },
    performance: { // 性能关闭提示
        hints: false
    },
    stats: 'none', // 统计，不显示统计信息
    optimization: {  // 不压缩代码
        minimize: false
    },
    module: { // 解析不同的文件内容
        rules: [
            {
                test: /\.(jsx?|babel|es6)$/,
                include: process.cwd(),
                // exclude: config.jsexclude,// 排除指定文件
                loader: 'babel-loader'
            },
        ]
    },
    plugins: [ //以各种方式自定义webpack构建过程
        new UglifyJsPlugin({ // 压缩插件
            parallel: true,
            sourceMap: false
        }),
        new BundleAnalyzerPlugin({ //分析包大小占比插件
            analyzerPort: 8081
        })
    ]
}
```
