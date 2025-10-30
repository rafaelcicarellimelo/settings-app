<template>
    <div class="p-4">
      <p class="text-sm mb-6" style="color:var(--text-color)">
        Tem certeza que deseja sair?
      </p>
  
      <div class="flex justify-end gap-3">
        <button
          @click="onCancel"
          class="px-3 py-2 rounded-lg border border-[color:var(--border-color)]
                 bg-surface hover:bg-surface-soft text-sm font-medium"
          style="color:var(--text-color)"
        >
          Cancelar
        </button>
  
        <button
          @click="onConfirm"
          class="px-3 py-2 rounded-lg text-sm font-medium text-white bg-red-500 hover:bg-red-600"
        >
          Confirmar
        </button>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { useDialog } from 'primevue/usedialog'
  
  const dialogRef = useDialog()
  
  function onCancel() {
    dialogRef.close()
  }
  
  function onConfirm() {
    console.log('✅ Logout confirmado - aqui você faria o fluxo de logout real')
    dialogRef.close()
  }
  </script>
  