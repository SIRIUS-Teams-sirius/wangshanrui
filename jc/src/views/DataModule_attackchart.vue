<template>
    <div 
      ref="chartRef" 
      class="attack-chart"
      :style="{ width: chartWidth, height: chartHeight }"
    ></div>
  </template>
  
  <script setup lang="ts">
  import { ref, onMounted, onBeforeUnmount, watch } from 'vue'
  import * as echarts from 'echarts/core'
  import { PieChart } from 'echarts/charts'
  import {
    TitleComponent,
    TooltipComponent,
    LegendComponent 
  } from 'echarts/components'
  import { CanvasRenderer } from 'echarts/renderers'
  import type { EChartsOption, AttackData } from '../types/attack'
  
  echarts.use([
    PieChart,
    TitleComponent,
    TooltipComponent,
    LegendComponent,
    CanvasRenderer 
  ])
  
  const props = defineProps<{
    attackData?: AttackData,
    width?: string,
    height?: string
  }>()
  
  const chartRef = ref<HTMLElement>()
  let chart: echarts.ECharts | null = null 
  const chartWidth = props.width || '50%'
  const chartHeight = props.height || '600px'
  
  const getOption = (): EChartsOption => {
    if (!props.attackData) {
      return {};
    }
    return {
      title: {
        text: '攻击类型分布',
        subtext: 'KDD99 10%数据集样本统计',
        left: 'center',
        top: '2%'
      },
      tooltip: {
        trigger: 'item',
        formatter: (params: any) => 
          `${params.name}<br/>数量: ${params.value.toLocaleString()}<br/>占比: ${params.percent.toFixed(4)}%`
      },
      legend: {
        type: 'scroll',
        orient: 'vertical',
        right: 10,
        top: 20,
        bottom: 20,
        data: props.attackData?.legendData || [], 
        formatter: (name: string) => {
          const item = props.attackData?.seriesData.find(d => d.name === name);
          return `${name} (${item?.value.toLocaleString()})`;
        }
      },
      series: [{
        name: '',
        type: 'pie',
        radius: ['41%', '76%'],
        center: ['40%', '50%'],
        top: '15%',
        data: props.attackData?.seriesData || [], 
        label: {
          show: false,
          position: 'center'
        },
        emphasis: {
          label: {
            show: true,
            fontSize: '20',
            fontWeight: 'bold'
          },
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        }
      }]
    };
  }
  
  const initChart = () => {
    if (chartRef.value && props.attackData) {
      chart = echarts.init(chartRef.value);
      chart.setOption(getOption());
      window.addEventListener('resize', handleResize);
    }
  };
  
  onMounted(() => {
    initChart();
  });
  
  watch(() => props.attackData, () => {
    if (chart) {
      chart.dispose();
    }
    initChart();
  });
  
  onBeforeUnmount(() => {
    if (chart) {
      chart.dispose();
      window.removeEventListener('resize', handleResize);
    }
  });
  
  const handleResize = () => {
    chart?.resize();
  }
  </script>
  
  <style scoped>
  .attack-chart {
    box-sizing: border-box;
    /* 可添加其他样式进行微调 */
  }
  </style>