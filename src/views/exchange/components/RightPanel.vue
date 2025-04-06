<template>
  <div class="right plate-wrap" style="position:relative;">
    <ad-panel/>
    <div class="handlers">
      <span
          @click="changePlate('all')"
          class="handler handler-all"
          :class="{ active: selectedPlate === 'all' }"
      />
      <span
          @click="changePlate('buy')"
          class="handler handler-green"
          :class="{ active: selectedPlate === 'buy' }"
      />
      <span
          @click="changePlate('sell')"
          class="handler handler-red"
          :class="{ active: selectedPlate === 'sell' }"
      />
    </div>
    <Table
        v-show="selectedPlate !== 'buy'"
        highlight-row
        ref="currentRowTable"
        class="sell_table"
        :columns="plate.columns"
        :data="plate.askRows"
    />
    <div class="plate-nowprice">
      <span class="price" :class="{ buy: currentCoin.change > 0, sell: currentCoin.change < 0 }">
        {{ currentCoin.price }}
      </span>
      <span v-if="currentCoin.change > 0" class="buy">↑</span>
      <span v-else-if="currentCoin.change < 0" class="sell">↓</span>
    </div>
    <Table
        v-show="selectedPlate !== 'sell'"
        @on-current-change="sellPlate"
        class="buy_table"
        :columns="plate.columns"
        :data="plate.bidRows"
    />
  </div>
</template>
<script setup>
import {defineProps, onMounted, reactive, ref, watch} from "vue";
import {fetchPlate} from "@/service/exchange.js";
import {Card} from "view-ui-plus";
import AdPanel from "./AdPanel.vue";
import SockJS from "sockjs-client";
import {Client} from "@stomp/stompjs";

const selectedPlate = ref('all');

const props = defineProps({
  currentCoin: {
    type: Object,
    required: true,
    default: () => ({
      price: 0,
      change: 0,
      symbol: ''
    })
  },
  realTimePlate: Object
});

watch(() => props.realTimePlate, async (newVal, oldVal) => {
  try {
    // 解析 newVal，假设它是一个 Promise
    const {direction, items} = await newVal;

    // 处理数据
    handlePlateUpdate(direction, items);
  } catch (error) {
    console.error("Error processing realTimePlate:", error);
  }
});

// 处理盘口更新的逻辑
const handlePlateUpdate = (direction, items) => {
  if (direction === "BUY") {
    clearBidRows(); // 清空买盘行
    processBids(items); // 处理买盘数据
  } else if (direction === "SELL") {
    clearAskRows(); // 清空卖盘行
    processAsks(items); // 处理卖盘数据
  }
}

// 清空买盘行
const clearBidRows = () => plate.bidRows = [];

// 清空卖盘行
const clearAskRows = () => plate.askRows = [];

const plate = reactive({
  maxPosition: 10,
  columns: [
    {
      title: '🍺价格',
      dataIndex: 'price',
      key: 'price',
      render: (h, {row}) => {
        const className = row.direction.toLowerCase();
        const priceDisplay = row.price === 0 ? '--' : row.price;
        return h('span', {class: className}, priceDisplay);
      },
    },
    {
      title: '🍵数量',
      dataIndex: 'amount',
      key: 'amount',
    },
    {
      title: '🥤累计',
      dataIndex: 'totalAmount',
      key: 'totalAmount',
    },
  ],
  askRows: [],
  bidRows: [],
})

const changePlate = (str) => {
  plate.maxPosition = str !== 'all' ? 21 : 10;
  getPlate(str);
};

const getPlate = async (str) => {
  // 获取当前交易对的参数
  const params = {symbol: props.currentCoin.symbol};

  // 请求盘口数据
  const {code, data} = await fetchPlate(params);

  // 检查响应状态
  if (code === 200 && data) {
    console.log(data)
    resetPlate(); // 重置盘口数据

    // 处理卖盘数据
    if (data.ask) {
      processAsks(data.ask.items);
    }

    // 处理买盘数据
    if (data.bid) {
      processBids(data.bid.items);
    }

    // 如果有选中的盘口，更新选中值
    if (str) {
      selectedPlate.value = str;
    }
  }
}

// 重置盘口数据
const resetPlate = () => {
  plate.askRows = []; // 清空卖盘行
  plate.bidRows = []; // 清空买盘行
}

