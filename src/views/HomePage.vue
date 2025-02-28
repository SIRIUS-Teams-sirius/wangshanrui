<template>
    <div class="home-container">
      <!-- 顶部导航栏 -->
      <nav class="navbar">
        <div class="nav-left">
          <span class="nav-item active">首页</span>
          <span class="nav-item">项目介绍</span>
          <span class="nav-item">数据模块</span>
          <span class="nav-item">联邦学习模块</span>
          <span class="nav-item">检测模块</span>
        </div>
        <div class="nav-right">
          <button class="login-btn" @click="goToLogin">登录</button>
          <button class="register-btn" @click="goToRegister">注册</button>
        </div>
      </nav>
  
      <!-- 中心内容 -->
      <div class="hero">
        <h1>联邦苍穹守卫</h1>
        <p>—— 基于联邦大模型的网络攻击检测平台 ——</p>
      </div>
    </div>
  </template>
  
  <script lang="ts">
  import { useRouter } from 'vue-router';
  
  export default {
    name: 'HomeView',
    setup() {
      const router = useRouter();
      return {
        goToLogin: () => router.push('/login'),
        goToRegister: () => router.push('/register')
      };
    },
  };
  </script>
  
  <style scoped>
  /* 整体页面样式 */
  html, body {
    margin: 0;
    padding: 0;
    height: 100%;
    overflow: hidden;
  }
  
  .home-container {
    width: 100vw;
    height: 100vh;
    background: url('@/assets/img/shouyeibeijing.jpg') no-repeat center center;
    background-size: cover;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-attachment: fixed;
    overflow: hidden;
  }
  
  /* 导航栏 */
  .navbar {
    width: 100vw; /* 使用视口宽度单位，确保和页面同宽 */
    position: fixed;
    top: 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.5vh 1vw;
    background: rgba(0, 0, 0, 0.8);
    z-index: 10;
    box-sizing: border-box;
    flex-wrap: wrap;
  }
  
  /* 左侧导航 */
  .nav-left {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    flex: 1;
  }
  
  .nav-item {
    color: white;
    cursor: pointer;
    padding: 0.2vh 0.3vw; /* 减小内边距 */
    border-radius: 0.15vh; /* 减小圆角半径 */
    transition: all 0.3s ease;
    white-space: nowrap;
    margin-right: 0.2vw; /* 减小间距 */
    font-size: 1.4vh; /* 减小字体大小 */
    flex: 0 0 auto;
  }
  
  .nav-item:hover,
  .active {
    background-color: #007bff;
  }
  
  /* 右侧按钮 */
  .nav-right {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
  }
  
  .login-btn,
  .register-btn {
    padding: 0.2vh 0.4vw; /* 减小内边距 */
    border: none;
    border-radius: 0.3vh; /* 减小圆角半径 */
    cursor: pointer;
    transition: 0.3s;
    margin-left: 0.2vw; /* 减小间距 */
    font-size: 1.2vh; /* 减小字体大小 */
    flex: 0 0 auto;
  }
  
  .login-btn {
    background: black;
    color: white;
  }
  
  .register-btn {
    background: #007bff;
    color: white;
  }
  
  .login-btn:hover {
    background: white;
    color: black;
  }
  
  .register-btn:hover {
    background: #0056b3;
  }
  
  /* 主页中心内容 */
  .hero {
    text-align: center;
    color: white;
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 0 1vw; /* 减小内边距 */
  }
  
  .hero h1 {
    font-size: 4vh; /* 减小字体大小 */
    font-weight: bold;
    text-shadow: 0.1vh 0.1vh 0.2vh rgba(0, 0, 0, 0.7); /* 减小阴影尺寸 */
  }
  
  .hero p {
    font-size: 1.6vh; /* 减小字体大小 */
    margin-top: 0.8vh; /* 减小外边距 */
    opacity: 0.8;
    text-shadow: 0.1vh 0.1vh 0.2vh rgba(0, 0, 0, 0.7); /* 减小阴影尺寸 */
  }
  
  /* 小屏幕设备 */
  @media (max-width: 48em) {
   .hero h1 {
      font-size: 3vh;
    }
  
   .hero p {
      font-size: 1.2vh;
    }
  
   .navbar {
      flex-direction: column;
      padding: 0.3vh;
    }
  
   .nav-left {
      flex-direction: column;
      gap: 0.2vh;
    }
  
   .nav-right {
      margin-top: 0.3vh;
    }
  
   .login-btn,
   .register-btn {
      width: 100%;
      margin-bottom: 0.2vh;
    }
  }
  
  /* 中等屏幕设备 */
  @media (min-width: 48.0625em) and (max-width: 74.9375em) {
   .hero h1 {
      font-size: 5vh;
    }
  
   .hero p {
      font-size: 2vh;
    }
  
   .navbar {
      padding: 0.8vh 3vw;
    }
  }
  
  /* 大屏幕设备 */
  @media (min-width: 75em) {
   .navbar {
      padding: 1vh 6vw;
    }
  
   .hero h1 {
      font-size: 6vh;
    }
  
   .hero p {
      font-size: 2.5vh;
    }
  }
  </style>