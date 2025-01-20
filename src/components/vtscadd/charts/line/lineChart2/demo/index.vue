<template>
  <div class="line-chart">
    <LineChart :data="data" y-name="单位/个" />
  </div>
</template>

<script setup lang="ts">
import LineChart from 'src/components/vtscadd/charts/line/lineChart2/index.vue'

const data: Array<{
  name: string
  value: [any, number][]
}> = ['A', 'B', 'C'].map(d => {
  return {
    name: d,
    value: new Array(7).fill('').map((s, i) => {
      return [`${2018 + i}`, Math.floor(Math.random() * 100)]
    })
  }
})
</script>

<style scoped lang="scss">
.line-chart {
  width: 450px;
  height: 380px;
  background-color: #062040;
}
</style>
