<template>
  <div class="value-show3">
    <div class="icon">
      <img :src="props.info?.icon" alt="" />
      <div v-if="undefined !== props.info?.num" class="num">
        {{ props.info.num }}
      </div>
    </div>
    <div :style="{ background: props.info?.bg }" class="wrap">
      <div v-for="(item, i) in props.info?.data ?? []" :key="i" class="content">
        <div class="name">{{ item.label }}</div>
        <div class="data">
          <div class="value">
            <MAniNumber :value="item.value" />
          </div>
          <div class="unit">{{ item.unit }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { MAniNumber } from '@mo-yu/vue'

const props = defineProps<{
  info: {
    icon: string
    bg: string
    data: Array<{ label: string; value: number; unit: string }>
    num?: number
  }
}>()
</script>

<style scoped lang="scss">
.value-show3 {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  .icon {
    width: 50px;
    height: 50px;
    position: relative;
    img {
      width: 100%;
      height: 100%;
    }
    .num {
      font-weight: bold;
      font-size: 20px;
      color: #ffffff;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
  }
  .wrap {
    width: calc(100% - 50px);
    height: 100%;
    padding: 0 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .content {
      height: 100%;
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      justify-content: space-evenly;
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
          font-size: 32px;
          line-height: 32px;
          color: #ffee00;
        }
        .unit {
          margin-left: 4px;
          font-size: 14px;
          line-height: 14px;
          color: #f1f7f7;
        }
      }
    }
  }
}
</style>
