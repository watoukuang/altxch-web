<template>
  <div class="banner-panel">
    <p class="banner-title">全球领先的开源交易所源码系统</p>
    <div class="warning-container">
      <p class="banner-warning">演示环境 | 功能仅供参考测试</p>
    </div>
  </div>
</template>

<script setup>
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700&display=swap');

/* 共用动画效果 */
@keyframes soft-glow {
  0%, 100% { opacity: 0.8; }
  50% { opacity: 1; }
}

.alt-container {
  width: 1200px;
  margin: 0 auto;
}

.banner-panel {
  background: #141e2b url('@/assets/images/banner.png') no-repeat center / cover;
  padding: 80px 0;
  position: relative;
  overflow: hidden;
  text-align: center; /* 确保内容居中 */
}

.banner-title {
  font-size: 48px;
  color: #00ffcc;
  letter-spacing: 6px;
  margin: 0 auto 20px; /* 添加下边距 */
  font-family: 'Orbitron', sans-serif;
  font-weight: 700;
  text-shadow: 0 0 10px rgba(0, 255, 204, 0.5);
  position: relative;
  display: inline-block;
}

.warning-container {
  width: 100%;
  display: flex;
  justify-content: center;
  margin-top: 20px;
}

.banner-warning {
  font-size: 18px; /* 调小字号更优雅 */
  color: #FFA726; /* 改为更友好的橙色 */
  letter-spacing: 1px;
  padding: 8px 25px;
  margin: 0;
  font-family: 'Orbitron', sans-serif;
  background: rgba(255, 167, 38, 0.1); /* 半透明背景 */
  border-radius: 20px;
  border: 1px solid rgba(255, 167, 38, 0.3);
  display: inline-block;
  animation: soft-glow 3s infinite;
  backdrop-filter: blur(5px); /* 毛玻璃效果 */
}

/* 移除之前的强烈动画效果 */
.swiper-container {
  max-height: 150px;
}

.carousel-content {
  margin-bottom: 15px;
}

.carousel-item {
  margin: 0;
}

.carousel-item:hover {
  opacity: 0.9;
  cursor: pointer;
}

.carousel-item img {
  max-width: 400px;
  transition: all 0.5s;
  width: 100%;
}

.carousel-item img:hover {
  transform: scale(1.05);
}
</style>