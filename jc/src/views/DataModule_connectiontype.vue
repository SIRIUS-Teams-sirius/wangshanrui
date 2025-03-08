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

<div class="chart-container">
    <div ref="chartRef" style="width: 100%; height: 400px;"></div>
  </div>
  </template>
  
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

  <style>
  .chart-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: calc(100vh - 50px);
}
</style>
  