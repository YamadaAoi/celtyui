<template>
  <div class="value-show2">
    <div class="val">
      <img :src="props.data.icon" alt="" />
      <div class="num">
        <MAniNumber :value="props.data.value ?? 0" />
        {{ props.data.unit }}
      </div>
    </div>
    <div class="label">{{ props.data.label }}</div>
  </div>
</template>

<script setup lang="ts">
import { MAniNumber } from '@mo-yu/vue'

const props = defineProps<{
  data: {
    value: number
    label: string
    unit?: string
    icon?: string
  }
}>()
</script>

<style scoped lang="scss">
.value-show2 {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  .val {
    display: flex;
    align-items: flex-end;
    justify-content: center;
    img {
      width: 40px;
      height: 40px;
    }
    .num {
      font-size: 20px;
      color: #ffee00;
    }
  }
  .label {
    font-size: 16px;
    color: #ffffff;
  }
}
</style>
