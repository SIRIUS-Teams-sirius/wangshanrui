<template>
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
      <!-- //container -->
      <!-- footer -->
      <div class="footer">
        <p>&copy; 2021 Gathering Register form. All Rights Reserved | <a target="_blank" href="http://www.mobanwang.com/" title="网页模板">网页模板</a></p>
      </div>
      <!-- footer -->
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  
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
  /* 可以根据需要添加一些样式调整 */
  </style>