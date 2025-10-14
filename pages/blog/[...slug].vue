<script setup lang="ts">
// 使用 article 布局（不显示 footer）
definePageMeta({
  layout: 'article'
})

const route = useRoute()
const { path } = route

// 获取文章内容
const { data: post } = await useAsyncData(`post-${path}`, () =>
  queryContent(path).findOne()
)

if (!post.value) {
  throw createError({ statusCode: 404, statusMessage: 'Post Not Found' })
}

// 阅读进度
const { progress } = useReadingProgress()

// 浏览量统计
const { getPostViews, incrementViews } = useStats()
const views = ref(0)

onMounted(() => {
  views.value = getPostViews(path)
  incrementViews(path)
})

// 格式化日期
const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

// 代码复制功能
const copyCode = async (code: string) => {
  try {
    await navigator.clipboard.writeText(code)
    alert('代码已复制到剪贴板')
  } catch (err) {
    console.error('复制失败:', err)
  }
}

// 返回博客列表并滚动到顶部
const goBackToBlog = () => {
  navigateTo('/blog')
}

// 文章元数据
useHead({
  title: post.value.title,
  meta: [
    { name: 'description', content: post.value.description },
    { property: 'og:title', content: post.value.title },
    { property: 'og:description', content: post.value.description }
  ]
})
</script>

<template>
  <div v-if="post">
    <!-- 阅读进度条 -->
    <div class="fixed top-16 left-0 right-0 h-1 bg-gray-200 dark:bg-slate-900 z-40">
      <div
        class="h-full bg-gradient-to-r from-primary to-secondary transition-all duration-300"
        :style="{ width: `${progress}%` }"
      />
    </div>

    <article class="py-12">
      <div class="container">
        <div class="max-w-4xl mx-auto">
          <!-- 文章头部 -->
          <header class="mb-12 animate-fade-in-up">
            <div class="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mb-4">
              <NuxtLink to="/blog" class="hover:text-primary transition-colors">
                博客
              </NuxtLink>
              <Icon name="carbon:chevron-right" />
              <span class="badge">{{ post.category }}</span>
            </div>

            <h1 class="text-4xl md:text-5xl font-bold mb-6 leading-tight text-gray-900 dark:text-white">
              {{ post.title }}
            </h1>

            <div class="flex flex-wrap items-center gap-4 text-gray-600 dark:text-gray-400">
              <div class="flex items-center gap-2">
                <Icon name="carbon:calendar" />
                <span>{{ formatDate(post.date) }}</span>
              </div>
              <div class="flex items-center gap-2">
                <Icon name="carbon:user" />
                <span>{{ post.author }}</span>
              </div>
              <div class="flex items-center gap-2">
                <Icon name="carbon:view" />
                <span>{{ views }} 次阅读</span>
              </div>
              <div v-if="post.readingTime" class="flex items-center gap-2">
                <Icon name="carbon:time" />
                <span>{{ post.readingTime }} 分钟</span>
              </div>
            </div>

            <div class="flex flex-wrap gap-2 mt-6">
              <NuxtLink
                v-for="tag in post.tags"
                :key="tag"
                :to="`/blog?tag=${tag}`"
                class="px-3 py-1 text-sm rounded-full bg-gray-100 dark:bg-slate-800 text-gray-600 dark:text-gray-400 hover:bg-primary/20 hover:text-primary transition-all border border-gray-200 dark:border-slate-700 hover:border-primary"
              >
                #{{ tag }}
              </NuxtLink>
            </div>
          </header>

          <!-- 文章内容 -->
          <div class="prose prose-gray dark:prose-invert prose-lg max-w-none mb-12 animate-fade-in-up" style="animation-delay: 0.2s;">
            <ContentRenderer :value="post" />
          </div>

          <!-- 文章底部 -->
          <footer class="border-t border-gray-200 dark:border-slate-800 pt-8 animate-fade-in-up" style="animation-delay: 0.4s;">
            <div class="flex items-center justify-between flex-wrap gap-4">
              <button @click="goBackToBlog" class="btn group">
                <Icon name="carbon:arrow-left" class="mr-2 group-hover:-translate-x-1 transition-transform" />
                返回博客列表
              </button>

              <div class="flex gap-2">
                <button class="btn btn-outline group">
                  <Icon name="carbon:share" class="mr-2 group-hover:scale-110 transition-transform" />
                  分享
                </button>
              </div>
            </div>
          </footer>
        </div>
      </div>
    </article>
  </div>
