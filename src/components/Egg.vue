<template>
  <div class="easter-egg" @click="triggerEasterEgg">
    <div class="egg-ball" :class="{ 'animate': isAnimating }">
      <Icon type="ios-color-palette" size="20" color="white"/>
    </div>
    <div class="egg-message" v-if="showMessage">
      {{ eggMessages[currentMessage] }}
    </div>
  </div>
</template>
<script setup>
import {Icon} from "view-ui-plus";
import {ref} from "vue";

// 彩蛋逻辑
const isAnimating = ref(false);
const showMessage = ref(false);
const currentMessage = ref(0);
const eggMessages = ref([
  "🌈 惊喜每一天!",
  "👑 你是今天的幸运儿!"
]);

const triggerEasterEgg = () => {
  isAnimating.value = true;
  showMessage.value = true;

  // 切换不同消息
  currentMessage.value = (currentMessage.value + 1) % eggMessages.value.length;

  // 3秒后隐藏消息
  setTimeout(() => {
    showMessage.value = false;
  }, 3000);

  // 动画结束后重置状态
  setTimeout(() => {
    isAnimating.value = false;
  }, 1000);
};
</script>
<style scoped>
/* 彩蛋样式 */
.easter-egg {
  position: fixed;
  left: 20px;
  top: 80%;
  transform: translateY(-50%);
  z-index: 999;
  display: flex;
  align-items: center;
  gap: 10px;
}

.egg-ball {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: linear-gradient(135deg, #ff6b6b, #ffa3a3);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: 0 4px 15px rgba(255, 107, 107, 0.4);
  transition: all 0.3s ease;
  animation: float 3s ease-in-out infinite;
}

.egg-ball:hover {
  transform: scale(1.1);
  box-shadow: 0 6px 20px rgba(255, 107, 107, 0.6);
}

.egg-ball.animate {
  animation: bounce 0.5s ease;
}

.egg-message {
  padding: 8px 15px;
  background: rgba(255, 255, 255, 0.9);
  border-radius: 20px;
  color: #ff6b6b;
  font-weight: bold;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  animation: fadeIn 0.3s ease;
}
/* 响应式设计 */
@media (max-width: 768px) {
  .easter-egg {
    left: 10px;
  }

  .button-container {
    right: 10px;
  }

  .egg-ball, .contact {
    width: 45px;
    height: 45px;
  }
}
</style>