import { createApp } from 'vue'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css'
import locale from 'element-plus/es/locale/lang/zh-cn'

import vuetify from "./plugins/vuetify"
import router from './plugins/router'

import App from './App.vue'

import axios from "./http";

import VCalendar from 'v-calendar';
import 'v-calendar/style.css';

// import mockModule from "@/mock/index.js";
// 全局提示框组件,这个提示太垃圾了，用el自带的
// import notifyMessage from '@/components/notifyMessage/notifyMessageJs.js'

axios.defaults.baseURL = import.meta.env.VITE_API_BASEURI
axios.defaults.withCredentials = true

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
app.mount('#app')

app.config.globalProperties.$axios = axios;