import BarChart from 'src/components/celtyui/charts/bar/barPictorial'
import './index.scss'

export default function BarPictorialDemo() {
  const data: [string, number][] = new Array(7).fill('').map((s, i) => {
    return [`${2018 + i}`, Math.floor(Math.random() * 100)]
  })

  return (
    <div className="bars">
      <div className="bar-chart">
        <BarChart data={data} symbol={0} yName="单位/件" />
      </div>
      <div className="bar-chart">
        <BarChart data={data} symbol={0} yName="单位/件" />
      </div>
    </div>
  )
}
