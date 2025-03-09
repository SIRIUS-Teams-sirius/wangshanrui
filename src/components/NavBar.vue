<template>
    <nav class="navbar">
      <div class="nav-left">
        <span class="nav-item active" @click="goToHomePage">首页</span>
        <span class="nav-item dropdown" @mouseenter="showDropdown('dataDropdown')" @mouseleave="hideDropdown('dataDropdown')">
          数据模块
          <div class="dropdown-content" id="dataDropdown">
            <span class="dropdown-item" @click="goToAttackChart">攻击类型</span>
            <span class="dropdown-item" @click="goToConnectionType">连接类型</span>
            <span class="dropdown-item" @click="goToProtocolType">协议类型</span>
            <span class="dropdown-item" @click="goToServiceType">服务类型</span>
          </div>
        </span>
        <span class="nav-item">联邦学习模块</span>
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
  import { useRouter } from 'vue-router';
  import { useUserStore } from '@/stores/user';
  import { ElMessage } from 'element-plus';
  import { POST } from '@/api/api';
  
  const router = useRouter();
  const userStore = useUserStore();
  const goToLogin = () => router.push('/login');
  const goToRegister = () => router.push('/register');
  const goToDatascreenhome = () => router.push('/index');
  const goToHomePage = () => router.push('/home');

  const goToAttackChart = () => router.push('/dm_attackchart');
  const goToConnectionType = () => router.push('/dm_connectiontype');
  const goToProtocolType = () => router.push('/dm_protocoltype');
  const goToServiceType = () => router.push('/dm_servicetype');

const showDropdown = (dropdownId: string) => {
  const dropdown = document.getElementById(dropdownId);
  if (dropdown) {
    dropdown.style.display = 'block';
  }
};

const hideDropdown = (dropdownId: string) => {
  const dropdown = document.getElementById(dropdownId);
  if (dropdown) {
    dropdown.style.display = 'none';
  }
};
  
const handleLogout = async () => {
  try {
    const response = await POST('/user/logout', {});
    console.log('Logout Response:', response); // 打印响应
    if (response.status === 200) { // 确保响应状态码为 200
      userStore.logout();
      router.push('/login');
      ElMessage.success('已安全退出');
    } else {
      ElMessage.error('退出失败，请重试');
    }
  } catch (error) {
    console.error('Logout Error:', error); // 打印错误信息
    ElMessage.error('退出失败，请重试');
  }
};
  </script>