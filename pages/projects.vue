<script setup lang="ts">
import type { Project } from '~/types'

const projects: Project[] = [
  {
    title: '极客博客系统',
    description: '基于Nuxt.js + TypeScript + UnoCSS构建的现代化博客系统，支持Markdown写作、代码高亮、全文搜索等功能',
    image: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=800&h=600&fit=crop',
    tech: ['Nuxt.js', 'TypeScript', 'UnoCSS', 'Nuxt Content'],
    github: 'https://github.com',
    demo: 'https://example.com',
    featured: true
  },
  {
    title: '实时聊天应用',
    description: '基于WebSocket的实时聊天应用，支持私聊、群聊、文件传输、消息通知等功能',
    image: 'https://images.unsplash.com/photo-1611606063065-ee7946f0787a?w=800&h=600&fit=crop',
    tech: ['Vue.js', 'Node.js', 'Socket.io', 'MongoDB'],
    github: 'https://github.com',
    demo: 'https://example.com',
    featured: true
  },
  {
    title: '任务管理系统',
    description: '团队协作任务管理工具，支持看板视图、甘特图、时间追踪、团队协作等功能',
    image: 'https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=800&h=600&fit=crop',
    tech: ['React', 'TypeScript', 'Tailwind CSS', 'Nest.js'],
    github: 'https://github.com',
    featured: true
  },
  {
    title: '数据可视化平台',
    description: '企业级数据可视化平台，支持多种图表类型、实时数据更新、自定义仪表盘',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop',
    tech: ['Vue.js', 'ECharts', 'D3.js', 'Python'],
    github: 'https://github.com',
    featured: false
  },
  {
    title: '电商管理后台',
    description: '功能完善的电商管理后台系统，包含商品管理、订单处理、用户管理、数据统计等模块',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop',
    tech: ['React', 'Ant Design', 'Express', 'PostgreSQL'],
    github: 'https://github.com',
    featured: false
  },
  {
    title: 'AI 写作助手',
    description: '基于AI的智能写作辅助工具，支持文章续写、语法检查、内容优化等功能',
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=600&fit=crop',
    tech: ['Next.js', 'OpenAI API', 'TypeScript', 'Vercel'],
    github: 'https://github.com',
    demo: 'https://example.com',
    featured: true
  }
]

const featuredProjects = computed(() => projects.filter(p => p.featured))
const otherProjects = computed(() => projects.filter(p => !p.featured))
</script>

<template>
  <div class="py-12">
    <div class="container">
      <!-- 标题 -->
      <div class="text-center mb-16">
        <h1 class="text-4xl md:text-5xl font-bold mb-4">
          <Icon name="carbon:code" class="inline-block text-primary mr-2" />
          我的项目
        </h1>
        <p class="text-gray-400 text-lg">这里展示了我的一些个人项目和作品</p>
      </div>

      <!-- 精选项目 -->
      <section class="mb-16">
        <h2 class="text-2xl font-bold mb-8 flex items-center">
          <Icon name="carbon:star-filled" class="text-yellow-500 mr-2" />
          精选项目
        </h2>

        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div
            v-for="project in featuredProjects"
            :key="project.title"
            class="card group overflow-hidden"
          >
            <!-- 项目图片 -->
            <div class="relative h-48 mb-4 -mt-6 -mx-6 overflow-hidden">
              <img
                :src="project.image"
                :alt="project.title"
                class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div class="absolute inset-0 bg-gradient-to-t from-dark-950 to-transparent opacity-60" />
            </div>

            <!-- 项目信息 -->
            <div>
              <h3 class="text-2xl font-bold mb-3 group-hover:text-primary transition-colors">
                {{ project.title }}
              </h3>
              <p class="text-gray-400 mb-4 leading-relaxed">
                {{ project.description }}
              </p>

              <!-- 技术栈 -->
              <div class="flex flex-wrap gap-2 mb-4">
                <span
                  v-for="tech in project.tech"
                  :key="tech"
                  class="px-3 py-1 text-xs rounded-full bg-dark-800 text-gray-400 border border-gray-700"
                >
                  {{ tech }}
                </span>
              </div>

              <!-- 链接 -->
              <div class="flex gap-3">
                <a
                  v-if="project.github"
                  :href="project.github"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="btn btn-sm"
                >
                  <Icon name="mdi:github" class="mr-1" />
                  代码
                </a>
                <a
                  v-if="project.demo"
                  :href="project.demo"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="btn btn-sm bg-gray-700 hover:bg-gray-600"
                >
                  <Icon name="carbon:launch" class="mr-1" />
                  演示
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 其他项目 -->
      <section>
        <h2 class="text-2xl font-bold mb-8 flex items-center">
          <Icon name="carbon:folder" class="text-primary mr-2" />
          其他项目
        </h2>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div
            v-for="project in otherProjects"
            :key="project.title"
            class="card group"
          >
            <div class="flex items-start justify-between mb-3">
              <Icon name="carbon:folder" class="text-3xl text-primary" />
              <div class="flex gap-2">
                <a
                  v-if="project.github"
                  :href="project.github"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="text-gray-400 hover:text-primary transition-colors"
                >
                  <Icon name="mdi:github" class="text-xl" />
                </a>
                <a
                  v-if="project.demo"
                  :href="project.demo"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="text-gray-400 hover:text-primary transition-colors"
                >
                  <Icon name="carbon:launch" class="text-xl" />
                </a>
              </div>
            </div>

            <h3 class="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
              {{ project.title }}
            </h3>
            <p class="text-gray-400 text-sm mb-4 flex-grow">
              {{ project.description }}
            </p>

            <div class="flex flex-wrap gap-2">
              <span
                v-for="tech in project.tech.slice(0, 3)"
                :key="tech"
                class="text-xs text-gray-500"
              >
                {{ tech }}
              </span>
            </div>
          </div>
        </div>
      </section>

      <!-- CTA -->
      <section class="mt-20">
        <div class="card text-center max-w-2xl mx-auto bg-gradient-to-r from-primary/10 to-secondary/10 border-primary/20">
          <Icon name="carbon:collaborate" class="text-5xl text-primary mb-4" />
          <h2 class="text-2xl font-bold mb-4">有项目想要合作？</h2>
          <p class="text-gray-400 mb-6">
            如果你有有趣的项目想法或者需要技术支持，欢迎随时联系我
          </p>
          <NuxtLink to="/about" class="btn btn-lg">
            <Icon name="carbon:email" class="mr-2" />
            联系我
          </NuxtLink>
        </div>
      </section>
    </div>
  </div>
</template>
