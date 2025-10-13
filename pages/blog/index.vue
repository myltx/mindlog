<script setup lang="ts">
import type { Post } from '~/types'

const route = useRoute()

// 筛选条件
const selectedCategory = ref<string>('')
const selectedTag = ref<string>('')
const currentPage = ref(1)
const postsPerPage = 9

// 从URL获取筛选条件
watchEffect(() => {
  selectedCategory.value = route.query.category as string || ''
  selectedTag.value = route.query.tag as string || ''
})

// 获取所有文章
const { data: allPosts } = await useAsyncData('blog-posts', () =>
  queryContent<Post>('/blog')
    .sort({ date: -1 })
    .find()
)

// 获取所有分类
const categories = computed(() => {
  const cats = new Set<string>()
  allPosts.value?.forEach(post => {
    if (post.category) cats.add(post.category)
  })
  return Array.from(cats).sort()
})

// 获取所有标签
const tags = computed(() => {
  const tagSet = new Set<string>()
  allPosts.value?.forEach(post => {
    post.tags?.forEach(tag => tagSet.add(tag))
  })
  return Array.from(tagSet).sort()
})

// 筛选后的文章
const filteredPosts = computed(() => {
  let posts = allPosts.value || []

  if (selectedCategory.value) {
    posts = posts.filter(post => post.category === selectedCategory.value)
  }

  if (selectedTag.value) {
    posts = posts.filter(post => post.tags?.includes(selectedTag.value))
  }

  return posts
})

// 分页后的文章
const paginatedPosts = computed(() => {
  const start = (currentPage.value - 1) * postsPerPage
  const end = start + postsPerPage
  return filteredPosts.value.slice(start, end)
})

// 总页数
const totalPages = computed(() => {
  return Math.ceil(filteredPosts.value.length / postsPerPage)
})

// 格式化日期
const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

// 切换分类筛选
const toggleCategory = (category: string) => {
  if (selectedCategory.value === category) {
    selectedCategory.value = ''
    navigateTo('/blog')
  } else {
    selectedCategory.value = category
    navigateTo(`/blog?category=${category}`)
  }
  currentPage.value = 1
}

// 切换标签筛选
const toggleTag = (tag: string) => {
  if (selectedTag.value === tag) {
    selectedTag.value = ''
    navigateTo('/blog')
  } else {
    selectedTag.value = tag
    navigateTo(`/blog?tag=${tag}`)
  }
  currentPage.value = 1
}

// 清除筛选
const clearFilters = () => {
  selectedCategory.value = ''
  selectedTag.value = ''
  currentPage.value = 1
  navigateTo('/blog')
}
</script>

<template>
  <div class="py-12">
    <div class="container">
      <!-- 标题 -->
      <div class="text-center mb-12">
        <h1 class="text-4xl md:text-5xl font-bold mb-4">
          <Icon name="carbon:blog" class="inline-block text-primary mr-2" />
          技术博客
        </h1>
        <p class="text-gray-400 text-lg">共 {{ filteredPosts.length }} 篇文章</p>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <!-- 侧边栏筛选 -->
        <aside class="lg:col-span-1">
          <div class="card sticky top-20">
            <!-- 分类筛选 -->
            <div class="mb-6">
              <h3 class="text-lg font-bold mb-3 flex items-center">
                <Icon name="carbon:category" class="mr-2 text-primary" />
                分类
              </h3>
              <div class="space-y-2">
                <button
                  v-for="category in categories"
                  :key="category"
                  @click="toggleCategory(category)"
                  class="w-full text-left px-3 py-2 rounded-lg transition-all"
                  :class="
                    selectedCategory === category
                      ? 'bg-primary/20 text-primary'
                      : 'text-gray-400 hover:bg-gray-800 hover:text-white'
                  "
                >
                  {{ category }}
                </button>
              </div>
            </div>

            <!-- 标签筛选 -->
            <div>
              <h3 class="text-lg font-bold mb-3 flex items-center">
                <Icon name="carbon:tag" class="mr-2 text-primary" />
                标签
              </h3>
              <div class="flex flex-wrap gap-2">
                <button
                  v-for="tag in tags"
                  :key="tag"
                  @click="toggleTag(tag)"
                  class="px-3 py-1 text-sm rounded-full transition-all"
                  :class="
                    selectedTag === tag
                      ? 'bg-primary/20 text-primary border border-primary'
                      : 'bg-gray-800 text-gray-400 border border-gray-700 hover:border-primary hover:text-primary'
                  "
                >
                  #{{ tag }}
                </button>
              </div>
            </div>

            <!-- 清除筛选 -->
            <button
              v-if="selectedCategory || selectedTag"
              @click="clearFilters"
              class="w-full mt-6 btn btn-sm bg-gray-700 hover:bg-gray-600"
            >
              <Icon name="carbon:close" class="mr-1" />
              清除筛选
            </button>
          </div>
        </aside>

        <!-- 文章列表 -->
        <div class="lg:col-span-3">
          <!-- 当前筛选条件 -->
          <div v-if="selectedCategory || selectedTag" class="mb-6 p-4 bg-dark-900 rounded-lg">
            <div class="flex items-center flex-wrap gap-2">
              <span class="text-gray-400">当前筛选:</span>
              <span v-if="selectedCategory" class="badge bg-primary/20 text-primary">
                分类: {{ selectedCategory }}
              </span>
              <span v-if="selectedTag" class="badge bg-secondary/20 text-secondary">
                标签: #{{ selectedTag }}
              </span>
            </div>
          </div>

          <!-- 文章网格 -->
          <div v-if="paginatedPosts.length > 0" class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <NuxtLink
              v-for="post in paginatedPosts"
              :key="post._path"
              :to="post._path"
              class="card group cursor-pointer h-full flex flex-col"
            >
              <div class="flex-1">
                <div class="flex items-center justify-between text-sm text-gray-500 mb-2">
                  <span>{{ formatDate(post.date) }}</span>
                  <span class="badge">{{ post.category }}</span>
                </div>
                <h3 class="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
                  {{ post.title }}
                </h3>
                <p class="text-gray-400 text-sm mb-4 line-clamp-3">
                  {{ post.description }}
                </p>
              </div>
              <div class="flex flex-wrap gap-2 mt-auto">
                <span
                  v-for="tag in post.tags?.slice(0, 3)"
                  :key="tag"
                  class="text-xs px-2 py-1 rounded bg-gray-800 text-gray-400"
                >
                  #{{ tag }}
                </span>
              </div>
            </NuxtLink>
          </div>

          <!-- 空状态 -->
          <div v-else class="text-center py-20">
            <Icon name="carbon:document-blank" class="text-6xl text-gray-600 mb-4" />
            <p class="text-gray-400 text-lg">暂无文章</p>
          </div>

          <!-- 分页 -->
          <div v-if="totalPages > 1" class="flex justify-center gap-2">
            <button
              @click="currentPage--"
              :disabled="currentPage === 1"
              class="btn btn-sm"
              :class="{ 'opacity-50 cursor-not-allowed': currentPage === 1 }"
            >
              <Icon name="carbon:chevron-left" />
            </button>
            <button
              v-for="page in totalPages"
              :key="page"
              @click="currentPage = page"
              class="btn btn-sm"
              :class="{ 'bg-primary text-dark': currentPage === page }"
            >
              {{ page }}
            </button>
            <button
              @click="currentPage++"
              :disabled="currentPage === totalPages"
              class="btn btn-sm"
              :class="{ 'opacity-50 cursor-not-allowed': currentPage === totalPages }"
            >
              <Icon name="carbon:chevron-right" />
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
