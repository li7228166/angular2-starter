var path = require('path');
var fs = require("fs");
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var webpackConfig = require('./webpack.config.js');
var merge = require('webpack-merge');
var precss = require('precss');
var autoprefixer = require('autoprefixer');
var AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin');


/*获得vendor文件*/
var vendorUrl = '';
var files = fs.readdirSync(path.join(__dirname, '..', 'dll'));
files.forEach(function (val) {
	var exc = new RegExp(/vendor.*.js$/ig);
	if (exc.test(val)) {
		vendorUrl = val;
	}
});

module.exports = merge(webpackConfig, {
	devtool: 'source-map',
	entry: [
		'webpack/hot/dev-server',
		'webpack-hot-middleware/client',
		path.join(__dirname, '..', 'app', 'ts', 'index')
	],
	output: {
		path: path.join(__dirname, '..'),
		filename: 'bundle.js',
		publicPath: '/'
	},
	module: {
		loaders: [{
			test: /\.ts$/,
			loaders: ['awesome-typescript-loader', 'angular2-template-loader', '@angularclass/hmr-loader']
		}, {
			test: /\.css/,
			exclude: path.join(__dirname, '..', 'app', 'ts'),
			loader: 'style!css!postcss'
		}, {
			test: /\.less/,
			exclude: path.join(__dirname, '..', 'app', 'ts'),
			loader: 'style!css!postcss!less'
		}]
	},
	postcss: function () {
		return [precss, autoprefixer];
	},
	plugins: [
		new webpack.DefinePlugin({
			'process.env': {
				NODE_ENV: JSON.stringify('development')
			},
			__PROXY__: process.env.PROXY || false
		}),
		new webpack.DllReferencePlugin({
			context: path.join(__dirname),
			manifest: require(path.join(__dirname, '..', 'dll', 'manifest.json'))
		}),
		new webpack.optimize.OccurenceOrderPlugin(),
		new webpack.HotModuleReplacementPlugin(),
		new webpack.NoErrorsPlugin(),
		new HtmlWebpackPlugin({
			title: 'angular2-typescript-webpack通用开发环境',
			filename: 'index.html',
			template: path.join(__dirname, '..', 'app', 'index.html')
		}),
		new AddAssetHtmlPlugin([
			{
				filepath: require.resolve(path.join(__dirname, '..', 'dll', vendorUrl)),
				includeSourcemap: false
			}
		])
	]
});