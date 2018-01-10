let path = require('path');
let webpack = require('webpack');
let HtmlWebpackPlugin = require('html-webpack-plugin');
let webpackConfig = require('./webpack.config.js');
let merge = require('webpack-merge');
let AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin');

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
        rules: [{
            test: /\.ts$/,
            use: ['awesome-typescript-loader', 'angular2-template-loader', '@angularclass/hmr-loader']
        }, {
            test: /\.css/,
            include: path.join(__dirname, '..', 'app', 'style'),
            use: [{
                loader: "style-loader"
            }, {
                loader: "css-loader",
                options: {
                    sourceMap: true
                }
            }, {
                loader: "postcss-loader",
                options: {
                    sourceMap: true,
                    config: {
                        path: path.join(__dirname, 'dist', 'postcss.config.js')
                    }
                }
            }]
        }, {
            test: /\.less/,
            include: path.join(__dirname, '..', 'app', 'style'),
            use: [{
                loader: "style-loader"
            }, {
                loader: "css-loader",
                options: {
                    sourceMap: true
                }
            }, {
                loader: "postcss-loader",
                options: {
                    sourceMap: true,
                    config: {
                        path: path.join(__dirname, 'dist', 'postcss.config.js')
                    }
                }
            }, {
                loader: "less-loader",
                options: {
                    sourceMap: true
                }
            }]
        }]
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify('development'),
                __PROXY__: process.env.PROXY || false
            }
        }),
        new webpack.DllReferencePlugin({
            context: path.join(__dirname),
            manifest: require(path.join(__dirname, '..', 'dll', 'manifest.json'))
        }),
        new webpack.HotModuleReplacementPlugin(),
        new HtmlWebpackPlugin({
            title: 'angular2-typescript-webpack通用开发环境',
            filename: 'index.html',
            template: path.join(__dirname, '..', 'app', 'index.html')
        }),
        new AddAssetHtmlPlugin([{
            filepath: require('./util').vendorUrl('js')
        }, {
            filepath: require('./util').vendorUrl('css'),
            typeOfAsset: 'css'
        }].filter(item => item.filepath).map(item => {
            item.filepath = require.resolve(path.join(__dirname, '..', 'dll', item.filepath));
            item.includeSourcemap = false;
            return item;
        }))
    ]
});