/**
 * @file --
 * @author zhangpeng
 */

const config = require('config');
const g = require('utils/generate-symbols');

const input = {
    file: config.path.svg + 'source/',
    id: 'icon-%f',
    className: '.icon-%f',
    svgClassname: 'svg-icon-lib',
    dest: config.path.svg + 'output/',
    svgFileName: 'svg-symbols.svg',
    cssFileName: 'svg-symbols.css'
};


g(input);