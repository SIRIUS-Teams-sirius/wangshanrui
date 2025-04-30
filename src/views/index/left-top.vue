<template>
  <div ref="chartEl" class="dynamic-chart" style="width: 100%; height: 100%"></div>
</template>
 
<script setup lang="ts">
import { onMounted, onUnmounted, reactive, ref, shallowRef } from 'vue'
import * as echarts from 'echarts/core'
import { LineChart } from 'echarts/charts'
import { GridComponent, TooltipComponent } from 'echarts/components'
import { SVGRenderer } from 'echarts/renderers'
import { currentGET } from '@/api'
 
// 注册ECharts组件
echarts.use([LineChart, GridComponent, TooltipComponent, SVGRenderer])
 
const chartEl = ref<HTMLElement>()
const chartInstance = shallowRef<echarts.ECharts>()
let updateInterval: number | undefined 
 
// 响应式配置对象 
const chartOption = reactive({
  xAxis: {
    type: 'category',
    data: ['4.21', '4.22', '4.23', '4.24', '4.25', '4.26', '4.27'], // 初始演示数据 
    axisLine: { lineStyle: { color: '#4A90E2' } }
  },
  yAxis: {
    type: 'value',
    splitLine: { show: false }, // 网格线？ 
    axisLabel: { color: '#31ABE3' } // 坐标轴数字、字母颜色
  },
  series: [{
    type: 'line',
    smooth: true,
    symbol: 'circle',
    symbolSize: 10,
    itemStyle: {
      color: '#00fdfa', // 原有主色调 
      borderColor: '#FFFFFF',
      borderWidth: 2 
    },
    areaStyle: {
      color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
        { offset: 0, color: 'rgba(0,253,250,0.4)' },
        { offset: 1, color: 'rgba(0,253,250,0.01)' }
      ])
    },
    data: [82, 93, 91, 94, 120, 140, 133] // 初始演示数据 
  }],
  tooltip: {
    trigger: 'axis',
    backgroundColor: 'rgba(10,20,30,0.9)', 
    borderWidth: 0,
    textStyle: { color: '#FFFFFF' }
  }
})
// 初始化图表 
const initChart = () => {
  if (chartEl.value) {
    chartInstance.value = echarts.init(chartEl.value, null, {
      renderer: 'svg', 
      width: 'auto',
      height: 'auto'
    })
    chartInstance.value.setOption(chartOption)
  }
}
 
// 动态数据更新
const updateChartData = (timeData: string[], valueData: number[]) => {
  chartOption.xAxis.data = timeData 
  chartOption.series[0].data = valueData 
  chartInstance.value?.setOption(chartOption, {
    lazyUpdate: true, // 启用懒更新优化性能 
    replaceMerge: ['series'] // 智能合并数据 
  })
}
 
// 数据获取与处理 
const fetchData = async () => {
  try {
    // 修改为标准API路径，确保走Vite代理
    const res = await currentGET('/api/leftTop')
    if (res.success) {
      // 假设接口返回数据结构（按需调整）
      const mockData = {
        timeRange: new Array(7).fill('').map((_,i) => `03/0${i+1}`), // 模拟日期数据 
        values: [Math.random()*1500, Math.random()*1500, Math.random()*1500, 
                Math.random()*1500, Math.random()*1500, Math.random()*1500, 
                Math.random()*1500] // 模拟动态数据 
      }
      updateChartData(mockData.timeRange, mockData.values)
    }
  } catch (e) {
    console.error('数据获取失败:', e)
  }
}
 
onMounted(() => {
  initChart()
  fetchData()
  
  // 建立轮询更新
  updateInterval = window.setInterval(fetchData, 15000) // 每15秒更新 
  
  // 窗口自适应 
  window.addEventListener('resize', () => {
    chartInstance.value?.resize({
      animation: { duration: 300 } // 添加缩放动画 
    })
  })
})
 
onUnmounted(() => {
  window.clearInterval(updateInterval)
  chartInstance.value?.dispose() // 防止内存泄漏 
})
</script>
 
<style scoped lang="scss">
@keyframes chartGlow {
  from { transform: translate(0,0) rotate(45deg); }
  to { transform: translate(100%,100%) rotate(45deg); }
}
</style>
