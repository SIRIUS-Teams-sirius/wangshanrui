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
  <!-- 给图表容器添加一个父容器，用于居中图表 -->
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

// 定义服务类型和数据量数组
const dataAxis = [
  "ecr_i",
  "private",
  "http",
  "smtp",
  "other",
  "domain_u",
  "ftp_data",
  "eco_i",
  "urp_i",
  "telnet",
  "ftp",
  "ntp_u",
  "auth",
  "finger",
  "csnet_ns",
  "remote_job",
  "rje",
  "time",
  "imap4",
  "gopher",
  "shell",
  "echo",
  "discard",
  "domain",
  "systat",
  "iso_tsap",
  "sql_net",
  "whois",
  "printer",
  "nntp",
  "courier",
  "supdup",
  "nnsp",
  "ssh",
  "klogin",
  "uucp_path",
  "vmnet",
  "bgp",
  "uucp",
  "netbios_ssn",
  "sunrpc",
  "mtp",
  "efs",
  "daytime",
  "hostnames",
  "login",
  "netbios_dgm",
  "exec",
  "http_443",
  "Z39_50",
  "netstat",
  "ctf",
  "kshell",
  "name",
  "ldap",
  "pop_2",
  "netbios_ns",
  "link",
  "IRC",
  "pop_3",
  "X11",
  "urh_i",
  "tim_i",
  "red_i",
  "tftp_u",
  "pm_dump"
];

const data = [
  281400, 110893, 64293, 9723, 7237, 5863, 4721, 1642, 538, 513, 798, 380, 328, 670,
  126, 120, 111, 157, 117, 117, 112, 112, 116, 116, 115, 115, 110, 110, 109, 108,
  108, 105, 105, 105, 106, 106, 106, 106, 106, 107, 107, 107, 103, 103, 104, 104,
  99, 99, 99, 92, 95, 97, 98, 98, 101, 101, 102, 102, 43, 202, 11, 14, 7, 1, 1, 1
];

const yMax = 500;
const dataShadow = [];

for (let i = 0; i < data.length; i++) {
  dataShadow.push(yMax);
}

// 定义 ECharts 配置项
const option = {
  title: {
    text: '',
    subtext: ''
  },
  xAxis: {
    data: dataAxis,
    axisLabel: {
      inside: true,
      color: '#fff'
    },
    axisTick: {
      show: false
    },
    axisLine: {
      show: false
    },
    z: 10
  },
  yAxis: {
    axisLine: {
      show: false
    },
    axisTick: {
      show: false
    },
    axisLabel: {
      color: '#999'
    }
  },
  dataZoom: [
    {
      type: 'inside'
    }
  ],
  series: [
    {
      type: 'bar',
      showBackground: true,
      itemStyle: {
        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          { offset: 0, color: '#83bff6' },
          { offset: 0.5, color: '#188df0' },
          { offset: 1, color: '#188df0' }
        ])
      },
      emphasis: {
        itemStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: '#2378f7' },
            { offset: 0.7, color: '#2378f7' },
            { offset: 1, color: '#83bff6' }
          ])
        }
      },
      data: data
    }
  ]
};

// 定义图表容器的引用
const chartRef = ref<HTMLElement | null>(null);

// 定义数据缩放大小
const zoomSize = 6;

onMounted(() => {
  if (chartRef.value) {
    // 初始化 ECharts 实例
    const myChart = echarts.init(chartRef.value);

    // 设置 ECharts 配置项
    myChart.setOption(option);

    // 监听点击事件
    myChart.on('click', function (params) {
      console.log(dataAxis[Math.max(params.dataIndex - zoomSize / 2, 0)]);
      myChart.dispatchAction({
        type: 'dataZoom',
        startValue: dataAxis[Math.max(params.dataIndex - zoomSize / 2, 0)],
        endValue: dataAxis[Math.min(params.dataIndex + zoomSize / 2, data.length - 1)]
      });
    });
  }
});
</script>

<style scoped>
.chart-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: calc(100vh - 50px);
}
</style>