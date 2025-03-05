<script setup lang="ts">
import { useRouter } from 'vue-router';
const router = useRouter();
const goToLogin = () => router.push('/login');
const goToRegister = () => router.push('/register');
const goToDatascreenhome = () => router.push('/index');
const goToHomePage = () => router.push('/home');

const goToAttackChart = () => router.push('/dm_attackchart');
const goToConnectionType = () => router.push('/dm_connectiontype');
const goToProtocolType = () => router.push('/dm_protocoltype');
const goToServiceType = () => router.push('/dm_servicetype');

const showDropdown = (dropdownId: string) => {
  const dropdown = document.getElementById(dropdownId);
  if (dropdown) {
    dropdown.style.display = 'block';
  }
};

const hideDropdown = (dropdownId: string) => {
  const dropdown = document.getElementById(dropdownId);
  if (dropdown) {
    dropdown.style.display = 'none';
  }
};
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
    center: ['40%', '50%'],
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
    <!-- 顶部导航栏 -->
    <nav class="navbar">
      <div class="nav-left">
        <span class="nav-item active" @click="goToHomePage">首页</span>
        <span class="nav-item dropdown" @mouseenter="showDropdown('dataDropdown')" @mouseleave="hideDropdown('dataDropdown')">
          数据模块
          <div class="dropdown-content" id="dataDropdown">
            <span class="dropdown-item" @click="goToAttackChart">攻击类型</span>
            <span class="dropdown-item" @click="goToConnectionType">连接类型</span>
            <span class="dropdown-item" @click="goToProtocolType">协议类型</span>
            <span class="dropdown-item" @click="goToServiceType">服务类型</span>
          </div>
        </span>
        <span class="nav-item">联邦学习模块</span>
        <span class="nav-item" @click="goToDatascreenhome">检测模块</span>
      </div>
      <div class="nav-right">
        <button class="login-btn" @click="goToLogin">登录</button>
        <button class="register-btn" @click="goToRegister">注册</button>
      </div>
    </nav>

  <div 
    ref="chartRef" 
    class="attack-chart"
    style="width: 50%; height: 600px;"
  ></div>
</template>