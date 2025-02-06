<template>
  <div class="bars">
    <div class="bar-chart">
      <BarChart :data="data" :symbol="0" y-name="单位/件" />
    </div>
    <div class="bar-chart">
      <BarChart :data="data" :symbol="1" y-name="单位/件" />
    </div>
  </div>
</template>

<script setup lang="ts">
import BarChart from 'src/components/celtyui/charts/bar/barPictorial/index.vue'

const data: [string, number][] = new Array(7).fill('').map((s, i) => {
  return [`${2018 + i}`, Math.floor(Math.random() * 100)]
})
</script>

<style scoped lang="scss">
.bars {
  display: flex;
  flex-wrap: wrap;
  .bar-chart {
    width: 450px;
    height: 260px;
    background-color: #062040;
    margin: 8px;
  }
}
</style>
