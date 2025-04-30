<script setup lang="ts">
import ItemWrap from "@/components/item-wrap";
import LeftTop from "./left-top.vue";
import LeftCenter from "./left-center.vue";
import LeftBottom from "./left-bottom.vue";
import CenterMap from "./center-map.vue";
import CenterBottom from "./center-bottom.vue";
import RightTop from "./right-top.vue";
import RightCenter from "./right-center.vue";
import RightBottom from "./right-bottom.vue";
import { ref } from 'vue';

const leftCenterRef = ref();
const rightCenterRef = ref();
const centerMapRef = ref();

function handleDetectFinished(results: Array<{label: string; location: string;}>) {
  // 统计 label 数量
  const labelsCount: Record<string, number> = {};
  results.forEach((item: {label: string}) => {
    labelsCount[item.label] = (labelsCount[item.label] || 0) + 1;
  });
  leftCenterRef.value?.updateAttackPie(labelsCount);

  // 城市名映射，保证与geojson一致
  const cityNameMap: Record<string, string> = {
    '北京': '北京市',
    '上海': '上海市',
    '广州': '广州市',
    '深圳': '深圳市',
    '杭州': '杭州市',
    '成都': '成都市',
    '重庆': '重庆市',
    '西安': '西安市',
    // 可补充其它常用城市
  };
  const cityStats: Record<string, number> = {};
  results.forEach((item: {location: string}) => {
    if (item.location) {
      const stdName = cityNameMap[item.location] || item.location;
      cityStats[stdName] = (cityStats[stdName] || 0) + 1;
    }
  });
  // 传递给右上角城市排名
  const cityStatsArr: Array<{name: string; value: number}> = Object.entries(cityStats).map(([name, value]) => ({ name, value }));
  rightCenterRef.value?.updateData(cityStatsArr);
  // 传递给地图
  centerMapRef.value?.updateData(cityStatsArr);
}
</script>

<template>
  <div class="index-box">
    <div class="contetn_left">
      <!-- <div class="pagetab">
        <div class="item">实时监测</div>
        <div class="item">统计分析</div>
      </div> -->
      <ItemWrap class="contetn_left-center left" title="攻击占比">
        <LeftCenter ref="leftCenterRef" />
      </ItemWrap>
      <ItemWrap class="contetn_left-top left" title="上一周的入侵流量统计">
        <LeftTop />
      </ItemWrap>
    </div>
    <div class="contetn_center">
      <CenterMap ref="centerMapRef" class="contetn_center_top" title="设备分布图" />
      <ItemWrap class="contetn_center-bottom" title="检测记录">
        <CenterBottom />
      </ItemWrap>
    </div>
    <div class="contetn_right">
      <!-- <ItemWrap class="contetn_left-bottom contetn_lr-item" title="报警次数">
        <RightTop />
      </ItemWrap> -->
      <ItemWrap
        class="contetn_left-bottom right"
        title="城市排名(TOP8)"
        style="padding: 0 10px 16px 10px"
      >
        <RightCenter ref="rightCenterRef" />
      </ItemWrap>
      <ItemWrap class="contetn_left-bottom right" title="威胁等级分布 ">
        <RightBottom @detect-finished="handleDetectFinished" />
      </ItemWrap>
    </div>
  </div>
</template>

<style scoped lang="scss">
.index-box {
  width: 100%;
  display: flex;
  min-height: calc(100% - 64px);
  justify-content: space-between;
}
//左边 右边 结构一样
.contetn_left,
.contetn_right {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  position: relative;
  width: 540px;
  box-sizing: border-box;
  flex-shrink: 0;
}
.contetn_center {
  flex: 1;
  margin: 0 54px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  .contetn_center-bottom {
    height: 315px;
  }
}

.contetn_lr-item {
  height: 310px;
}
.left {
  height: 480px;
  width: 540px;
}
.right {
  height: 480px;
  width: 540px;
}
</style>
