import LineSymbol from 'src/components/celtyui/charts/line/lineSymbol'
import './index.scss'

export default function LineSymbolDemo() {
  const data: [string, number][] = new Array(7).fill('').map((s, i) => {
    return [`${2018 + i}`, Math.floor(Math.random() * 600)]
  })

  return (
    <div className="lines">
      <div className="line-chart">
        <LineSymbol data={data} symbol={0} yName="单位/个" />
      </div>
      <div className="line-chart">
        <LineSymbol data={data} symbol={1} yName="单位/个" />
      </div>
      <div className="line-chart">
        <LineSymbol data={data} symbol={2} yName="单位/个" />
      </div>
      <div className="line-chart">
        <LineSymbol data={data} symbol={3} yName="单位/个" />
      </div>
    </div>
  )
}
