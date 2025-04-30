<template>
  <div id="app" class="container">
    <div class="main-content">
      <!-- Left Sidebar -->
      <div class="sidebar">
        <div class="data-selection">
          <h3>选择数据集</h3>
          <ul>
            <li v-for="item in datasets" :key="item.value" :class="{selected: selectedDataset === item.value}" @click="selectDataset(item)">{{ item.label }}</li>
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
                  <label>任务ID:</label>
                  <input v-model="flctParams.task_id" placeholder="task_id">
                </div>
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
                <div class="param-item">
                  <label>Batch Size:</label>
                  <input type="number" v-model.number="flctParams.batch_size" min="1">
                </div>
                <div class="param-item">
                  <label>Learning Rate:</label>
                  <input type="number" step="0.0001" v-model.number="flctParams.learning_rate" min="0">
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
                  <label>任务ID:</label>
                  <input v-model="dtParams.task_id" placeholder="task_id">
                </div>
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
                <div class="param-item">
                  <label>Batch Size:</label>
                  <input type="number" v-model.number="dtParams.batch_size" min="1">
                </div>
                <div class="param-item">
                  <label>Learning Rate:</label>
                  <input type="number" step="0.0001" v-model.number="dtParams.learning_rate" min="0">
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
              <p>工作状态: <span :class="['status', trainingStatus]">
                <template v-if="trainingStatus === 'started'">训练已开始</template>
                <template v-else-if="trainingStatus === 'running'">训练中</template>
                <template v-else-if="trainingStatus === 'completed'">已完成</template>
                <template v-else>空闲</template>
              </span>
              <span v-if="taskIdDisplay" class="task-id">任务ID: {{ taskIdDisplay }}</span>
              </p>
              <p>中心服务器状态: <span class="status active">正常</span></p>
              <div class="client-progress">
                <p>训练进度:
                  <progress :value="trainingProgress" max="100"></progress>
                  {{ trainingProgress }}%
                </p>
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
          <!-- 新增：训练日志展示 -->
          <div v-if="trainingLogs.length" class="training-logs">
            <h4>训练日志</h4>
            <pre style="max-height:200px;overflow:auto;background:#222;color:#0f0;padding:10px;border-radius:8px;">{{ trainingLogs.join('\n') }}</pre>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import Chart from "chart.js/auto";
import { federatedPOST, federatedGET } from '@/api/federatedApi';

