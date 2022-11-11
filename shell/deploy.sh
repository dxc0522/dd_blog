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
    echo '\n上传中...\n'
    scp -r -q $HOME_DIR/$LOCAL_PATH ${USER}@${HOST}:${REMOTE_FULL_PATH}
    echo '\n发布完成\n'
}
run