<template>
  123123
<!--  <div class="flash-exchange-container">-->
<!--    &lt;!&ndash; 兑换表单 &ndash;&gt;-->
<!--    <div class="exchange-form">-->
<!--      &lt;!&ndash; 从币种 &ndash;&gt;-->
<!--      <div class="form-item">-->
<!--        <div class="input-group">-->
<!--          <Select v-model="fromCurrency" class="currency-select" filterable>-->
<!--            <Option v-for="currency in currencies" :key="currency" :value="currency">-->
<!--              {{ currency }}-->
<!--            </Option>-->
<!--          </Select>-->
<!--          <Input-->
<!--              v-model="fromAmount"-->
<!--              class="amount-input"-->
<!--              placeholder="0.0"-->
<!--              type="number"-->
<!--          />-->
<!--        </div>-->
<!--        <div class="balance">余额: 0.00 {{ fromCurrency }}</div>-->
<!--      </div>-->

<!--      &lt;!&ndash; 切换按钮 &ndash;&gt;-->
<!--      <div class="switch-button">-->
<!--        <Button type="primary" @click="switchCurrencies">-->
<!--          <Icon :type="isSwapped ? 'md-arrow-down' : 'md-arrow-up'" />-->
<!--        </Button>-->
<!--      </div>-->

<!--      &lt;!&ndash; 到币种 &ndash;&gt;-->
<!--      <div class="form-item">-->
<!--        <div class="input-group">-->
<!--          <Select v-model="toCurrency" class="currency-select" filterable>-->
<!--            <Option v-for="currency in currencies" :key="currency" :value="currency">-->
<!--              {{ currency }}-->
<!--            </Option>-->
<!--          </Select>-->
<!--          <Input-->
<!--              v-model="toAmount"-->
<!--              class="amount-input"-->
<!--              placeholder="0.0"-->
<!--              type="number"-->
<!--              readonly-->
<!--          />-->
<!--        </div>-->
<!--        <div class="balance">余额: 0.00 {{ toCurrency }}</div>-->
<!--      </div>-->

<!--      &lt;!&ndash; 确认按钮 &ndash;&gt;-->
<!--      <Button type="primary" class="confirm-button" @click="confirmExchange">-->
<!--        确认兑换-->
<!--      </Button>-->
<!--    </div>-->
<!--  </div>-->
</template>

<!--<script setup>-->
<!--import { ref, computed, watch } from 'vue';-->
<!--import { Select, Option, Input, Button, Icon, Message } from 'view-ui-plus';-->

<!--// 币种列表-->
<!--const currencies = ['BTC', 'ETH', 'USDT', 'BNB', 'XRP'];-->

<!--// 表单数据-->
<!--const fromCurrency = ref('BTC');-->
<!--const toCurrency = ref('USDT');-->
<!--const fromAmount = ref(0);-->
<!--const toAmount = ref(0);-->

<!--// 模拟汇率数据-->
<!--const exchangeRates = {-->
<!--  BTC: { USDT: 50000, ETH: 15, BNB: 1000, XRP: 500000 },-->
<!--  ETH: { BTC: 0.066, USDT: 3000, BNB: 70, XRP: 30000 },-->
<!--  USDT: { BTC: 0.00002, ETH: 0.00033, BNB: 0.002, XRP: 0.1 },-->
<!--  BNB: { BTC: 0.001, ETH: 0.014, USDT: 500, XRP: 5000 },-->
<!--  XRP: { BTC: 0.000002, ETH: 0.000033, USDT: 0.01, BNB: 0.0002 },-->
<!--};-->

<!--// 计算汇率-->
<!--const exchangeRate = computed(() => {-->
<!--  return exchangeRates[fromCurrency.value][toCurrency.value] || 0;-->
<!--});-->

<!--// 计算兑换金额-->
<!--watch(-->
<!--    [fromAmount, fromCurrency, toCurrency],-->
<!--    () => {-->
<!--      toAmount.value = (fromAmount.value * exchangeRate.value).toFixed(6);-->
<!--    },-->
<!--    { immediate: true }-->
<!--);-->

<!--// 切换币种-->
<!--const isSwapped = ref(false); // 状态控制箭头方向-->

<!--const switchCurrencies = () => {-->
<!--  const temp = fromCurrency.value;-->
<!--  fromCurrency.value = toCurrency.value;-->
<!--  toCurrency.value = temp;-->
<!--  isSwapped.value = !isSwapped.value; // 切换状态-->
<!--};-->

<!--// 确认兑换-->
<!--const confirmExchange = () => {-->
<!--  Message.success(`成功兑换 ${fromAmount.value} ${fromCurrency.value} 到 ${toAmount.value} ${toCurrency.value}`);-->
<!--};-->
<!--</script>-->

<!--<style scoped>-->
<!--.flash-exchange-container {-->
<!--  max-width: 400px; /* 设置适中的最大宽度 */-->
<!--  margin: 0 auto;-->
<!--  margin-top: 120px;-->
<!--  padding: 20px; /* 适当的内边距 */-->
<!--  background-color: #1a1a1a;-->
<!--  color: #ffffff;-->
<!--  border-radius: 12px;-->
<!--  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);-->
<!--  display: flex;-->
<!--  flex-direction: column;-->
<!--  justify-content: center;-->
<!--  height: auto; /* 自适应高度 */-->
<!--}-->

<!--.exchange-form {-->
<!--  display: flex;-->
<!--  flex-direction: column;-->
<!--  gap: 20px;-->
<!--}-->

<!--.form-item {-->
<!--  background-color: #2a2a2a;-->
<!--  padding: 16px;-->
<!--  border-radius: 8px;-->
<!--  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);-->
<!--}-->

<!--.input-group {-->
<!--  display: flex;-->
<!--  align-items: center;-->
<!--  gap: 10px;-->
<!--}-->

<!--.currency-select {-->
<!--  flex: 1;-->
<!--  background-color: #333;-->
<!--  border: none;-->
<!--  color: #ffffff;-->
<!--}-->

<!--.amount-input {-->
<!--  flex: 2;-->
<!--  background-color: #333;-->
<!--  border: none;-->
<!--  color: #ffffff;-->
<!--  padding: 8px;-->
<!--  border-radius: 4px;-->
<!--}-->

<!--.balance {-->
<!--  font-size: 12px;-->
<!--  color: #888;-->
<!--  margin-top: 8px;-->
<!--}-->

<!--.switch-button {-->
<!--  display: flex;-->
<!--  justify-content: center;-->
<!--  margin: 10px 0;-->
<!--}-->

<!--.confirm-button {-->
<!--  width: 100%;-->
<!--  background-color: #2d8cf0;-->
<!--  border: none;-->
<!--  font-size: 16px;-->
<!--  border-radius: 5px;-->
<!--  cursor: pointer;-->
<!--  color: #ffffff;-->
<!--  transition: background-color 0.3s;-->
<!--}-->

<!--.confirm-button:hover {-->
<!--  background-color: #57a3f3;-->
<!--}-->
<!--</style>-->