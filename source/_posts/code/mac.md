---
title: mac 安装配置
categories: 开发
date: 2020-11-16 16:40:00
tags: 
 - 操作系统
---

## 环境建立
用户目录下建个个人文件，里面放所有关于开发的东西。
`sudo chmod -R 777 文件名 (对该文件夹增加最高权限，省的以后出现各种权限问题。` 
nvm 用git下载下来，然后在目录里，

## brew 安装
`/bin/zsh -c "$(curl -fsSL https://gitee.com/cunkai/HomebrewCN/raw/master/Homebrew.sh)"`
## docker 安装
新版的直接命令安装 `brew install --cask --appdir=/Applications docker`
[旧电脑选择旧版的支持](https://docs.docker.com/desktop/release-notes/#docker-desktop-450)

## 环境问题

### 本地局域网之间通信调试
Mac 需要开启本地网路功能: 设置-隐私与安全性-本地网络-浏览器
