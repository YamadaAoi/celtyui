import { Image } from 'antd'
import moyu from 'root/assets/images/mo-yu.jpg'
import './header.scss'

export default function Header() {
  return (
    <div className="header">
      <div className="header-wrap">
        <Image className="mo-yu-icon" src={moyu} />
        <div className="title">celtyui（react）</div>
      </div>
      <div className="header-wrap">
        <a
          className="iconfont icon-github"
          href="https://github.com/YamadaAoi/celtyui"
          target="_blank"
        />
        <a
          className="iconfont icon-npm"
          href="https://www.npmjs.com/package/celtyui"
          target="_blank"
        />
      </div>
    </div>
  )
}
