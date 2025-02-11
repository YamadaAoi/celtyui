<template>
  <div :id="chartId" class="common-chart"></div>
</template>

<script setup lang="ts">
import { onMounted, onBeforeUnmount, reactive, watch } from 'vue'
import { EChartsOption, registerMap } from 'echarts'
import { genUuid } from 'src/components/celtyui/util/genUuid'
import useEcharts, { ChartsOption } from '../../../hooks/useEcharts'
import { getDefaultColors } from '../../commonChart/chartsConfig'

interface GeoData {
  url: string
  points: Array<{
    name: string
    value: number
  }>
  min: number
  max: number
  nameFiled?: string
  center?: [number, number]
  colors?: string[]
}

const props = defineProps<GeoData>()
const chartOption: ChartsOption = reactive({ chartId: '' })
const { clearChart } = useEcharts(chartOption)
const chartId = genUuid()

onMounted(() => {
  loadMap()
    .then(() => {
      chartOption.chartId = chartId
      chartOption.option = getOption()
    })
    .catch(err => {
      console.error(`注册地图失败！${err}`)
    })
})

onBeforeUnmount(() => {
  clearChart()
})

watch(props, next => {
  chartOption.option = getOption(next)
})

async function loadMap() {
  const res = await fetch(props.url)
  const geo: any = await res.json()
  registerMap('geomap', geo as string)
}

function getOption(prop?: GeoData): EChartsOption {
  const temp = prop ?? props
  return {
    tooltip: {
      trigger: 'item'
    },
    backgroundColor: 'rgba(0,0,0,0)',
    visualMap: {
      show: false,
      min: temp.min,
      max: temp.max,
      inRange: {
        color: props.colors ?? getDefaultColors()
      },
      calculable: true
    },
    series: [
      {
        name: 'name',
        type: 'map',
        map: 'geomap',
        zoom: 1,
        roam: true,
        nameProperty: temp.nameFiled ?? 'name',
        center: temp.center,
        selectedMode: false,
        label: {
          show: true,
          fontSize: 10,
          color: '#ffffff',
          fontWeight: 'bold'
        },
        itemStyle: {
          borderColor: '#DBC68F',
          borderWidth: 1,
          shadowColor: 'RGBA(74, 164, 191, 0.5)',
          shadowOffsetX: 0,
          shadowOffsetY: 5
        },
        emphasis: {
          itemStyle: {
            areaColor: '#185ED5'
          },
          label: {
            color: '#ffffff'
          }
        },
        data: temp.points ?? []
      }
    ]
  }
}
</script>

<style scoped lang="scss">
.common-chart {
  width: 100%;
  height: 100%;
}
</style>
