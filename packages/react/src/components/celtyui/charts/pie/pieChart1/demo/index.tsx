import PieChart from 'src/components/celtyui/charts/pie/pieChart1'
import './index.scss'

export default function PieChart1Demo() {
  const data = [
    {
      name: '数据1',
      value: 44
    },
    {
      name: '数据2',
      value: 21
    },
    {
      name: '数据3',
      value: 19
    },
    {
      name: '数据4',
      value: 16
    }
  ]

  return (
    <div className="pie-chart">
      <PieChart data={data} />
    </div>
  )
}
