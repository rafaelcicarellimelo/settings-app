<template>
  <transition name="fade" mode="out-in">
    <div
      class="min-h-screen bg-[var(--bg-body)] text-[var(--text-color)] p-4 md:p-8"
      :key="activeSection"
    >
      <div
        class="max-w-5xl mx-auto w-full
               bg-[var(--surface-color)]
               border border-[color:var(--border-color)]
               rounded-xl shadow-sm
               flex flex-col md:flex-row relative overflow-hidden"
      >
        <!-- SIDEBAR DESKTOP -->
        <aside
          class="hidden md:flex md:flex-col md:w-64 md:border-r
                 border-[color:var(--border-color)]
                 p-4 gap-4 flex-shrink-0"
        >
          <SidebarMenu
            :sections="sections"
            :activeSection="activeSection"
            @logout="openLogoutModal"
            @navigate="() => {}"
          />
        </aside>

        <!-- MOBILE -->
        <section v-if="isRootMobile" class="md:hidden flex-1 p-4">
          <SidebarMenu
            :sections="sections"
            :activeSection="activeSection"
            mobile
            @navigate="navigateTo"
            @logout="openLogoutModal"
          />
        </section>

        <!-- CONTEÚDO PRINCIPAL -->
        <section v-else class="flex-1 p-4 md:p-6 relative w-full">
          <!-- HEADER -->
          <header
            class="mb-4 flex items-start md:items-center justify-between flex-col md:flex-row gap-4"
          >
            <div class="flex items-center gap-3 w-full md:w-auto">
              <!-- Voltar (mobile) -->
              <button
                v-if="isMobile"
                class="md:hidden p-2 rounded-lg border border-[color:var(--border-color)]
                       bg-[var(--surface-color)] hover:bg-[var(--surface-soft-color)]
                       transition-colors"
                @click="goBack"
              >
                <i class="pi pi-arrow-left text-base" :style="{ color: 'var(--text-color)' }"></i>
              </button>

              <div class="flex items-start gap-2">
                <i :class="['pi', currentSectionIcon, 'text-base']" />
                <div class="flex flex-col">
                  <span class="text-base font-semibold" :style="{ color: 'var(--text-color)' }">
                    {{ currentSectionTitle }}
                  </span>
                  <span
                    class="text-[11px] leading-snug md:hidden"
                    :style="{ color: 'var(--text-mute-color)' }"
                  >
                    {{ currentSectionSubtitle }}
                  </span>
                </div>
              </div>
            </div>

            <div class="flex items-center gap-3 w-full md:w-auto justify-between md:justify-end">
              <ThemeToggle />
            </div>
          </header>

          <!-- LISTA DE ITENS -->
          <ul
            class="bg-[var(--surface-color)]
                   border border-[color:var(--border-color)]
                   rounded-xl overflow-hidden text-sm"
          >
            <li
              v-for="(item, idx) in items"
              :key="item.title + idx"
              class="flex items-start gap-3 px-4 py-3 relative"
              :class="{
                'border-b border-[color:var(--border-color)]': idx !== items.length - 1
              }"
            >
              <i :class="['pi', item.icon, 'text-base mt-[2px]']" />

              <div class="flex-1">
                <div class="flex items-start justify-between gap-2">
                  <div class="font-medium text-[.95rem]" :style="{ color: 'var(--text-color)' }">
                    {{ item.title }}
                  </div>

                  <div class="flex items-center gap-2 flex-shrink-0">
                    <span
                      v-if="item.value && !item.switch"
                      class="text-xs whitespace-nowrap"
                      :style="{ color: 'var(--text-mute-color)' }"
                    >
                      {{ item.value }}
                    </span>

                    <label
                      v-if="item.switch"
                      class="relative inline-flex items-center cursor-pointer select-none"
                    >
                      <input type="checkbox" class="sr-only peer" v-model="item.enabled" />
                      <div
                        class="w-10 h-5 rounded-full border border-[color:var(--border-color)]
                               bg-[var(--surface-strong-color)] peer-checked:bg-brand
                               transition-colors"
                      ></div>
                      <div
                        class="absolute left-1 top-1 w-3.5 h-3.5 rounded-full bg-white
                               peer-checked:translate-x-5 transition-transform"
                      ></div>
                    </label>
                  </div>
                </div>

                <div
                  v-if="item.desc"
                  class="text-[11px] leading-snug mt-1"
                  :style="{ color: 'var(--text-mute-color)' }"
                >
                  {{ item.desc }}
                </div>
              </div>
            </li>
          </ul>
        </section>

        <!-- MODAL LOGOUT -->
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
                class="px-3 py-2 rounded-lg border border-[color:var(--border-color)]
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
      </div>

      <!-- TOAST DE LOGOUT (fora do container com overflow-hidden) -->
      <transition name="fade">
        <div
          v-if="showLogoutToast"
          class="fixed bottom-4 right-4 z-50
                 bg-[var(--surface-color)]
                 border border-[color:var(--border-color)]
                 rounded-lg shadow-lg px-4 py-3 text-sm flex items-center gap-2 max-w-[90%]"
          :style="{ color: 'var(--text-color)' }"
        >
          <i class="pi pi-check-circle text-green-500 text-base"></i>
          <span class="text-[13px] leading-snug">Sessão encerrada com sucesso.</span>
        </div>
      </transition>
    </div>
  </transition>
