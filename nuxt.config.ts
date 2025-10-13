// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: false },

  modules: [
    '@nuxt/content',
    '@unocss/nuxt',
    '@vueuse/nuxt',
    '@nuxt/icon'
  ],

  css: ['@unocss/reset/tailwind.css'],

  content: {
    highlight: {
      theme: {
        default: 'github-dark',
        dark: 'github-dark',
        light: 'github-light'
      },
      preload: ['typescript', 'javascript', 'vue', 'bash', 'json', 'css', 'html', 'python', 'java', 'go', 'rust']
    },
    markdown: {
      toc: {
        depth: 3,
        searchDepth: 3
      }
    }
  },

  app: {
    head: {
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
      title: 'Mindlog - 思维日志',
      meta: [
        { name: 'description', content: 'Mindlog - 记录思维轨迹，分享编程技术、项目经验和技术思考' }
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
      ]
    },
    pageTransition: { name: 'page', mode: 'out-in' }
  },

  typescript: {
    strict: true,
    typeCheck: false
  }
})
