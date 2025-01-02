<template>
  <CommonChart :option="option" />
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { EChartsOption } from 'echarts'
import CommonChart from '../../commonChart/index.vue'

const props = defineProps<{
  data: Array<{
    name: string
    value: [any, number][]
  }>
  yName: string
}>()
const option = computed<EChartsOption>(() => {
  return {
    color: ['#1675E2', '#4ECB73'],
    grid: {
      top: '30%',
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
    legend: {
      top: '20%',
      right: 20,
      itemWidth: 8,
      itemHeight: 8,
      textStyle: {
        color: 'rgba(230,247,255,0.7)',
        fontSize: 12
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
    series: props.data.map(c => {
      return {
        name: c.name,
        type: 'bar',
        barWidth: 16,
        data: c.value
      }
    })
  }
})
</script>

<style scoped lang="scss"></style>
