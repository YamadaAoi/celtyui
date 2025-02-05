<template>
  <div class="line-chart">
    <GeoLines
      url="https://geo.datav.aliyun.com/areas_v3/bound/410600_full.json"
      :points="points"
      :max="500"
      :min="0"
    />
  </div>
</template>

<script setup lang="ts">
import GeoLines from 'src/components/celtyui/charts/geo/geoColor1/index.vue'

const points: any[] = [
  { name: '鹤山区', value: 320 },
  { name: '山城区', value: 150 },
  { name: '淇滨区', value: 220 },
  { name: '浚县', value: 460 },
  { name: '淇县', value: 360 }
]
</script>

<style scoped lang="scss">
.line-chart {
  width: 800px;
  height: 450px;
  background-color: #062040;
}
</style>
