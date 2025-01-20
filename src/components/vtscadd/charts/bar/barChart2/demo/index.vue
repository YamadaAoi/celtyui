<template>
  <div class="bar-chart">
    <BarChart :data="data" y-name="单位/件" />
  </div>
</template>

<script setup lang="ts">
import BarChart from 'src/components/vtscadd/charts/bar/barChart2/index.vue'

const data: [number, string][] = new Array(7).fill('').map((s, i) => {
  return [Math.floor(Math.random() * 100), `${2018 + i}`]
})
</script>

<style scoped lang="scss">
.bar-chart {
  width: 450px;
  height: 260px;
  background-color: #062040;
}
</style>
