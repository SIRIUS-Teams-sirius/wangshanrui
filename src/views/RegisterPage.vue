<template>
  <!-- 顶部导航栏 -->
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
        <button class="login-btn" @click="goToLogin">登录</button>
        <button class="register-btn" @click="goToRegister">注册</button>
      </div>
    </nav>


  <div class="w3l-signinform">
    <!-- container -->
    <div class="wrapper">
      <!-- main content -->
      <div class="w3l-form-info">
        <div class="w3_info">
          <h1>Welcome</h1>
          <p class="sub-para">Create your account</p>
          <h2>Register</h2>
          <form @submit.prevent="register">
            <div class="input-group">
              <span><i class="fa fa-user" aria-hidden="true"></i></span>
              <input type="text" v-model="username" placeholder="Username" required>
            </div>
            <div class="input-group">
              <span><i class="fa fa-envelope" aria-hidden="true"></i></span>
              <input type="email" v-model="email" placeholder="Email" required>
            </div>
            <div class="input-group two-groop">
              <span><i class="fa fa-key" aria-hidden="true"></i></span>
              <input type="password" v-model="password" placeholder="Password" required>
            </div>
            <div class="input-group two-groop">
              <span><i class="fa fa-key" aria-hidden="true"></i></span>
              <input type="password" v-model="confirmPassword" placeholder="Confirm Password" required>
            </div>
            <button class="btn btn-primary btn-block" type="submit">Register</button>
          </form>
          <p class="account">Already have an account? <a href="#login">Log In</a></p>
        </div>
      </div>
      <!-- //main content -->
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import { ref } from 'vue';
const router = useRouter();
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

// 定义表单数据
const username = ref('');
const email = ref('');
const password = ref('');
const confirmPassword = ref('');

// 注册方法
const register = () => {
  // 简单的表单验证
  if (password.value !== confirmPassword.value) {
    alert('Passwords do not match');
    return;
  }
  // 这里可以添加实际的注册逻辑，例如发送请求到后端
  console.log('Registering with:', {
    username: username.value,
    email: email.value,
    password: password.value
  });
};
</script>

<style scoped>
</style>