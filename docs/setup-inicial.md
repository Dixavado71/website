# Setup Inicial do Projeto - DIixWhatsApp Landing Page

## Objetivo
Documentar o processo de inicialização e configuração do projeto React + Vite + TypeScript com Tailwind CSS, Framer Motion e Lucide React.

---

## Passo 1: Inicializar Projeto Vite

### Comando
```bash
npm create vite@latest . -- --template react-ts
```

### Resultado Esperado
- Criação da estrutura básica do projeto React com TypeScript
- Arquivos iniciais: `package.json`, `vite.config.ts`, `tsconfig.json`
- Diretório `src/` com componentes básicos

---

## Passo 2: Instalar Dependências

### Dependências Principais
```bash
npm install
```

### Dependências Adicionais
```bash
npm install framer-motion lucide-react react-router-dom
```

### Dev Dependencies (Tailwind CSS)
```bash
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

---

## Passo 3: Configurar Tailwind CSS

### tailwind.config.js
Configuração necessária:
- Cores customizadas (cyberpunk theme)
- Fontes
- Efeitos de glow/shadow
- Animações customizadas

### Cores do Tema
```javascript
colors: {
  background: '#050505',
  surface: '#08090D',
  surfaceAlt: '#0B0F14',
  primary: '#25D366', // Verde WhatsApp
  primaryGlow: '#25D36680',
  accent: '#00FFFF', // Ciano
  accentAlt: '#8B5CF6', // Roxo elétrico
}
```

---

## Passo 4: Estrutura de Diretórios

### Criar Pastas
```
src/
├── components/
│   ├── Navbar/
│   ├── Hero/
│   ├── Features/
│   ├── Solutions/
│   ├── Pricing/
│   ├── DashboardPreview/
│   ├── WhatsAppAutomation/
│   ├── CTA/
│   ├── Footer/
│   └── LoginModal/
├── sections/
├── assets/
│   └── images/
├── pages/
├── hooks/
├── lib/
│   ├── features.ts
│   ├── plans.ts
│   ├── benefits.ts
│   └── navigation.ts
├── styles/
│   └── globals.css
└── App.tsx
```

---

## Passo 5: Configurar Estilos Globais

### index.css / globals.css
- Reset CSS
- Variáveis de cores
- Fontes
- Estilos base para dark mode

---

## Passo 6: Verificar Build Inicial

### Comandos
```bash
npm run dev    # Desenvolvimento
npm run build  # Produção
npm run preview # Preview do build
```

---

## Critérios de Aceite

- [ ] Projeto Vite criado sem erros
- [ ] TypeScript configurado corretamente
- [ ] Tailwind CSS funcionando
- [ ] Framer Motion instalado
- [ ] Lucide React instalado
- [ ] Estrutura de diretórios organizada
- [ ] Build de produção executando sem erros
- [ ] Hot reload funcionando no desenvolvimento

---

## Problemas Comuns e Soluções

### Erro: "Cannot find module..."
**Solução:** Executar `npm install`

### Erro: Tailwind não aplica estilos
**Solução:** Verificar `content` no `tailwind.config.js`

### Erro: TypeScript errors
**Solução:** Verificar `tsconfig.json` e tipos instalados

---

*Documento criado para acompanhamento do setup inicial*
