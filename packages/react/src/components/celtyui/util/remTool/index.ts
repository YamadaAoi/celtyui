import { ToolBase } from '../baseTool'

/**
 * Rem入参
 */
interface RemToolOptions {
  /**
   * 设计稿宽度
   */
  designWidth: number
  /**
   * 设计稿高度
   */
  designHeight?: number
}

/**
 * Rem事件
 */
interface RemToolEvents {
  /**
   * Rem刷新事件
   */
  'rem-refresh': {
    rem: number
  }
}

/**
 * PC端Rem适配方案
 */
class RemTool extends ToolBase<RemToolOptions, RemToolEvents> {
  #remStyle = document.createElement('style')
  #timer: NodeJS.Timeout | undefined
  #designWidth!: number
  #designHeight: number | undefined
  #rem!: number
  constructor(options: RemToolOptions) {
    super(options)
    this.resetOptions(options)
  }

  /**
   * {@inheritDoc ToolBase.enable}
   * @override
   */
  enable() {
    if (document.documentElement.firstElementChild) {
      document.documentElement.firstElementChild.appendChild(this.#remStyle)
    } else {
      const wrap = document.createElement('div')
      wrap.appendChild(this.#remStyle)
      document.write(wrap.innerHTML)
    }
    // 要等 wiewport 设置好后才能执行 refreshRem，不然 refreshRem 会执行2次；
    this.refreshRem()

    window.addEventListener('resize', this.listenResize, false)

    window.addEventListener('pageshow', this.listenPageshow, false)

    if (document.readyState === 'complete') {
      document.body.style.fontSize = '16px'
    } else {
      document.addEventListener(
        'DOMContentLoaded',
        this.domContentLoaded,
        false
      )
    }
  }

  /**
   * {@inheritDoc ToolBase.destroy}
   * @override
   */
  destroy() {
    window.removeEventListener('resize', this.listenResize)
    window.removeEventListener('pageshow', this.listenPageshow)
    document.removeEventListener('DOMContentLoaded', this.domContentLoaded)
  }

  /**
   * 重置设计图尺寸
   * @param options - rem入参
   */
  resetDesignSize(options: RemToolOptions) {
    this.#designWidth = options.designWidth
    this.#designHeight = options.designHeight
  }

  /**
   * 重置参数，并强制刷新rem
   * @param options - rem入参
   */
  resetOptions(options: RemToolOptions) {
    this.resetDesignSize(options)
    this.refreshRem()
  }

  /**
   * 当前1rem等于多少px
   */
  get rem() {
    return this.#rem
  }

  private readonly refreshRem = () => {
    const width = document.documentElement.getBoundingClientRect().width
    const height = document.documentElement.getBoundingClientRect().height
    if (this.#designHeight) {
      const ratio = this.#designHeight / this.#designWidth
      const idealHeight = width * ratio
      this.#rem = (width * height * 100) / (this.#designWidth * idealHeight)
    } else {
      this.#rem = (width * 100) / this.#designWidth
    }
    this.#remStyle.innerHTML = `html{font-size:${this.#rem}px;}`
    this.eventBus.fire('rem-refresh', {
      rem: this.#rem
    })
  }

  private readonly domContentLoaded = () => {
    document.body.style.fontSize = '16px'
  }

  private readonly listenResize = () => {
    if (this.#timer) {
      clearTimeout(this.#timer) // 防止执行两次
    }
    this.#timer = setTimeout(this.refreshRem, 300)
  }

  private readonly listenPageshow = (e: any) => {
    if (e.persisted) {
      if (this.#timer) {
        clearTimeout(this.#timer) // 防止执行两次
      }
      this.#timer = setTimeout(this.refreshRem, 300)
    }
  }
}

/**
 * PC端Rem适配方案
 * 设计稿默认1920
 * 设计稿100px = 1rem
 * @example
 * ```ts
 * remTool.resetDesignSize({ designWidth: 1440 })
 * remTool.enable()
 * remTool.eventBus.on('rem-refresh', e => {
 *   console.log(e.rem)
 * })
 * ```
 */
const remTool = new RemTool({ designWidth: 1920 })

export { remTool }
