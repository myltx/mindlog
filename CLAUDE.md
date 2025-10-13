# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a geek-style personal blog built with Nuxt.js 3, TypeScript, and UnoCSS. It features:
- Markdown-based blog posts with code highlighting
- Search and filtering functionality
- Responsive design with dark theme
- Reading progress tracking
- Tag and category system

## Development Commands

- **Install dependencies**: `pnpm install`
- **Start dev server**: `pnpm dev` (http://localhost:3000)
- **Build for production**: `pnpm build`
- **Preview production build**: `pnpm preview`
- **Generate static site**: `pnpm generate`

## Project Structure

- `pages/` - Route pages (index, blog, about, projects)
- `components/` - Vue components (TheNav, TheFooter)
- `composables/` - Reusable composition functions (useDark, useSearch, useStats, useReadingProgress)
- `content/blog/` - Markdown blog posts
- `types/` - TypeScript type definitions
- `layouts/` - Page layouts (default.vue)
- `uno.config.ts` - UnoCSS configuration with custom theme colors
- `nuxt.config.ts` - Nuxt configuration with Content module

## Key Features

### Styling
- Uses UnoCSS with custom shortcuts and theme
- Primary color: `#00ff88` (neon green)
- Secondary color: `#00d9ff` (cyan)
- Dark background: `#0a0e27`
- Custom shortcuts: `btn`, `card`, `input`, `link`, `badge`, `container`

### Content Management
- Blog posts stored in `content/blog/` as Markdown files
- Required frontmatter: title, description, date, category, tags, author
- Optional: readingTime, cover image
- Supports code highlighting for multiple languages

### Composables
- `useDark()` - Theme switching (currently dark-only)
- `useSearch()` - Full-text search for posts
- `useStats()` - View counts and statistics
- `useReadingProgress()` - Track reading progress on article pages

## Adding New Content

### New Blog Post
Create a `.md` file in `content/blog/`:
```markdown
---
title: Post Title
description: Brief description
date: 2024-01-15
category: Category Name
tags: [tag1, tag2]
author: Author Name
readingTime: 10
---

# Content here
```

### Modifying Theme Colors
Edit `uno.config.ts` theme.colors section.

### Changing Navigation
Edit `navItems` array in `components/TheNav.vue`.

## Important Notes

- TypeScript is enabled with strict mode
- All components are auto-imported by Nuxt
- Content module provides `queryContent()` for fetching posts
- Icons use Iconify (carbon and mdi icon sets)
