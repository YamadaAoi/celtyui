import { useEffect, useState } from 'react'
import './index.scss'

export default function NmcForecast() {
  const [ybList, setYbList] = useState<any[]>([])

  useEffect(() => {
    getWeather()
      .then((res: any) => {
        if (res?.code === 0) {
          const predict = res.data.predict?.detail ?? []
          setYbList(
            predict.map((p: any) => {
              const imgs: string[] = []
              const img1 = getSrc(p.day)
              const img2 = getSrc(p.night)
              if (img1) {
                imgs.push(img1)
              }
              if (img2) {
                imgs.push(img2)
              }
              const weather: string[] = []
              const weather1 = getValue(p.day.weather.info)
              const weather2 = getValue(p.night.weather.info)
              if (weather1) {
                weather.push(weather1)
              }
              if (weather2) {
                weather.push(weather2)
              }
              const temp: string[] = []
              const temp1 = getValue(p.day.weather.temperature)
              const temp2 = getValue(p.night.weather.temperature)
              if (temp1) {
                temp.push(temp1)
              }
              if (temp2) {
                temp.push(temp2)
              }
              return {
                date: p.date,
                imgs,
                weather,
                temp
              }
            })
          )
        }
      })
      .catch(err => {
        console.error(err)
      })
  }, [])

  function getValue(val: any) {
    return undefined === val || '9999' === val ? '' : val
  }

  function getSrc(item: any) {
    return `http://image.nmc.cn/assets/img/w/40x40/4/${item.weather.img}.png`
  }

  async function getWeather() {
    // 中央气象台城市预报 http://www.nmc.cn/
    const res = await fetch(
      'http://www.nmc.cn/rest/weather?stationid=CxOWZ&_=1735881231629'
    )
    return await res.json()
  }

  return (
    <div className="nmc-forecast">
      {ybList.map(item => (
        <div key={item.date} className="f-item">
          <div className="left-wrap">
            <div className="left-row row1">
              <div className="date">{item.date}</div>
            </div>
            <div className="left-row">
              <div className="info">{item.temp.join('/')}℃</div>
              <div className="info">{item.weather.join('/')}</div>
            </div>
          </div>
          <div className="imgs">
            {item.imgs.map((img: string, i: number) => (
              <img key={i} src={img} alt="" />
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
