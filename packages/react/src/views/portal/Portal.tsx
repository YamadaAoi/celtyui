import { ChangeEvent } from 'react'
import { Input } from 'antd'
import VirtualList from 'rc-virtual-list'
import { useAppSelector, useAppDispatch } from 'src/store/hooks'
import { onFilterChange, demoList } from 'src/store/modules/menuSlice'
import { useRem } from 'src/components/celtyui/util/useRem'
import Header from './header/Header'
import Menu from './menu/Menu'
import DemoItem from './demoItem/DemoItem'
import './portal.scss'

export default function Portal() {
  const { Search } = Input
  const filterText = useAppSelector(state => state.menu.filterText)
  const list = useAppSelector(demoList)
  const dispatch = useAppDispatch()
  const { pxNow } = useRem()

  function onChange(e: ChangeEvent<HTMLInputElement>) {
    dispatch(onFilterChange(e.target.value))
  }

  return (
    <div className="portal">
      <Header />
      <div className="body">
        <Menu />
        <div className="demos">
          <div className="demo-filter">
            <div className="filter">
              <Search
                value={filterText}
                placeholder="搜索"
                allowClear
                size="small"
                onChange={onChange}
              />
            </div>
          </div>
          <div className="demo-wrap">
            <VirtualList
              className="demo-list"
              data={list}
              itemHeight={pxNow(268)}
              itemKey="id">
              {item => (
                <div className="demo-row">
                  {item.row.map(demo => (
                    <DemoItem key={demo.path} demo={demo} />
                  ))}
                </div>
              )}
            </VirtualList>
          </div>
        </div>
      </div>
    </div>
  )
}
