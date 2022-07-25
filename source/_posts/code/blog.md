---
title: 开发博客网站
authorDesc: 豆豆
categories: 开发
date: 2019-6-21 16:41:01
tags:
  - 博客
---

## 博客开发

基于[hexo](https://hexo.io/zh-cn/)的[Volantis](https://xaoxuu.com/wiki/volantis/)博客主题模版开发

## 免费 cdn 加速(不配置 cdn 会超级慢)  容易炸

使用 jsDelivr 的方式配置个人 cdn，但是每次修改资源都需要重新发行。[传送门](https://www.cnblogs.com/zhsh666/p/11432956.html)
贴图库申请个账号直接拉进去就能用，我把图片都放这个里面了。[传送门](http://www.tietuku.com)
还有其他的 cdn 方法没有用过。[传送门](https://cloud.tencent.com/developer/article/1352398)
[jsDelivr网络出错](https://github.com/volantis-x/hexo-theme-volantis/issues/759)
## npm包加速
https://unpkg.zhimg.com/browse/文件路径      查看资源

替换  https://unpkg.zhimg.com/browse/ => https://unpkg.zhimg.com/ 或  https://unpkg.zhimg.com/  或 cdn.cbd.int

https://fastly.jsdelivr.net/ 还能用

gcore.jsdelivr.net试一下
## 服务器配置

上[阿里云](https://promotion.aliyun.com/ntms/act/campus2018.html?userCode=ahxhg8oc)买个学生的服务器就够使用，装个 nginx,然后开一个端口配置下路径即可。

```nginx.config
    server {
        listen 80;
        server_name dd6688.club;
        location / {
          root /home/my_space_formal;
          try_files $uri $uri/ /index.html;
        }
    }
```

## 白嫖的第三方平台

[netlify](https://www.netlify.com/) 国外的提供商,支持 push 代码后自动化部署,缺点是国内访问速度有点差,但是问题不大.

[21cloudbox](https://www.21cloudbox.com/) 是国内的提供商,响应快,支持码云仓库,缺点妈的不支持自动化部署,要收费

## hexo 常用命令

```hexo
hexo d -g   生成静态文件后直接推送git
{% fb_img https://keep/1keep.jpg 健身 %} 插入的可放大的图片

```

## 然后就没有然后了
