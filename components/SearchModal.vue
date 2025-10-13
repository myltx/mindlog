<template>
  <ClientOnly>
    <Teleport to="body">
      <Transition
        enter-active-class="transition-all duration-300 ease-out"
        enter-from-class="opacity-0"
        enter-to-class="opacity-100"
        leave-active-class="transition-all duration-200 ease-in"
        leave-from-class="opacity-100"
        leave-to-class="opacity-0"
      >
        <div
          v-if="isOpen"
          class="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm"
          @click="closeModal"
        >
          <div class="container py-20 px-4">
            <Transition
              enter-active-class="transition-all duration-300 ease-out"
              enter-from-class="opacity-0 scale-95 -translate-y-8"
              enter-to-class="opacity-100 scale-100 translate-y-0"
              leave-active-class="transition-all duration-200 ease-in"
              leave-from-class="opacity-100 scale-100 translate-y-0"
              leave-to-class="opacity-0 scale-95 -translate-y-8"
            >
              <div
                v-if="isOpen"
                class="max-w-3xl mx-auto card border-2 border-primary/20"
                @click.stop
              >
                <!-- 搜索输入框 -->
                <div class="relative">
                  <Icon
                    name="carbon:search"
                    class="absolute left-4 top-1/2 -translate-y-1/2 w-6 h-6 text-gray-400"
                  />
                  <input
                    ref="searchInput"
                    v-model="searchQuery"
                    type="text"
                    placeholder="搜索文章标题、描述或标签..."
                    class="w-full pl-14 pr-12 py-4 bg-transparent border-0 outline-none text-xl text-gray-900 dark:text-white placeholder-gray-400"
                    @input="handleSearch"
                    @keydown.esc="closeModal"
                  />
                  <button
                    v-if="searchQuery"
                    class="absolute right-4 top-1/2 -translate-y-1/2 p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors"
                    @click="clearSearch"
                  >
                    <Icon name="carbon:close" class="w-5 h-5 text-gray-400" />
                  </button>
                </div>

                <!-- 搜索结果 -->
                <div
                  v-if="searchQuery.length >= 2"
                  class="border-t border-gray-200 dark:border-slate-800 max-h-[500px] overflow-y-auto"
                >
                  <!-- 加载状态 -->
                  <div
                    v-if="isSearching"
                    class="p-8 text-center text-gray-500 dark:text-gray-400"
                  >
                    <Icon name="carbon:loading" class="w-8 h-8 animate-spin mx-auto mb-2" />
                    <p>搜索中...</p>
                  </div>

                  <!-- 搜索结果列表 -->
                  <div v-else-if="searchResults.length > 0" class="py-2">
                    <div class="px-4 py-2 text-sm text-gray-500 dark:text-gray-400">
                      找到 {{ searchResults.length }} 篇文章
                    </div>
                    <NuxtLink
                      v-for="(post, index) in searchResults"
                      :key="post._path"
                      :to="post._path"
                      class="block px-4 py-3 hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors group"
                      @click="closeModal"
                    >
                      <div class="flex items-start gap-3">
                        <div class="flex-shrink-0 w-12 h-12 rounded-lg bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center text-primary font-bold">
                          {{ index + 1 }}
                        </div>
                        <div class="flex-1 min-w-0">
                          <h3 class="font-semibold text-gray-900 dark:text-white group-hover:text-primary transition-colors mb-1">
                            {{ post.title }}
                          </h3>
                          <p class="text-sm text-gray-600 dark:text-gray-400 line-clamp-2 mb-2">
                            {{ post.description }}
                          </p>
                          <div class="flex flex-wrap gap-2">
                            <span class="text-xs px-2 py-1 rounded bg-gray-100 dark:bg-slate-800 text-gray-600 dark:text-gray-400">
                              {{ post.category }}
                            </span>
                            <span
                              v-for="tag in post.tags?.slice(0, 3)"
                              :key="tag"
                              class="text-xs px-2 py-1 rounded bg-primary/10 text-primary"
                            >
                              #{{ tag }}
                            </span>
                          </div>
                        </div>
                      </div>
                    </NuxtLink>
                  </div>

                  <!-- 无结果 -->
                  <div
                    v-else
                    class="p-8 text-center text-gray-500 dark:text-gray-400"
                  >
                    <Icon name="carbon:search-locate" class="w-12 h-12 mx-auto mb-3 opacity-40" />
                    <p class="text-lg font-medium mb-1">未找到相关文章</p>
                    <p class="text-sm">试试其他关键词吧</p>
                  </div>
                </div>

                <!-- 提示信息 -->
                <div
                  v-else
                  class="border-t border-gray-200 dark:border-slate-800 p-8 text-center text-gray-500 dark:text-gray-400"
                >
                  <Icon name="carbon:keyboard" class="w-12 h-12 mx-auto mb-3 opacity-40" />
                  <p class="text-sm">输入至少 2 个字符开始搜索</p>
                </div>

                <!-- 快捷键提示 -->
                <div class="border-t border-gray-200 dark:border-slate-800 px-4 py-3 flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
                  <div class="flex items-center gap-4">
                    <div class="flex items-center gap-2">
                      <kbd class="px-2 py-1 rounded bg-gray-100 dark:bg-slate-800 text-gray-600 dark:text-gray-300 font-mono">ESC</kbd>
                      <span>关闭</span>
                    </div>
                  </div>
                  <div>{{ searchQuery.length }} / ∞</div>
                </div>
              </div>
            </Transition>
          </div>
        </div>
      </Transition>
    </Teleport>
  </ClientOnly>
</template>

<script setup lang="ts">
const props = defineProps<{
  isOpen: boolean
}>()

const emit = defineEmits<{
  close: []
}>()

const searchInput = ref<HTMLInputElement>()
const { searchQuery, searchResults, isSearching, searchPosts, clearSearch: clearSearchState } = useSearch()

// 防抖搜索
let searchTimeout: NodeJS.Timeout
const handleSearch = () => {
  clearTimeout(searchTimeout)
  searchTimeout = setTimeout(() => {
    searchPosts(searchQuery.value)
  }, 300)
}

// 关闭模态框
const closeModal = () => {
  emit('close')
}

// 清空搜索
const clearSearch = () => {
  clearSearchState()
  searchInput.value?.focus()
}

// 监听打开状态，自动聚焦
watch(() => props.isOpen, (newValue) => {
  if (newValue) {
    nextTick(() => {
      searchInput.value?.focus()
    })
  } else {
    // 关闭时清空搜索
    setTimeout(() => {
      clearSearchState()
    }, 300)
  }
})

// ESC 键关闭
onMounted(() => {
  const handleKeydown = (e: KeyboardEvent) => {
    if (e.key === 'Escape' && props.isOpen) {
      closeModal()
    }
    // Ctrl/Cmd + K 打开搜索
    if ((e.ctrlKey || e.metaKey) && e.key === 'k' && !props.isOpen) {
      e.preventDefault()
      emit('close') // 这里实际是触发父组件打开
    }
  }
  document.addEventListener('keydown', handleKeydown)
  onUnmounted(() => {
    document.removeEventListener('keydown', handleKeydown)
  })
})
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

kbd {
  box-shadow: 0 1px 0 0 rgba(0, 0, 0, 0.1);
}
</style>
