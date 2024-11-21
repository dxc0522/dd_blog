
---
title: React Native
categories: 开发
date: 2024-10-11 17:54:00
tags: 
 - React
 - App
---

### Development Setup
[ReactNative 配置](https://reactnative.cn/docs/environment-setup)
#### Java SDK Manage(非必需, 正常按教程即可)
管理工具 [sdkman](https://sdkman.io/install)
常用命令 

> sdk list java
> sdk install 17.0.12.fx-zulu
> sdk use 17.0.12.fx-zulu
> sdk current
#### 路径别名
按照文档正常引入, 但别名不可以单独特殊字符
``` babel.config.js
alias: {
    '@src': ['./src'],
    '@router': './config/router.tsx',
},
```
### Project setup
npx react-native-community/cli@latest init MyApp
可能fetch失败关掉VPN多尝试就好了
pnpm start 如果失败 npx react-native doctor 查看报错信息
手机开启USB调试 然后npx react-native run-android

#### 导航跳转

[react-navigation](https://reactnavigation.org/docs/getting-started/) 是官方页面导航组件, 按照文档的内容正常开发即可.

``` tsx
// 路由嵌套方式
<Stack.Navigator screenOptions={{
    headerTitleAlign: 'center',
    headerStyle: {
        backgroundColor: '#333',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
        fontSize: 14,
        fontWeight: 'normal',
    },
}}>
    <Stack.Screen name="TabNavigator" component={TabBarNavigator} />
    <Stack.Screen name="Details" options={{
        title: '详情',
    }} component={DetailsScreen} />
</Stack.Navigator>
```
#### 引入图表
[react-native-vector-icons](https://github.com/oblador/react-native-vector-icons) 是图标库, 按照文档的内容正常引入,其中的配置项有些改动.
``` java
project.ext.vectoricons = [
    iconFontNames: [ 'MaterialIcons.ttf', 'EvilIcons.ttf' ] //选择需要引入的字体图标 此处非必加
]

apply from: file("../../node_modules/react-native-vector-icons/fonts.gradle")

```
[查询图标入口](https://oblador.github.io/react-native-vector-icons/)