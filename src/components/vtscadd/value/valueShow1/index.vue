<template>
  <div class="value-show1">
    <img :src="props.data.icon" alt="" />
    <div class="wrap">
      <div class="name">{{ props.data.label }}</div>
      <div class="data">
        <div class="value">
          <MAniNumber :value="props.data.value ?? 0" />
        </div>
        <div class="unit">{{ props.data.unit }}</div>
      </div>
    </div>
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
.value-show1 {
  display: flex;
  align-items: center;
  justify-content: center;
  img {
    width: 34px;
    margin-right: 6px;
  }
  .wrap {
    .name {
      margin-bottom: 2px;
      font-size: 16px;
      color: #ffffff;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .data {
      display: flex;
      align-items: flex-end;
      justify-content: flex-start;
      .value {
        font-weight: bold;
        font-size: 20px;
        line-height: 20px;
        color: #00f9f9;
      }
      .unit {
        margin-left: 4px;
        font-weight: bold;
        font-size: 14px;
        line-height: 14px;
        color: #7db7ef;
      }
    }
  }
}
</style>
