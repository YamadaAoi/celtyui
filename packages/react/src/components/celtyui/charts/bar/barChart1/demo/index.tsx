import BarChart from 'src/components/celtyui/charts/bar/barChart1'
import './index.scss'

export default function BarChart1Demo() {
  const data: [string, number][] = new Array(7).fill('').map((s, i) => {
    return [`${2018 + i}`, Math.floor(Math.random() * 100)]
  })

  return (
    <div className="bar-chart">
      <BarChart data={data} yName="单位/件" />
    </div>
  )
}
