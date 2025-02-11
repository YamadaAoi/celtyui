import { createApp } from 'vue'
import App from './App.vue'
import { createPinia } from 'pinia'
import { remTool } from 'src/components/celtyui/util/remTool'
import 'root/assets/app.scss'
import 'root/assets/iconfont/iconfont.css'
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
