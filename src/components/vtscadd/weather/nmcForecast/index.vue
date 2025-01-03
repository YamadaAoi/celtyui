<template>
  <div class="nmc-forecast">
    <div v-for="item in ybList" :key="item.date" class="f-item">
      <div class="left-wrap">
        <div class="left-row row1">
          <div class="date">{{ item.date }}</div>
        </div>
        <div class="left-row">
          <div class="info">{{ item.temp.join('/') }}℃</div>
          <div class="info">{{ item.weather.join('/') }}</div>
        </div>
      </div>
      <div class="imgs">
        <img v-for="(img, i) in item.imgs" :key="i" :src="img" alt="" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'

const ybList = ref<any[]>([])

onMounted(() => {
  getWeather()
    .then((res: any) => {
      if (res?.code === 0) {
        const predict = res.data.predict?.detail ?? []
        ybList.value = predict.map((p: any) => {
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
      }
    })
    .catch(err => {
      console.error(err)
    })
})

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
</script>

<style scoped lang="scss">
.nmc-forecast {
  width: 100%;
  height: 100%;
  overflow-x: hidden;
  overflow-y: auto;
  &::-webkit-scrollbar {
    width: 6px;
    height: 120px;
  }
  &::-webkit-scrollbar-thumb {
    background: #2b7bae;
    border-radius: 3px;
  }
  .f-item {
    width: 100%;
    height: 80px;
    padding: 0 10px 0 18px;
    margin-bottom: 10px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    background: linear-gradient(90deg, #009aff 0%, #183d55 100%);
    .left-wrap {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      justify-content: space-evenly;
      .left-row {
        display: flex;
        align-items: flex-end;
        justify-content: flex-start;
        color: rgba(255, 255, 255, 0.8);
        font-size: 16px;
        .date {
          font-size: 24px;
          margin-right: 10px;
        }
        .info {
          margin-right: 30px;
        }
      }
    }
    .imgs {
      display: flex;
      align-items: center;
      justify-content: flex-end;
      img {
        width: 30px;
        height: 30px;
        margin-left: 20px;
      }
    }
    &:hover {
      .left-wrap {
        .left-row {
          color: #ffffff;
          .info {
            font-weight: bold;
          }
        }
      }
    }
  }
}
</style>