</template>

<style>
/* 文章内容样式 - 支持亮色和暗色主题 */
.prose {
  @apply text-gray-700 dark:text-gray-300;
}

/* 标题样式 */
.prose h1,
.prose h2,
.prose h3,
.prose h4,
.prose h5,
.prose h6 {
  @apply text-gray-900 dark:text-white font-bold mt-8 mb-4 scroll-mt-20;
}

.prose h2 {
  @apply text-3xl border-b-2 border-gray-200 dark:border-slate-800 pb-3;
}

.prose h3 {
  @apply text-2xl;
}

.prose h4 {
  @apply text-xl;
}

/* 链接样式 */
.prose a {
  @apply text-primary hover:text-secondary no-underline transition-colors duration-300;
  @apply border-b-2 border-primary/30 hover:border-primary;
}

/* 行内代码 */
.prose code {
  @apply text-primary bg-gray-100 dark:bg-slate-800 px-2 py-1 rounded text-sm;
  font-family: 'Fira Code', 'Consolas', monospace;
}

/* 代码块 */
.prose pre {
  @apply bg-gray-50 dark:bg-slate-900 border border-gray-200 dark:border-slate-800;
  @apply rounded-lg p-6 overflow-x-auto my-6 relative;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
}

.prose pre code {
  @apply bg-transparent p-0 text-sm leading-relaxed;
  @apply text-gray-800 dark:text-gray-200;
}

/* 引用块 */
.prose blockquote {
  @apply border-l-4 border-primary pl-6 pr-4 py-4 my-6;
  @apply bg-gray-50 dark:bg-slate-900 rounded-r-lg;
  @apply text-gray-600 dark:text-gray-400 italic;
}

.prose blockquote p {
  @apply m-0;
}

/* 列表 */
.prose ul,
.prose ol {
  @apply pl-6 my-4 space-y-2;
}

.prose li {
  @apply text-gray-700 dark:text-gray-300;
}

.prose li::marker {
  @apply text-primary;
}

/* 图片 */
.prose img {
  @apply rounded-lg my-6 w-full h-auto;
  @apply shadow-lg;
}

/* 表格 */
.prose table {
  @apply w-full border-collapse my-6;
  @apply border border-gray-200 dark:border-slate-800 rounded-lg overflow-hidden;
}

.prose th {
  @apply bg-gray-100 dark:bg-slate-800 text-gray-900 dark:text-white;
  @apply font-semibold px-4 py-3 text-left;
  @apply border-b-2 border-gray-200 dark:border-slate-700;
}

.prose td {
  @apply px-4 py-3 border-b border-gray-200 dark:border-slate-800;
  @apply text-gray-700 dark:text-gray-300;
}

.prose tr:last-child td {
  @apply border-b-0;
}

.prose tr:hover {
  @apply bg-gray-50 dark:bg-slate-900/50;
}

/* 分隔线 */
.prose hr {
  @apply border-0 border-t-2 border-gray-200 dark:border-slate-800 my-8;
}

/* 强调文本 */
.prose strong {
  @apply text-gray-900 dark:text-white font-bold;
}

.prose em {
  @apply text-gray-600 dark:text-gray-400 italic;
}

/* 段落 */
.prose p {
  @apply my-4 leading-relaxed;
}

/* 代码块语言标签 */
.prose pre[class*="language-"]::before {
  content: attr(data-language);
  @apply absolute top-2 right-2 text-xs px-2 py-1 rounded;
  @apply bg-gray-200 dark:bg-slate-700 text-gray-600 dark:text-gray-400;
  text-transform: uppercase;
}
</style>
