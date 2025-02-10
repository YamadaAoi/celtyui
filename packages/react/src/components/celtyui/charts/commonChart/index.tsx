import { useEffect, useMemo, useRef, useState } from 'react'
import { EChartsOption } from 'echarts'
import useCharts, { ChartsOption } from './useChart'
import { genUuid } from '../../util/genUuid'

interface CommonChartProps {
  option?: EChartsOption
}

export default function CommonChart(props: CommonChartProps) {
  const id = useRef(genUuid())
  const [option, setOption] = useState<ChartsOption>({ chartId: '' })
  const { chartId, clearChart } = useCharts(option)
  const computedOption = useMemo(() => {
    return {
      chartId: id.current,
      option: props.option
    }
  }, [props.option])

  useEffect(() => {
    setOption({ chartId: id.current, option: props.option })
    return () => {
      clearChart()
    }
  }, [])

  useEffect(() => {
    if (chartId) {
      setOption(computedOption)
    }
  }, [computedOption])

  return <div id={id.current} style={{ width: '100%', height: '100%' }}></div>
}
