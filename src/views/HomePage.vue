<template>
  <div class="home-container">
    <!-- 中心内容 -->
    <div class="hero">
      <h1>联邦苍穹守卫</h1>
      <p>—— 基于联邦大模型的网络攻击检测平台 ——</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
const router = useRouter();
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