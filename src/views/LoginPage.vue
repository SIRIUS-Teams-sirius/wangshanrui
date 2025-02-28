<template>
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
                <input type="email" placeholder="Email or Username" required="">
              </div>
              <div class="input-group two-groop">
                <span><i class="fa fa-key" aria-hidden="true"></i></span>
                <input type="password" placeholder="Password" required="">
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
  
  <script setup>
  // 这里可以添加组件的逻辑，例如表单提交处理等
  </script>
  
  <style scoped>
  /* 这里可以将原有的 CSS 样式复制过来 */
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
  
  h1,h2,h3,h4,h5,h6,p,ul,ol {
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
    background: url('@/assets/img/loginbeijing.jpg') no-repeat center;
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
    background-color: rgba(69, 100, 212, 0.65);
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
    letter-spacing: .5px;
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
    /* 这里可能需要补充 .btn-primary 的样式 */
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
    max-width: 400px;
    display: grid;
    margin-left: auto;
  }
  
  .left_grid_info {
    padding: 6em 0;
  }
  .w3l_form {
    padding: 0px;
    flex-basis: 50%;
    -webkit-flex-basis: 50%;
    background: #dad1f8;
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
  </style>