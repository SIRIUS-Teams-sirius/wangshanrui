<template>
  <nav 
     class="navbar"
     :class="{ 'navbar-visible': isNavbarVisible }"
     @mouseenter="handleNavbarHover"
     @mouseleave="scheduleHideNavbar"
   >
     <div class="nav-left">
       <span class="nav-item" @click="goToHomePage">首页</span>
       <span 
         class="nav-item dropdown" 
         @mouseenter="showDropdown('dataDropdown')" 
         @mouseleave="hideDropdown('dataDropdown')"
       >
         数据模块
         <div class="dropdown-content" id="dataDropdown">
           <span class="dropdown-item" @click="goToAttackChart">攻击类型</span>
           <span class="dropdown-item" @click="goToConnectionType">连接类型</span>
           <span class="dropdown-item" @click="goToProtocolType">协议类型</span>
           <span class="dropdown-item" @click="goToServiceType">服务类型</span>
         </div>
       </span>
       <span class="nav-item" @click="goToFederatedLearning">联邦学习模块</span>
       <span class="nav-item" @click="goToDatascreenhome">检测模块</span>
     </div>
     <div class="nav-right">
       <button v-if="!userStore.isLoggedIn" class="login-btn" @click="goToLogin">登录</button>
       <button v-if="!userStore.isLoggedIn" class="register-btn" @click="goToRegister">注册</button>
       <button v-else class="logout-btn" @click="handleLogout">退出</button>
     </div>
   </nav>
 </template>
 
 <script setup lang="ts">
 import { ref, onMounted, onUnmounted } from 'vue';
 import { useRouter } from 'vue-router';
 import { useUserStore } from '@/stores/user';
 import { ElMessage } from 'element-plus';
 import { POST } from '@/api/api';
 import { throttle } from 'lodash-es';
 
 const router = useRouter();
 const userStore = useUserStore();
 
 // 导航栏显示控制
 const isNavbarVisible = ref(false);
 let hideTimer: number | null = null;
 
 // 配置参数
 const DETECTION_HEIGHT = 100;    // 顶部触发区域高度（像素）
 const HIDE_DELAY = 300;          // 隐藏延迟时间（毫秒）
 const THROTTLE_TIME = 50;        // 节流时间（毫秒）
 
 // 鼠标移动处理（节流）
 const handleMouseMove = throttle((event: MouseEvent) => {
   if (event.clientY < DETECTION_HEIGHT) {
     showNavbar();
   }
 }, THROTTLE_TIME);
 
 // 触摸事件处理
 const handleTouchStart = (event: TouchEvent) => {
   if (event.touches[0].clientY < DETECTION_HEIGHT) {
     showNavbar();
   }
 };
 
 // 显示导航栏
 const showNavbar = () => {
   isNavbarVisible.value = true;
   clearHideTimer();
 };
 
 // 计划隐藏导航栏
 const scheduleHideNavbar = () => {
   if (!hideTimer) {
     hideTimer = window.setTimeout(() => {
       isNavbarVisible.value = false;
       hideTimer = null;
     }, HIDE_DELAY);
   }
 };
 
 // 清除隐藏计时器
 const clearHideTimer = () => {
   if (hideTimer) {
     clearTimeout(hideTimer);
     hideTimer = null;
   }
 };
 
 // 导航栏悬停处理
 const handleNavbarHover = () => {
   showNavbar();
   clearHideTimer();
 };
 
 // 事件监听
 onMounted(() => {
   document.addEventListener('mousemove', handleMouseMove);
   document.addEventListener('touchstart', handleTouchStart);
 });
 
 onUnmounted(() => {
   document.removeEventListener('mousemove', handleMouseMove);
   document.removeEventListener('touchstart', handleTouchStart);
   clearHideTimer();
 });
 
 // 路由跳转方法（保持原有逻辑）
 const goToLogin = () => router.push('/login');
 const goToRegister = () => router.push('/register');
 const goToDatascreenhome = () => router.push('/index');
 const goToHomePage = () => router.push('/home');
 const goToFederatedLearning = () => router.push('/federatedlearning');
 
 
 // 其他方法保持不变
 const goToAttackChart = () => router.push('/dm_attackchart');
 const goToConnectionType = () => router.push('/dm_connectiontype');
 const goToProtocolType = () => router.push('/dm_protocoltype');
 const goToServiceType = () => router.push('/dm_servicetype');
 
 const showDropdown = (dropdownId: string) => {
   const dropdown = document.getElementById(dropdownId);
   if (dropdown) dropdown.style.display = 'block';
 };
 
 const hideDropdown = (dropdownId: string) => {
   const dropdown = document.getElementById(dropdownId);
   if (dropdown) dropdown.style.display = 'none';
 };
 
 const handleLogout = async () => {
   try {
     await POST('/user/logout', { username: userStore.username }, {
       headers: { Authorization: `Bearer ${userStore.token}` }
     });
     userStore.logout();
     router.push('/login');
     ElMessage.success('已安全退出');
   } catch (error) {
     console.error('退出失败:', error);
     ElMessage.error('退出失败，请重试');
   }
 };
 </script>