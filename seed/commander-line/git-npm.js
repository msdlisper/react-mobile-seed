/**
 * @file 共享公用库的脚本
 * @author zhangpeng
 */

const command = process.argv[2];
const argv1 = process.argv[3];
const sp = require('shell-promise');
const fs = require('fs');
const config = require('config');
const utils = require('utils');
const versionPath = config.path.befe + 'version.json';
const _ = require('lodash');

const gitNpm = {
    readVersion: function () {
        const versionString = fs.readFileSync(versionPath).toString();
        return JSON.parse(versionString);
    },

    /**
     * 将所有的公用库拉下来
     * 循环每一个repo, 并且要等到都resolve才结束程序
     */
    init: function () {
        const versions = gitNpm.readVersion();
        let promiseArray = [];
        for (const version in versions) {
            if (!fs.existsSync(config.path.befe + version)) {
                promiseArray.push(sp('git clone ' + versions[version].remote + ' ' + version, {
                    cwd: config.path.befe,
                    verbose: true
                }))
            } else {
                utils.logs(['info:已存在' + version + ', 跳过..']);

            }
        }
        const promise = Promise.all(promiseArray).then(function (re) {
            utils.logs(['info:已clone所有befe库']);
            gitNpm.update();
        })

    },

    /**
     * 当你在本地修改了公用库, 使用这个命令来锁定你项目使用的版本(commit hash)
     * @return {[type]} [description]
     */
    lock: function () {
        const versions = gitNpm.readVersion();
        let promiseArray = [];
        for (const version in versions) {
            if (!fs.existsSync(config.path.befe + version)) {
                utils.logs(['info:不存在' + version + ', 请先yarn gn init']);
            } else {
                let p = sp('git rev-parse HEAD', {
                        cwd: config.path.befe + version,
                        verbose: true
                    })
                    .then(function (hash) {
                        let h = _.trim(hash);
                        versions[version].hash = h;
                        return versions;
                    });
                promiseArray.push(p);

            }
        }
        const promise = Promise.all(promiseArray).then(function (re) {
            fs.writeFileSync(config.path.befe + 'version.json', JSON.stringify(re[0], null, 4));
            utils.logs(['info:已将version.json锁定']);
        });
    },
    update: function () {
        const versions = gitNpm.readVersion();
        let promiseArray = [];
        for (const version in versions) {
            if (!fs.existsSync(config.path.befe + version)) {
                utils.logs(['info:不存在' + version + ', 请先yarn gn init']);
            } else {
                let p = sp('git fetch', {
                        cwd: config.path.befe + version,
                        verbose: true
                    })
                    .then(function () {
                        return sp('git checkout ' + versions[version].branch, {
                            cwd: config.path.befe + version,
                            verbose: true
                        });
                    })
                    .then(function () {
                        return sp('git reset --hard ' + versions[version].hash, {
                            cwd: config.path.befe + version,
                            verbose: true
                        });
                    });
                promiseArray.push(p);

            }
        }
        const promise = Promise.all(promiseArray).then(function (re) {
            utils.logs(['info:已将所有befe库更新到指定版本']);
        })
    },
    pull: function () {
        const versions = gitNpm.readVersion();
        let promiseArray = [];
        for (const version in versions) {
            if (!fs.existsSync(config.path.befe + version)) {
                utils.logs(['info:不存在' + version + ', 请先yarn gn init']);
            } else {
                let p = sp('git pull', {
                        cwd: config.path.befe + version,
                        verbose: true
                    })
                promiseArray.push(p);

            }
        }
        const promise = Promise.all(promiseArray).then(function (re) {
            utils.logs(['info:已将所有befe库从远程更新! 如果要回退, 请git checkout versions.json, 再yarn gn update']);
        })
    },
    stree: function () {

        const versions = gitNpm.readVersion();
        let promiseArray = [];
        for (const version in versions) {
            if (!fs.existsSync(config.path.befe + version)) {
                utils.logs(['info:不存在' + version + ', 请先yarn gn init']);
            } else {
                if (argv1 && version === argv1) {
                    let p = sp('open -a SourceTree ' + version, {
                        cwd: config.path.befe,
                        verbose: true
                    });
                    promiseArray.push(p);
                } else if (!argv1) {
                    let p = sp('open -a SourceTree ' + version, {
                        cwd: config.path.befe,
                        verbose: true
                    });
                    promiseArray.push(p);
                }

            }
        }
        const promise = Promise.all(promiseArray).then(function (re) {
            utils.logs(['info:已打开公用库']);
        });
    }
};

// 程序入口
switch (command) {
    case 'init':
        gitNpm.init();
        break;
    case 'update':
        gitNpm.update();
        break;
    case 'pull':
        gitNpm.pull();
        break;
    case 'lock':
        gitNpm.lock();
        break;
    case 'stree':
        gitNpm.stree();
        break;
    default:
        utils.logs(['error: gn ' + command + '命令没找到! ------需要这个命令? 你可以自己造呀^_^']);
}