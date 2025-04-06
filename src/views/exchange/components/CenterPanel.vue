<template>
  <div class="center">
    <div class="symbol">
      <div class="item" style="margin-left: 10px;">
        <span class="coin">
          {{ currentCoin.coin }}/{{ currentCoin.base }}
        </span>
      </div>
      <div class="item">
        <span class="text">最新价</span>
        <span class="num" :class="{ buy: currentCoin.change > 0, sell: currentCoin.change < 0 }">
          {{ currentCoin.close }}
        </span>
      </div>
      <div class="item">
        <span class="text">24h涨跌</span>
        <span class="num" :class="{ buy: currentCoin.change > 0, sell: currentCoin.change < 0 }">
          {{ currentCoin.rose }}
        </span>
      </div>
      <div class="item">
        <span class="text">24h最高价</span>
        <span class="num">{{ currentCoin.high }}</span>
      </div>
      <div class="item">
        <span class="text">24h最低价</span>
        <span class="num">{{ currentCoin.low }}</span>
      </div>
      <div class="item">
        <span class="text">交易数量</span>
        <span class="num ">{{ currentCoin.volume }}{{ currentCoin.coin }}</span>
      </div>
    </div>
    <KLineGraph class="imgtable"/>
    <TradePanel :current-coin="currentCoin"/>
  </div>
</template>
<script setup>
import {defineEmits, defineProps} from "vue";
import TradePanel from "./TradePanel.vue";
import KLineGraph from "./KLineGraph.vue";

const props = defineProps({
  currentCoin: {
    type: Object,
    required: true,
  },
});

</script>
<style scoped lang="scss">
.center {
  flex: 1;
  margin-right: 5px;

  .symbol {
    display: flex;
    justify-content: space-between;
    padding: 15px 30px;
    margin-bottom: 5px;
    align-items: center;
    background-color: #192330;
    line-height: 1;
    border-radius: 0px;

    .item {
      .price-cny {
        font-size: 12px;
        color: #546886;
      }

      .coin {
        font-size: 20px;
      }

      .text {
        width: 100%;
        display: block;
        font-size: 12px;
        color: #999;
        margin-bottom: 5px;
      }

      .num {
        font-size: 12px;
        color: #fff;
      }
    }
  }

  .imgtable {
    position: relative;
    overflow: hidden;
    margin-bottom: 5px;
  }

}
</style>