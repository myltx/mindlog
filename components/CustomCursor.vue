<template>
  <ClientOnly>
    <div v-if="!isMobile" class="custom-cursor-wrapper">
      <div
        ref="cursorDot"
        class="custom-cursor-dot"
        :style="{ left: `${position.x}px`, top: `${position.y}px` }"
      />
      <div
        ref="cursorOutline"
        class="custom-cursor-outline"
        :class="{ 'is-hovering': isHovering }"
        :style="{ left: `${position.x}px`, top: `${position.y}px` }"
      />
    </div>
  </ClientOnly>
</template>

<script setup lang="ts">
const position = reactive({ x: 0, y: 0 })
const isHovering = ref(false)
const isMobile = ref(false)

const updateCursor = (e: MouseEvent) => {
  position.x = e.clientX
  position.y = e.clientY
}

const handleMouseOver = (e: MouseEvent) => {
  const target = e.target as HTMLElement
  if (
    target.tagName === 'A' ||
    target.tagName === 'BUTTON' ||
    target.closest('a') ||
    target.closest('button') ||
    target.classList.contains('cursor-pointer')
  ) {
    isHovering.value = true
  } else {
    isHovering.value = false
  }
}

// 检测是否为移动设备
const checkMobile = () => {
  isMobile.value = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || window.innerWidth < 768
}

onMounted(() => {
  // 检测移动设备
  checkMobile()

  // 只在非移动设备上添加事件监听
  if (!isMobile.value) {
    document.addEventListener('mousemove', updateCursor)
    document.addEventListener('mouseover', handleMouseOver)
  }

  // 监听窗口大小变化
  window.addEventListener('resize', checkMobile)
})

onUnmounted(() => {
  document.removeEventListener('mousemove', updateCursor)
  document.removeEventListener('mouseover', handleMouseOver)
  window.removeEventListener('resize', checkMobile)
})
</script>

<style scoped>
.custom-cursor-dot {
  position: fixed;
  width: 8px;
  height: 8px;
  background: #00ff88;
  border-radius: 50%;
  pointer-events: none;
  z-index: 9999;
  transform: translate(-50%, -50%);
  transition: width 0.2s ease, height 0.2s ease;
}

.custom-cursor-outline {
  position: fixed;
  width: 32px;
  height: 32px;
  border: 2px solid rgba(0, 255, 136, 0.5);
  border-radius: 50%;
  pointer-events: none;
  z-index: 9998;
  transform: translate(-50%, -50%);
  transition: width 0.3s ease, height 0.3s ease, border-color 0.3s ease;
}

.custom-cursor-outline.is-hovering {
  width: 48px;
  height: 48px;
  border-color: rgba(0, 217, 255, 0.8);
}

/* 只在非移动设备上隐藏默认鼠标指针 */
@media (min-width: 768px) and (hover: hover) and (pointer: fine) {
  .custom-cursor-wrapper ~ :deep(body),
  :deep(body) {
    cursor: none !important;
  }

  .custom-cursor-wrapper ~ :deep(a),
  .custom-cursor-wrapper ~ :deep(button),
  .custom-cursor-wrapper ~ :deep(input),
  .custom-cursor-wrapper ~ :deep(textarea),
  .custom-cursor-wrapper ~ :deep([role="button"]),
  :deep(a),
  :deep(button),
  :deep(input),
  :deep(textarea),
  :deep([role="button"]) {
    cursor: none !important;
  }
}
</style>
