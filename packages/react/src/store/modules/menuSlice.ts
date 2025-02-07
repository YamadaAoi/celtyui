import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { getDemos } from 'src/components/celtyui/demoAble'
import { IDemo, IDemoInfo, getDemoTree } from 'root/utils/demos'
import type { RootState } from '../store'

interface IMenuState {
  selectMenu: string
  menuTree: IDemo[]
  filterText: string
}

const [tree, defaultMenu] = getDemoTree(getDemos())
const initialState: IMenuState = {
  selectMenu: defaultMenu,
  menuTree: tree,
  filterText: ''
}

const menuSlice = createSlice({
  name: 'menu',
  initialState,
  reducers: {
    handleSelect: (state, action: PayloadAction<string>) => {
      state.selectMenu = action.payload
      state.filterText = ''
    },
    onFilterChange: (state, action: PayloadAction<string>) => {
      state.filterText = action.payload
    }
  }
})

export const { handleSelect, onFilterChange } = menuSlice.actions

export const curDemos = (state: RootState) => {
  let demos: IDemoInfo[] = []
  if (state.menu.selectMenu) {
    demos = Object.keys(getDemos())
      .filter(d => d.startsWith(`./${state.menu.selectMenu}`))
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
          !state.menu.filterText ||
          p.name.toUpperCase().includes(state.menu.filterText.toUpperCase())
      )
  }
  return demos
}

export default menuSlice.reducer
