import { createSlice, createSelector, PayloadAction } from '@reduxjs/toolkit'
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

export const demoList = createSelector(
  [
    (state: RootState) => state.menu.selectMenu,
    (state: RootState) => state.menu.filterText
  ],
  (selectMenu, filterText) => {
    const list: Array<{ row: IDemoInfo[]; id: string }> = []
    let demos: IDemoInfo[] = []
    if (selectMenu) {
      demos = Object.keys(getDemos())
        .filter(d => d.startsWith(`./${selectMenu}`))
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
            !filterText ||
            p.name.toUpperCase().includes(filterText.toUpperCase())
        )
    }
    for (let i = 0; i < demos.length; i += 5) {
      list.push({
        id: `${i}`,
        row: demos.slice(i, i + 5)
      })
    }
    return list
  }
)

export const { handleSelect, onFilterChange } = menuSlice.actions

export default menuSlice.reducer
