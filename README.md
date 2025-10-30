# Frontend Vue.js - Rafael Melo

Este repositório implementa o desafio técnico solicitado:
- Vue 3 + Vite + TypeScript
- Vue Router
- PrimeVue + PrimeIcons
- Tailwind CSS
- Tema claro/escuro com persistência
- TanStack Query (Vue Query)
- Storybook para documentação de componentes

## 🧱 Arquitetura

- `src/router` → rotas da aplicação (`/settings`, `/settings/:submenu`)
- `src/views` → páginas (SettingsView, SubSettingsView)
- `src/components` → componentes reutilizáveis (ThemeToggle, ConfirmLogoutDialog)
- `src/composables` → lógica reutilizável (ex: controle de tema)
- `src/plugins` → configuração de bibliotecas externas (PrimeVue)
- `src/styles` → estilos globais (Tailwind + variáveis de tema)

## 📱 Funcionalidades implementadas

### Rotas e navegação
- `/settings`: tela principal de configurações com menu lateral.
- `/settings/:submenu`: subpágina (ex: `/settings/conta`, `/settings/privacidade`).

Comportamento responsivo:
- Desktop: menu lateral sempre visível.
- Mobile: `/settings` mostra apenas o menu, `/settings/:submenu` mostra apenas o conteúdo + botão "Voltar".
  

### Logout com confirmação
- Botão "Sair" abre um `DynamicDialog` (PrimeVue DialogService)
- Pergunta "Tem certeza que deseja sair?"
- Botões "Cancelar" e "Confirmar"
- Ação de confirmar faz `console.log(...)`
  

### Tema claro/escuro
- Toggle de tema usando o componente `ThemeToggle.vue`
- Preferência salva em `localStorage`
- Classe `dark` aplicada no `<html>`
- Tailwind configurado com `darkMode: 'class'`
- Variáveis CSS controlam cores no claro/escuro


### TanStack Query
- Projeto já configura um `QueryClient` global no `main.ts`
- A aplicação está pronta para usar `useQuery` e simular requisições
  (ex.: buscar dados de perfil do usuário)



### Storybook
- Storybook inicializado para documentar componentes

## 🚀 Como rodar o projeto

### 1. Instalar dependências
```bash
npm install
