import { useMemo } from 'react'
import { EChartsOption, graphic } from 'echarts'
import CommonChart from '../../commonChart'

interface BarChart5Props {
  data: [any, number][]
  yName: string
}

export default function BarChart5(props: BarChart5Props) {
  const offsetX = 8
  const offsetY = 4
  const CubeLeft = graphic.extendShape({
    shape: {
      x: 0,
      y: 0
    },
    buildPath: (ctx: CanvasRenderingContext2D, shape: any) => {
      const xAxisPoint: [number, number] = shape.xAxisPoint
      const c0: [number, number] = [shape.x, shape.y]
      const c1: [number, number] = [shape.x - offsetX, shape.y - offsetY]
      const c2: [number, number] = [
        xAxisPoint[0] - offsetX,
        xAxisPoint[1] - offsetY
      ]
      const c3: [number, number] = [xAxisPoint[0], xAxisPoint[1]]
      ctx?.moveTo(c0[0], c0[1])
      ctx?.lineTo(c1[0], c1[1])
      ctx?.lineTo(c2[0], c2[1])
      ctx?.lineTo(c3[0], c3[1])
      ctx?.closePath()
    }
  })
  const CubeRight = graphic.extendShape({
    shape: {
      x: 0,
      y: 0
    },
    buildPath: (ctx: CanvasRenderingContext2D, shape: any) => {
      const xAxisPoint: [number, number] = shape.xAxisPoint
      const c0: [number, number] = [shape.x, shape.y]
      const c1: [number, number] = [xAxisPoint[0], xAxisPoint[1]]
      const c2: [number, number] = [
        xAxisPoint[0] + offsetX,
        xAxisPoint[1] - offsetY
      ]
      const c3: [number, number] = [
        (shape.x as number) + offsetX,
        shape.y - offsetY
      ]
      ctx?.moveTo(c0[0], c0[1])
      ctx?.lineTo(c1[0], c1[1])
      ctx?.lineTo(c2[0], c2[1])
      ctx?.lineTo(c3[0], c3[1])
      ctx?.closePath()
    }
  })
  const CubeTop = graphic.extendShape({
    shape: {
      x: 0,
      y: 0
    },
    buildPath: (ctx: CanvasRenderingContext2D, shape: any) => {
      const c0: [number, number] = [shape.x, shape.y]
      const c1: [number, number] = [
        (shape.x as number) + offsetX,
        shape.y - offsetY
      ]
      const c2: [number, number] = [shape.x, shape.y - offsetX]
      const c3: [number, number] = [shape.x - offsetX, shape.y - offsetY]
      ctx?.moveTo(c0[0], c0[1])
      ctx?.lineTo(c1[0], c1[1])
      ctx?.lineTo(c2[0], c2[1])
      ctx?.lineTo(c3[0], c3[1])
      ctx?.closePath()
    }
  })
  graphic.registerShape('CubeLeft', CubeLeft)
  graphic.registerShape('CubeRight', CubeRight)
  graphic.registerShape('CubeTop', CubeTop)
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
          name: '',
          type: 'custom',
          renderItem: (params, api) => {
            const location = api.coord([api.value(0), api.value(1)])
            return {
              type: 'group',
              children: [
                {
                  type: 'CubeLeft',
                  shape: {
                    api,
                    xValue: api.value(0),
                    yValue: api.value(1),
                    x: location[0],
                    y: location[1],
                    xAxisPoint: api.coord([api.value(0), 0])
                  },
                  style: {
                    fill: new graphic.LinearGradient(0, 0, 0, 1, [
                      {
                        offset: 0,
                        color: '#33BCEB'
                      },
                      {
                        offset: 1,
                        color: '#337CEB'
                      }
                    ])
                  },
                  emphasis: {
                    style: {
                      fill: 'rgba(255, 149, 107, 1)'
                    }
                  }
                },
                {
                  type: 'CubeRight',
                  shape: {
                    api,
                    xValue: api.value(0),
                    yValue: api.value(1),
                    x: location[0],
                    y: location[1],
                    xAxisPoint: api.coord([api.value(0), 0])
                  },
                  style: {
                    fill: new graphic.LinearGradient(0, 0, 0, 1, [
                      {
                        offset: 0,
                        color: '#28A2CE'
                      },
                      {
                        offset: 1,
                        color: '#1A57B7'
                      }
                    ])
                  },
                  emphasis: {
                    style: {
                      fill: 'rgba(255, 149, 107, 1)'
                    }
                  }
                },
                {
                  type: 'CubeTop',
                  shape: {
                    api,
                    xValue: api.value(0),
                    yValue: api.value(1),
                    x: location[0],
                    y: location[1],
                    xAxisPoint: api.coord([api.value(0), 0])
                  },
                  style: {
                    fill: new graphic.LinearGradient(0, 0, 0, 1, [
                      {
                        offset: 0,
                        color: '#43C4F1'
                      },
                      {
                        offset: 1,
                        color: '#28A2CE'
                      }
                    ])
                  },
                  emphasis: {
                    style: {
                      fill: 'rgba(255, 149, 107, 1)'
                    }
                  }
                }
              ]
            } as any
          },
          data: props.data ?? []
        }
      ]
    }
  }, [props])

  return <CommonChart option={option} />
}
