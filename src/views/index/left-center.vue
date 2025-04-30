<script setup lang="ts">
import { ref, reactive } from "vue";
import { graphic } from "echarts/core";
import { currentGET } from "@/api";

let colors = ["#0BFC7F", "#A0A0A0", "#F48C02", "#F4023C"];

// 先声明echartsGraphic
const echartsGraphic = (colors: string[]) => {
  return new graphic.LinearGradient(1, 0, 0, 0, [
    { offset: 0, color: colors[0] },
    { offset: 1, color: colors[1] },
  ]);
};

const option = ref({});
const state = reactive({
  lockNum: 0,
  offlineNum: 0,
  onlineNum: 0,
  alarmNum: 0,
  totalNum: 0,
});

// 只保留 value 和 name
const attackPieData = ref([
  { value: 0, name: 'dos' },
  { value: 0, name: 'probe' },
  { value: 0, name: 'u2r' },
  { value: 0, name: 'r2l' }
]);

const colorMap = [
  echartsGraphic(["#0BFC7F", "#A3FDE0"]),
  echartsGraphic(["#A0A0A0", "#DBDFDD"]),
  echartsGraphic(["#F48C02", "#FDDB7D"]),
  echartsGraphic(["#F4023C", "#FB6CB7"])
];

// 提供外部调用方法，更新饼图数据
function updateAttackPie(labelsCount: Record<string, number>) {
  const labelOrder = ['dos', 'probe', 'u2r', 'r2l'];
  attackPieData.value = labelOrder.map(label => ({
    value: labelsCount[label] || 0,
    name: label
  }));
  setOption();
}
defineExpose({ updateAttackPie });

const getData = () => {
  currentGET("leftCenter").then((res) => {
    console.log(res);
    if (res.success) {
      state.lockNum = res.data.lockNum;
      state.offlineNum = res.data.offlineNum;
      state.onlineNum = res.data.onlineNum;
      state.totalNum = res.data.totalNum;
      state.alarmNum = res.data.alarmNum;
      setOption();
    }
  });
};
getData();

const setOption = () => {
  option.value = {
    title: {
      top: "center",
      left: "center",
      text: `{name|攻击占比}`,
      textStyle: {
        rich: {
          name: {
            color: "#ffffff",
            fontSize: 18,
            lineHeight: 20,
          },
        },
      },
    },
    tooltip: {
      trigger: "item",
      backgroundColor: "rgba(0,0,0,.6)",
      borderColor: "rgba(147, 235, 248, .8)",
      textStyle: { color: "#FFF" },
    },
    series: [
      {
        name: "攻击占比",
        type: "pie",
        radius: ["30%", "60%"],
        itemStyle: { borderRadius: 6, borderColor: "rgba(255,255,255,0)", borderWidth: 2 },
        color: colorMap,
        label: {
          show: true,
          formatter: "   {b|{b}}   \n   {c|{c}个}   {per|{d}%}  ",
          rich: {
            b: { color: "#fff", fontSize: 12, lineHeight: 26 },
            c: { color: "#31ABE3", fontSize: 14 },
            per: { color: "#31ABE3", fontSize: 14 },
          },
        },
        emphasis: { show: false },
        legend: { show: false },
        tooltip: { show: true },
        labelLine: { show: true, length: 20, length2: 36, smooth: 0.2, lineStyle: {} },
        data: attackPieData.value.map((d, idx) => ({
          ...d,
          itemStyle: { color: colorMap[idx] }
        })),
      },
    ],
  };
};
</script>

<template>
  <v-chart class="chart" :option="option" />
</template>

<style scoped lang="scss"></style>
