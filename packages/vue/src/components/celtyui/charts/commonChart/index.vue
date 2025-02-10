<template>
  <div :id="chartId" class="common-chart"></div>
</template>

<script setup lang="ts">
import { onMounted, onBeforeUnmount, reactive, watch } from 'vue'
import { EChartsOption } from 'echarts'
import { genUuid } from 'src/components/celtyui/util/genUuid'
import useCharts, { ChartsOption } from './useChart'

const props = defineProps<{
  option?: EChartsOption
}>()
const chartOption: ChartsOption = reactive({ chartId: '' })
const { clearChart } = useCharts(chartOption)
const chartId = genUuid()

onMounted(() => {
  chartOption.chartId = chartId
  chartOption.option = props.option
})

onBeforeUnmount(() => {
  clearChart()
})

watch(
  () => props.option,
  next => {
    chartOption.option = next
  }
)
</script>

<style scoped lang="scss">
.common-chart {
  width: 100%;
  height: 100%;
}
</style>
