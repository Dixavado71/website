# PROMPT — CRIAÇÃO DA LANDING PAGE DIixWhatsApp

Você é um desenvolvedor Frontend Sênior, UI/UX Designer e especialista em criação de Landing Pages SaaS modernas, com experiência em interfaces Cyberpunk, Dark Mode, animações avançadas e produtos B2B.

Quero que você CRIE DO ZERO uma Landing Page profissional para o produto **DIixWhatsApp**.

## 1. SOBRE O PRODUTO

O **DIixWhatsApp** é uma plataforma SaaS completa de gestão empresarial e automação comercial.

A plataforma trabalha com arquitetura **Multi-Tenant**, permitindo:

* Um administrador gerenciar múltiplas empresas/clientes.
* Cada Tenant possuir seu próprio ambiente isolado.
* Cada Tenant possuir sua própria loja.
* Cada Tenant administrar produtos, clientes, vendas e serviços.
* Cada empresa contratar diferentes planos/pacotes.
* Criar lojas virtuais.
* Realizar vendas através do WhatsApp.
* Automatizar atendimento através do WhatsApp.
* Utilizar autoatendimento e fluxos automatizados.
* Gerenciar pedidos.
* Gerenciar clientes.
* Integrar futuramente com sistemas de pagamento.
* Evoluir futuramente para diversos módulos empresariais.

A Landing Page deve vender a ideia de que o DIixWhatsApp é uma plataforma central para transformar uma empresa em um negócio digital automatizado.

---

# 2. OBJETIVO DA LANDING PAGE

Criar uma Landing Page com aparência de:

* SaaS Premium
* Tecnologia avançada
* Cyberpunk
* Dark futurista
* Sistema empresarial profissional
* Automação
* Inteligência
* WhatsApp
* E-commerce
* Segurança
* Escalabilidade

A página NÃO deve parecer um site genérico de WhatsApp.

Ela deve transmitir a sensação de:

> "Um sistema operacional comercial para empresas modernas."

O design precisa parecer um produto SaaS real que poderia ser vendido para empresas.

---

# 3. IDENTIDADE VISUAL

Utilizar como conceito principal:

**DIixWhatsApp — Your Business. Automated.**

Tema:

* Dark
* Cyberpunk
* Futurista
* Tecnológico
* Sombrio
* Premium
* Minimalista, mas visualmente impactante

Paleta sugerida:

* Preto profundo
* #050505
* #08090D
* #0B0F14
* Cinza grafite
* Branco
* Verde neon relacionado ao WhatsApp
* Pequenos detalhes em ciano
* Pequenos detalhes em roxo/azul elétrico

NÃO exagerar nas cores.

O preto deve dominar a interface.

Utilizar cores neon apenas para:

* CTAs
* bordas
* highlights
* ícones
* indicadores
* gráficos
* elementos tecnológicos
* efeitos de hover

---

# 4. TECNOLOGIA

Caso o projeto ainda não possua stack definida, utilizar:

* React
* TypeScript
* Vite
* Tailwind CSS
* Lucide React ou biblioteca equivalente de ícones
* Framer Motion ou Motion para animações

Utilizar componentes reutilizáveis.

Estruturar o projeto de forma profissional.

Exemplo:

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
├── pages/
├── hooks/
├── lib/
├── styles/
└── App.tsx

Caso o projeto já tenha uma estrutura existente, NÃO destrua a arquitetura sem necessidade.

Primeiro analise o projeto.

Depois implemente a Landing Page respeitando a estrutura existente.

---

# 5. NAVBAR

Criar uma Navbar moderna e futurista.

Elementos:

Logo:

DIixWhatsApp

Links:

* Início
* Plataforma
* Recursos
* Soluções
* Planos
* FAQ

Botões:

**Entrar**

**Começar agora**

A Navbar deve:

* Ser transparente inicialmente.
* Possuir blur.
* Tornar-se mais sólida ao fazer scroll.
* Ter animação suave.
* Permanecer responsiva.
* Possuir menu mobile.

O botão "Entrar" deve abrir uma janela/modal de Login.

IMPORTANTE:

O login NÃO terá backend nesta primeira versão.

É apenas uma interface visual preparada para futura integração.

---

# 6. HERO SECTION

Criar uma Hero Section extremamente impactante.

Headline principal:

**Transforme seu WhatsApp em uma máquina de vendas.**

Subheadline:

"Uma plataforma SaaS completa para automatizar atendimento, vendas, loja virtual e gestão do seu negócio em um único lugar."

Adicionar CTA:

**Começar agora**

CTA secundário:

**Conhecer a plataforma**

Criar uma visualização futurista do sistema.

Pode ser uma representação de:

