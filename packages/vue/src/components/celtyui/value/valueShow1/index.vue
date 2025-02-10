<template>
  <div class="value-show1">
    <img :src="props.data.icon" alt="" />
    <div class="wrap">
      <div class="name">{{ props.data.label }}</div>
      <div class="data">
        <div class="value">
          <AniNumber :value="props.data.value ?? 0" />
        </div>
        <div class="unit">{{ props.data.unit }}</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import AniNumber from '../aniNumber/index.vue'

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
    width: 32px;
    margin-right: 6px;
  }
  .wrap {
    .name {
      margin-bottom: 2px;
      font-size: 16px;
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
      }
      .unit {
        margin-left: 4px;
        font-weight: bold;
        font-size: 14px;
        line-height: 14px;
      }
    }
  }
}
</style>
