var path = require('path')
var config = require('../config')
var utils = require('./utils')
var projectRoot = path.resolve(__dirname, '../')

module.exports = {
  entry: {
    puzzle: './src/templates/layouts/slider-puzzle/config.js',
    findcolor: './src/templates/layouts/find-color/config.js',
    truck: './src/templates/layouts/truck/config.js',
    guess: './src/templates/layouts/guess/config.js',
    quest: './src/templates/layouts/quest/config.js',
    wechatred: './src/templates/layouts/wechatred/config.js',
    turntable: './src/templates/layouts/turntable/config.js',
    money: './src/templates/layouts/money/config.js',
    setlike: './src/templates/layouts/setlike/config.js',
    golf: './src/templates/layouts/golf/config.js',
    bargain: './src/templates/layouts/bargain/config.js',
    blackwhite: './src/templates/layouts/black-white/config.js',
  },
  output: {
    path: config.build.assetsTemplatesRoot,
    publicPath: config.build.assetsTemplatesPublicPath,
    filename: '[name].js'
  },
  resolve: {
    extensions: ['', '.js', '.vue', 'css', 'scss'],
    fallback: [path.join(__dirname, '../node_modules')],
    alias: {
      'src': path.resolve(__dirname, '../src'),
      'assets': path.resolve(__dirname, '../src/assets'),
      'components': path.resolve(__dirname, '../src/components'),
      'css': path.resolve(__dirname, '../src/css')
    }
  },
  resolveLoader: {
    fallback: [path.join(__dirname, '../node_modules')]
  },
  module: {
    loaders: [
      {
        test: /\.vue$/,
        loader: 'vue'
      },
      {
        test: /\.js$/,
        loader: 'babel',
        include: projectRoot,
        exclude: /node_modules/
      },
      { test: /\.css$/, loader: "style!css"},
      {
        test: /\.json$/,
        loader: 'json'
      },
      {
        test: /\.html$/,
        loader: 'vue-html'
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url',
        query: {
          limit: 10000,
          name: utils.assetsPath('img/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url',
        query: {
          limit: 10000,
          name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
        }
      }
    ]
  },
  vue: {
    loaders: utils.cssLoaders()
  }
}
