<template>
  <div class="bar-line">
    <BarLine :bar-data="barData" :line-data="lineData" y-name="单位：个" />
  </div>
</template>

<script setup lang="ts">
import BarLine from 'src/components/celtyui/charts/mix/barLine1/index.vue'

const barData: Array<{
  name: string
  value: [any, number][]
}> = ['A', 'B', 'C'].map(d => {
  return {
    name: d,
    value: ['2022', '2023', '2024'].map(s => {
      return [s, Math.floor(Math.random() * 600)]
    })
  }
})
const lineData: Array<{
  name: string
  value: [any, number][]
}> = ['D'].map(d => {
  return {
    name: d,
    value: ['2022', '2023', '2024'].map(s => {
      return [s, Math.floor(Math.random() * 20)]
    })
  }
})
</script>

<style scoped lang="scss">
.bar-line {
  width: 450px;
  height: 450px;
  background-color: #062040;
}
</style>
