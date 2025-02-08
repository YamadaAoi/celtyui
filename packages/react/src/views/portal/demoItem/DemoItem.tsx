import {
  lazy,
  Suspense,
  useRef,
  useEffect,
  useState,
  CSSProperties,
  LazyExoticComponent
} from 'react'
import { message } from 'antd'
import { useAppSelector } from 'src/store/hooks'
import { getDemos } from 'src/components/celtyui/demoAble'
import WordHighlight from 'src/components/celtyui/show/wordHighlight'
import { IDemoInfo } from 'root/utils/demos'
import './demoItem.scss'

interface DemoProps {
  demo: IDemoInfo
}

export default function DemoItem(props: DemoProps) {
  const [messageApi, contextHolder] = message.useMessage()
  const filterText = useAppSelector(state => state.menu.filterText)
  const key = `${props.demo.path}/demo/index.tsx`
  const [style, setStyle] = useState<CSSProperties>({})
  const [demo, setDemo] = useState<any>(null)
  const [DynamicComponent, setDynamicComponent] =
    useState<LazyExoticComponent<React.ComponentType<any>>>()
  const demoItem = useRef<any>(null)

  useEffect(() => {
    const observer = new MutationObserver(mutationsList => {
      for (const mutation of mutationsList) {
        if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
          const addedNode = mutation.addedNodes[0]
          if (addedNode.nodeType === Node.ELEMENT_NODE) {
            setDemo(addedNode)
            observer.disconnect()
          }
        }
      }
    })
    observer.observe(demoItem.current, { childList: true, subtree: true })

    return () => {
      observer.disconnect()
    }
  }, [])

  useEffect(() => {
    setDynamicComponent(lazy(getDemos()[key]))
  }, [key])

  useEffect(() => {
    if (demoItem.current && demo) {
      const { width: w1, height: h1 } = demo.getBoundingClientRect()
      const { width: w2, height: h2 } = demoItem.current.getBoundingClientRect()
      const scale = Math.min(w2 / w1, h2 / h1)
      if (scale < 1) {
        setStyle({
          transform: `scale(${scale})`
        })
      }
    }
  }, [demoItem.current, demo])

  function handleCopy(name: string) {
    navigator.clipboard
      .writeText(name)
      .then(() => {
        messageApi.success(`“${name}” 已复制到剪贴板！`)
      })
      .catch(err => {
        console.error('无法复制文本：', err)
      })
  }

  function toDemo(path: string) {
    window.open(`${window.location.origin}/#/demo?dir=${path}`, '_blank')
  }

  return (
    <>
      {contextHolder}
      <div className="demo-item">
        <div
          className="content"
          onClick={() => {
            toDemo(props.demo.path)
          }}>
          <div ref={demoItem} className="demo-content">
            <div style={style} className="demo">
              <Suspense fallback={<div>Loading...</div>}>
                {DynamicComponent ? <DynamicComponent /> : <></>}
              </Suspense>
            </div>
          </div>
        </div>
        <div
          className="label"
          onClick={() => {
            handleCopy(props.demo.name)
          }}>
          <i className="iconfont icon-fuzhi" />
          <WordHighlight text={props.demo.name} keywords={filterText} />
        </div>
      </div>
    </>
  )
}
