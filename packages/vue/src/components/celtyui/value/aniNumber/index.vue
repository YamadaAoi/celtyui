<template>
  {{ displayedValue.toFixed(accuracy) }}
</template>

<script setup lang="ts">
import { ref, watch, onBeforeUnmount } from 'vue'
import { isNumber } from '../../util/isNumber'

defineOptions({
  inheritAttrs: false
})

const props = defineProps<{
  value?: number
  precision?: number
  disable?: boolean
  duration?: number
  onFinish?: () => void
}>()
const raf = ref<number | undefined>()
const accuracy = ref(0)
const displayedValue = ref(0)

watch(
  props,
  () => {
    animate()
  },
  {
    immediate: true
  }
)

onBeforeUnmount(() => {
  if (undefined !== raf.value) {
    cancelAnimationFrame(raf.value)
  }
})

function animate() {
  if (undefined !== raf.value) {
    cancelAnimationFrame(raf.value)
  }
  let to = 0
  displayedValue.value = 0
  if (isNumber(props.value)) {
    if (props.precision === undefined) {
      const valueStr = `${props.value}`
      if (valueStr.includes('.')) {
        accuracy.value = valueStr.length - 1 - valueStr.indexOf('.')
      } else {
        accuracy.value = 0
      }
    } else {
      accuracy.value = props.precision
    }
    to = Number(props.value)
  } else {
    to = 0
  }
  if (to !== 0) {
    if (props.disable) {
      displayedValue.value = to
    } else {
      tween(to, props.duration ?? 2000)
    }
  }
}

function tween(t: number, duration: number) {
  function tick() {
    const current = performance.now()
    const elapsedTime = Math.min(current - startTime, duration)
    const currentValue = t * easeOut(elapsedTime / duration)
    if (elapsedTime === duration) {
      displayedValue.value = t
      props.onFinish?.()
      return
    }
    displayedValue.value = currentValue
    raf.value = requestAnimationFrame(tick)
  }
  const startTime = performance.now()
  tick()
}

function easeOut(t: number) {
  return 1 - Math.pow(1 - t, 5)
}
</script>

<style scoped></style>
