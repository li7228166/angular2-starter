var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var webpackConfig = require('./webpack.config.js');
var merge = require('webpack-merge');
var precss = require('precss');
var autoprefixer = require('autoprefixer');
var AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin');
var ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = merge(webpackConfig, {
    devtool: 'source-map',
    entry: [
        'zone.js',
        'reflect-metadata',
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
            loaders: ['awesome-typescript', 'angular2-template', '@angularclass/hmr-loader']
        }, {
            test: /\.css/,
            include: path.join(__dirname, '..', 'app', 'style'),
            loader: 'style!css!postcss'
        }, {
            test: /\.less/,
            include: path.join(__dirname, '..', 'app', 'style'),
            loader: 'style!css!postcss!less'
        }, {
            test: /\.css/,
            exclude: path.join(__dirname, '..', 'app'),
            loader: ExtractTextPlugin.extract("style", "css!postcss", {
                publicPath: '../'
            })
        }, {
            test: /\.less/,
            exclude: path.join(__dirname, '..', 'app'),
            loader: ExtractTextPlugin.extract("style", "css!postcss", {
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
        new ExtractTextPlugin("style/vendor.[hash:8].css"),
        new HtmlWebpackPlugin({
            title: 'angular2-typescript-webpack通用开发环境',
            filename: 'index.html',
            template: path.join(__dirname, '..', 'app', 'index.html')
        }),
        new AddAssetHtmlPlugin([
            {
                filepath: require.resolve(path.join(__dirname, '..', 'dll', require('./util').vendorUrl)),
                includeSourcemap: false
            }
        ])
    ]
});