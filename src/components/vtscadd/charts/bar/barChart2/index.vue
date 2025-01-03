<template>
  <CommonChart :option="option" />
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { EChartsOption } from 'echarts'
import CommonChart from '../../commonChart/index.vue'

const props = defineProps<{
  data: [number, any][]
  yName: string
}>()
const option = computed<EChartsOption>(() => {
  return {
    grid: {
      top: '15%',
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
      type: 'value',
      splitLine: {
        show: false
      },
      axisLabel: {
        show: false
      },
      axisTick: {
        show: false
      },
      axisLine: {
        show: false
      }
    },
    yAxis: [
      {
        type: 'category',
        inverse: true,
        axisLine: {
          show: false
        },
        axisTick: {
          show: false
        },
        axisLabel: {
          color: '#ffffff',
          fontSize: 14
        },
        splitLine: {
          show: false
        }
      },
      {
        type: 'category',
        inverse: true,
        name: props.yName,
        nameLocation: 'start',
        nameTextStyle: {
          color: 'rgba(230,247,255,0.7)',
          align: 'left',
          fontSize: 12
        },
        axisLine: {
          show: false
        },
        axisTick: {
          show: false
        },
        axisLabel: {
          color: '#ffffff',
          fontSize: 14
        },
        data: (props.data ?? []).map(s => {
          return s[0]
        })
      }
    ],
    series: [
      {
        type: 'bar',
        barWidth: 8,
        itemStyle: {
          color(params) {
            return {
              type: 'linear',
              x: 0,
              y: 0,
              x2: 1,
              y2: 0,
              colorStops: [
                {
                  offset: 0,
                  color: params.dataIndex < 3 ? '#36EAAF' : '#0A77E1'
                },
                {
                  offset: 1,
                  color: params.dataIndex < 3 ? '#4BB3D2' : '#00C0FF'
                }
              ]
            }
          }
        },
        showBackground: true,
        backgroundStyle: {
          color: 'rgba(235,235,235,0.1)'
        },
        data: props.data ?? []
      }
    ]
  }
})
</script>
