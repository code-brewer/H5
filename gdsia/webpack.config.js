module.exports = {

  entry: ['./gdsia/index.js'],

  output: {
    path: 'D:/Workspaces/eclipse_jee/gdsia-ams/WebContent' + '/build/',
    publicPath: 'build/',
    filename: 'build.js'
  },

  module: {
    loaders: [

      { test: /\.vue$/, loader: 'vue' },

      { test: /\.js$/, loader: 'babel', exclude: /node_modules/ },
      { test: /\.css$/, loader: "style!css"}
    ]
  },

  babel: {
    presets: ['es2015'],
    plugins: ['transform-runtime']
  }
}