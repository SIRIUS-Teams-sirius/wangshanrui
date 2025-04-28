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
          <div class="model-option">
            <button @click="toggleMenu('flct')">
              选择FL-CT模型
              <span class="arrow">{{ activeMenu === 'flct' ? '▲' : '▼' }}</span>
            </button>
            <transition name="slide">
              <div v-show="activeMenu === 'flct'" class="param-menu">
                <div class="param-item">
                  <label>客户端数量:</label>
                  <input type="number" v-model.number="flctParams.clients" min="1">
                </div>
                <div class="param-item">
                  <label>客户端训练轮数:</label>
                  <input type="number" v-model.number="flctParams.localEpochs" min="1">
                </div>
                <div class="param-item">
                  <label>全局训练轮数:</label>
                  <input type="number" v-model.number="flctParams.globalEpochs" min="1">
                </div>
                <button class="start-btn" @click="startTraining('FL-CT')">
                  开始训练
                </button>
              </div>
            </transition>
          </div>

          <div class="model-option">
            <button @click="toggleMenu('dt')">
              选择决策树
              <span class="arrow">{{ activeMenu === 'dt' ? '▲' : '▼' }}</span>
            </button>
            <transition name="slide">
              <div v-show="activeMenu === 'dt'" class="param-menu">
                <div class="param-item">
                  <label>客户端数量:</label>
                  <input type="number" v-model.number="dtParams.clients" min="1">
                </div>
                <div class="param-item">
                  <label>客户端训练轮数:</label>
                  <input type="number" v-model.number="dtParams.localEpochs" min="1">
                </div>
                <div class="param-item">
                  <label>全局训练轮数:</label>
                  <input type="number" v-model.number="dtParams.globalEpochs" min="1">
                </div>
                <button class="start-btn" @click="startTraining('DecisionTree')">
                  开始训练
                </button>
              </div>
            </transition>
          </div>
        </div>
      </div>

      <!-- Main Panel -->
      <div class="main-panel">
        <div class="status-group">
          <div class="training-status">
            <h3>训练过程监控</h3>
            <div class="status-items">
              <p>工作状态: <span :class="['status', trainingStatus]">{{ statusText }}</span></p>
              <p>中心服务器状态: <span class="status active">正常</span></p>
              <div class="client-progress">
                <p>聚合进度: <progress :value="aggregateProgress" max="100"></progress> {{ aggregateProgress }}%</p>
                <p>平均训练进度: <progress :value="averageProgress" max="100"></progress> {{ averageProgress }}%</p>
                <button>查看联邦</button>
              </div>
            </div>
          </div>

          <div class="history-record">
            <h3>历史记录 <span class="badge">{{ trainingRecords.length }}</span></h3>
            <div class="record-list">
              <div v-for="(item, index) in trainingRecords" :key="index" class="record-item">
                <time>{{ item.time }}</time>
                <p>{{ item.status }}</p>
              </div>
            </div>
          </div>
        </div>

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
    // 模型参数
    const activeMenu = ref(null);
    const flctParams = ref({ clients: 3, localEpochs: 5, globalEpochs: 10 });
    const dtParams = ref({ clients: 2, localEpochs: 3, globalEpochs: 5 });

    // 训练状态
    const trainingStatus = ref('idle');
    const aggregateProgress = ref(100);
    const averageProgress = ref(100);
    const trainingRecords = ref([
      { time: "2025-04-17 14:30", status: "FL-CT模型训练完成" },
      { time: "2025-04-17 16:45", status: "决策树模型训练完成" }
    ]);

    // 图表初始化
    onMounted(() => {
      const ctx = document.getElementById("combined-chart");
      new Chart(ctx, {
        type: "line",
        data: {
          labels: ["1", "2", "3", "4", "5"],
          datasets: [
            { label: "准确率", data: [80,85,87,90,92], borderColor: '#4CAF50' },
            { label: "F1 分数", data: [75,78,80,85,88], borderColor: '#2196F3' },
            { label: "召回率", data: [72,76,79,82,85], borderColor: '#FF9800' },
            { label: "精确率", data: [78,81,84,87,89], borderColor: '#9C27B0' }
          ]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: { y: { beginAtZero: false, max: 100, ticks: { callback: v => v + '%' } } },
          plugins: { legend: { position: 'top' } }
        }
      });
    });

    // 方法
    const toggleMenu = (menu) => {
      activeMenu.value = activeMenu.value === menu ? null : menu;
    };

    const startTraining = (modelType) => {
      trainingStatus.value = 'running';
      trainingRecords.value.unshift({
        time: new Date().toLocaleString(),
        status: `${modelType}训练启动 (客户端: ${modelType === 'FL-CT' ? flctParams.value.clients : dtParams.value.clients})`
      });
      console.log(`${modelType}训练参数:`, modelType === 'FL-CT' ? flctParams.value : dtParams.value);
      setTimeout(() => {
        trainingStatus.value = 'completed';
      }, 3000);
    };

    return {
      activeMenu,
      flctParams,
      dtParams,
      trainingStatus,
      aggregateProgress,
      averageProgress,
      trainingRecords,
      toggleMenu,
      startTraining,
      statusText: ref('已完成'),
    };
  }
};
</script>

