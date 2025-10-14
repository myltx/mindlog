// 文章类型定义
export interface Post {
  _path: string
  title: string
  description: string
  date: string
  tags: string[]
  category: string
  cover?: string
  author: string
  readingTime?: number
  views?: number
  body: any
}

// 项目类型定义
export interface Project {
  title: string
  description: string
  url: string // 项目网站地址，用于生成预览截图
  tech: string[]
  github?: string
  demo?: string
  featured: boolean
}

// 导航项类型定义
export interface NavItem {
  label: string
  to: string
  icon?: string
  external?: boolean // 是否为外部链接
}

// 技能类型定义
export interface Skill {
  name: string
  level: number
  category: string
}

// 评论类型定义
export interface Comment {
  id: string
  author: string
  email: string
  content: string
  date: string
  postPath: string
}

// 统计类型定义
export interface Stats {
  totalPosts: number
  totalViews: number
  totalVisitors: number
}
