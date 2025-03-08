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
          <div class="left-info">
            <h1>Create an Account</h1>
            <p class="sub-para">Please fill in the following information to register.</p>
          </div>
          <div class="right-form">
            <h2>Register</h2>
            <form @submit.prevent="onSubmit">
              <div class="input-group">
                <span><i class="fa fa-user" aria-hidden="true"></i></span>
                <input v-model="username" type="text" placeholder="Username" required>
              </div>
              <div class="input-group two-groop">
                <span><i class="fa fa-key" aria-hidden="true"></i></span>
                <input v-model="password" type="password" placeholder="Password" required>
              </div>
              <div class="input-group two-groop">
                <span><i class="fa fa-key" aria-hidden="true"></i></span>
                <input v-model="confirmPassword" type="password" placeholder="Confirm Password" required>
              </div>
              <div class="input-group two-groop">
                <span><i class="fa fa-map-marker" aria-hidden="true"></i></span>
                <input v-model="address" type="text" placeholder="Address" required>
              </div>
              <div class="input-group two-groop">
                <span><i class="fa fa-tags" aria-hidden="true"></i></span>
                <input v-model="type" type="text" placeholder="Type" required>
              </div>
              <div class="input-group two-groop">
                <span><i class="fa fa-user-secret" aria-hidden="true"></i></span>
                <input v-model="role" type="text" placeholder="Role" required>
              </div>
              <div class="input-group two-groop">
                <span><i class="fa fa-phone" aria-hidden="true"></i></span>
                <input v-model="contact" type="text" placeholder="Contact" required>
              </div>
              <button class="btn btn-primary btn-block" type="submit">Register</button>
            </form>

            <p class="account">Already have an account? <a href="#login">Log In</a></p>
          </div>
        </div>
      </div>
      <!-- //main content -->
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
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

import { StorageEnum } from "@/enums";
import { ElMessage } from 'element-plus';
import { POST } from '@/api/api';

// 表单数据
const username = ref('');
const password = ref('');
const confirmPassword = ref('');
const address = ref('');
const type = ref('');
const role = ref('');
const contact = ref('');

// 处理表单提交
const onSubmit = async () => {
  try {
    // 前端基础验证
    if (password.value !== confirmPassword.value) {
      ElMessage.error('两次输入的密码不一致');
      return;
    }

    // 调用注册接口
    const res = await POST('/user/register', {
      username: username.value,
      password: password.value,
      address: address.value,
      type: type.value,
      role: role.value,
      contact: contact.value
    });

    // 处理响应
    if (res.code === 200) {
      ElMessage.success('注册成功');
      router.push('/login'); 
    } else {
      ElMessage.error(res.message || '注册失败');
    }
  } catch (error: any) {
    // 错误处理
    if (error.response?.data?.code === 400) {
      ElMessage.error(error.response.data.message || '请求参数错误');
    } else if (error.code === 401) {
      ElMessage.error('认证失败');
    } else {
      ElMessage.error('网络请求失败，请检查连接');
    }
  }
};
</script>

<style scoped>
/* 样式代码与登录界面的样式基本相同，可直接复用 */
/* reset code */
html {
  scroll-behavior: smooth;
}

body,
html {
  margin: 0;
  padding: 0;
  color: #585858;
}

* {
  box-sizing: border-box;
  font-family: 'Kumbh Sans', sans-serif;
}

/*  wrapper */
.wrapper {
  width: 100%;
  padding-right: 15px;
  padding-left: 15px;
  margin-right: auto;
  margin-left: auto;
}

@media (min-width: 576px) {
 .wrapper {
    max-width: 540px;
  }
}

@media (min-width: 768px) {
 .wrapper {
    max-width: 720px;
  }
}

@media (min-width: 992px) {
 .wrapper {
    max-width: 960px;
  }
}

@media (min-width: 1200px) {
 .wrapper {
    max-width: 1140px;
  }
}

/*  /wrapper */

.d-grid {
  display: grid;
}

button,
input,
select {
  -webkit-appearance: none;
  outline: none;
}

button,
.btn,
select {
  cursor: pointer;
}

a {
  text-decoration: none;
}

h1,
h2,
h3,
h4,
h5,
h6,
p,
ul,
ol {
  margin: 0;
  padding: 0;
}

body {
  background: #f1f1f1;
  margin: 0;
  padding: 0;
}

