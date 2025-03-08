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
          <h1>Welcome Back</h1>
          <p class="sub-para">Lorem ipsum dolor sit amet, consectetur adipiscing elit</p>
          <h2>Log In</h2>
          <form action="#" method="post">
            <div class="input-group">
              <span><i class="fa fa-user" aria-hidden="true"></i></span>
              <input type="email" placeholder="Email or Username" :required="true">
            </div>
            <div class="input-group two-groop">
              <span><i class="fa fa-key" aria-hidden="true"></i></span>
              <input type="password" placeholder="Password" :required="true">
            </div>
            <div class="form-row bottom">
              <div class="form-check">
                <input type="checkbox" id="remenber" name="remenber" value="remenber">
                <label for="remenber"> Remember me?</label>
              </div>
              <a href="#url" class="forgot">Forgot password?</a>
            </div>
            <button class="btn btn-primary btn-block" type="submit">Log In</button>
          </form>
          <p class="account">Don't have an account? <a href="#register">Register</a></p>
        </div>
      </div>
      <!-- //main content -->
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';

// 获取路由实例
const router = useRouter();

// 定义路由跳转方法
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

</script>

<style scoped>
</style>