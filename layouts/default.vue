<template>
  <div class="min-h-screen bg-gradient-to-br from-gray-50 via-gray-100 to-gray-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 text-gray-900 dark:text-gray-100 relative overflow-hidden transition-colors duration-500">
    <!-- 自定义鼠标指针 -->
    <CustomCursor />

    <!-- 背景装饰动画 -->
    <div class="fixed inset-0 pointer-events-none">
      <div class="absolute top-0 -left-40 w-96 h-96 bg-primary/20 dark:bg-primary/10 rounded-full blur-3xl animate-float" />
      <div class="absolute top-1/4 -right-40 w-80 h-80 bg-secondary/20 dark:bg-secondary/10 rounded-full blur-3xl animate-float" style="animation-delay: 2s;" />
      <div class="absolute bottom-0 left-1/3 w-96 h-96 bg-accent/20 dark:bg-accent/10 rounded-full blur-3xl animate-float" style="animation-delay: 4s;" />
    </div>

    <TheNav />
    <main class="pt-16 relative z-10">
      <slot />
    </main>
    <TheFooter />

    <!-- 滚动至顶部按钮 -->
    <ScrollToTop />
  </div>
</template>
