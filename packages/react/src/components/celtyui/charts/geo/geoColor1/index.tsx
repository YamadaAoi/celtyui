import { useEffect, useMemo, useRef, useState } from 'react'
import { EChartsOption, registerMap } from 'echarts'
import { getDefaultColors } from '../../commonChart/utils'
import useCharts, { ChartsOption } from '../../commonChart/useChart'
import { genUuid } from '../../../util/genUuid'

interface GeoColor1Props {
  url: string
  points: Array<{
    name: string
    value: number
  }>
  min: number
  max: number
  nameFiled?: string
  center?: [number, number]
  colors?: string[]
}

export default function GeoColor1(props: GeoColor1Props) {
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

  function getOption(prop?: GeoColor1Props): EChartsOption {
    const temp = prop ?? props
    return {
      tooltip: {
        trigger: 'item'
      },
      backgroundColor: 'rgba(0,0,0,0)',
      visualMap: {
        show: false,
        min: temp.min,
        max: temp.max,
        inRange: {
          color: props.colors ?? getDefaultColors()
        },
        calculable: true
      },
      series: [
        {
          name: 'name',
          type: 'map',
          map: 'geomap',
          zoom: 1,
          roam: true,
          nameProperty: temp.nameFiled ?? 'name',
          center: temp.center,
          selectedMode: false,
          label: {
            show: true,
            fontSize: 10,
            color: '#ffffff',
            fontWeight: 'bold'
          },
          itemStyle: {
            borderColor: '#DBC68F',
            borderWidth: 1,
            shadowColor: 'RGBA(74, 164, 191, 0.5)',
            shadowOffsetX: 0,
            shadowOffsetY: 5
          },
          emphasis: {
            itemStyle: {
              areaColor: '#185ED5'
            },
            label: {
              color: '#ffffff'
            }
          },
          data: temp.points ?? []
        }
      ]
    }
  }

  return <div id={id.current} style={{ width: '100%', height: '100%' }}></div>
}