form,
fieldset {
  border: 0;
  padding: 0;
  margin: 0;
}

img {
  max-width: 100%;
}

/*-- //Reset-Code --*/

/*-- form styling --*/
.w3l-form-info {
  padding-top: 2em;
}
.w3l-signinform {
  padding: 40px 40px;
  min-height: 100vh;
  background: url(../images/1.jpg) no-repeat center;
  background-size: cover;
  -webkit-background-size: cover;
  -o-background-size: cover;
  -moz-background-size: cover;
  -ms-background-size: cover;
  position: relative;
  z-index: 1;
  align-items: center;
}
.w3l-signinform::before {
  background-color: rgb(76 2 27 / 65%);
  content: "";
  position: absolute;
  top: 0;
  min-height: 100%;
  left: 0;
  right: 0;
  z-index: -1;
}
input[type="text"],
input[type="email"],
input[type="password"] {
  font-size: 17px;
  font-weight: 500;
  color: #fff;
  text-align: left;
  padding: 18px 18px 20px 42px;
  width: 100%;
  display: inline-block;
  box-sizing: border-box;
  border: none;
  outline: none;
  background: transparent;
  letter-spacing: 0.5px;
}
.input-group {
  /* margin-bottom: 25px; */
  padding: 0px 0px;
  position: relative;
  border: 1px solid #fff;
  border-radius: 6px;
  -webkit-border-radius: 6px;
  -moz-border-radius: 6px;
  -ms-border-radius: 6px;
  -o-border-radius: 6px;
  border-bottom-left-radius: 0px;
  border-bottom-right-radius: 0;
}
.input-group.two-groop {
  border-top: none;
  margin-bottom: 30px;
  border-radius: 6px;
  -webkit-border-radius: 6px;
  -moz-border-radius: 6px;
  -ms-border-radius: 6px;
  -o-border-radius: 6px;
  border-top-left-radius: 0px;
  border-top-right-radius: 0;
}
.btn-block {
  display: block;
  width: 50%;
  margin: 0 auto;
}

.btn:active {
  outline: none;
}

.btn-primary {
  color: #232005;
  background-color: #ffd900;
  margin-top: 30px;
  outline: none;
  width: 100%;
  padding: 15px 15px;
  cursor: pointer;
  font-size: 18px;
  font-weight: 600;
  border-radius: 6px;
  -webkit-border-radius: 6px;
  -moz-border-radius: 6px;
  -ms-border-radius: 6px;
  -o-border-radius: 6px;
  border: none;
  text-transform: capitalize;
}

.btn-primary:hover {
  background-color: #eac803;
}

.form-row.bottom {
  display: flex;
  justify-content: space-between;
}

.form-row .form-check input[type="checkbox"] {
  display: none;
}

.form-row .form-check input[type="checkbox"] + label:before {
  border-radius: 3px;
  border: 1px solid #e2e2e2;
  color: transparent;
  content: "\2714";
  display: inline-block;
  height: 18px;
  margin-right: 5px;
  transition: 0.2s;
  vertical-align: inherit;
  width: 18px;
  text-align: center;
  line-height: 20px;
}

.form-row .form-check input[type="checkbox"]:checked + label:before {
  background-color: #ffd900;
  border-color: #ffd900;
  color: #232005;
}

.form-row .form-check input[type="checkbox"] + label {
  cursor: pointer;
  color: #fff;
}

.w3_info h2 {
  display: inline-block;
  font-size: 24px;
  line-height: 35px;
  margin-bottom: 20px;
  font-weight: 600;
  color: #fff;
}

.w3_info h4 {
  display: inline-block;
  font-size: 15px;
  padding: 8px 0px;
  color: #444;
  text-transform: capitalize;
}
h1 {
  font-size: 36px;
  font-weight: 600;
  color: #fff;
  margin-bottom: 0.4em;
  line-height: 40px;
}
.w3_info {
  padding: 1em 1em;
  background: transparent;
  max-width: 800px;
  display: flex;
  justify-content: space-between;
  margin: 0 auto;
}

.left-info {
  font-size:20px;
  flex-basis: 80%;
  padding-right: 20px;
  padding-top: 20px;
}

.right-form {
  flex-basis: 60%;
}

