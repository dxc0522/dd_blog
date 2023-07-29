---
title: Vscode
categories: 开发
date: 2019-7-16 10:25:00
tags: 
 - Coding
---
## 相关配置
```json
{
	//${workspaceRoot} the path of the folder opened in VS Code(VSCode中打开文件夹的路径)
	//${workspaceRootFolderName} (VSCode中打开文件夹的路径, 但不包含"/")
	//${file} the current opened file(当前打开的文件)
	//${relativeFile} (当前打开的文件,相对于workspaceRoot)
	//${fileBasename} (当前打开文件的文件名, 不含扩展名)
	//${fileDirname} (当前打开文件的目录名)
	//${fileExtname} (当前打开文件的扩展名)
    "version": "0.2.0",
    "configurations": [    
        {
            "name": "(gdb) Launch",// 配置名称，将会在启动配置的下拉菜单中显示
            "type": "cppdbg",// 配置类型，这里只能为cppdbg
            "request": "launch",// 请求配置类型，可以为launch（启动）或attach（附加）
            "program": "${workspaceFolder}/detect/test/detect_demo",// 将要进行调试的程序的路径
            "args": ["--rgb_video","/data/data/videos/car1_20170525.mp4"],// 程序调试时传递给程序的命令行参数
            "stopAtEntry": false,// 设为true时程序将暂停在程序入口处，一般设置为false
            "cwd": "${workspaceRoot}/detect/test",// 可执行程序的启动路径
            "environment": [],
            "externalConsole": true,// 调试时是否显示控制台窗口，一般设置为true显示控制台
            "MIMode": "gdb",
            "setupCommands": [
                {
                    "description": "Enable pretty-printing for gdb",
                    "text": "-enable-pretty-printing",
                    "ignoreFailures": true
                }
            ]
        }
    ]
}
```
## 调试静态文件
```json
{
  "type": "chrome",
  "request": "launch",
  "name": "静态文件 Chapter 4",
  "file": "${workspaceFolder}/Frontend dev-test/example/Chapter 4/index.html",
  "webRoot": "${workspaceFolder}"
},
```
## 调试服务器文件
```json
{
    "type": "chrome",
    "request": "launch",
    "sourceMaps": true,
    "name": "Launch Chrome",
    "url": "http://localhost:3000",
    "webRoot": "${workspaceFolder}",
    "skipFiles": [
        "node_modules/**"
    ],
    "sourceMapPathOverrides": {
        "webpack:///*": "${webRoot}/*",
    }
}
```
### 例
调试react项目
```json
{
  "type": "chrome",
  "request": "launch",
  "sourceMaps": true,
  "name": "Launch Chrome",
  "url": "http://localhost:3000",
  "webRoot": "${workspaceFolder}",
  "skipFiles": [
      "node_modules/**"
  ],
  "sourceMapPathOverrides": {
      "webpack:///*": "${webRoot}/*",
  }
}
```

## 远程SFTP调试服务器文件

使用vscode安装SFTP插件
```json
{
    "name": "My Server",
    "host": "ip address",
    "protocol": "sftp",
    "port": 22,
    "username": "login",
    "password": "pwd",
    "remotePath": "/",
    "connectTimeout":100000,
    "uploadOnSave": true
}

```
## 相关插件

### 设置
毛玻璃 `Vibrancy`
VS内置浏览器 `Browser Preview`
代码规范 `JavaScript Booster`
自动匹配另一半标签 `Bracket Pair Colorizer`
接口调试 `REST Client`
代码截图 `Polacode-2019`
注释高亮 `Better Comments`

- `！`红色注释
- `?`蓝色注释
- `//`灰色删除线注释
- `todo`橘红色注释
- `*`浅绿色注释

深色皮肤 `Dracula Theme`
紫色主题 `One Dark Pro`
图片预览 `Image preview`
运行网页热更新 `Live Server`
网页快捷在浏览器打开 `open in browser`
项目快捷运行脚本 `Quick Task`
scss格式化 `SCSS Formatter`
SFTP远程修改项目 `SFTP`
高亮 `Smarty`
TS格式化 `TSLint (deprecated)`
VS图标 `vscode-icons`
JSON 格式化 `vscode-json`
### Flutter

Flutter主体 `Flutter`
Flutter快捷方式 `Awesome Flutter Snippets`


### React 
React提示及快捷方式 `ES7 React/Redux/GraphQL/React-Native snippets`
Taro 快捷方式 `taroSnippets`
### Vue 
Vue主体 `Vetur`
wepy主体 `Vetur-wepy`
### Git
便捷Git操作 `Git History`

### Python
Python主题 `Python`
