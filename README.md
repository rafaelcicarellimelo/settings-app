# Frontend Vue - Rafael Melo

# Settings App

Aplicação de configurações de conta desenvolvida em Vue 3 com foco em UX mobile-first, acessibilidade e arquitetura limpa.  
O projeto inclui temas claro/escuro persistentes, rotas dinâmicas, modal de confirmação de logout, consumo de API com TanStack Query, documentação de componentes em Storybook, suporte a PWA e animações/transições suaves na navegação.

---

## ✨ Visão Geral

Este projeto simula a área de "Configurações" de um sistema moderno (ex: app de conta/perfil).  
Ele foi desenvolvido para ser responsivo, instalável como app (PWA) e fácil de manter/escalar.

Principais objetivos:
- Demonstrar domínio de Vue 3 + Vite + TypeScript
- Implementar um fluxo de configurações com múltiplas subpáginas
- Aplicar PrimeVue com tema claro/escuro e boa aparência
- Usar padrões modernos (TanStack Query, composables, Storybook)
- Cuidar de UX mobile/desktop
- Garantir qualidade de build e distribuição

---

## ✅ Funcionalidades Implementadas

### 1. Configuração inicial
- Projeto criado em **Vue 3 + Vite**
- **TypeScript** habilitado e utilizado com tipagem explícita (props, emits, interfaces)
- **Tailwind CSS** configurado com `darkMode: 'class'`
- **PrimeVue** configurado globalmente, com suporte a temas claro/escuro
- **PWA** configurado com `vite-plugin-pwa`, manifest e service worker gerado em build

### 2. Sistema de Rotas (Vue Router)
- `/settings` → tela principal de configurações com menu lateral/lista de opções
- `/settings/:submenu` → páginas específicas (ex: `/settings/privacidade`, `/settings/conta`, etc.)
- Desktop:
  - O menu permanece visível na lateral
  - O conteúdo da subpágina muda conforme a rota
- Mobile:
  - `/settings` exibe apenas o menu
  - Ao tocar em um item, navega para `/settings/:submenu`
  - A subpágina é exibida em tela cheia
  - Ícone "voltar" no canto superior para retornar ao menu
- Transições suaves entre rotas (animações de entrada/saída otimizadas)

### 3. Logout
- Item “Sair”/“Logout” presente no menu
- Ação abre um modal de confirmação

### 4. Modal de Confirmação (PrimeVue DynamicDialog)
- Mensagem: “Tem certeza que deseja sair?”
- Botões:
  - “Cancelar”
  - “Confirmar”
- Fluxo de confirmação implementado (ex.: `console.log("logout confirmado")`)

### 5. Conteúdo das Subpáginas
- Cada subpágina tem título correspondente ao item selecionado
- Cada subpágina exibe conteúdo próprio
- Uso de componentes PrimeVue, como `Card`, `Panel`, `InputSwitch`, etc.

### 6. Tema Claro/Escuro
- Toggle de tema implementado
- Suporte a temas PrimeVue (ex.: Aura / Lara Light e Dark)
- Preferência do usuário persistida em `localStorage`
- Classe `dark` aplicada no `<html>` para integração direta com Tailwind

### 7. TanStack Query
- Integração com **TanStack Query**
- Pelo menos uma requisição simulada para dados de perfil/configurações do usuário
- Uso de composable específico para encapsular lógica de busca
- Tratamento de estado (`loading`, `error`, `data`) de forma reativa

### 8. Storybook
- Storybook configurado
- Testes integrados com `@storybook/addon-vitest`
- Pelo menos 3 componentes do projeto documentados com variações de estado
  - Ex.: componentes de layout, botão de ação, seções de configuração

### 9. UI / UX
- Layout responsivo (mobile-first e desktop refinado)
- Aparência moderna usando Tailwind + PrimeVue
- Atenção a hierarquia visual, espaçamento, tipografia e contraste
- Interações com microanimações/transições suaves
- Ícones consistentes e acessíveis



---

## 🧱 Stack Técnica

- **Vue 3**
- **Vite**
- **TypeScript**
- **Vue Router**
- **Tailwind CSS**
- **PrimeVue**
- **TanStack Query**
- **Storybook**
- **Vitest + @storybook/addon-vitest + Playwright**
- **vite-plugin-pwa**

---

🌗 Tema Claro / Escuro

O app fornece um toggle visual para alternar entre tema claro e escuro.

Integração:

Tailwind usa darkMode: 'class'

PrimeVue troca o tema entre versões claras e escuras

A escolha do usuário é salva em localStorage, então ao recarregar o app ele mantém o último tema.

🔄 Comportamento de Rotas

/settings

Lista todas as opções de configurações (Privacidade, Conta, Ajuda, etc.)

Exibe também a opção “Sair”

/settings/:submenu

Exibe o conteúdo daquela seção (por ex. privacidade)

No desktop: menu lateral continua visível

No mobile: mostra apenas o conteúdo da subpágina com um botão de “voltar” no topo para retornar ao menu

As navegações entre rotas usam transições suaves para dar sensação de app nativo.

📡 TanStack Query

Configurado no projeto para gerenciar fetch de dados reativos.

Existe um composable (por exemplo useUserSettings.ts) que:

Usa useQuery para buscar dados mockados de perfil/configurações

Expõe data, isLoading, isError

Permite simular chamadas assíncronas reais

Essa abordagem já demonstra desacoplamento de lógica de dados da camada de UI.

📘 Storybook

Storybook configurado com suporte ao Vue 3.

Integração com @storybook/addon-vitest e Playwright para testes visuais/funcionais.

Pelo menos 3 componentes do app foram catalogados no Storybook com variações de estado (por exemplo: tema claro vs escuro, ligado/desligado, ativo/inativo etc.).

Isso garante documentação visual e facilita revisão de UI isolada.

🧪 Qualidade e Boas Práticas

Tipagem forte em props e emits usando TypeScript

Componentes reutilizáveis para seções de configurações

Separação clara entre:

Layout e apresentação (componentes Vue)

Lógica de dados (TanStack Query / composables)

Infraestrutura (plugins, tema, PWA)

Tratamento básico de erro de requisição no composable de dados

Build de produção sem erros

Sem erros de console no preview de produção




🛠 Instalação e Execução

1. Clonar o repositório
git clone https://github.com/rafaelcicarellimelo/settings-app.git
cd settings-app

2. Instalar dependências
npm install

3. Rodar em modo desenvolvimento (hot reload)
npm run dev


Isso inicia o Vite em modo dev (geralmente em http://localhost:5173).

4. Rodar Storybook
npm run storybook


Isso sobe o Storybook com os componentes documentados, incluindo variações de estado.

5. Rodar testes (Vitest + Playwright integrados ao Storybook)
npm run test

📦 Build de Produção

Gerar os arquivos otimizados (bundle final):

npm run build


