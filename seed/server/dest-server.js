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
const fse = require('fs-extra')


// 判断是否符合启动条件
const init = function () {
    if (utils.isExist(config.path.dllProd)) {
        start();
    } else {
        utils.logs(['error: 请先yarn dll']);
    }
}

const start = function () {


    // Remove dest content
    del.sync(config.path.prod);
    utils.ensurePath(config.path.prod);

    // 复制dll到prod
    fse.copy(config.path.dllProd, config.path.prod + '/dll');

    // 模板替换
    const prodHtml = utils.replaceTemplate(htmlContent, {
        buildTime: utils.getBuildTime(),
        envPrefix: 'qa' // #TODO 根据输入参数来指定发版的前缀
    });

    fse.writeFileSync(config.path.destTargetHtml, prodHtml);



    // 构建
    const webpackConfig = require('build/webpack.config.prod');
    const compiler = webpack(webpackConfig);
    compiler.run(function (err, stats) {
        if (err) {
            utils.logs(['error: ****************** 构建出错 ******************']);
        }
        utils.logs(['info: ****************** 构建完成! ******************']);
    });
}

init();