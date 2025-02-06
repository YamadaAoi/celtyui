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
  symbol: 0 | 1
}>()
const option = computed<EChartsOption>(() => {
  const symbolList = [
    'path://M494.345,107.173c0,479.953,415.544,804.077,415.544,804.077H116.2S494.345,587.126,494.345,107.173Z',
    'path://M0,10 L10,10 C5.5,10 5.5,5 5,0 C4.5,5 4.5,10 0,10 z'
  ]
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
        symbol: symbolList[props.symbol ?? 0],
        itemStyle: {
          color: '#1890FF'
        },
        emphasis: {
          itemStyle: {
            color: '#FF8B4C'
          }
        },
        data: props.data ?? []
      }
    ]
  }
})
</script>
