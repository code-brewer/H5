// var webpack = require('webpack')

module.exports = {

  entry: ['./index.js'],

  output: {
    // path: 'F:/Project/carserve/WebContent/src/m'+'/dist/',
    path: 'F:/Project/town/2.0-code/town/WebContent/src/m'+'/dist/',
    publicPath: './src/m/dist/',
    filename: 'app.js'
  },
  resolve: {
    extensions: ['', '.js', '.vue', 'css', 'scss'],
  },
  module: {
        loaders: [
            {test: /\.vue$/, loader: 'vue', exclude: /node_modules/},
            //
            // 处理 *.vue 等文件用vue-loader
             {
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
              }
            }
        ]
  },
  vue: {
    loaders: cssLoaders()
  },
  babel: {
    presets: ['es2015'],
    plugins: ['transform-runtime']
  }
}
function cssLoaders(options) {
  options = options || {}
  function generateLoaders (loaders) {
    var sourceLoader = loaders.map(function (loader) {
      var extraParamChar
      if (/\?/.test(loader)) {
        loader = loader.replace(/\?/, '-loader?')
        extraParamChar = '&'
      } else {
        loader = loader + '-loader'
        extraParamChar = '?'
      }
      return loader + (options.sourceMap ? extraParamChar + 'sourceMap' : '')
    }).join('!')

    if (options.extract) {
      return ExtractTextPlugin.extract('vue-style-loader', sourceLoader)
    } else {
      return ['vue-style-loader', sourceLoader].join('!')
    }
  }
  return {
    css: generateLoaders(['css']),
    postcss: generateLoaders(['css']),
    less: generateLoaders(['css', 'less']),
    sass: generateLoaders(['css', 'sass?indentedSyntax']),
    scss: generateLoaders(['css', 'sass']),
    stylus: generateLoaders(['css', 'stylus']),
    styl: generateLoaders(['css', 'stylus'])
  }
}