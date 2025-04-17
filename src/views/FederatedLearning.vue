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
  background: #f5f7fa;
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
  background: white;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
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

/* 模型选择样式 */
.model-option {
  position: relative;
  margin: 12px 0;
}

.model-option button {
  width: 100%;
  padding: 12px;
  background: #e8f0fe;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #1967d2;
  transition: all 0.2s;
}

.model-option button:hover {
  background: #d2e3fc;
}

.param-menu {
  position: absolute;
  width: 100%;
  background: white;
  border-radius: 8px;
  padding: 15px;
  margin-top: 8px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
  z-index: 10;
}

.param-item {
  display: grid;
  grid-template-columns: 1fr 80px;
  gap: 10px;
  align-items: center;
  margin: 10px 0;
}

.param-item label {
  font-size: 14px;
  color: #666;
}

.param-item input {
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
  text-align: center;
}

.start-btn {
  width: 100%;
  padding: 10px;
  background: #4CAF50;
  color: white;
  border: none;
  border-radius: 6px;
  margin-top: 15px;
  cursor: pointer;
  transition: background 0.3s;
}

.start-btn:hover {
  background: #45a049;
}

/* 主面板样式 */
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
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}

.status {
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 14px;
}

.status.running { background: #4d8bef; color: white; }
.status.completed { background: #4CAF50; color: white; }
.status.active { background: #e3f2fd; color: #1976d2; }

.chart-container {
  height: calc(100vh - 420px);
  position: relative;
  background: white;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}

/* 动画效果 */
.slide-enter-active, .slide-leave-active {
  transition: all 0.3s ease;
}
.slide-enter-from, .slide-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>