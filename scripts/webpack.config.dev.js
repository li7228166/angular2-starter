var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var webpackConfig = require('./webpack.config.js');
var merge = require('webpack-merge');
var precss = require('precss');
var autoprefixer = require('autoprefixer');

module.exports = merge(webpackConfig, {
	devtool: 'source-map',
	entry: [
		'reflect-metadata',
		'zone.js',
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
		new webpack.optimize.OccurenceOrderPlugin(),
		new webpack.HotModuleReplacementPlugin(),
		new webpack.NoErrorsPlugin(),
		new HtmlWebpackPlugin({
			title: 'angular2-typescript-webpack通用开发环境',
			filename: 'index.html',
			template: path.join(__dirname, '..', 'app', 'index.html')
		})
	]
});