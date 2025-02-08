import { lazy, Suspense, useEffect, useState, LazyExoticComponent } from 'react'
import { useSearchParams } from 'react-router'
import hljs from 'highlight.js'
import { getDemos, getDemoSource } from 'src/components/celtyui/demoAble'
import 'highlight.js/styles/github-dark.css'
import './demo.scss'

export default function Demo() {
  const [searchParams] = useSearchParams()
  const key = `${searchParams.get('dir')}/demo/index.tsx`
  const [show, setShow] = useState(false)
  const [code, setCode] = useState('')
  const [DynamicComponent, setDynamicComponent] =
    useState<LazyExoticComponent<React.ComponentType<any>>>()

  useEffect(() => {
    setDynamicComponent(lazy(getDemos()[key]))
  }, [key])

  function toggleShow() {
    setShow(s => {
      if (!s && !code) {
        getDemoSource()
          [key]?.()
          .then(s => {
            setCode(hljs.highlightAuto(s).value)
          })
          .catch(err => {
            console.error(err)
          })
      }
      return !s
    })
  }

  return (
    <div className="demo">
      <Suspense fallback={'Loading...'}>
        {DynamicComponent ? <DynamicComponent /> : <></>}
      </Suspense>
      <div className={show ? 'demo-code' : 'demo-code hide-code'}>
        <div
          className="demo-handle iconfont icon-code"
          onClick={toggleShow}></div>
        <pre className="code-body">
          {code ? (
            <code
              className="hljs"
              dangerouslySetInnerHTML={{ __html: code }}></code>
          ) : (
            <></>
          )}
        </pre>
      </div>
    </div>
  )
}
