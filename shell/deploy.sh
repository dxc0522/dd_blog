###
# @Author: zhaozhong
# @Date: 2022-11-02 14:30:11
 # @LastEditTime: 2022-11-07 11:30:27
 # @LastEditors: zhaozhong
# @Description:
# Copyright 2022 zhaozhong, All Rights Reserved.
###
#!/bin/sh
HOME_DIR=$(
    cd "$(dirname "$0")"
    pwd
)
HOME_DIR=$(dirname "$HOME_DIR")
PROJECT_NAME=$(basename "$PWD")
REMOTE_PATH=""
LOCAL_PATH="build"
USER="dou"
HOST="192.168.30.196"
run() {
    # PROJECT_NAME=$(cat $HOME_DIR/package.json | grep "name" | tr ":" " " | awk '{print $2}' | tr "," " " | awk '{print $1}' | tr "\"" " " | awk '{print $1}')
    # package.json 的name
    if [[ "$1" == "test" ]]; then
        REMOTE_PATH="/opt/fe/test/$PROJECT_NAME"
    else
        REMOTE_PATH="/opt/fe/prod/$PROJECT_NAME"
    fi
    CURRENT_TIME=$(date "+%Y%m%d%H%M%S")
    npm run build
    ssh $USER@$HOST "cd $REMOTE_PATH; cp -rf $LOCAL_PATH $LOCAL_PATH@$CURRENT_TIME; rm -rf $LOCAL_PATH; mkdir $LOCAL_PATH;"
    scp -r $HOME_DIR/$LOCAL_PATH ${USER}@${HOST}:${REMOTE_PATH}
}
if [ -f "$HOME_DIR/package.json" ]; then
    run
fi
