import './menu.scss'
import { defineComponent } from 'vue'
import { NTree, TreeOption } from 'naive-ui'
import { useMenuStore } from './useMenu'

export default defineComponent({
  name: 'MenuPage',
  setup() {
    const store = useMenuStore()

    function onSelect(option: TreeOption, selected: boolean) {
      if (!selected && !option.children?.length) {
        store.handleSelect(option.key)
      }
    }

    function renderLabel(info: {
      option: TreeOption
      checked: boolean
      selected: boolean
    }) {
      return (
        <div
          class="tree-label"
          title={info.option.label}
          onClick={() => onSelect(info.option, info.selected)}>
          {info.option.label}
        </div>
      )
    }

    function renderPrefix(info: {
      option: TreeOption
      checked: boolean
      selected: boolean
    }) {
      return info.option.children?.length ? (
        <></>
      ) : (
        <i class="iconfont icon-zujianku"></i>
      )
    }

    return {
      store,
      renderLabel,
      renderPrefix
    }
  },
  render() {
    return (
      <div class="menu">
        <NTree
          class="menu-tree"
          data={this.store.menuTree}
          selectedKeys={[this.store.selectMenu]}
          blockLine={true}
          blockNode={true}
          selectable={false}
          multiple={false}
          cancelable={false}
          expandOnClick={true}
          defaultExpandAll={true}
          renderLabel={this.renderLabel}
          renderPrefix={this.renderPrefix}
        />
      </div>
    )
  }
})
