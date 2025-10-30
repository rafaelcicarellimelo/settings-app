<template>
  <button
    @click="toggleTheme"
    class="flex items-center gap-2 px-3 py-2 rounded-lg border text-sm font-medium
           bg-surface border-[color:var(--border-color)]
           hover:bg-surface-soft transition-colors"
  >
    <i
      v-if="!isDark"
      class="pi pi-moon textcolor text-base"
      aria-hidden="true"
    />
    <i
      v-else
      class="pi pi-sun text-yellow-300 text-base"
      aria-hidden="true"
    />
    <span class="textcolor">
      {{ isDark ? 'Modo escuro' : 'Modo claro' }}
    </span>
  </button>
</template>

<script setup lang="ts">
import { useTheme } from '../composables/useTheme'

const { isDark, toggleTheme } = useTheme()
</script>

<style scoped>
.textcolor {
  color: var(--text-color);
}
</style>
