<template>
  <div class="login-form">
    <div class="login">
      <h2 class="login-title">邮箱注册</h2>
      <div class="demo-register">
        <Login ref="form" @on-submit="handleSubmit">
          <Email name="mail"/>
          <Captcha name="captcha"/>
          <Poptip trigger="focus" placement="right" width="240">
            <Password
                name="password"
                :rules="passwordRule"
                placeholder="至少6位密码，区分大小写"
                @on-change="handleChangePassword"
            />
            <template #content>
              <div class="demo-register-tip">
                <div class="demo-register-tip-title" :class="passwordTip.class">
                  强度：{{ passwordTip.strong }}
                </div>
                <Progress :percent="passwordTip.percent" hide-info :stroke-width="6" :stroke-color="passwordTip.color"/>
                <div class="demo-register-tip-desc">
                  请至少输入 6 个字符。请不要使用容易被猜到的密码。
                </div>
              </div>
            </template>
          </Poptip>
          <Password name="passwordConfirm" :rules="passwordConfirmRule" placeholder="确认密码"/>
          <Submit>注册</Submit>
        </Login>
      </div>
    </div>
  </div>
</template>
<script setup>
import {ref, computed} from 'vue';
import {Captcha, Email, Login, Password, Poptip, Submit} from 'view-ui-plus';

// Refs for reactive data
const passwordLen = ref(0);
const passwordRule = [
  {
    required: true,
    message: '密码不能为空！',
    trigger: 'change'
  },
  {
    min: 6,
    message: '密码不能少于6位！',
    trigger: 'change'
  }
];

const passwordConfirmRule = [
  {
    required: true,
    message: '确认密码不能为空！',
    trigger: 'change'
  },
  {
    validator: (rule, value, callback) => {
      if (value !== password.value) {
        callback(new Error('两次输入的密码不匹配！'));
      } else {
        callback();
      }
    },
    trigger: 'change'
  }
];

// Computed property for password strength tips
const passwordTip = computed(() => {
  let strong = '强';
  let className = 'strong';
  let percent = passwordLen.value > 10 ? 10 : passwordLen.value;
  let color = '#19be6b';

  if (passwordLen.value < 6) {
    strong = '太短';
    className = 'low';
    color = '#ed4014';
  } else if (passwordLen.value < 10) {
    strong = '中';
    className = 'medium';
    color = '#ff9900';
  }

  return {
    strong,
    class: 'demo-register-tip-' + (passwordLen.value < 6 ? 'low' : (passwordLen.value < 10 ? 'medium' : 'strong')),
    percent: percent * 10,
    color
  };
});

// Methods
const handleChangePassword = (val) => {
  passwordLen.value = val.length;
};

const handleSubmit = (valid, {mail, password}) => {
  debugger
  if (valid) {
    this.$Modal.info({
      title: '输入的内容如下：',
      content: 'mail: ' + mail + ' | password: ' + password
    });
  }
};
</script>
<style>
.demo-register {
  width: 400px;
  margin: 0 auto !important;
}

.demo-register .ivu-poptip, .demo-register .ivu-poptip-rel {
  display: block;
}

.demo-register-tip {
  text-align: left;
}

.demo-register-tip-low {
  color: #ed4014;
}

.demo-register-tip-medium {
  color: #ff9900;
}

.demo-register-tip-strong {
  color: #19be6b;
}

.demo-register-tip-title {
  font-size: 14px;
}

.demo-register-tip-desc {
  white-space: initial;
  font-size: 14px;
  margin-top: 6px;
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