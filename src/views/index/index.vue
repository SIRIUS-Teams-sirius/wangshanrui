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
</script>

<template>
  <div class="index-box">
    <div class="contetn_left">
      <!-- <div class="pagetab">
        <div class="item">实时监测</div>
        <div class="item">统计分析</div>
      </div> -->
      <ItemWrap class="contetn_left-center left" title="攻击占比">
        <LeftCenter />
      </ItemWrap>
      <ItemWrap class="contetn_left-top left" title="上一周的入侵流量统计">
        <LeftTop />
      </ItemWrap>
    </div>
    <div class="contetn_center">
      <CenterMap class="contetn_center_top" title="设备分布图" />
      <ItemWrap class="contetn_center-bottom" title="检测详情">
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
        <RightCenter />
      </ItemWrap>
      <ItemWrap class="contetn_left-bottom right" title="威胁等级分布 ">
        <RightBottom />
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
