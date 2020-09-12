//这个里头是写那个配置信息的，比如那个路径问题，到时候会和那些隐藏起来的公共配置合并
module.exports = {
  configureWebpack: {
    resolve: {
      alias: {//alias是配置别名的
        'assets': '@/assets',
        'common': '@/common',
        'components': '@/components',
        'network': '@/network',
        'views': '@/views'
      }
    }
  }
}