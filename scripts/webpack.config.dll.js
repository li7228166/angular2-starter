let path = require('path');
let webpack = require('webpack');
let webpackConfig = require('./webpack.config.js');
let merge = require('webpack-merge');
let packageConfig = require('../package.json');

module.exports = merge(webpackConfig, {
    output: {
        path: path.join(__dirname, '..', 'dll'),
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
            minimize: true,
            sourceMap: false,
            compressor: {
                warnings: false
            }
        })
    ]
});