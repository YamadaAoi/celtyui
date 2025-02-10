<template>
  {{ displayedValue.toFixed(precision) }}
</template>

<script setup lang="ts">
import { ref, watch, onBeforeUnmount } from 'vue'
import { isNumber } from '../../util/isNumber'

defineOptions({
  inheritAttrs: false
})

const props = withDefaults(
  defineProps<{
    value?: number
    precision?: number
    active?: boolean
    duration?: number
    onFinish?: () => void
  }>(),
  {
    active: true
  }
)
const raf = ref<number | undefined>()
const precision = ref(0)
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
        precision.value = valueStr.length - 1 - valueStr.indexOf('.')
      } else {
        precision.value = 0
      }
    } else {
      precision.value = props.precision
    }
    to = Number(props.value)
  } else {
    to = 0
  }
  if (to !== 0 && props.active) {
    tween(to, props.duration ?? 2000)
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
