import ValueShow from 'src/components/celtyui/value/valueShow5'
import './index.scss'

export default function ValueShow3Demo() {
  const data = {
    icon: '/favicon.svg',
    bg: 'linear-gradient( 90deg, rgba(40,109,247,0.35) 0%, rgba(40,109,247,0) 100%)',
    data: {
      label: '面积',
      value: 26231,
      unit: '亩'
    }
  }

  return (
    <div className="value-show">
      <div className="data-show">
        <ValueShow info={data} />
      </div>
    </div>
  )
}
