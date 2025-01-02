<template>
  <div class="bar-chart">
    <BarChart1 :data="data" y-name="单位/件" />
  </div>
</template>

<script setup lang="ts">
import dayjs from 'dayjs'
import BarChart1 from 'src/components/vtscadd/charts/bar/barChart1/index.vue'

const data: [string, number][] = new Array(7).fill('').map((s, i) => {
  return [
    dayjs()
      .subtract(6 - i, 'day')
      .format('MM-DD'),
    Math.floor(Math.random() * 100)
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
