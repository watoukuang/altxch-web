<template>
  <div class="trade_wrap">
    <div class="trade_panel trade_panel_logout">
      <div class="trade_menu">
        <span @click="limited_price" :class="{ active: !showMarket }">限价</span>
        <span @click="market_price" :class="{ active: showMarket }">市价</span>
      </div>
    </div>
    <div class="trade_bd">
      <div class="panel panel_buy">
        <!-- 可用资产-->
        <div class="hd hd_login">
          <span>{{ currentCoin.base }}</span>
          <span>{{ wallet.baseBalance }}</span>
          <span>可用</span>
          <router-link :to="rechargeUSDTUrl">充值</router-link>
        </div>
        <!-- 限价单-->
        <div class="bd bd_limited" v-show="!showMarket">
          <Form ref="formValidate">
            <FormItem>
              <Input @on-keyup="keyEvent" type="number" v-model="formState.buy.limitPrice" placeholder="价格">
                <template #prepend>
                  <span style="color: green">买入价</span>
                </template>
                <template #append>
                  <span style="color: green">USDT</span>
                </template>
              </Input>
            </FormItem>
            <FormItem style="margin-top: 30px">
              <Input @on-keyup="keyEvent" type="number" v-model="formState.buy.limitAmount" placeholder="数量">
                <template #prepend>
                  <span style="color: green">买入量</span>
                </template>
                <template #append>
                  <span style="color: green">BTC</span>
                </template>
              </Input>
            </FormItem>
            <div class="slider-wrap" style="margin-top: 30px">
              <Slider class="silder-buy" v-model="sliderBuyLimitPercent" :step="25" show-tip="never"
                      :tip-format="tipFormat" :disabled="sliderBuyDisabled"/>
              <div class="slider-stop" v-for="item in sliderStep" :style="'left: ' + item + '%;'"
                   @click="silderGo('sliderBuyLimitPercent', item)" :key="item.id">
                <div class="slider-block"/>
              </div>
            </div>
            <div class="total buy_total">
              <span>交易额</span>
              <span>&nbsp;{{ formState.buy.limitTurnover }}&nbsp;</span>
              <span>{{ currentCoin.base }}</span>
            </div>
            <Button class="bg-green" @click="buyWithLimitPrice" :loading="buyLoading">
              <span>买入</span>
              <span>&nbsp;{{ currentCoin.coin }}</span>
            </Button>
          </Form>
        </div>
        <!-- 市价单-->
        <div class="bd bd_market" v-show="showMarket">
          <Form ref="formValidate">
            <FormItem>
              <Input type="number" placeholder="以市场上最优价格买入" disabled>
                <template #prepend>
                  <span style="color: green">买入价</span>
                </template>
                <template #append>
                  <span>{{ currentCoin.base }}</span>
                </template>
              </Input>
            </FormItem>
            <FormItem style="margin-top: 30px">
              <Input @on-keyup="keyEvent" type="number" v-model="formState.buy.marketAmount" placeholder="数量">
                <template #prepend>
                  <span>买入量</span>
                </template>
                <template #append>
                  <span>{{ currentCoin.coin }}</span>
                </template>
              </Input>
            </FormItem>
            <div class="slider-wrap" style="margin-top: 30px">
              <Slider class="silder-buy" v-model="sliderBuyMarketPercent" :step="25" show-tip="never"
                      :tip-format="tipFormat" :disabled="sliderBuyDisabled"/>
              <div class="slider-stop" v-for="item in sliderStep" :style="'left: ' + item + '%;'"
                   @click="silderGo('sliderBuyMarketPercent', item)" :key="item.id">
                <div class="slider-block"/>
              </div>
            </div>
            <Button class="bg-green" @click="buyWithLimitPrice" :loading="buyLoading" style="margin-top: 30px">
              <span>买入</span>
              <span>&nbsp;{{ currentCoin.coin }}</span>
            </Button>
          </Form>
        </div>
      </div>

      <div class="panel panel_sell">
        <!-- 可用资产-->
        <div class="hd hd_login">
          <span>{{ currentCoin.coin }}</span>
          <span>{{ wallet.coinBalance }}</span>
          <span>可用</span>
          <router-link :to="rechargeCoinUrl">充值</router-link>
        </div>
        <!-- 限价单-->
        <div class="bd bd_limited" v-show="!showMarket">
          <Form ref="formValidate">
            <FormItem>
              <Input @on-keyup="keyEvent" type="number" v-model="formState.sell.limitPrice" placeholder="价格">
                <template #prepend>
                  <span style="color:red;">卖出价</span>
                </template>
                <template #append>
                  <span style="color:red;">{{ currentCoin.base }}</span>
                </template>
              </Input>
            </FormItem>
            <FormItem style="margin-top: 30px">
              <Input @on-keyup="keyEvent" type="number" v-model="formState.sell.limitAmount" placeholder="数量">
                <template #prepend>
                  <span style="color:red;">卖出量</span>
                </template>
                <template #append>
                  <span style="color:red;">{{ currentCoin.coin }}</span>
                </template>
              </Input>
            </FormItem>
            <div class="slider-wrap">
              <Slider class="silder-buy" v-model="sliderSellLimitPercent" :step="25" show-tip="never"
                      :tip-format="tipFormat" :disabled="sliderBuyDisabled"/>
              <div class="slider-stop" v-for="item in sliderStep" :style="'left: ' + item + '%;'"
                   @click="silderGo('sliderSellLimitPercent', item)" :key="item.id">
                <div class="slider-block"/>
              </div>
            </div>
            <div class="total buy_total">
              <span>交易额</span>
              <span>&nbsp;{{ formState.sell.limitTurnover }}&nbsp;</span>
              <span>{{ currentCoin.base }}</span>
            </div>
            <Button class="bg-red" @click="sellWithLimitPrice" :loading="sellLoading">
              <span>卖出</span>
              <span>&nbsp;{{ currentCoin.coin }}</span>
            </Button>
          </Form>
        </div>
        <!-- 市价单-->
        <div class="bd bd_market" v-show="showMarket">
          <Form ref="formValidate">
            <FormItem>
              <Input type="number" placeholder="以市场上最优价格卖出" disabled>
                <template #prepend>
                  <span style="color: red;">卖出价</span>
                </template>
                <template #append>
                  <span style="color:red">{{ currentCoin.base }}</span>
                </template>
              </Input>
            </FormItem>
            <FormItem style="margin-top: 30px">
              <Input @on-keyup="keyEvent" type="number" v-model="formState.sell.marketAmount" placeholder="数量">
                <template #prepend>
                  <span style="color: red">卖出量</span>
                </template>
                <template #append>
                  <span style="color: red">{{ currentCoin.coin }}</span>
                </template>
              </Input>
            </FormItem>
            <div class="slider-wrap" style="margin-top: 30px">
              <Slider class="silder-buy" v-model="sliderSellMarketPercent" :step="25" show-tip="never"
                      :tip-format="tipFormat" :disabled="sliderSellDisabled"/>
              <div class="slider-stop" v-for="item in sliderStep" :style="'left: ' + item + '%;'"
                   @click="silderGo('sliderSellMarketPercent', item)" :key="item.id">
                <div class="slider-block"/>
              </div>
            </div>
            <Button class="bg-red" @click="buyWithLimitPrice" :loading="sellLoading" style="margin-top: 30px">
              <span>卖出</span>
              <span>&nbsp;{{ currentCoin.coin }}</span>
            </Button>
          </Form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import {defineEmits, defineProps, ref, watch, getCurrentInstance} from "vue";
