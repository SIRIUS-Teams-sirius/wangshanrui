<template>
  <div class="chart-container">
    <div ref="chartRef" style="width: 100%; height: 400px;"></div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import * as echarts from 'echarts';

const dataAxis = [
  // ... 保持原有数据不变 ...
  "ecr_i", "private", "http", "smtp", "other", "domain_u", "ftp_data", 
  "eco_i", "urp_i", "telnet", "ftp", "ntp_u", "auth", "finger", "csnet_ns",
  "remote_job", "rje", "time", "imap4", "gopher", "shell", "echo", "discard",
  "domain", "systat", "iso_tsap", "sql_net", "whois", "printer", "nntp",
  "courier", "supdup", "nnsp", "ssh", "klogin", "uucp_path", "vmnet", "bgp",
  "uucp", "netbios_ssn", "sunrpc", "mtp", "efs", "daytime", "hostnames",
  "login", "netbios_dgm", "exec", "http_443", "Z39_50", "netstat", "ctf",
  "kshell", "name", "ldap", "pop_2", "netbios_ns", "link", "IRC", "pop_3",
  "X11", "urh_i", "tim_i", "red_i", "tftp_u", "pm_dump"
];

const data = [
  // ... 保持原有数据不变 ...
  281400, 110893, 64293, 9723, 7237, 5863, 4721, 1642, 538, 513, 798, 380, 328,
  670, 126, 120, 111, 157, 117, 117, 112, 112, 116, 116, 115, 115, 110, 110, 109,
  108, 108, 105, 105, 105, 106, 106, 106, 106, 106, 107, 107, 107, 103, 103, 104,
  104, 99, 99, 99, 92, 95, 97, 98, 98, 101, 101, 102, 102, 43, 202, 11, 14, 7, 1, 1, 1
];

const option = {
  title: {
    text: '',
    subtext: ''
  },
  xAxis: {
    data: dataAxis,
    name: '类',  // 新增横坐标单位
    nameLocation: 'end',
    nameTextStyle: {
      fontSize: 14,
      color: '#666',
      padding: [20, 0, 0, 0]  // 向下调整位置
    },
    axisLabel: {
      inside: true,
      color: '#000',
      rotate: 45,  // 新增标签旋转
      margin: 8    // 增加标签间距
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
    name: '条',  // 新增纵坐标单位
    nameLocation: 'end',
    nameTextStyle: {
      fontSize: 14,
      color: '#666',
      padding: [0, 0, 20, 0]  // 向左调整位置
    },
    axisLine: {
      show: false
    },
    axisTick: {
      show: false
    },
    axisLabel: {
      color: '#999',
      margin: 8  // 统一标签间距
    }
  },
  grid: {  // 新增网格布局配置
    top: 60,
    bottom: 100,
    left: 80,
    right: 40,
    containLabel: true
  },
  dataZoom: [
    {
      type: 'inside',
      start: 0,
      end: 20  // 调整默认显示比例
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
      data: data,
      barWidth: '60%'  // 调整柱条宽度
    }
  ]
};

const chartRef = ref<HTMLElement | null>(null);
const zoomSize = 6;

onMounted(() => {
  if (chartRef.value) {
    const myChart = echarts.init(chartRef.value);
    myChart.setOption(option);

    myChart.on('click', function (params) {
      console.log(dataAxis[Math.max(params.dataIndex - zoomSize / 2, 0)]);
      myChart.dispatchAction({
        type: 'dataZoom',
        startValue: dataAxis[Math.max(params.dataIndex - zoomSize / 2, 0)],
        endValue: dataAxis[Math.min(params.dataIndex + zoomSize / 2, data.length - 1)]
      });
    });

    // 窗口大小自适应
    window.addEventListener('resize', () => myChart.resize());
  }
});
</script>

<style scoped>
.chart-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: calc(100vh - 50px);
  background: #fff;  /* 新增背景色 */
  padding: 20px;     /* 增加内边距 */
}
</style>