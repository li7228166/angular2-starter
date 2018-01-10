let path = require('path');
let webpack = require('webpack');
let ExtractTextPlugin = require("extract-text-webpack-plugin");
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
    module: {
        rules: [{
            test: /\.css/,
            include: /node_modules/,
            use: ExtractTextPlugin.extract({
                fallback: "style-loader",
                use: [{
                    loader: "css-loader",
                    options: {
                        minimize: true
                    }
                }, {
                    loader: "postcss-loader",
                    options: {
                        config: {
                            path: path.join(__dirname, 'dist', 'postcss.config.js')
                        }
                    }
                }]
            })
        }]
    },
    plugins: [
        new webpack.DllPlugin({
            path: path.join(__dirname, '..', 'dll', 'manifest.json'),
            name: '[name]',
            context: path.join(__dirname)
        }),
        new ExtractTextPlugin({
            filename: "vendor.[hash:8].css",
            disable: false,
            allChunks: true
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