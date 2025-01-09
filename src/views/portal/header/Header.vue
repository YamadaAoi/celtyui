<template>
  <div class="header">
    <div class="header-wrap">
      <NImage class="mo-yu-icon" :src="moyu" />
      <div class="title">vtscadd</div>
    </div>
    <div class="header-wrap">
      <a
        class="iconfont icon-github"
        href="https://github.com/YamadaAoi/vtscadd"
        target="_blank"
      />
      <a
        class="iconfont icon-npm"
        href="https://www.npmjs.com/package/vtscadd"
        target="_blank"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { NImage } from 'naive-ui'
import moyu from 'src/assets/images/mo-yu.jpg'
</script>

<style scoped lang="scss">
.header {
  width: 100%;
  height: 64px;
  border-bottom: 1px solid #dcdcdc;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 32px;
  .header-wrap {
    display: flex;
    align-items: center;
    justify-content: space-between;
    .mo-yu-icon {
      height: 56px;
    }
    .title {
      margin-left: 24px;
      color: rgb(31, 34, 37);
      font-size: 24px;
      font-weight: bold;
    }
    .iconfont {
      display: block;
      text-decoration: none;
      font-size: 32px;
      margin-left: 14px;
      cursor: pointer;
    }
    .icon-github {
      color: #1f2328;
    }
    .icon-npm {
      color: #cb3837;
    }
  }
}
</style>
