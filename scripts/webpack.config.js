var path = require('path');

module.exports = {
	resolve: {
		alias: {},
		extensions: ['', '.js', '.ts']
	},
	module: {
		loaders: [{
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
		}, {
			test: /\.css/,
			exclude: path.join(__dirname, '..', 'app', 'style'),
			loader: "raw!postcss"
		}, {
			test: /\.less/,
			exclude: path.join(__dirname, '..', 'app', 'style'),
			loader: "raw!postcss!less"
		}]
	}
};
