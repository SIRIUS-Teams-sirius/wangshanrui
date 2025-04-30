<script setup lang="ts">
import { ref, defineEmits } from "vue";
import { detectTraffic } from '@/api/detectApi';
import axios from 'axios';

const detecting = ref(false);
const modelPathInput = ref(''); // 新增：模型路径输入
const setModelMsg = ref('');
const emit = defineEmits(['detect-finished']);

// 获取csv并上传检测
const handleStartDetect = async () => {
  try {
    detecting.value = true;
    // 1. 获取csv文件
    const csvResponse = await fetch('http://127.0.0.1:5000/server/get_csv');
    const blob = await csvResponse.blob();
    const file = new File([blob], 'detect.csv', { type: 'text/csv' });
    // 2. 上传到/server/detect
    const res = await detectTraffic(file, 'auto'); // location可根据实际需求填写
    emit('detect-finished', res.results); // 新增：通知父组件
    // 可在此处触发全局事件或store更新，通知其它组件刷新数据
    // 如：emit('detect-finished', res)
  } catch (e) {
    // 可选：如需错误提示可在此处处理
  } finally {
    detecting.value = false;
  }
};

const handleStopDetect = () => {
  detecting.value = false;
};

const handleSetModel = async () => {
  if (!modelPathInput.value) return;
  try {
    setModelMsg.value = '正在切换模型...';
    await axios.post('http://127.0.0.1:5000/server/set_model', { model_path: modelPathInput.value });
    setModelMsg.value = '模型切换成功';
  } catch (e) {
    setModelMsg.value = '模型切换失败';
  }
};
</script>

<template>
  <div class="detect-btn-group">
    <!-- 新增：模型选择输入框及按钮 -->
    <div style="margin-bottom:12px;width:100%;display:flex;flex-direction:column;align-items:center;">
      <input v-model="modelPathInput" placeholder="输入模型路径" style="width:80%;padding:6px 10px;border-radius:6px;border:1px solid #ccc;" />
      <button style="margin-top:6px;padding:6px 18px;font-size:15px;" @click="handleSetModel">切换模型</button>
      <div v-if="setModelMsg" style="color:#4d8bef;margin-top:4px;">{{ setModelMsg }}</div>
    </div>
    <button :disabled="detecting" @click="handleStartDetect">开始检测</button>
    <button :disabled="!detecting" @click="handleStopDetect">终止检测</button>
  </div>
</template>

<style scoped>
.detect-btn-group {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
}
button {
  margin: 8px 0;
  padding: 10px 32px;
  font-size: 16px;
  border-radius: 8px;
  border: none;
  background: linear-gradient(90deg, #4d8bef 0%, #4CAF50 100%);
  color: white;
  font-weight: bold;
  cursor: pointer;
  transition: background 0.2s;
}
button:disabled {
  background: #ccc;
  cursor: not-allowed;
}
</style>
