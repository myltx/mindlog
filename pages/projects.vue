<script setup lang="ts">
import type { Project } from "~/types";

const projects: Project[] = [
  {
    title: "极客博客系统",
    description:
      "基于Nuxt.js + TypeScript + UnoCSS构建的现代化博客系统，支持Markdown写作、代码高亮、全文搜索等功能",
    url: "https://mindlog.myltx.top",
    tech: ["Nuxt.js", "TypeScript", "UnoCSS", "Nuxt Content"],
    github: "https://github.com/mindLog",
    demo: "https://mindlog.myltx.top",
    previewImage: "/projects/default-preview.svg",
    featured: true,
  },
  {
    title: "Dream-hub",
    description:
      "基于Nuxt.js + TypeScript + UnoCSS构建的现代化博客系统，支持Markdown写作、代码高亮、全文搜索等功能",
    url: "https://dream-hub.myltx.top/",
    tech: ["Nuxt.js", "TypeScript", "UnoCSS", "Nuxt Content"],
    github: "https://github.com/mindLog",
    demo: "https://mindlog.myltx.top",
    previewImage: "/projects/default-preview.svg",
    featured: true,
  },
  {
    title: "实时聊天应用",
    description:
      "基于WebSocket的实时聊天应用，支持私聊、群聊、文件传输、消息通知等功能",
    url: "https://socket.io",
    tech: ["Vue.js", "Node.js", "Socket.io", "MongoDB"],
    github: "https://github.com",
    demo: "https://socket.io",
    previewImage: "/projects/default-preview.svg",
    featured: true,
  },
  {
    title: "任务管理系统",
    description:
      "团队协作任务管理工具，支持看板视图、甘特图、时间追踪、团队协作等功能",
    url: "https://github.com",
    tech: ["React", "TypeScript", "Tailwind CSS", "Nest.js"],
    github: "https://github.com",
    previewImage: "/projects/default-preview.svg",
    featured: true,
  },
  {
    title: "数据可视化平台",
    description:
      "企业级数据可视化平台，支持多种图表类型、实时数据更新、自定义仪表盘",
    url: "https://echarts.apache.org",
    tech: ["Vue.js", "ECharts", "D3.js", "Python"],
    github: "https://github.com",
    previewImage: "/projects/default-preview.svg",
    featured: false,
  },
  {
    title: "电商管理后台",
    description:
      "功能完善的电商管理后台系统，包含商品管理、订单处理、用户管理、数据统计等模块",
    url: "https://ant.design",
    tech: ["React", "Ant Design", "Express", "PostgreSQL"],
    github: "https://github.com",
    previewImage: "/projects/default-preview.svg",
    featured: false,
  },
  {
    title: "AI 写作助手",
    description:
      "基于AI的智能写作辅助工具，支持文章续写、语法检查、内容优化等功能",
    url: "https://vercel.com",
    tech: ["Next.js", "OpenAI API", "TypeScript", "Vercel"],
    github: "https://github.com",
    demo: "https://vercel.com",
    previewImage: "/projects/default-preview.svg",
    featured: true,
  },
];

// 使用 iframe 模式还是截图模式（默认进入截图模式降低首屏压力）
const useIframeMode = ref(false);

// 截图服务备用方案（作为 iframe 失败时的后备）
const screenshotServices = [
  (url: string) => `https://image.thum.io/get/width/1200/crop/800/maxAge/1/noanimate/${url}`,
  (url: string) => `https://api.site-shot.com/?url=${encodeURIComponent(url)}&width=1200&height=800&format=jpeg`,
];

// 跟踪 iframe 加载失败的项目
const iframeFailedProjects = ref<Set<string>>(new Set());

// 记录进入可视区域的项目，延迟加载 iframe
const visibleProjects = ref<Set<string>>(new Set());
const projectObservers = new Map<string, IntersectionObserver>();

// 本地预览图兜底状态
const localPreviewFailures = new Set<string>();

// iframe 加载超时控制
const iframeWatchdogs = new Map<string, number>();
const WATCHDOG_TIMEOUT = 5000;

// 跟踪截图服务索引
const projectServiceIndex = ref<Record<string, number>>({});

const clearIframeWatchdog = (projectTitle: string) => {
  if (process.server) return;
  const timer = iframeWatchdogs.get(projectTitle);
  if (timer) {
    window.clearTimeout(timer);
    iframeWatchdogs.delete(projectTitle);
  }
};

const startIframeWatchdog = (projectTitle: string) => {
  if (process.server) return;
  clearIframeWatchdog(projectTitle);
  iframeWatchdogs.set(
    projectTitle,
    window.setTimeout(() => handleIframeError(projectTitle), WATCHDOG_TIMEOUT),
  );
};

