<template>
  <div id="app" class="container">
    <div class="main-content">
      <!-- Left Sidebar -->
      <div class="sidebar">
        <div class="data-selection">
          <h3>选择数据集</h3>
          <ul>
            <li>KDD 数据集</li>
            <li>CICIDS2017 数据集</li>
            <li>CICIDS2018 数据集</li>
          </ul>
        </div>

        <div class="model-selection">
          <h3>通用模型选择</h3>
          <button @click="selectModel('CNN')">选择FL-CT模型</button>
          <button @click="selectModel('Transformer')">选择决策树</button>
        </div>
      </div>

      <!-- Main Panel -->
      <div class="main-panel">
        <!-- 顶部状态区域 -->
        <div class="status-group">
          <div class="training-status">
            <h3>训练过程监控</h3>
            <div class="status-items">
              <p>工作状态: <span class="status running">已完成</span></p>
              <p>中心服务器状态: <span class="status active">正常</span></p>
              <div class="client-progress">
                <p>中心服务器聚合进度: <progress value="100" max="100"></progress> 100%</p>
                <p>客户端训练平均进度: <progress value="100" max="100"></progress> 100%</p>
              </div>
            </div>
          </div>

          <div class="history-record">
            <h3>历史记录 <span class="badge">{{ trainingRecords.length }}</span></h3>
            <div class="record-list">
              <div v-for="item in trainingRecords" :key="item.time" class="record-item">
                <time>{{ item.time }}</time>
                <p>{{ item.status }}</p>
              </div>
            </div>
          </div>
        </div>

        <!-- 底部图表区域 -->
        <div class="model-summary">
          <h3>模型性能指标</h3>
          <div class="chart-container">
            <canvas id="combined-chart"></canvas>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import Chart from "chart.js/auto";

export default {
  name: "App",
  setup() {
    const trainingRecords = ref([
      { time: "2025-4-15 22:35", status: "完成模型训练" },
      { time: "2025-4-14 22:12", status: "部分训练任务" }
    ]);

    onMounted(() => {
      const ctx = document.getElementById("combined-chart");
      new Chart(ctx, {
        type: "line",
        data: {
          labels: ["1", "2", "3", "4", "5"],
          datasets: [
            {
              label: "准确率",
              data: [80, 85, 87, 90, 92],
              borderColor: '#4CAF50',
              tension: 0.1,
              borderWidth: 2
            },
            {
              label: "F1 分数",
              data: [75, 78, 80, 85, 88],
              borderColor: '#2196F3',
              tension: 0.1,
              borderWidth: 2
            },
            {
              label: "召回率",
              data: [72, 76, 79, 82, 85],
              borderColor: '#FF9800',
              tension: 0.1,
              borderWidth: 2
            },
            {
              label: "精确率",
              data: [78, 81, 84, 87, 89],
              borderColor: '#9C27B0',
              tension: 0.1,
              borderWidth: 2
            }
          ]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            y: {
              beginAtZero: false,
              max: 100,
              title: { display: true, text: '百分比 (%)' },
              ticks: { callback: v => v + '%' }
            }
          },
          plugins: {
            legend: { position: 'top' },
            tooltip: {
              callbacks: {
                label: ctx => `${ctx.dataset.label}: ${ctx.raw}%`
              }
            }
          }
        }
      });
    });

    const selectModel = (model) => {
      console.log(`选择了 ${model} 模型`);
    };

    return { trainingRecords, selectModel };
  }
};
</script>

<style scoped>
/* 基础布局 */
.container {
  height: 100vh;
  display: flex;
  padding: 20px;
  background: #f5f7fa;
  font-family: 'Segoe UI', system-ui, sans-serif;
}

.main-content {
  flex: 1;
  display: grid;
  grid-template-columns: 240px 1fr;
  gap: 20px;
  height: calc(100vh - 40px);
}

/* 侧边栏样式 */
.sidebar {
  display: flex;
  flex-direction: column;
  gap: 20px;
  background: white;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.05);
}

.data-selection ul {
  padding: 0;
  margin: 0;
  list-style: none;
}

.data-selection li {
  padding: 12px;
  margin: 8px 0;
  border-radius: 8px;
  cursor: pointer;
  transition: background 0.2s;
}

.data-selection li:hover {
  background: #f8f9fa;
}

.model-selection button {
  width: 100%;
  padding: 12px;
  margin: 6px 0;
  border: none;
  border-radius: 8px;
  background: #e8f0fe;
  color: #1967d2;
  cursor: pointer;
  transition: all 0.2s;
}

.model-selection button:hover {
  background: #d2e3fc;
}

/* 主面板布局 */
.main-panel {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.status-group {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  height: 240px;
}

.training-status, .history-record {
  background: white;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.05);
}

.status-items {
  display: grid;
  gap: 12px;
  margin-top: 16px;
}

.client-progress progress {
  width: 160px;
  height: 8px;
  margin: 0 12px;
}

/* 历史记录样式 */
.record-list {
  height: calc(240px - 64px);
  overflow-y: auto;
  margin-top: 16px;
}

.record-item {
  padding: 12px;
  margin: 8px 0;
  background: #f8f9fa;
  border-radius: 8px;
}

.record-item time {
  display: block;
  font-size: 0.9em;
  color: #666;
}

/* 图表容器 */
.model-summary {
  flex: 1;
  min-height: 300px;
  background: white;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.05);
}

.chart-container {
  height: calc(100vh - 420px);
  position: relative;
}

/* 通用样式 */
h3 {
  margin: 0 0 16px;
  font-size: 16px;
  color: #1a1a1a;
  font-weight: 600;
}

.status {
  display: inline-block;
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 14px;
}

.status.running { background: #4d8bef; color: #21d949; }
.status.active { background: #e3f2fd; color: #1976d2; }

.badge {
  display: inline-block;
  padding: 2px 8px;
  background: #eee;
  border-radius: 10px;
  font-size: 0.9em;
}
</style>