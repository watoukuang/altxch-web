<template>
  <div class="market-container">
    <div class="table-wrapper">
      <a-table
          :columns="columns"
          :data="dataSource"
          class="transparent-table"
          :loading="loading"
      >
        <template #action="{ row, index }">
          <a @click="toExchange(row.symbol)" class="trade-btn">🔥&nbsp;交易</a>
        </template>
        <!-- 自定义空状态插槽 -->
        <template #emptyText>
          <Empty />
        </template>
      </a-table>
    </div>

    <div class="advertisement">
      <h1>WaTouKuang</h1>
      <p>加入我们，一起探索数字货币未来！</p>
      <button class="cta-button" @click="toWatouKuang">点击进入</button>
    </div>
    <Disclaimer/>
  </div>
</template>

<script setup>
import {ref} from "vue";
import {reqListSymbols} from "@/service/exchange.js";
import router from "@/router/index.js";
import Empty from "../../../components/Empty/index.vue";
import Disclaimer from "../../../components/Disclaimer.vue";

const loading = ref(false);
const columns = ref([
  {
    title: '币种',
    key: 'symbol',
    align: 'center',
    className: 'text-center',
    width: 150,
    fixed: 'left'
  },
  {
    title: '最新价',
    key: 'price',
    align: 'center',
    className: 'text-center',
  },
  {
    title: '24h涨跌',
    key: 'rose',
    align: 'center',
    className: 'text-center',
    render: (h, {row}) => {
      const isPositive = parseFloat(row.rose) >= 0;
      return h('span', {
        style: {
          color: isPositive ? '#00ff9d' : '#ff4d4f'
        }
      }, `${isPositive ? '+' : ''}${row.rose}%`);
    }
  },
  {
    title: '24h最高价',
    key: 'high',
    align: 'center',
    className: 'text-center',
  },
  {
    title: '24h最低价',
    key: 'low',
    align: 'center',
    className: 'text-center',
  },
  {
    title: '交易数量',
    key: 'volume',
    align: 'center',
    className: 'text-center',
  },
  {
    title: '操作',
    slot: 'action',
    align: 'center',
    className: 'text-center',
    fixed: 'right'
  }
]);

const dataSource = ref([]);

const toExchange = (symbol) => {
  const routePair = symbol.replace('/', '_').toLowerCase(); // 转换为小写
  router.push({
    name: 'Exchange',  // 确保使用正确的路由名称
    params: {pair: routePair}
  });
};

const toWatouKuang = () => window.location.href = "https://watoukuang.com";
const listSymbols = async () => {
  loading.value = true;
  try {
    const {code, data} = await reqListSymbols();
    if (code === 200) {
      dataSource.value = data.map(item => ({
        ...item,
        rose: (Math.random() * 10 * (Math.random() > 0.5 ? 1 : -1)).toFixed(2)
      }));
    }
  } catch (error) {
    // Silently handle the error or show a user-friendly message
    console.log('当前是演示网站，后台服务未启动，出现错误是正常现象。如需帮助，请联系 watoukuang@gmail.com!');
  } finally {
    loading.value = false;
  }
};

listSymbols();
</script>

<style scoped lang="scss">
.market-container {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 15px;
}

.table-wrapper {
  width: 100%;
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
}

.advertisement {
  background-color: #37ff18; /* 广告背景色 */
  color: #172636; /* 文字颜色 */
  padding: 20px;
  text-align: center;
  border-radius: 8px;
  margin-top: 100px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
}

.advertisement h1 {
  font-size: 36px; /* 增大字体 */
  margin: 0 0 10px; /* 去掉默认边距 */
}

.advertisement p {
  font-size: 16px; /* 字体大小 */
  margin: 10px 0; /* 上下边距 */
}

.cta-button {
  background: #172636; /* 按钮背景色 */
  color: white; /* 按钮字体颜色 */
  border: none;
  border-radius: 5px;
  padding: 10px 20px;
  cursor: pointer;
  transition: background 0.3s;
}

