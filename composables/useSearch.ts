import type { Post } from '~/types'

// 文章搜索 Composable
export const useSearch = () => {
  const searchQuery = useState<string>('searchQuery', () => '')
  const searchResults = useState<Post[]>('searchResults', () => [])
  const isSearching = useState<boolean>('isSearching', () => false)

  const searchPosts = async (query: string) => {
    searchQuery.value = query
    if (!query || query.length < 2) {
      searchResults.value = []
      return
    }

    isSearching.value = true

    try {
      // 获取所有博客文章
      const allPosts = await queryContent<Post>('/blog').find()

      // 客户端搜索过滤
      const lowerQuery = query.toLowerCase()
      const filtered = allPosts.filter(post => {
        const titleMatch = post.title?.toLowerCase().includes(lowerQuery)
        const descMatch = post.description?.toLowerCase().includes(lowerQuery)
        const tagsMatch = post.tags?.some(tag =>
          tag.toLowerCase().includes(lowerQuery)
        )
        const categoryMatch = post.category?.toLowerCase().includes(lowerQuery)

        return titleMatch || descMatch || tagsMatch || categoryMatch
      })

      searchResults.value = filtered
    } catch (error) {
      console.error('搜索出错:', error)
      searchResults.value = []
    } finally {
      isSearching.value = false
    }
  }

  const clearSearch = () => {
    searchQuery.value = ''
    searchResults.value = []
  }

  return {
    searchQuery,
    searchResults,
    isSearching,
    searchPosts,
    clearSearch
  }
}
