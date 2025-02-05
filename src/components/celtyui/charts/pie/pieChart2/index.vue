<template>
  <CommonChart :option="option" />
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { EChartsOption } from 'echarts'
import CommonChart from '../../commonChart/index.vue'
import { getDefaultColors } from '../../commonChart/utils'

const props = defineProps<{
  data: Array<{
    name: string
    value: number
  }>
  colors?: string[]
}>()
const option = computed<EChartsOption>(() => {
  return {
    color: props.colors ?? getDefaultColors(),
    tooltip: {
      show: true
    },
    series: [
      {
        type: 'pie',
        radius: ['46%', '60%'],
        center: ['50%', '50%'],
        startAngle: 180,
        itemStyle: {
          borderColor: 'rgb(7, 41, 76)',
          borderWidth: 4
        },
        label: {
          formatter: (params: any) => {
            return `{name|${params.name}}\n{rate|${params.percent}%}`
          },
          rich: {
            name: {
              color: '#fff',
              fontSize: 14
            },
            rate: {
              color: 'inherit',
              fontWeight: 'bold',
              fontSize: 18
            }
          }
        },
        data: props.data ?? []
      }
    ]
  }
})
</script>
