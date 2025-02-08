import { useEffect, useState } from 'react'
import { EChartsOption, ECharts, init } from 'echarts'

export interface ChartsOption {
  chartId: string
  option?: EChartsOption
}

export default function useCharts(
  options: ChartsOption,
  onclick?: (param: any) => void
) {
  let myChart: ECharts | undefined
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
        setChartId(options.chartId)
        clearChart()
        initChart(options.chartId)
      }
      refresh(options.option)
    } else {
      clearChart()
    }
  }, [options])

  function listenResize() {
    setTimeout(() => {
      myChart?.resize()
    }, 300)
  }

  function clearChart() {
    if (myChart) {
      myChart.dispose()
      myChart = undefined
    }
  }

  function refresh(opts?: EChartsOption) {
    if (opts && myChart) {
      myChart.setOption(opts, true)
    }
  }

  function initChart(chartId: string) {
    const chartEle: any = document.getElementById(chartId) as HTMLDivElement
    if (chartEle) {
      myChart = init(chartEle)
      if (onclick) {
        myChart.on('click', onclick)
      }
    }
  }

  return {
    clearChart
  }
}
