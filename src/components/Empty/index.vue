<template>
  <div class="empty-state">
    <img
        src="@/assets/svg/empty.svg"
        alt="暂无数据"
        class="empty-image"
    >
    <h3 class="empty-title">✨ 演示模式</h3>
    <p class="empty-description">
      后台服务未启动，功能受限
      <br>
      联系支持：watoukuang@gmail.com
    </p>
  </div>
</template>

<style scoped lang="scss">
.empty-state {
  padding: 40px 0;
  text-align: center;
  color: #666;

  .empty-image {
    width: 350px;
    opacity: 0.8;
    margin-bottom: 16px;
  }

  .empty-title {
    font-size: 18px;
    margin-bottom: 8px;
    color: yellow;
  }

  .empty-description {
    font-size: 14px;
    line-height: 1.6;
    color: #999;
  }
}

/* 暗黑模式适配 */
.dark {
  .empty-state {
    .empty-title {
      color: rgba(255, 255, 255, 0.85);
    }
    .empty-description {
      color: rgba(255, 255, 255, 0.45);
    }
  }
}
</style>