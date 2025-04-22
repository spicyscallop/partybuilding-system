import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import { viteMockServe } from 'vite-plugin-mock'
import vue from '@vitejs/plugin-vue'
import vuetify from 'vite-plugin-vuetify'
//详细版

// https://vitejs.dev/config/
export default defineConfig({
  //本地运行配置，以及反向代理配置
  server: {
    port: "9000",//端口
    // host: "localhost",//ip地址例如192.168.1.177
    open: false,//服务启动时自动在浏览器中打开应用
    // 热更新
    hmr: true,
    //设为 true 时若端口已被占用则会直接退出，而不是尝试下一个可用端口
    strictPort: false,
    //自定义代理规则
    proxy: {
      '/api': { // 匹配所有以 '/api'开头的请求路径
        target: 'http://localhost:8004/', // 初始本地后端接口路径
        // target: 'http://49.232.10.48:8004/', // 服务器上后端接口路径
        // target: 'http://192.168.1.102:8080/',
        rewrite: (path) => path.replace(/^\/api/, ''),
      }
    }
  },
  plugins: [
    vue(),
    vuetify({ autoImport: true, styles: { configFile: 'src/settings.scss' } }),
    viteMockServe({
      supportTs: false,//打开后，可以读取 ts 文件模块。 请注意，打开后将无法监视.js 文件
      localEnabled: true, // 开发打包开关 
      prodEnabled: true, // 生产打包开关 // 这样可以控制关闭mock的时候不让mock打包到最终代码内 
      injectCode: ` import { setupProdMockServer } from './mockProdServer'; setupProdMockServer(); `,
      logger: false, //是否在控制台显示请求日志
      mockPath: "./src/mock/"
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    }
  },
  build: {
    minify: 'terser', // 必须启用：terserOptions配置才会有效
    terserOptions: {
      compress: {
        // 生产环境时移除console.log调试代码
        drop_console: true,
        drop_debugger: true,
      }
    }
  },
})
