import { createRouter, createWebHistory, createWebHashHistory } from 'vue-router'
import type {RouteRecordRaw} from "vue-router"
import HomePage from '../views/HomePage.vue';
import LoginPage from '../views/LoginPage.vue';
import RegisterPage from '../views/RegisterPage.vue';
import DataModule_protocoltype from '@/views/DataModule_protocoltype.vue'
import DataModule_attackchart from '@/views/DataModule_attackchart.vue'
import DataModule_connectiontype from '@/views/DataModule_connectiontype.vue';
import DataModule_servicetype from '@/views/DataModule_servicetype.vue';
import FederatedLearning from '@/views/FederatedLearning.vue';

const routes: Array<RouteRecordRaw> = [
  { path: '/', redirect: '/home', },
  { path: '/home', component: HomePage },
  { path: '/login', component: LoginPage },
  { path: '/register', component: RegisterPage },
  { path: '/dm_protocoltype', component: DataModule_protocoltype },
  { path: '/dm_attackchart', component: DataModule_attackchart },
  { path: '/dm_connectiontype', component: DataModule_connectiontype },
  { path: '/dm_servicetype', component:DataModule_servicetype },
  { path: '/federatedlearning', component:FederatedLearning},
  {
    path: '/Datascreenhome',
    name: 'Datascreenhome',
    component: () => import('@/views/HomeView.vue'),
    children:[
      {
        path: '/index',
        name: 'index',
        component: () => import('@/views/index/index.vue'),
      }
    ]
  },
]
const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes,
})

router.beforeEach((to, from, next) => {
  next();
})

export default router
