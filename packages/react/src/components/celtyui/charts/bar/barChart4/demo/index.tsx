import BarChart from 'src/components/celtyui/charts/bar/barChart4'
import '../../barChart1/demo/index.scss'

export default function BarChart4Demo() {
  const data: Array<{
    name: string
    value: [any, number][]
  }> = ['A', 'B', 'C', 'D'].map(d => {
    return {
      name: d,
      value: new Array(7).fill('').map((s, i) => {
        return [`${2018 + i}`, Math.floor(Math.random() * 200)]
      })
    }
  })

  return (
    <div className="bar-chart">
      <BarChart data={data} yName="单位/件" />
    </div>
  )
}
