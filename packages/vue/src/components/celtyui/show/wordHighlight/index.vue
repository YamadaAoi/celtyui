<template>
  <template v-if="arr.length">
    <template v-for="(str, i) in arr">
      <mark
        v-if="str.toLowerCase() === props.keywords?.toLowerCase()"
        :key="i"
        class="m-highlight"
      >
        {{ str }}
      </mark>
      <template v-else>{{ str }}</template>
    </template>
  </template>
  <template v-else>{{ props.text ?? '' }}</template>
</template>

<script setup lang="ts">
import { computed } from 'vue'

defineOptions({
  inheritAttrs: false
})
const props = defineProps<{
  text: string
  keywords?: string
}>()
const filterText = computed(() => {
  const origin = props.keywords ? `${props.keywords}` : ''
  let str = origin
  if (/(\+|-|&|\||!|\(|\)|\{|\}|\[|\]|\^|”|~|\*|\?|:|\\)/g.test(origin)) {
    // 把匹配到的特殊字符 替换成 转义符+原来的字符
    str = origin.replace(
      /(\+|-|&|\||!|\(|\)|\{|\}|\[|\]|\^|”|~|\*|\?|:|\\)/g,
      `\\${
        origin.match(/(\+|-|&|\||!|\(|\)|\{|\}|\[|\]|\^|”|~|\*|\?|:|\\)/g)?.[0]
      }`
    )
  }
  return str
})
const arr = computed(() =>
  props.text && filterText.value
    ? props.text.split(
        new RegExp(`(?<=${filterText.value})|(?=${filterText.value})`, 'i')
      )
    : []
)
</script>

<style scoped lang="scss">
.m-highlight {
  color: red;
}
</style>
