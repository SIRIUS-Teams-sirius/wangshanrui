<<<<<<< HEAD
<!-- 连的左中api， leftCenter: "/bigscreen/countUserNum" -->
<script setup lang="ts">
import { ref, reactive } from "vue";
import { graphic } from "echarts/core";
import { currentGET } from "@/api";

let colors = ["#0BFC7F", "#A0A0A0", "#F48C02", "#F4023C"];
const option = ref({});
const state = reactive({
  low: 0,
  medium: 0,
  high: 0,

  onlineNum: 0,
  alarmNum: 0,
  totalNum: 0,
});
const echartsGraphic = (colors: string[]) => {
  return new graphic.LinearGradient(1, 0, 0, 0, [
    { offset: 0, color: colors[0] },
    { offset: 1, color: colors[1] },
  ]);
};
const getData = () => {
  currentGET("leftCenter").then((res) => {
    console.log(res);
    if (res.success) {
      state.low = res.data.lockNum;
      state.medium = res.data.offlineNum;
      state.high = res.data.onlineNum;
      state.totalNum = res.data.totalNum;
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
      // text: [`{value|${state.totalNum}}`, "{name|总数}"].join("\n"),
      textStyle: {
        rich: {
          value: {
            color: "#ffffff",
            fontSize: 24,
            fontWeight: "bold",
            lineHeight: 20,
            padding: [4, 0, 4, 0],
          },
          name: {
            color: "#ffffff",
            lineHeight: 20,
          },
        },
      },
    },
    tooltip: {
      trigger: "item",
      backgroundColor: "rgba(0,0,0,.6)",
      borderColor: "rgba(147, 235, 248, .8)",
      textStyle: {
        color: "#FFF",
      },
    },
    series: [
      {
        name: "用户总览",
        type: "pie",
        radius: ["0%", "60%"],
        // avoidLabelOverlap: false,
        itemStyle: {
          borderRadius: 6,
          borderColor: "rgba(255,255,255,0)",
          borderWidth: 2,
        },
        color: colors,
        label: {
          show: true,
          formatter: "   {b|{b}}   \n   {c|{c}个}   {per|{d}%}  ",
          //   position: "outside",
          rich: {
            b: {
              color: "#fff",
              fontSize: 12,
              lineHeight: 26,
            },
            c: {
              color: "#31ABE3",
              fontSize: 14,
            },
            per: {
              color: "#31ABE3",
              fontSize: 14,
            },
          },
        },
        emphasis: {
          show: false,
        },
        legend: {
          show: false,
        },
        tooltip: { show: true },

        labelLine: {
          show: true,
          length: 20, // 第一段线 长度
          length2: 36, // 第二段线 长度
          smooth: 0.2,
          lineStyle: {},
        },
        data: [
          {
            value: state.high,
            name: "高威胁",
            itemStyle: {
              color: echartsGraphic(["#c92a2a", "#ff6b6b"]),
            },
          },
          {
            value: state.medium,
            name: "中威胁",
            itemStyle: {
              color: echartsGraphic(["#d6336c", "#faa2c1"]),
            },
          },
          {
            value: state.low,
            name: "低威胁",
            itemStyle: {
              color: echartsGraphic(["#F48C02", "#FDDB7D"]),
            },
          },
        ],
      },
    ],
  };
};
</script>

<template>
  <v-chart class="chart" :option="option" />
</template>

<style scoped lang="scss"></style>
=======
<script setup lang="ts">
import { currentGET } from "@/api";
import SeamlessScroll from "@/components/seamless-scroll";
import { computed, onMounted, reactive } from "vue";
import { useSettingStore } from "@/stores";
import { storeToRefs } from "pinia";
import EmptyCom from "@/components/empty-com";
const settingStore = useSettingStore();
const { defaultOption, indexConfig } = storeToRefs(settingStore);
const state = reactive<any>({
  list: [],
  defaultOption: {
    ...defaultOption.value,
    singleHeight: 252,
    limitScrollNum: 3,
    // step:3
  },
  scroll: true,

});

const getData = () => {
  currentGET("rightBottom", { limitNum: 20 }).then((res) => {
    console.log("右下", res);
    if (res.success) {
      state.list = res.data.list;
    } else {
      window.$message({
        text: res.msg,
        type: "warning",
      });
    }
  });
};

const comName = computed(() => {
  if (indexConfig.value.rightBottomSwiper) {
    return SeamlessScroll;
  } else {
    return EmptyCom;
  }
});
function montionFilter (val:any) {
    // console.log(val);
    return val ? Number(val).toFixed(2) : '--'
}
const handleAddress=(item:any)=>{
  return `${ item.provinceName }/${item.cityName }/${item.countyName}`
}
onMounted(() => {
  getData();
});
</script>

<template>
  <div
    class="right_bottom_wrap beautify-scroll-def"
    :class="{ 'overflow-y-auto': !indexConfig.rightBottomSwiper }"
  >
    <component
      :is="comName"
      :list="state.list"
      v-model="state.scroll"
      :singleHeight="state.defaultOption.singleHeight"
      :step="state.defaultOption.step"
      :limitScrollNum="state.defaultOption.limitScrollNum"
      :hover="state.defaultOption.hover"
      :singleWaitTime="state.defaultOption.singleWaitTime"
      :wheel="state.defaultOption.wheel"
    >
      <ul class="right_bottom">
        <li class="right_center_item" v-for="(item, i) in state.list" :key="i">
          <span class="orderNum">{{ i + 1 }}</span>
          <div class="inner_right">
            <div class="dibu"></div>
            <div class="flex">
              <div class="info">
                <span class="labels">设备ID：</span>
                <span class="text-content zhuyao"> {{ item.gatewayno }}</span>
              </div>
              <div class="info">
                <span class="labels">型号：</span>
                <span class="text-content"> {{ item.terminalno }}</span>
              </div>
              <div class="info">
                <span class="labels">告警值：</span>
                <span class="text-content warning">
                  {{  montionFilter(item.alertvalue) }}</span
                >
              </div>
            </div>

            <div class="flex">
              <div class="info">
                <span class="labels shrink-0"> 地址：</span>
                <span class=" ciyao truncate" style="font-size: 12px;width: 220px;" :title="handleAddress(item)">
                  {{ handleAddress(item)}}</span
                >
              </div>
              <div class="info time shrink-0">
                <span class="labels">时间：</span>
                <span class="text-content" style="font-size: 12px">
                  {{ item.createtime }}</span
                >
              </div>
            </div>
            <div class="flex">
              <div class="info">
                <span class="labels">报警内容：</span>
                <span
                  class="text-content ciyao"
                  :class="{ warning: item.alertdetail }"
                >
                  {{ item.alertdetail || "无" }}</span
                >
              </div>
            </div>
          </div>
        </li>
      </ul>
    </component>
  </div>
</template>

<style scoped lang="scss">
.right_bottom {
  width: 100%;
  height: 100%;

  .right_center_item {
    display: flex;
    align-items: center;
    justify-content: center;
    height: auto;
    padding: 10px;
    font-size: 14px;
    color: #fff;

    .orderNum {
      margin: 0 20px 0 -20px;
    }

    .inner_right {
      position: relative;
      height: 100%;
      width: 400px;
      flex-shrink: 0;
      line-height: 1.5;

      .dibu {
        position: absolute;
        height: 2px;
        width: 104%;
        background-image: url("@/assets/img/zuo_xuxian.png");
        bottom: -12px;
        left: -2%;
        background-size: cover;
      }
    }

    .info {
      margin-right: 10px;
      display: flex;
      align-items: center;

      .labels {
        flex-shrink: 0;
        font-size: 12px;
        color: rgba(255, 255, 255, 0.6);
      }

      .zhuyao {
        color: $primary-color;
        font-size: 15px;
      }

      .ciyao {
        color: rgba(255, 255, 255, 0.8);
      }

      .warning {
        color: #e6a23c;
        font-size: 15px;
      }
    }
  }
}

.right_bottom_wrap {
  overflow: hidden;
  width: 100%;
  height: 252px;
}

.overflow-y-auto {
  overflow-y: auto;
}
</style>
>>>>>>> 8c3411a62192c21a04900b153cbe81c03fcab870
