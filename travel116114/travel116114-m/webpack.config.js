const resolve = require('path').resolve
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const url = require('url')
const publicPath = ''
const entries = {}
const chunks = []
const glob = require('glob')
glob.sync('./src/view/**/App.js').forEach(path => {
    const chunk = path.split('./src/view/')[1].split('/App.js')[0]
    entries[chunk] = path
    chunks.push(chunk)
})

const config = {
    entry: entries,
    output: {
        path: resolve(__dirname, 'D:/Workspaces/eclipse_mars/tourism/src/main/webapp/dist'),
        // path: resolve(__dirname, './dist'),

        filename: 'assets/js/[name].js',
        publicPath: './'

    },
    module: {
        rules: [{
            test: /\.vue$/,
            use: ['vue-loader']
        }, {
            test: /\.js$/,
            use: ['babel-loader'],
            exclude: /node_modules/
        }, {
            test: /\.css$/,
            use: ['style-loader', 'css-loader', 'postcss-loader']
        }, {
            test: /\.(png|jpg|jpeg|gif|eot|ttf|woff|woff2|svg|svgz)(\?.+)?$/,
            use: [{
                loader: 'url-loader',
                options: {
                    limit: 10000
                }
            }]
        }]
    },
    plugins: [
        new webpack.optimize.CommonsChunkPlugin({
            // names: ['vendor', 'manifest']
            name: 'manifest',
            filename: 'assets/js/vendors.js',
            chunks: chunks, // The constant chunks is used here
            minChunks: chunks.length
        }),
        //  new webpack.optimize.CommonsChunkPlugin({
        //     // names: ['vendor', 'manifest']
        //     name: 'manifest',
        //     filename: './assets/js/manifest.js',
        //     chunks: chunks, // The constant chunks is used here
        //     minChunks: chunks.length
        // }),
        
    ],
    resolve: {
        alias: {
            '~': resolve(__dirname, 'src')
        }
    },
    // devServer: {
    //     host: '127.0.0.1',
    //     port: 8010,
    //     proxy: {
    //         '/api/': {
    //             target: 'http://127.0.0.1:8080',
    //             changeOrigin: true,
    //             pathRewrite: {
    //                 '^/api': ''
    //             }
    //         }
    //     },
    //     historyApiFallback: {
    //         index: url.parse(options.dev ? '/assets/' : publicPath).pathname
    //     }
    // },
    // devtool: options.dev ? '#eval-source-map' : '#source-map'
}

glob.sync('./src/view/**/*.html').forEach(path => {
    const chunk = path.split('./src/view/')[1].split('/App.html')[0]
    const filename = chunk + '.html'
    const htmlConf = {
        filename: filename,
        template: path,
        inject: 'body',
        favicon: '',
        hash: process.env.NODE_ENV === 'production',
        // chunks: ['vendors', 'manifest', chunk]
        chunks: ['manifest',chunk]
    }
    config.plugins.push(new HtmlWebpackPlugin(htmlConf))
})

module.exports = config
if (process.env.NODE_ENV === 'production') {
    module.exports.devtool = '#source-map'
        // http://vue-loader.vuejs.org/en/workflow/production.html
    module.exports.plugins = (module.exports.plugins || []).concat([
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: '"production"'
            }
        }),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        })
    ])
}
