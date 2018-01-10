const path = require('path');

module.exports = {
    resolve: {
        alias: {},
        extensions: ['.js', '.ts']
    },
    module: {
        rules: [{
            test: /\.html$/,
            use: {
                loader: "html-loader",
                options: {
                    minimize: false
                }
            }
        }, {
            test: /\.(png|jpg)$/,
            use: {
                loader: 'url-loader',
                options: {
                    name: 'assets/images/[hash:8].[ext]',
                    limit: 8192
                }
            }
        }, {
            test: /\.(woff|woff2|ttf|svg|eot)(\?v=\d+\.\d+\.\d+)?$/,
            use: {
                loader: "url-loader",
                options: {
                    name: 'assets/fonts/[hash:8].[ext]',
                    limit: 10000
                }
            }
        }, {
            test: /\.css/,
            include: path.join(__dirname, '..', 'app', 'ts'),
            use: [{
                loader: "to-string-loader"
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
            include: path.join(__dirname, '..', 'app', 'ts'),
            use: [{
                loader: "to-string-loader"
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
    }
};
