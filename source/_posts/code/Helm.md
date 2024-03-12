---
title: Helm
authorDesc: 豆豆
categories: 开发
date: 2024-03-12 14:11:00
tags:
  - 服务器
  - Docker
---

## 基础

### K8s、Helm、Kubectl 之间的关系

Kubernetes（k8s）是用于容器编排和管理的开源平台，提供了对容器化应用程序的自动化部署、扩展和操作。
kubectl是用于与Kubernetes集群进行交互的命令行工具，可以执行各种操作来管理和控制Kubernetes集群中的资源。
Helm是一个Kubernetes的包管理工具，用于简化应用程序的部署和管理，通过Chart来定义和打包Kubernetes应用程序，以及提供了版本控制和便捷的升级功能。
kubectl 是对实例操作的工具; Helm是对打包模版的管理工具.

### 三大概念

Chart 代表着 Helm 包。它包含在 Kubernetes 集群内部运行应用程序，工具或服务所需的所有资源定义。你可以把它看作是 Homebrew formula，Apt dpkg，或 Yum RPM 在Kubernetes 中的等价物。

Repository（仓库） 是用来存放和共享 charts 的地方。它就像 Perl 的 CPAN 档案库网络 或是 Fedora 的 软件包仓库，只不过它是供 Kubernetes 包所使用的。

Release 是运行在 Kubernetes 集群中的 chart 的实例。一个 chart 通常可以在同一个集群中安装多次。每一次安装都会创建一个新的 release。以 MySQL chart为例，如果你想在你的集群中运行两个数据库，你可以安装该chart两次。每一个数据库都会拥有它自己的 release 和 release name。

在了解了上述这些概念以后，我们就可以这样来解释 Helm：

Helm 安装 charts 到 Kubernetes 集群中，每次安装都会创建一个新的 release。你可以在 Helm 的 chart repositories 中寻找新的 chart。


## 命令
### 集群操作

* 查看本地集群 `kubectl config get-contexts`
* 查看当前集群 `kubectl config current-context`
* 切换当前集群 `kubectl config use-context <context_name>`
* 查看集群状态 `kubectl cluster-info`
  
### 命令操作

* 查看release `helm list [--all]`
* 查看repo  `helm repo list`
* 增加新的repo `helm repo add dev https://example.com/dev-charts`
* 删除release `helm uninstall happy-panda`
* helm lint `helm lint`

> 打包流程

1. 创建charts `helm create deis-workflow`
2. 打包chart  `helm package deis-workflow`
3. install chart `helm install deis-workflow ./deis-workflow-0.1.0.tgz`

[命令速查](https://helm.sh/zh/docs/intro/cheatsheet/)