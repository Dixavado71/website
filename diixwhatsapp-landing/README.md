# DIixWhatsApp — Landing Page Oficial

## 🚀 Plataforma SaaS para Gestão Empresarial via WhatsApp

**DIixWhatsApp** é uma plataforma completa para gestão empresarial, vendas, atendimento e automação através do WhatsApp.

![Status](https://img.shields.io/badge/status-em%20desenvolvimento-yellow)
![React](https://img.shields.io/badge/React-19.2.8-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-6.0.2-blue)
![Tailwind](https://img.shields.io/badge/Tailwind-3.4.19-38B2AC)

---

## 📋 Visão Geral

O DIixWhatsApp é uma plataforma **Multi-Tenant** que permite:

- 🏪 Criar e gerenciar lojas virtuais
- 📦 Cadastrar produtos
- 👥 Gerenciar clientes
- 📋 Receber e acompanhar pedidos
- 💬 Vender pelo WhatsApp
- 🤖 Automatizar atendimento

Cada tenant representa uma empresa independente com sua própria operação.

---

## 🎨 Design System

### Paleta de Cores

| Cor | Hex | Uso |
|-----|-----|-----|
| Background | `#050505` | Fundo principal |
| Surface | `#080B14` | Superfícies secundárias |
| Surface Alt | `#12161B` | Cards e painéis |
| Verde Neon | `#00FF88` | Ações principais |
| Ciano | `#00E5FF` | Detalhes tecnológicos |
| Roxo | `#7B61FF` | Elementos cyberpunk |
| Magenta | `#FF2ED1` | Destaques (Business) |

### Tipografia

- **Títulos:** Orbitron
- **Subtítulos:** Exo 2
- **Texto:** Inter

### Atmosfera

```
Dark SaaS + Cyberpunk + Neon + Tecnologia + WhatsApp + E-commerce
```

---

## 🏗️ Arquitetura Multi-Tenant

```
                    DIixWhatsApp
                          │
                    ADMINISTRADOR
                          │
          ┌───────────────┼───────────────┐
          │               │               │
       TENANT A        TENANT B        TENANT C
          │               │               │
        Loja             Loja             Loja
       Produtos         Produtos         Produtos
       Clientes         Clientes         Clientes
       Pedidos          Pedidos          Pedidos
       WhatsApp         WhatsApp         WhatsApp
       Automação        Automação        Automação
```

---

## 📦 Estrutura do Projeto

```
diixwhatsapp-landing/
├── src/
│   ├── components/
│   │   ├── Navbar/           # Navegação superior
│   │   ├── Hero/             # Seção principal
│   │   ├── Features/         # Recursos da plataforma
│   │   ├── LoginModal/       # Modal de login
│   │   ├── WhatsAppAutomation/  # Automação WhatsApp
│   │   ├── MultiTenant/      # Diagrama multi-tenant
│   │   ├── DashboardPreview/ # Preview do dashboard
│   │   ├── Pricing/          # Planos e preços
│   │   ├── FAQ/              # Perguntas frequentes
│   │   ├── Footer/           # Rodapé
│   │   └── ui/               # Componentes reutilizáveis
│   ├── data/
│   │   ├── navigation.ts     # Itens de navegação
│   │   ├── features.ts       # Recursos
│   │   ├── plans.ts          # Planos
│   │   ├── dashboard.ts      # Métricas do dashboard
│   │   └── automation.ts     # Fluxos de automação
│   ├── assets/               # Imagens e ícones
│   ├── utils/                # Utilitários
│   ├── App.tsx               # Componente principal
│   ├── main.tsx              # Entry point
│   └── index.css             # Estilos globais
├── docs/
│   └── relatorios/           # Documentação do projeto
│       ├── STATUS_ATUAL.md
│       ├── GUIA_IMPLEMENTACAO.md
│       └── PROGRESSO.md
├── public/                   # Assets estáticos
├── package.json
├── tailwind.config.js
├── tsconfig.json
└── README.md
```

---

## 🚀 Quick Start

### Pré-requisitos

- Node.js 18+
- npm ou yarn

### Instalação

```bash
# Instalar dependências
npm install

# Iniciar servidor de desenvolvimento
npm run dev

# Build de produção
npm run build

# Preview do build
npm run preview

# Linting
npm run lint
```

### Dependências Principais

```json
{
  "react": "^19.2.8",
  "react-dom": "^19.2.8",
  "framer-motion": "^13.1.1",
  "lucide-react": "^1.33.0",
  "react-router-dom": "^7.18.2",
  "tailwindcss": "^3.4.19",
  "typescript": "~6.0.2",
  "vite": "^8.2.0"
}
```

---

## 🎯 Seções da Landing Page

1. **Navbar** - Navegação fixa com scroll effect
2. **Hero** - Headline impactante + Dashboard mockup
3. **Features** - 6 cards de funcionalidades
4. **WhatsApp Automation** - Chat mockup + fluxo de automação
5. **Multi-Tenant** - Diagrama de arquitetura
6. **Dashboard Preview** - Métricas e gráficos em tempo real
7. **Pricing** - 3 planos (Starter, Business, Enterprise)
8. **FAQ** - Perguntas frequentes
9. **Footer** - Links institucionais

---

## 💳 Planos Disponíveis

### STARTER - R$ 49,90/mês
Ideal para pequenos negócios.

- Loja Virtual
- Vendas via WhatsApp
- Atendimento automatizado
- Até 1 usuário
- Suporte por e-mail

### BUSINESS - R$ 99,90/mês ⭐
Mais escolhido pelas empresas.

- Tudo do Starter
- Mais automações
- Relatórios avançados
- Multi-usuário
- Suporte prioritário

### ENTERPRISE - R$ 199,90/mês
Para operações maiores.

- Tudo do Business
- Automação avançada
- Integrações
- Recursos prioritários
- Suporte dedicado

---

## 🎨 Componentes UI

### Botões

```tsx
<Button variant="primary">Começar agora</Button>
<Button variant="secondary">Conhecer plataforma</Button>
<Button variant="outline">Saiba mais</Button>
```

### Cards

```tsx
<GlassCard glow="green">
  <h3>Loja Virtual</h3>
  <p>Crie e gerencie sua loja online.</p>
</GlassCard>
```

### Badges

```tsx
<NeonBadge color="green">MULTI-TENANT</NeonBadge>
<NeonBadge color="magenta">MAIS ESCOLHIDO</NeonBadge>
```

---

## 📱 Responsividade

Breakpoints testados:

- `320px` - Mobile pequeno
- `375px` - iPhone
- `768px` - Tablet
- `1024px` - Desktop pequeno
- `1280px` - Desktop médio
- `1440px` - Desktop grande
- `1920px` - Full HD

---

## ♿ Acessibilidade

- [ ] Contraste WCAG AA
- [ ] Navegação por teclado
- [ ] Focus-visible em elementos interativos
- [ ] aria-label em botões icônicos
- [ ] HTML semântico
- [ ] Labels associados a inputs

---

## 🔍 SEO

Meta tags implementadas:

```html
<title>DIixWhatsApp — Automação, Vendas e Gestão pelo WhatsApp</title>
<meta name="description" content="DIixWhatsApp é uma plataforma SaaS para automatizar atendimento, vendas, loja virtual e gestão empresarial através do WhatsApp.">
```

---

## 📊 Status do Desenvolvimento

| Categoria | Progresso |
|-----------|-----------|
| Componentes Base | 80% |
| Design System | 20% |
| Dados | 10% |
| Componentes Principais | 40% |
| Integração | 0% |
| Validação | 0% |

**Progresso Total:** ~30%

---

## 📝 Documentação

Documentação detalhada disponível em:

- [`docs/relatorios/STATUS_ATUAL.md`](./docs/relatorios/STATUS_ATUAL.md) - Visão geral do projeto
- [`docs/relatorios/GUIA_IMPLEMENTACAO.md`](./docs/relatorios/GUIA_IMPLEMENTACAO.md) - Passo a passo de implementação
- [`docs/relatorios/PROGRESSO.md`](./docs/relatorios/PROGRESSO.md) - Registro de progresso

---

## 🎯 Regras de Implementação

### ✅ Permitido Melhorar

- Código e organização
- Responsividade
- Acessibilidade
- Performance
- Animações sutis
- Arquitetura de componentes

### ❌ NÃO Alterar

- Identidade visual cyberpunk
- Esquema de cores dark/neon
- Dashboard como componente real (não imagem)
- Login como modal (não página separada)
- Hierarquia visual do blueprint

---

## 🔐 Notas Importantes

**Autenticação:** Nesta versão, NÃO implementar autenticação real. O Login Modal é apenas UI demonstrativa.

**Backend:** Sem JWT, API, banco de dados ou OAuth nesta fase.

**Dashboard:** Deve ser construído como UI real (HTML/CSS), não imagem estática.

---

## 🐛 Troubleshooting

### Erro: "Cannot find module"

```bash
npm install
```

### Erro: TypeScript errors

```bash
npm run build
```

### Estilo não aplicando

Verificar configuração do Tailwind em `tailwind.config.js`.

---

## 📞 Contato

**Projeto:** DIixWhatsApp Landing Page  
**Versão:** 0.0.0  
**Licença:** Proprietária

---

*© 2026 DIixWhatsApp. Todos os direitos reservados.*
