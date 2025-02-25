import AniNumber from '../aniNumber'
import './index.scss'

interface ValueShow4Props {
  data: {
    value: number
    label: string
    unit?: string
    icon?: string
  }
}

export default function ValueShow4(props: ValueShow4Props) {
  return (
    <div className="value-show4">
      <img src={props.data.icon} alt="" />
      <div className="name">{props.data.label}</div>
      <div className="data">
        <div className="value">
          <AniNumber value={props.data.value} />
        </div>
        <div className="unit">{props.data.unit}</div>
      </div>
    </div>
  )
}
