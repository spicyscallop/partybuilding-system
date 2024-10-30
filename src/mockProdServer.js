//  mockProdServer.ts
import { createProdMockServer } from 'vite-plugin-mock/es/createProdMockServer'

// 逐一导入您的mock.js文件
// 如果使用vite.mock.config.js，只需直接导入文件
// 可以使用 import.meta.glob功能来进行全部导入
import index from '@/mock/index'
import index2 from '@/mock/indexDev'
export function setupProdMockServer() {
  createProdMockServer([...index,...index2])
}
