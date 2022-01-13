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

[externals 外部扩展](https://www.tangshuang.net/3343.html) [element-ui 配置参考](https://github.com/ElemeFE/element/blob/dev/build/config.js)

```config.js

const path = require("path");
var fs = require('fs');
var nodeExternals = require('webpack-node-externals');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

const resolve = (dir) => {
    return path.join(__dirname, dir)
},
    fileNameTag = process.env.NODE_ENV == 'prod' ? '.min' : '';
const packagesList = fs.readdirSync(path.resolve(__dirname, '../packages')),
    ComponentsList = {}, externals = {};
packagesList.forEach(i => {
    ComponentsList[i] = `~/packages/${i}/index.js`
    externals[`~/packages/${i}`] = `./${i}${fileNameTag}`;
})
exports.ComponentsList = ComponentsList;
exports.externals = [Object.assign({
    vue: 'vue',
    'element-ui': 'element-ui',
}, externals), nodeExternals()];

exports.alias = {
    "~": resolve("../"),
    "@": resolve("../examples"),
    "main": resolve("../src"),
    packages: resolve("../packages"),
}
const plugins = []

if (process.env.NODE_ENV == 'prod') {
    plugins.push(new UglifyJsPlugin({
        parallel: true,
        sourceMap: false
    }))
} else {
    plugins.push(new BundleAnalyzerPlugin({
        analyzerPort: 8081
    }))
}
exports.plugins = plugins

exports.filename = `[name]${fileNameTag}.js`

```

```webpack.common.js
const path = require('path');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const webpack = require('webpack');
const chalk = require('chalk');
const packageJSON = require('../package.json');
const config = require('./config');
const webpackConfig = {
    mode: 'production',
    entry: Object.assign(config.ComponentsList, {
        "index.common": "~/src/index.js",
    }),
    output: {
        path: path.resolve(process.cwd(), './lib'),
        // publicPath: '/dist/',
        filename: config.filename,
        chunkFilename: '[id].js',
        libraryExport: 'default',
        libraryTarget: 'commonjs2'
    },
    resolve: {
        extensions: ['.js', '.vue', '.json'],
        alias: config.alias,
        modules: ['node_modules']
    },
    externals: config.externals,
    performance: {
        hints: false
    },
    stats: 'none',
    optimization: {
        minimize: false
    },
    module: {
        rules: [
            {
                test: /\.(jsx?|babel|es6)$/,
                include: process.cwd(),
                // exclude: config.jsexclude,
                loader: 'babel-loader'
            },
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                options: {
                    compilerOptions: {
                        preserveWhitespace: false
                    }
                }
            },
            {
                test: /\.css$/,
                loaders: ['style-loader', 'css-loader']
            },
            {
                test: /\.s[ac]ss$/i,
                loaders: [
                    // Creates `style` nodes from JS strings
                    "style-loader",
                    // Translates CSS into CommonJS
                    "css-loader",
                    // Compiles Sass to CSS
                    "sass-loader",
                ],
            },
            {
                test: /\.(svg|otf|ttf|woff2?|eot|gif|png|jpe?g)(\?\S*)?$/,
                loader: 'url-loader',
                query: {
                    limit: 10000,
                    name: path.posix.join('static', '[name].[hash:7].[ext]')
                }
            }
        ]
    },
    plugins: [
        new webpack.BannerPlugin({
            banner: `[file]\nNPM：${packageJSON.name}\n作者：${packageJSON.author}\n版本号：${packageJSON.version}\n时间：${new Date()}`
        }),
        new ProgressBarPlugin({
            format:
                chalk.green.bold(`${packageJSON.name} V${packageJSON.version} 构建中 `) +
                '[:bar] ' +
                chalk.green.bold(':percent') +
                ' (:elapsed seconds)',
            clear: false
        }),
        new VueLoaderPlugin(),
        new CleanWebpackPlugin(),
        ...config.plugins
    ]
};

module.exports = webpackConfig;
```
