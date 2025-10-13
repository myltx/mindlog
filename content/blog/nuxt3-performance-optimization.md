---
title: Nuxt 3 性能优化实战
description: 从代码分割、懒加载、缓存策略等多个维度，全面提升 Nuxt 3 应用的性能表现
date: 2024-01-05
category: 性能优化
tags: [Nuxt.js, 性能优化, SSR]
author: Geek Developer
readingTime: 12
---

# Nuxt 3 性能优化实战

性能优化是Web开发中的重要环节。本文将分享一些 Nuxt 3 性能优化的实战经验。

## 1. 代码分割与懒加载

### 组件懒加载

使用 Nuxt 的自动导入功能，组件会按需加载：

```vue
<template>
  <div>
    <LazyMyHeavyComponent v-if="show" />
  </div>
</template>
```

### 路由懒加载

Nuxt 3 默认会对每个页面进行代码分割，无需额外配置。

## 2. 图片优化

使用 `nuxt/image` 模块自动优化图片：

```bash
pnpm add @nuxt/image
```

```vue
<template>
  <NuxtImg
    src="/image.jpg"
    width="800"
    height="600"
    format="webp"
    loading="lazy"
  />
</template>
```

## 3. 缓存策略

### 静态资源缓存

在 `nuxt.config.ts` 中配置：

```typescript
export default defineNuxtConfig({
  nitro: {
    compressPublicAssets: true,
    routeRules: {
      '/_nuxt/**': { headers: { 'cache-control': 'max-age=31536000' } },
      '/api/**': { cache: { maxAge: 60 } }
    }
  }
})
```

### 数据缓存

使用 `useAsyncData` 的缓存功能：

```typescript
const { data } = await useAsyncData(
  'posts',
  () => $fetch('/api/posts'),
  {
    // 缓存10分钟
    getCachedData: (key) => nuxtApp.payload.data[key] || nuxtApp.static.data[key]
  }
)
```

## 4. 预渲染关键页面

配置需要预渲染的路由：

```typescript
export default defineNuxtConfig({
  nitro: {
    prerender: {
      routes: ['/', '/about', '/blog']
    }
  }
})
```

## 5. 优化包体积

### 移除未使用的依赖

定期检查并移除不再使用的包：

```bash
npx depcheck
```

### Tree Shaking

确保依赖库支持 Tree Shaking：

```typescript
// ✅ 好的做法
import { ref } from 'vue'

// ❌ 不好的做法
import * as Vue from 'vue'
```

## 6. 性能监控

使用 Nuxt DevTools 监控应用性能：

```typescript
export default defineNuxtConfig({
  devtools: { enabled: true }
})
```

## 总结

性能优化是一个持续的过程，需要根据实际情况不断调整和优化。记住：**测量、优化、再测量**。
