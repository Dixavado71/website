# DIixWhatsApp - Guia de Implementação Passo a Passo

## 📖 Introdução

Este documento fornece um guia detalhado passo a passo para implementar a Landing Page do DIixWhatsApp seguindo o design blueprint fornecido.

---

## 🔧 Pré-requisitos

- Node.js 18+ instalado
- npm ou yarn
- Editor de código (VS Code recomendado)
- Git

---

## 🚀 Configuração Inicial

### Passo 1: Instalar Dependências

```bash
cd /workspace/diixwhatsapp-landing
npm install
```

**Dependências já instaladas:**
- React 19.2.8
- Framer Motion 13.1.1
- Lucide React 1.33.0
- React Router DOM 7.18.2
- Tailwind CSS 3.4.19
- TypeScript 6.0.2
- Vite 8.2.0

### Passo 2: Verificar Projeto

```bash
npm run dev
```

Acessar `http://localhost:5173` para visualizar.

---

## 📁 Estrutura de Diretórios

```
diixwhatsapp-landing/
├── src/
│   ├── components/
│   │   ├── Navbar/
│   │   ├── Hero/
│   │   ├── Features/
│   │   ├── LoginModal/
│   │   ├── WhatsAppAutomation/  (criar)
│   │   ├── MultiTenant/         (criar)
│   │   ├── DashboardPreview/    (criar)
│   │   ├── Pricing/             (criar)
│   │   ├── FAQ/                 (criar)
│   │   ├── Footer/              (criar)
│   │   └── ui/                  (criar)
│   ├── data/
│   │   ├── navigation.ts
│   │   ├── features.ts
│   │   ├── plans.ts
│   │   ├── dashboard.ts         (criar)
│   │   └── automation.ts        (criar)
│   ├── assets/
│   ├── App.tsx
│   ├── main.tsx
│   ├── index.css
│   └── App.css
├── docs/
│   └── relatorios/
│       ├── STATUS_ATUAL.md
│       ├── GUIA_IMPLEMENTACAO.md
│       └── PROGRESSO.md
├── public/
├── package.json
├── tailwind.config.js
└── README.md
```

---

## 🎨 Passo 1: Atualizar Design System

### 1.1 Atualizar tailwind.config.js

Adicionar cores oficiais do blueprint:

```javascript
colors: {
  background: '#050505',
  surface: '#080B14',
  surfaceAlt: '#12161B',
  panel: '#1E232E',
  primary: '#00FF88',      // Verde neon oficial
  secondary: '#00E5FF',    // Ciano oficial
  purple: '#7B61FF',       // Roxo oficial
  magenta: '#FF2ED1',      // Magenta oficial
  text: '#FFFFFF',
  muted: '#A0A0A0',
}
```

### 1.2 Atualizar src/index.css

Adicionar fontes do Google Fonts no `index.html`:

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Exo+2:wght@400;500;600&family=Inter:wght@400;500;600;700&family=Orbitron:wght@500;600;700;800&display=swap" rel="stylesheet">
```

Adicionar no `index.css`:

```css
:root {
  font-family: 'Inter', system-ui, -apple-system, sans-serif;
}

h1, h2, h3, h4, h5, h6 {
  font-family: 'Orbitron', sans-serif;
}

.subtitle {
  font-family: 'Exo 2', sans-serif;
}
```

---

## 🧩 Passo 2: Criar Componentes UI Reutilizáveis

### 2.1 Button.tsx

Criar `src/components/ui/Button.tsx`:

```tsx
import { motion, HTMLMotionProps } from 'framer-motion';
import { cn } from '../../utils/cn';

interface ButtonProps extends HTMLMotionProps<'button'> {
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  glow?: boolean;
}

export const Button = ({
  variant = 'primary',
  size = 'md',
  glow = false,
  className,
  children,
  ...props
}: ButtonProps) => {
  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={cn(
        'font-semibold rounded-lg transition-all duration-200',
        {
          'bg-primary text-black hover:bg-primary/90': variant === 'primary',
          'bg-surface text-white border border-white/10 hover:bg-surface/80': variant === 'secondary',
          'bg-transparent text-white border border-primary/50 hover:bg-primary/10': variant === 'outline',
          'px-4 py-2 text-sm': size === 'sm',
          'px-6 py-3 text-base': size === 'md',
          'px-8 py-4 text-lg': size === 'lg',
          'glow-green': glow && variant === 'primary',
        },
        className
      )}
      {...props}
    >
      {children}
    </motion.button>
  );
};
```

### 2.2 GlassCard.tsx

Criar `src/components/ui/GlassCard.tsx`:

```tsx
import { motion, HTMLMotionProps } from 'framer-motion';
import { cn } from '../../utils/cn';

interface GlassCardProps extends HTMLMotionProps<'div'> {
  glow?: 'green' | 'cyan' | 'purple' | 'magenta';
  hover?: boolean;
}

