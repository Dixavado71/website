export interface ChatMessage {
  id: string;
  sender: 'client' | 'system';
  text: string;
  timestamp?: string;
  options?: string[];
}

export interface AutomationStep {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export const chatMessages: ChatMessage[] = [
  {
    id: '1',
    sender: 'client',
    text: 'Olá, gostaria de ver os produtos disponíveis.',
    timestamp: '10:32',
  },
  {
    id: '2',
    sender: 'system',
    text: 'Olá! 👋 Seja bem-vindo à nossa loja.\n\nEscolha uma opção:',
    timestamp: '10:32',
    options: [
      '1. Ver produtos',
      '2. Fazer pedido',
      '3. Acompanhar pedido',
      '4. Falar com atendente',
    ],
  },
];

export const automationSteps: AutomationStep[] = [
  {
    id: '1',
    title: 'Mensagem Recebida',
    description: 'Cliente envia mensagem',
    icon: 'MessageSquare',
  },
  {
    id: '2',
    title: 'IA Inteligente',
    description: 'Processa e entende intenção',
    icon: 'Bot',
  },
  {
    id: '3',
    title: 'Resposta Automática',
    description: 'Sistema responde instantaneamente',
    icon: 'Send',
  },
  {
    id: '4',
    title: 'Ação Executada',
    description: 'Cria pedido ou transfere',
    icon: 'CheckCircle',
  },
];

export const automationFeatures = [
  {
    title: 'Atendimento 24/7',
    description: 'Seu negócio nunca para, mesmo quando você descansa.',
  },
  {
    title: 'Respostas Instantâneas',
    description: 'Clientes atendidos em menos de 1 segundo.',
  },
  {
    title: 'Fluxos Personalizados',
    description: 'Crie jornadas únicas para cada tipo de cliente.',
  },
  {
    title: 'Integração Total',
    description: 'Conecta com sua loja, pedidos e clientes.',
  },
];
