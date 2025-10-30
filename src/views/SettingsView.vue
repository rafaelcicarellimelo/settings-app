<template>
  <div class="min-h-screen flex bg-[var(--bg-body)] text-[var(--text-color)]">
    <!-- Sidebar (desktop) -->
    <aside
      class="hidden md:flex w-64 flex-col border-r border-[color:var(--border-color)] bg-surface p-4 gap-4"
    >
      <header class="flex items-center justify-between">
        <div>
          <h2 class="text-lg font-semibold" style="color:var(--text-color)">Configurações</h2>
          <p class="text-xs" style="color:var(--text-mute-color)">Gerencie sua conta e preferências</p>
        </div>

        <ThemeToggle />
      </header>

      <nav class="flex-1">
        <!-- Isso depois vira uma lista de itens clicáveis que levam pra /settings/:submenu -->
        <ul class="space-y-1 text-sm">
          <li>
            <router-link
              to="/settings/conta"
              class="flex items-center justify-between w-full px-3 py-2 rounded-lg hover:bg-surface-soft border border-transparent hover:border-[color:var(--border-color)] transition-colors"
            >
              <span style="color:var(--text-color)" class="flex items-center gap-2">
                <i class="pi pi-user text-sm" />
                Conta
              </span>
              <i class="pi pi-angle-right text-xs text-[var(--text-mute-color)]" />
            </router-link>
          </li>

          <li>
            <router-link
              to="/settings/privacidade"
              class="flex items-center justify-between w-full px-3 py-2 rounded-lg hover:bg-surface-soft border border-transparent hover:border-[color:var(--border-color)] transition-colors"
            >
              <span style="color:var(--text-color)" class="flex items-center gap-2">
                <i class="pi pi-lock text-sm" />
                Privacidade
              </span>
              <i class="pi pi-angle-right text-xs text-[var(--text-mute-color)]" />
            </router-link>
          </li>

          <li>
            <button
              @click="handleLogoutClick"
              class="flex items-center justify-between w-full px-3 py-2 rounded-lg hover:bg-surface-soft border border-transparent hover:border-[color:var(--border-color)] transition-colors text-left"
            >
              <span style="color:var(--text-color)" class="flex items-center gap-2">
                <i class="pi pi-sign-out text-sm text-red-500" />
                <span>Sair</span>
              </span>
              <i class="pi pi-angle-right text-xs text-[var(--text-mute-color)]" />
            </button>
          </li>
        </ul>
      </nav>

      <footer class="text-[10px] text-right" style="color:var(--text-mute-color)">
        v0.1.0
      </footer>
    </aside>

    <!-- Conteúdo principal -->
    <main class="flex-1 p-6">
      <div class="card-surface">
        <h1 class="text-xl font-semibold mb-2" style="color:var(--text-color)">Bem-vindo às Configurações</h1>
        <p class="text-sm" style="color:var(--text-mute-color)">
          Selecione um item no menu ao lado para começar.
        </p>
      </div>

      <div class="mt-6">
        <ThemeToggle />
      </div>

      <div class="mt-6 text-xs text-[var(--text-mute-color)]">
        <p>Layout responsivo:</p>
        <ul class="list-disc ml-4">
          <li>No desktop você vê menu + conteúdo.</li>
          <li>No mobile, a ideia é primeiro ver só o menu e depois só o submenu.</li>
        </ul>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import ThemeToggle from '../components/ThemeToggle.vue'
import { useDialog } from 'primevue/usedialog'

const dialog = useDialog()

function handleLogoutClick() {
  // Requisito do desafio:
  // - Ao clicar em "Sair", abrir um DynamicDialog perguntando confirmação.
  dialog.open(ConfirmLogoutDialog, {
    props: {
      header: 'Confirmar saída',
      style: { width: '90%', maxWidth: '400px' },
      modal: true,
    },
  })
}
</script>

<script lang="ts">
// Truque: precisamos registrar o componente ConfirmLogoutDialog
// Podemos importar aqui fora do <script setup> usando defineAsyncComponent
import { defineComponent, defineAsyncComponent } from 'vue'
const ConfirmLogoutDialog = defineAsyncComponent(() => import('../components/ConfirmLogoutDialog.vue'))

export default defineComponent({})
</script>
