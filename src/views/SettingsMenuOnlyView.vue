<template>
  <div class="min-h-screen bg-[var(--bg-body)] text-[var(--text-color)] p-4 md:p-8">
    <div
      class="max-w-5xl mx-auto w-full
             bg-[var(--surface-color)]
             border border-[var(--border-color)]
             rounded-xl shadow-sm
             flex flex-col md:flex-row relative overflow-hidden"
    >
      <!-- MOBILE: menu ocupa a tela toda -->
      <section class="flex md:hidden w-full p-4">
        <SidebarMenu
          :sections="sections"
          :activeSection="activeSection"
          mobile
          @navigate="() => {}"
          @logout="openLogoutModal"
        />
      </section>

      <!-- DESKTOP: sidebar fixa -->
      <aside
        class="hidden md:flex md:flex-col md:w-64 md:border-r
               border-[var(--border-color)]
               p-4 gap-4 flex-shrink-0"
      >
        <SidebarMenu
          :sections="sections"
          :activeSection="activeSection"
          @navigate="() => {}"
          @logout="openLogoutModal"
        />
      </aside>

      <!-- DESKTOP: painel da direita só de instrução -->
      <section class="hidden md:flex flex-1 p-6 text-sm items-center justify-center text-center">
        <div class="max-w-sm">
          <div class="text-base font-semibold mb-2" :style="{ color: 'var(--text-color)' }">
            Selecione uma categoria
          </div>
          <div class="text-[12px] leading-snug" :style="{ color: 'var(--text-mute-color)' }">
            Escolha uma área de configurações no menu ao lado.
          </div>
        </div>
      </section>

      <!-- MODAL DE LOGOUT -->
      <Dialog
        v-model:visible="showLogoutModal"
        modal
        dismissableMask
        :style="{ width: '90%', maxWidth: '400px' }"
        header="Confirmar saída"
      >
        <div class="p-4">
          <p class="text-sm mb-6" :style="{ color: 'var(--text-color)' }">
            Tem certeza que deseja sair?
          </p>

          <div class="flex flex-col-reverse sm:flex-row justify-end gap-3">
            <button
              @click="cancelLogout"
              class="px-3 py-2 rounded-lg border border-[var(--border-color)]
                     bg-[var(--surface-color)] hover:bg-[var(--surface-soft-color)]
                     text-sm font-medium w-full sm:w-auto"
              :style="{ color: 'var(--text-color)' }"
            >
              Cancelar
            </button>

            <button
              @click="confirmLogout"
              class="px-3 py-2 rounded-lg text-sm font-medium text-white
                     bg-red-500 hover:bg-red-600 w-full sm:w-auto"
            >
              Confirmar
            </button>
          </div>
        </div>
      </Dialog>

      <!-- TOAST -->
      <transition name="fade">
        <div
          v-if="showLogoutToast"
          class="fixed bottom-4 right-4 z-50
                 bg-[var(--surface-color)]
                 border border-[var(--border-color)]
                 rounded-lg shadow-lg px-4 py-3 text-sm flex items-center gap-2 max-w-[90%]"
          :style="{ color: 'var(--text-color)' }"
        >
          <i class="pi pi-check-circle text-green-500 text-base"></i>
          <span class="text-[13px] leading-snug">Sessão encerrada com sucesso.</span>
        </div>
      </transition>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import SidebarMenu, { type SectionInfo } from '../components/SidebarMenu.vue'
import Dialog from 'primevue/dialog'

// ===== lista de seções do menu =====
const sections: SectionInfo[] = [
  {
    key: 'privacidade',
    label: 'Privacidade',
    desc: 'Controle quem pode ver suas coisas',
    icon: 'pi-lock',
    route: '/settings/privacidade',
  },
  {
    key: 'status',
    label: 'Status da conta',
    desc: 'Alertas e restrições',
    icon: 'pi-info-circle',
    route: '/settings/status',
  },
  {
    key: 'conta',
    label: 'Conta',
    desc: 'Senha, e-mail e segurança',
    icon: 'pi-user',
    route: '/settings/conta',
  },
  {
    key: 'ajuda',
    label: 'Ajuda',
    desc: 'Central de suporte',
    icon: 'pi-question-circle',
    route: '/settings/ajuda',
  },
]

// na tela /settings não tem seção ativa ainda
const activeSection = ''

// ===== ESTADO DO LOGOUT (mesma lógica usada na SettingsSectionView) =====
const showLogoutModal = ref(false)
const showLogoutToast = ref(false)

let toastTimer: number | null = null

function openLogoutModal() {
  showLogoutModal.value = true
}

function cancelLogout() {
  showLogoutModal.value = false
}

function confirmLogout() {
  // mock de logout
  localStorage.removeItem('auth_token')

  showLogoutModal.value = false
  triggerLogoutToast()
}

function triggerLogoutToast() {
  showLogoutToast.value = true

  if (toastTimer) clearTimeout(toastTimer)

  toastTimer = window.setTimeout(() => {
    showLogoutToast.value = false
  }, 3000)
}
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity .18s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
