import BarChart from 'src/components/celtyui/charts/bar/barChart2'
import '../../barChart1/demo/index.scss'

export default function BarChart2Demo() {
  const data: [number, string][] = new Array(7).fill('').map((s, i) => {
    return [Math.floor(Math.random() * 100), `${2018 + i}`]
  })

  return (
    <div className="bar-chart">
      <BarChart data={data} yName="单位/件" />
    </div>
  )
}
