<template>
  <div class="chart-container">
      <div ref="chartRef" style="width: 100%; height: 400px;"></div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { onMounted, ref } from 'vue';
  import * as echarts from 'echarts';
  
  const chartRef = ref(null);
  
  const option = {
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: ['SF', 'S1', 'REJ', 'S2', 'S0', 'S3', 'RSTO', 'RSTR', 'RSTOS0', 'OTH', 'SH'],
      name: '类',  // 添加横坐标单位
      nameLocation: 'end',  // 名称显示在轴末端
      nameTextStyle: {
        fontSize: 14,
        padding: [10, 0, 0, 0]  // 调整位置
      }
    },
    yAxis: {
      type: 'value',
      name: '条',  // 添加纵坐标单位
      nameLocation: 'end',  // 名称显示在轴末端
      nameTextStyle: {
        fontSize: 14,
        padding: [0, 0, 10, 0]  // 调整位置
      }
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
  
  <style>
  .chart-container {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: calc(100vh - 50px);
  }
  </style>