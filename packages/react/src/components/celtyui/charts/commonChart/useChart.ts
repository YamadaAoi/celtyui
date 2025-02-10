import { useEffect, useRef, useState } from 'react'
import { EChartsOption, ECharts, init } from 'echarts'

export interface ChartsOption {
  chartId: string
  option?: EChartsOption
}

export default function useCharts(
  options: ChartsOption,
  onclick?: (param: any) => void
) {
  const myChart = useRef<ECharts | undefined>(undefined)
  const [chartId, setChartId] = useState('')

  useEffect(() => {
    window.addEventListener('resize', listenResize, false)

    return () => {
      window.removeEventListener('resize', listenResize)
    }
  }, [])

  useEffect(() => {
    if (options?.chartId) {
      if (options.chartId !== chartId) {
        clearChart()
        setChartId(options.chartId)
        initChart(options.chartId)
      }
      refresh(options.option)
    } else {
      clearChart()
    }
  }, [options])

  function listenResize() {
    setTimeout(() => {
      myChart.current?.resize()
    }, 300)
  }

  function clearChart() {
    setChartId('')
    if (myChart.current) {
      myChart.current.dispose()
      myChart.current = undefined
    }
  }

  function refresh(opts?: EChartsOption) {
    if (opts && myChart.current) {
      myChart.current.setOption(opts, true)
    }
  }

  function initChart(chartId: string) {
    const chartEle: any = document.getElementById(chartId) as HTMLDivElement
    if (chartEle) {
      myChart.current = init(chartEle)
      if (onclick) {
        myChart.current?.on('click', onclick)
      }
    } else {
      setChartId('')
    }
  }

  return {
    chartId,
    clearChart
  }
}
