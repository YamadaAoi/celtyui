<template>
  <div class="pie-chart">
    <PieChart1 :data="data" />
  </div>
</template>

<script setup lang="ts">
import PieChart1 from 'src/components/vtscadd/charts/pie/pieChart1/index.vue'

const data = [
  {
    name: '数据1',
    value: 44
  },
  {
    name: '数据2',
    value: 21
  },
  {
    name: '数据3',
    value: 19
  },
  {
    name: '数据4',
    value: 16
  }
]
</script>

<style scoped lang="scss">
.pie-chart {
  width: 450px;
  height: 238px;
}
</style>
