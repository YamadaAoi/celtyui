<template>
  <div class="bar-chart">
    <BarChart :data="data" y-name="单位/件" />
  </div>
</template>

<script setup lang="ts">
import BarChart from 'src/components/celtyui/charts/bar/barChart5/index.vue'

const data: [string, number][] = new Array(7).fill('').map((s, i) => {
  return [`${2018 + i}`, Math.floor(Math.random() * 100)]
})
</script>

<style scoped lang="scss">
.bar-chart {
  width: 450px;
  height: 260px;
  background-color: #062040;
}
</style>
