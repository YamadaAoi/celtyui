<template>
  <div class="portal">
    <Header />
    <div class="body">
      <MenuPage />
      <div class="demos">
        <div class="demo-filter">
          <div class="filter">
            <NInput
              :value="store.filterText"
              placeholder="搜索"
              clearable
              size="small"
              @update:value="store.onFilterChange"
            >
              <template #suffix>
                <i class="iconfont icon-btn_search"></i>
              </template>
            </NInput>
          </div>
        </div>
        <div class="demo-wrap">
          <NVirtualList
            class="demo-list"
            :items="store.demoList"
            :item-size="pxNow(268)"
          >
            <template #default="{ item }">
              <div class="demo-row">
                <DemoItem
                  v-for="demo in item.row"
                  :key="demo.path"
                  :demo="demo"
                />
              </div>
            </template>
          </NVirtualList>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { NVirtualList, NInput } from 'naive-ui'
import { useRem } from 'src/components/celtyui/util/useRem'
import Header from './header/Header.vue'
import MenuPage from './menu/MenuPage'
import DemoItem from './demoItem/DemoItem.vue'
import { useMenuStore } from './menu/useMenu'

const store = useMenuStore()
const { pxNow } = useRem()
</script>

<style scoped lang="scss">
.portal {
  width: 100%;
  height: 100%;
  .body {
    width: 100%;
    height: calc(100% - 64px);
    display: flex;
    align-items: center;
    justify-content: flex-start;
    .demos {
      width: calc(100% - 300px);
      height: 100%;
      .demo-filter {
        width: 100%;
        height: 56px;
        padding: 0 32px;
        display: flex;
        align-items: center;
        justify-content: flex-end;
        border-bottom: 1px solid #dcdcdc;
        .filter {
          width: 300px;
          .iconfont {
            font-size: 16px;
            color: #999;
          }
        }
      }
      .demo-wrap {
        width: 100%;
        height: calc(100% - 56px);
        padding: 16px 8px;
        .demo-list {
          width: 100%;
          max-height: 100%;
          .demo-row {
            width: 100%;
            height: 266px;
            display: flex;
            align-items: center;
            justify-content: flex-start;
          }
        }
      }
    }
  }
}
</style>
