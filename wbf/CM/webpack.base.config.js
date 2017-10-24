module.exports = {

  entry: ['./wbf/CM/src/index.js'],

  output: {
    path: 'D:/Workspaces/eclipse_jee/wmpo/WebContent/f/CM/build/',
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