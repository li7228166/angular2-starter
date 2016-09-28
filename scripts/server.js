var path = require('path');
var express = require('express');
var bodyParser = require('body-parser');
var webpack = require('webpack');
var port = process.env.PORT || 8080;
var open = require("open");
var config = require('../config.json');

/*
 * 初始化
 * */
var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

/*
 * 路由配置
 * */
app.get("/api/*", require("./proxy").proxy);
app.post("/api/*", require("./proxy").proxy);

/*
 * 处理开发模式和生产模式
 * */
if (process.env.NODE_ENV === 'development') {
	port = 4000;
	var webpackDevMiddleware = require('webpack-dev-middleware'),
		webpackHotMiddleware = require('webpack-hot-middleware'),
		webpackDevConfig = require('./webpack.config.dev.js');

	var compiler = webpack(webpackDevConfig);
	app.use(webpackDevMiddleware(compiler, {
		noInfo: true,
		publicPath: webpackDevConfig.output.publicPath,
		stats: {
			colors: true
		}
	}));
	app.use(webpackHotMiddleware(compiler));
} else {
	app.use(express.static(path.join(__dirname, '..', 'dist')))
}

/*
 * 获得当前本机IP
 * */
var localIp = (function getIPAdress() {
	var interfaces = require('os').networkInterfaces();
	for (var devName in interfaces) {
		var iface = interfaces[devName];
		for (var i = 0; i < iface.length; i++) {
			var alias = iface[i];
			if (alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal) {
				return alias.address;
			}
		}
	}
})()

/*
 * 开启服务
 * */
app.listen(port, function () {
	console.log('Local http://localhost:' + port + '/\n');
	console.log('External http://' + localIp + ':' + port + '/\n');
	open("http://localhost:" + port);
});
