# Mindlog - 思维日志

<div align="center">

  ![Nuxt](https://img.shields.io/badge/Nuxt-3.x-00DC82?logo=nuxt.js)
  ![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?logo=typescript)
  ![UnoCSS](https://img.shields.io/badge/UnoCSS-Latest-1B1F29?logo=unocss)
  ![License](https://img.shields.io/badge/License-MIT-green)

  一个基于 Nuxt.js、TypeScript 和 UnoCSS 构建的现代化思维记录系统

  [在线预览](#) · [快速开始](#快速开始) · [功能特性](#特性)

</div>

## ✨ 特性

### 🎨 现代化设计
- **双主题模式** - 完整的浅色/暗黑主题切换，自动检测系统偏好
- **毛玻璃效果** - Glassmorphism 设计风格，现代感十足
- **流畅动画** - 页面切换、入场动画、悬停效果、主题切换动画
- **渐变色彩** - 极客风格配色（#00ff88 主色 + #00d9ff 副色）
- **响应式设计** - 完美适配 PC、平板和手机
- **自定义鼠标** - 独特的自定义鼠标指针效果（仅桌面端显示，智能适配）
- **滚动至顶部** - 智能显示的返回顶部按钮（脉冲动画）
- **优化页脚** - 响应式页脚布局，支持外部链接展示

### 📝 内容管理
- **Markdown 写作** - 基于 Nuxt Content，支持 Markdown 文章写作
- **代码高亮** - 支持 10+ 编程语言的语法高亮（TypeScript、JavaScript、Vue、Python、Go 等）
- **标签系统** - 按分类和标签筛选文章
- **全文搜索** - 快速搜索文章标题、描述、标签、分类（支持快捷键 ⌘K / Ctrl+K）
- **阅读进度** - 实时显示文章阅读进度条（不受 footer 干扰）
- **浏览统计** - 文章浏览次数统计
- **优化布局** - 博客详情页使用专用布局，移除 footer 以提升阅读体验

### ⚡ 性能优化
- **SSR 渲染** - 服务端渲染，SEO 友好
- **代码分割** - 自动代码分割，按需加载
- **组件懒加载** - 优化首屏加载速度
- **图片优化** - 自动图片优化和懒加载
- **资源压缩** - 自动压缩 CSS、JS 资源

### 🛠️ 开发体验
- **TypeScript** - 完整的类型支持
- **组合式 API** - Vue 3 Composition API
- **自动导入** - 组件、组合式函数自动导入
- **热更新** - 开发环境快速热更新

## 🚀 技术栈

| 技术 | 说明 | 版本 |
|------|------|------|
| [Nuxt.js](https://nuxt.com/) | Vue.js 元框架 | 3.x |
| [TypeScript](https://www.typescriptlang.org/) | JavaScript 超集 | 5.x |
| [UnoCSS](https://unocss.dev/) | 原子化 CSS 引擎 | Latest |
| [Nuxt Content](https://content.nuxt.com/) | 文件驱动的 CMS | 2.x |
| [VueUse](https://vueuse.org/) | Vue 组合式工具集 | Latest |
| [Iconify](https://iconify.design/) | 统一的图标框架 | Latest |

## 📦 快速开始

### 环境要求

- Node.js >= 18.x
- pnpm >= 8.x

### 安装依赖

```bash
# 克隆项目
git clone https://github.com/yourusername/nuxt-website.git
cd nuxt-website

# 安装依赖
pnpm install
```

### 开发

```bash
# 启动开发服务器
pnpm dev
```

访问 http://localhost:3000

### 构建

```bash
# 构建生产版本
pnpm build

# 预览生产版本
pnpm preview
```

### 生成静态站点

```bash
# 生成静态文件
pnpm generate
```

生成的文件在 `.output/public` 目录

## 📁 项目结构

```
nuxt-website/
├── components/              # Vue 组件
│   ├── TheNav.vue          # 导航栏（支持主题切换、搜索）
│   ├── TheFooter.vue       # 页脚组件（优化布局）
│   ├── CustomCursor.vue    # 自定义鼠标指针
│   ├── ScrollToTop.vue     # 滚动至顶部按钮
│   └── SearchModal.vue     # 搜索模态框
├── composables/            # 组合式函数
│   ├── useDark.ts          # 主题切换逻辑
│   ├── useSearch.ts        # 搜索功能
│   ├── useStats.ts         # 统计数据
│   └── useReadingProgress.ts  # 阅读进度
├── content/                # 内容目录
│   └── blog/              # Markdown 博客文章
│       ├── example-post.md
│       └── ...
├── layouts/                # 布局组件
│   ├── default.vue        # 默认布局（含 footer）
│   └── article.vue        # 文章布局（无 footer，优化阅读）
├── pages/                  # 页面路由
│   ├── index.vue          # 首页
│   ├── about.vue          # 关于页
│   ├── projects.vue       # 项目页
│   └── blog/
│       ├── index.vue      # 文章列表
│       └── [...slug].vue  # 文章详情（使用 article 布局）
├── types/                  # TypeScript 类型定义
│   └── index.ts
├── CLAUDE.md              # Claude Code 项目说明
├── app.vue                # 应用入口（页面过渡动画）
├── nuxt.config.ts         # Nuxt 配置
├── uno.config.ts          # UnoCSS 配置
└── tsconfig.json          # TypeScript 配置
```

## 📝 添加新文章

在 `content/blog/` 目录下创建 Markdown 文件：

```markdown
---
title: 探索 Vue 3 Composition API
description: 深入理解 Vue 3 组合式 API 的设计理念和使用技巧
date: 2024-01-15
category: 前端开发
tags: [Vue, JavaScript, TypeScript]
author: Mindlog Author
readingTime: 10
---

# 探索 Vue 3 Composition API

Vue 3 引入了全新的 Composition API...

## 什么是 Composition API

Composition API 是一种基于函数的 API...

\`\`\`typescript
import { ref, computed } from 'vue'

const count = ref(0)
const doubled = computed(() => count.value * 2)
\`\`\`
```

### Frontmatter 字段说明

| 字段 | 类型 | 必填 | 说明 |
|------|------|------|------|
| title | string | ✅ | 文章标题 |
| description | string | ✅ | 文章描述 |
| date | string | ✅ | 发布日期 (YYYY-MM-DD) |
| category | string | ✅ | 文章分类 |
| tags | array | ✅ | 文章标签 |
| author | string | ✅ | 作者名称 |
| readingTime | number | ❌ | 阅读时间（分钟） |
| cover | string | ❌ | 封面图片 URL |

## 🎨 自定义配置

### 修改主题颜色

编辑 `uno.config.ts` 中的颜色配置：

```typescript
theme: {
  colors: {
    primary: {
      DEFAULT: '#00ff88',  // 主色 - 极客绿
    },
    secondary: {
      DEFAULT: '#00d9ff',  // 副色 - 青色
    },
    accent: {
      DEFAULT: '#ff006e',  // 强调色 - 粉色
    }
  }
}
```

### 修改导航菜单

编辑 `components/TheNav.vue` 中的 `navItems` 数组：

```typescript
const navItems: NavItem[] = [
  { label: '首页', to: '/', icon: 'carbon:home' },
  { label: '博客', to: '/blog', icon: 'carbon:blog' },
  { label: '项目', to: '/projects', icon: 'carbon:code' },
  { label: '关于', to: '/about', icon: 'carbon:user' }
]
```

### 禁用自定义鼠标

自定义鼠标已自动在移动端禁用。如果你想在所有设备上禁用，可以在 `layouts/default.vue` 和 `layouts/article.vue` 中移除：

```vue
<!-- 删除或注释这一行 -->
<CustomCursor />
```

### 添加外部链接

在页脚添加外部链接（如生活博客、作品集等），编辑 `components/TheFooter.vue`：

```typescript
const externalLinks = [
  { label: "生活博客", url: "https://your-blog.com", icon: "carbon:coffee" },
  { label: "摄影作品", url: "https://photos.example.com", icon: "carbon:image" },
  { label: "读书笔记", url: "https://books.example.com", icon: "carbon:book" },
]
```

### 搜索功能使用

- **点击搜索按钮**：导航栏右上角的搜索按钮
- **键盘快捷键**：`⌘K` (Mac) 或 `Ctrl+K` (Windows/Linux)
- **搜索范围**：文章标题、描述、标签、分类
- **实时搜索**：输入 2 个字符即可开始搜索

### 自定义动画

`uno.config.ts` 中定义了多种动画，可以在组件中使用：

```html
<!-- 淡入上移动画 -->
<div class="animate-fade-in-up">内容</div>

<!-- 浮动动画 -->
<div class="animate-float">浮动元素</div>

<!-- 发光动画 -->
<div class="animate-glow">发光效果</div>
```

### 修改个人信息

编辑相关页面的内容：
- `pages/about.vue` - 关于页面
- `components/TheFooter.vue` - 页脚社交链接

## 🎯 主题切换功能

项目实现了完整的双主题切换：

### 使用方法

点击导航栏右上角的太阳/月亮图标切换主题。

### 技术实现

```typescript
// 使用 useDark composable
const { isDark, toggleDark } = useDark()

// 主题自动检测系统偏好
// 主题选择保存在 localStorage
// 所有组件支持 dark: 前缀样式
```

### 添加暗黑模式样式

```html
<div class="bg-white dark:bg-slate-900 text-gray-900 dark:text-white">
  双主题内容
</div>
```

## 📊 性能优化

项目已内置多项性能优化：

- ✅ **SSR 渲染** - 首屏服务端渲染
- ✅ **代码分割** - 路由级别的代码分割
- ✅ **组件懒加载** - 按需加载组件
- ✅ **图片优化** - 自动图片压缩和懒加载
- ✅ **资源预取** - 智能预取即将访问的页面
- ✅ **CSS 优化** - UnoCSS 按需生成，体积极小
- ✅ **Tree Shaking** - 自动移除未使用的代码

## 🚀 部署

### Vercel (推荐)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/yourusername/nuxt-website)

1. 点击上方按钮
2. 导入你的 Git 仓库
3. Vercel 自动检测 Nuxt 并配置
4. 点击 Deploy

### Netlify

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/yourusername/nuxt-website)

构建配置：
```toml
[build]
  command = "pnpm build"
  publish = ".output/public"
```

### 静态托管

生成静态文件后，可部署到任何静态托管服务：

```bash
pnpm generate
```

支持的托管平台：
- GitHub Pages
- Cloudflare Pages
- AWS S3 + CloudFront
- 阿里云 OSS
- 腾讯云 COS

## 🔧 常见问题

### Q: 如何修改默认主题？

A: 编辑 `composables/useDark.ts`，修改 `getInitialTheme` 函数的返回值。

### Q: 如何添加新的页面？

A: 在 `pages/` 目录下创建 `.vue` 文件，Nuxt 会自动生成路由。

### Q: 如何自定义 UnoCSS shortcuts？

A: 编辑 `uno.config.ts` 的 `shortcuts` 配置。

### Q: 如何修改代码高亮主题？

A: 在 `nuxt.config.ts` 的 `content` 配置中修改 `highlight` 选项。

## 📄 许可证

[MIT License](LICENSE)

## 👨‍💻 作者

Mindlog Author

- GitHub: [@yourusername](https://github.com/yourusername)
- Email: your.email@example.com

## 🙏 致谢

感谢以下开源项目：

- [Nuxt.js](https://nuxt.com/)
- [Vue.js](https://vuejs.org/)
- [UnoCSS](https://unocss.dev/)
- [Iconify](https://iconify.design/)

## 🌟 Star History

如果觉得这个项目对你有帮助，欢迎 ⭐️ Star 支持！

---

<div align="center">
  Made with ❤️ by Mindlog
</div>
