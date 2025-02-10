import LineChart from 'src/components/celtyui/charts/line/lineChart1'
import './index.scss'

export default function LineChart1Demo() {
  const data: [string, number][] = new Array(7).fill('').map((s, i) => {
    return [`${2018 + i}`, Math.floor(Math.random() * 600)]
  })

  return (
    <div className="line-chart">
      <LineChart data={data} yName="单位/件" />
    </div>
  )
}
