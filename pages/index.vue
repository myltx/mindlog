<script setup lang="ts">
import type { Post } from '~/types'

// 获取最新文章
const { data: recentPosts } = await useAsyncData('recent-posts', () =>
  queryContent<Post>('/blog')
    .sort({ date: -1 })
    .limit(6)
    .find()
)

// 获取所有标签
const { data: allPosts } = await useAsyncData('all-posts', () =>
  queryContent<Post>('/blog').find()
)

// 提取所有标签并计算频率
const tags = computed(() => {
  const tagMap = new Map<string, number>()

  allPosts.value?.forEach(post => {
    post.tags?.forEach(tag => {
      tagMap.set(tag, (tagMap.get(tag) || 0) + 1)
    })
  })

  return Array.from(tagMap.entries())
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 20)
})

// 格式化日期
const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

// 统计数据
const { stats, loadStats } = useStats()

onMounted(() => {
  loadStats()
})
</script>

<template>
  <div>
    <!-- Hero 区域 -->
    <section class="relative py-20 md:py-32 overflow-hidden">
      <!-- 背景装饰 -->
      <div class="absolute inset-0 overflow-hidden pointer-events-none">
        <div class="absolute -top-40 -right-40 w-80 h-80 bg-primary/20 rounded-full blur-3xl animate-pulse-slow" />
        <div class="absolute top-60 -left-40 w-96 h-96 bg-secondary/20 rounded-full blur-3xl animate-pulse-slow" style="animation-delay: 1s;" />
      </div>

      <div class="container relative z-10">
        <div class="max-w-4xl mx-auto text-center">
          <h1 class="text-4xl md:text-6xl font-bold mb-6 leading-tight animate-fade-in-up">
            欢迎来到
            <span class="text-transparent bg-clip-text bg-gradient-to-r from-primary via-secondary to-accent animate-glow">
              Mindlog
            </span>
          </h1>
          <p class="text-xl text-gray-600 dark:text-gray-400 mb-8 animate-fade-in-up" style="animation-delay: 0.2s;">
            记录思维轨迹 · 分享编程技术 · 探索技术思考
          </p>
          <div class="flex flex-wrap justify-center gap-4 animate-fade-in-up" style="animation-delay: 0.4s;">
            <NuxtLink to="/blog" class="btn btn-lg group">
              <Icon name="carbon:blog" class="mr-2 group-hover:animate-bounce-slow" />
              浏览博客
            </NuxtLink>
            <NuxtLink to="/about" class="btn btn-lg btn-outline group">
              <Icon name="carbon:user" class="mr-2 group-hover:animate-bounce-slow" />
              关于我
            </NuxtLink>
          </div>
        </div>
      </div>
    </section>

    <!-- 统计数据 -->
    <section class="py-12 backdrop-blur-sm bg-gray-50 dark:bg-slate-900/30">
      <div class="container">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div class="card text-center group hover:shadow-primary/20 animate-fade-in-up" style="animation-delay: 0.1s;">
            <div class="text-4xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-2 group-hover:scale-110 transition-transform duration-300">{{ stats.totalPosts }}</div>
            <div class="text-gray-600 dark:text-gray-400">文章数量</div>
          </div>
          <div class="card text-center group hover:shadow-secondary/20 animate-fade-in-up" style="animation-delay: 0.2s;">
            <div class="text-4xl font-bold bg-gradient-to-r from-secondary to-accent bg-clip-text text-transparent mb-2 group-hover:scale-110 transition-transform duration-300">{{ stats.totalViews }}</div>
            <div class="text-gray-600 dark:text-gray-400">总浏览量</div>
          </div>
          <div class="card text-center group hover:shadow-accent/20 animate-fade-in-up" style="animation-delay: 0.3s;">
            <div class="text-4xl font-bold bg-gradient-to-r from-accent to-primary bg-clip-text text-transparent mb-2 group-hover:scale-110 transition-transform duration-300">{{ stats.totalVisitors }}</div>
            <div class="text-gray-600 dark:text-gray-400">访客数量</div>
          </div>
        </div>
      </div>
    </section>

    <!-- 最新文章 -->
    <section class="py-16">
      <div class="container">
        <div class="flex items-center justify-between mb-8 animate-fade-in-up">
          <h2 class="text-3xl font-bold">
            <Icon name="carbon:recently-viewed" class="inline-block text-primary mr-2" />
            最新文章
          </h2>
          <NuxtLink to="/blog" class="link group">
            查看全部 <Icon name="carbon:arrow-right" class="inline-block group-hover:translate-x-1 transition-transform" />
          </NuxtLink>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <NuxtLink
            v-for="(post, index) in recentPosts"
            :key="post._path"
            :to="post._path"
            class="card group cursor-pointer animate-fade-in-up hover:shadow-primary/20 border border-white/5"
            :style="{ animationDelay: `${0.1 * index}s` }"
          >
            <div class="mb-4">
              <div class="flex items-center justify-between text-sm text-gray-500 dark:text-gray-500 mb-2">
                <span>{{ formatDate(post.date) }}</span>
                <span class="badge">{{ post.category }}</span>
              </div>
              <h3 class="text-xl font-bold mb-2 text-gray-900 dark:text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-primary group-hover:to-secondary transition-all duration-300">
                {{ post.title }}
              </h3>
              <p class="text-gray-600 dark:text-gray-400 text-sm line-clamp-2">
                {{ post.description }}
              </p>
            </div>
            <div class="flex flex-wrap gap-2">
              <span
                v-for="tag in post.tags?.slice(0, 3)"
                :key="tag"
                class="text-xs px-2 py-1 rounded bg-gray-100 dark:bg-slate-800 text-gray-600 dark:text-gray-400 group-hover:bg-primary/20 group-hover:text-primary transition-all duration-300"
              >
                #{{ tag }}
              </span>
            </div>
          </NuxtLink>
        </div>
      </div>
    </section>

    <!-- 技术标签云 -->
    <section class="py-16 backdrop-blur-sm bg-gray-50 dark:bg-slate-900/30">
      <div class="container">
        <h2 class="text-3xl font-bold mb-8 text-center animate-fade-in-up text-gray-900 dark:text-white">
          <Icon name="carbon:tag" class="inline-block text-primary mr-2" />
          技术标签
        </h2>
        <div class="flex flex-wrap justify-center gap-3 max-w-4xl mx-auto animate-fade-in-up" style="animation-delay: 0.2s;">
          <NuxtLink
            v-for="tag in tags"
            :key="tag.name"
            :to="`/blog?tag=${tag.name}`"
            class="px-4 py-2 rounded-full backdrop-blur-sm bg-gray-100 dark:bg-slate-800/50 hover:bg-gradient-to-r hover:from-primary/20 hover:to-secondary/20 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-all duration-300 border border-gray-200 dark:border-slate-700 hover:border-primary hover:scale-105 hover:shadow-lg hover:shadow-primary/30"
            :style="{ fontSize: `${Math.min(1.2, 0.8 + tag.count * 0.1)}rem` }"
          >
            #{{ tag.name }}
            <span class="ml-1 text-xs opacity-60">{{ tag.count }}</span>
          </NuxtLink>
        </div>
      </div>
    </section>

    <!-- 个人简介卡片 -->
    <section class="py-16">
      <div class="container">
        <div class="card max-w-4xl mx-auto border border-white/5 hover:border-primary/30 animate-fade-in-up hover:shadow-2xl hover:shadow-primary/20">
          <div class="flex flex-col md:flex-row items-center gap-8">
            <div class="w-32 h-32 rounded-full bg-gradient-to-br from-primary via-secondary to-accent flex items-center justify-center text-5xl shadow-xl shadow-primary/30 animate-float">
              👨‍💻
            </div>
            <div class="flex-1 text-center md:text-left">
              <h3 class="text-2xl font-bold mb-2 gradient-text">关于我</h3>
              <p class="text-gray-600 dark:text-gray-400 mb-4">
                全栈开发工程师 | 技术爱好者 | 开源贡献者
              </p>
              <p class="text-gray-600 dark:text-gray-400 mb-4">
                热爱编程，喜欢探索新技术，致力于编写优雅、高效的代码。
                在这里分享我的技术心得、项目经验和对技术的思考。
              </p>
              <NuxtLink to="/about" class="btn group">
                了解更多 <Icon name="carbon:arrow-right" class="inline-block ml-1 group-hover:translate-x-1 transition-transform" />
              </NuxtLink>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
