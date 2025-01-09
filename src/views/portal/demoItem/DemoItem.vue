<template>
  <div class="demo-item">
    <div class="content" @click="toDemo(props.demo.path)">
      <div ref="demoItem" class="demo-wrap">
        <div :style="style" class="demo">
          <Component :is="comp" ref="demoRef" />
        </div>
      </div>
    </div>
    <div class="label" @click="handleCopy(props.demo.name)">
      <i class="iconfont icon-fuzhi" />
      <MHighlight :text="props.demo.name" :word="store.filterText" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, markRaw, StyleValue, watchEffect } from 'vue'
import { useMessage } from 'naive-ui'
import { MHighlight } from '@mo-yu/vue'
import { IDemoInfo } from '../menu/useMenu'
import { getDemos } from '../../vtscadd'
import { useMenuStore } from '../menu/useMenu'

const props = defineProps<{
  demo: IDemoInfo
}>()
const store = useMenuStore()
const message = useMessage()
const comp = ref<any>(null)
const style = ref<StyleValue>()
const demoItem = ref<any>(null)
const demoRef = ref<any>(null)

onMounted(() => {
  const key = `${props.demo.path}/index.vue`
  getDemos()
    [key]?.()
    .then(c => {
      comp.value = markRaw(c?.default)
    })
    .catch(err => {
      console.error(err)
    })
})

watchEffect(() => {
  if (demoItem.value && demoRef.value?.$el) {
    const { width: w1, height: h1 } = demoRef.value.$el.getBoundingClientRect()
    const { width: w2, height: h2 } = demoItem.value.getBoundingClientRect()
    const scale = Math.min(w2 / w1, h2 / h1)
    if (scale < 1) {
      style.value = {
        transform: `scale(${scale})`
      }
    }
  }
})

function handleCopy(name: string) {
  navigator.clipboard
    .writeText(name)
    .then(() => {
      message.success(`“${name}” 已复制到剪贴板！`)
    })
    .catch(err => {
      console.error('无法复制文本：', err)
    })
}

function toDemo(path: string) {
  window.open(`${window.location.origin}/#/demo?dir=${path}`, '_blank')
}
</script>

<style scoped lang="scss">
.demo-item {
  width: calc(20% - 16px);
  height: 250px;
  position: relative;
  margin: 8px;
  border: 1px solid #dcdcdc;
  box-shadow: 4px 4px 4px 2px rgba(34, 47, 69, 0.24);
  border-radius: 4px;
  border: 1px solid #ccc;
  .content {
    width: 100%;
    height: calc(100% - 32px);
    padding: 6px;
    cursor: pointer;
    overflow: hidden;
    .demo-wrap {
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      .demo {
        flex-shrink: 0;
        pointer-events: none;
      }
    }
  }
  .label {
    width: 100%;
    height: 32px;
    cursor: copy;
    text-align: center;
    line-height: 32px;
    color: white;
    font-size: 14px;
    border-radius: 0 0 4px 4px;
    background-color: rgba(0, 0, 0, 0.7);
    @include vars.textOver();
    i {
      margin-right: 4px;
    }
  }
}
</style>
