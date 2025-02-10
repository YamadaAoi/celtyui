import { useEffect, useRef, useState } from 'react'
import { isNumber } from '../../util/isNumber'

interface AniNumberProps {
  value?: number
  precision?: number
  active?: boolean
  duration?: number
  onFinish?: () => void
}

export default function AniNumber(props: AniNumberProps) {
  const raf = useRef<number | undefined>(undefined)
  const [to, setTo] = useState(0)
  const [precision, setPrecision] = useState<number | undefined>(
    props.precision
  )
  const [displayedValue, setDisplayedValue] = useState(0)
  const active = props.active === undefined ? true : props.active

  useEffect(() => {
    animate()
  }, [props])

  function animate() {
    if (undefined !== raf.current) {
      cancelAnimationFrame(raf.current)
    }
    setDisplayedValue(0)
    if (isNumber(props.value)) {
      if (props.precision === undefined) {
        const valueStr = `${props.value}`
        if (valueStr.includes('.')) {
          setPrecision(valueStr.length - 1 - valueStr.indexOf('.'))
        } else {
          setPrecision(0)
        }
      } else {
        setPrecision(props.precision)
      }
      setTo(Number(props.value))
    } else {
      setTo(0)
    }
    if (to !== 0 && active) {
      tween(to, props.duration ?? 2000)
    }
  }

  function tween(t: number, duration: number) {
    function tick() {
      const current = performance.now()
      const elapsedTime = Math.min(current - startTime, duration)
      const currentValue = t * easeOut(elapsedTime / duration)
      if (elapsedTime === duration) {
        setDisplayedValue(t)
        props.onFinish?.()
        return
      }
      setDisplayedValue(currentValue)
      raf.current = requestAnimationFrame(tick)
    }
    const startTime = performance.now()
    tick()
  }

  function easeOut(t: number) {
    return 1 - Math.pow(1 - t, 5)
  }

  return displayedValue.toFixed(precision)
}
