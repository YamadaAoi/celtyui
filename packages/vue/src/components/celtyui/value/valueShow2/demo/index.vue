<template>
  <ValueShow :data="data" />
</template>

<script setup lang="ts">
import ValueShow from 'src/components/celtyui/value/valueShow2/index.vue'

const data = {
  label: '下次一定',
  value: 999,
  unit: '次',
  icon: '/favicon.svg'
}
</script>
