// var webpack = require('webpack')

// module.exports = {

//   entry: ['./meadJohnsonBo/index.js'],

//   // output: {
//   //   path: __dirname + '/meadJohnson/dist/',
//   //   publicPath: 'meadJohnson/dist/',
//   //   filename: 'app.js'
//   // },
//   output: {
// 	  path: 'F:/Project/bbm/2.0-code/bbg/WebContent/build/',
//     publicPath: 'WebContent/build/',
//     filename: 'app.js'
//   },
//   module: {
//         loaders: [
//             {
//                 test: /\.vue$/,
//                 loader: 'vue',
//                 exclude: /node_modules/
//             }, {
//                 // parse scss styles
//                 test: /\.(scss|css)$/,
//                 loader: 'style!css!sass',
//                 query: {
//                     limit: 10000
//                 }
//             },

           
//             {
//                 test: /\.js$/,
//                 loader: 'babel',
//                 exclude: /node_modules/
//             }
//         ]
//   },



//   babel: {
//     presets: ['es2015'],
//     plugins: ['transform-runtime']
//   }
// }

var webpack = require('webpack')

module.exports = {

  entry: ['D:/Workspaces/Eclipse/2.0-code/meadJohnsonBo/index.js'],

  // output: {
  //   path: __dirname + '/meadJohnson/dist/',
  //   publicPath: 'meadJohnson/dist/',
  //   filename: 'app.js'
  // },
  output: {
    path: 'D:/Workspaces/Eclipse/bbg/WebContent/build/',
    publicPath: 'WebContent/build/',
    filename: 'app.js'
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
                test: /\.scss$/,
                loader: 'style!css!sass',
                query: {
                    limit: 10000
                }
            }, {
              test: /.css$/,
              loader: 'style!css'
            },

            // 处理 *.js 等文件用babel-loader
            {
                test: /\.js$/,
                loader: 'babel',
                exclude: /node_modules/
            },
            {
                test: /\.(gif|jpg|png|woff|svg|eot|ttf)\??.*$/,
                loader: 'url',
                query: {
                    limit: 50000,
                    name: 'static/img/[name].[hash:7].[ext]'
                }
            }
        ]
  },
  vue: {
    loaders: {
      scss: 'vue-style!css!sass'
    }
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