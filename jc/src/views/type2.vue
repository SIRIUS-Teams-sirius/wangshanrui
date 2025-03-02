<template>
    <div class="right-panel">
      <div id="container"></div>
    </div>
  </template>
   
  <script>
  import * as echarts from 'echarts';
   
  export default {
    name: 'PieChart',
    mounted() {
      this.initChart();
      window.addEventListener('resize', this.resizeChart);
    },
    beforeDestroy() {
      window.removeEventListener('resize', this.resizeChart);
    },
    methods: {
      initChart() {
        const dom = document.getElementById('container');
        const myChart = echarts.init(dom, null, {
          renderer: 'canvas',
          useDirtyRect: false,
        });
   
        const option = {
          title: {
            text: 'Type of attack',
            left: 'center',
            top: '6%',            // 顶部间距控制 
            textStyle: {          // 文本样式控制 
            fontSize: 18,
            fontWeight: 'bold'
            }
          },
          tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b} : {c} ({d}%)',
          },
          legend: {
            bottom: 10,
            left: 'center',
            data: ['DOS', 'R2L', 'U2R', 'Probe', 'Normal'],
          },
          series: [
            {
              type: 'pie',
              radius: '55%',
              center: ['40%', '50%'],
              selectedMode: 'single',
              data: [
                {
                  label: {
                    rich: {
                      title: {
                        color: '#eee',
                        align: 'center',
                      },
                      abg: {
                        backgroundColor: '#333',
                        width: '100%',
                        align: 'right',
                        height: 25,
                        borderRadius: [4, 4, 0, 0],
                      },
                      hr: {
                        borderColor: '#777',
                        width: '100%',
                        borderWidth: 0.5,
                        height: 0,
                      },
                      value: {
                        width: 20,
                        padding: [0, 20, 0, 30],
                        align: 'left',
                      },
                      valueHead: {
                        color: '#333',
                        width: 20,
                        padding: [0, 20, 0, 30],
                        align: 'center',
                      },
                      rate: {
                        width: 40,
                        align: 'right',
                        padding: [0, 10, 0, 0],
                      },
                      rateHead: {
                        color: '#333',
                        width: 40,
                        align: 'center',
                        padding: [0, 10, 0, 0],
                      },
                    },
                  },
                },
                { value: 99483, name: 'Normal' },
                { value: 4107, name: 'Probe' },
                { value: 52, name: 'U2R' },
                { value: 389255, name: 'DOS' },
                { value: 1124, name: 'R2L' },
              ],
              emphasis: {
                itemStyle: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: 'rgba(0, 0, 0, 0.5)',
                },
              },
            },
          ],
        };
   
        if (option && typeof option === 'object') {
          myChart.setOption(option);
        }
      },
      resizeChart() {
        const dom = document.getElementById('container');
        const myChart = echarts.getInstanceByDom(dom);
        if (myChart) {
          myChart.resize();
        }
      },
    },
  };
  </script>
   
  <style scoped>
  .right-panel {  
    display: flex;          /* 新增弹性布局 */
    justify-content: center;/* 水平居中 */
    align-items: center;    /* 垂直居中 */
    position: fixed;
    right: 0;
    top: 0;
    width: 50%; 
    height: 100vh;
    background: white;
    /* 中间的分割线： */
    /* box-shadow: -2px 0 8px rgba(0,0,0,0.1); */
  }
   
  #container {
    width: 90%;             /* 留白防止溢出 */
    height: 100%;            /* 留白防止溢出 */
    min-height: 500px;
    position: relative;     /* 为子元素定位提供基准 */
  }
  </style>