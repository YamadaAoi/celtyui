<template>
  <div class="bar-chart">
    <BarChart :data="data" y-name="单位：个" />
  </div>
</template>

<script setup lang="ts">
import BarChart from 'src/components/celtyui/charts/bar/barChart3/index.vue'

const data: Array<{
  name: string
  value: [any, number][]
}> = ['A', 'B'].map(d => {
  return {
    name: d,
    value: new Array(7).fill('').map((s, i) => {
      return [`${2018 + i}`, Math.floor(Math.random() * 1000)]
    })
  }
})
</script>

<style scoped lang="scss">
.bar-chart {
  width: 450px;
  height: 260px;
  background-color: #062040;
}
</style>
