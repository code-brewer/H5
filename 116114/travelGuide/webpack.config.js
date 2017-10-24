// var webpack = require('webpack')

module.exports = {

  entry: ['./116114/travelGuide/index.js'],

  output: {
    path: 'E:/workspaces/travel/WebContent/src/guide/dist/',
    publicPath: 'dist/',
    filename: 'app.js'
  },
  resolve: {
    extensions: ['', '.js', '.vue', 'css', 'scss'],
  },
  module: {
        loaders: [
            {test: /\.vue$/, loader: 'vue', exclude: /node_modules/},
            { test: /\.css$/, loader: "style!css"},
            {test: /\.js$/, loader: 'babel', exclude: /node_modules/}
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
  options = options || {};
  function generateLoaders (loaders) {
    var sourceLoader = loaders.map(function (loader) {
      var extraParamChar;
      if (/\?/.test(loader)) {
        loader = loader.replace(/\?/, '-loader?');
        extraParamChar = '&';
      } else {
        loader = loader + '-loader';
        extraParamChar = '?';
      }
      return loader + (options.sourceMap ? extraParamChar + 'sourceMap' : '');
    }).join('!');

    if (options.extract) {
      return ExtractTextPlugin.extract('vue-style-loader', sourceLoader);
    } else {
      return ['vue-style-loader', sourceLoader].join('!');
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
  };
}