// 生成截图URL
const getScreenshotUrl = (url: string, projectTitle?: string) => {
  const key = projectTitle || url;
  const serviceIndex = projectServiceIndex.value[key] || 0;
  return screenshotServices[serviceIndex](url);
};

const getPreviewImage = (project: Project) => {
  if (project.previewImage && !localPreviewFailures.has(project.title)) {
    return project.previewImage;
  }
  return getScreenshotUrl(project.url, project.title);
};

// 处理 iframe 加载失败
const handleIframeError = (projectTitle: string) => {
  const next = new Set(iframeFailedProjects.value);
  next.add(projectTitle);
  iframeFailedProjects.value = next;
  clearIframeWatchdog(projectTitle);
};

const handleIframeLoad = (projectTitle: string) => {
  clearIframeWatchdog(projectTitle);
};

// 判断是否应该使用 iframe
const shouldUseIframe = (projectTitle: string) => {
  return (
    useIframeMode.value &&
    visibleProjects.value.has(projectTitle) &&
    !iframeFailedProjects.value.has(projectTitle)
  );
};

const markProjectVisible = (projectTitle: string) => {
  if (visibleProjects.value.has(projectTitle)) return;
  const next = new Set(visibleProjects.value);
  next.add(projectTitle);
  visibleProjects.value = next;
};

const registerCardObserver = (el: Element | null, projectTitle: string) => {
  if (process.server) return;
  projectObservers.get(projectTitle)?.disconnect();
  if (!el) {
    projectObservers.delete(projectTitle);
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          markProjectVisible(projectTitle);
          observer.disconnect();
          projectObservers.delete(projectTitle);
        }
      });
    },
    { rootMargin: "200px 0px" },
  );

  observer.observe(el);
  projectObservers.set(projectTitle, observer);
};

const cleanupResources = () => {
  projectObservers.forEach((observer) => observer.disconnect());
  projectObservers.clear();
  if (process.client) {
    iframeWatchdogs.forEach((timer) => window.clearTimeout(timer));
    iframeWatchdogs.clear();
  }
};

const trackIframeLifecycle = (el: HTMLIFrameElement | null, projectTitle: string) => {
  if (process.server) return;
  if (el) {
    startIframeWatchdog(projectTitle);
  } else {
    clearIframeWatchdog(projectTitle);
  }
};

onBeforeUnmount(() => {
  cleanupResources();
});

watch(useIframeMode, (enabled) => {
  if (enabled) {
    iframeFailedProjects.value = new Set();
  } else if (process.client) {
    iframeWatchdogs.forEach((timer) => window.clearTimeout(timer));
    iframeWatchdogs.clear();
  }
});

const handleLocalPreviewError = (projectTitle: string) => {
  localPreviewFailures.add(projectTitle);
};

// 处理截图加载失败，切换到下一个服务
const handleImageError = (e: Event, project: Project) => {
  const img = e.target as HTMLImageElement;
  const key = project.title;

  if (project.previewImage && !localPreviewFailures.has(key)) {
    handleLocalPreviewError(key);
    img.src = getScreenshotUrl(project.url, project.title);
    return;
  }

  const currentIndex = projectServiceIndex.value[key] || 0;

  if (currentIndex < screenshotServices.length - 1) {
    projectServiceIndex.value[key] = currentIndex + 1;
    img.src = getScreenshotUrl(project.url, project.title);
    return;
  }

  if (!img.src.includes("placehold.co")) {
    img.src = `https://placehold.co/1200x800/0a0e27/00ff88?text=${encodeURIComponent(project.title)}`;
  }
};

// 从 URL 中提取域名
const getHostname = (url: string) => {
  try {
    return new URL(url).hostname;
  } catch {
    return url;
  }
};