import {reqAddExchangeOrder} from "@/service/exchange.js";
import {reqGetUnitBalance} from "@/service/ucenter.js";
import {Card} from "view-ui-plus";

const props = defineProps({
  currentCoin: {
    type: Object,
    required: true,
  },
});

const instance = getCurrentInstance();
const {$toFloor} = instance.appContext.config.globalProperties;

const showMarket = ref(false);
const sliderStep = ref([25, 50, 75, 100]);
const sliderBuyLimitPercent = ref(0);
const sliderSellLimitPercent = ref(0);
const sliderBuyMarketPercent = ref(0);
const sliderSellMarketPercent = ref(0);

const formState = ref({
  buy: {
    limitPrice: undefined,
    limitAmount: undefined,
    marketAmount: undefined,
    limitTurnover: 0,
  },
  sell: {
    limitPrice: undefined,
    limitAmount: undefined,
    marketAmount: undefined,
    limitTurnover: 0,
  },
})

// 通用计算函数，计算 limitAmount 和 limitTurnover
const calculateValues = (amount, price, scale) => {
  return {
    limitAmount: $toFloor(amount, scale),
    limitTurnover: $toFloor(amount * price, scale),
  };
};

// 监听 buy.limitPrice
watch(() => formState.value.buy.limitPrice, (val) => {
  const {coinScale, baseCoinScale} = props.currentCoin;
  const account = wallet.value.baseBalance;

  if (val > 0 && account > 0) {
    const amount = (account / val) * (sliderBuyLimitPercent.value / 100);
    const {limitAmount, limitTurnover} = calculateValues(amount, val, baseCoinScale);

    formState.value.buy.limitAmount = limitAmount;
    formState.value.buy.limitTurnover = limitTurnover;
  } else {
    formState.value.buy.limitAmount = 0;
    formState.value.buy.limitTurnover = 0;
  }
});

