// see http://vuejs-templates.github.io/webpack for documentation.
var path = require('path')

module.exports = {
  build: {
    env: require('./prod.env'),
    index: path.resolve('E:/projects/ap/2.0-code/ams2/WebContent', './template.jsp'),
    assetsRoot: path.resolve('E:/projects/ap/2.0-code/ams2/WebContent', './dist'),
    assetsTemplatesRoot: path.resolve('E:/projects/ap/2.0-code/ams2/WebContent', './templates'),
    assetsAusRoot: path.resolve('E:/projects/ap/2.0-code/aus2/WebContent', './templates'),
    assetsSubDirectory: 'static',
    assetsPublicPath: './dist/',
    assetsTemplatesPublicPath: './templates/',
    assetsAusPublicPath: './templates/',
    productionSourceMap: true,
    // Gzip off by default as many popular static hosts such as
    // Surge or Netlify already gzip all static assets for you.
    // Before setting to `true`, make sure to:
    // npm install --save-dev compression-webpack-plugin
    productionGzip: false,
    productionGzipExtensions: ['js', 'css']
  },
  dev: {
    env: require('./dev.env'),
    port: 8080,
    proxyTable: {}
  }
}
