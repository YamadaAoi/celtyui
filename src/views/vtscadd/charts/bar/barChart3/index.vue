<template>
  <div class="bar-chart">
    <BarChart1 :data="data" y-name="单位/头、只" />
  </div>
</template>

<script setup lang="ts">
import BarChart1 from 'src/components/vtscadd/charts/bar/barChart3/index.vue'

const data: Array<{
  name: string
  value: [any, number][]
}> = ['存栏', '出栏'].map(d => {
  return {
    name: d,
    value: ['猪', '牛', '羊', '家禽', '家兔'].map(s => {
      return [s, Math.floor(Math.random() * 1000)]
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
