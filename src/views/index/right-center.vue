<script setup lang="ts">
import { ref, reactive } from "vue";
import CapsuleChart from "@/components/datav/capsule-chart";
import { currentGET } from "@/api";

const config = ref({
  showValue: true,
  unit: "次",
});
<<<<<<< HEAD
const data = ref([]);
const getData = () => {
  currentGET("rightCenter").then((res) => {
    console.log("城市排名", res);
    if (res.success) {
      data.value = res.data;
=======
const data= ref([])
const getData = () => {
  currentGET("rightCenter").then((res) => {
    console.log("报警排名", res);
    if (res.success) {
      data.value =res.data;
>>>>>>> 8c3411a62192c21a04900b153cbe81c03fcab870
    } else {
      window["$message"]({
        text: res.msg,
        type: "warning",
      });
    }
  });
};
getData();
</script>

<template>
  <div class="right_bottom">
<<<<<<< HEAD
    <CapsuleChart
      :config="config"
      style="width: 100%; height: 300px"
      :data="data"
    />
=======
    <CapsuleChart :config="config" style="width: 100%; height: 260px" :data="data"/>
>>>>>>> 8c3411a62192c21a04900b153cbe81c03fcab870
  </div>
</template>

<style scoped lang="scss">
<<<<<<< HEAD
.right_bottom {
  box-sizing: border-box;
  padding: 0 16px;
  margin-top: 60px;
}
</style>
=======

.right_bottom {
  box-sizing: border-box;
  padding: 0 16px;
}
</style>
>>>>>>> 8c3411a62192c21a04900b153cbe81c03fcab870
