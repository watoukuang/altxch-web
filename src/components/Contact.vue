<template>
  <!-- 右侧社交按钮 -->
  <div class="button-container">
    <div class="contact twitter" @click="handleTwitterClick">
      <Icon type="logo-twitter" size="25" color="white"/>
    </div>
    <div class="contact chat" @click="handleChatClick">
      <Icon type="ios-chatbubbles" size="25" color="white"/>
    </div>
  </div>
</template>
<script setup>
import {Icon} from "view-ui-plus";

// 社交按钮逻辑
const handleTwitterClick = () => window.open('https://x.com/watoukuang', '_blank');

const handleChatClick = () => window.open('https://t.me/thewatoukuang', '_blank');
</script>
<style scoped>
/* 右侧社交按钮样式 */
.button-container {
  position: fixed;
  top: 70%;
  right: 20px;
  display: flex;
  flex-direction: column;
  gap: 15px;
  z-index: 1000;
}

.contact {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  cursor: pointer;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.contact:hover {
  transform: translateY(-3px) scale(1.05);
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
}

/* Twitter 按钮专业配色 */
.twitter {
  background: linear-gradient(135deg, #1DA1F2, #0d8ecf);
}

.twitter:hover {
  background: linear-gradient(135deg, #0d8ecf, #1DA1F2);
}

/* 聊天按钮专业配色 */
.chat {
  background: linear-gradient(135deg, #25D366, #128C7E);
}
</style>