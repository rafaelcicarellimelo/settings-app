import type { Meta, StoryObj } from '@storybook/vue3'
import SettingsSectionView from '../components/SettingsSectionView.vue'

const meta: Meta<typeof SettingsSectionView> = {
  title: 'Telas/SettingsSectionView',
  component: SettingsSectionView,
  parameters: {
    layout: 'fullscreen',
  },
}

export default meta
type Story = StoryObj<typeof SettingsSectionView>

export const Privacidade: Story = {
  args: {
    activeSection: 'privacidade',
  },
}

export const Conta: Story = {
  args: {
    activeSection: 'conta',
  },
}

export const Ajuda: Story = {
  args: {
    activeSection: 'ajuda',
  },
}
