// src/main.ts
import { createApp } from 'vue'
import { VueQueryPlugin, QueryClient } from '@tanstack/vue-query'
import PrimeVuePlugin from './plugins/primevue'
import App from './App.vue'
import router from './router'
import './styles/index.css'

// Gerencia cache de requisições (vue-query)
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
})

// Força a aplicação a carregar o tema do usuário do localStorage
const THEME_KEY = 'theme-preference'
const savedTheme = localStorage.getItem(THEME_KEY)

if (savedTheme === 'dark') {
  document.documentElement.classList.add('dark')
} else if (savedTheme === 'light') {
  document.documentElement.classList.remove('dark')
} else {
  // fallback: seguir preferência do sistema
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
  if (prefersDark) {
    document.documentElement.classList.add('dark')
  }
}

const app = createApp(App)

app.use(router)

app.use(VueQueryPlugin, {
  queryClient,
})

app.use(PrimeVuePlugin)

app.mount('#app')
