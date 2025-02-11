/**
 * 简易防抖
 * @param func - 函数
 * @param delay - 延迟
 * @returns
 */
export function debounce(this: any, func: any, delay = 300) {
  let timer: NodeJS.Timeout
  return function (this: any, ...args: any[]) {
    if (timer) {
      clearTimeout(timer)
    }
    timer = setTimeout(() => {
      func.apply(this, args)
    }, delay)
  }
}
