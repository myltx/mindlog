# Repository Guidelines

## Project Structure & Module Organization
- `app.vue` 与 `app/` 定义全局布局、页面过渡与 meta，`layouts/`（如 `default.vue`、`article.vue`）提供可切换的壳层。  
- `pages/` 直接映射路由，保持 `kebab-case` 路径；可复用视图放入 `components/`，组合逻辑置于 `composables/`（如 `useDark.ts`）。  
- Markdown 数据位于 `content/blog` 与 `content/projects`，front‑matter 必须符合 `types/index.ts` 中的 `Post`、`Project` 接口；静态资源分别放入 `assets/`（Sass、全局样式）与 `public/`（原样复制）。  
- UnoCSS 令牌、动画与 shortcuts 在 `uno.config.ts` 管理；新增样式时复用既有 `btn-*`、`card`、`badge` 等别名以保持视觉一致性。

## Build, Test, and Development Commands
- `pnpm install`：同步依赖。  
- `pnpm dev`：热更新开发服务器（默认 http://localhost:3000）。  
- `pnpm build`：产出 SSR 资产；CI 与 PR 前务必通过。  
- `pnpm nuxi typecheck`：在大改或合并前执行，确保严格模式下的类型安全。  
- `pnpm preview`：使用构建产物进行本地验收；`pnpm generate` 用于静态导出（输出至 `.output/public`）。

## Coding Style & Naming Conventions
- 统一使用 TypeScript 与 `<script setup>`，两空格缩进；组件文件 `PascalCase.vue`，组合式函数 `camelCase` 并以 `use` 前缀命名。  
- 模板内首选 UnoCSS 原子类和 `shortcuts`，仅在需要变量时再落到 Sass。  
- 依赖自动导入（`nuxt.config.ts`）减少显式引入；若必须全局注册，请在 `app/` 下创建插件并注明用途。

## Testing Guidelines
- 目前尚无内置测试脚本；新增功能请添加 `tests/**/*.spec.ts` 并以 `vitest` + `@nuxt/test-utils` 运行（建议命令：`pnpm vitest run`，如未安装请同时提交 devDependency）。  
- 内容变更至少运行 `pnpm dev` 自查页面，确认 `content` front‑matter 被正确解析，且 `pnpm build` 不报错。  
- 数据层逻辑可在 `composables` 内配套单元测试，命名为 `useFeature.spec.ts`。

## Commit & Pull Request Guidelines
- Git 历史遵循 Conventional Commits（示例：`feat: 添加项目预览双模式`、`fix: 修复滚动位置`），必要时追加语义版本标签。  
- 每个 PR 包含变更摘要、影响范围、截图/录屏（涉及 UI 时）以及复现步骤；若关联 Issue，请在描述中使用 `Fixes #123`。  
- 提交前必须完成 `pnpm install`, `pnpm build`, `pnpm preview --port 4173`（截图可来自此实例）并确保内容 lint（front‑matter 字段齐全）。

## Content & Styling Tips
- 新文章以 `YYYY-MM-DD-slug.md` 命名，字段至少包含 `title/description/date/category/tags/author`，可参考 `content/blog/vue3-composition-api.md`。  
- `types/Post`、`types/Project` 的新增字段需同步更新内容文件与相关组件的解构逻辑。  
- UnoCSS 颜色变量（`primary/secondary/accent`) 已在 `uno.config.ts` 定义，定制时一并调整深浅值，避免直接写死 hex；若需要自定义按钮，优先扩展 `shortcuts`.
