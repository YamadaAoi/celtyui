/**
 * 下载
 * @param url - 链接
 * @param fileName - 文件名
 */
export function download(url: string, fileName: string) {
  const aLink = document.createElement('a')
  const evt = document.createEvent('HTMLEvents')
  evt.initEvent('click', true, true)
  aLink.download = fileName
  aLink.target = '_blank'
  aLink.href = url
  aLink.dispatchEvent(
    new MouseEvent('click', { bubbles: true, cancelable: true, view: window })
  )
}
