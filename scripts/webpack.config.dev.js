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
		'babel-polyfill',
		'webpack/hot/dev-server',
		'webpack-hot-middleware/client',
		path.join(__dirname, '..', 'app', 'js', 'index')
	],
	output: {
		path: path.join(__dirname, '..'),
		filename: 'dist/bundle.js',
		publicPath: '/'
	},
	module: {
		loaders: [{
			test: /\.css/,
			loader: "style-loader!css-loader!postcss-loader"
		}, {
			test: /\.less/,
			loader: "style-loader!css-loader!postcss-loader!less-loader"
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
			__PROXY__: process.env.PROXY || false,
		}),
		new webpack.optimize.OccurenceOrderPlugin(),
		new webpack.HotModuleReplacementPlugin(),
		new webpack.NoErrorsPlugin(),
		new HtmlWebpackPlugin({
			title: 'react通用开发环境',
			filename: 'index.html',
			template: path.join(__dirname, '..', 'app', 'index.html')
		})
	]
});