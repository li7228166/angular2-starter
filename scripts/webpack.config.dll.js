var path = require('path');
var webpack = require('webpack');
var webpackConfig = require('./webpack.config.js');
var merge = require('webpack-merge');
var packageConfig = require('../package.json');

module.exports = merge(webpackConfig, {
	output: {
		path: 'dll',
		filename: '[name].[hash:8].js',
		library: '[name]'
	},
	entry: {
		vendor: Object.keys(packageConfig.dependencies)
	},
	plugins: [
		new webpack.DllPlugin({
			path: path.join(__dirname, '..', 'dll', 'manifest.json'),
			name: '[name]',
			context: path.join(__dirname)
		}),
		new webpack.optimize.UglifyJsPlugin({
			compressor: {
				warnings: false
			}
		})
	]
});