import AniNumber from '../aniNumber'
import './index.scss'

interface ValueShow5Props {
  info: {
    icon: string
    bg: string
    data: { label: string; value: number; unit: string }
    num?: number
  }
}

export default function ValueShow5(props: ValueShow5Props) {
  return (
    <div className="value-show5">
      <div className="icon">
        <img src={props.info?.icon} alt="" />
        {undefined !== props.info?.num ? (
          <div className="num">{props.info.num}</div>
        ) : (
          <></>
        )}
      </div>
      <div style={{ background: props.info?.bg }} className="wrap">
        <div className="name">{props.info.data.label}</div>
        <div className="data">
          <div className="value">
            <AniNumber value={props.info.data.value} />
          </div>
          <div className="unit">{props.info.data.unit}</div>
        </div>
      </div>
    </div>
  )
}