export const GlassCard = ({
  glow,
  hover = true,
  className,
  children,
  ...props
}: GlassCardProps) => {
  return (
    <motion.div
      whileHover={hover ? { translateY: -4 } : undefined}
      className={cn(
        'bg-surface/50 backdrop-blur-xl border border-white/10 rounded-xl p-6',
        {
          'hover:border-primary/50 hover:shadow-neon-green': glow === 'green',
          'hover:border-secondary/50 hover:shadow-neon-cyan': glow === 'cyan',
          'hover:border-purple/50 hover:shadow-neon-purple': glow === 'purple',
          'hover:border-magenta/50': glow === 'magenta',
        },
        className
      )}
      {...props}
    >
      {children}
    </motion.div>
  );
};
```

### 2.3 NeonBadge.tsx

Criar `src/components/ui/NeonBadge.tsx`:

```tsx
import { cn } from '../../utils/cn';

interface NeonBadgeProps {
  children: React.ReactNode;
  color?: 'green' | 'cyan' | 'purple' | 'magenta';
  size?: 'sm' | 'md';
}

export const NeonBadge = ({
  children,
  color = 'green',
  size = 'sm',
}: NeonBadgeProps) => {
  return (
    <span
      className={cn(
        'inline-flex items-center px-3 py-1 rounded-full text-xs font-medium uppercase tracking-wider border',
        {
          'bg-primary/10 border-primary/30 text-primary': color === 'green',
          'bg-secondary/10 border-secondary/30 text-secondary': color === 'cyan',
          'bg-purple/10 border-purple/30 text-purple': color === 'purple',
          'bg-magenta/10 border-magenta/30 text-magenta': color === 'magenta',
          'px-2 py-0.5 text-xs': size === 'sm',
          'px-3 py-1 text-xs': size === 'md',
        }
      )}
    >
      {children}
    </span>
  );
};
```

### 2.4 SectionTitle.tsx

Criar `src/components/ui/SectionTitle.tsx`:

```tsx
interface SectionTitleProps {
  badge?: string;
  title: string;
  subtitle?: string;
  align?: 'left' | 'center' | 'right';
}

export const SectionTitle = ({
  badge,
  title,
  subtitle,
  align = 'center',
}: SectionTitleProps) => {
  return (
    <div className={`text-${align} mb-12`}>
      {badge && (
        <div className="inline-block mb-4">
          <NeonBadge>{badge}</NeonBadge>
        </div>
      )}
      <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
        {title}
      </h2>
      {subtitle && (
        <p className="text-gray-400 max-w-2xl mx-auto">
          {subtitle}
        </p>
      )}
    </div>
  );
};
```

### 2.5 Criar utility cn

Criar `src/utils/cn.ts`:

```tsx
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
```

Instalar dependências:

```bash
npm install clsx tailwind-merge
```

---

## 📊 Passo 3: Criar Dados Centralizados

### 3.1 dashboard.ts

Criar `src/data/dashboard.ts`:

```tsx
export interface Metric {
  label: string;
  value: string;
  change: string;
  positive: boolean;
}

export const metrics: Metric[] = [
  { label: 'Faturamento', value: 'R$ 78.431,00', change: '+12,5%', positive: true },
  { label: 'Pedidos', value: '1.248', change: '+8,4%', positive: true },
  { label: 'Clientes', value: '2.846', change: '+11,2%', positive: true },
  { label: 'Conversas', value: '4.229', change: '+15,3%', positive: true },
];

export interface ChartData {
  label: string;
  value: number;
}

export const salesData: ChartData[] = [
  { label: 'Seg', value: 40 },
  { label: 'Ter', value: 65 },
  { label: 'Qua', value: 45 },
  { label: 'Qui', value: 80 },
  { label: 'Sex', value: 55 },
  { label: 'Sáb', value: 90 },
  { label: 'Dom', value: 70 },
];

export interface Order {
  id: string;
  customer: string;
  product: string;
  value: string;
  status: 'pending' | 'completed' | 'cancelled';
}

export const recentOrders: Order[] = [
  { id: '#1234', customer: 'João Silva', product: 'Produto A', value: 'R$ 299,90', status: 'completed' },
  { id: '#1235', customer: 'Maria Santos', product: 'Produto B', value: 'R$ 149,90', status: 'pending' },
  { id: '#1236', customer: 'Pedro Oliveira', product: 'Produto C', value: 'R$ 599,90', status: 'completed' },
];
```

### 3.2 automation.ts

Criar `src/data/automation.ts`:

```tsx
export interface ChatMessage {
  id: string;
  sender: 'client' | 'system';
  text: string;
  options?: string[];
}

export const chatFlow: ChatMessage[] = [
  {
    id: '1',
    sender: 'client',
    text: 'Olá, gostaria de ver os produtos disponíveis.',
  },
  {
    id: '2',
    sender: 'system',
    text: 'Olá! 👋 Seja bem-vindo à nossa loja.\n\nEscolha uma opção:',
    options: [
      '1. Ver produtos',
      '2. Fazer pedido',
      '3. Acompanhar pedido',
      '4. Falar com atendente',
    ],
  },
];

