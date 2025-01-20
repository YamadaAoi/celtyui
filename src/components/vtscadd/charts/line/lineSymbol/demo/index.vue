<template>
  <div class="lines">
    <div class="line-chart">
      <LineChart :data="data" :symbol="0" y-name="单位/个" />
    </div>
    <div class="line-chart">
      <LineChart :data="data" :symbol="1" y-name="单位/个" />
    </div>
    <div class="line-chart">
      <LineChart :data="data" :symbol="2" y-name="单位/个" />
    </div>
    <div class="line-chart">
      <LineChart :data="data" :symbol="3" y-name="单位/个" />
    </div>
  </div>
</template>

<script setup lang="ts">
import LineChart from 'src/components/vtscadd/charts/line/lineSymbol/index.vue'

const data: [string, number][] = new Array(7).fill('').map((s, i) => {
  return [`${2018 + i}`, Math.floor(Math.random() * 600)]
})
</script>

<style scoped lang="scss">
.lines {
  display: flex;
  flex-wrap: wrap;
  .line-chart {
    width: 450px;
    height: 270px;
    background-color: #062040;
    margin: 8px;
  }
}
</style>
