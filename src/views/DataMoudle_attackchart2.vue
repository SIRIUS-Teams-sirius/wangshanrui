<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'
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
  attackData: AttackData 
}>()
 
const chartRef = ref<HTMLElement>()
let chart: echarts.ECharts | null = null 
 
const getOption = (): EChartsOption => ({
  title: {
    text: '攻击类型分布',
    subtext: 'KDD99 10%数据集样本统计',
    left: 'center',
    top: '10%'
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
    top: 100,
    bottom: 0,
    data: props.attackData.legendData,
    formatter: (name: string) => {
      const item = props.attackData.seriesData.find(d => d.name === name)
      return `${name} (${item?.value.toLocaleString()})`
    }
  },
  series: [{
    name: '',
    type: 'pie',
    radius: ['41%', '76%'],
    center: ['35%', '52%'],
    top: '15%',
    
    data: props.attackData.seriesData,
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
})
 
onMounted(() => {
  if (chartRef.value) {
    chart = echarts.init(chartRef.value)
    chart.setOption(getOption())
    window.addEventListener('resize', handleResize)
  }
})
 
onBeforeUnmount(() => {
  if (chart) {
    chart.dispose()
    window.removeEventListener('resize', handleResize)
  }
})
 
const handleResize = () => {
  chart?.resize()
}
</script>
 
<template>
  <div 
    ref="chartRef" 
    class="attack-chart"
    style="width: 50%; height: 600px;"
  ></div>
</template>

<style>
/* 表一 */
.left-panel {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}
</style>