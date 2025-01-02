<template>
  <div class="demo">
    <component :is="demo" />
    <div :class="['demo-code', show ? '' : 'hide-code']">
      <div class="demo-handle iconfont icon-code" @click="toggleShow"></div>
      <pre class="code-body"><code class="hljs" v-html="code"></code></pre>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, markRaw } from 'vue'
import type { Component } from 'vue'
import { useRoute } from 'vue-router'
import hljs from 'highlight.js'
import 'highlight.js/styles/github-dark.css'
import { getDemos, getDemoSource } from '../vtscadd'

const route = useRoute()
const demo = ref<Component | null>(null)
const show = ref(false)
const code = ref('')

onMounted(() => {
  const dir = route.query?.dir
  if (dir) {
    const key = `${dir}/index.vue`
    getDemos()
      [key]?.()
      .then(c => {
        demo.value = markRaw(c?.default)
      })
      .catch(err => {
        console.error(err)
      })
    getDemoSource()
      [key]?.()
      .then(s => {
        code.value = hljs.highlightAuto(s).value
      })
      .catch(err => {
        console.error(err)
      })
  }
})

function toggleShow() {
  show.value = !show.value
}
</script>

<style scoped lang="scss">
.demo {
  width: 100%;
  height: 100%;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  .demo-code {
    width: 45%;
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
    z-index: 9999;
    transition: left 0.3s;
    .code-body {
      width: 100%;
      height: 100%;
      background-color: #0d1117;
      @include vars.scrollBase();
    }
    .demo-handle {
      width: 30px;
      height: 30px;
      cursor: pointer;
      background-color: #0d1117;
      position: absolute;
      right: -30px;
      top: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
      font-size: 20px;
    }
  }
  .hide-code {
    left: -45%;
  }
}
</style>
