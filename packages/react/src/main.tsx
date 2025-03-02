import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router'
import { remTool } from 'src/components/celtyui/util/remTool'
import 'root/assets/app.scss'
import 'root/assets/iconfont/iconfont.css'
import App from './App'
import { store } from './store/store'

remTool.resetDesignSize({
  designWidth: 1920,
  designHeight: 1080
})
remTool.enable()

createRoot(document.getElementById('app')!).render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </StrictMode>
)
