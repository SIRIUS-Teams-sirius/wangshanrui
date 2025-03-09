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
//不使用mock 请注释掉
<<<<<<< HEAD
// import { mockXHR } from "@/mock/index";
// mockXHR()
=======
import { mockXHR } from "@/mock/index";
mockXHR()
>>>>>>> 8c3411a62192c21a04900b153cbe81c03fcab870

const app = createApp(App)
app.component('v-chart', VChart)
registerEcharts(app)
app.use(createPinia())
app.use(router)
app.use(ElementPlus);

app.mount('#app')
