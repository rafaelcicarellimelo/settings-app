<template>
    <div class="min-h-screen bg-[var(--bg-body)] text-[var(--text-color)] p-4 md:p-8">
      <div
        class="max-w-5xl mx-auto w-full
               bg-[var(--surface-color)]
               border border-[color:var(--border-color)]
               rounded-xl shadow-sm
               flex flex-col md:flex-row relative"
      >
        <!-- COLUNA ESQUERDA -->
        <aside
          class="w-full md:w-64 border-b md:border-b-0 md:border-r
                 border-[color:var(--border-color)]
                 p-4 flex flex-col gap-4"
        >
          <ul class="flex flex-col text-sm">
            <li
              v-for="section in sections"
              :key="section.key"
            >
              <router-link
                :to="section.route"
                class="flex items-start gap-2 w-full px-3 py-2 rounded-lg transition-colors
                       hover:bg-[var(--surface-soft-color)]"
                :class="{
                  'bg-[var(--surface-soft-color)] border border-[color:var(--border-color)]':
                    section.key === activeSection
                }"
              >
                <i :class="['pi', section.icon, 'text-base']" />
                <div class="flex-1">
                  <div class="font-medium" :style="{ color: 'var(--text-color)' }">
                    {{ section.label }}
                  </div>
                  <div class="text-[11px]" :style="{ color: 'var(--text-mute-color)' }">
                    {{ section.desc }}
                  </div>
                </div>
              </router-link>
            </li>
          </ul>
  
          <div class="border-t border-[color:var(--border-color)] pt-4 mt-auto text-sm">
            <button
              @click="openLogoutModal"
              class="flex items-start gap-2 w-full px-3 py-2 rounded-lg transition-colors
                     hover:bg-[var(--surface-soft-color)] text-left"
            >
              <i class="pi pi-sign-out text-base text-red-500" />
              <div class="flex-1">
                <div class="font-medium text-red-500">
                  Sair
                </div>
                <div class="text-[11px]" :style="{ color: 'var(--text-mute-color)' }">
                  Encerrar sessão atual
                </div>
              </div>
            </button>
          </div>
  
          <footer class="text-[10px] text-right" :style="{ color: 'var(--text-mute-color)' }">
            v0.1.0
          </footer>
        </aside>
  
        <!-- COLUNA DIREITA -->
        <section class="flex-1 p-4 md:p-6">
          <h1
            class="text-base font-semibold mb-4 flex flex-wrap items-center gap-3 justify-between"
            :style="{ color: 'var(--text-color)' }"
          >
            <span class="flex items-center gap-2">
              <i :class="['pi', currentSectionIcon, 'text-base']" />
              <span>{{ currentSectionTitle }}</span>
            </span>
  
            <ThemeToggle />
          </h1>
  
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
                'border-b border-[color:var(--border-color)]': idx !== items.length-1
              }"
            >
              <i :class="['pi', item.icon, 'text-base mt-[2px]']" />
  
              <div class="flex-1">
                <div class="flex items-center justify-between">
                  <div class="font-medium" :style="{ color: 'var(--text-color)' }">
                    {{ item.title }}
                  </div>
  
                  <div class="flex items-center gap-2">
                    <span
                      v-if="item.value && !item.switch"
                      class="text-xs"
                      :style="{ color: 'var(--text-mute-color)' }"
                    >
                      {{ item.value }}
                    </span>
  
                    <label
                      v-if="item.switch"
                      class="relative inline-flex items-center cursor-pointer select-none"
                    >
                      <input
                        type="checkbox"
                        class="sr-only peer"
                        v-model="item.enabled"
                      />
                      <div
                        class="w-10 h-5 rounded-full border border-[color:var(--border-color)]
                               bg-[var(--surface-strong-color)]
                               peer-checked:bg-brand
                               transition-colors"
                      ></div>
                      <div
                        class="absolute left-1 top-1 w-3.5 h-3.5 rounded-full bg-white
                               peer-checked:translate-x-5
                               transition-transform"
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
                     border border-transparent hover:border-[color:var(--border-color)]"
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
  
        <!-- MODAL DE LOGOUT (controle 100% local) -->
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
  
            <div class="flex justify-end gap-3">
              <button
                @click="cancelLogout"
                class="px-3 py-2 rounded-lg border border-[color:var(--border-color)]
                       bg-surface hover:bg-[var(--surface-soft-color)]
                       text-sm font-medium"
                :style="{ color: 'var(--text-color)' }"
              >
                Cancelar
              </button>
  
              <button
                @click="confirmLogout"
                class="px-3 py-2 rounded-lg text-sm font-medium text-white
                       bg-red-500 hover:bg-red-600"
              >
                Confirmar
              </button>
            </div>
          </div>
        </Dialog>
  
        <!-- Toast de logout -->
        <transition name="fade">
          <div
            v-if="showLogoutToast"
            class="fixed bottom-4 right-4 z-50
                   bg-[var(--surface-color)]
                   border border-[color:var(--border-color)]
                   rounded-lg shadow-lg px-4 py-3 text-sm flex items-center gap-2"
            :style="{ color: 'var(--text-color)' }"
          >
            <i class="pi pi-check-circle text-green-500 text-base"></i>
            <span>Sessão encerrada com sucesso.</span>
          </div>
        </transition>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { computed, reactive, ref } from 'vue'
  import Dialog from 'primevue/dialog'
  import ThemeToggle from './ThemeToggle.vue'
  
  const props = defineProps<{
    activeSection: string
  }>()
  
  /* estado do modal e do toast */
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
    // simula logout real
    localStorage.removeItem('auth_token')
    console.log('✅ Logout confirmado: sessão encerrada.')
  
    // fecha modal
    showLogoutModal.value = false
  
    // mostra toast
    triggerLogoutToast()
  }
  
  function triggerLogoutToast() {
    showLogoutToast.value = true
  
    if (toastTimer) {
      clearTimeout(toastTimer)
    }
  
    toastTimer = window.setTimeout(() => {
      showLogoutToast.value = false
    }, 3000)
  }
  
  /* tipos auxiliares */
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
  
  interface SectionInfo {
    key: string
    label: string
    desc: string
    icon: string
    route: string
  }
  
  /* menu lateral */
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
  
  /* conteúdo das seções */
  const allSectionContent: Record<
    string,
    {
      title: string
      icon: string
      items: SettingsItem[]
      extraBlock?: ExtraBlock
    }
  > = {
    privacidade: {
      title: 'Privacidade',
      icon: 'pi-lock',
      items: reactive([
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
      icon: 'pi-user',
      items: reactive([
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
  
    status: {
      title: 'Status da conta',
      icon: 'pi-info-circle',
      items: reactive([
        {
          icon: 'pi-shield',
          title: 'Verificação de segurança',
          desc: 'Nenhum problema encontrado.',
        },
        {
          icon: 'pi-bell',
          title: 'Alertas recentes',
          value: '0',
          chevron: true,
        },
      ]),
    },
  
    ajuda: {
      title: 'Ajuda',
      icon: 'pi-question-circle',
      items: reactive([
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
  }
  
  /* seção ativa */
  const current = computed(() => {
    return allSectionContent[props.activeSection] ?? allSectionContent['privacidade']
  })
  
  const currentSectionTitle = computed(() => current.value.title)
  const currentSectionIcon = computed(() => current.value.icon)
  const items = computed(() => current.value.items)
  const extraBlock = computed(() => current.value.extraBlock)
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
  