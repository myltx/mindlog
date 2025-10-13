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
  image: string
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
