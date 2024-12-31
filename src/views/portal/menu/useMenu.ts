import { computed, ref } from 'vue'
import { defineStore } from 'pinia'
import { getDemos, getPics, IDemo } from '../../vtscadd'

interface IDemoInfo {
  name: string
  path: string
  img?: any
}

export const useMenuStore = defineStore('menus', () => {
  const selectMenu = ref('')
  const menuTree = ref<IDemo[]>(getDemoTree(getDemos()))
  const curDemos = computed(() => {
    let demos: IDemoInfo[] = []
    if (selectMenu.value) {
      const modules = getDemos()
      const pics = getPics()
      const paths = Object.keys(modules).filter(d =>
        d.startsWith(`./${selectMenu.value}`)
      )
      demos = paths
        .map(p => {
          const arr = p.split('/')
          return arr.slice(0, arr.length - 1).join('/')
        })
        .map(f => {
          const arr = f.split('/')
          const folder = arr[arr.length - 1]
          const name = folder[0].toUpperCase() + folder.substring(1)
          return {
            name,
            path: f,
            img: pics[`${f}/demo.png`]?.default
          }
        })
    }
    return demos
  })

  function handleSelect(menu: any) {
    selectMenu.value = menu
  }

  function getDemoTree(modules: Record<string, any>) {
    const demoTree: IDemo[] = []
    Object.keys(modules)
      .filter(p => p.endsWith('index.vue'))
      .forEach(path => {
        const paths = path.split('/').slice(1, -2)
        if (paths.length) {
          let obj: IDemo | undefined
          paths.forEach((dir, i, arr) => {
            const p = arr.slice(0, i + 1).join('/')
            if (!obj) {
              obj = demoTree.find(d => d.key === p)
              if (!obj) {
                obj = {
                  label: dir,
                  key: p,
                  children: []
                }
                demoTree.push(obj)
              }
            } else {
              let temp = obj.children.find(d => d.key === p)
              if (!temp) {
                temp = {
                  label: dir,
                  key: p,
                  children: []
                }
                obj.children.push(temp)
              }
              obj = temp
            }
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
    handleSelect
  }
})
