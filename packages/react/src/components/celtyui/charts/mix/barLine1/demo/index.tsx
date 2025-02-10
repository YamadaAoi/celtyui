import BarLine from 'src/components/celtyui/charts/mix/barLine1'
import './index.scss'

export default function BarLineDemo() {
  const barData: Array<{
    name: string
    value: [any, number][]
  }> = ['A', 'B', 'C'].map(d => {
    return {
      name: d,
      value: ['2022', '2023', '2024'].map(s => {
        return [s, Math.floor(Math.random() * 600)]
      })
    }
  })
  const lineData: Array<{
    name: string
    value: [any, number][]
  }> = ['D'].map(d => {
    return {
      name: d,
      value: ['2022', '2023', '2024'].map(s => {
        return [s, Math.floor(Math.random() * 20)]
      })
    }
  })

  return (
    <div className="bar-line">
      <BarLine barData={barData} lineData={lineData} yName="单位/件" />
    </div>
  )
}
