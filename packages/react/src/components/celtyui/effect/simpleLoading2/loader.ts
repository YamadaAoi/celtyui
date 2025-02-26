export class Loader {
  #ctx: CanvasRenderingContext2D | null = null
  #size: number
  #radius: number
  #percent: number
  #reverse = false
  #hanlde: number | undefined
  #step = 0.009
  constructor(size: number, radius: number, canvas: HTMLCanvasElement) {
    this.#ctx = canvas.getContext('2d')
    const devicePixelRatio = window.devicePixelRatio ?? 1
    this.#ctx?.scale(devicePixelRatio, devicePixelRatio)
    this.#size = size
    this.#radius = radius
    this.#percent = 0
  }

  start() {
    this.#hanlde = requestAnimationFrame(this.#startAnimate)
  }

  stop() {
    if (this.#hanlde) {
      cancelAnimationFrame(this.#hanlde)
    }
  }

  #startAnimate = () => {
    if (this.#percent >= 1) {
      this.#reverse = true
    } else if (this.#percent <= 0) {
      this.#reverse = false
    }
    if (this.#reverse) {
      this.#percent = this.#percent - this.#step
    } else {
      this.#percent = this.#percent + this.#step
    }
    this.#draw((3 * Math.PI) / 2, this.#percent)
    this.#hanlde = requestAnimationFrame(this.#startAnimate)
  }

  #draw(begin: number, per: number) {
    if (this.#ctx) {
      this.#ctx.clearRect(0, 0, this.#size, this.#size)
      const realBegin = this.#reverse ? begin - 2 * Math.PI * per : begin
      const realEnd = this.#reverse ? begin : begin + 2 * Math.PI * per
      if (this.#reverse) {
        this.#drawOrange(realBegin, per)
      }
      this.#ctx.beginPath()
      this.#ctx.arc(
        this.#size / 2,
        this.#size / 2,
        this.#radius,
        realBegin,
        realEnd
      )
      this.#ctx.strokeStyle = '#A686D2'
      this.#ctx.lineCap = 'round'
      this.#ctx.lineWidth = 5
      this.#ctx.stroke()
      this.#ctx.closePath()
    }
  }

  #drawOrange(begin: number, per: number) {
    const realPer = per > 0.5 ? (1 - per) * 2 : per * 2
    const realEnd = begin
    const realBegin = begin - 0.2 * Math.PI * realPer
    if (per < 0.95) {
      this.#drawBlue(realBegin, realPer)
    }
    if (this.#ctx) {
      this.#ctx.beginPath()
      this.#ctx.arc(
        this.#size / 2,
        this.#size / 2,
        this.#radius,
        realBegin,
        realEnd
      )
      this.#ctx.strokeStyle = '#FFBD33'
      this.#ctx.lineCap = 'round'
      this.#ctx.lineWidth = 5
      this.#ctx.stroke()
      this.#ctx.closePath()
    }
  }

  #drawBlue(begin: number, per: number) {
    const realEnd = begin - 0.1 * Math.PI
    const realBegin = begin - 0.2 * Math.PI * per - 0.1 * Math.PI
    if (this.#ctx) {
      this.#ctx.beginPath()
      this.#ctx.arc(
        this.#size / 2,
        this.#size / 2,
        this.#radius,
        realBegin,
        realEnd
      )
      this.#ctx.strokeStyle = '#1CB5FF'
      this.#ctx.lineCap = 'round'
      this.#ctx.lineWidth = 5
      this.#ctx.stroke()
      this.#ctx.closePath()
    }
  }
}
