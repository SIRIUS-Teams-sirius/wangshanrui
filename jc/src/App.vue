<script setup lang="ts">
import { RouterView } from 'vue-router'
import { ref } from 'vue'
import AttackChart from './components/DataModule_attackchart.vue'
import type { AttackData } from './types/attack'
import {attackData} from './types/attack'
import type2 from './components/type2.vue';

</script>

<template>
  <RouterView />
</template>

<style scoped>

</style>
