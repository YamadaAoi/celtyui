import { createApp } from 'vue'
import App from './App.vue'
import { createPinia } from 'pinia'
import 'dayjs/locale/zh-cn'
import { remTool } from '@mo-yu/core'
import './assets/app.scss'
import './assets/iconfont/iconfont.css'
import router from './router'

remTool.resetDesignSize({
  designWidth: 1920,
  designHeight: 1080
})
remTool.enable()

const meta = document.createElement('meta')
meta.name = 'naive-ui-style'
document.head.appendChild(meta)

const app = createApp(App)
app.use(createPinia()).use(router).mount('#app')
