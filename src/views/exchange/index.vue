<template>
  <div class="container exchange">
    <div class="main">
      <LeftPanel
          ref="leftPanel"
          :current-coin="currentCoin"
          :baseCoin="baseCoin"
          :real-time-trade="realTimeTrade"
          :real-time-thub="realTimeThumb"
          @updateCurrentCoinCallback="updateCurrentCoinCallback"
      />
      <CenterPanel
          ref="centerPanel"
          :current-coin="currentCoin"
          :real-time-trade="realTimeTrade"
      />
      <RightPanel
          ref="rightPanel"
          :current-coin="currentCoin"
          :real-time-plate="realTimePlate"
      />
      <BottomPanel ref="bottomPanel" :current-coin="currentCoin"/>
    </div>
  </div>
</template>
<script setup>
import {reactive, ref, h, onBeforeUnmount, onMounted} from "vue";
import {Slider} from "view-ui-plus";
import {reqGetSymbolInfo} from "@/service/exchange.js";
import {useRoute} from 'vue-router';
import {timeFormat} from "@/utils/datetime.js";
import LeftPanel from "./components/LeftPanel.vue";
import CenterPanel from "./components/CenterPanel.vue";
import RightPanel from "./components/RightPanel.vue";
import BottomPanel from "./components/BottomPanel.vue";
import {Client} from '@stomp/stompjs';
import SockJS from 'sockjs-client';

const publishType = ref('NONE');
const baseCoin = ref('usdt');
const realTimePlate = ref({});
const realTimeTrade = ref({});
const realTimeThumb = ref({});
let stompClient = null;

// 当前币种
const currentCoin = reactive({
  base: '',
  coin: '',
  symbol: '',
  change: 100,
  baseCoinScale: undefined,
  coinScale: undefined,
});
// 获取当前交易对
const route = useRoute()
const pair = route.params.pair;
if (pair) {
  const [coin, base] = pair.split('_');
  currentCoin.coin = coin.toUpperCase();
  currentCoin.base = base.toUpperCase();
  currentCoin.symbol = `${currentCoin.coin}/${currentCoin.base}`;
}

// 获取当前交易对信息
const getSymbolInfo = async () => {
  let params = {symbol: currentCoin.symbol}
  const {code, data} = await reqGetSymbolInfo(params)
  if (code == 200) {
    const {baseCoinScale, coinScale} = data;
    currentCoin.baseCoinScale = baseCoinScale;
    currentCoin.coinScale = coinScale;
  }
}

getSymbolInfo();


onBeforeUnmount(() => {
  if (stompClient) {
    stompClient.deactivate(); // 断开连接
  }
});

onMounted(() => connect());
const connect = () => {
  // 连接到后端 WebSocket 服务器
  const socket = new SockJS('/ws/ALTXCH-EXCHANGE/altxch-market-ws');
  stompClient = new Client({
    webSocketFactory: () => socket,
    debug: (str) => {
      console.log(str);
    },
    onConnect: () => {
      console.log('Connected to WebSocket altxch');
      stompClient.subscribe('/topic/altxch-market/kline/BTC', function (message) {
        console.log("subscribe trade kline btc", message);
        // console.log('Received Kline data: ', JSON.parse(message.body));
        // 在这里处理收到的K线数据并更新图表
      });
      stompClient.subscribe('/topic/altxch-market/trade-depth/BTC/USDT', function (message) {
        console.log("subscribe trade depth btc", message.body);
        realTimePlate.value = message.body;
      });
      stompClient.subscribe('/topic/altxch-market/trade-plate/BTC/USDT', function (message) {
        try {
          const dataObject = JSON.parse(message.body);
          realTimePlate.value = dataObject; // 更新 realTimePlate
        } catch (error) {
          console.error("Error parsing message body:", error);
        }
      });
      stompClient.subscribe('/topic/altxch-market/trade/BTC/USDT', function (message) {
        try {
          const dataObject = JSON.parse(message.body);
          realTimeTrade.value = dataObject; // 更新 realTimeTrade
        } catch (error) {
          console.error("Error parsing message body:", error);
        }
      });
      stompClient.subscribe('/topic/altxch-market/thumb', function (message) {
        try {
          const dataObject = JSON.parse(message.body);
          realTimeThumb.value = dataObject; // 更新 realTimeThumb
        } catch (error) {
          console.error("Error parsing message body:", error);
        }
      });
    },
    onStompError: (frame) => {
      console.error('Broker reported error: ' + frame.headers['message']);
      console.error('Additional details: ' + frame.body);
    },
  });

  stompClient.activate();
};


