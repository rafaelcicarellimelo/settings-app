<template>
  <!-- Transição suave entre páginas -->
  <transition name="fade" mode="out-in">
    <router-view />
  </transition>

  <!-- Componentes globais -->
  <GlobalDialogs />
</template>

<script setup lang="ts">
import GlobalDialogs from './components/GlobalDialogs.vue'
import './assets/transitions.css'
</script>

<style>
/* Fallback caso o arquivo transitions.css não seja carregado */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.25s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
