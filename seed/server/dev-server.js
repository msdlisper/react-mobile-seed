/**
 * @file --
 * @author zhangpeng
 */


const webpackMiddleware = require('webpack-dev-middleware');
const express = require('express');
const webpack = require('webpack');
const app = express();
const path = require('path');
const utils = require('utils');
const config = require('config');
const birdv3 = require('birdv3');
const birdfile = path.resolve('seed/node_modules/config/bird/birdfile');
const port = process.argv[2] || 3000;
const fs = require('fs');
const htmlPath = config.path.templateDevHtml;


// 判断是否符合启动条件
const init = function () {
    if (utils.isExist(config.path.dllDev)) {
        start();
    } else {
        utils.logs(['error: 请先yarn dll']);
    }
}

// 启动服务器
const start = function () {
    const webpackConfig = require('build/webpack.config.dev');
    const entries = require('build/entry.config');
    webpackConfig.entry = entries;
    const compiler = webpack(webpackConfig);
    app.use(webpackMiddleware(compiler, {
        noInfo: false,
        stats: {
            colors: true
        },
        quiet: false,
        log(message) {
            console.log('info: ' + message);
        },
        publicPath: '/'
    }));

    app.all('/*.html', function (req, res) {
        let pathName = /(?:\/)(\w+?)(?=.html)/.exec(req.path)[1];
        const html = fs.readFileSync(htmlPath).toString();
        let svg = fs.readFileSync(config.path.svg + 'output/svg-symbols.svg').toString();
        // 模板替换
        const devHtml = utils.replaceTemplate(html, {
            envPrefix: 'dev', // #TODO 根据输入参数来指定发版的前缀
            entryName: pathName,
            svg: svg
        });
        res.send(devHtml);
    });

    // dll
    app.use('/dll', express.static(config.path.dllDev));
    app.use('/js', express.static(config.path.dev + 'js/'));
    app.use('/images', express.static(config.path.dev + 'images/'));

    app.all('*', birdv3(birdfile));
    app.listen(port, function () {
        console.log(['info: Server running on http://localhost:' + port]);
    });
};

init();