.cta-button:hover {
  background: #1a1a1a; /* 悬停时的背景色 */
}

/* 表格文字样式 */
.transparent-table {
  min-width: 800px; /* 最小宽度保证内容不挤压 */

  :deep(.ivu-table) {
    color: #37ff18;
    width: 100% !important;

    th {
      color: #37ff18;
      font-weight: 500;
      white-space: nowrap;
    }

    td {
      color: #37ff18;
      white-space: nowrap;
    }
  }
}

/* 表格文字居中 */
.transparent-table :deep(.ivu-table th),
.transparent-table :deep(.ivu-table td) {
  text-align: center;
}

/* 透明表格样式 */
.transparent-table :deep(.ivu-table) {
  background-color: transparent !important;
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
}

.transparent-table :deep(.ivu-table th) {
  background-color: rgba(255, 255, 255, 0.1) !important;
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
}

.transparent-table :deep(.ivu-table td) {
  background-color: transparent !important;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.transparent-table :deep(.ivu-table-row-hover td) {
  background-color: rgba(255, 255, 255, 0.08) !important;
}

.transparent-table :deep(.ivu-table-stripe .ivu-table-body tr:nth-child(2n) td) {
  background-color: rgba(255, 255, 255, 0.03) !important;
}

.trade-btn {
  color: #37ff18 !important;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    color: #28c74d !important;
    text-decoration: underline;
  }
}

/* 响应式调整 */
@media (max-width: 992px) {
  .market-container {
    padding: 0 10px;
  }

  .transparent-table {
    min-width: 900px;
  }
}

@media (max-width: 768px) {
  .transparent-table :deep(.ivu-table) {
    font-size: 14px;
  }

  .transparent-table :deep(.ivu-table th),
  .transparent-table :deep(.ivu-table td) {
    padding: 8px 4px;
  }
}

@media (max-width: 576px) {
  .transparent-table {
    min-width: 100%;
  }

  .table-wrapper {
    margin: 0 -15px;
    width: calc(100% + 30px);
  }
}

</style>
<style scoped>
/* 基础表格样式 */
:deep(.ant-table) {
  background: transparent;
  color: rgba(255, 255, 255, 0.9);
}

/* 表头样式 - 居中且无右侧竖线 */
:deep(.ant-table-thead > tr > th) {
  background: rgba(7, 10, 40, 0.5) !important;
  color: #37ff00;
  font-size: 16px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  font-weight: 500;
  text-align: center !important; /* 表头文字居中 */
  border-right: none !important; /* 移除右侧竖线 */
}

/* 表格内容单元格 - 居中 */
:deep(.ant-table-tbody > tr > td) {
  color: rgba(230, 230, 230, 0.85);
  font-size: 16px;
  transition: all 0.25s ease;
  background-color: transparent !important;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  text-align: center !important; /* 表格体文字居中 */
}

/* 行悬停效果 */
:deep(.ant-table-tbody > tr:hover:not(.ant-table-expanded-row):not(.ant-table-row-selected) > td) {
  background: rgba(49, 210, 235, 0.25) !important;
}

/* 分页器样式 */
:deep(.ant-pagination) {
  color: rgba(255, 255, 255, 0.8) !important;
}

:deep(.ant-pagination-item) {
  background: transparent !important;
  border-color: rgba(255, 255, 255, 0.15) !important;
}

:deep(.ant-pagination-item-active) {
  background: rgba(22, 119, 255, 0.2) !important;
  border-color: #1677ff !important;
}

:deep(.ant-pagination-item a) {
  color: inherit !important;
}

:deep(.ant-pagination-item-active a) {
  color: #1677ff !important;
}

/* 移除所有单元格右侧边框 */
:deep(.ant-table-thead > tr > th),
:deep(.ant-table-tbody > tr > td) {
  border-right: none !important;
}

:deep(.ant-table-wrapper .ant-table:not(.ant-table-bordered) .ant-table-tbody >tr:last-child>td) {
  border-bottom: none !important;
}
</style>