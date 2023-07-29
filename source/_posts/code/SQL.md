---
title: SQL
authorDesc: 豆豆
categories: 开发
date: 2023-06-13 08:48:00
tags:
  - 后端
  - SQL
---
## 常用sql

### load data

``` sql

LOAD DATA INFILE '/var/lib/mysql-files/trip_map.csv'
INTO TABLE trip_map
FIELDS TERMINATED BY ','
ENCLOSED BY '"'
LINES TERMINATED BY '\n'
IGNORE 1 ROWS;
```
### 索引index

```sql
CREATE INDEX idx_trip ON trip_map_1(h3_address,event_date,center_lat,center_lon);

SHOW INDEX FROM trip_map_1;

DROP INDEX  idx_trip_map_1 ON trip_map_1;

EXPLAIN 关键词可查看语句的查询状态
```

### 分区partition
``` sql
-- 新增分区字段
ALTER TABLE trip_map_1 ADD COLUMN partition_month INT NOT NULL DEFAULT 0;

# 手动分区
ALTER TABLE trip_map_1 PARTITION BY RANGE (partition_month)(
   PARTITION p202301 VALUES LESS THAN (202302),
   PARTITION p202302 VALUES LESS THAN (202303),
   PARTITION p202303 VALUES LESS THAN (202304),
   PARTITION p202304 VALUES LESS THAN (202305),
   PARTITION p202305 VALUES LESS THAN (202306),
   PARTITION p202306 VALUES LESS THAN (202307),
   PARTITION p202307 VALUES LESS THAN (202308),
   PARTITION p202308 VALUES LESS THAN (202309),
   PARTITION p202309 VALUES LESS THAN (202310),
   PARTITION p202310 VALUES LESS THAN (202311),
   PARTITION p202311 VALUES LESS THAN (202312),
   PARTITION p202312 VALUES LESS THAN (202401)
);
-- 设置分区字段值
UPDATE trip_map_1 SET partition_month = YEAR(event_date) * 100 + MONTH(event_date);
-- 查看分区
SHOW CREATE TABLE trip_map_1;
```

## 特殊

### max 语法
数字的max语法查看最大值不一定有order排序的最大值快