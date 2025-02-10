import { useEffect, useMemo, useRef, useState } from 'react'
import { EChartsOption, registerMap } from 'echarts'
import useCharts, { ChartsOption } from '../../commonChart/useChart'
import { genUuid } from '../../../util/genUuid'

interface GeoLines1Props {
  url: string
  origin: [number, number]
  points: Array<{
    name: string
    value: number
    coord: [number, number]
  }>
  nameFiled?: string
  center?: [number, number]
}

export default function GeoLines1(props: GeoLines1Props) {
  const id = useRef(genUuid())
  const [option, setOption] = useState<ChartsOption>({ chartId: '' })
  const { chartId, clearChart } = useCharts(option)
  const computedOption = useMemo(() => {
    return {
      chartId: id.current,
      option: getOption()
    }
  }, [props])

  useEffect(() => {
    loadMap()
      .then(() => {
        setOption({ chartId: id.current, option: getOption() })
      })
      .catch(err => {
        console.error(`注册地图失败！${err}`)
      })
    return () => {
      clearChart()
    }
  }, [])

  useEffect(() => {
    if (chartId) {
      setOption(computedOption)
    }
  }, [computedOption])

  async function loadMap() {
    const res = await fetch(props.url)
    const geo: any = await res.json()
    registerMap('geomap', geo as string)
  }

  function getOption(prop?: GeoLines1Props): EChartsOption {
    const temp = prop ?? props
    return {
      tooltip: {
        trigger: 'item'
      },
      backgroundColor: 'rgba(0,0,0,0)',
      geo: {
        map: 'geomap',
        zoom: 1.5,
        roam: true, //是否允许缩放
        nameProperty: temp.nameFiled ?? 'name',
        center: temp.center,
        label: {
          show: true,
          color: 'rgba(255,255,255,0.6)',
          fontSize: 8
        },
        itemStyle: {
          color: '#065083', //地图背景色
          borderColor: '#02D5FF', //省市边界线00fcff 516a89
          borderWidth: 1
        },
        emphasis: {
          itemStyle: {
            areaColor: 'rgba(31, 210, 255, 0.6)'
          },
          label: {
            color: 'rgba(255,255,255,1)'
          }
        }
      },
      series: [
        {
          type: 'lines',
          zlevel: 2,
          effect: {
            show: true,
            period: 3, //箭头指向速度，值越小速度越快
            trailLength: 0.02, //特效尾迹长度[0,1]值越大，尾迹越长重
            symbol: 'arrow', //箭头图标
            symbolSize: 4 //图标大小
          },
          lineStyle: {
            color: {
              type: 'linear',
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [
                {
                  offset: 0,
                  color: 'rgba(255, 168, 40, 0.1)'
                },
                {
                  offset: 0.5,
                  color: 'rgba(255, 168, 40, 0.3)'
                },
                {
                  offset: 1,
                  color: 'rgba(244, 210, 32, 1)'
                }
              ],
              global: false
            },
            width: 2,
            curveness: 0.3
          },
          data: (temp.points ?? []).map(p => {
            return {
              coords: [temp.origin, p.coord],
              value: p.value
            }
          })
        },
        {
          type: 'effectScatter',
          coordinateSystem: 'geo',
          zlevel: 3,
          colorBy: 'data',
          rippleEffect: {
            period: 4, //动画时间，值越小速度越快
            brushType: 'stroke', //波纹绘制方式 stroke, fill
            scale: 4 //波纹圆环最大限制，值越大波纹越大
          },
          symbol: 'circle',
          symbolSize: function (val) {
            return 3 + (val[2] / 100) * 1 //圆环大小
          },
          data: (temp.points ?? []).map(p => {
            return {
              name: p.name,
              value: p.coord.concat(p.value),
              itemStyle: {
                color: 'rgba(243, 209, 32, 1)'
              }
            }
          })
        }
      ]
    }
  }

  return <div id={id.current} style={{ width: '100%', height: '100%' }}></div>
}
