# 更新日志 (Changelog)

所有本项目的重要更改都会记录在这个文件中。

格式基于 [Keep a Changelog](https://keepachangelog.com/zh-CN/1.0.0/),
并且本项目遵循 [语义化版本](https://semver.org/lang/zh-CN/)。

## [Unreleased]

## [1.0.0] - 2025-01-13

### 新增 (Added)
- ✨ 初始化 Nuxt.js 3 项目结构
- ✨ 集成 TypeScript 支持，开启严格模式
- ✨ 集成 UnoCSS 原子化 CSS 引擎
- ✨ 集成 Nuxt Content 模块，支持 Markdown 博客
- ✨ 实现双主题切换功能（亮色/暗黑模式）
- ✨ 实现全文搜索功能（支持 ⌘K/Ctrl+K 快捷键）
- ✨ 实现阅读进度条功能
- ✨ 实现浏览统计功能
- ✨ 实现自定义鼠标指针效果
- ✨ 实现滚动至顶部按钮（带脉冲动画）
- ✨ 添加响应式导航栏组件（TheNav）
- ✨ 添加页脚组件（TheFooter）
- ✨ 添加搜索模态框组件（SearchModal）
- ✨ 添加自定义鼠标组件（CustomCursor）
- ✨ 添加滚动至顶部组件（ScrollToTop）

### 页面 (Pages)
- 📄 首页（index.vue）- 展示最新文章和项目亮点
- 📄 博客列表页（blog/index.vue）- 支持标签和分类筛选
- 📄 博客详情页（blog/[...slug].vue）- 使用专用文章布局
- 📄 项目页（projects.vue）- 展示个人项目
- 📄 关于页（about.vue）- 个人简介、技能图谱、时间轴

### 组合式函数 (Composables)
- 🎨 `useDark()` - 主题切换逻辑
- 🔍 `useSearch()` - 全文搜索功能
- 📊 `useStats()` - 浏览统计
- 📖 `useReadingProgress()` - 阅读进度追踪

### 布局 (Layouts)
- 🎨 default.vue - 默认布局（包含 footer）
- 🎨 article.vue - 文章专用布局（无 footer,优化阅读体验）

### 样式与设计
- 🎨 极客风格配色方案（主色 #00ff88, 副色 #00d9ff）
- 🎨 Glassmorphism 毛玻璃效果
- 🎨 流畅的页面切换动画
- 🎨 悬停交互效果和入场动画
- 🎨 响应式设计，完美适配移动端

### 内容
- 📝 添加 4 篇示例博客文章:
  - JavaScript 事件循环机制详解
  - Nuxt 3 性能优化实践
  - TypeScript 高级类型技巧
  - Vue 3 Composition API 探索
- 📝 添加代码高亮支持（TypeScript, JavaScript, Vue, Python, Go 等）

### 配置文件
- ⚙️ nuxt.config.ts - Nuxt 核心配置
- ⚙️ uno.config.ts - UnoCSS 配置（自定义主题、shortcuts、动画）
- ⚙️ tsconfig.json - TypeScript 配置
- ⚙️ .gitignore - Git 忽略规则

### 文档
- 📚 README.md - 项目完整文档
- 📚 CLAUDE.md - Claude Code 项目指南
- 📚 CHANGELOG.md - 更新日志（本文件）

### 优化 (Optimized)
- ⚡ SSR 服务端渲染
- ⚡ 代码分割和按需加载
- ⚡ 组件懒加载
- ⚡ 图片优化和懒加载
- ⚡ 资源压缩

### 个人信息更新
- 👤 更新社交链接（GitHub, Twitter, Email）
- 👤 更新个人联系方式

---

## 图例 (Legend)

- ✨ 新增功能 (Added)
- 🔧 修复问题 (Fixed)
- 🔄 更改功能 (Changed)
- 🗑️ 移除功能 (Removed)
- ⚠️ 废弃功能 (Deprecated)
- 🔒 安全更新 (Security)
- 📚 文档更新 (Documentation)
- ⚡ 性能优化 (Performance)
- 🎨 样式更新 (Styling)
- 📄 页面更新 (Pages)
- ⚙️ 配置更新 (Configuration)
- 👤 个人信息 (Profile)

---

## 链接 (Links)

[Unreleased]: https://github.com/myltx/nuxt-website/compare/v1.0.0...HEAD
[1.0.0]: https://github.com/myltx/nuxt-website/releases/tag/v1.0.0
