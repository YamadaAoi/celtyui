import LineChart from 'src/components/celtyui/charts/line/lineChart2'
import '../../lineChart1/demo/index.scss'

export default function LineChart2Demo() {
  const data: Array<{
    name: string
    value: [any, number][]
  }> = ['A', 'B', 'C'].map(d => {
    return {
      name: d,
      value: new Array(7).fill('').map((s, i) => {
        return [`${2018 + i}`, Math.floor(Math.random() * 100)]
      })
    }
  })

  return (
    <div className="line-chart">
      <LineChart data={data} yName="单位/件" />
    </div>
  )
}