const updateCurrentCoinCallback = (coin) => Object.assign(currentCoin, coin);

</script>

<style>
.buy {
  color: #00b275 !important;
}

.sell {
  color: #f15057 !important;
}

.ivu-input {
  background: transparent !important;
}
</style>

<style lang="scss">


.xs_table {
  width: 100%;
  overflow-x: scroll;

  &::-webkit-scrollbar {
    height: 2px;
  }


  &::-webkit-scrollbar-track-piece {
    background: transparent;
  }

}
</style>
<style scoped lang="scss">
.exchange {
  color: #fff;
  background: #263142;
  background-color: #0b1520;

  .main {
    display: flex;
    flex-wrap: wrap;
    margin-top: 5px;

  }

}


#kline_container {
  background: #192330;
}

.coin-info {
  color: #8f9ca5;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  overflow: hidden;
  padding-top: 15px;
}

.mask_phone {
  background: rgba(0, 52, 77, 0.8);;
  height: 344px;
  width: 100%;
  line-height: 344px;
  text-align: center;
  position: absolute;
  top: 0;
  font-size: 20px;
  margin: 0 auto;
  z-index: 99;
}
</style>
<style>
.ivu-icon-arrow-up-b {
  top: 5px;
}

.coin-menu .ivu-table td.coin-menu-symbol {
  text-align: left;
  padding-left: 20px;
}

.coin-menu .coin-menu-symbol .ivu-icon {
  color: #f0a70a;
  margin-right: 10px;
}

.ivu-icon {
  cursor: pointer;
}

.sc_table th {
  cursor: pointer;
}

.sc_table .ivu-table-body tr:hover {
  background: #262A42;
  cursor: pointer;
}

span.price {
  margin: 0;
}

.kline {
  float: right;
  width: 77%;
  overflow: hidden;
  margin-bottom: 100px;
}

#chart_parameter_settings {
  right: 0 !important;
}

#kline_container {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  margin-bottom: 20px;
  overflow: hidden;
  height: 350px;
  border-radius: 0px;
}

#kline_container.hidden,
#depth_chart.hidden {
  z-index: -100;
}

#depth_chart {
  position: absolute !important;
  top: 0;
  left: 0;
  width: 100%;
  height: 350px;
  border-radius: 6px;
}

.trade_container dark hide {
  display: none;
}


.sc,
.mod_hd,
.trade_hd,
.order_book_hd,
.open_orders_hd,
.deal_record_hd {
  padding: 0 30px;
  height: 50px;
  line-height: 48px;
  background: #1B1E2E;
  font-size: 16px;
}


.mod_tab li.active {
  border-bottom: 1px solid #7A98F7;
  color: #7A98F7;
}

.order .ivu-table-wrapper .ivu-table .ivu-table-header th {
  background-color: #27313e;
}


p.math_price {
  height: 24px;
  line-height: 24px;
  overflow: hidden;
  margin-top: -1px;
  font-size: 12px;
  text-align: right;
  color: #7c7f82;
}


.order_book {
  float: right;
  width: 34%;
  height: 430px;
  background: #18202A;
  margin-bottom: 15px;
}

.order_book_hd {
  height: 50px;
}

.order_book_hd b {
  color: #BCD7E6;
}

.exchange .ivu-table th,
.exchange .ivu-table td {
  background: none;
  border: 0;
}

.exchange .ivu-table-expanded-cell {
  background: #141724 !important;
}

.exchange.day .ivu-table-expanded-cell {
  background: #f8f8f9 !important;
}

.exchange .order .ivu-table-cell-expand {
  color: #f0a70a;
}

.exchange .ivu-table th {
  cursor: pointer;
}

.exchange .ivu-table th span {
  color: #61688A;
}

.order_book .ivu-table .ivu-table-body tr:hover {
  background: #262A42;
  cursor: pointer;
}

.main .trade-wrap .ivu-table {
  border-radius: 6px;
}

.exchange .ivu-table th,
.exchange .ivu-table td {
  height: 30px;
  text-align: center;
}

.exchange .ivu-table td span {
  /* color: #BCD7E6; */
}

.exchange.day .ivu-table td span {
  color: #333;
}

.exchange .ivu-table td .ivu-btn-warning span {
  color: #fff;
}

.exchange .ivu-table-cell {
  padding: 0;
}

.ivu-table-sort {
  height: 14px;
}

.buy_table {
  /* border-top: 2px solid #1F2943 !important; */
  min-height: 200px;
}

.buy_table.hidden .ivu-table-header {
  display: none;
}

.open_orders {
  float: left;
  width: 64%;
  min-height: 400px;
  background: #18202A;
  margin-bottom: 15px;
}

