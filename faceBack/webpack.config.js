var webpack = require('webpack')
var path  = require('path');
module.exports = {
    // entry: ['E:/ce/2.0-code/juyouhui/index.js'],
    entry: [path.resolve(__dirname, './index.js')],
    output: {
        // path: path.resolve(__dirname, './dist'),
        // path: 'E:/ce/2.0-code/faceBack/dist',
        path: 'E:/ce/brow/WebContent/js',
        publicPath: './js/',
        // publicPath: './dist/',
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
                test: /png|jpe?g|gif/,
                loader: 'url',
                query: {
                    limit: 10000,
                    name: 'static/img/[name].[hash:7].[ext]'
                    // name: 'images/[name].[hash:7].[ext]'
                }
            },
            //  {
            //     test: /png|jpe?g|gif/,
            //     loader: 'file',
            //     query: {
            //         name: 'static/img/[name].[ext]'
            //     }
            // },
        ]
    },
    vue: {
        loaders: {
            scss: 'vue-style!css!sass'
        }
    },
  
    // plugins: [
    //    new webpack.optimize.UglifyJsPlugin({
    //         sourceMap: false,
    //         compress: {
    //             warnings: false
    //         }
    //     }),
    //     new webpack.optimize.UglifyJsPlugin({
    //       compress: { //取消警告
    //         warnings: false
    //       }
    //     })
    // ],

    babel: {
        presets: ['es2015'],
        plugins: ['transform-runtime']
    }
}
