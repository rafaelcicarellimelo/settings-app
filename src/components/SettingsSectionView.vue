<template>
  <div class="min-h-screen bg-[var(--bg-body)] text-[var(--text-color)] p-4 md:p-8">
    <div
      class="max-w-5xl mx-auto w-full
             bg-[var(--surface-color)]
             border border-[var(--border-color)]
             rounded-xl shadow-sm
             flex flex-col md:flex-row relative overflow-hidden"
    >
      <!-- OVERLAY mobile -->
      <div
        v-if="showMobileMenu"
        class="fixed inset-0 bg-black/50 z-40 md:hidden"
        @click="closeMobileMenu"
      ></div>

      <!-- SIDEBAR DESKTOP -->
      <aside
        class="hidden md:flex md:flex-col md:w-64 md:border-r
               border-[var(--border-color)]
               p-4 gap-4 flex-shrink-0"
      >
        <SidebarMenu
          :sections="sections"
          :activeSection="activeSection"
          @logout="openLogoutModal"
          @navigate="() => {}"
        />
      </aside>

      <!-- SIDEBAR MOBILE (drawer) -->
      <aside
        class="md:hidden fixed top-0 left-0 h-full w-64 max-w-[80%] z-50
               bg-[var(--surface-color)]
               border-r border-[var(--border-color)]
               shadow-xl flex flex-col p-4 gap-4
               transition-transform duration-200"
        :class="showMobileMenu ? 'translate-x-0' : '-translate-x-full'"
      >
        <div class="flex items-center justify-between mb-2">
          <div class="text-xs font-semibold tracking-wide uppercase"
               :style="{ color: 'var(--text-mute-color)' }">
            Configurações
          </div>

          <button
            class="p-2 rounded-lg hover:bg-[var(--surface-soft-color)]"
            @click="closeMobileMenu"
          >
            <i class="pi pi-times text-base" :style="{ color: 'var(--text-color)' }"></i>
          </button>
        </div>

        <SidebarMenu
          :sections="sections"
          :activeSection="activeSection"
          mobile
          @navigate="closeMobileMenu"
          @logout="() => { closeMobileMenu(); openLogoutModal(); }"
        />
      </aside>

      <!-- CONTEÚDO PRINCIPAL -->
      <section class="flex-1 p-4 md:p-6 relative w-full">
        <!-- HEADER -->
        <header
          class="mb-4 flex items-start md:items-center justify-between flex-col md:flex-row gap-4"
        >
          <div class="flex items-center gap-3 w-full md:w-auto">
            <!-- Botão mobile: voltar/menu -->
            <button
              class="md:hidden p-2 rounded-lg border border-[var(--border-color)]
                     bg-[var(--surface-color)] hover:bg-[var(--surface-soft-color)]
                     transition-colors"
              @click="handleMobileHeaderAction"
              :aria-label="mobileHeaderAriaLabel"
            >
              <i
                :class="['pi', mobileHeaderIconClass, 'text-base']"
                :style="{ color: 'var(--text-color)' }"
              ></i>
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
                 border border-[var(--border-color)]
                 rounded-xl overflow-hidden text-sm"
        >
          <li
            v-for="(item, idx) in items"
            :key="item.title + idx"
            class="flex items-start gap-3 px-4 py-3 relative"
            :class="{
              'border-b border-[var(--border-color)]': idx !== items.length - 1
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
                      class="w-10 h-5 rounded-full border border-[var(--border-color)]
                             bg-[var(--surface-strong-color)] peer-checked:bg-brand
                             transition-colors"
                    ></div>
                    <div
                      class="absolute left-1 top-1 w-3.5 h-3.5 rounded-full bg-white
                             peer-checked:translate-x-5 transition-transform"
                    ></div>
                  </label>

                  <i
                    v-if="item.chevron"
                    class="pi pi-angle-right text-xs"
                    :style="{ color: 'var(--text-mute-color)' }"
                  />
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

        <!-- BLOCO EXTRA -->
        <div
          v-if="extraBlock"
          class="mt-6 text-[11px]"
          :style="{ color: 'var(--text-mute-color)' }"
        >
          <div class="font-semibold text-[12px]" :style="{ color: 'var(--text-color)' }">
            {{ extraBlock.title }}
          </div>
          <div class="mt-1 leading-snug">
            {{ extraBlock.description }}
          </div>

          <button
            v-if="extraBlock.action"
            class="flex items-start gap-2 w-full px-0 py-3 mt-3 rounded-lg text-left
                   hover:bg-[var(--surface-soft-color)] transition-colors
                   border border-transparent hover:border-[var(--border-color)]"
          >
            <i class="pi pi-eye-slash text-base" />
            <div class="flex-1">
              <div class="font-medium" :style="{ color: 'var(--text-color)' }">
                {{ extraBlock.action.title }}
              </div>
            </div>
            <i class="pi pi-external-link text-xs" :style="{ color: 'var(--text-mute-color)' }" />
          </button>
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
import { computed, reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import Dialog from 'primevue/dialog'
import ThemeToggle from './ThemeToggle.vue'
import SidebarMenu, { type SectionInfo } from './SidebarMenu.vue'
import { useAccountStatusQuery } from '../composables/useAccountStatusQuery'

const props = defineProps<{
  activeSection: string
}>()

const router = useRouter()

/* =========================
   ESTADOS DE UI / LOGOUT
   ========================= */
const showLogoutModal = ref(false)
const showLogoutToast = ref(false)
const showMobileMenu = ref(false)

let toastTimer: number | null = null

function toggleMobileMenu() {
  showMobileMenu.value = !showMobileMenu.value
}
function closeMobileMenu() {
  showMobileMenu.value = false
}

const mobileHeaderIconClass = computed(() =>
  props.activeSection ? 'pi-arrow-left' : 'pi-bars'
)
const mobileHeaderAriaLabel = computed(() =>
  props.activeSection ? 'Voltar para o menu de configurações' : 'Abrir menu de configurações'
)
function handleMobileHeaderAction() {
  if (props.activeSection) {
    router.push('/settings')
    return
  }
  toggleMobileMenu()
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
  showMobileMenu.value = false
  triggerLogoutToast()
}
function triggerLogoutToast() {
  showLogoutToast.value = true
  if (toastTimer) clearTimeout(toastTimer)
  toastTimer = window.setTimeout(() => {
    showLogoutToast.value = false
  }, 3000)
}

/* =========================
   TIPAGENS
   ========================= */
interface SettingsItem {
  icon: string
  title: string
  desc?: string
  chevron?: boolean
  value?: string
  switch?: boolean
  enabled?: boolean
}

interface ExtraBlock {
  title: string
  description: string
  action?: {
    title: string
  }
}

/**
 * Cada seção (privacidade, conta, ajuda, status)
 */
interface SectionContent {
  title: string
  subtitle?: string
  icon: string
  items: SettingsItem[]
  extraBlock?: ExtraBlock
}

/**
 * Slugs válidos das rotas
 */
type SectionKey = 'privacidade' | 'status' | 'conta' | 'ajuda'

type SectionContentMap = Record<SectionKey, SectionContent>

/* =========================
   MENU LATERAL
   ========================= */
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

/* =========================
   TANSTACK QUERY
   ========================= */
const { data, isLoading, isError } = useAccountStatusQuery()

const statusSectionComputed = computed<SectionContent>(() => {
  if (isLoading.value) {
    return {
      title: 'Status da conta',
      subtitle: 'Alertas e restrições',
      icon: 'pi-info-circle',
      items: [
        {
          icon: 'pi-shield',
          title: 'Verificação de segurança',
          desc: 'Carregando...',
        },
        {
          icon: 'pi-bell',
          title: 'Alertas recentes',
          value: '...',
          chevron: false,
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
          icon: 'pi-shield',
          title: 'Verificação de segurança',
          desc: 'Não foi possível carregar agora.',
        },
        {
          icon: 'pi-bell',
          title: 'Alertas recentes',
          value: '—',
          chevron: false,
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
        chevron: true,
      },
    ],
  }
})

/* =========================
   SEÇÕES ESTÁTICAS
   ========================= */
const allSectionContentBase = reactive<Omit<SectionContentMap, 'status'>>({
  privacidade: {
    title: 'Privacidade',
    subtitle: 'Controle quem pode ver suas coisas',
    icon: 'pi-lock',
    items: reactive<SettingsItem[]>([
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
        chevron: true,
      },
      {
        icon: 'pi-eye',
        title: 'Status online',
        desc: 'Mostra quando você está ativo(a).',
        value: 'Ninguém',
        chevron: true,
      },
      {
        icon: 'pi-user-minus',
        title: 'Perfis restritos',
        chevron: true,
      },
      {
        icon: 'pi-ban',
        title: 'Perfis bloqueados',
        chevron: true,
      },
      {
        icon: 'pi-volume-off',
        title: 'Palavras ocultas',
        chevron: true,
      },
    ]),
    extraBlock: {
      title: 'Outras configurações de privacidade',
      description:
        'Algumas configurações, como as de restrição, se aplicam a outros serviços e podem ser gerenciadas lá.',
      action: {
        title: 'Ocultar número de curtidas e compartilhamentos',
      },
    },
  },

  conta: {
    title: 'Conta',
    subtitle: 'Senha, e-mail e segurança',
    icon: 'pi-user',
    items: reactive<SettingsItem[]>([
      {
        icon: 'pi-envelope',
        title: 'E-mail',
        desc: 'email@exemplo.com',
        chevron: true,
      },
      {
        icon: 'pi-key',
        title: 'Alterar senha',
        chevron: true,
      },
      {
        icon: 'pi-mobile',
        title: 'Dispositivos conectados',
        chevron: true,
      },
    ]),
  },

  ajuda: {
    title: 'Ajuda',
    subtitle: 'Central de suporte',
    icon: 'pi-question-circle',
    items: reactive<SettingsItem[]>([
      {
        icon: 'pi-book',
        title: 'Central de ajuda',
        chevron: true,
      },
      {
        icon: 'pi-exclamation-triangle',
        title: 'Reportar um problema',
        chevron: true,
      },
    ]),
  },
})

/* =========================
   MAPA FINAL DE SEÇÕES
   ========================= */
const allSectionContent = computed<SectionContentMap>(() => {
  return {
    ...allSectionContentBase,
    status: statusSectionComputed.value,
  }
})

/* =========================
   SEÇÃO ATUAL
   ========================= */
const currentKey = computed<SectionKey>(() => {
  const k = props.activeSection as SectionKey
  const validKeys: SectionKey[] = ['privacidade', 'status', 'conta', 'ajuda']
  return validKeys.includes(k) ? k : 'privacidade'
})

const current = computed<SectionContent>(() => {
  return allSectionContent.value[currentKey.value]
})

const currentSectionTitle = computed(() => current.value.title)
const currentSectionSubtitle = computed(() => current.value.subtitle ?? '')
const currentSectionIcon = computed(() => current.value.icon)
const items = computed(() => current.value.items)
const extraBlock = computed(() => current.value.extraBlock)
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.18s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
