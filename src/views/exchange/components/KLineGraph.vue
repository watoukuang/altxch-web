<template>
  <div class="chart-wrapper">
    <div ref="chartContainer" class="chart-container"></div>
  </div>
</template>

<script setup>
import {onMounted, ref, onBeforeUnmount} from 'vue';
import {createChart} from 'lightweight-charts';
import {reqGetKLineGraph} from '@/service/exchange.js'; // 确保正确导入你的请求函数

const chartContainer = ref(null);
let chart = null;
let candlestickSeries = null;

onMounted(async () => {
  if (!chartContainer.value) return;

  chart = createChart(chartContainer.value, {
    width: chartContainer.value.clientWidth,
    height: chartContainer.value.clientHeight,
    layout: {
      textColor: '#fff',
      background: {type: 'solid', color: '#000'},
    },
    grid: {
      vertLines: {visible: false},
      horzLines: {visible: false},
    },
    handleScroll: true,
    handleScale: true,
    timeScale: {
      timeVisible: true, // 显示时间
      secondsVisible: false, // 不显示秒
    },
  });

  // 添加蜡烛图系列
  candlestickSeries = chart.addCandlestickSeries({
    upColor: '#4FFF00',
    downColor: '#FF4976',
    borderUpColor: '#4FFF00',
    borderDownColor: '#FF4976',
    wickUpColor: '#4FFF00',
    wickDownColor: '#FF49776',
  });

  // 请求后端数据
  const params = {
    symbol: "BTC/USDT",
    from: 1741635728870,
    to: 1742835728870,
    resolution: 1,
  };

  const {code, data} = await reqGetKLineGraph(params);
  //
  //
  if (code === 200 && data && Array.isArray(data)) {
    //   // 格式化数据
    const formattedData = data.map(item => ({
      time: item[0] / 1000, // 转换为秒
      open: item[1],
      high: item[2],
      low: item[3],
      close: item[4],
      volume: item[5]
    }));

    // 确保数据按时间升序排列
    // formattedData.sort((a, b) => a.time - b.time);

    // 调试信息
    console.log("Formatted KLine Data:", formattedData);
    // const data = [
    //   {open: 10, high: 10.63, low: 9.49, close: 9.55, time: 1642427876},
    //   {open: 9.55, high: 10.30, low: 9.42, close: 9.94, time: 1642514276},
    //   {open: 9.94, high: 10.17, low: 9.92, close: 9.78, time: 1642600676},
    //   {open: 9.78, high: 10.59, low: 9.18, close: 9.51, time: 1642687076},
    //   {open: 9.51, high: 10.46, low: 9.10, close: 10.17, time: 1642773476},
    //   {open: 10.17, high: 10.96, low: 10.16, close: 10.47, time: 1642859876},
    //   {open: 10.47, high: 11.39, low: 10.40, close: 10.81, time: 1642946276},
    //   {open: 10.81, high: 11.60, low: 10.30, close: 10.75, time: 1643032676},
    //   {open: 10.75, high: 11.60, low: 10.49, close: 10.93, time: 1643119076},
    //   {open: 10.93, high: 11.53, low: 10.76, close: 10.96, time: 1643205476}
    // ];

    // 设置数据到图表
    candlestickSeries.setData(formattedData);
    chart.timeScale().fitContent();
  }

  const resizeObserver = new ResizeObserver(entries => {
    if (!entries.length) return;
    const {width, height} = entries[0].contentRect;
    chart.applyOptions({width, height});
  });

  resizeObserver.observe(chartContainer.value);

  onBeforeUnmount(() => {
    resizeObserver.disconnect();
    if (chart) {
      chart.remove();
    }
  });
});
</script>

<style scoped>
.chart-wrapper {
  width: 100%;
  height: 380px;
  min-height: 380px;
  max-height: 380px;
  margin: 0 auto;
  position: relative;
  overflow: hidden;
  contain: strict; /* 限制布局影响 */
}

.chart-container {
  width: 100%;
  height: 100%;
  position: absolute;
  inset: 0;
}
</style>