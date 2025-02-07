export interface IDemoInfo {
  name: string
  path: string
}

export interface IDemo {
  label: string
  key: string
  children?: IDemo[]
}

export function getDemoTree(modules: Record<string, any>): [IDemo[], string] {
  const demoTree: IDemo[] = []
  let defaultMenu = ''
  Object.keys(modules).forEach(path => {
    // 截取到组件所处文件夹上一层
    // 例如'./charts/bar/barChart1/demo/index.(vue|tsx)'截取到['charts', 'bar']
    const paths = path.split('/').slice(1, -3)
    if (paths.length) {
      let obj: IDemo | undefined
      paths.forEach((dir, i, arr) => {
        const p = arr.slice(0, i + 1).join('/')
        if (obj && !obj.children) {
          obj.children = []
        }
        const children = obj?.children ?? demoTree
        let temp = children.find(d => d.key === p)
        if (!temp) {
          temp = {
            label: dir,
            key: p
          }
          children.push(temp)
        }
        obj = temp
        if (i === arr.length - 1 && !defaultMenu) {
          defaultMenu = p
        }
      })
    }
  })
  return [demoTree, defaultMenu]
}
