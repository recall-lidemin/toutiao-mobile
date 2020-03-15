module.exports = {
  plugins: {
    // 给css样式自动加前缀
    autoprefixer: {},
    'postcss-pxtorem': {
      rootValue: 37.5, // rem适配基准值
      propList: ['*'] // 所有文件都进行rem适配
    }
  }
}
