var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var HtmlWebpackPlugin = require('html-webpack-plugin');
var merge = require('webpack-merge');
var precss = require('precss');
var autoprefixer = require('autoprefixer');
var AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin');
var webpackConfig = require('./webpack.config.js');

var appExtractor = new ExtractTextPlugin('style/app.[hash:8].css');
var vendorExtractor = new ExtractTextPlugin('style/vendor.[hash:8].css');

//webpack 配置
module.exports = merge(webpackConfig, {
    entry: [
        'zone.js',
        'reflect-metadata',
        path.join(__dirname, '..', 'app', 'ts', 'index')
    ],
    output: {
        path: path.join(__dirname, '..', 'dist'),
        filename: 'script/app.[hash:8].js',
        publicPath: './'
    },
    module: {
        loaders: [{
            test: /\.ts$/,
            loaders: ['awesome-typescript', 'angular2-template']
        }, {
            test: /\.css/,
            include: path.join(__dirname, '..', 'app', 'style'),
            loader: appExtractor.extract("style", "css!postcss", {
                publicPath: '../'
            })
        }, {
            test: /\.less/,
            include: path.join(__dirname, '..', 'app', 'style'),
            loader: appExtractor.extract("style", "css!postcss!less", {
                publicPath: '../'
            })
        }, {
            test: /\.css/,
            exclude: path.join(__dirname, '..', 'app'),
            loader: vendorExtractor.extract("style", "css!postcss", {
                publicPath: '../'
            })
        }, {
            test: /\.less/,
            exclude: path.join(__dirname, '..', 'app'),
            loader: vendorExtractor.extract("style", "css!postcss!less", {
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
        appExtractor,
        vendorExtractor,
        new webpack.DllReferencePlugin({
            context: path.join(__dirname),
            manifest: require(path.join(__dirname, '..', 'dll', 'manifest.json'))
        }),
        new HtmlWebpackPlugin({
            title: 'angular2-typescript-webpack通用开发环境',
            filename: 'index.html',
            template: path.join(__dirname, '..', 'app', 'index.html'),
            favicon: path.join(__dirname, '..', 'app', 'assets', 'images', 'favicon.ico')
        }),
        new AddAssetHtmlPlugin([
            {
                filepath: require.resolve(path.join(__dirname, '..', 'dll', require('./util').vendorUrl)),
                outputPath: '../dist/script',
                publicPath: './script',
                includeSourcemap: false
            }
        ])
    ]
});