// 监听 buy.limitAmount
watch(() => formState.value.buy.limitAmount, (val) => {
  const {baseCoinScale} = props.currentCoin;
  const price = formState.value.buy.limitPrice;

  formState.value.buy.limitTurnover = calculateValues(val, price, baseCoinScale).limitTurnover;
});

// 监听 sell.limitPrice
watch(() => formState.value.sell.limitPrice, (val) => {
  const {coinScale} = props.currentCoin;
  const amount = formState.value.sell.limitAmount;

  formState.value.sell.limitTurnover = calculateValues(amount, val, coinScale).limitTurnover;
});

// 监听 sell.limitAmount
watch(() => formState.value.sell.limitAmount, (val) => {
  const {coinScale} = props.currentCoin;
  const price = formState.value.sell.limitPrice;

  formState.value.sell.limitTurnover = calculateValues(val, price, coinScale).limitTurnover;
});

const calculateBuyValues = (account, price, percent, coinScale, baseCoinScale) => {
  if (price > 0 && account > 0) {
    const amount = $toFloor((account / price) * (percent / 100), coinScale);
    const turnover = $toFloor(price * amount, baseCoinScale);
    return {amount, turnover};
  }
  return {amount: 0, turnover: 0};
};

// 监听 sliderBuyLimitPercent
watch(sliderBuyLimitPercent, (val) => {
  const {coinScale, baseCoinScale} = props.currentCoin;
  const price = formState.value.buy.limitPrice;
  const account = wallet.value.baseBalance;

  const {amount, turnover} = calculateBuyValues(account, price, val, coinScale, baseCoinScale);
  formState.value.buy.limitAmount = amount;
  formState.value.buy.limitTurnover = turnover;
});

// 监听 sliderSellLimitPercent
watch(sliderSellLimitPercent, (val) => {
  const {coinScale} = props.currentCoin;
  const account = wallet.value.coinBalance;

  formState.value.sell.limitAmount = $toFloor(account * (val / 100), coinScale);
});

// 监听 sliderBuyMarketPercent
watch(sliderBuyMarketPercent, (val) => {
  const account = wallet.value.baseBalance;
  formState.value.buy.marketAmount = $toFloor(account * (val / 100), props.currentCoin.baseCoinScale);
});

// 监听 sliderSellMarketPercent
watch(sliderSellMarketPercent, (val) => {
  const account = wallet.value.coinBalance;
  formState.value.sell.marketAmount = $toFloor(account * (val / 100), props.currentCoin.coinScale);
});
const sliderBuyDisabled = () => {
  const {baseCoinScale} = props.currentCoin;
  let account = wallet.value.baseBalance;
  let min = $toFloor(1 / Math.pow(10, baseCoinScale));
  return account < min;
}
const sliderSellDisabled = () => {
  const {coinScale} = props.currentCoin;
  let account = wallet.value.coinBalance;
  let min = $toFloor(1 / Math.pow(10, coinScale));
  return account < min;
}

