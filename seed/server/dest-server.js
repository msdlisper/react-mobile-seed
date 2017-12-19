/**
 * @file --
 * @author zhangpeng
 */

const webpack = require('webpack');
const fs = require('fs');
const del = require('delete');
const config = require('config');
const utils = require('utils');
const htmlPath = config.path.templateProdHtml;
const htmlContent = fs.readFileSync(htmlPath).toString();
const fse = require('fs-extra');
const _ = require('lodash');
const env = process.argv[2];

// 判断是否符合启动条件
const init = function () {
    if (utils.isExist(config.path.dllProd)) {
        start();
    } else {
        utils.logs(['error: 请先yarn dll']);
    }
}

const start = function () {
    const webpackConfig = require('build/webpack.config.prod');

    // Remove dest content
    del.sync(config.path.prod);
    utils.ensurePath(config.path.prod);

    // 复制dll到prod
    fse.copy(config.path.dllProd, config.path.prod + '/dll');

    // 模板替换
    const entries = require('build/entry.config');
    webpackConfig.entry = entries;
    let svg = fs.readFileSync(config.path.svg + 'output/svg-symbols.svg').toString();
    _.each(entries, function (value, key){
        const prodHtml = utils.replaceTemplate(htmlContent, {
            buildTime: utils.getBuildTime(),
            entryName: key,
            envPrefix: env || 'qa',
            svg: svg
        });
        fs.writeFileSync(config.path.destTargetHtml + key + '.html', prodHtml);
    })
    




    // 构建
    
    const compiler = webpack(webpackConfig);
    compiler.run(function (err, stats) {
        if (err) {
            utils.logs(['error: ****************** 构建出错 ******************']);
        }
        utils.logs(['info: ****************** 构建完成! ******************']);
    });
}

init();