<style scoped>
/* 基础布局 */
.container {
  height: 100vh;
  padding: 20px;
  background: linear-gradient(135deg, #e3f0ff 0%, #f5f7fa 100%);
  font-family: 'Segoe UI', system-ui, sans-serif;
}

.main-content {
  display: grid;
  grid-template-columns: 280px 1fr;
  gap: 20px;
  height: calc(100vh - 40px);
}

/* 侧边栏 */
.sidebar {
  display: flex;
  flex-direction: column;
  gap: 20px;
  background: linear-gradient(120deg, #f8fbff 60%, #e3f0fe 100%);
  border-radius: 18px;
  padding: 24px 20px;
  box-shadow: 0 4px 24px rgba(77,139,239,0.10);
}

.data-selection ul {
  padding: 0;
  margin: 0;
  list-style: none;
}

.data-selection li {
  padding: 12px 18px;
  margin: 8px 0;
  border-radius: 10px;
  cursor: pointer;
  transition: background 0.2s, box-shadow 0.2s;
  font-weight: 500;
  color: #1967d2;
}

.data-selection li:hover {
  background: #e3f2fd;
  box-shadow: 0 2px 8px rgba(77,139,239,0.08);
}

/* 模型选择样式 */
.model-option {
  position: relative;
  margin: 12px 0;
}

.model-option button {
  width: 100%;
  padding: 14px 16px;
  background: linear-gradient(90deg, #e8f0fe 60%, #d2e3fc 100%);
  border: none;
  border-radius: 10px;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #1967d2;
  font-weight: 600;
  font-size: 16px;
  box-shadow: 0 2px 8px rgba(77,139,239,0.06);
  transition: all 0.2s;
}

.model-option button:hover {
  background: linear-gradient(90deg, #d2e3fc 60%, #e8f0fe 100%);
  filter: brightness(1.05);
}

.param-menu {
  position: absolute;
  width: 100%;
  background: #fff;
  border-radius: 10px;
  padding: 18px 15px 12px 15px;
  margin-top: 8px;
  box-shadow: 0 6px 24px rgba(77,139,239,0.12);
  z-index: 10;
}

.param-item {
  display: grid;
  grid-template-columns: 1fr 80px;
  gap: 10px;
  align-items: center;
  margin: 12px 0;
}

.param-item label {
  font-size: 15px;
  color: #1967d2;
  font-weight: 500;
}

.param-item input {
  padding: 8px 0;
  border: 1px solid #d2e3fc;
  border-radius: 6px;
  text-align: center;
  background: #f8fbff;
  font-size: 15px;
  color: #1967d2;
  transition: border 0.2s;
}
.param-item input:focus {
  border: 1.5px solid #4d8bef;
  outline: none;
  background: #e3f2fd;
}

.start-btn {
  width: 100%;
  padding: 12px 0;
  background: linear-gradient(90deg, #4d8bef 0%, #4CAF50 100%);
  color: white;
  border: none;
  border-radius: 8px;
  margin-top: 18px;
  cursor: pointer;
  font-size: 16px;
  font-weight: bold;
  box-shadow: 0 2px 8px rgba(77,139,239,0.10);
  transition: background 0.3s, filter 0.2s;
}

.start-btn:hover {
  filter: brightness(1.08);
}

/* 主面板样式 */
.main-panel {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.status-group {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;
  height: 240px;
}

.training-status, .history-record {
  background: linear-gradient(120deg, #f8fbff 60%, #e3f0fe 100%);
  border-radius: 16px;
  padding: 24px 20px;
  box-shadow: 0 4px 24px rgba(77,139,239,0.10);
  transition: box-shadow 0.2s, transform 0.2s;
}
.training-status:hover, .history-record:hover {
  box-shadow: 0 8px 32px rgba(77,139,239,0.16);
  transform: translateY(-2px) scale(1.01);
}

.status-items p {
  margin-bottom: 12px;
}

.status {
  padding: 4px 16px;
  border-radius: 20px;
  font-size: 15px;
  font-weight: 600;
  letter-spacing: 1px;
}

.status.running { background: #4d8bef; color: white; }
.status.completed { background: #4CAF50; color: white; }
.status.active { background: #e3f2fd; color: #1976d2; }

.client-progress progress {
  width: 70%;
  height: 12px;
  border-radius: 6px;
  background: #e3eafc;
  accent-color: #4d8bef;
  box-shadow: 0 1px 4px rgba(77,139,239,0.08);
  margin-right: 8px;
}

.client-progress p {
  margin: 8px 0;
  font-size: 15px;
}

.client-progress button {
  margin-top: 8px;
  background: #fffbe6;
  color: #faad14;
  border: none;
  border-radius: 6px;
  padding: 6px 18px;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s;
}
.client-progress button:hover {
  background: #fff1b8;
}

.history-record {
  position: relative;
}

.badge {
  background: #4d8bef;
  color: #fff;
  border-radius: 10px;
  padding: 2px 10px;
  font-size: 13px;
  margin-left: 8px;
}

.record-list {
  margin-top: 16px;
  max-height: 140px;
  overflow-y: auto;
}

.record-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 8px 0;
  border-bottom: 1px dashed #e3eafc;
  font-size: 15px;
  color: #1967d2;
  transition: background 0.2s;
}
.record-item:last-child {
  border-bottom: none;
}
.record-item:hover {
  background: #f0f7ff;
}

.record-item time {
  font-size: 13px;
  color: #999;
  min-width: 120px;
}

.model-summary {
  background: linear-gradient(120deg, #f8fbff 60%, #e3f0fe 100%);
  border-radius: 16px;
  padding: 24px 20px;
  box-shadow: 0 4px 24px rgba(77,139,239,0.10);
}

.model-summary h3 {
  margin-bottom: 18px;
  color: #1967d2;
  font-weight: 600;
}

.chart-container {
  height: calc(100vh - 420px);
  position: relative;
  background: white;
  border-radius: 14px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.08);
  padding: 18px 10px 10px 10px;
}

/* 动画效果 */
.slide-enter-active, .slide-leave-active {
  transition: all 0.3s ease;
}
.slide-enter-from, .slide-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}

@media (max-width: 900px) {
  .main-content {
    grid-template-columns: 1fr;
  }
  .sidebar {
    margin-bottom: 18px;
  }
  .status-group {
    grid-template-columns: 1fr;
    height: auto;
  }
}
</style>