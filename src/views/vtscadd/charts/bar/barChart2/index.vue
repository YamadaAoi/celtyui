<template>
  <div class="bar-chart">
    <BarChart1 :data="data" y-name="单位/件" />
  </div>
</template>

<script setup lang="ts">
import dayjs from 'dayjs'
import BarChart1 from 'src/components/vtscadd/charts/bar/barChart2/index.vue'

const data: [number, string][] = new Array(7).fill('').map((s, i) => {
  return [
    Math.floor(Math.random() * 100),
    dayjs()
      .subtract(6 - i, 'day')
      .format('MM-DD')
  ]
})
</script>

<style scoped lang="scss">
.bar-chart {
  width: 450px;
  height: 260px;
  background-color: #062040;
}
</style>
