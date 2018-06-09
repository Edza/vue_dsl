var WebpackNotifierPlugin = require('webpack-notifier')

module.exports = {
  configureWebpack: {
    devtool: 'sourcemap', // for breakpoints
    resolve: {
      extensions: ['.ts'] // better component resolving
    },
    plugins: [
      new WebpackNotifierPlugin(),
    ]
  }
}