export interface AutomationStep {
  icon: string;
  title: string;
  description: string;
}

export const automationSteps: AutomationStep[] = [
  { icon: 'MessageSquare', title: 'Mensagem Recebida', description: 'Cliente envia mensagem' },
  { icon: 'Brain', title: 'IA Inteligente', description: 'Processa e entende intenção' },
  { icon: 'Check', title: 'Resposta Automática', description: 'Responde instantaneamente' },
  { icon: 'ShoppingCart', title: 'Oferece Produtos', description: 'Apresenta catálogo' },
  { icon: 'FileText', title: 'Cria Pedido', description: 'Gera pedido automaticamente' },
];
```

---

## 💳 Passo 4: Criar Componente Pricing

Criar diretório e arquivo `src/components/Pricing/Pricing.tsx`:

```tsx
import { motion } from 'framer-motion';
import { Check, Star } from 'lucide-react';
import { plans } from '../../data/plans';
import { GlassCard } from '../ui/GlassCard';
import { Button } from '../ui/Button';

const Pricing = () => {
  return (
    <section id="pricing" className="py-24 bg-background relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Escolha o Plano Ideal para o{' '}
            <span className="text-primary">Seu Negócio</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Planos flexíveis que crescem com sua empresa
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className={`relative ${plan.highlighted ? 'md:-mt-4 md:mb-4' : ''}`}
            >
              {plan.highlighted && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-10">
                  <span className="bg-magenta text-white px-4 py-1 rounded-full text-sm font-semibold flex items-center gap-1">
                    <Star size={16} />
                    MAIS ESCOLHIDO
                  </span>
                </div>
              )}
              
              <GlassCard
                glow={plan.highlighted ? 'magenta' : 'green'}
                className={`h-full ${
                  plan.highlighted
                    ? 'border-magenta/50 bg-magenta/5'
                    : 'border-white/10'
                }`}
              >
                <div className="text-center mb-6">
                  <h3 className="text-xl font-bold text-white mb-2">
                    {plan.name}
                  </h3>
                  <p className="text-gray-400 text-sm mb-4">
                    {plan.description}
                  </p>
                  <div className="text-4xl font-bold text-white mb-1">
                    {plan.price}
                  </div>
                  <div className="text-gray-500 text-sm">por mês</div>
                </div>

                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <Check
                        size={20}
                        className={
                          plan.highlighted ? 'text-magenta' : 'text-primary'
                        }
                        style={{ flexShrink: 0 }}
                      />
                      <span className="text-gray-300 text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button
                  variant={plan.highlighted ? 'primary' : 'secondary'}
                  className="w-full"
                  glow={plan.highlighted}
                >
                  Escolher plano
                </Button>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Pricing;
```

---

## 📱 Passo 5: Atualizar App.tsx

Importar e usar todos os componentes:

```tsx
import Navbar from './components/Navbar/Navbar';
import Hero from './components/Hero/Hero';
import Features from './components/Features/Features';
import Pricing from './components/Pricing/Pricing';
// Importar outros componentes conforme forem criados

function App() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <Hero />
        <Features />
        {/* Adicionar outras seções */}
        <Pricing />
      </main>
      {/* Footer será adicionado */}
    </div>
  );
}

export default App;
```

---

## ✅ Checklist de Validação

### Após cada passo:

- [ ] Executar `npm run dev` sem erros
- [ ] Verificar console do navegador
- [ ] Testar responsividade (F12 → Device Toolbar)
- [ ] Validar TypeScript (`npm run build`)

### Antes de finalizar:

- [ ] Todos componentes importados no App.tsx
- [ ] Navbar com scroll effect funcionando
- [ ] Menu mobile operacional
- [ ] Modal de login abrindo/fechando
- [ ] Animações suaves e performáticas
- [ ] Cores fiéis ao blueprint
- [ ] Tipografia correta
- [ ] SEO básico implementado
- [ ] Acessibilidade validada

---

## 🐛 Troubleshooting Comum

### Erro: "Cannot find module"

```bash
npm install
```

### Erro: TypeScript errors

```bash
npm run build
```

Verificar imports e tipos.

### Estilo não aplicando

Verificar se Tailwind está configurado corretamente no `tailwind.config.js`.

### Animações travando

Reduzir complexidade das animações ou verificar `prefers-reduced-motion`.

---

## 📞 Próximos Passos

Após completar este guia:

1. Criar componente WhatsAppAutomation
2. Criar componente MultiTenant
3. Criar componente DashboardPreview
4. Criar componente FAQ
5. Criar componente Footer
6. Revisão visual completa
7. Testes de build
8. Deploy

---

*Documento atualizado em: $(date +%Y-%m-%d)*
