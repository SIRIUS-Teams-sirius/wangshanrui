<template>
    <div ref="chartRef" style="width: 100%; height: 400px;"></div>
  </template>
  
  <script setup>
  import { onMounted, ref } from 'vue';
  import * as echarts from 'echarts';
  
  const chartRef = ref(null);
  
  const option = {
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: ['SF', 'S1', 'REJ', 'S2', 'S0', 'S3', 'RSTO', 'RSTR', 'RSTOS0', 'OTH', 'SH']
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        data: [378440, 57, 26875, 24, 87007, 10, 579, 903, 11, 8, 107],
        type: 'line',
        areaStyle: {}
      }
    ]
  };
  
  onMounted(() => {
    const myChart = echarts.init(chartRef.value);
    myChart.setOption(option);
  });
  </script>
  