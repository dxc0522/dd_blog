---
title: Kafka
authorDesc: 豆豆
categories: 开发
date: 2023-06-03 19:48:00
tags:
  - 后端
---
[真的，搞懂 Kafka 看这一篇就够了！](https://juejin.cn/post/6963101806402469902)
## 基础

### 核心概念
生产者：Producer 往Kafka集群生成数据
消费者：Consumer 往Kafka里面去获取数据，处理数据、消费数据Kafka的数据是由消费者自己去拉去Kafka里面的数据
主题：topic
分区：partition 默认一个topic有一个分区（partition），自己可设置多个分区（分区分散存储在服务器不同节点上）

### 集群架构

Kafka集群中，一个kafka服务器就是一个broker，Topic只是逻辑上的概念，partition在磁盘上就体现为一个目录。
**Consumer Group**：消费组 消费数据的时候，都必须指定一个group id，指定一个组的id假定程序A和程序B指定的group id号一样，那么两个程序就属于同一个消费组。
**特殊**: 比如，有一个主题topicA程序A去消费了这个topicA，那么程序B就不能再去消费topicA（程序A和程序B属于一个消费组）；再比如程序A已经消费了topicA里面的数据，现在还是重新再次消费topicA的数据，是不可以的，但是重新指定一个group id号以后，可以消费。不同消费组之间没有影响，消费组需自定义，消费者名称程序自动生成（独一无二）。
**Controller**：Kafka节点里面的一个主节点，借助zookeeper。

### GPT 解释

Kafka 是一个分布式发布-订阅消息系统，它可以用于构建实时流数据管道和应用程序。
在 Kafka 中，每个服务器实例都被称为 broker，而多个 broker 组成了一个集群 cluster。一个 topic 可以被分配到一个或多个 partition 中，以便将数据平均分布并允许横向扩展。
Producer 创建的消息会被分配到特定的 partition 上，具体是哪个 partition 取决于所选择的 partition 方案或默认的 partition 机制。同一个 partition 中的消息是有序的，而不同的 partition 中的消息在时间上是并行处理的。
多个 consumer 可以订阅同一个 topic，并从其中接收消息。默认情况下，对于一个 topic 的每个 partition 只能由一个 consumer 消费。但是，在消费者组（consumer group）中，多个 consumer 可以共享消费一个或多个 topic 的 partition，从而提高整体的吞吐量。