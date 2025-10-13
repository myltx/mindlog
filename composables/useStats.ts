import type { Stats } from '~/types'

// 统计数据 Composable
export const useStats = () => {
  const stats = useState<Stats>('stats', () => ({
    totalPosts: 0,
    totalViews: 0,
    totalVisitors: 0
  }))

  const loadStats = async () => {
    // 获取文章总数
    const { data: posts } = await useAsyncData('total-posts', () =>
      queryContent('/blog').count()
    )

    stats.value.totalPosts = posts.value || 0

    // 模拟访问量数据（实际项目可接入统计API）
    stats.value.totalViews = Math.floor(stats.value.totalPosts * 150 + Math.random() * 1000)
    stats.value.totalVisitors = Math.floor(stats.value.totalViews * 0.6)
  }

  const incrementViews = (postPath: string) => {
    // 增加文章浏览量（实际项目应存储到后端）
    if (!import.meta.client) return

    const viewsKey = `post_views_${postPath}`
    const currentViews = parseInt(localStorage.getItem(viewsKey) || '0')
    localStorage.setItem(viewsKey, String(currentViews + 1))
    stats.value.totalViews++
  }

  const getPostViews = (postPath: string): number => {
    if (!import.meta.client) return Math.floor(Math.random() * 200)

    const viewsKey = `post_views_${postPath}`
    return parseInt(localStorage.getItem(viewsKey) || '0') + Math.floor(Math.random() * 200)
  }

  return {
    stats,
    loadStats,
    incrementViews,
    getPostViews
  }
}
