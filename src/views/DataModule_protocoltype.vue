<template>
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

  <br>
  <div ref="chartRef" style="height: 100vh; width: 100%"></div>
</template>
  
<script setup lang="ts">
import { useRouter } from 'vue-router';
import { onMounted, ref, nextTick } from 'vue';
import * as echarts from 'echarts';

const router = useRouter();
const chartRef = ref(null);

// 路由跳转逻辑
const goToLogin = () => router.push('/login');
const goToRegister = () => router.push('/register');
const goToDatascreenhome = () => router.push('/index');
const goToHomePage = () => router.push('/home');

const goToAttackChart = () => router.push('/dm_attackchart');
const goToConnectionType = () => router.push('/dm_connectiontype');
const goToProtocolType = () => router.push('/dm_protocoltype');
const goToServiceType = () => router.push('/dm_servicetype');

// 下拉菜单逻辑
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
  