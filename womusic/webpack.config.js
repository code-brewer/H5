var webpack = require('webpack')

module.exports = {

  entry: ['./womusic/vip.js'],

  output: {
    // path: __dirname + '/dist/',
    publicPath: 'dist/',
    path: 'D:/Workspaces/eclipse_jee/wmpo/WebContent/dist/',
    // publicPath: 'dist/',
    filename: 'vip.js'
  },

  module: {
        loaders: [
            // 处理 *.vue 等文件用vue-loader
            {
                test: /\.vue$/,
                loader: 'vue',
                exclude: /node_modules/
            }, {
                // parse scss styles
                test: /\.(scss|css)$/,
                loader: 'style!css!sass',
                query: {
                    limit: 10000
                }
            },

            // 处理 *.js 等文件用babel-loader
            {
                test: /\.js$/,
                loader: 'babel',
                exclude: /node_modules/
            }
        ]
  },

  plugins: [
     new webpack.optimize.UglifyJsPlugin({
          sourceMap: false,
          compress: {
              warnings: false
          }
      })
  ],

  babel: {
    presets: ['es2015'],
    plugins: ['transform-runtime']
  }
}