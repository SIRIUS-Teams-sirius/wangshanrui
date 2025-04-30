<script setup lang="ts">
import { ref, defineEmits } from "vue";
import { detectTraffic } from '@/api/detectApi';

const detecting = ref(false);
const detectResultMsg = ref('');
const emit = defineEmits(['detect-finished']);

// 获取csv并上传检测
const handleStartDetect = async () => {
  try {
    detecting.value = true;
    detectResultMsg.value = '正在获取CSV文件...';
    // 1. 获取csv文件
    const csvResponse = await fetch('http://127.0.0.1:5000/server/get_csv');
    const blob = await csvResponse.blob();
    const file = new File([blob], 'detect.csv', { type: 'text/csv' });
    detectResultMsg.value = '正在上传检测...';
    // 2. 上传到/server/detect
    const res = await detectTraffic(file, 'auto'); // location可根据实际需求填写
    detectResultMsg.value = '检测完成';
    emit('detect-finished', res.results); // 新增：通知父组件
    // 可在此处触发全局事件或store更新，通知其它组件刷新数据
    // 如：emit('detect-finished', res)
  } catch (e) {
    detectResultMsg.value = '检测失败';
  } finally {
    detecting.value = false;
  }
};

const handleStopDetect = () => {
  // 终止检测逻辑（如需实现可补充）
  detectResultMsg.value = '检测已终止';
  detecting.value = false;
};
</script>

<template>
  <div class="detect-btn-group">
    <button :disabled="detecting" @click="handleStartDetect">开始检测</button>
    <button :disabled="!detecting" @click="handleStopDetect">终止检测</button>
    <div v-if="detectResultMsg" style="margin-top:10px;color:#31ABE3;">{{ detectResultMsg }}</div>
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
