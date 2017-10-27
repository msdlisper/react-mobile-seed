# 移动端seed
这是种子项目, 业务代码别写在这里, clone 本项目后, 请执行

```
yarn generate your-project-name
```

然后
```
cd ../your-project-name
```

里开发你的项目, 并参考以下说明:

# how to dev?
刚进入项目时
```
yarn
yarn dll
yarn dev
```

### 要加入新的入口, 配置目录在
seed/node_modules/build/entry.config.js

### bird配制文件:
seed/node_modules/config/bird/server/global.js

### pix? em? rem?
本项目使用淘宝flexible方案适应移动端屏幕, 在写代码时用px, 最后转成rem(webpack 的 px2rem loader完成)


# how to build?

```
// 构建, env默认是qa, 可以手动指定
yarn dest [env] 
```

# how to release?
```
// 首先根据你项目情况设置你的config
cd seed/commander-line && cp config.sh.example config.sh

// 配置好后, 执行:
yarn release [env]
相当于:
bash seed/commander-line/release.sh
```

# how to use common components?
- 位置: node_modules/@befe
- 使用
```
// 先初始化库
yarn gn init

// 从远程拉代码后需要update库里的代码, 以保持与远程一致  
yarn gn update

// 本地修改库里的东后, 需要将version.js更新, 以方便其它同学拉代码后, 能根据version.js来更新库 
yarn gn lock

// 打开库的sourceTree
yarn gn stree [utils/erp-comps-mobiles]
```