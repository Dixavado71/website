export interface DashboardMetric {
  label: string;
  value: string;
  change: string;
  positive: boolean;
}

export interface ChartDataPoint {
  label: string;
  value: number;
}

export interface RecentOrder {
  id: string;
  customer: string;
  product: string;
  value: string;
  status: 'pending' | 'processing' | 'completed' | 'cancelled';
  date: string;
}

export interface ActiveConversation {
  id: string;
  customer: string;
  lastMessage: string;
  time: string;
  unread: number;
}

export const dashboardMetrics: DashboardMetric[] = [
  {
    label: 'Faturamento',
    value: 'R$ 78.431,00',
    change: '+12,5%',
    positive: true,
  },
  {
    label: 'Pedidos',
    value: '1.248',
    change: '+8,4%',
    positive: true,
  },
  {
    label: 'Clientes',
    value: '2.846',
    change: '+11,2%',
    positive: true,
  },
  {
    label: 'Conversas',
    value: '4.229',
    change: '+15,3%',
    positive: true,
  },
];

export const salesChartData: ChartDataPoint[] = [
  { label: 'Seg', value: 65 },
  { label: 'Ter', value: 78 },
  { label: 'Qua', value: 52 },
  { label: 'Qui', value: 91 },
  { label: 'Sex', value: 84 },
  { label: 'Sáb', value: 73 },
  { label: 'Dom', value: 58 },
];

export const conversationsByChannel = [
  { label: 'WhatsApp', value: 65, color: '#00FF88' },
  { label: 'Instagram', value: 20, color: '#FF2ED1' },
  { label: 'Facebook', value: 10, color: '#7B61FF' },
  { label: 'Site', value: 5, color: '#00E5FF' },
];

export const recentOrders: RecentOrder[] = [
  {
    id: '#ORD-001',
    customer: 'Maria Silva',
    product: 'Kit Skincare Premium',
    value: 'R$ 297,00',
    status: 'completed',
    date: '2026-01-15',
  },
  {
    id: '#ORD-002',
    customer: 'João Santos',
    product: 'Smartwatch Pro',
    value: 'R$ 549,00',
    status: 'processing',
    date: '2026-01-15',
  },
  {
    id: '#ORD-003',
    customer: 'Ana Costa',
    product: 'Fone Bluetooth',
    value: 'R$ 189,00',
    status: 'pending',
    date: '2026-01-14',
  },
  {
    id: '#ORD-004',
    customer: 'Pedro Oliveira',
    product: 'Teclado Mecânico',
    value: 'R$ 429,00',
    status: 'completed',
    date: '2026-01-14',
  },
];

export const activeConversations: ActiveConversation[] = [
  {
    id: '1',
    customer: 'Carlos Mendes',
    lastMessage: 'Gostaria de ver os produtos disponíveis',
    time: '2min atrás',
    unread: 2,
  },
  {
    id: '2',
    customer: 'Fernanda Lima',
    lastMessage: 'Qual o prazo de entrega?',
    time: '5min atrás',
    unread: 1,
  },
  {
    id: '3',
    customer: 'Roberto Alves',
    lastMessage: 'Preciso de ajuda com meu pedido',
    time: '12min atrás',
    unread: 0,
  },
];
