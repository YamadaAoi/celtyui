import { useMemo } from 'react'
import { EChartsOption } from 'echarts'
import CommonChart from '../../commonChart'
import { getDefaultColors } from '../../commonChart/utils'

interface BarLine1Props {
  barData: Array<{
    name: string
    value: [any, number][]
  }>
  lineData: Array<{
    name: string
    value: [any, number][]
  }>
  yName: string
  colors?: string[]
}

export default function BarLine1(props: BarLine1Props) {
  const option = useMemo<EChartsOption>(() => {
    const bars: EChartsOption['series'] = (props.barData ?? []).map(c => {
      return {
        name: c.name,
        stack: 'a',
        type: 'bar',
        barWidth: 16,
        data: c.value
      }
    })
    const lines: EChartsOption['series'] = (props.lineData ?? []).map(c => {
      return {
        name: c.name,
        type: 'line',
        yAxisIndex: 1,
        smooth: false,
        data: c.value
      }
    })
    return {
      color: props.colors ?? getDefaultColors(),
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
      legend: {
        top: '5%',
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
      yAxis: [
        {
          name: props.yName,
          position: 'left',
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
        {
          name: '单位：%',
          position: 'right',
          nameTextStyle: {
            color: 'rgba(230,247,255,0.7)',
            align: 'left',
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
            show: false
          }
        }
      ],
      series: [...bars, ...lines]
    }
  }, [props])

  return <CommonChart option={option} />
}
