const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave:false,
  devServer: {
      proxy: {
          '/api': {
              target: 'https://localhost:8080/',//接口的前缀
              // ws:true,//代理websocked
              changeOrigin:true,//虚拟的站点需要更管origin
              pathRewrite:{
                  '^/api':''//重写路径
              }
          }
      },
      host: 'localhost',
      port: 8080
      
  }
})
