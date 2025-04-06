<template>
  <header class="header">
    <div class="logo-container">
      <img src="@/assets/images/logo.png" class="logo-img">
      <span class="logo-text">ALTXCH</span>
    </div>
    <div class="menu">
      <Menu
          mode="horizontal"
          class="nav-menu"
          :active-name="activeMenu"
          @on-select="handleMenuSelect"
      >
        <MenuItem
            v-for="item in menuItems"
            :key="item.key"
            :name="item.key"
            class="menu-item"
        >
          {{ item.label }}
        </MenuItem>
      </Menu>
    </div>
    <div class="auth-buttons">
      <Button type="default" class="register-btn" @click="toReg">
        注册
      </Button>
      <Button type="primary" class="login-btn" @click="toLogin">
        登陆
      </Button>
    </div>
  </header>
</template>

<script setup>
import {useRouter, useRoute} from "vue-router";
import {Button, Menu, MenuItem} from "view-ui-plus";
import {ref, watch} from "vue";

const router = useRouter();
const route = useRoute();

// 定义 menuItems
const menuItems = [
  {key: '1', label: '首页', path: '/'},
  {key: '2', label: '币币交易', path: '/exchange'},
  {key: '3', label: '个人中心', path: '/ucenter'},
];

// 定义 activeMenu
const activeMenu = ref('1');

// 监听路由变化
watch(() => route.path, (newPath) => {
  const item = menuItems.find(item => item.path === newPath || newPath.startsWith(item.path + '/'));
  if (item) {
    activeMenu.value = item.key;
  }
}, {immediate: true});

const handleMenuSelect = (key) => {
  const item = menuItems.find(item => item.key === key);
  if (!item) return;
  if (item.key === '2') {
    router.push(`${item.path}/btc_usdt`);
  } else {
    router.push(item.path);
  }
};

const toLogin = () => {
  router.push({
    name: 'Login',
  });
};

const toReg = () => {
  router.push({
    name: 'Reg',
  });
}
</script>

<style scoped>
.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 5px 30px;
  background: #172636;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
}

/* 优化后的logo部分样式 */
.logo-container {
  display: flex;
  align-items: center; /* 确保图片和文字垂直居中 */
  gap: 10px; /* 图片和文字间距 */
}

.logo-img {
  width: 50px;  /* 调整logo图片大小 */
  height: 50px;
  object-fit: contain; /* 保持图片比例 */
}

.logo-text {
  font-size: 20px;  /* 调整文字大小 */
  font-weight: bold;
  font-family: 'Arial', sans-serif;
  letter-spacing: 1px;
  color: #fff;
  margin-top: 2px; /* 微调文字垂直位置 */
}

.menu {
  flex-grow: 1;
  display: flex;
  justify-content: flex-start;
  margin-left: 20px;
  margin-right: 20px;
}

/* 移除菜单下划线 */
.nav-menu {
  background: transparent !important;
  border-bottom: none !important;
}

.nav-menu :deep(.ivu-menu-item) {
  color: #ffffff !important;
  font-size: 16px;
  border: none !important; /* 确保没有边框 */
}

.nav-menu :deep(.ivu-menu-item:hover) {
  background: transparent !important;
  color: #37ff18 !important;
}

.nav-menu :deep(.ivu-menu-item-active) {
  color: #37ff18 !important;
  border-bottom: none !important; /* 确保没有下划线 */
}

.nav-menu :deep(.ivu-menu-item-selected) {
  color: #37ff18 !important;
  border-bottom: none !important; /* 确保没有下划线 */
}

.ivu-menu-horizontal.ivu-menu-light:after {
  background: none !important;
}

.auth-buttons {
  display: flex;
  gap: 15px;
}

.register-btn {
  background: #4a90e2; /* 与网站风格一致的颜色 */
  border-radius: 5px;
  padding: 0 20px;
  color: white;
  border: none;
  transition: all 0.3s ease;
}

.register-btn:hover {
  opacity: 0.9;
  transform: translateY(-2px);
}

.login-btn {
  background: #37ff18; /* 与网站风格一致的颜色 */
  border-radius: 5px;
  padding: 0 20px;
  color: #fff; /* 字体颜色 */
  border: none;
  transition: all 0.3s ease;
}

.login-btn:hover {
  background: #28a745; /* 深绿色 */
  opacity: 0.9;
  transform: translateY(-2px);
}
</style>