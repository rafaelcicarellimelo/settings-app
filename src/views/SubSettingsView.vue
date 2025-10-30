<template>
  <div class="min-h-screen bg-[var(--bg-body)] text-[var(--text-color)] p-4">
    <!-- Header mobile com botão voltar -->
    <header class="flex items-center gap-3 mb-4 md:hidden">
      <router-link
        to="/settings"
        class="inline-flex items-center px-3 py-2 rounded-lg border border-[color:var(--border-color)]
               bg-surface hover:bg-surface-soft text-sm font-medium"
        style="color:var(--text-color)"
      >
        <i class="pi pi-arrow-left mr-2 text-sm" />
        Voltar
      </router-link>

      <ThemeToggle />
    </header>

    <section class="card-surface">
      <h1 class="text-lg font-semibold mb-2" style="color:var(--text-color)">
        {{ pageTitle }}
      </h1>
      <p class="text-sm" style="color:var(--text-mute-color)">
        Aqui você colocará as configurações específicas de <strong>{{ submenu }}</strong>.
      </p>

      <div class="mt-4 text-xs text-[var(--text-mute-color)]">
        <p>Exemplo de conteúdo (PrimeVue Card, Switch etc.) vem depois.</p>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import ThemeToggle from '../components/ThemeToggle.vue'

// recebemos o :submenu da rota como prop
interface Props {
  submenu: string
}

const props = defineProps<Props>()

// Vamos formatar um título bonitinho
const pageTitle = computed(() => {
  const map: Record<string, string> = {
    conta: 'Configurações de Conta',
    privacidade: 'Privacidade e Segurança',
  }
  return map[props.submenu] ?? `Configurações: ${props.submenu}`
})
</script>
