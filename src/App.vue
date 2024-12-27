<template>
  <NConfigProvider abstract :locale="zhCN" :date-locale="dateZhCN">
    <NMessageProvider>
      <MLoading>
        <router-view />
      </MLoading>
    </NMessageProvider>
  </NConfigProvider>
</template>

<script setup lang="ts">
import { NConfigProvider, NMessageProvider, zhCN, dateZhCN } from 'naive-ui'
import { MLoading } from '@mo-yu/vue'
</script>
