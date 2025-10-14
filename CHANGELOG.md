# 更新日志 (Changelog)

所有本项目的重要更改都会记录在这个文件中。

格式基于 [Keep a Changelog](https://keepachangelog.com/zh-CN/1.0.0/),
并且本项目遵循 [语义化版本](https://semver.org/lang/zh-CN/)。

## [Unreleased]

## [1.0.3] - 2025-10-14

### 新增 (Added)

- ✨ 项目页面支持 iframe 实时预览模式，可直接嵌入展示真实网站
- ✨ 添加预览模式切换功能（实时预览 / 截图模式）
- ✨ 实现智能降级机制：iframe 失败时自动切换到截图服务
- ✨ 支持多层截图服务备用链（Thum.io, Site-Shot 等）

### 改进 (Improved)

- 🎨 优化项目预览切换按钮样式，采用现代化渐变设计
- 🎨 切换按钮与项目整体设计风格完美融合
- 📱 响应式优化：移动端只显示图标，桌面端显示文字标签
- 🎯 切换按钮移至"精选项目"标题旁，位置更合理
- ⚡ iframe 预览模式完全避免了截图服务的速率限制问题

### 修复 (Fixed)

- 🔧 解决项目页面截图显示 403 错误的问题
- 🔧 修复图片加载失败时的错误处理逻辑

### 技术细节 (Technical)

- iframe 使用 `scale` 缩放显示完整页面预览
- 添加 `sandbox` 安全沙箱机制
- 实现 `pointer-events-none` 禁用 iframe 内交互
- 支持 `loading="lazy"` 懒加载优化性能
- 智能记录失败的 iframe，避免重复尝试
- 自动切换截图服务，提供 4 层备用方案

### 文件变更

- `pages/projects.vue` - 重构预览系统，添加双模式切换
- `types/index.ts` - 添加项目类型定义（如需要）

## [1.0.2] - 2025-10-14

### 修复 (Fixed)

- 🔧 修复移动端自定义鼠标指针显示问题，现在仅在桌面端显示
- 🔧 修复搜索功能不生效的问题，改用客户端搜索实现
- 🔧 修复导航栏点击后页面不更新的问题，移除动态组件改用标准 NuxtLink

### 改进 (Improved)

- 🎨 重新设计页脚布局，采用更合理的响应式网格结构
- 🎨 优化页脚链接为横向排列，提升视觉效果
- ✨ 在页脚添加"更多内容"区域，支持外部链接展示
- 📱 优化移动端体验，自定义鼠标仅在支持精确指针的设备上显示

### 功能调整 (Changed)

- 🔄 将外部链接从顶部导航移至页脚展示
- 🔄 页脚布局从 3 列改为更灵活的响应式布局（移动端 1 列，平板 2 列，桌面 3 列）
- 🔄 社交媒体图标移至 Logo 下方，布局更紧凑

### 技术细节 (Technical)

- 搜索功能支持标题、描述、标签、分类的模糊搜索
- 自定义鼠标添加设备检测和窗口大小监听
- 使用媒体查询 `(hover: hover) and (pointer: fine)` 精确控制鼠标样式
- 页脚使用 `flex-wrap` 实现链接自动换行

### 文件变更

- `components/CustomCursor.vue` - 添加移动端检测逻辑
- `components/TheNav.vue` - 移除外部链接，修复路由问题
- `components/TheFooter.vue` - 重新设计布局，添加外部链接区域
- `composables/useSearch.ts` - 重写搜索逻辑
- `types/index.ts` - 添加 external 字段支持

## [1.0.1] - 2025-10-13

### 修复 (Fixed)

- 🔧 修复构建失败问题：升级 UnoCSS 到 66.5.3 以兼容 Vite 7.1.9
- 🔧 解决 `cssPlugins.get(...).transform.call is not a function` 错误

### 依赖更新 (Dependencies)

- ⬆️ 升级 `@unocss/nuxt`: 0.63.6 → 66.5.3
- ⬆️ 升级 `unocss`: 0.63.6 → 66.5.3

### 验证 (Verified)

- ✅ 生产构建成功（客户端 2.58s，服务端 1.80s）
- ✅ Nitro 服务器构建完成
- ✅ 预渲染功能正常

## [1.0.0] - 2025-10-13

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

[Unreleased]: https://github.com/myltx/nuxt-website/compare/v1.0.3...HEAD
[1.0.3]: https://github.com/myltx/nuxt-website/compare/v1.0.2...v1.0.3
[1.0.2]: https://github.com/myltx/nuxt-website/compare/v1.0.1...v1.0.2
[1.0.1]: https://github.com/myltx/nuxt-website/compare/v1.0.0...v1.0.1
[1.0.0]: https://github.com/myltx/nuxt-website/releases/tag/v1.0.0
