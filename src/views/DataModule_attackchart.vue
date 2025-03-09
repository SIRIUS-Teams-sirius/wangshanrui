 
<template>
<div class="left-panel">
      <AttackChart :attack-data="attackData" />
    </div>
    <div class="right-panel">
      <type2/>
    </div>
</template>

<script setup lang="ts">
  import AttackChart from './DataMoudle_attackchart2.vue'
  import {attackData} from '../types/attack';
  import type2 from './type2.vue';
</script>