* Dashboard
* Conversas do WhatsApp
* Pedidos
* Clientes
* Produtos
* Gráficos
* Automação

A interface deve parecer um sistema real.

Utilizar elementos flutuantes e efeitos de profundidade.

---

# 7. EFEITO VISUAL DO HERO

Criar uma atmosfera cyberpunk utilizando:

* Grid futurista
* Glow
* partículas
* linhas tecnológicas
* gradientes muito sutis
* elementos holográficos
* pequenos pontos luminosos
* blur
* sombras
* glassmorphism moderado

Adicionar animações discretas.

NÃO transformar a página em um carnaval de efeitos.

A estética deve continuar profissional.

---

# 8. SEÇÃO "UMA PLATAFORMA. TODO O SEU NEGÓCIO."

Criar seção explicando o conceito da plataforma.

Texto:

"O DIixWhatsApp conecta as principais operações do seu negócio em uma única plataforma."

Criar cards para:

### Loja Virtual

Crie e gerencie sua própria loja online.

### Vendas pelo WhatsApp

Transforme conversas em pedidos e vendas.

### Atendimento Automatizado

Automatize perguntas, respostas e processos.

### Gestão de Clientes

Centralize informações e histórico dos seus clientes.

### Gestão de Produtos

Controle produtos, preços e disponibilidade.

### Pedidos

Gerencie pedidos em um fluxo centralizado.

Cards devem possuir:

* ícone
* título
* descrição
* hover cyberpunk
* glow
* animação

---

# 9. SEÇÃO WHATSAPP AUTOMATIZADO

Criar uma seção visual mostrando uma conversa simulada do WhatsApp.

Exemplo:

Cliente:

"Olá, gostaria de ver os produtos disponíveis."

Sistema:

"Olá! 👋 Seja bem-vindo à nossa loja."

"Escolha uma opção:"

1. Ver produtos
2. Fazer pedido
3. Acompanhar pedido
4. Falar com atendente

Mostrar a conversa como uma interface de chat moderna.

Adicionar elementos mostrando:

* Automação
* Respostas instantâneas
* Fluxos
* Pedidos
* Atendimento

Utilizar animações para simular mensagens chegando.

---

# 10. SEÇÃO "MULTI-TENANT"

Criar uma seção explicando a arquitetura Multi-Tenant.

Título:

**Um ecossistema. Múltiplas empresas.**

Explicar visualmente:

DIixWhatsApp
↓
Administrador
↓
Tenant A
Tenant B
Tenant C
Tenant D

Cada Tenant deve aparecer como uma empresa independente.

Mostrar que cada empresa possui:

* Loja
* Produtos
* Clientes
* Pedidos
* WhatsApp
* Configurações
* Plano

A interface deve passar sensação de isolamento, segurança e escalabilidade.

---

# 11. SEÇÃO DE DASHBOARD

Criar uma representação visual de um dashboard SaaS.

Mostrar:

* Faturamento
* Pedidos
* Clientes
* Conversas
* Produtos
* Vendas
* Taxa de conversão

Utilizar gráficos fictícios.

Os dados são apenas demonstrativos.

Não criar backend.

A interface deve parecer uma captura de tela de um produto SaaS real.

---

# 12. SEÇÃO DE PLANOS

Criar seção:

**Escolha o plano ideal para o seu negócio.**

Criar pelo menos 3 planos:

### STARTER

Para pequenos negócios.

### BUSINESS

Para empresas em crescimento.

### ENTERPRISE

Para operações maiores.

Cada plano deve possuir:

* preço fictício configurável
* recursos
* botão de contratação
* destaque visual no plano Business

IMPORTANTE:

Não criar checkout real.

Os botões podem direcionar para uma futura rota ou simplesmente executar uma ação visual.

Estruturar os dados dos planos em arrays/objetos para que sejam facilmente alterados posteriormente.

---

# 13. SEÇÃO DE BENEFÍCIOS

Criar uma seção com benefícios como:

* Atendimento 24/7
* Mais vendas
* Menos trabalho manual
* Centralização da operação
* Loja online
* Automação
* Escalabilidade
* Multi-Tenant
* Gestão centralizada
* Experiência profissional para o cliente

Utilizar ícones e animações.

---

# 14. SEÇÃO "FEITO PARA CRESCER COM SEU NEGÓCIO"

Criar uma seção mostrando progressão:

Comece pequeno.

↓

Automatize.

↓

Venda mais.

↓

Expanda.

↓

Gerencie múltiplas operações.

Mostrar o DIixWhatsApp como plataforma escalável.

---

# 15. CTA FINAL

Criar uma seção visualmente forte:

**Seu próximo cliente pode estar esperando no WhatsApp.**

