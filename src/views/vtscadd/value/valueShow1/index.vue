<template>
  <ValueShow :data="data" />
</template>

<script setup lang="ts">
import ValueShow from 'src/components/vtscadd/value/valueShow1/index.vue'
import icon from 'src/assets/images/vue.svg'

const data = {
  label: '投币',
  value: 3,
  unit: '次',
  icon
}
</script>
