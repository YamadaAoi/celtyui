<template>
  <ValueShow :data="data" />
</template>

<script setup lang="ts">
import ValueShow from 'src/components/vtscadd/value/valueShow2/index.vue'
import icon from 'src/assets/images/vue.svg'

const data = {
  label: '下次一定',
  value: 999,
  unit: '次',
  icon
}
</script>

<style scoped lang="scss"></style>
