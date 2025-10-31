import type { Meta, StoryObj } from '@storybook/vue3'
import ThemeToggle from '../components/ThemeToggle.vue'

const meta: Meta<typeof ThemeToggle> = {
  title: 'Componentes/ThemeToggle',
  component: ThemeToggle,
  parameters: {
    layout: 'centered',
  },
}

export default meta
type Story = StoryObj<typeof ThemeToggle>

export const Claro: Story = {
  args: {},
  parameters: {
    backgrounds: { default: 'light' },
  },
}

export const Escuro: Story = {
  args: {},
  parameters: {
    backgrounds: { default: 'dark' },
  },
}
