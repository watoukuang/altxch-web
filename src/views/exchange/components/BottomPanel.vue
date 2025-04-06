<template>
  <div style="width:100%;margin-top: 5px;flex: 0 0 100%;">
    <div class="order">
      <div class="order-handler">
        <span @click="changeOrder('current')" :class="{ active: selectedOrder === 'current' }">当前委托</span>
        <span @click="changeOrder('history')" :class="{ active: selectedOrder === 'history' }">历史委托</span>
      </div>
      <div class="table">
        <Table height="240" v-if="selectedOrder === 'current'" :columns="currentOrder.columns"
               :data="currentOrder.rows"/>
        <Table height="240" v-else :columns="historyOrder.columns" :data="historyOrder.rows"/>
      </div>
    </div>
  </div>
</template>
<script setup>
import {reactive, ref} from "vue";
import {reqPageCurrentOrder, reqPageHistoryOrder} from "@/service/exchange.js";
import {dateTimeFormat, timeFormat} from "@/utils/datetime.js";

const selectedOrder = ref('current');
const currentOrder = reactive({
  rows: [],
  columns: [
    {
      title: '🐭序号',
      type: 'index',
      height: 40,
    },
    {
      title: '🐮时间',
      dataIndex: 'time',
      key: 'time',
      render: (h, {row}) => {
        const formattedTime = dateTimeFormat(row.time, 'Asia/Shanghai');
        return h('span', {}, formattedTime);
      },
    },
    {
      title: '🐯交易对',
      dataIndex: 'symbol',
      key: 'symbol',
    },
    {
      title: '🐰类型',
      dataIndex: 'orderType',
      key: 'orderType',
      render: (h, {row}) => row.orderType === 'LIMIT_PRICE' ? '限价' : '市价'
    },
    {
      title: '🐲方向',
      dataIndex: 'direction',
      key: 'direction',
    },
    {
      title: '🐍价格',
      dataIndex: 'price',
      key: 'price',
    },
    {
      title: '🐎数量',
      dataIndex: 'amount',
      key: 'amount',
    },
    {
      title: '🐑已成交',
      dataIndex: 'traded',
      key: 'tradedAmount',
    },
    {
      title: '🐒成交金额',
      dataIndex: 'dealamount',
      key: 'turnover',
    },
    {
      title: '🐔操作',
      key: 'action',
    }
  ]
})
const historyOrder = reactive({
  rows: [],
  columns: [
    {
      title: '价格',
      dataIndex: 'price',
      key: 'price',
    },
    {
      title: '数量',
      dataIndex: 'amount',
      key: 'amount',
    },
    {
      title: '时间',
      dataIndex: 'time',
      key: 'time',
    },
  ]
})

const changeOrder = () => {

}
/**
 * 获取当前订单
 */
const listCurrentOrder = async () => {
  const params = {pageNo: 0, pageSize: 100, symbol: "BTC/USDT"};
  const {code, data} = await reqPageCurrentOrder(params);
  if (code === 200) {
    currentOrder.rows = data.list
  }
}
/**
 * 获取历史订单
 */
const listHistoryOrder = async () => {
  const params = {pageNo: 0, pageSize: 100, symbol: "BTC/USDT"};
  const {code, data} = await reqPageHistoryOrder(params);
  if (code === 200) {
    currentOrder.rows = data.list
  }
}

const init = () => {
  listCurrentOrder();
  listHistoryOrder();
}
init()
</script>
<style scoped lang="scss">
.order {
  min-height: 227px;
  margin-bottom: 10px;

  .order-handler {
    background-color: #192330;
    font-size: 0;
    border-radius: 6px;

    // line-height: 38px;
    > span {
      padding: 0 20px;
      font-size: 14px;
      display: inline-block;
      color: #fff;
      cursor: pointer;
      line-height: 40px;
      background-color: #192330;

      &.active {
        color: #f0a70a;
        background-color: #27313e;
      }

      &:first-child {
        border-top-left-radius: 0px;
      }

      &:last-child {
        border-top-right-radius: 0px;
      }
    }
  }
}
</style>