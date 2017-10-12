var utils = require('./utils')
var environment = require('../config/environment')
var isProduction = process.env.NODE_ENV === 'production'

module.exports = {
  loaders: utils.cssLoaders({
    sourceMap: isProduction
      ? environment.build.productionSourceMap
      : environment.dev.cssSourceMap,
    extract: isProduction
  }),
  transformToRequire: {
    video: 'src',
    source: 'src',
    img: 'src',
    image: 'xlink:href'
  }
};
