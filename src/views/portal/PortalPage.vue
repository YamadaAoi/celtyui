<template>
  <div class="portal">
    <Header />
    <div class="body">
      <MenuPage />
      <div class="demos">
        <NVirtualList
          class="demo-list"
          :items="demoList"
          :item-size="pxNow(250)"
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
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { NVirtualList } from 'naive-ui'
import { useRem } from '@mo-yu/vue'
import Header from './header/Header.vue'
import MenuPage from './menu/MenuPage'
import DemoItem from './demoItem/DemoItem.vue'
import { useMenuStore } from './menu/useMenu'

const store = useMenuStore()
const { pxNow } = useRem()
const demoList = computed(() => {
  const list: any[] = []
  for (let i = 0; i < store.curDemos.length; i += 5) {
    list.push({
      row: store.curDemos.slice(i, i + 5)
    })
  }
  return list
})
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
      padding: 16px 8px;
      .demo-list {
        width: 100%;
        max-height: 100%;
        .demo-row {
          width: 100%;
          height: 250px;
          display: flex;
          align-items: center;
          justify-content: flex-start;
        }
      }
    }
  }
}
</style>
