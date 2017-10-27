#!/usr/bin/env bash

if [ $1 ]; then
	project_name=$1
	mkdir ../$project_name
	cp -r ./* ../$project_name 

	# 怎么复制.*? cp .* 会把上一级都复制...然而我的ss挂了, 我得弄下
	cp -r ./.babelrc ../$project_name 
	cp -r ./.gitignore ../$project_name 
	cd ../$project_name
else
	echo "请输入你的项目名称"
fi