// 处理卖盘数据
const processAsks = (askItems) => {
  // 计算每个卖盘的累计数量
  for (let i = 0; i < askItems.length; i++) {
    askItems[i].totalAmount = i === 0 ? askItems[i].amount : askItems[i - 1].totalAmount + askItems[i].amount;
  }

  const itemsCount = askItems.length; // 卖盘项目数量
  const maxPosition = plate.maxPosition; // 最大位置限制

  // 如果卖盘项目数量大于或等于最大位置
  if (itemsCount >= maxPosition) {
    for (let i = 0; i < maxPosition; i++) {
      const ask = {...askItems[i], direction: 'SELL', position: i + 1}; // 从前向后取值
      plate.askRows.push(ask); // 添加到卖盘行
    }
    plate.askRows.reverse();
    plate.askTotle = plate.askRows[plate.askRows.length - 1].totalAmount; // 设置卖盘总量为最后一项的累计数量
  } else {
    fillMissingAsks(askItems, itemsCount, maxPosition); // 填充缺失的卖盘
  }
}

// 填充缺失的卖盘数据
const fillMissingAsks = (askItems, itemsCount) => {
  const maxPosition = plate.maxPosition; // 最大位置限制

  // 填充缺失的卖盘项
  for (let i = itemsCount; i < maxPosition; i++) {
    plate.askRows.push({price: 0, amount: 0, direction: 'SELL', position: i + 1, totalAmount: 0});
  }

  // 添加现有卖盘项
  for (let i = itemsCount - 1; i >= 0; i--) {
    const ask = {...askItems[i], direction: 'SELL', position: i + 1};
    plate.askRows.push(ask);
  }

  // 获取最后一个卖盘的累计数量
  const lastIndex = Math.max(itemsCount - 1, 0);
  plate.askTotle = plate.askRows[lastIndex].totalAmount; // 设置卖盘总量
}

// 处理买盘数据
const processBids = (bidItems) => {
  // 计算每个买盘的累计数量
  for (let i = 0; i < bidItems.length; i++) {
    bidItems[i].totalAmount = i === 0 ? bidItems[i].amount : bidItems[i - 1].totalAmount + bidItems[i].amount;
    // 创建买盘项并添加到买盘行
    const bid = {...bidItems[i], direction: 'BUY', position: i + 1};
    plate.bidRows.push(bid);
    // 如果达到最大位置，停止添加
    if (i === plate.maxPosition - 1) break;
  }
  fillMissingBids(bidItems.length); // 填充缺失的买盘
}

// 填充缺失的买盘数据
const fillMissingBids = (bidCount) => {
  const maxPosition = plate.maxPosition; // 最大位置限制

  // 填充缺失的买盘项
  for (let i = bidCount; i < maxPosition; i++) {
    plate.bidRows.push({price: 0, amount: 0, direction: 'BUY', position: i + 1, totalAmount: 0});
  }

  // 获取最后一个买盘的累计数量
  const lastIndex = Math.max(bidCount - 1, 0);
  plate.bidTotle = plate.bidRows[lastIndex].totalAmount; // 设置买盘总量
}


const init = () => getPlate("all")

init()
</script>
<style>
.right {
  flex: 0 0 20%;
  border-radius: 0px;
  margin-right: 10px;
  height: 850px; /* 固定高度 */
  overflow: hidden; /* 防止内容溢出 */
  display: flex;
  flex-direction: column; /* 垂直布局 */
  background: #192330;
  border-radius: 5px;

  .handlers {
    font-size: 0;
    padding: 10px 20px;
    background-color: #192330;
    border-top-left-radius: 0px;
    border-top-right-radius: 0px;

    .handler {
      display: inline-block;
      margin-right: 10px;
      width: 20px;
      height: 20px;
      background-size: 100% 100%;
      cursor: pointer;

      &.handler-all {
        background-image: url('@/assets/images/exchange/plate_all.png');

        &.active {
          background-image: url('@/assets/images/exchange/plate_all_active.png');
        }
      }

      &.handler-green {
        background-image: url('@/assets/images/exchange/plate_green.png');

        &.active {
          background-image: url('@/assets/images/exchange/plate_green_active.png');
        }
      }

      &.handler-red {
        background-image: url('@/assets/images/exchange/plate_red.png');

        &.active {
          background-image: url('@/assets/images/exchange/plate_red_active.png');
        }
      }
    }
  }

  .plate-nowprice {
    text-align: center;
    background-color: #27313e;
    line-height: 1;
    display: flex;
    align-items: center;
    height: 40px;
    justify-content: center;
    font-size: 14px;
    font-weight: 500;

    .price {
      font-size: 18px;
      margin-right: 10px;
    }

    .price-cny {
      font-size: 12px;
      margin-left: 10px;
      font-weight: 400;
      color: rgba(219, 222, 246, 0.3);
    }
  }
}

</style>