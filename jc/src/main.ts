import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import VChart from 'vue-echarts'
import '@/assets/css/main.scss'
import '@/assets/css/tailwind.css'
import '@/assets/css/navbar.css'

import {registerEcharts} from "@/plugins/echarts"
//不使用mock 请注释掉
import { mockXHR } from "@/mock/index";
mockXHR()

const app = createApp(App)
app.component('v-chart', VChart)
registerEcharts(app)
app.use(createPinia())
app.use(router)

app.mount('#app')
