<template>
  <div class="simple-loading">
    <div class="loading-chase">
      <div class="loading-dot"></div>
      <div class="loading-dot"></div>
      <div class="loading-dot"></div>
      <div class="loading-dot"></div>
      <div class="loading-dot"></div>
      <div class="loading-dot"></div>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
.simple-loading {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  .loading-chase {
    width: 40px;
    height: 40px;
    position: relative;
    animation: loading-chase 2.5s infinite linear both;
    .loading-dot {
      width: 100%;
      height: 100%;
      position: absolute;
      left: 0;
      top: 0;
      animation: loading-dot 2s infinite ease-in-out both;
      &::before {
        content: '';
        display: block;
        width: 25%;
        height: 25%;
        background-color: rgba(0, 0, 0, 0.5);
        border-radius: 100%;
        animation: loading-dot-before 2s infinite ease-in-out both;
      }
      &:nth-child(1) {
        animation-delay: -1.1s;
      }
      &:nth-child(2) {
        animation-delay: -1s;
      }
      &:nth-child(3) {
        animation-delay: -0.9s;
      }
      &:nth-child(4) {
        animation-delay: -0.8s;
      }
      &:nth-child(5) {
        animation-delay: -0.7s;
      }
      &:nth-child(6) {
        animation-delay: -0.6s;
      }
      &:nth-child(1)::before {
        animation-delay: -1.1s;
      }
      &:nth-child(2)::before {
        animation-delay: -1s;
      }
      &:nth-child(3)::before {
        animation-delay: -0.9s;
      }
      &:nth-child(4)::before {
        animation-delay: -0.8s;
      }
      &:nth-child(5)::before {
        animation-delay: -0.7s;
      }
      &:nth-child(6)::before {
        animation-delay: -0.6s;
      }
    }
  }
}

@keyframes loading-chase {
  100% {
    transform: rotate(360deg);
  }
}

@keyframes loading-dot {
  80%,
  100% {
    transform: rotate(360deg);
  }
}

@keyframes loading-dot-before {
  50% {
    transform: scale(0.4);
  }
  100%,
  0% {
    transform: scale(1);
  }
}
</style>
