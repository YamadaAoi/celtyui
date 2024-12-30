<template>
  <div class="portal">
    <Header />
    <div class="body">
      <MenuPage />
      <div class="demos">
        <div
          v-for="demo in store.curDemos"
          :key="demo.path"
          class="demo-item"
          @click="toDemo(demo.path)"
        >
          <img :src="demo.img" alt="" />
          <div class="label">
            <i
              class="iconfont icon-fuzhi"
              @click.stop="handleCopy(demo.name)"
            />
            {{ demo.name }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useMessage } from 'naive-ui'
import Header from './header/Header.vue'
import MenuPage from './menu/MenuPage'
import { useMenuStore } from './menu/useMenu'

const store = useMenuStore()
const message = useMessage()

function handleCopy(name: string) {
  navigator.clipboard
    .writeText(name)
    .then(() => {
      message.success(`[${name}] 已复制到剪贴板！`)
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
      @include vars.scrollHiddenBase();
      display: flex;
      flex-wrap: wrap;
      justify-content: flex-start;
      align-content: flex-start;
      .demo-item {
        width: calc(20% - 16px);
        height: 250px;
        cursor: help;
        position: relative;
        margin: 8px;
        display: flex;
        align-items: center;
        justify-content: center;
        border: 1px solid #ccc;
        overflow: hidden;
        &:hover {
          img {
            transform: scale(1.1);
          }
        }
        img {
          transition: all 0.3s ease-in-out;
          width: auto;
          height: auto;
          max-width: 100%;
          max-height: 100%;
        }
        .label {
          width: 100%;
          height: 32px;
          text-align: center;
          line-height: 32px;
          position: absolute;
          bottom: 0;
          left: 0;
          z-index: 9;
          color: white;
          font-size: 14px;
          background-color: rgba(0, 0, 0, 0.5);
          @include vars.textOver();
          i {
            cursor: pointer;
          }
        }
      }
    }
  }
}
</style>
