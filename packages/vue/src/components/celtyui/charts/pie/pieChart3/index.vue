<template>
  <CommonChart :option="option" />
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { EChartsOption } from 'echarts'
import CommonChart from '../../commonChart/index.vue'
import { getDefaultColors } from '../../commonChart/chartsConfig'

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
    title: [
      {
        text: 'title',
        left: '20%',
        top: 'middle',
        textStyle: {
          fontSize: 18,
          color: '#BED4DE',
          fontWeight: 500
        }
      }
    ],
    tooltip: {
      trigger: 'item'
    },
    legend: {
      orient: 'vertical',
      top: 'middle',
      right: '5%',
      itemGap: 25,
      itemWidth: 30,
      itemHeight: 14,
      icon: 'path://M30,.017a13.907,13.907,0,0,1-3.03,8.68A13.916,13.916,0,0,1,16,14.017H0v-.05A14.01,14.01,0,0,1,12.852.017Z',
      formatter: (name: string) => {
        const temp = (props.data ?? []).find((item: any) => item.name === name)
        return temp ? `{a|${name}} {b|${temp.value}}` : name
      },
      textStyle: {
        color: '#FFFFFF',
        overflow: 'truncate',
        fontSize: 14,
        rich: {
          a: {
            width: 100
          },
          b: {
            color: '#00E0DB'
          }
        }
      }
    },
    series: [
      {
        name: '',
        type: 'pie',
        radius: ['45%', '75%'],
        center: ['25%', '50%'],
        silent: true,
        itemStyle: {
          opacity: 0.7
        },
        label: {
          show: false
        },
        labelLine: {
          show: false
        },
        data: props.data ?? []
      },
      {
        name: '',
        type: 'pie',
        radius: ['55%', '75%'],
        center: ['25%', '50%'],
        label: {
          show: false
        },
        labelLine: {
          show: false
        },
        data: props.data ?? []
      }
    ]
  }
})
</script>
