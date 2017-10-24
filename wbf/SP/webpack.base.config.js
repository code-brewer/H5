module.exports = {

  entry: ['./wbf/SP/src/index.js'],

  output: {
    path: 'D:/Workspaces/eclipse_jee/wmpo/WebContent/f/SP/build/',
    publicPath: './build/',
    filename: 'build.js'
  },

  module: {
    loaders: [

      { test: /\.vue$/, loader: 'vue' },

      { test: /\.js$/, loader: 'babel', exclude: /node_modules/ }
    ]
  },

  babel: {
    presets: ['es2015'],
    plugins: ['transform-runtime']
  }
}