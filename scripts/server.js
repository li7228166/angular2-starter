let path = require('path');
let express = require('express');
let bodyParser = require('body-parser');
let webpack = require('webpack');
let port = process.env.PORT || 8080;
let open = require("open");
let config = require('../config.json');

/*
 * 初始化
 * */
let app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

/*
 * 路由配置
 * */
app.get("/api/*", require("./proxy").proxy);
app.post("/api/!*", require("./proxy").proxy);

/*
 * 处理开发模式和生产模式
 * */
if (process.env.NODE_ENV === 'development') {
    port = 5000;
    const webpackDevMiddleware = require('webpack-dev-middleware'),
        webpackHotMiddleware = require('webpack-hot-middleware'),
        webpackDevConfig = require('./webpack.config.dev.js');

    const compiler = webpack(webpackDevConfig);
    const devMiddleware = webpackDevMiddleware(compiler, {
        logLevel: 'error',
        publicPath: webpackDevConfig.output.publicPath,
        stats: {
            colors: true
        }
    });
    app.use(devMiddleware);
    app.use(webpackHotMiddleware(compiler));
    app.use((req, res, next) => {
        if (req.path.indexOf('favicon.ico') > 0) {
            res.sendFile(path.join(__dirname, '../app/assets/images/favicon.ico'));
        } else if (req.method === 'GET' && req.accepts('html')) {
            const filename = path.join(compiler.outputPath, 'index.html');
            res.write(devMiddleware.fileSystem.readFileSync(filename));
            res.send();
            next();
        } else {
            next();
        }
    });
} else {
    app.use(express.static(path.join(__dirname, '..', 'dist')))
}

/*
 * 开启服务
 * */
app.listen(port, function () {
    console.log('Local http://localhost:' + port);
    console.log('External http://' + require('./util').localIp + ':' + port);
    // open("http://localhost:" + port);
});
