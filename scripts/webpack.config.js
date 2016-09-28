var path = require('path');

module.exports = {
    resolve: {
        alias: {

        },
        extensions: ['', '.js', '.ts','.less','.css']
    },
    module: {
        loaders: [{
            test: /\.ts$/,
            loaders: ['awesome-typescript-loader', 'angular2-template-loader']
        },{
            test: /\.html$/,
            exclude: /node_modules/,
            loader: 'raw'
        }, {
            test: /\.(png|jpg)$/,
            loader: 'url',
            query: {
                name: 'assets/images/[hash:8].[ext]',
                limit: 8192
            }
        }, {
            test: /\.(woff|woff2|ttf|svg|eot)(\?v=\d+\.\d+\.\d+)?$/,
            loader: "url",
            query: {
                name: 'assets/fonts/[hash:8].[ext]',
                limit: 10000
            }
        }]
    }
};
