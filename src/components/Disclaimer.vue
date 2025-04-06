<template>
  <div class="disclaimer">
    <h2 class="title">⚠️ 免责声明与使用条款</h2>
    <h3>🔒 重要声明</h3>
    <h4>📜 代码用途限制</h4>
    <p>🚫 本项目开源代码仅供学习参考和技术研究，禁止用于任何非法用途。</p>
    <p>⛔ 严禁将本代码用于未经授权的商业运营或非法金融活动。</p>
    <p>⚖️ 法律合规要求：</p>
    <ul>
      <li>✅ 如需基于本代码搭建运营交易所，必须遵守所在国家/地区的金融监管法律法规。</li>
      <li>🕵️ 取得必要的金融业务许可和资质。</li>
      <li>🛡️ 实施完整的KYC/AML合规流程。</li>
    </ul>
    <h4>❌ 责任免除</h4>
    <p>开发者/代码贡献者不承担因以下情况导致的任何法律责任：</p>
    <ul>
      <li>⚠️ 代码被用于非法用途。</li>
      <li>⚠️ 未取得合法资质擅自运营。</li>
      <li>⚠️ 违反当地金融监管规定。</li>
    </ul>
    <h4>👤 使用者义务</h4>
    <p>使用本代码即表示您已充分理解并同意：</p>
    <ul>
      <li>⚠️ 自行承担所有使用风险。</li>
      <li>✅ 确保使用方式完全合法合规。</li>
      <li>🚨 如发现非法使用，有义务立即停止并举报。</li>
    </ul>
    <h4>💡 合规提示</h4>
    <p>我们强烈建议：</p>
    <ul>
      <li>🔹 在使用前咨询专业法律顾问。</li>
      <li>🔹 完整了解所在司法管辖区的数字货币监管政策。</li>
      <li>🔹 仅将代码用于合法授权的技术研究。</li>
    </ul>
    <p>❗ 注：任何违反上述条款的行为均与代码作者及贡献者无关，使用者需自行承担全部法律责任。</p>
  </div>
</template>

<script setup>
</script>

<style scoped>
.disclaimer {
  margin-top: 20px;
  margin-bottom: 20px;
  padding: 20px;
  background-color: #15232f; /* 新背景色 */
  border: 1px solid #15232f;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  font-family: 'Arial', sans-serif;
}

.title {
  text-align: center; /* 标题居中 */
  color: #d9534f; /* 主标题颜色 */
  margin-bottom: 15px;
}

.disclaimer h3 {
  color: #5bc0de; /* 次要标题颜色 */
  margin-bottom: 10px;
}

.disclaimer h4 {
  color: #5cb85c; /* 小标题颜色 */
  margin-top: 15px;
  margin-bottom: 8px;
}

.disclaimer p, .disclaimer ul {
  color: #f0f0f0; /* 正文字体颜色 */
  line-height: 1.6;
}

.disclaimer ul {
  margin-left: 20px;
}

.disclaimer li {
  margin-bottom: 5px;
  padding-left: 10px; /* 列表项左侧缩进 */
}

.disclaimer li::marker {
  color: #5bc0de; /* 列表项标记颜色 */
}
</style>