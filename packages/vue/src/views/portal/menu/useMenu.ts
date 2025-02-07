import { computed, ref } from 'vue'
import { defineStore } from 'pinia'
import { getDemos } from 'src/components/celtyui/demoAble'
import { IDemo, IDemoInfo, getDemoTree } from 'root/utils/demos'

export const useMenuStore = defineStore('menus', () => {
  const [tree, defaultMenu] = getDemoTree(getDemos())
  const selectMenu = ref(defaultMenu)
  const menuTree = ref<IDemo[]>(tree)
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

  return {
    menuTree,
    curDemos,
    selectMenu,
    filterText,
    handleSelect,
    onFilterChange
  }
})