export default {
  name: "App",
  setup() {
    // 数据集相关
    const datasets = [
      { label: 'KDD 数据集', value: 'KDD99' },
      { label: 'CICIDS2017 数据集', value: 'CICIDS2017' },
      { label: 'CICIDS2018 数据集', value: 'CICIDS2018' }
    ];
    const selectedDataset = ref('KDD');

    // 模型参数
    const activeMenu = ref(null);
    const flctParams = ref({
      task_id: '',
      clients: 3,
      localEpochs: 5,
      globalEpochs: 10,
      batch_size: 32,
      learning_rate: 0.01
    });
    const dtParams = ref({
      task_id: '',
      clients: 2,
      localEpochs: 3,
      globalEpochs: 5,
      batch_size: 32,
      learning_rate: 0.01
    });

    // 训练状态
    const trainingStatus = ref('idle');
    const trainingRecords = ref([
      { time: "2025-04-17 14:30", status: "FL-CT模型训练完成" },
      { time: "2025-04-17 16:45", status: "决策树模型训练完成" }
    ]);
    const taskIdDisplay = ref('');
    const trainingLogs = ref([]); // 训练日志
    const latestLog = ref(''); // 最新日志
    const trainingProgress = ref(0); // 训练进度百分比
    let logInterval = null; // 轮询定时器
    let chartInstance = null; // 折线图实例
    const chartData = ref({ epochs: [], acc: [], time: [] });

    // 图表初始化
    onMounted(() => {
      const ctx = document.getElementById("combined-chart");
      chartInstance = new Chart(ctx, {
        type: "line",
        data: {
          labels: chartData.value.epochs,
          datasets: [
            { label: "Val Acc", data: chartData.value.acc, borderColor: '#4CAF50', yAxisID: 'y1' },
            { label: "Time (s)", data: chartData.value.time, borderColor: '#2196F3', yAxisID: 'y2' }
          ]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            y1: { type: 'linear', position: 'left', beginAtZero: true, title: { display: true, text: 'Val Acc' } },
            y2: { type: 'linear', position: 'right', beginAtZero: true, title: { display: true, text: 'Time (s)' }, grid: { drawOnChartArea: false } }
          },
          plugins: { legend: { position: 'top' } }
        }
      });
    });

    // 数据集选择
    const selectDataset = async (item) => {
      selectedDataset.value = item.value;
      try {
        await federatedPOST('/client/set_dataset', { data_file: item.value });
      } catch (e) {
        alert('数据集选择失败');
      }
    };

    // 方法
    const toggleMenu = (menu) => {
      activeMenu.value = activeMenu.value === menu ? null : menu;
    };

    // 训练
    const startTraining = async (modelType) => {
      // 新增：每次开始训练时重置图表和训练日志
      if (chartInstance) {
        chartInstance.data.labels = [];
        chartInstance.data.datasets[0].data = [];
        chartInstance.data.datasets[1].data = [];
        chartInstance.update();
      }
      trainingLogs.value = [];
      latestLog.value = '';
      trainingProgress.value = 0;
      chartData.value = { epochs: [], acc: [], time: [] };
      trainingStatus.value = 'running';
      let params = modelType === 'FL-CT' ? flctParams.value : dtParams.value;
      const trueModelType = modelType === 'FL-CT' ? 'multiclass' : 'decisiontree';
      const payload = {
        task_id: params.task_id,
        num_clients: params.clients,
        model_type: trueModelType,
        client_epochs: params.localEpochs,
        global_epochs: params.globalEpochs,
        batch_size: params.batch_size,
        learning_rate: params.learning_rate,
        data_file: selectedDataset.value
      };
      trainingRecords.value.unshift({
        time: new Date().toLocaleString(),
        status: `${modelType}训练启动 (客户端: ${params.clients})`
      });
      try {
        const res = await federatedPOST('/client/train', payload);
        if (res && res.message != '') {
          trainingStatus.value = 'started';
          taskIdDisplay.value = res.task_id || '';
          trainingRecords.value.unshift({
            time: new Date().toLocaleString(),
            status: res.message + (res.task_id ? ` (task_id: ${res.task_id})` : '')
          });
          // 新增：开始轮询获取训练日志
          startLogPolling(res.task_id);
        } else {
          trainingStatus.value = 'completed';
          trainingRecords.value.unshift({
            time: new Date().toLocaleString(),
            status: res.msg || `${modelType}训练已提交`
          });
        }
      } catch (e) {
        trainingRecords.value.unshift({
          time: new Date().toLocaleString(),
          status: '训练请求失败'
        });
        trainingStatus.value = 'idle';
      }
    };

    // 轮询获取训练日志并更新进度和图表
    const startLogPolling = (taskId) => {
      if (logInterval) clearInterval(logInterval);
      trainingLogs.value = [];
      latestLog.value = '';
      trainingProgress.value = 0;
      chartData.value = { epochs: [], acc: [], time: [] };
      logInterval = setInterval(async () => {
        try {
          const res = await federatedGET(`/client/progress/${taskId}`);
          if (res && res.all_logs) {
            trainingLogs.value = res.all_logs;
            latestLog.value = res.latest_log || '';
            // 统一：所有状态判断和轮询停止都根据 latest_log 的 epoch 分数
            let current = 0, total = 0;
            const match = latestLog.value.match(/Global Epoch (\d+)[^\d]+(\d+)/);
            if (match) {
              current = parseInt(match[1]);
              total = parseInt(match[2]);
              trainingProgress.value = total > 0 ? Math.round((current / total) * 100) : 0;
            } else {
              trainingProgress.value = 0;
            }
            // 状态判断优化
            if (total > 0 && current === total) {
              trainingStatus.value = 'completed';
              // 训练完成后停止轮询
              clearInterval(logInterval);
              logInterval = null;
            } else if (current > 0 && current < total) {
              trainingStatus.value = 'running';
            } else if (current === 0) {
              trainingStatus.value = 'started';
            } else {
              trainingStatus.value = 'idle';
            }
            // 解析折线图数据
            const epochs = [], acc = [], time = [];
            for (const log of res.all_logs) {
              const m = log.match(/Global Epoch (\d+)[^\d]+(\d+).*Val Acc: ([\d.]+), Time: ([\d.]+)s/);
              if (m) {
                epochs.push(Number(m[1]));
                acc.push(Number(m[3]));
                time.push(Number(m[4]));
              }
            }
            chartData.value = { epochs, acc, time };
            updateChart();
          }
        } catch (e) {
          // 失败时不清除定时器
        }
      }, 3000);
    };

    // 折线图更新
    const updateChart = () => {
      if (!chartInstance) {
        const ctx = document.getElementById("combined-chart");
        chartInstance = new Chart(ctx, {
          type: "line",
          data: {
            labels: chartData.value.epochs,
            datasets: [
              { label: "Val Acc", data: chartData.value.acc, borderColor: '#4CAF50', yAxisID: 'y1' },
              { label: "Time (s)", data: chartData.value.time, borderColor: '#2196F3', yAxisID: 'y2' }
            ]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
              y1: { type: 'linear', position: 'left', beginAtZero: true, title: { display: true, text: 'Val Acc' } },
              y2: { type: 'linear', position: 'right', beginAtZero: true, title: { display: true, text: 'Time (s)' }, grid: { drawOnChartArea: false } }
            },
            plugins: { legend: { position: 'top' } }
          }
        });
      } else {
        chartInstance.data.labels = chartData.value.epochs;
        chartInstance.data.datasets[0].data = chartData.value.acc;
        chartInstance.data.datasets[1].data = chartData.value.time;
        chartInstance.update();
      }
    };

    return {
      datasets,
      selectedDataset,
      selectDataset,
      activeMenu,
      flctParams,
      dtParams,
      trainingStatus,
      trainingRecords,
      toggleMenu,
      startTraining,
      taskIdDisplay,
      trainingLogs,
      latestLog,
      trainingProgress,
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

.data-selection li.selected {
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