#!/usr/bin/env bash
if [ -f "./config.sh" ]; then
	source ./config.sh

	#config:
	prod=$dev_path/dist/release
	echo "-----------发版-------------"
	echo "icode-release 路径: " $release_path
	echo "需要发版的项目路径: " $dev_path


    ## 从git上更新
    cd $dev_path
    if [ "$1" = "online" ]; then
        hasBranch=$(git branch | grep release)
        if [ "$hasBranch" ]; then
             git checkout release
        else
            git fetch
            git checkout origin/release -b release
        fi
    else
        hasBranch=$(git branch | grep development)
        if [ "$hasBranch" ]; then
            git checkout development
        else
            git fetch
            git checkout origin/development -b development
        fi
    fi
    git pull origin
    cd $release_path
    git pull origin


	## 构建
	echo "构建..."
	cd $dev_path
    yarn install
	yarn dest $1

    ## 复制
    echo "先将icode上清空"
    rm -rf $release_path/src/main/webapp/dist/*
    echo "复制构建后的代码到icode..."
    cp -rf $prod/* $release_path/src/main/webapp/dist

    ## 提交icode
	echo "add Icode...."
	cd $release_path
    git status
    git add ./*
    git commit -m '前端发版:'`date +"release/%m%d/%H%M"`
    git push origin master:refs/for/master

else
	echo "config.sh 不存在, 请参照 config_example.sh 创建一个你的发布配置文件"
fi