</template>

<script setup lang="ts">
import { computed, ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import Dialog from 'primevue/dialog'
import ThemeToggle from './ThemeToggle.vue'
import SidebarMenu, { type SectionInfo } from './SidebarMenu.vue'
import { useAccountStatusQuery } from '../composables/useAccountStatusQuery'

const props = defineProps<{ activeSection: string }>()
const router = useRouter()
const route = useRoute()

const isMobile = ref(false)
const showLogoutModal = ref(false)
const showLogoutToast = ref(false)
let toastTimer: number | null = null

onMounted(() => {
  const checkMobile = () => {
    isMobile.value = window.innerWidth < 768
  }
  checkMobile()
  window.addEventListener('resize', checkMobile)
})

const isRootMobile = computed(() => {
  return isMobile.value && route.path === '/settings'
})

function navigateTo() {
  // apenas para satisfazer o @navigate emitido no SidebarMenu no mobile
}

function goBack() {
  router.push('/settings')
}

function openLogoutModal() {
  showLogoutModal.value = true
}
function cancelLogout() {
  showLogoutModal.value = false
}
function confirmLogout() {
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

/* ===== Tipagens ===== */
interface SettingsItem {
  icon: string
  title: string
  desc?: string
  value?: string
  switch?: boolean
  enabled?: boolean
}

interface SectionData {
  title: string
  subtitle: string
  icon: string
  items: SettingsItem[]
}

/* ===== Menu lateral ===== */
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

/* ===== TanStack Query ===== */
const { data, isLoading, isError } = useAccountStatusQuery()

const statusSectionComputed = computed<SectionData>(() => {
  if (isLoading.value) {
    return {
      title: 'Status da conta',
      subtitle: 'Alertas e restrições',
      icon: 'pi-info-circle',
      items: [
        {
          icon: 'pi-shield',
          title: 'Carregando...',
          desc: 'Buscando verificação de segurança',
        },
      ],
    }
  }

  if (isError.value || !data.value) {
    return {
      title: 'Status da conta',
      subtitle: 'Alertas e restrições',
      icon: 'pi-info-circle',
      items: [
        {
          icon: 'pi-exclamation-triangle',
          title: 'Erro ao carregar',
          desc: 'Não foi possível carregar agora.',
        },
        {
          icon: 'pi-bell',
          title: 'Alertas recentes',
          value: '—',
        },
      ],
    }
  }

  return {
    title: 'Status da conta',
    subtitle: 'Alertas e restrições',
    icon: 'pi-info-circle',
    items: [
      {
        icon: 'pi-shield',
        title: 'Verificação de segurança',
        desc: data.value.security,
      },
      {
        icon: 'pi-bell',
        title: 'Alertas recentes',
        value: String(data.value.alerts),
      },
    ],
  }
})

/* ===== Seções estáticas ===== */
const staticSections: Record<string, SectionData> = {
  privacidade: {
    title: 'Privacidade',
    subtitle: 'Controle quem pode ver suas coisas',
    icon: 'pi-lock',
    items: [
      {
        icon: 'pi-lock',
        title: 'Perfil privado',
        desc: 'Apenas pessoas aprovadas podem ver suas atividades.',
        switch: true,
        enabled: true,
      },
      {
        icon: 'pi-at',
        title: 'Marcações e menções',
        desc: 'Controle quem pode marcar você.',
      },
      {
        icon: 'pi-eye',
        title: 'Status online',
        desc: 'Mostra quando você está ativo(a).',
        value: 'Ninguém',
      },
    ],
  },

  conta: {
    title: 'Conta',
    subtitle: 'Senha, e-mail e segurança',
    icon: 'pi-user',
    items: [
      {
        icon: 'pi-envelope',
        title: 'E-mail',
        desc: 'email@exemplo.com',
      },
      {
        icon: 'pi-key',
        title: 'Alterar senha',
      },
      {
        icon: 'pi-mobile',
        title: 'Dispositivos conectados',
      },
    ],
  },

  ajuda: {
    title: 'Ajuda',
    subtitle: 'Central de suporte',
    icon: 'pi-question-circle',
    items: [
      {
        icon: 'pi-book',
        title: 'Central de ajuda',
      },
      {
        icon: 'pi-exclamation-triangle',
        title: 'Reportar um problema',
      },
    ],
  },
}

/* ===== Mapa final de seções ===== */
const allSectionContent = computed<Record<string, SectionData>>(() => {
  return {
    ...staticSections,
    status: statusSectionComputed.value,
  }
})

/* helper garante retorno SEMPRE válido */
function getSectionData(sectionKey: string): SectionData {
  const found = allSectionContent.value[sectionKey]
  if (found) {
    return found
  }

  return allSectionContent.value['privacidade'] as SectionData
}

/* ===== Seção atual ===== */
const current = computed<SectionData>(() => {
  return getSectionData(props.activeSection)
})

const currentSectionTitle = computed(() => current.value.title)
const currentSectionSubtitle = computed(() => current.value.subtitle)
const currentSectionIcon = computed(() => current.value.icon)
const items = computed(() => current.value.items)
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.25s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