Texto:

"Comece a transformar atendimento em vendas com o DIixWhatsApp."

Botão:

**Começar agora**

Adicionar efeitos neon e animação.

---

# 16. LOGIN

Criar um Modal de Login.

IMPORTANTE:

O login é APENAS FRONTEND nesta primeira versão.

Não implementar:

* API
* banco
* autenticação
* JWT
* sessão
* OAuth
* recuperação de senha real

Criar somente a interface.

Campos:

E-mail

Senha

Checkbox:

Lembrar de mim

Botão:

Entrar

Links:

Esqueci minha senha

Criar conta

Por enquanto esses elementos podem ser apenas visuais.

O modal deve possuir:

* backdrop blur
* glassmorphism
* bordas sutis
* glow
* animação de entrada
* animação de saída
* responsividade

---

# 17. IMAGENS E ELEMENTOS VISUAIS

Utilizar imagens/ilustrações que representem:

* tecnologia
* automação
* WhatsApp
* negócios
* dashboards
* inteligência
* vendas
* e-commerce

Priorizar imagens que possam ser utilizadas legalmente.

Se possível, utilizar:

* SVG
* ilustrações próprias
* CSS
* elementos gerados por código
* mockups de interface

Evitar imagens genéricas de bancos de imagens que deixem o site com aparência de template.

Criar mockups de dashboard utilizando HTML/CSS quando possível.

---

# 18. ANIMAÇÕES

Implementar animações modernas.

Utilizar:

* fade-in
* slide-up
* scale
* hover
* parallax sutil
* floating elements
* glow
* pulse
* scroll reveal
* stagger animation

Exemplo:

Ao entrar na tela:

cards aparecem progressivamente.

Ao passar o mouse:

card recebe glow e elevação.

Dashboard:

elementos podem possuir animação muito sutil.

IMPORTANTE:

As animações devem ser performáticas.

Evitar animações pesadas que prejudiquem dispositivos móveis.

Respeitar:

prefers-reduced-motion

para usuários que desativam animações.

---

# 19. RESPONSIVIDADE

A Landing Page precisa funcionar perfeitamente em:

* Desktop
* Notebook
* Tablet
* Smartphone

Mobile First.

Testar visualmente:

320px
375px
390px
430px
768px
1024px
1280px
1440px
1920px

No mobile:

* Navbar vira menu
* Cards ficam em coluna
* Dashboard recebe scroll horizontal quando necessário
* Hero adapta tipografia
* CTAs ocupam largura adequada
* Modal de login funciona perfeitamente

---

# 20. UX

A experiência precisa parecer um produto SaaS profissional.

Criar:

* estados hover
* estados active
* focus states
* transições
* feedback visual
* botões claramente identificáveis
* hierarquia visual

Garantir acessibilidade básica:

* contraste
* aria-labels
* navegação por teclado
* focus-visible
* HTML semântico

---

# 21. PERFORMANCE

O site deve ser otimizado.

Evitar:

* bibliotecas desnecessárias
* imagens gigantes
* efeitos extremamente pesados
* JavaScript desnecessário

Utilizar lazy loading quando apropriado.

Garantir boa performance no Lighthouse.

---

# 22. SEO

Criar:

* title
* meta description
* Open Graph
* favicon
* headings semânticos
* estrutura correta de H1/H2/H3

Sugestão:

Title:

DIixWhatsApp — Automação, Vendas e Gestão pelo WhatsApp

Description:

"DIixWhatsApp é uma plataforma SaaS para automatizar atendimento, vendas, loja virtual e gestão empresarial através do WhatsApp."

---

# 23. ESTRUTURA DE COMPONENTES

Não criar um único arquivo gigante.

Separar a Landing Page em componentes.

Exemplo:

Navbar
Hero
PlatformSection
FeaturesSection
WhatsAppAutomationSection
MultiTenantSection
DashboardSection
PricingSection
BenefitsSection
GrowthSection
FinalCTA
Footer
LoginModal

Criar componentes reutilizáveis.

---

# 24. DADOS

Separar dados estáticos de componentes sempre que possível.

Exemplo:

features.ts

plans.ts

benefits.ts

navigation.ts

Isso permitirá futuramente transformar o conteúdo em CMS ou API.

---

# 25. FUTURA INTEGRAÇÃO

A Landing Page será futuramente integrada ao SaaS real.

Portanto:

NÃO acoplar componentes ao backend.

Preparar:

/login

/register

/dashboard

/pricing

/checkout

como futuras rotas.

Nesta primeira versão, somente a Landing Page e o Login visual precisam existir.

---

# 26. FOOTER

Criar footer profissional.

Colocar:

DIixWhatsApp

