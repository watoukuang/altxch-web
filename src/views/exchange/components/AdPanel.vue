<template>
  <Card class="ad-card">
    <div class="ad-content">
      <a class="ad-description">WaTouKuang</a>
      <span style="color: #1a1a1a">&nbsp;赞助&nbsp;</span>
    </div>
  </Card>
</template>

<script>
export default {
  name: 'AdCard',
}
</script>

<style>
.ad-card {
  margin-bottom: 10px;
  border: 1px solid #e0e0e0; /* 边框 */
  border-radius: 8px; /* 圆角 */
  background-color: #f9f9f9; /* 背景颜色 */
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); /* 阴影 */
  transition: transform 0.2s; /* 动画效果 */
  text-align: center; /* 内容居中 */
  max-height: 80px;
}

.ad-card:hover {
  transform: scale(1.02); /* 悬停放大效果 */
}

.ad-description {
  font-size: 24px; /* 字体大小 */
  font-weight: bold; /* 加粗 */
  background: linear-gradient(90deg, #00ff00, #008000); /* 渐变绿色 */
  -webkit-background-clip: text; /* 文字背景裁剪 */
  color: transparent; /* 文字颜色透明 */
  text-decoration: none; /* 去掉下划线 */
  transition: color 0.3s; /* 字体颜色过渡效果 */
}

.ad-description:hover {
  color: #005700; /* 悬停时改变颜色 */
}
</style>