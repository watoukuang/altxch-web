<template>
  <div class="left">
    <div class="coin-menu">
      <div style="padding: 8px 10px; height: 48px;">
        <Input
            placeholder="请输入币种名称搜索!"
            @on-change="searchInputChange"
            :value="searchKey"
            class="search"
        />
      </div>
      <div class="sc_filter">
        <span @click="changeTab('usdt')" :class="{ active: baseCoin === 'usdt' }">USDT</span>
        <span @click="changeTab('btc')" :class="{ active: baseCoin === 'btc' }">BTC</span>
        <span @click="changeTab('eth')" :class="{ active: baseCoin === 'eth' }">ETH</span>
        <div class="underline" :style="{ left: activeTabLeft + 'px', width: activeTabWidth + 'px' }"></div>
      </div>
      <div class="item_fit">
        <Table
            v-for="coin in ['usdt', 'btc', 'eth']"
            :key="coin"
            :id="coin.toUpperCase()"
            v-show="baseCoin === coin"
            :data="dataIndex"
            :columns="columns"
            style="background: transparent"
        />
      </div>
    </div>
    <div class="trade-wrap" style="margin-top: 10px;" v-show="!showCountDown">
      <Table height="330" :columns="trade.columns" :data="trade.rows"/>
    </div>
  </div>
</template>

<script setup>
import {defineProps, reactive, ref, watch, defineEmits} from 'vue';
import {fetchThumb, fetchTrade} from "@/service/exchange.js";
import {timeFormat} from "@/utils/datetime.js";

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
  baseCoin: String,
  realTimeTrade: Object,
  realTimeThub: Object
});
// 获取交易数据
const trade = reactive({
  rows: [],
  columns: [
    {
      title: '🐔价格',
      dataIndex: 'price',
      key: 'price',
      render: (h, {row}) => {
        const className = row.direction === 'BUY' ? 'buy' : 'sell';
        return h('span', {class: className}, row.price);
      },
    },
    {
      title: '🦆数量',
      dataIndex: 'amount',
      key: 'amount',
      render: (h, {row}) => {
        const className = row.direction === 'BUY' ? 'buy' : 'sell';
        return h('span', {class: className}, row.amount);
      },
    },
    {
      title: '🐦时间',
      dataIndex: 'time',
      key: 'time',
      render: (h, {row}) => {
        const formattedTime = timeFormat(row.time, 'Asia/Shanghai');
        return h('span', {}, formattedTime);
      },
    },
  ],
});
watch(() => props.realTimeTrade, async (newVal) => {
  try {
    // 确保 newVal 是一个包含交易数据的非空数组
    if (Array.isArray(newVal) && newVal.length > 0) {
      console.log(newVal);

      // 解构新交易数据
      const {amount, price, time, direction} = newVal[0];

      // 删除最后一条数据（如果存在）
      if (trade.rows.length) {
        trade.rows.pop();
      }

      // 将新数据放入第一条
      trade.rows.unshift({price, amount, time, direction});
    } else {
      console.warn("Received invalid trade data:", newVal);
    }
  } catch (error) {
    console.error("Error processing realTimeTrade:", error);
  }
});

const coins = reactive({
  USDT: [],
  BTC: [],
  ETH: [],
});


watch(() => props.realTimeThub, async (newVal) => {
  const coin = await newVal;

  // 只在当前coin匹配时执行后续逻辑
  if (coin.symbol === props.currentCoin.symbol) {
    // 更新 coin 的属性
    Object.assign(coin, {
      price: coin.close,
      rose: coin.chg > 0 ? `+${(coin.chg * 100).toFixed(2)}%` : `${(coin.chg * 100).toFixed(2)}%`,
      coin: coin.symbol.split('/')[0],
      base: coin.symbol.split('/')[1],
    });

    // 更新 coins 中 base 下的 coin
    if (coins[coin.base]) {
      const existingCoinIndex = coins[coin.base].findIndex(existingCoin => existingCoin.symbol === coin.symbol);
      if (existingCoinIndex !== -1) {
        // 更新现有 coin 的所有属性
        Object.assign(coins[coin.base][existingCoinIndex], coin);
      } else {
        // 如果不存在，则添加新的 coin
        coins[coin.base].push(coin);
      }
    } else {
      // 如果 base 不存在，直接添加 coin
      coins[coin.base] = [coin];
    }

    console.log(coin.symbol);
    emit('updateCurrentCoinCallback', coin);
  }
});

