<template>
  <ValueShow :data="data" />
</template>

<script setup lang="ts">
import ValueShow from 'src/components/celtyui/value/valueShow4/index.vue'

const data = {
  label: '投币',
  value: 3,
  unit: '次',
  icon: '/favicon.svg'
}
</script>
