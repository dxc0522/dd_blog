---
title: 自动化部署
authorDesc: 豆豆
categories: 开发
date: 2022-11-11 17:41:01
tags:
  - 部署
  - 服务器
---

# 1.服务器免登录配置

## 配置秘钥

将生成的 id_rsa.pub 文件拷贝到远程服务器的 `~/.ssh/authorized_keys` 目录下
如果远程服务器上已经存在"`~/.ssh/authorized_keys`"文件，那么需要编辑服务器上"`~/.ssh/authorized_keys`"文件，将客户端机器上的"id_rsa.pub"文件内容追加到"`~/.ssh/authorized_keys`"文件中。

如果服务器上没有"`~/.ssh/authorized_keys`"文件，执行下面这条命令

`cp id_rsa.pub authorized_keys`

即将公钥复制为 authorized_keys 文件

然后即可把 id_rsa.pub 删掉

`rm id_rsa.pub`

## （若不可用）设置权限

生成 authorized_keys ，修改 authorized_keys 权限为 600 .ssh 文件夹权限为 700 公钥私钥权限为 644 后。

ssh 登陆 发现还是要输入密码。

进行了 ssh -v 命令调试，发现报了访问私钥的异常。

最后排查发现 root/文件夹的权限不对。按照 sshd 的要求/root/ 文件夹的权限应该为 700 或者 755

解决方案 `chmod 700 ~`

# 2.新建项目 vscode 任务

创建文件 .vscode/tasks.json

```示例
{
	"version": "2.0.0",
	"tasks": [{
			"label": "Deploy prod",
			"type": "shell",
			"command": "./shell/deploy.sh",
			"dependsOn": ["Build"],
			"windows": {
				"options": {
					"shell": {
						"executable": "sh"
					}
				}
			},
			"detail": "部署正式环境",
			"problemMatcher": []
		}
	]
}

```

# 3.编辑 shell 文件

文件路径 shell/deploy.sh

```示例
#!/bin/sh
HOME_DIR=$(
    cd "$(dirname "$0")"
    pwd
)
HOME_DIR=$(dirname "$HOME_DIR")
PROJECT_NAME=$(basename "$PWD")
REMOTE_PATH=""
REMOTE_FULL_PATH=""
LOCAL_PATH="build"
USER="dou"
HOST="192.168.30.196"
run() {
    npm run build
    if [[ "$1" == "test" ]]; then
        REMOTE_PATH="/opt/fe/test/"
    else
        REMOTE_PATH="/opt/fe/prod/"
    fi
    REMOTE_FULL_PATH="$REMOTE_PATH$PROJECT_NAME"
    CURRENT_TIME=$(date "+%Y%m%d%H%M%S")

    ssh $USER@$HOST "cd $REMOTE_PATH; cp -rf $PROJECT_NAME $PROJECT_NAME@$CURRENT_TIME; rm -rf $PROJECT_NAME;"
    echo -e '\n上传中...\n'
    scp -r -q $HOME_DIR/$LOCAL_PATH ${USER}@${HOST}:${REMOTE_FULL_PATH}
    echo -e '\n发布完成\n'
}
run
```
