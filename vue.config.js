
module.exports = {
  // 修改vant默认主题
  css: {
    loaderOptions: {
      less: {
        modifyVars: {
          blue: 'rgb(243, 72, 72)'
        }
      }
    }
  },
  configureWebpack: (config) => {
    // config是当前vue-cli的所有webpack配置
    if (process.env.NODE_ENV === 'production') {
      // 在生产环境，移除所有console
      config.optimization.minimizer[0].options.terserOptions.compress.drop_console = true
    }
  }
}
