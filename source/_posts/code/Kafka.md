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
Apache Kafka 是消息引擎系统，也是一个分布式流处理平台.
{%  image /assets/img/kafka/8b28137150c70d66200f649e26ff2395.webp %}
### version
版本号：
大 + 小 + patch

0.7版本:
只有基础消息队列功能，无副本；打死也不使用

0.8版本:
增加了副本机制，新的producer API；建议使用0.8.2.2版本；不建议使用0.8.2.0之后的producer API

0.9版本:
增加权限和认证，新的consumer API，Kafka Connect功能；不建议使用consumer API；

0.10版本:
引入Kafka Streams功能，bug修复；建议版本0.10.2.2；建议使用新版consumer API

0.11版本:
producer API幂等，事物API，消息格式重构；建议版本0.11.0.3；谨慎对待消息格式变化

1.0和2.0版本:
Kafka Streams改进；建议版本2.0；

江湖经验：不要成为最新版本的小白鼠
### 核心概念
- 消息：Record。Kafka 是消息引擎嘛，这里的消息就是指 Kafka 处理的主要对象。
- 主题：Topic。主题是承载消息的逻辑容器，在实际使用中多用来区分具体的业务。
- 分区：Partition。一个有序不变的消息序列。每个主题下可以有多个分区。
- 消息位移：Offset。表示分区中每条消息的位置信息，是一个单调递增且不变的值。
- 副本：Replica。Kafka 中同一条消息能够被拷贝到多个地方以提供数据冗余，这些地方就是所谓的副本。副本还分为领导者副本和追随者副本，各自有不同的角色划分。副本是在分区层级下的，即每个分区可配置多个副本实现高可用。
- 生产者：Producer。向主题发布新消息的应用程序。
- 消费者：Consumer。从主题订阅新消息的应用程序。
- 消费者位移：Consumer Offset。表征消费者消费进度，每个消费者都有自己的消费者位移。
- 消费者组：Consumer Group。多个消费者实例共同组成的一个组，同时消费多个分区以实现高吞吐。
- 重平衡：Rebalance。消费者组内某个消费者实例挂掉后，其他消费者实例自动重新分配订阅主题分区的过程。Rebalance 是 Kafka 消费者端实现高可用的重要手段。
{%  image /assets/img/kafka/58c35d3ab0921bf0476e3ba14069d291.webp %}

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

## kafkacat

### 安装

`brew install kafkacat`