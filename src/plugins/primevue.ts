
import type { App } from 'vue'


import PrimeVue from 'primevue/config'
import DialogService from 'primevue/dialogservice'


import Aura from '@primevue/themes/aura'


import 'primeicons/primeicons.css'

const PrimeVuePlugin = {
  install(app: App) {
    app.use(PrimeVue, {
      ripple: true,
      theme: {
        preset: Aura,
        options: {
         
          darkModeSelector: 'html.dark',
        },
      },
    })

    app.use(DialogService)
  },
}

export default PrimeVuePlugin
