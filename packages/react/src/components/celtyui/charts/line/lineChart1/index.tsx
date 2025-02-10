import { useMemo } from 'react'
import { EChartsOption } from 'echarts'
import CommonChart from '../../commonChart'

interface LineChart1Props {
  data: [any, number][]
  yName: string
}

export default function LineChart1(props: LineChart1Props) {
  const option = useMemo<EChartsOption>(() => {
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
            color: 'rgba(255,255,255,0.1)'
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
          type: 'line',
          smooth: false,
          symbolSize: 8,
          itemStyle: {
            color: '#B28EFF'
          },
          areaStyle: {
            color: {
              type: 'linear',
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [
                {
                  offset: 0,
                  color: `#9D6FFF`
                },
                {
                  offset: 1,
                  color: `rgba(182,104,0,0)`
                }
              ]
            }
          },
          data: props.data ?? []
        }
      ]
    }
  }, [props])

  return <CommonChart option={option} />
}
