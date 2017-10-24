var path = require('path')
var config = require('../config')
var utils = require('./utils')
var projectRoot = path.resolve(__dirname, '../')

module.exports = {
	entry: {
		login: './easierScene/build/buildLogin.js',
		index: './easierScene/build/buildIndex.js',
		wap: './easierScene/build/wap.js'
	},
	output: {
		path: config.build.assetsWmRoot,
		publicPath: './js/',
		filename: '[name].js'
	},
	resolve: {
		extensions: ['', '.js', '.vue', 'css', 'scss'],

	},
	module: {
		loaders: [{
			test: /\.vue$/,
			loader: 'vue'
		}, {
			test: /\.js$/,
			loader: 'babel',
			include: projectRoot,
			exclude: /node_modules/
		}, {
			test: /\.css$/,
			loader: "style!css"
		}, {
			test: /\.json$/,
			loader: 'json'
		}, {
			test: /\.html$/,
			loader: 'vue-html'
		}, {
			test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
			loader: 'url',
			query: {
				limit: 10000,
				name: 'static/img/[name].[hash:7].[ext]'
			}
		}, {
			test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
			loader: 'url',
			query: {
				limit: 10000,
				name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
			}
		}]
	},
	vue: {
		loaders: utils.cssLoaders()
	}
}