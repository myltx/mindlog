// 阅读进度 Composable
export const useReadingProgress = () => {
  const progress = ref(0)

  const updateProgress = () => {
    const windowHeight = window.innerHeight
    const documentHeight = document.documentElement.scrollHeight
    const scrollTop = window.scrollY

    const scrollableHeight = documentHeight - windowHeight
    const scrolled = (scrollTop / scrollableHeight) * 100

    progress.value = Math.min(100, Math.max(0, scrolled))
  }

  onMounted(() => {
    window.addEventListener('scroll', updateProgress)
    updateProgress()
  })

  onUnmounted(() => {
    window.removeEventListener('scroll', updateProgress)
  })

  return {
    progress
  }
}
