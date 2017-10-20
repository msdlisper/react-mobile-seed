/**
 * @file --
 * @author zhangpeng
 */

const path = require('path');
const birdv3 = require('birdv3');
const config = require('config');
const utils = require('utils');
const express = require('express');
const birdfile = path.resolve('seed/node_modules/config/bird/birdfile');
const app = express();
const port = process.argv[2] || 3000;

app.use('/js', express.static(config.path.prod + 'js/'));
app.use('/dll', express.static(config.path.prod + 'dll/'));
app.use('/images', express.static(config.path.prod + 'images/'));

app.all('/*.html', express.static(config.path.prod));
app.all('*', birdv3(birdfile));
app.listen(port, function () {
    utils.logs(['info: Production Server running on http://localhost:' + port]);
});