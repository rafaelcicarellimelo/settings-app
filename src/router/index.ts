import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'

import SettingsMenuOnlyView from '../views/SettingsMenuOnlyView.vue'
import SettingsSectionView from '../components/SettingsSectionView.vue'

const routes: RouteRecordRaw[] = [
  {
    path: '/settings',
    name: 'settings-root',
    component: SettingsMenuOnlyView,
  },
  {
    path: '/settings/:submenu',
    name: 'settings-section',
    component: SettingsSectionView,
    props: route => ({
      activeSection: route.params.submenu,
    }),
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
