import type { Meta, StoryObj } from '@storybook/vue3';
import SidebarMenu from './SidebarMenu.vue';

interface SectionInfo {
  key: string;
  label: string;
  desc: string;
  icon: string;
  route: string;
}

const demoSections: SectionInfo[] = [
  {
    key: 'privacidade',
    label: 'Privacidade',
    desc: 'Controle quem pode ver suas coisas',
    icon: 'pi-lock',
    route: '/settings/privacidade',
  },
  {
    key: 'status',
    label: 'Status da conta',
    desc: 'Alertas e restrições',
    icon: 'pi-info-circle',
    route: '/settings/status',
  },
  {
    key: 'conta',
    label: 'Conta',
    desc: 'Senha, e-mail e segurança',
    icon: 'pi-user',
    route: '/settings/conta',
  },
  {
    key: 'ajuda',
    label: 'Ajuda',
    desc: 'Central de suporte',
    icon: 'pi-question-circle',
    route: '/settings/ajuda',
  },
];

const meta: Meta<typeof SidebarMenu> = {
  title: 'Config/SidebarMenu',
  component: SidebarMenu,
  tags: ['autodocs'],

  argTypes: {
    activeSection: {
      control: 'text',
      description: 'Qual seção está ativa/selecionada',
    },
    mobile: {
      control: 'boolean',
      description: 'Render em contexto mobile (apenas informativo)',
    },
    sections: {
      control: 'object',
      description: 'Lista de seções exibidas no menu',
    },
    onNavigate: { action: 'navigate (user clicked item)' },
    onLogout: { action: 'logout (user clicked sair)' },
  },
};
export default meta;

type Story = StoryObj<typeof SidebarMenu>;

export const Default: Story = {
  args: {
    sections: demoSections,
    activeSection: 'privacidade',
    mobile: false,
  },
};

export const ContaAtiva: Story = {
  args: {
    sections: demoSections,
    activeSection: 'conta',
    mobile: false,
  },
};

export const MobileDrawer: Story = {
  args: {
    sections: demoSections,
    activeSection: 'status',
    mobile: true,
  },
};
