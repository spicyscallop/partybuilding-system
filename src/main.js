import { createApp } from 'vue'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css'
import locale from 'element-plus/es/locale/lang/zh-cn'

import vuetify from "./plugins/vuetify"
import router from './plugins/router'

import App from './App.vue'
import VCalendar from 'v-calendar';
import 'v-calendar/style.css';

import Echarts from 'vue-echarts'
import * as echarts from 'echarts'

export const app = createApp(App)
const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

app.use(ElementPlus, { locale });
app.use(pinia)
app.use(router)
app.use(vuetify)
app.use(VCalendar, {})
// 全局使用 Element Plus
app.use(ElementPlus);
app.component('v-chart', Echarts)

// 全局挂载 echarts
app.config.globalProperties.$echarts = echarts

import axios from "./http";
app.config.globalProperties.$axios = axios;
app.mount('#app')

