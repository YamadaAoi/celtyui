import { useMemo } from 'react'
import { EChartsOption } from 'echarts'
import CommonChart from '../../commonChart'

interface LineSymbolProps {
  data: [any, number][]
  yName: string
  symbol: 0 | 1 | 2 | 3
}

export default function LineSymbol(props: LineSymbolProps) {
  const option = useMemo<EChartsOption>(() => {
    const symbolList = [
      'path://M7,0 C10.8659932,0 14,3.13400675 14,7 C14,10.8659932 10.8659932,14 7,14 C3.13400675,14 0,10.8659932 0,7 C0,3.13400675 3.13400675,0 7,0 Z M7,1.5 C3.96243388,1.5 1.5,3.96243388 1.5,7 C1.5,10.0375661 3.96243388,12.5 7,12.5 C10.0375661,12.5 12.5,10.0375661 12.5,7 C12.5,3.96243388 10.0375661,1.5 7,1.5 Z M7,4.66666667 C8.28866442,4.66666667 9.33333333,5.71133558 9.33333333,7 C9.33333333,8.28866442 8.28866442,9.33333333 7,9.33333333 C5.71133558,9.33333333 4.66666667,8.28866442 4.66666667,7 C4.66666667,5.71133558 5.71133558,4.66666667 7,4.66666667 Z',
      'path://M10,0 C15.5228475,0 20,4.4771525 20,10 C20,15.5228475 15.5228475,20 10,20 C4.4771525,20 0,15.5228475 0,10 C0,4.4771525 4.4771525,0 10,0 Z M10,1.5 C5.30557963,1.5 1.5,5.30557963 1.5,10 C1.5,14.6944204 5.30557963,18.5 10,18.5 C14.6944204,18.5 18.5,14.6944204 18.5,10 C18.5,5.30557963 14.6944204,1.5 10,1.5 Z M13,7 L13,13 L7,13 L7,7 L13,7 Z',
      'path://M10,2 L10,10 L2,10 L2,2 L10,2 Z M9,3 L3,3 L3,9 L9,9 L9,3 Z M4,4 L8,4 L8,8 L4,8 L4,4 Z',
      'path://M3.5053795,11.2472749 C4.2109372,11.8284719 5.06382105,12.2372746 5.99958323,12.4092353 L5.99999177,13.92911 C4.65127131,13.736189 3.42657316,13.1588067 2.44047514,12.3115409 L3.5053795,11.2472749 Z M10.4048909,11.3196316 L11.4719405,12.3855626 C10.5013117,13.1924224 9.3090787,13.7418605 8.00000823,13.92911 L8.00041677,12.4092353 C8.89685329,12.2445013 9.71723108,11.8624137 10.4048909,11.3196316 Z M7,3 C9.209139,3 11,4.790861 11,7 C11,9.209139 9.209139,11 7,11 C4.790861,11 3,9.209139 3,7 C3,4.790861 4.790861,3 7,3 Z M12.4073252,8.01075535 L13.927525,8.0110259 C13.7744688,9.06903225 13.3847834,10.0504508 12.8138615,10.8998887 L11.7268241,9.81361899 C12.0529744,9.26687132 12.2869563,8.65876862 12.4073252,8.01075535 Z M1.59267482,8.01075535 C1.70557114,8.61853954 1.91841195,9.19121468 2.21350383,9.71108737 L1.12223561,10.803092 C0.586121727,9.97621655 0.219751112,9.02907747 0.0724749528,8.0110259 L1.59267482,8.01075535 Z M1.61518167,2.52716434 L2.68036841,3.59510906 C2.13545426,4.28547007 1.75249946,5.1095937 1.5888335,6.01015046 L0.0694640515,6.01001263 C0.255394851,4.69660305 0.80585666,3.50043101 1.61518167,2.52716434 Z M12.3120733,2.44109483 C13.1611462,3.42952813 13.7390866,4.65762028 13.9305359,6.01001263 L12.4111665,6.01015046 C12.2403488,5.07024187 11.8306589,4.21359219 11.2472749,3.5053795 L12.3120733,2.44109483 Z M5.99999177,0.0708900358 L5.99858304,1.59094858 C5.34712126,1.71078977 4.7358444,1.94542474 4.18650252,2.27310344 L3.10003777,1.18618787 C3.95244041,0.613257743 4.93775051,0.222833032 5.99999177,0.0708900358 Z M8.00000823,0.0708900358 C9.02207623,0.217086649 9.97292201,0.584067639 10.8026831,1.12197051 L9.71139532,2.21367864 C9.1882092,1.91666138 8.61153758,1.70295014 7.99941651,1.59058097 L8.00000823,0.0708900358 Z'
    ]
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
          symbol: symbolList[props.symbol ?? 0],
          symbolSize: 14,
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
