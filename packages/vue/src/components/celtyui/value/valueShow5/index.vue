<template>
  <div class="value-show5">
    <div class="icon">
      <img :src="props.info?.icon" alt="" />
      <div v-if="undefined !== props.info?.num" class="num">
        {{ props.info.num }}
      </div>
    </div>
    <div :style="{ background: props.info?.bg }" class="wrap">
      <div class="name">{{ props.info.data.label }}</div>
      <div class="data">
        <div class="value">
          <AniNumber :value="props.info.data.value" />
        </div>
        <div class="unit">{{ props.info.data.unit }}</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import AniNumber from '../aniNumber/index.vue'

const props = defineProps<{
  info: {
    icon: string
    bg: string
    data: { label: string; value: number; unit: string }
    num?: number
  }
}>()
</script>

<style scoped lang="scss">
.value-show5 {
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
    .name {
      font-size: 16px;
      line-height: 16px;
      color: #ffffff;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      flex-shrink: 0;
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
</style>
