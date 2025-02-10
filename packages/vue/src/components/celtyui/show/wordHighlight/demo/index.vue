<template>
  <div class="highlight-demo">
    <WordHighlight text="大海啊，你都是水；骏马啊，你四条腿。" keywords="啊" />
  </div>
</template>

<script setup lang="ts">
import WordHighlight from 'src/components/celtyui/show/wordHighlight/index.vue'
</script>

<style scoped lang="scss">
.highlight-demo {
  width: 300px;
}
</style>
