import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import VChart from 'vue-echarts'
import ElementPlus from 'element-plus';
import '@/assets/css/main.scss'
import '@/assets/css/tailwind.css'
import '@/assets/css/navbar.css'
import 'element-plus/dist/index.css';

import {registerEcharts} from "@/plugins/echarts"

const app = createApp(App)
app.component('v-chart', VChart)
registerEcharts(app)
app.use(createPinia())
app.use(router)
app.use(ElementPlus);

app.mount('#app')
