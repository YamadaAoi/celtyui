<template>
  <div class="value-show">
    <div class="data"><ValueShow :info="data" /></div>
  </div>
</template>

<script setup lang="ts">
import ValueShow from 'src/components/celtyui/value/valueShow5/index.vue'

const data = {
  icon: '/favicon.svg',
  bg: 'linear-gradient( 90deg, rgba(40,109,247,0.35) 0%, rgba(40,109,247,0) 100%)',
  data: {
    label: '面积',
    value: 26231,
    unit: '亩'
  }
}
</script>

<style scoped lang="scss">
.value-show {
  width: 400px;
  height: 170px;
  background-color: #062040;
  display: flex;
  align-items: center;
  justify-content: center;
  .data {
    width: 100%;
    height: 64px;
  }
}
</style>