const silderGo = (silder, val) => {
  if (silder === 'sliderBuyLimitPercent') {
    sliderBuyLimitPercent.value = val;
  }

  if (silder === 'sliderSellLimitPercent') {
    sliderSellLimitPercent.value = val;
  }

  if (silder === 'sliderBuyMarketPercent') {
    sliderBuyMarketPercent.value = val;
  }

  if (silder === 'sliderSellMarketPercent') {
    sliderSellMarketPercent.value = val;
  }
}

const keyEvent = (event) => {
  // debugger
  // if (formState.value.buy.limitPrice !== 0 && event.target.value !== '') {
  //   debugger
  //   formState.value.buy.limitPrice = event.target.value;
  // }
}
const rechargeCoinUrl = () => {

}
// 点击事件
const limited_price = () => showMarket.value = false;
const market_price = () => showMarket.value = true;

const emit = defineEmits(['refreshRightPanelCallback']);
const buyLoading = ref(false);
const buyWithLimitPrice = async () => {
  buyLoading.value = true;

  const params = {
    symbol: "BTC/USDT",
    price: formState.value.buy.limitPrice,
    amount: formState.value.buy.limitAmount,
    direction: "BUY",
    orderType: "LIMIT_PRICE",
    useDiscount: '0'
  };

  try {
    const {code} = await reqAddExchangeOrder(params);
    if (code === 200) {
      instance.proxy.$Message.success('挂单成功');
    } else {
      instance.proxy.$Message.error('挂单失败，请重试');
    }
  } catch (error) {
    instance.proxy.$Message.error('网络错误，请稍后再试');
  } finally {
    buyLoading.value = false; // 确保在成功或失败后都重置 loading 状态
    emit('refreshRightPanelCallback');
  }
};

const sellLoading = ref(false);

const sellWithLimitPrice = async () => {
  sellLoading.value = true;

  const params = {
    symbol: "BTC/USDT",
    price: formState.value.sell.limitPrice,
    amount: formState.value.sell.limitAmount,
    direction: "SELL",
    orderType: "LIMIT_PRICE",
    useDiscount: '0'
  };

  try {
    const {code} = await reqAddExchangeOrder(params);
    if (code === 200) {
      instance.proxy.$Message.success('挂单成功');
    } else {
      instance.proxy.$Message.error('挂单失败，请重试');
    }
  } catch (error) {
    instance.proxy.$Message.error('网络错误，请稍后再试');
  } finally {
    sellLoading.value = false; // 确保在成功或失败后都重置 loading 状态
  }
};

const buyWithMarketPrice = async () => {
  buyLoading.value = true;

  const params = {
    symbol: "BTC/USDT",
    price: formState.value.buy.limitPrice,
    amount: formState.value.buy.limitAmount,
    direction: "BUY",
    orderType: "LIMIT_PRICE",
    useDiscount: '0'
  };

  try {
    const {code} = await reqAddExchangeOrder(params);
    if (code === 200) {
      instance.proxy.$Message.success('挂单成功');
    } else {
      instance.proxy.$Message.error('挂单失败，请重试');
    }
  } catch (error) {
    instance.proxy.$Message.error('网络错误，请稍后再试');
  } finally {
    buyLoading.value = false; // 确保在成功或失败后都重置 loading 状态
    emit('refreshRightPanelCallback');
  }
};

const sellWithMarketPrice = async () => {
  sellLoading.value = true;

  const params = {
    symbol: "BTC/USDT",
    price: formState.value.sell.limitPrice,
    amount: formState.value.sell.limitAmount,
    direction: "SELL",
    orderType: "LIMIT_PRICE",
    useDiscount: '0'
  };

  try {
    const {code} = await reqAddExchangeOrder(params);
    if (code === 200) {
      instance.proxy.$Message.success('挂单成功');
    } else {
      instance.proxy.$Message.error('挂单失败，请重试');
    }
  } catch (error) {
    instance.proxy.$Message.error('网络错误，请稍后再试');
  } finally {
    sellLoading.value = false; // 确保在成功或失败后都重置 loading 状态
    emit('refreshRightPanelCallback');
  }
};

