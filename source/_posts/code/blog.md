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
## 免费cdn加速(不配置cdn会超级慢)
使用jsDelivr的方式配置个人cdn，但是每次修改资源都需要重新发行。[传送门](https://www.itrhx.com/2019/02/10/A18-Free-CDN-jsDeliver+Github/)
贴图库申请个账号直接拉进去就能用，我把图片都放这个里面了。[传送门](http://www.tietuku.com)
还有其他的cdn方法没有用过。[传送门](https://cloud.tencent.com/developer/article/1352398)
## 服务器配置
上[阿里云](https://promotion.aliyun.com/ntms/act/campus2018.html?userCode=ahxhg8oc)买个学生的服务器就够使用，装个nginx,然后开一个端口配置下路径即可。
``` nginx.config
    server {
        listen 80;
        server_name dd6688.club;
        location / {
          root /home/my_space_formal;
          try_files $uri $uri/ /index.html;
        }
    }
```
## hexo 常用命令
``` hexo
hexo d -g   生成静态文件后直接推送git
{% fb_img https://cdn.jsdelivr.net/gh/dxc0522/cdn_assets@3.7/keep/1keep.jpg 健身 %} 插入的可放大的图片 

```
## 然后就没有然后了