const featuredProjects = computed(() => projects.filter((p) => p.featured));
const otherProjects = computed(() => projects.filter((p) => !p.featured));
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
        <div class="flex items-center justify-between mb-8 flex-wrap gap-4">
          <h2 class="text-2xl font-bold flex items-center">
            <Icon name="carbon:star-filled" class="text-yellow-500 mr-2" />
            精选项目
          </h2>

          <!-- 显示模式切换 - 与项目风格匹配 -->
          <div class="flex items-center gap-3">
            <span class="text-sm text-gray-500 dark:text-gray-400 hidden sm:inline">预览模式</span>
            <div class="inline-flex items-center gap-2 p-1.5 rounded-xl bg-gray-100 dark:bg-slate-800/60 border border-gray-200/50 dark:border-white/10 shadow-sm">
              <button
                @click="useIframeMode = true"
                :class="[
                  'inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-300',
                  useIframeMode
                    ? 'bg-gradient-to-r from-primary to-primary-600 text-white shadow-md shadow-primary/30'
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 hover:bg-white dark:hover:bg-slate-700/50'
                ]"
                :title="useIframeMode ? '当前：实时预览' : '切换到实时预览'">
                <Icon name="carbon:view" class="text-base" />
                <span class="hidden sm:inline">实时</span>
              </button>
              <button
                @click="useIframeMode = false"
                :class="[
                  'inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-300',
                  !useIframeMode
                    ? 'bg-gradient-to-r from-primary to-primary-600 text-white shadow-md shadow-primary/30'
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 hover:bg-white dark:hover:bg-slate-700/50'
                ]"
                :title="!useIframeMode ? '当前：截图模式' : '切换到截图模式'">
                <Icon name="carbon:image" class="text-base" />
                <span class="hidden sm:inline">截图</span>
              </button>
            </div>
          </div>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div
            v-for="project in featuredProjects"
            :key="project.title"
            class="card group overflow-hidden"
            :ref="(el) => registerCardObserver(el, project.title)">
            <!-- 项目预览 -->
            <div
              class="relative h-48 mb-4 -mt-6 -mx-6 overflow-hidden bg-dark-900">
              <!-- iframe 模式 - 直接嵌入网站 -->
              <iframe
                v-if="shouldUseIframe(project.title)"
                :src="project.url"
                :title="project.title"
                class="w-full h-full border-0 pointer-events-none scale-[0.3] origin-top-left"
                style="width: 400%; height: 400%;"
                loading="lazy"
                sandbox="allow-scripts allow-same-origin"
                :ref="(el) => trackIframeLifecycle(el, project.title)"
                @load="() => handleIframeLoad(project.title)"
                @error="() => handleIframeError(project.title)"
              />

              <!-- 截图模式 - iframe 失败时的后备方案 -->
              <img
                v-else
                :src="getPreviewImage(project)"
                :alt="project.title"
                class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                loading="lazy"
                referrerpolicy="no-referrer"
                crossorigin="anonymous"
                @error="(e) => handleImageError(e, project)" />

              <div
                class="absolute inset-0 bg-gradient-to-t from-dark-950 to-transparent opacity-60 pointer-events-none" />

              <!-- URL 标识 -->
              <div
                class="absolute top-3 right-3 px-3 py-1 rounded-full bg-dark-950/80 backdrop-blur-sm text-xs text-gray-400 flex items-center gap-1 pointer-events-none z-10">
                <Icon name="carbon:link" class="text-primary" />
                {{ getHostname(project.url) }}
              </div>

              <!-- 点击遮罩层 - 跳转到项目 -->
              <a
                :href="project.url"
                target="_blank"
                rel="noopener noreferrer"
                class="absolute inset-0 z-20"
                :aria-label="`访问 ${project.title}`"
              />
            </div>

            <!-- 项目信息 -->
            <div>
              <h3
                class="text-2xl font-bold mb-3 group-hover:text-primary transition-colors">
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
                  class="px-3 py-1 text-xs rounded-full bg-dark-800 text-gray-400 border border-gray-700">
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
                  class="btn btn-sm">
                  <Icon name="mdi:github" class="mr-1" />
                  代码
                </a>
                <a
                  v-if="project.demo"
                  :href="project.demo"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="btn btn-sm bg-gray-700 hover:bg-gray-600">
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
            class="card group">
            <div class="flex items-start justify-between mb-3">
              <Icon name="carbon:folder" class="text-3xl text-primary" />
              <div class="flex gap-2">
                <a
                  v-if="project.github"
                  :href="project.github"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="text-gray-400 hover:text-primary transition-colors">
                  <Icon name="mdi:github" class="text-xl" />
                </a>
                <a
                  v-if="project.demo"
                  :href="project.demo"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="text-gray-400 hover:text-primary transition-colors">
                  <Icon name="carbon:launch" class="text-xl" />
                </a>
              </div>
            </div>

            <h3
              class="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
              {{ project.title }}
            </h3>
            <p class="text-gray-400 text-sm mb-4 flex-grow">
              {{ project.description }}
            </p>

            <div class="flex flex-wrap gap-2">
              <span
                v-for="tech in project.tech.slice(0, 3)"
                :key="tech"
                class="text-xs text-gray-500">
                {{ tech }}
              </span>
            </div>
          </div>
        </div>
      </section>

      <!-- CTA -->
      <section class="mt-20">
        <div
          class="card text-center max-w-2xl mx-auto bg-gradient-to-r from-primary/10 to-secondary/10 border-primary/20">
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
