import { Tree } from 'antd'
import { useAppSelector, useAppDispatch } from 'src/store/hooks'
import { handleSelect } from 'src/store/modules/menuSlice'
import { IDemo } from 'root/utils/demos'
import './menu.scss'

export default function Menu() {
  const menuTree = useAppSelector(state => state.menu.menuTree)
  const selectMenu = useAppSelector(state => state.menu.selectMenu)
  const dispatch = useAppDispatch()

  function onSelect(keys: any[], info: any) {
    if (info.selected && !info.node.children?.length) {
      dispatch(handleSelect(info.node.key))
    }
  }

  function renderLabel(node: IDemo) {
    return (
      <div className="tree-label" title={node.label}>
        {node.children?.length ? (
          <></>
        ) : (
          <i className="iconfont icon-zujianku"></i>
        )}
        {node.label}
      </div>
    )
  }

  return (
    <div className="menu">
      <Tree
        className="menu-tree"
        treeData={menuTree}
        fieldNames={{
          title: 'label',
          key: 'key',
          children: 'children'
        }}
        selectedKeys={[selectMenu]}
        blockNode={true}
        selectable={true}
        multiple={false}
        defaultExpandAll={true}
        titleRender={renderLabel}
        onSelect={onSelect}
      />
    </div>
  )
}
