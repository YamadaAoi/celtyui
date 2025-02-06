<template>
  <div class="line-chart">
    <LineChart :data="data" y-name="单位/个" />
  </div>
</template>

<script setup lang="ts">
import LineChart from 'src/components/celtyui/charts/line/lineChart1/index.vue'

const data: [string, number][] = new Array(7).fill('').map((s, i) => {
  return [`${2018 + i}`, Math.floor(Math.random() * 600)]
})
</script>

<style scoped lang="scss">
.line-chart {
  width: 450px;
  height: 270px;
  background-color: #062040;
}
</style>
