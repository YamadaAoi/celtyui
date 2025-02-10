<template>
  <NConfigProvider abstract :locale="zhCN" :date-locale="dateZhCN">
    <NMessageProvider>
      <router-view />
    </NMessageProvider>
  </NConfigProvider>
</template>

<script setup lang="ts">
import { NConfigProvider, NMessageProvider, zhCN, dateZhCN } from 'naive-ui'
</script>
