import AniNumber from '../aniNumber'
import './index.scss'

interface ValueShow1Props {
  data: {
    value: number
    label: string
    unit?: string
    icon?: string
  }
}

export default function ValueShow1(props: ValueShow1Props) {
  return (
    <div className="value-show1">
      <img src={props.data.icon} alt="" />
      <div className="wrap">
        <div className="name">{props.data.label}</div>
        <div className="data">
          <div className="value">
            <AniNumber value={props.data.value} />
          </div>
          <div className="unit">{props.data.unit}</div>
        </div>
      </div>
    </div>
  )
}
