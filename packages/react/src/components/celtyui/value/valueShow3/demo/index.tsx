import ValueShow from 'src/components/celtyui/value/valueShow3'
import './index.scss'

export default function ValueShow3Demo() {
  const data1 = {
    icon: '/favicon.svg',
    bg: 'linear-gradient( 90deg, rgba(40,109,247,0.35) 0%, rgba(40,109,247,0) 100%)',
    data: [
      {
        label: '面积',
        value: 26231,
        unit: '个'
      },
      {
        label: '同比',
        value: -1.6,
        unit: '%下降'
      }
    ]
  }
  const data2 = {
    icon: '/favicon.svg',
    bg: 'linear-gradient( 90deg, rgba(82,255,226,0.35) 0%, rgba(82,255,226,0) 100%)',
    data: [
      {
        label: '面积',
        value: 26231,
        unit: '亩'
      }
    ]
  }

  return (
    <div className="value-show">
      <div className="data">
        <ValueShow info={data1} />
      </div>
      <div className="data">
        <ValueShow info={data2} />
      </div>
    </div>
  )
}
