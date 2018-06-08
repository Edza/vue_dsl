module.exports = {
  configureWebpack: {
    devtool: 'sourcemap', // for breakpoints
    resolve: {
      extensions: ['.ts'] // better component resolving
    }
  }
}
