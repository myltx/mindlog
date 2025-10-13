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
      const { data } = await useAsyncData('search-posts', () =>
        queryContent<Post>('/blog')
          .where({
            $or: [
              { title: { $contains: query } },
              { description: { $contains: query } },
              { tags: { $contains: query } }
            ]
          })
          .find()
      )

      searchResults.value = data.value || []
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
