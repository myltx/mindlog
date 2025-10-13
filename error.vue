<script setup lang="ts">
const errorMessages = [
  '糟糕！这个页面逃跑了... 🏃',
  '404 - 页面在宇宙中迷路了 🌌',
  '抱歉，这个页面被黑客入侵了 👾',
  '该页面正在度假中... 🏖️',
  '页面不存在，但你很棒！ ✨'
]

const randomMessage = errorMessages[Math.floor(Math.random() * errorMessages.length)]

const suggestedLinks = [
  { label: '返回首页', to: '/', icon: 'carbon:home' },
  { label: '浏览博客', to: '/blog', icon: 'carbon:blog' },
  { label: '查看项目', to: '/projects', icon: 'carbon:code' },
  { label: '关于我', to: '/about', icon: 'carbon:user' }
]
</script>

<template>
  <div class="min-h-screen flex items-center justify-center py-20">
    <div class="container">
      <div class="max-w-2xl mx-auto text-center">
        <!-- 404 动画 -->
        <div class="relative mb-8">
          <div class="text-9xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary opacity-20">
            404
          </div>
          <div class="absolute inset-0 flex items-center justify-center">
            <div class="text-6xl animate-bounce">
              🤖
            </div>
          </div>
        </div>

        <!-- 错误信息 -->
        <h1 class="text-3xl md:text-4xl font-bold mb-4">
          {{ randomMessage }}
        </h1>
        <p class="text-gray-400 text-lg mb-8">
          你访问的页面不存在或已被移除
        </p>

        <!-- 建议链接 -->
        <div class="card inline-block">
          <p class="text-gray-400 mb-4">不如去这些地方看看？</p>
          <div class="grid grid-cols-2 gap-3">
            <NuxtLink
              v-for="link in suggestedLinks"
              :key="link.to"
              :to="link.to"
              class="btn"
            >
              <Icon :name="link.icon" class="mr-2" />
              {{ link.label }}
            </NuxtLink>
          </div>
        </div>

        <!-- 装饰元素 -->
        <div class="mt-12 flex justify-center gap-4 text-4xl opacity-30">
          <span class="animate-pulse">💻</span>
          <span class="animate-pulse delay-100">⚡</span>
          <span class="animate-pulse delay-200">🚀</span>
          <span class="animate-pulse delay-300">✨</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
@keyframes bounce {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-20px);
  }
}

.animate-bounce {
  animation: bounce 2s infinite;
}

.delay-100 {
  animation-delay: 0.1s;
}

.delay-200 {
  animation-delay: 0.2s;
}

.delay-300 {
  animation-delay: 0.3s;
}
</style>