"Automação, vendas e gestão em um só lugar."

Links:

* Plataforma
* Recursos
* Planos
* Login
* Termos
* Privacidade

Redes sociais podem ser placeholders.

Adicionar:

© 2026 DIixWhatsApp. Todos os direitos reservados.

---

# 27. MICROINTERAÇÕES

Adicionar pequenos detalhes premium:

* cursor hover nos cards
* brilho passando discretamente em botões
* linhas animadas
* indicadores de status
* pequenos badges
* "ONLINE"
* "AUTOMATED"
* "CONNECTED"
* "ACTIVE"

Esses elementos devem reforçar o conceito de plataforma tecnológica.

---

# 28. ESTILO

A página deve lembrar a combinação conceitual de:

* SaaS moderno
* Cyberpunk
* Terminal
* Dashboard empresarial
* Tecnologia futurista
* WhatsApp Business
* Sistemas de automação

MAS NÃO COPIAR visualmente nenhuma marca ou site existente.

Criar identidade própria para DIixWhatsApp.

---

# 29. REGRAS IMPORTANTES

Antes de começar:

1. Analise o projeto existente.
2. Verifique package.json.
3. Verifique a estrutura de diretórios.
4. Verifique se React/Vite/Tailwind já estão instalados.
5. NÃO reinstale dependências que já existem.
6. NÃO apague funcionalidades existentes.
7. Preserve configurações importantes.
8. Faça a implementação de forma modular.
9. Execute o projeto.
10. Corrija erros.
11. Execute o build de produção.
12. Corrija qualquer erro de TypeScript/ESLint/build.
13. Verifique responsividade.
14. Verifique se todas as animações funcionam.
15. Verifique se o Modal de Login abre e fecha corretamente.

---

# 30. CRITÉRIO VISUAL

O resultado NÃO pode parecer:

* template genérico
* landing page simples
* página criada automaticamente
* site corporativo tradicional
* página branca com alguns cards

O resultado deve parecer:

**UM PRODUTO SAAS REAL, PREMIUM E FUTURISTA.**

Quando alguém abrir a página deve imediatamente entender:

"Isso é uma plataforma profissional para empresas venderem, atenderem clientes e automatizarem seus negócios pelo WhatsApp."

---

# 31. RESULTADO ESPERADO

Entregar:

* projeto funcionando
* Landing Page completa
* Navbar
* Hero
* Features
* WhatsApp Automation
* Multi-Tenant
* Dashboard Preview
* Pricing
* Benefits
* Growth
* CTA
* Footer
* Login Modal
* Dark Cyberpunk UI
* animações
* responsividade
* SEO básico
* componentes organizados
* código limpo
* TypeScript sem erros

Ao terminar:

Execute:

npm install

npm run dev

npm run build

Caso existam comandos diferentes no projeto, utilize os scripts existentes do package.json.

Corrija todos os erros encontrados.

NÃO pare apenas na criação dos arquivos.

Você deve deixar o projeto em estado funcional e pronto para ser executado.

---

# 32. IMPORTANTE SOBRE O LOGIN

Não implementar autenticação neste momento.

Criar somente:

LoginModal.tsx

ou equivalente.

Preparar a arquitetura para posteriormente conectar:

Frontend
↓
API
↓
Auth
↓
Tenant
↓
Dashboard

Mas NÃO implementar essa parte agora.

---

# 33. IMPORTANTE SOBRE O FUTURO SAAS

Tenha em mente que esta Landing Page será a porta de entrada do futuro ecossistema DIixWhatsApp.

A arquitetura futura será aproximadamente:

```
                DIixWhatsApp
                     │
             ┌───────┴───────┐
             │               │
          Landing          Login
                             │
                          Auth API
                             │
                     ┌───────┴───────┐
                     │               │
                Administrador     Tenant
                                     │
                          ┌──────────┼──────────┐
                          │          │          │
                        Loja       WhatsApp    Gestão
                          │          │          │
                       Produtos   Automação   Pedidos
                                     │
                                  Clientes
```

A Landing Page deve ser construída pensando nessa evolução.

---

# 34. PRIMEIRA TAREFA

Comece analisando o projeto atual.

Depois:

1. Identifique a stack.
2. Identifique o entrypoint.
3. Identifique o sistema de estilos.
4. Identifique dependências existentes.
5. Planeje os componentes.
6. Implemente a Landing Page.
7. Implemente as animações.
8. Implemente o Login Modal.
9. Execute o projeto.
10. Execute o build.
11. Corrija erros.
12. Faça uma revisão visual final.

Não apenas descreva o que deve ser feito.

**EXECUTE A IMPLEMENTAÇÃO NO PROJETO.**
