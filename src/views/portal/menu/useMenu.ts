import { computed, ref } from 'vue'
import { defineStore } from 'pinia'
import { getDemos, IDemo } from 'src/components/vtscadd/demoAble'

export interface IDemoInfo {
  name: string
  path: string
}

export const useMenuStore = defineStore('menus', () => {
  const selectMenu = ref('')
  const menuTree = ref<IDemo[]>(getDemoTree(getDemos()))
  const filterText = ref('')
  const curDemos = computed(() => {
    let demos: IDemoInfo[] = []
    if (selectMenu.value) {
      demos = Object.keys(getDemos())
        .filter(d => d.startsWith(`./${selectMenu.value}`))
        .map(p => {
          const arr = p.split('/')
          const pathArr = arr.slice(0, arr.length - 2)
          const folder = pathArr[pathArr.length - 1]
          const name = folder[0].toUpperCase() + folder.substring(1)
          const path = pathArr.join('/')
          return {
            name,
            path
          }
        })
        .filter(
          p =>
            !filterText.value ||
            p.name.toUpperCase().includes(filterText.value.toUpperCase())
        )
    }
    return demos
  })

  function handleSelect(menu: any) {
    onFilterChange('')
    selectMenu.value = menu
  }

  function onFilterChange(val: string) {
    filterText.value = val
  }

  function getDemoTree(modules: Record<string, any>) {
    const demoTree: IDemo[] = []
    Object.keys(modules).forEach(path => {
      // 截取到组件所处文件夹上一层
      // 例如'./charts/bar/barChart1/demo/index.vue'截取到['charts', 'bar']
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
          if (i === arr.length - 1 && !selectMenu.value) {
            selectMenu.value = p
          }
        })
      }
    })
    return demoTree
  }

  return {
    menuTree,
    curDemos,
    selectMenu,
    filterText,
    handleSelect,
    onFilterChange
  }
})
