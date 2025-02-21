interface LibCache {
  promise?: Promise<any>
}

/**
 * 外部lib加载器，加载js文件，避免重复加载
 */
class LibLoader {
  #cache = new Map<string, LibCache>()

  /**
   * 加载lib包js文件，避免重复加载
   * 常用于例如播放视频监控场景
   * @param id
   * @param src
   */
  async loadLib(id: string, src: string) {
    const cache = this.#cache.get(id)
    if (cache) {
      if (cache?.promise) {
        await cache.promise
      }
    } else {
      const promise = this.loadJS(id, src)
      this.#cache.set(id, { promise })
      await promise
    }
  }

  /**
   * 移除lib包依赖js，随组件卸载时调用
   * @param id
   */
  removeLib(id: string) {
    this.#cache.delete(id)
    document.getElementById(id)?.remove()
  }

  private loadJS(id: string, src: string) {
    return new Promise<void>((resolve, reject) => {
      const script = document.createElement('script')
      script.type = 'text/javascript'
      script.id = id
      script.src = src
      document.body.appendChild(script)
      script.onload = () => {
        this.#cache.set(id, {})
        resolve()
      }
      script.onerror = e => {
        this.#cache.delete(id)
        document.getElementById(id)?.remove()
        reject(e)
      }
    })
  }
}

export default new LibLoader()
