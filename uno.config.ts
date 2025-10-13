import {
  defineConfig,
  presetAttributify,
  presetIcons,
  presetTypography,
  presetUno,
  presetWebFonts,
  transformerDirectives,
  transformerVariantGroup
} from 'unocss'

export default defineConfig({
  shortcuts: [
    {
      // 按钮样式 - 现代化渐变设计
      'btn': 'px-6 py-3 rounded-xl inline-flex items-center justify-center font-medium bg-gradient-to-r from-primary to-primary-600 text-white cursor-pointer hover:shadow-lg hover:shadow-primary/50 hover:scale-105 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:scale-100 transition-all duration-300',
      'btn-secondary': 'bg-gradient-to-r from-secondary to-secondary-600 hover:shadow-secondary/50',
      'btn-outline': 'bg-transparent border-2 border-primary text-primary hover:bg-primary hover:text-white hover:shadow-lg hover:shadow-primary/30',
      'btn-ghost': 'bg-transparent hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300',
      'btn-sm': 'px-4 py-2 text-sm rounded-lg',
      'btn-lg': 'px-8 py-4 text-lg rounded-2xl',

      // 输入框
      'input': 'px-4 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/20 transition-all duration-200',

      // 卡片 - 更精致的阴影和边框
      'card': 'p-6 rounded-2xl bg-white dark:bg-slate-900/60 backdrop-blur-sm shadow-xl shadow-gray-200/50 dark:shadow-black/30 hover:shadow-2xl hover:shadow-primary/10 dark:hover:shadow-primary/20 hover:scale-[1.02] transition-all duration-300 border border-gray-200/50 dark:border-white/10',
      'card-flat': 'p-6 rounded-2xl bg-white dark:bg-slate-900/60 border border-gray-200 dark:border-white/10',

      // 容器
      'container': 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8',

      // 链接
      'link': 'text-primary hover:text-primary-600 transition-colors duration-200 cursor-pointer underline decoration-primary/30 hover:decoration-primary underline-offset-4',
      'link-subtle': 'text-gray-600 dark:text-gray-400 hover:text-primary transition-colors duration-200',

      // 徽章
      'badge': 'px-3 py-1.5 text-xs font-medium rounded-full bg-gradient-to-r from-primary/10 to-primary/5 text-primary border border-primary/20 backdrop-blur-sm',
      'badge-secondary': 'bg-gradient-to-r from-secondary/10 to-secondary/5 text-secondary border-secondary/20',

      // 渐变文字
      'gradient-text': 'text-transparent bg-clip-text bg-gradient-to-r from-primary via-secondary to-accent',
      'gradient-text-purple': 'text-transparent bg-clip-text bg-gradient-to-r from-purple-500 via-pink-500 to-primary',
    }
  ],
  theme: {
    colors: {
      // 主色调 - 现代紫蓝色系
      primary: {
        DEFAULT: '#6366f1', // Indigo 500
        50: '#eef2ff',
        100: '#e0e7ff',
        200: '#c7d2fe',
        300: '#a5b4fc',
        400: '#818cf8',
        500: '#6366f1',
        600: '#4f46e5',
        700: '#4338ca',
        800: '#3730a3',
        900: '#312e81',
        950: '#1e1b4b',
      },
      // 辅助色 - 青色
      secondary: {
        DEFAULT: '#06b6d4', // Cyan 500
        50: '#ecfeff',
        100: '#cffafe',
        200: '#a5f3fc',
        300: '#67e8f9',
        400: '#22d3ee',
        500: '#06b6d4',
        600: '#0891b2',
        700: '#0e7490',
        800: '#155e75',
        900: '#164e63',
        950: '#083344',
      },
      // 强调色 - 粉紫色
      accent: {
        DEFAULT: '#ec4899', // Pink 500
        50: '#fdf2f8',
        100: '#fce7f3',
        200: '#fbcfe8',
        300: '#f9a8d4',
        400: '#f472b6',
        500: '#ec4899',
        600: '#db2777',
        700: '#be185d',
        800: '#9f1239',
        900: '#831843',
        950: '#500724',
      },
      // 成功色
      success: {
        DEFAULT: '#10b981',
        light: '#34d399',
        dark: '#059669',
      },
      // 警告色
      warning: {
        DEFAULT: '#f59e0b',
        light: '#fbbf24',
        dark: '#d97706',
      },
      // 错误色
      error: {
        DEFAULT: '#ef4444',
        light: '#f87171',
        dark: '#dc2626',
      }
    },
    // 自定义动画
    animation: {
      'fade-in': 'fadeIn 0.5s ease-in-out',
      'fade-in-up': 'fadeInUp 0.6s ease-out',
      'fade-in-down': 'fadeInDown 0.6s ease-out',
      'slide-in-left': 'slideInLeft 0.5s ease-out',
      'slide-in-right': 'slideInRight 0.5s ease-out',
      'bounce-slow': 'bounce 3s infinite',
      'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      'spin-slow': 'spin 3s linear infinite',
      'float': 'float 6s ease-in-out infinite',
      'glow': 'glow 2s ease-in-out infinite alternate',
    },
    keyframes: {
      fadeIn: {
        '0%': { opacity: '0' },
        '100%': { opacity: '1' },
      },
      fadeInUp: {
        '0%': { opacity: '0', transform: 'translateY(20px)' },
        '100%': { opacity: '1', transform: 'translateY(0)' },
      },
      fadeInDown: {
        '0%': { opacity: '0', transform: 'translateY(-20px)' },
        '100%': { opacity: '1', transform: 'translateY(0)' },
      },
      slideInLeft: {
        '0%': { opacity: '0', transform: 'translateX(-20px)' },
        '100%': { opacity: '1', transform: 'translateX(0)' },
      },
      slideInRight: {
        '0%': { opacity: '0', transform: 'translateX(20px)' },
        '100%': { opacity: '1', transform: 'translateX(0)' },
      },
      float: {
        '0%, 100%': { transform: 'translateY(0px)' },
        '50%': { transform: 'translateY(-20px)' },
      },
      glow: {
        '0%': { boxShadow: '0 0 20px rgba(99, 102, 241, 0.5)' },
        '100%': { boxShadow: '0 0 30px rgba(99, 102, 241, 0.8), 0 0 40px rgba(99, 102, 241, 0.6)' },
      }
    }
  },
  presets: [
    presetUno(),
    presetAttributify(),
    presetIcons({
      scale: 1.2,
      warn: true,
    }),
    presetTypography(),
    presetWebFonts({
      fonts: {
        sans: 'Inter:400,500,600,700,800',
        mono: 'Fira Code:400,500,600',
        display: 'Lexend:600,700,800',
      },
    }),
  ],
  transformers: [
    transformerDirectives(),
    transformerVariantGroup(),
  ],
  safelist: 'prose prose-lg m-auto text-left'.split(' '),
})
