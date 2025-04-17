<template>
  <br>
  <div ref="chartRef" style="height: 100vh; width: 100%"></div>
</template>
  
<script setup lang="ts">
import { useRouter } from 'vue-router';
import { onMounted, ref, nextTick } from 'vue';
import * as echarts from 'echarts';
const chartRef = ref(null);

// 初始化图表
onMounted(() => {
  nextTick(() => {
    if (!chartRef.value) return;
    const myChart = echarts.init(chartRef.value);
    const option = {
      tooltip: {
        trigger: 'item',
      },
      legend: {
        top: '5%',
        left: 'center',
      },
      series: [
        {
          name: '协议类型',
          type: 'pie',
          radius: ['40%', '70%'],
          avoidLabelOverlap: false,
          itemStyle: {
            borderRadius: 10,
            borderColor: '#fff',
            borderWidth: 2,
          },
          label: {
            show: false,
            position: 'center',
          },
          emphasis: {
            label: {
              show: true,
              fontSize: 40,
              fontWeight: 'bold',
            },
          },
          labelLine: {
            show: false,
          },
          data: [
            { value: 190065, name: 'tcp' },
            { value: 20354, name: 'udp' },
            { value: 283602, name: 'icmp' },
          ],
        },
      ],
    };

    myChart.setOption(option);
    window.addEventListener('resize', () => myChart.resize());
  });
});
</script>
  
<style scoped>
html,
body {
  margin: 0;
  height: 100%;
}
.chart-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: calc(100vh - 50px);
}
</style>
  