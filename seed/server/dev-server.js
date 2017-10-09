const webpackMiddleware = require('webpack-dev-middleware');
const express = require('express');
const webpack = require('webpack');
const webpackConfig = require('build/webpack.config.dev');
const compiler = webpack(webpackConfig);
const app = express();
const config = require('config');
const port = 3000;
const fs = require('fs');
const htmlPath = config.path.templateDevHtml;


app.use(webpackMiddleware(compiler, {
    noInfo: false,
    stats: {
        colors: true
    },
    quiet: false,
    log(message) {
        console.log('info: ' + message);
    },
    publicPath: '/js/'
}));

app.all('/*.html', function (req, res) {
    const html = fs.readFileSync(htmlPath).toString();
    // 模板替换
    
    res.send(html);
});
// app.all('/*.html', express.static('/dist'));
app.listen(port, function () {
    console.log(['info: Server running on http://localhost:' + port]);
});