.open_orders .ivu-select-item {
  color: #fff;
}

.open_orders .ivu-table .ivu-table-body tr:hover {
  background: #262A42;
}

.depth_graph {
  float: left;
  width: 64%;
  min-height: 550px;
  background: #18202A;
}

.depth_graph_hd {
  height: 50px;
  line-height: 50px;
  font-size: 16px;
  padding-left: 30px;
}

.depth_graph_ct {
  padding-left: 30px;
  height: 500px;
}

.mod_hd {
  height: 48px;
  line-height: 48px;
  font-size: 14px;
  padding-left: 15px;
}

.mod_hd dl dt {
  display: inline-block;
  font-size: 20px;
  font-weight: bold;
}

.mod_hd dl dd {
  display: inline-block;
  margin-left: 20px;
}

.kline .ivu-table button span {
  color: #fff;
}

.deal_record {
  float: right;
  width: 34%;
  height: 550px;
  background: #18202A;
}

.deal_record .ivu-table-body {
  overflow: hidden;
}

.history {
  float: left;
}

.history li {
  float: left;
  padding-right: 20px;
  cursor: pointer;
}

.history li.active {
  color: #7A98F7
}

.open_orders_hd .ivu-select {
  float: right;
  width: 100px;
}

.open_orders_hd .ivu-select-selection {
  margin-top: 12px;
  background: #1B1E2E;
}


iframe {
  height: 350px !important;
}

#tradingview_188a1 {
  height: 350px;
}


.exchange .ivu-table-wrapper {
  box-shadow: none;
  border: 0;
}

.exchange .ivu-table-wrapper tbody.ivu-table-tbody .ivu-table-row td {
  background-color: transparent;
}


.exchange .ivu-table {
  background: none;
  color: #fff;
}

.exchange .ivu-table:before,
.exchange .ivu-table:after {
  display: none;
}

.exchange .ivu-input[disabled],
.exchange fieldset[disabled] .ivu-input {
  border-color: transparent !important;
  cursor: unset !important;
  background: #202437;
}

.exchange.day .ivu-input[disabled] {
  border-color: #ccc !important;
  background-color: #fff;
}

.exchange .ivu-input[disabled]:hover {
  border-color: transparent !important;
}

.exchange.day .ivu-input[disabled]:hover {
  border-color: #ccc !important;
}

.exchange .ivu-select-dropdown {
  background: #0b0d1b;
}

.exchange .main .ivu-table .ivu-table-header th {
  line-height: 30px;
  background-color: #192330;
  border-bottom: 1px solid #27313e;
}

.exchange.day .ivu-table .ivu-table-header th {
  background-color: #fff;
  border-top: 1px solid #f0f0f0;
  border-bottom: 1px solid #f0f0f0;
}

.exchange .ivu-table {
  background-color: #192330;
}

.exchange.day .ivu-table {
  background-color: #fff;
}

.exchange .ivu-table-wrapper .ivu-table .ivu-table-row td {
  border-bottom: 1px solid #27313e;
  border-color: #27313e;
}

.exchange.day .ivu-table-wrapper .ivu-table .ivu-table-row td {
  border-bottom: 1px solid #f0f0f0;
  border-color: #f0f0f0;
}

.exchange .buy_table .ivu-table .ivu-table-row:nth-last-child(1) td {
  border-bottom: none;
}

.exchange .order .ivu-table-tip td {
  height: 144px;
}

.exchange .coin-menu td {
  cursor: pointer;
}

.exchange .order .linkmore {
  float: right;
  color: #f0a70a;
  font-size: 14px;
  line-height: 40px;
  margin-right: 20px;
}


.exchange .ivu-slider-wrap {
  height: 6px;
  margin: 0;
}

.exchange .slider-wrap {
  position: relative;
  margin: 30px 0 16px 0;
}

.exchange .slider-wrap .slider-stop {
  position: absolute;
  top: -5px;
  cursor: pointer;
  width: 16px;
  height: 16px;
  margin-left: -8px;
}

.exchange .slider-wrap .slider-block {
  margin-top: 5px;
  margin-left: 5px;
  width: 6px;
  height: 6px;
  background-color: #ccc;
  border-radius: 6px;
}

.exchange .ivu-slider-bar {
  z-index: 100;
}

.exchange .ivu-slider-button-wrap {
  z-index: 101;
}

.exchange .silder-buy .ivu-slider-bar {
  height: 6px;
  background: #00b275;
}

.exchange .silder-buy .ivu-slider-button {
  border-color: #00b275;
}

