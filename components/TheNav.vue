<script setup lang="ts">
import type { NavItem } from '~/types'

// 导航菜单项（只包含内部链接）
const navItems: NavItem[] = [
  { label: '首页', to: '/', icon: 'carbon:home' },
  { label: '博客', to: '/blog', icon: 'carbon:blog' },
  { label: '项目', to: '/projects', icon: 'carbon:code' },
  { label: '关于', to: '/about', icon: 'carbon:user' }
]

// 移动端菜单状态
const isMobileMenuOpen = ref(false)

// 搜索模态框状态
const isSearchOpen = ref(false)

// 当前路由
const route = useRoute()

// 主题切换
const { isDark, toggleDark } = useDark()

// 打开搜索
const openSearch = () => {
  isSearchOpen.value = true
}

// 关闭搜索
const closeSearch = () => {
  isSearchOpen.value = false
}

// 监听路由变化，关闭移动端菜单
watch(() => route.path, () => {
  isMobileMenuOpen.value = false
})

// 判断是否为当前页面
const isActive = (path: string) => {
  if (path === '/') {
    return route.path === '/'
  }
  return route.path.startsWith(path)
}

// 键盘快捷键 Ctrl/Cmd + K
onMounted(() => {
  const handleKeydown = (e: KeyboardEvent) => {
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
      e.preventDefault()
      openSearch()
    }
  }
  document.addEventListener('keydown', handleKeydown)
  onUnmounted(() => {
    document.removeEventListener('keydown', handleKeydown)
  })
})
</script>

<template>
  <nav class="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-white/80 dark:bg-slate-950/70 border-b border-gray-200 dark:border-white/10 shadow-lg shadow-gray-200/50 dark:shadow-black/20 transition-colors duration-500">
    <div class="container">
      <div class="flex items-center justify-between h-16">
        <!-- Logo -->
        <NuxtLink to="/" class="flex items-center space-x-3 group">
          <div class="w-10 h-10 bg-gradient-to-br from-primary via-secondary to-accent rounded-xl flex items-center justify-center transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-lg shadow-primary/30 group-hover:shadow-primary/50">
            <span class="text-white font-bold text-xl">&lt;/&gt;</span>
          </div>
          <span class="text-xl font-bold text-gray-900 dark:text-white hidden md:inline-block">Mind<span class="gradient-text">log</span></span>
        </NuxtLink>

        <!-- 桌面端导航 -->
        <div class="hidden md:flex items-center space-x-2">
          <NuxtLink
            v-for="item in navItems"
            :key="item.to"
            :to="item.to"
            class="relative px-4 py-2 rounded-xl text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-all duration-300 group overflow-hidden"
            :class="{ 'text-gray-900 dark:text-white': isActive(item.to) }"
          >
            <span
              class="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl"
              :class="{ 'opacity-100': isActive(item.to) }"
            />
            <span class="relative flex items-center">
              <Icon :name="item.icon || 'carbon:link'" class="mr-2" />
              {{ item.label }}
            </span>
            <span
              v-if="isActive(item.to)"
              class="absolute bottom-0 left-2 right-2 h-0.5 bg-gradient-to-r from-primary to-secondary rounded-full"
            />
          </NuxtLink>
        </div>

        <!-- 右侧功能按钮 -->
        <div class="flex items-center space-x-2">
          <!-- 搜索按钮 -->
          <button
            class="flex items-center gap-2 px-3 py-2 rounded-xl text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-white/10 transition-all duration-300 hover:scale-105 backdrop-blur-sm border border-transparent hover:border-gray-200 dark:hover:border-slate-700"
            aria-label="搜索"
            @click="openSearch"
          >
            <Icon name="carbon:search" class="w-5 h-5 flex-shrink-0" />
            <span class="hidden lg:inline-block text-sm leading-none">搜索</span>
            <kbd class="hidden lg:inline-flex items-center gap-0.5 px-1.5 py-1 rounded bg-gray-100 dark:bg-slate-800 text-xs leading-none text-gray-600 dark:text-gray-400 border border-gray-200 dark:border-slate-700 font-sans">
              <span class="text-[10px]">⌘</span><span>K</span>
            </kbd>
          </button>

          <!-- 主题切换按钮 -->
          <ClientOnly>
            <button
              @click="toggleDark"
              class="p-2.5 rounded-xl text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-white/10 transition-all duration-300 hover:scale-110 backdrop-blur-sm"
              aria-label="切换主题"
            >
              <Transition
                enter-active-class="transition-all duration-300"
                enter-from-class="opacity-0 rotate-180 scale-0"
                enter-to-class="opacity-100 rotate-0 scale-100"
                leave-active-class="transition-all duration-300"
                leave-from-class="opacity-100 rotate-0 scale-100"
                leave-to-class="opacity-0 -rotate-180 scale-0"
                mode="out-in"
              >
                <Icon v-if="isDark" name="carbon:moon" class="w-5 h-5" key="moon" />
                <Icon v-else name="carbon:sun" class="w-5 h-5" key="sun" />
              </Transition>
            </button>
          </ClientOnly>

          <!-- 移动端菜单按钮 -->
          <button
            class="md:hidden p-2.5 rounded-xl text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-white/10 transition-all duration-300 backdrop-blur-sm"
            @click="isMobileMenuOpen = !isMobileMenuOpen"
            aria-label="菜单"
          >
            <Icon :name="isMobileMenuOpen ? 'carbon:close' : 'carbon:menu'" class="w-6 h-6" />
          </button>
        </div>
      </div>

      <!-- 移动端菜单 -->
      <Transition
        enter-active-class="transition-all duration-300 ease-out"
        enter-from-class="opacity-0 -translate-y-4"
        enter-to-class="opacity-100 translate-y-0"
        leave-active-class="transition-all duration-200 ease-in"
        leave-from-class="opacity-100 translate-y-0"
        leave-to-class="opacity-0 -translate-y-4"
      >
        <div v-if="isMobileMenuOpen" class="md:hidden py-4 space-y-2 backdrop-blur-xl bg-white/90 dark:bg-slate-900/50 rounded-2xl mt-2 border border-gray-200 dark:border-white/10">
          <NuxtLink
            v-for="item in navItems"
            :key="item.to"
            :to="item.to"
            class="block px-4 py-3 mx-2 rounded-xl text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-white/10 transition-all duration-300"
            :class="{ 'text-gray-900 dark:text-white bg-gradient-to-r from-primary/20 to-secondary/20': isActive(item.to) }"
          >
            <Icon :name="item.icon || 'carbon:link'" class="inline-block mr-2" />
            {{ item.label }}
          </NuxtLink>
        </div>
      </Transition>
    </div>

    <!-- 搜索模态框 -->
    <SearchModal :is-open="isSearchOpen" @close="closeSearch" />
  </nav>
</template>
