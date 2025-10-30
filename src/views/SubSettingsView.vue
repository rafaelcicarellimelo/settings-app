<template>
    <SettingsSectionView :active-section="submenuNormalized" />
  </template>
  
  <script setup lang="ts">
  import { computed } from 'vue'
  import SettingsSectionView from '../components/SettingsSectionView.vue'
  
  interface Props {
    submenu: string
  }
  const props = defineProps<Props>()
  
  const submenuNormalized = computed(() => {
    const allowed = ['privacidade', 'conta', 'status', 'ajuda']
    return allowed.includes(props.submenu) ? props.submenu : 'privacidade'
  })
  </script>
  