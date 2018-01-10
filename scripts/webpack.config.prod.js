let path = require('path');
let webpack = require('webpack');
let ExtractTextPlugin = require("extract-text-webpack-plugin");
let HtmlWebpackPlugin = require('html-webpack-plugin');
let merge = require('webpack-merge');
let AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin');
let webpackConfig = require('./webpack.config.js');

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
        rules: [{
            test: /\.ts$/,
            use: ['awesome-typescript-loader', 'angular2-template-loader']
        }, {
            test: /\.css/,
            include: path.join(__dirname, '..', 'app', 'style'),
            use: ExtractTextPlugin.extract({
                fallback: "style-loader",
                use: ["css-loader",
                    {
                        loader: "postcss-loader",
                        options: {
                            config: {
                                path: path.join(__dirname, 'dist', 'postcss.config.js')
                            }
                        }
                    }],
                publicPath: "../"
            })
        }, {
            test: /\.less/,
            include: path.join(__dirname, '..', 'app', 'style'),
            use: ExtractTextPlugin.extract({
                fallback: "style-loader",
                use: [
                    "css-loader",
                    {
                        loader: "postcss-loader",
                        options: {
                            config: {
                                path: path.join(__dirname, 'dist', 'postcss.config.js')
                            }
                        }
                    },
                    "less-loader"
                ],
                publicPath: "../"
            })
        }]
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify('production'),
                __PROXY__: process.env.PROXY || false
            }
        }),
        new webpack.DllReferencePlugin({
            context: path.join(__dirname),
            manifest: require(path.join(__dirname, '..', 'dll', 'manifest.json'))
        }),
        new ExtractTextPlugin({
            filename: "style/app.[hash:8].css",
            disable: false,
            allChunks: true
        }),
        new webpack.optimize.UglifyJsPlugin({
            minimize: true,
            sourceMap: false,
            compressor: {
                warnings: false
            }
        }),
        new webpack.optimize.AggressiveMergingPlugin({
            minSizeReduce: 1.5,
            moveToParents: true
        }),
        new HtmlWebpackPlugin({
            title: 'angular2-typescript-webpack通用开发环境',
            filename: 'index.html',
            template: path.join(__dirname, '..', 'app', 'index.html'),
            favicon: path.join(__dirname, '..', 'app', 'assets', 'images', 'favicon.ico')
        }),
        new AddAssetHtmlPlugin([{
            filepath: require('./util').vendorUrl('js'),
            outputPath: '../dist/script',
            publicPath: './script',
            includeSourcemap: false
        }, {
            filepath: require('./util').vendorUrl('css'),
            outputPath: '../dist/style',
            publicPath: './style',
            includeSourcemap: false,
            typeOfAsset: 'css'
        }].filter(item => item.filepath).map(item => {
            item.filepath = require.resolve(path.join(__dirname, '..', 'dll', item.filepath));
            return item;
        }))
    ]
});
