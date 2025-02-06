<template>
  <CommonChart :option="option" />
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { EChartsOption } from 'echarts'
import CommonChart from '../../commonChart/index.vue'

const props = defineProps<{
  data: [any, number][]
  yName: string
}>()
const option = computed<EChartsOption>(() => {
  return {
    grid: {
      top: '20%',
      bottom: '5%',
      left: '8%',
      containLabel: true
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      }
    },
    xAxis: {
      type: 'category',
      axisLabel: {
        color: '#F1F7F7',
        fontSize: 14
      },
      axisTick: {
        show: true,
        alignWithLabel: true,
        lineStyle: {
          color: '#BAE7FF'
        }
      },
      axisLine: {
        show: true,
        lineStyle: {
          color: '#BAE7FF'
        }
      }
    },
    yAxis: {
      name: props.yName,
      nameTextStyle: {
        color: 'rgba(230,247,255,0.7)',
        align: 'right',
        fontSize: 12
      },
      type: 'value',
      axisLine: {
        show: false
      },
      axisTick: {
        show: false
      },
      axisLabel: {
        color: '#E6F7FF',
        fontSize: 12
      },
      splitLine: {
        show: true,
        lineStyle: {
          type: 'solid',
          color: 'rgba(255,255,255,0.1)'
        }
      }
    },
    series: [
      {
        type: 'pictorialBar',
        itemStyle: {
          color: '#1890FF'
        },
        emphasis: {
          itemStyle: {
            color: '#FF8B4C'
          }
        },
        symbolRepeat: true,
        symbolMargin: 3,
        symbol: 'rect',
        symbolClip: true,
        symbolSize: [13, 8],
        symbolPosition: 'start',
        symbolOffset: [0, 0],
        data: props.data ?? []
      }
    ]
  }
})
</script>
