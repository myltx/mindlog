// 暗黑模式 Composable
export const useDark = () => {
  // 默认检测系统偏好
  const getInitialTheme = () => {
    if (import.meta.client) {
      const savedTheme = localStorage.getItem('theme')
      if (savedTheme) {
        return savedTheme === 'dark'
      }
      // 检测系统主题偏好
      return window.matchMedia('(prefers-color-scheme: dark)').matches
    }
    return true // SSR 默认暗黑
  }

  const isDark = useState<boolean>('isDark', getInitialTheme)

  const toggleDark = () => {
    isDark.value = !isDark.value
    if (import.meta.client) {
      document.documentElement.classList.toggle('dark', isDark.value)
      localStorage.setItem('theme', isDark.value ? 'dark' : 'light')
    }
  }

  const setTheme = (dark: boolean) => {
    isDark.value = dark
    if (import.meta.client) {
      document.documentElement.classList.toggle('dark', dark)
      localStorage.setItem('theme', dark ? 'dark' : 'light')
    }
  }

  // 客户端初始化主题
  if (import.meta.client) {
    onMounted(() => {
      const savedTheme = localStorage.getItem('theme')
      if (savedTheme) {
        isDark.value = savedTheme === 'dark'
      } else {
        // 检测系统主题偏好
        isDark.value = window.matchMedia('(prefers-color-scheme: dark)').matches
      }
      document.documentElement.classList.toggle('dark', isDark.value)
    })
  }

  return {
    isDark: readonly(isDark),
    toggleDark,
    setTheme
  }
}
