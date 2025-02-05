<template>
  <div class="value-show">
    <div class="data"><ValueShow :info="data1" /></div>
    <div class="data"><ValueShow :info="data2" /></div>
  </div>
</template>

<script setup lang="ts">
import ValueShow from 'src/components/celtyui/value/valueShow3/index.vue'
import icon from 'src/assets/images/vue.svg'

const data1 = {
  icon,
  bg: 'linear-gradient( 90deg, rgba(40,109,247,0.35) 0%, rgba(40,109,247,0) 100%)',
  data: [
    {
      label: '面积',
      value: 26231,
      unit: '个'
    },
    {
      label: '同比',
      value: -1.6,
      unit: '%下降'
    }
  ]
}
const data2 = {
  icon,
  bg: 'linear-gradient( 90deg, rgba(82,255,226,0.35) 0%, rgba(82,255,226,0) 100%)',
  data: [
    {
      label: '面积',
      value: 26231,
      unit: '亩'
    }
  ]
}
</script>

<style scoped lang="scss">
.value-show {
  width: 400px;
  height: 170px;
  background-color: #062040;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-evenly;
  .data {
    width: 100%;
    height: 64px;
  }
}
</style>
