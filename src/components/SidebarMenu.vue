<template>
  <div class="flex flex-col gap-4 flex-1 w-full">
    <ul class="flex flex-col text-sm">
      <li v-for="section in sections" :key="section.key">
        <router-link
          :to="section.route"
          class="flex items-start gap-2 w-full px-3 py-2 rounded-lg transition-colors
                 hover:bg-[var(--surface-soft-color)]"
          :class="{
            'bg-[var(--surface-soft-color)] border border-[var(--border-color)]':
              section.key === activeSection
          }"
          @click="handleNavigate"
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

    <div class="border-t border-[var(--border-color)] pt-4 mt-auto text-sm">
      <button
        @click="handleLogout"
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

    <footer
      class="text-[10px] text-right"
      :style="{ color: 'var(--text-mute-color)' }"
    >
      v0.1.0
    </footer>
  </div>
</template>

<script setup lang="ts">
export interface SectionInfo {
  key: string
  label: string
  desc: string
  icon: string
  route: string
}

defineProps<{
  sections: SectionInfo[]
  activeSection: string
  mobile?: boolean
}>()

const emit = defineEmits<{
  (e: 'navigate'): void
  (e: 'logout'): void
}>()

function handleNavigate() {
  emit('navigate')
}

function handleLogout() {
  emit('logout')
}
</script>
