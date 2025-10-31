import type { Meta, StoryObj } from '@storybook/vue3'
import SidebarMenu from '../components/SidebarMenu.vue'

// 🔹 Define o tipo localmente (mesmo do SidebarMenu.vue)
interface SectionInfo {
  key: string
  label: string
  desc: string
  icon: string
  route: string
}

const meta: Meta<typeof SidebarMenu> = {
  title: 'Componentes/SidebarMenu',
  component: SidebarMenu,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    activeSection: {
      control: 'text',
    },
  },
}

export default meta
type Story = StoryObj<typeof SidebarMenu>

const sections: SectionInfo[] = [
  { key: 'privacidade', label: 'Privacidade', desc: 'Controle de visibilidade', icon: 'pi-lock', route: '/settings/privacidade' },
  { key: 'conta', label: 'Conta', desc: 'Senha e e-mail', icon: 'pi-user', route: '/settings/conta' },
  { key: 'ajuda', label: 'Ajuda', desc: 'Central de suporte', icon: 'pi-question-circle', route: '/settings/ajuda' },
]

export const Padrão: Story = {
  args: {
    sections,
    activeSection: 'privacidade',
  },
}

export const Mobile: Story = {
  args: {
    sections,
    activeSection: 'conta',
    mobile: true,
  },
}
