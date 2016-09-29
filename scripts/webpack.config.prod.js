var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var HtmlWebpackPlugin = require('html-webpack-plugin');
var merge = require('webpack-merge');
var precss = require('precss');
var autoprefixer = require('autoprefixer');

var webpackConfig = require('./webpack.config.js');
var packageConfig = require('../package.json');

module.exports = merge(webpackConfig, {
	entry: {
		'app': path.join(__dirname, '..', 'app', 'ts', 'index'),
		'vendor': Object.keys(packageConfig.dependencies)
	},
	output: {
		path: path.join(__dirname, '..', 'dist'),
		filename: 'script/app.[hash:8].js',
		publicPath: './'
	},
	module: {
		loaders: [{
			test: /\.ts$/,
			loaders: ['awesome-typescript-loader', 'angular2-template-loader']
		}, {
			test: /\.css/,
			exclude: path.join(__dirname, '..', 'app', 'style'),
			loader: ExtractTextPlugin.extract("style-loader", "css-loader!postcss-loader", {
				publicPath: '../'
			})
		}, {
			test: /\.less/,
			exclude: path.join(__dirname, '..', 'app', 'ts'),
			loader: ExtractTextPlugin.extract("style-loader", "css-loader!postcss-loader!less-loader", {
				publicPath: '../'
			})
		}]
	},
	postcss: function () {
		return [precss, autoprefixer];
	},
	plugins: [
		new webpack.DefinePlugin({
			'process.env': {
				NODE_ENV: JSON.stringify('production')
			},
			__PROXY__: process.env.PROXY || false
		}),
		new webpack.optimize.CommonsChunkPlugin('vendor', 'script/vendor.[hash:8].js'),
		new ExtractTextPlugin("style/app.[hash:8].css"),
		new webpack.optimize.UglifyJsPlugin({
			compressor: {
				warnings: false
			}
		}),
		new webpack.optimize.DedupePlugin(),
		new webpack.optimize.OccurenceOrderPlugin(),
		new webpack.optimize.AggressiveMergingPlugin({
			minSizeReduce: 1.5,
			moveToParents: true
		}),
		new HtmlWebpackPlugin({
			title: 'angular2-typescript-webpack通用开发环境',
			filename: 'index.html',
			template: path.join(__dirname, '..', 'app', 'index.html'),
			favicon: path.join(__dirname, '..', 'app', 'assets', 'images', 'favicon.ico')
		})
	]
});
