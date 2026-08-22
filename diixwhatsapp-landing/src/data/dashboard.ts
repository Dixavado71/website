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

export const monthlyRevenueData = [
  { month: 'Jan', revenue: 45000, orders: 320 },
  { month: 'Fev', revenue: 52000, orders: 380 },
  { month: 'Mar', revenue: 48000, orders: 350 },
  { month: 'Abr', revenue: 61000, orders: 420 },
  { month: 'Mai', revenue: 58000, orders: 400 },
  { month: 'Jun', revenue: 72000, orders: 480 },
  { month: 'Jul', revenue: 78431, orders: 520 },
];

export const conversationsByChannel = [
  { label: 'WhatsApp', value: 65, color: '#00FF88' },
  { label: 'Instagram', value: 20, color: '#FF2ED1' },
  { label: 'Facebook', value: 10, color: '#7B61FF' },
  { label: 'Site', value: 5, color: '#00E5FF' },
];

export const automationFlows = [
  { id: '1', name: 'Boas-vindas', messages: 5, active: true, conversions: 124 },
  { id: '2', name: 'Recuperação de Carrinho', messages: 3, active: true, conversions: 89 },
  { id: '3', name: 'Pós-venda', messages: 4, active: true, conversions: 67 },
  { id: '4', name: 'Promoções', messages: 2, active: false, conversions: 45 },
  { id: '5', name: 'Suporte Técnico', messages: 6, active: true, conversions: 34 },
];

export const topProducts = [
  { id: '1', name: 'Kit Skincare Premium', sales: 234, revenue: 'R$ 69.498', stock: 45 },
  { id: '2', name: 'Smartwatch Pro', sales: 189, revenue: 'R$ 103.761', stock: 23 },
  { id: '3', name: 'Fone Bluetooth', sales: 167, revenue: 'R$ 31.563', stock: 78 },
  { id: '4', name: 'Teclado Mecânico', sales: 145, revenue: 'R$ 62.205', stock: 12 },
  { id: '5', name: 'Mouse Gamer', sales: 132, revenue: 'R$ 32.868', stock: 56 },
];

export const customerSegments = [
  { segment: 'VIP', count: 245, percentage: 8.6, color: '#FFD700' },
  { segment: 'Frequente', count: 892, percentage: 31.3, color: '#00E5FF' },
  { segment: 'Ocasional', count: 1234, percentage: 43.4, color: '#7B61FF' },
  { segment: 'Novo', count: 475, percentage: 16.7, color: '#00FF88' },
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
  {
    id: '#ORD-005',
    customer: 'Lucas Ferreira',
    product: 'Mouse Gamer',
    value: 'R$ 249,00',
    status: 'processing',
    date: '2026-01-13',
  },
  {
    id: '#ORD-006',
    customer: 'Beatriz Lima',
    product: 'Cadeira Ergonômica',
    value: 'R$ 899,00',
    status: 'pending',
    date: '2026-01-13',
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
  {
    id: '4',
    customer: 'Patrícia Souza',
    lastMessage: 'Tem desconto para atacado?',
    time: '18min atrás',
    unread: 1,
  },
  {
    id: '5',
    customer: 'Marcos Henrique',
    lastMessage: 'Quero cancelar meu pedido',
    time: '25min atrás',
    unread: 3,
  },
];

export const notifications = [
  { id: '1', type: 'order', message: 'Novo pedido #ORD-007 recebido', time: '1min atrás', read: false },
  { id: '2', type: 'message', message: 'Carlos Mendes enviou uma mensagem', time: '2min atrás', read: false },
  { id: '3', type: 'payment', message: 'Pagamento de R$ 549,00 confirmado', time: '15min atrás', read: false },
  { id: '4', type: 'stock', message: 'Produto "Teclado Mecânico" com estoque baixo', time: '1h atrás', read: true },
  { id: '5', type: 'automation', message: 'Fluxo "Boas-vindas" completou 100 conversões', time: '2h atrás', read: true },
];