.w3_info p {
  padding-bottom: 30px;
  text-align: center;
}
.w3_info p.sub-para {
  padding-bottom: 40px;
  text-align: left;
  color: #fff;
  opacity: 0.9;
  line-height: 28px;
}
p.account,
p.account a {
  text-align: center;
  padding-top: 20px;
  padding-bottom: 0px;
  font-size: 16px;
  color: #fff;
  opacity: 0.9;
}

p.account a {
  color: #ffd900;
}

p.account a:hover {
  text-decoration: underline;
}

a.forgot {
  color: #ffeb3b;
  margin-top: 2px;
  opacity: 0.8;
}

a.forgot:hover {
  text-decoration: underline;
}

h3.w3ls {
  margin: 10px 0px;
  padding-left: 60px;
}

h3.agileits {
  padding-left: 10px;
}

.container {
  max-width: 890px;
  margin: 0 auto;
}

.input-group i {
  font-size: 16px;
  vertical-align: middle;
  box-sizing: border-box;
  float: left;
  width: 8%;
  margin-top: 13px;
  text-align: center;
  color: #fff;
  position: absolute;
  left: 8px;
  top: 6px;
}

h5 {
  text-align: center;
  margin: 10px 0px;
  font-size: 15px;
  font-weight: 600;
  color: #000;
}
.footer {
  padding-top: 3em;
}
.footer p {
  text-align: center;
  font-size: 17px;
  line-height: 28px;
  color: #fff;
  opacity: 0.9;
}

.footer p a {
  color: #ffd900;
}

.footer p a:hover {
  text-decoration: underline;
}

p.continue {
  margin-top: 25px;
  padding: 0;
  margin-bottom: 20px;
  color: #fff;
}

p.continue span {
  position: relative;
}

p.continue span:before {
  position: absolute;
  content: "";
  height: 1px;
  background: #fff;
  width: 89%;
  left: -100%;
  top: 5px;
}

p.continue span:after {
  position: absolute;
  content: "";
  height: 1px;
  background: #fff;
  width: 89%;
  right: -100%;
  top: 5px;
}

::-webkit-input-placeholder {
  /* Edge */
  color: #fff;
}

:-ms-input-placeholder {
  /* Internet Explorer 10-11 */
  color: #fff;
}

::placeholder {
  color: #fff;
}

/** Responsive **/

@media screen and (max-width: 1024px) {
 .left_grid_info h3 {
    font-size: 2em;
  }
}

@media screen and (max-width: 991px) {
 .w3_info h2 {
    font-size: 24px;
  }

  h1 {
    font-size: 35px;
  }
}

@media screen and (max-width: 900px) {
 .left_grid_info h4 {
    font-size: 1em;
  }
}

@media screen and (max-width: 800px) {
 .w3_info h2 {
    font-size: 23px;
  }
}

@media screen and (max-width: 767px) {
 .w3_info {
    margin-right: auto;
  }
}

@media screen and (max-width: 736px) {
 .w3_info h2 {
    font-size: 22px;
  }
}

@media screen and (max-width: 667px) {
 .w3l-form-info {
    margin: 20px 0 30px;
  }
}

@media screen and (max-width: 640px) {
  h1 {
    font-size: 37px;
  }
}

@media screen and (max-width: 568px) {
 .w3l_form {
    padding: 0em;
  }
  h1 {
    font-size: 34px;
  }
 .w3_info {
    padding: 0;
  }
}

@media screen and (max-width: 415px) {
  h1 {
    font-size: 32px;
  }
 .left_grid_info p {
    font-size: 13px;
  }
 .w3l-signinform {
    padding: 40px 20px;
  }
}

@media screen and (max-width: 384px) {
 .w3l-signinform {
    padding: 30px 15px;
  }
 .social-login {
    grid-auto-flow: row;
  }
}

@media screen and (max-width: 375px) {
 .left_grid_info h3 {
    font-size: 1.5em;
  }

 .form-row.bottom {
    flex-direction: column;
  }

  a.forgot {
    margin-top: 17px;
  }
}

@media screen and (max-width: 320px) {
  h1 {
    font-size: 25px;
  }

 .w3_info h2 {
    font-size: 18px;
  }

 .btn-primary {
    padding: 13px 12px;
    font-size: 13px;
  }

  input[type="text"],
  input[type="email"],
  input[type="password"] {
    font-size: 13px;
  }

 .footer p {
    font-size: 13px;
  }

 .footer p a {
    font-size: 13px;
  }
}

/** /Responsive **/

/*-- //form styling --*/
</style>