const wallet = ref({baseBalance: 0, coinBalance: 0});
const fetchBalances = async () => {
  try {
    const [baseRes, coinRes] = await Promise.all([
      reqGetUnitBalance(props.currentCoin.base),
      reqGetUnitBalance(props.currentCoin.coin)
    ])

    if (baseRes.code === 200) wallet.value.baseBalance = baseRes.data.balance;

    if (coinRes.code === 200) wallet.value.coinBalance = coinRes.data.balance;
  } catch (error) {
    console.error('获取余额失败:', error)
  }
}

fetchBalances();


</script>

<style scoped lang="scss">
.trade_wrap {
  .trade_menu {
    position: relative;
    background-color: #192330;
    border-bottom: 1px solid #27313e;
    height: 40px;
    line-height: 40px;

    > span {
      font-size: 16px;
      padding: 11px 20px;
      cursor: pointer;
      transition: color 0.3s;

      &.active {
        color: #fff;
        border-bottom: 2px solid #f0a70a;
      }

      &:first-child {
        border-top-left-radius: 0;
      }
    }

    .fee-wrap {
      position: absolute;
      top: 0;
      right: 20px;
      font-size: 12px;

      > span {
        margin-right: 10px;
        color: #7c7f82;
      }

      > a {
        vertical-align: middle;
      }
    }
  }

  .trade_panel {
    position: relative;

    .mask {
      position: absolute;
      width: 100%;
      height: 100%;
      display: flex;
      background-color: rgba(0, 52, 77, 0.8);
      justify-content: center;
      align-items: center;
      z-index: 100;
      font-size: 24px;
      border-radius: 0;
    }

    .publish-mask {
      position: absolute;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 37, 64, 0.93);
      justify-content: center;
      align-items: center;
      z-index: 101;
      font-size: 24px;
      border-radius: 0;
    }

  }


  .trade_bd {
    padding: 0 30px;

    .panel {
      position: relative;
      z-index: 2;
      float: left;
      width: 50%;
      height: 325px;
      margin-top: 0;
      border: 0 solid transparent;
      padding-top: 10px;


      .hd {
        line-height: 20px;
        height: 20px;
        border-bottom: 1px solid #1F2943;
        margin-bottom: 5px;
        border-bottom: none;

        b {
          color: #fff;
        }

        a {
          color: #f0a70a;
        }

        span {
          padding-left: 0;
          font-size: 12px;
          margin: 0 3px;
          float: right;
        }

        b {
          padding-left: 0;
          font-size: 12px;
          color: #7A98F7;
          float: right;
        }

        .hd_login a {
          float: right;
          text-decoration: none;
          font-size: 12px;
          margin-right: 10px;
        }
      }
    }

    .panel.panel_buy {
      padding-right: 15px;

      .bd_limited {
        margin-top: 30px;
      }

      .bd_market {
        margin-top: 30px;
      }
    }

    .panel.panel_sell {
      padding-left: 15px;

      .bd_limited {
        margin-top: 30px;
      }

      .bd_market {
        margin-top: 30px;
      }
    }

    Button {
      width: 100%;
      border: 0;
      height: 40px;
      color: #fff;

      &.bg-red {
        background-color: #f15057;
      }

      &.bg-green {
        background-color: #00b275;
      }

      &.bg-gray {
        background-color: #35475b;
        cursor: not-allowed;
        color: #9fabb5;

        &:hover {
          color: #9fabb5 !important;
        }
      }

      &:hover {
        // background: #54679F; // 可选的悬停样式
      }
    }
  }

  .total {
    margin-top: 30px;
    height: 30px;
    color: #7c7f82;
  }

  .slider-wrap .slider-stop {
    position: absolute;
    top: -5px;
    cursor: pointer;
    width: 16px;
    height: 16px;
    margin-left: -8px;
  }

  .slider-wrap .slider-block {
    margin-top: 3px;
    margin-left: 5px;
    width: 10px;
    height: 10px;
    background-color: #39961f;
    border-radius: 6px;
  }
}
</style>