<template>
  <ClientOnly>
    <Transition name="fade">
      <button
        v-show="showButton"
        class="scroll-to-top"
        @click="scrollToTop"
        aria-label="滚动至顶部"
      >
        <Icon name="carbon:arrow-up" class="w-6 h-6" />
      </button>
    </Transition>
  </ClientOnly>
</template>

<script setup lang="ts">
import { useWindowScroll } from '@vueuse/core'

const { y } = useWindowScroll()
const showButton = computed(() => y.value > 300)

const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  })
}
</script>

<style scoped>
.scroll-to-top {
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  width: 3rem;
  height: 3rem;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #00ff88 0%, #00d9ff 100%);
  border: none;
  border-radius: 50%;
  color: #0a0e27;
  cursor: none;
  box-shadow: 0 4px 12px rgba(0, 255, 136, 0.3);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  z-index: 50;
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

.scroll-to-top:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 20px rgba(0, 255, 136, 0.5);
}

.scroll-to-top:active {
  transform: translateY(-2px);
}

/* 渐入渐出动画 */
.fade-enter-active,
.fade-leave-active {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(20px) scale(0.8);
}

/* 脉冲动画 */
@keyframes pulse {
  0%, 100% {
    box-shadow: 0 4px 12px rgba(0, 255, 136, 0.3);
  }
  50% {
    box-shadow: 0 4px 20px rgba(0, 255, 136, 0.6);
  }
}
</style>
