<script setup lang="ts">
const currentYear = new Date().getFullYear();
const route = useRoute();

const socialLinks = [
  { name: "GitHub", icon: "mdi:github", url: "https://github.com/myltx" },
  { name: "Twitter", icon: "mdi:twitter", url: "https://x.com/@myl_tx" },
  { name: "Email", icon: "mdi:email", url: "mailto:865147643@qq.com" },
];

const footerLinks = [
  { label: "首页", to: "/" },
  { label: "博客", to: "/blog" },
  { label: "项目", to: "/projects" },
  { label: "关于", to: "/about" },
];

// 判断是否为当前页面
const isActive = (path: string) => {
  if (path === "/") {
    return route.path === "/";
  }
  return route.path.startsWith(path);
};
</script>

<template>
  <footer
    class="backdrop-blur-xl bg-white/80 dark:bg-slate-950/80 border-t border-gray-200 dark:border-white/10 mt-20 relative overflow-hidden transition-colors duration-500">
    <!-- 背景装饰 -->
    <div class="absolute inset-0 pointer-events-none">
      <div
        class="absolute top-0 right-1/4 w-96 h-96 bg-primary/10 dark:bg-primary/5 rounded-full blur-3xl" />
    </div>

    <div class="container py-12 relative z-10">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <!-- Logo 和简介 -->
        <div class="space-y-4 animate-fade-in-up">
          <div class="flex items-center space-x-3">
            <div
              class="w-10 h-10 bg-gradient-to-br from-primary via-secondary to-accent rounded-xl flex items-center justify-center shadow-lg shadow-primary/30">
              <span class="text-white font-bold text-xl">&lt;/&gt;</span>
            </div>
            <span class="text-xl font-bold text-gray-900 dark:text-white"
              >Mind<span class="gradient-text">log</span></span
            >
          </div>
          <p class="text-gray-600 dark:text-gray-400 text-sm">
            记录思维轨迹 · 分享编程技术 · 探索技术思考
          </p>
        </div>

        <!-- 快速链接 -->
        <div class="space-y-4 animate-fade-in-up" style="animation-delay: 0.1s">
          <h3 class="text-gray-900 dark:text-white font-semibold text-lg">
            快速链接
          </h3>
          <div class="flex flex-wrap items-center gap-x-6 gap-y-2">
            <NuxtLink
              v-for="link in footerLinks"
              :key="link.to"
              :to="link.to"
              class="relative text-sm transition-all duration-300 group"
              :class="
                isActive(link.to)
                  ? 'text-primary font-medium'
                  : 'text-gray-600 dark:text-gray-400 hover:text-primary'
              ">
              {{ link.label }}
              <!-- 悬停/激活下划线 -->
              <span
                class="absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-primary to-secondary rounded-full transition-all duration-300"
                :class="
                  isActive(link.to) ? 'w-full' : 'w-0 group-hover:w-full'
                " />
            </NuxtLink>
          </div>
        </div>

        <!-- 社交媒体 -->
        <div class="space-y-4 animate-fade-in-up" style="animation-delay: 0.2s">
          <h3 class="text-gray-900 dark:text-white font-semibold text-lg">
            关注我
          </h3>
          <div class="flex space-x-3">
            <a
              v-for="social in socialLinks"
              :key="social.name"
              :href="social.url"
              target="_blank"
              rel="noopener noreferrer"
              class="w-10 h-10 rounded-xl backdrop-blur-sm bg-gray-100 dark:bg-slate-800/50 hover:bg-gradient-to-br hover:from-primary/20 hover:to-secondary/20 flex items-center justify-center text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-white transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-primary/30 border border-gray-200 dark:border-slate-700 hover:border-primary"
              :aria-label="social.name">
              <Icon :name="social.icon" class="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>

      <!-- 版权信息 -->
      <div
        class="mt-8 pt-8 border-t border-gray-200 dark:border-white/10 text-center text-gray-500 dark:text-gray-500 text-sm">
        <p>&copy; {{ currentYear }} Mindlog. All rights reserved.</p>
        <p class="mt-2">
          Built with <span class="text-primary">Nuxt.js</span> +
          <span class="text-secondary">TypeScript</span> +
          <span class="text-accent">UnoCSS</span>
        </p>
      </div>
    </div>
  </footer>
</template>
