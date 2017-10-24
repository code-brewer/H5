var webpack = require('webpack')

module.exports = {

    entry: ['./index.js'],
    
    output: {
        path: 'F:/workspace/mgu/WebContent/build',
        publicPath: './build/',
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
            }, {
                test: /png|jpe?g|gif/,
                loader: 'url',
                query: {
                    limit: 10000,
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
    //压缩打包文件
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