.exchange .silder-sell .ivu-slider-bar {
  height: 6px;
  background: #f15057;
}

.exchange .silder-sell .ivu-slider-button {
  border-color: #f15057;
}

.exchange .ivu-slider-stop {
  width: 6px;
  height: 6px;
}

.exchange .slider-wrap .ivu-tooltip-popper {
  padding: 0;
}

.exchange .slider-wrap .ivu-tooltip-arrow {
  display: none;
}

.exchange.day .ivu-tooltip-inner {
  background-color: #fff;
  color: #333;
  box-shadow: 0 0 2px #ccc;
}

.exchange .slider-wrap .ivu-tooltip-inner {
  box-shadow: none;
  border: none;
  padding: 0;
  min-height: 0;
  margin-bottom: 3px;
  background-color: transparent;
}

.exchange .bd_limited .ivu-form-item {
  margin-bottom: 10px;
}

.exchange.day .ivu-tooltip-popper .ivu-tooltip-arrow {
  border-top-color: rgba(217, 217, 217, .5);
}

.exchange.day .ivu-tooltip-popper .ivu-tooltip-arrow:after {
  position: absolute;
  width: 0;
  height: 0;
  bottom: 1px;
  content: "";
  border-width: 5px;
  border-style: solid;
  border-color: transparent;
  margin-left: -5px;
  border-top-width: 5px;
  border-bottom-width: 0;
  border-top-color: #fff;
}

.exchange .ivu-table-wrapper .ivu-table .ivu-table-row {
  position: relative;
}

.exchange .right .ivu-table-wrapper .ivu-table .ivu-table-row.ivu-table-row-hover td {
  background: #273344 !important;
}

.exchange .ivu-table-wrapper .ivu-table .ivu-table-row td.percenttd {
  position: absolute;
  right: 0;
  left: 0;
}

.exchange .ivu-table-wrapper .ivu-table .ivu-table-header {
  background-color: #192330;
}

.exchange .ivu-table-wrapper .ivu-table .ivu-table-header th.percenttd {
  display: none;
  font-size: 0;
}

.exchange .ivu-table-wrapper .ivu-table .ivu-table-row td.percenttd .ivu-table-cell {
  position: absolute;
  width: 100%;
  top: 0;
  bottom: 0;
  right: 0;
  z-index: 1;
  pointer-events: none;
}

.exchange .ivu-table-wrapper .ivu-table .ivu-table-row td.percenttd .percentdiv {
  position: absolute;
  right: 0;
  height: 100%;
  opacity: .2;
}

.exchange.day .ivu-table-wrapper .ivu-table .ivu-table-row td.percenttd .percentdiv {
  opacity: .1;
}

.exchange .order .ivu-table td {
  height: 40px;
}

.lightning-panel {
  height: 264px;
  width: 100%;
  z-index: 2;
  background: #003478;
  margin-bottom: 10px;
  background-size: 400% 400% !important;
  animation: gradientBG 5s ease infinite;
}

@keyframes gradientBG {
  0% {
    background-position: 0% 0%;
  }
  50% {
    background-position: 50% 100%;
  }
  100% {
    background-position: 0% 0%;
  }
}

.lightning-panel img {
  width: 100%;
}

.lightning-panel .l-content {
  position: absolute;
  top: 110px;
  width: 100%;
  text-align: center;
}

.lightning-panel .l-content .l-title {
  border: 1px solid rgb(176, 186, 194);
  padding: 3px 10px;
  /* border-radius: 3px; */
  /* width: 30%; */
  color: #d3d9e1;
  display: inline-block;
  letter-spacing: 2px;
}

.lightning-panel .l-content .l-info {
  margin-top: 15px;
}

.lightning-panel .l-content .l-detail {
  margin-top: 10px;
  font-size: 10px;
  letter-spacing: 2px;
  color: #29a6ff;
}

.lightning-panel .l-content .l-detail span:hover {
  color: #6bc0fd;
  cursor: pointer;
}

.lightning-panel .l-content .l-info .l-count {
  font-size: 14px;
}

.lightning-panel .l-content .l-info .l-txt {
  font-size: 12px;
}

.lightning-panel .l-content .l-info .l-txt:nth-child(2) {
  margin-left: 10px;
}

.lightning-panel .l-content .l-info .l-price {
  font-size: 14px;
}

.lightning-panel .l-content .l-info .l-unit {
  font-size: 8px;
}

.ivu-table th.swap-coin-menu-symbol {
  text-align: left !important;
  padding-left: 20px;
}

.ivu-table th.swap-coin-menu-lastprice {
  text-align: right !important;
  padding-right: 10px;
}

</style>

