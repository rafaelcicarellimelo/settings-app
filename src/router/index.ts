import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'

import SettingsView from '../views/SettingsView.vue'
import SubSettingsView from '../views/SubSettingsView.vue'

/**
 * Rotas:
 * /settings               -> tela principal com menu lateral
 * /settings/:submenu      -> ex: /settings/privacidade
 */
const routes: RouteRecordRaw[] = [
  {
    path: '/settings',
    name: 'settings',
    component: SettingsView,
  },
  {
    path: '/settings/:submenu',
    name: 'settings-sub',
    component: SubSettingsView,
    props: true, 
  },
  {
    
    path: '/:pathMatch(.*)*',
    redirect: '/settings',
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
