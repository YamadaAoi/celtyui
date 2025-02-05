<template>
  <div class="forecast">
    <NmcForecast />
  </div>
</template>

<script setup lang="ts">
import NmcForecast from 'src/components/celtyui/weather/nmcForecast/index.vue'
</script>

<style scoped lang="scss">
.forecast {
  width: 450px;
  height: 390px;
  padding: 20px 25px;
}
</style>
