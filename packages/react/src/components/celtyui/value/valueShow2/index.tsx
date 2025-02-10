import AniNumber from '../aniNumber'
import './index.scss'

interface ValueShow2Props {
  data: {
    value: number
    label: string
    unit?: string
    icon?: string
  }
}

export default function ValueShow2(props: ValueShow2Props) {
  return (
    <div className="value-show2">
      <div className="val">
        <img src={props.data.icon} alt="" />
        <div className="num">
          <AniNumber value={props.data.value} />
          <span className="unit">{props.data.unit}</span>
        </div>
      </div>
      <div className="value-show2-label">{props.data.label}</div>
    </div>
  )
}
