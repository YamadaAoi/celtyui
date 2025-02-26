import { useRef, useEffect } from 'react'
import { Loader } from './loader'

interface SimpleLoading2Props {
  size: number
  radius: number
}

export default function SimpleLoading2(props: SimpleLoading2Props) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const devicePixelRatio = window.devicePixelRatio ?? 1
  const loader = useRef<Loader | null>(null)

  useEffect(() => {
    if (canvasRef.current) {
      loader.current = new Loader(props.size, props.radius, canvasRef.current)
      loader.current.start()
    }
    return () => {
      loader.current?.stop()
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      width={props.size * devicePixelRatio}
      height={props.size * devicePixelRatio}
      style={{ width: props.size + 'px', height: props.size + 'px' }}></canvas>
  )
}
