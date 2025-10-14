import type { RouterConfig } from '@nuxt/schema'

// https://router.vuejs.org/api/interfaces/routeroptions.html
export default <RouterConfig>{
  scrollBehavior(to, from, savedPosition) {
    // 如果有保存的位置（浏览器前进/后退），恢复到那个位置
    if (savedPosition) {
      return savedPosition
    }

    // 如果有锚点，滚动到锚点
    if (to.hash) {
      return {
        el: to.hash,
        behavior: 'smooth',
      }
    }

    // 从博客详情页返回列表页时，滚动到顶部
    if (from.path.startsWith('/blog/') && to.path === '/blog') {
      return { top: 0, behavior: 'smooth' }
    }

    // 其他情况，如果是不同的页面，滚动到顶部
    if (to.path !== from.path) {
      return { top: 0, behavior: 'smooth' }
    }

    // 默认不滚动
    return false
  },
}
