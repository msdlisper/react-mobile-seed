#!/usr/bin/env bash

if [ $1 ]; then
	project_name=$1
	mkdir ../$project_name
	cp -r .* ../$project_name # include .gitignore
	cd ../$project_name
	rm -rf .git
else
	echo "请输入你的项目名称"
fi
