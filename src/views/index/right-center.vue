<script setup lang="ts">
import { ref, reactive, defineExpose } from "vue";
import CapsuleChart from "@/components/datav/capsule-chart";
import { currentGET } from "@/api";

const config = ref({
  showValue: true,
  unit: "次",
});
// 默认占位数据
const data = ref<Array<{ name: string; value: number }>>([
  { name: '北京', value: 0 },
  { name: '上海', value: 0 },
  { name: '广州', value: 0 },
  { name: '深圳', value: 0 },
  { name: '杭州', value: 0 },
  { name: '成都', value: 0 },
  { name: '重庆', value: 0 },
  { name: '西安', value: 0 }
]);
const getData = () => {
  currentGET("rightCenter").then((res) => {
    console.log("城市排名", res);
    if (res.success) {
      data.value = res.data;
    } else {
      window["$message"]({
        text: res.msg,
        type: "warning",
      });
    }
  });
};
getData();

function updateData(cityStatsArr: Array<{name: string; value: number}>) {
  data.value = cityStatsArr;
}
defineExpose({ updateData });
</script>

<template>
  <div class="right_bottom">
    <CapsuleChart
      :config="config"
      style="width: 100%; height: 300px"
      :data="data"
    />
  </div>
</template>

<style scoped lang="scss">
.right_bottom {
  box-sizing: border-box;
  padding: 0 16px;
  margin-top: 60px;
}
</style>
