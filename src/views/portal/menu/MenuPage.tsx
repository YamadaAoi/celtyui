import './menu.scss'
import { defineComponent } from 'vue'
import { NTree, TreeOption } from 'naive-ui'
import { useMenuStore } from './useMenu'

export default defineComponent({
  name: 'MenuPage',
  setup() {
    const store = useMenuStore()

    function onSelect(
      value: string[],
      option: Array<TreeOption | null>,
      meta: {
        node: TreeOption | null
        action: 'select' | 'unselect'
      }
    ) {
      if (meta.node?.key && meta.action === 'select') {
        store.handleSelect(meta.node.key)
      }
    }

    function renderLabel(info: {
      option: TreeOption
      checked: boolean
      selected: boolean
    }) {
      return (
        <div class="tree-label">
          <div class="label-wrap" title={info.option.label}>
            {info.option.label}
          </div>
        </div>
      )
    }

    return {
      store,
      onSelect,
      renderLabel
    }
  },
  render() {
    return (
      <div class="menu">
        <NTree
          class="menu-tree"
          data={this.store.menuTree}
          blockLine={true}
          selectable={true}
          cancelable={false}
          expandOnClick={true}
          defaultExpandAll={true}
          renderLabel={this.renderLabel}
          onUpdateSelectedKeys={this.onSelect}
        />
      </div>
    )
  }
})
