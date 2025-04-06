<template>
  <div class="login-form">
    <div class="login">
      <h2 class="login-title">用户登录</h2>
      <div class="demo-login">
        <Login @on-submit="handleSubmit">
          <UserName name="username"/>
          <Password name="password"/>
          <div class="demo-auto-login">
            <Checkbox v-model="autoLogin" size="large">自动登录</Checkbox>
            <a>忘记密码</a>
          </div>
          <Submit/>
        </Login>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      autoLogin: true
    }
  },
  methods: {
    handleSubmit(valid, {username, password}) {
      if (valid) {
        this.$Modal.info({
          title: '输入的内容如下：',
          content: 'username: ' + username + ' | password: ' + password
        });
      }
    }
  }
}
</script>
<style>
.demo-login {
  width: 400px;
  margin: 0 auto !important;
}

.demo-auto-login {
  margin-bottom: 24px;
  text-align: left;
}

.demo-auto-login a {
  float: right;
}
</style>
<style scoped lang="scss">
.login-form {
  height: 80vh;
  display: flex;
  justify-content: center;
  align-items: center;

  .login {
    padding: 40px; /* 增加内边距 */
    background: linear-gradient(135deg, #2a2c36, #172e1f); /* 渐变背景 */
    width: 500px; /* 增加宽度 */
    border-radius: 10px; /* 增加圆角 */
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3); /* 更明显的阴影 */
    text-align: center;

    .login-title {
      color: #37ff18; /* 文字颜色 */
      font-size: 24px; /* 增加标题字体大小 */
      margin-bottom: 30px; /* 增加标题与输入框之间的间距 */
    }

    .error-message {
      color: red;
      margin-top: 10px;
      text-align: center;
    }

    .login-button {
      background: #37ff18;
      width: 100%; /* 按钮宽度与输入框一致 */
      font-size: 16px; /* 增加按钮字体大小 */
      color: #1a1a1a;
    }
  }
}
</style>
