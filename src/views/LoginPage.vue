<template>
<div class="w3l-signinform">
  <!-- container -->
  <div class="wrapper">
    <!-- main content -->
    <div class="w3l-form-info">
      <div class="w3_info">
        <div class="left-info">
          <h1>Welcome Back</h1>
          <p class="sub-para">Lorem ipsum dolor sit amet, consectetur adipiscing elit</p>
        </div>
        <div class="right-form">
          <h2>Log In</h2>
          <form @submit.prevent="onSubmit">
            <div class="input-group">
              <span><i class="fa fa-user" aria-hidden="true"></i></span>
              <input v-model="username" type="text" placeholder="username" required>
            </div>
            <div class="input-group two-groop">
              <span><i class="fa fa-key" aria-hidden="true"></i></span>
              <input v-model="password" type="password" placeholder="Password" required>
            </div>
            <div class="form-row bottom">
              <div class="form-check">
                <input v-model="rememberMe" type="checkbox" id="remenber" name="remenber" value="remenber">
                <label for="remenber"> Remember me?</label>
              </div>
              <a href="#url" class="forgot">Forgot password?</a>
            </div>
            <button class="btn btn-primary btn-block" type="submit">Log In</button>
          </form>

          <p class="account">Don't have an account? <a href="#register">Register</a></p>
        </div>
      </div>
    </div>
    <!-- //main content -->
  </div>
</div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { ElMessage, useGetDerivedNamespace } from 'element-plus';
import { POST } from '@/api/api';
import { StorageEnum } from "@/enums";
import { use } from 'echarts';
import { userInfo } from 'os';
import { useUserStore } from '@/stores/user';

const userStore = useUserStore();
const router = useRouter();
// 添加登录状态响应式变量
const isLoggedIn = ref(false);

// 初始化时检查登录状态
onMounted(() => {
  isLoggedIn.value = !!localStorage.getItem(StorageEnum.GB_TOKEN_STORE);
});

// 添加退出处理函数
const handleLogout = async () => {
  try {
    // 1. 调用退出接口
    await POST('/user/logout', {});
    
    // 2. 清除本地token
    localStorage.removeItem(StorageEnum.GB_TOKEN_STORE);
    
    // 3. 更新登录状态
    isLoggedIn.value = false;
    
    // 4. 跳转到登录页
    router.push('/login');
    
    ElMessage.success('已安全退出');
  } catch (error) {
    console.error('退出失败:', error);
    ElMessage.error('退出失败，请重试');
  }
};

// 表单数据
const username = ref('');
const password = ref('');
const rememberMe = ref(false);

// 登录提交逻辑
const onSubmit = async () => {
  console.log('[Debug] 开始提交表单'); // debug
  try {
    const res = await POST('/user/login', {
      username: username.value,
      password: password.value,
    });

    if (res.code === 200) {
      // 确保传递 username 和 token
      userStore.login(res.token, username.value); 
      router.push('/home');
    }
  } catch (error: any) {
    // 错误处理
    if (error.code === 401) {
      ElMessage.error(error.message || '用户名或密码错误');
    } else {
      ElMessage.error('网络请求失败，请检查连接');
    }
  }
};
</script>

<style scoped>
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
  background: url(@/assets/img/Login_RegisterBackground.jpg) no-repeat center;
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
  background-color: rgba(116, 85, 228, 0.65);
  content: "";
  position: absolute;
  top: 0;
  min-height: 100%;
  left: 0;
  right: 0;
  z-index: -1;
}

input[type="text"],
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
    flex-direction: column;
  }
  .left-info,
  .right-form {
    flex-basis: 100%;
    padding-right: 0;
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
/* 添加退出按钮样式 */
.logout-btn {
  background: #ff4d4f;
  color: white;
  padding: 8px 15px;
  border-radius: 4px;
  border: none;
  cursor: pointer;
  transition: background 0.3s;
}

.logout-btn:hover {
  background: #ff7875;
}
/** /Responsive **/
/*-- //form styling --*/
</style>