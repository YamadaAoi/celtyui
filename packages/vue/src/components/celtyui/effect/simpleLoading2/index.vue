<template>
  <canvas
    ref="canvasRef"
    :width="props.size * devicePixelRatio"
    :height="props.size * devicePixelRatio"
    :style="{ width: props.size + 'px', height: props.size + 'px' }"
  ></canvas>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { Loader } from './loader'

const props = defineProps<{
  size: number
  radius: number
}>()
const canvasRef = ref<HTMLCanvasElement | null>(null)
const devicePixelRatio = window.devicePixelRatio ?? 1
let loader: Loader | null = null

onMounted(() => {
  if (canvasRef.value) {
    loader = new Loader(props.size, props.radius, canvasRef.value)
    loader.start()
  }
})

onBeforeUnmount(() => {
  loader?.stop()
})
</script>

<style scoped lang="scss"></style>
