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

import axios from "./http";
app.config.globalProperties.$axios = axios;
app.mount('#app')

