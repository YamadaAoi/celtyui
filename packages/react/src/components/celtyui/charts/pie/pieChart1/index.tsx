import { useMemo } from 'react'
import { EChartsOption } from 'echarts'
import CommonChart from '../../commonChart'
import { getDefaultColors } from '../../commonChart/utils'

interface PieChart1Props {
  data: Array<{
    name: string
    value: number
  }>
  colors?: string[]
}

export default function PieChart1(props: PieChart1Props) {
  const option = useMemo<EChartsOption>(() => {
    return {
      color: props.colors ?? getDefaultColors(),
      tooltip: {
        show: true
      },
      legend: [
        {
          orient: 'vertical',
          right: 20,
          top: 'center',
          itemWidth: 8,
          itemHeight: 8,
          formatter: (name: string) => {
            const temp = (props.data ?? []).find(
              (item: any) => item.name === name
            )
            return temp ? `{a|${name}} {b|${temp.value}}` : name
          },
          textStyle: {
            color: '#FFFFFF',
            overflow: 'truncate',
            fontSize: 14,
            rich: {
              a: {
                width: 110
              },
              b: {
                color: '#00E0DB'
              }
            }
          },
          data: (props.data ?? []).map((item: any) => item.name)
        }
      ],
      series: [
        {
          name: '',
          type: 'pie',
          silent: true,
          radius: ['45%', '75%'],
          center: ['25%', '50%'],
          label: {
            show: false
          },
          labelLine: {
            show: false
          },
          itemStyle: {
            color: 'rgba(0,90,136,0.25)'
          },
          data: [1]
        },
        {
          type: 'pie',
          silent: true,
          radius: ['41%', '42%'],
          center: ['25%', '50%'],
          label: {
            show: false
          },
          labelLine: {
            show: false
          },
          data: dashPie()
        },
        {
          type: 'pie',
          radius: ['60%', '75%'],
          center: ['25%', '50%'],
          startAngle: 180,
          label: {
            show: false,
            position: 'center'
          },
          emphasis: {
            label: {
              show: true,
              fontSize: 16,
              fontWeight: 'bold',
              formatter: (params: any) => {
                return `{a|${params.name}}\n{b|${params.percent}%}`
              },
              rich: {
                a: {
                  fontSize: 16,
                  color: '#FFFFFF'
                },
                b: {
                  fontSize: 28,
                  color: '#00F9F9',
                  padding: [8, 0, 0, 0]
                }
              }
            }
          },
          labelLine: {
            show: false
          },
          data: props.data ?? []
        }
      ]
    }
  }, [props])

  function dashPie() {
    const dataArr = []
    for (let i = 0; i < 60; i++) {
      if (i % 2 === 0) {
        dataArr.push({
          name: (i + 1).toString(),
          value: 25,
          itemStyle: {
            color: '#02A0F3',
            borderWidth: 0,
            borderColor: 'rgba(0,0,0,0)'
          }
        })
      } else {
        dataArr.push({
          name: (i + 1).toString(),
          value: 20,
          itemStyle: {
            color: 'rgba(0,0,0,0)',
            borderWidth: 0,
            borderColor: 'rgba(0,0,0,0)'
          }
        })
      }
    }
    return dataArr
  }

  return <CommonChart option={option} />
}
