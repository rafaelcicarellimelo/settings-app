import { ref, computed } from 'vue'

const THEME_KEY = 'theme-preference'

const currentTheme = ref<'light' | 'dark'>((() => {
  const saved = localStorage.getItem(THEME_KEY)
  if (saved === 'light' || saved === 'dark') return saved

  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
  return prefersDark ? 'dark' : 'light'
})())

function applyThemeToDOM(theme: 'light' | 'dark') {
  const html = document.documentElement
  if (theme === 'dark') {
    html.classList.add('dark')
  } else {
    html.classList.remove('dark')
  }
  localStorage.setItem(THEME_KEY, theme)
}

applyThemeToDOM(currentTheme.value)

export function useTheme() {
  const theme = computed(() => currentTheme.value)
  const isDark = computed(() => currentTheme.value === 'dark')

  function toggleTheme() {
    currentTheme.value = currentTheme.value === 'dark' ? 'light' : 'dark'
    applyThemeToDOM(currentTheme.value)
  }

  return {
    theme,
    isDark,
    toggleTheme,
  }
}
