<template>
  <div class="demo">
    <component :is="demo" />
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, markRaw } from 'vue'
import type { Component } from 'vue'
import { useRoute } from 'vue-router'
import { getDemos } from '../vtscadd'

const route = useRoute()
const demo = ref<Component | null>(null)

onMounted(() => {
  const dir = route.query?.dir
  if (dir) {
    const modules = getDemos()
    const comp = modules[`${dir}/index.vue`]
    if (comp) {
      demo.value = markRaw(comp.default)
    }
  }
})
</script>

<style scoped lang="scss">
.demo {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
