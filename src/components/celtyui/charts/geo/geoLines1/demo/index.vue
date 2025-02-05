<template>
  <div class="line-chart">
    <GeoLines
      url="https://geo.datav.aliyun.com/areas_v3/bound/100000_full.json"
      :points="points"
      :origin="[114.13774301, 35.97186332]"
      :center="[105.367615, 36.838048]"
    />
  </div>
</template>

<script setup lang="ts">
import GeoLines from 'src/components/celtyui/charts/geo/geoLines1/index.vue'

const points: any[] = [
  {
    name: '青海',
    value: 500,
    coord: [101.4038, 36.8207]
  },
  {
    name: '四川',
    value: 400,
    coord: [103.9526, 30.7617]
  },
  {
    name: '湖北',
    value: 300,
    coord: [114.3896, 30.6628]
  },
  {
    name: '广东',
    value: 200,
    coord: [113.12244, 23.009505]
  },
  {
    name: '北京',
    value: 100,
    coord: [116.4551, 40.2539]
  }
]
</script>

<style scoped lang="scss">
.line-chart {
  width: 800px;
  height: 450px;
  background-color: #062040;
}
</style>
