import AniNumber from '../aniNumber'
import './index.scss'

interface ValueShow3Props {
  info: {
    icon: string
    bg: string
    data: Array<{ label: string; value: number; unit: string }>
    num?: number
  }
}

export default function ValueShow3(props: ValueShow3Props) {
  return (
    <div className="value-show3">
      <div className="icon">
        <img src={props.info?.icon} alt="" />
        {undefined !== props.info?.num ? (
          <div className="num">{props.info.num}</div>
        ) : (
          <></>
        )}
      </div>
      <div style={{ background: props.info?.bg }} className="wrap">
        {(props.info?.data ?? []).map((item, i) => {
          return (
            <div key={i} className="content">
              <div className="name">{item.label}</div>
              <div className="data">
                <div className="value">
                  <AniNumber value={item.value} />
                </div>
                <div className="unit">{item.unit}</div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
