

import { createApp } from 'vue'
import App from './App.vue'


import router from './router'


import PrimeVuePlugin from './plugins/primevue'


import { VueQueryPlugin, QueryClient, type VueQueryPluginOptions } from '@tanstack/vue-query'


import './styles/index.css'



const THEME_KEY = 'theme-preference'
const savedTheme = localStorage.getItem(THEME_KEY)

if (savedTheme === 'dark') {
  document.documentElement.classList.add('dark')
} else if (savedTheme === 'light') {
  document.documentElement.classList.remove('dark')
} else {
  
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
  if (prefersDark) {
    document.documentElement.classList.add('dark')
  } else {
    document.documentElement.classList.remove('dark')
  }
}




const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      staleTime: 1000 * 30,          
      refetchOnWindowFocus: false,   
    },
  },
})

const vueQueryOptions: VueQueryPluginOptions = {
  queryClient,
}




const app = createApp(App)


app.use(router)

app.use(VueQueryPlugin, vueQueryOptions)

app.use(PrimeVuePlugin)

app.mount('#app')