const emit = defineEmits(['updateCurrentCoinCallback']);

const searchKey = ref('');
const showCountDown = ref(false);
const dataIndex = ref([]);

const activeTab = ref('usdt'); // 当前选中的选项卡
const activeTabLeft = ref(0); // 选项卡下划线的左侧位置
const activeTabWidth = ref(0); // 选项卡下划线的宽度

// 定义列
const columns = [
  {
    title: '🐶币种',
    dataIndex: 'coin',
    key: 'coin',
    sortable: false,
    width: 90,
    className: 'coin-menu-symbol',
  },
  {
    title: '🐷最新价',
    dataIndex: 'close',
    key: 'close',
    sortable: true,
  },
  {
    title: '🐱24h涨跌',
    dataIndex: 'rose',
    key: 'rose',
    sortable: true,
    render: (h, {row}) => {
      const className = parseFloat(row.rose) < 0 ? 'sell' : 'buy';
      return h('span', {class: className}, row.rose);
    },
  },
];

// 获取币种数据
const getSymbols = async () => {
  const {code, data} = await fetchThumb();
  if (code === 200) {
    data.forEach(coin => {
      coin.price = coin.close;
      coin.rose = coin.chg > 0 ? `+${(coin.chg * 100).toFixed(2)}%` : `${(coin.chg * 100).toFixed(2)}%`;
      coin.coin = coin.symbol.split('/')[0];
      coin.base = coin.symbol.split('/')[1];
      coins[coin.base].push(coin);
      console.log(coin.symbol)
      if (coin.symbol === props.currentCoin.symbol) {
        emit('updateCurrentCoinCallback', coin);
      }
    });
    changeTab('usdt'); // 默认显示 USDT
  }
};

// 切换基础币种
const changeTab = (str) => {
  activeTab.value = str;
  dataIndex.value = coins[str.toUpperCase()] || [];
};

// 获取交易数据
const getTrade = async () => {
  try {
    const params = {
      symbol: props.currentCoin.symbol,
      size: 20
    };

    const {code, data} = await fetchTrade(params);

    if (code === 200 && Array.isArray(data) && data.length > 0) {
      trade.rows = data; // 成功获取交易数据
    } else {
      console.warn('No trade data found or error in response:', {code, data});
      trade.rows = []; // 清空数据以避免使用过期数据
    }
  } catch (error) {
    console.error('Error fetching trade data:', error);
    trade.rows = []; // 清空数据以避免使用过期数据
  }
};
// 搜索逻辑
const searchInputChange = () => {
  const upperSearchKey = searchKey.value.toUpperCase();
  dataIndex.value = coins[props.baseCoin].filter(item => item.coin.startsWith(upperSearchKey));
};

// 监听当前选项卡的变化，计算下划线的位置和宽度
watch(activeTab, (newTab) => {
  const tabElements = document.querySelectorAll('.sc_filter span');
  tabElements.forEach((tab) => {
    if (tab.textContent.toLowerCase() === newTab) {
      activeTabLeft.value = tab.offsetLeft;
      activeTabWidth.value = tab.offsetWidth;
    }
  });
});

// 初始化
const init = async () => {
  await getSymbols();
  await getTrade();
};

init();
</script>

<style scoped>
.left {
  flex: 0 0 20%;
  margin-right: 5px;
  min-height: 800px;

  .coin-menu {
    height: 510px;
    background-color: #192330;
    margin-bottom: 10px;
    border-radius: 0px;

    .sc_filter {
      position: relative; /* 使下划线能够相对定位 */
      white-space: nowrap;
      overflow-x: auto;
      font-size: 0;
      background-color: #192330;
      border-bottom: 1px solid #27313e;

      span {
        padding: 0 3px;
        margin: 0 10px;
        font-size: 13px;
        display: inline-block;
        color: #fff;
        cursor: pointer;
        line-height: 35px;
        background-color: #192330;
      }

      .underline {
        position: absolute;
        height: 2px;
        background-color: #f0a70a; /* 下划线颜色 */
        bottom: 0; /* 下划线位置 */
        transition: left 0.3s, width 0.3s; /* 添加动画效果 */
      }
    }
  }

}
</style>
<style>

</style>