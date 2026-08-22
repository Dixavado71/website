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

// Dados para página de Pedidos
export interface Order {
  id: string;
  customer: string;
  customerEmail: string;
  customerPhone: string;
  product: string;
  quantity: number;
  value: string;
  status: 'pending' | 'processing' | 'completed' | 'cancelled';
  paymentMethod: 'credit_card' | 'debit_card' | 'pix' | 'boleto' | 'whatsapp_pay';
  date: string;
  shippingAddress: string;
}

export const allOrders: Order[] = [
  {
    id: '#ORD-001',
    customer: 'Maria Silva',
    customerEmail: 'maria.silva@email.com',
    customerPhone: '(11) 98765-4321',
    product: 'Kit Skincare Premium',
    quantity: 1,
    value: 'R$ 297,00',
    status: 'completed',
    paymentMethod: 'credit_card',
    date: '2026-01-15',
    shippingAddress: 'Rua das Flores, 123 - São Paulo, SP',
  },
  {
    id: '#ORD-002',
    customer: 'João Santos',
    customerEmail: 'joao.santos@email.com',
    customerPhone: '(21) 97654-3210',
    product: 'Smartwatch Pro',
    quantity: 1,
    value: 'R$ 549,00',
    status: 'processing',
    paymentMethod: 'pix',
    date: '2026-01-15',
    shippingAddress: 'Av. Paulista, 456 - São Paulo, SP',
  },
  {
    id: '#ORD-003',
    customer: 'Ana Costa',
    customerEmail: 'ana.costa@email.com',
    customerPhone: '(31) 96543-2109',
    product: 'Fone Bluetooth',
    quantity: 2,
    value: 'R$ 378,00',
    status: 'pending',
    paymentMethod: 'boleto',
    date: '2026-01-14',
    shippingAddress: 'Rua da Bahia, 789 - Belo Horizonte, MG',
  },
  {
    id: '#ORD-004',
    customer: 'Pedro Oliveira',
    customerEmail: 'pedro.oliveira@email.com',
    customerPhone: '(41) 95432-1098',
    product: 'Teclado Mecânico',
    quantity: 1,
    value: 'R$ 429,00',
    status: 'completed',
    paymentMethod: 'credit_card',
    date: '2026-01-14',
    shippingAddress: 'Rua XV de Novembro, 321 - Curitiba, PR',
  },
  {
    id: '#ORD-005',
    customer: 'Lucas Ferreira',
    customerEmail: 'lucas.ferreira@email.com',
    customerPhone: '(51) 94321-0987',
    product: 'Mouse Gamer',
    quantity: 1,
    value: 'R$ 249,00',
    status: 'processing',
    paymentMethod: 'pix',
    date: '2026-01-13',
    shippingAddress: 'Av. Ipiranga, 654 - Porto Alegre, RS',
  },
  {
    id: '#ORD-006',
    customer: 'Beatriz Lima',
    customerEmail: 'beatriz.lima@email.com',
    customerPhone: '(71) 93210-8765',
    product: 'Cadeira Ergonômica',
    quantity: 1,
    value: 'R$ 899,00',
    status: 'pending',
    paymentMethod: 'credit_card',
    date: '2026-01-13',
    shippingAddress: 'Rua Chile, 987 - Salvador, BA',
  },
  {
    id: '#ORD-007',
    customer: 'Carlos Mendes',
    customerEmail: 'carlos.mendes@email.com',
    customerPhone: '(81) 92109-7654',
    product: 'Monitor 27"',
    quantity: 1,
    value: 'R$ 1.299,00',
    status: 'completed',
    paymentMethod: 'pix',
    date: '2026-01-12',
    shippingAddress: 'Av. Boa Viagem, 147 - Recife, PE',
  },
  {
    id: '#ORD-008',
    customer: 'Fernanda Lima',
    customerEmail: 'fernanda.lima@email.com',
    customerPhone: '(61) 91098-6543',
    product: 'Webcam HD',
    quantity: 1,
    value: 'R$ 189,00',
    status: 'cancelled',
    paymentMethod: 'boleto',
    date: '2026-01-12',
    shippingAddress: 'SQN 312, Bloco A - Brasília, DF',
  },
];

// Dados para página de Produtos
export interface Product {
  id: string;
  name: string;
  description: string;
  category: string;
  price: string;
  cost: string;
  stock: number;
  minStock: number;
  sales: number;
  revenue: string;
  status: 'active' | 'inactive' | 'low_stock';
  image?: string;
}

export const products: Product[] = [
  {
    id: '1',
    name: 'Kit Skincare Premium',
    description: 'Kit completo com limpador, tônico e hidratante facial',
    category: 'Beleza',
    price: 'R$ 297,00',
    cost: 'R$ 120,00',
    stock: 45,
    minStock: 10,
    sales: 234,
    revenue: 'R$ 69.498',
    status: 'active',
  },
  {
    id: '2',
    name: 'Smartwatch Pro',
    description: 'Relógio inteligente com monitor cardíaco e GPS',
    category: 'Eletrônicos',
    price: 'R$ 549,00',
    cost: 'R$ 280,00',
    stock: 23,
    minStock: 15,
    sales: 189,
    revenue: 'R$ 103.761',
    status: 'low_stock',
  },
  {
    id: '3',
    name: 'Fone Bluetooth',
    description: 'Fone de ouvido sem fio com cancelamento de ruído',
    category: 'Eletrônicos',
    price: 'R$ 189,00',
    cost: 'R$ 85,00',
    stock: 78,
    minStock: 20,
    sales: 167,
    revenue: 'R$ 31.563',
    status: 'active',
  },
  {
    id: '4',
    name: 'Teclado Mecânico',
    description: 'Teclado mecânico RGB com switches azuis',
    category: 'Periféricos',
    price: 'R$ 429,00',
    cost: 'R$ 200,00',
    stock: 12,
    minStock: 15,
    sales: 145,
    revenue: 'R$ 62.205',
    status: 'low_stock',
  },
  {
    id: '5',
    name: 'Mouse Gamer',
    description: 'Mouse óptico de alta precisão 16000 DPI',
    category: 'Periféricos',
    price: 'R$ 249,00',
    cost: 'R$ 110,00',
    stock: 56,
    minStock: 20,
    sales: 132,
    revenue: 'R$ 32.868',
    status: 'active',
  },
  {
    id: '6',
    name: 'Cadeira Ergonômica',
    description: 'Cadeira office com ajuste lombar e braços 4D',
    category: 'Móveis',
    price: 'R$ 899,00',
    cost: 'R$ 450,00',
    stock: 8,
    minStock: 5,
    sales: 67,
    revenue: 'R$ 60.233',
    status: 'low_stock',
  },
  {
    id: '7',
    name: 'Monitor 27"',
    description: 'Monitor IPS 144Hz 1ms FreeSync',
    category: 'Eletrônicos',
    price: 'R$ 1.299,00',
    cost: 'R$ 750,00',
    stock: 34,
    minStock: 10,
    sales: 89,
    revenue: 'R$ 115.611',
    status: 'active',
  },
  {
    id: '8',
    name: 'Webcam HD',
    description: 'Câmera web 1080p com microfone integrado',
    category: 'Periféricos',
    price: 'R$ 189,00',
    cost: 'R$ 90,00',
    stock: 0,
    minStock: 15,
    sales: 45,
    revenue: 'R$ 8.505',
    status: 'inactive',
  },
];

// Dados para página de Clientes
export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  totalOrders: number;
  totalSpent: string;
  lastPurchase: string;
  segment: 'vip' | 'frequent' | 'occasional' | 'new';
  status: 'active' | 'inactive';
  registeredAt: string;
}

export const customers: Customer[] = [
  {
    id: '1',
    name: 'Maria Silva',
    email: 'maria.silva@email.com',
    phone: '(11) 98765-4321',
    totalOrders: 12,
    totalSpent: 'R$ 4.567,00',
    lastPurchase: '2026-01-15',
    segment: 'vip',
    status: 'active',
    registeredAt: '2025-03-10',
  },
  {
    id: '2',
    name: 'João Santos',
    email: 'joao.santos@email.com',
    phone: '(21) 97654-3210',
    totalOrders: 8,
    totalSpent: 'R$ 3.245,00',
    lastPurchase: '2026-01-15',
    segment: 'frequent',
    status: 'active',
    registeredAt: '2025-05-22',
  },
  {
    id: '3',
    name: 'Ana Costa',
    email: 'ana.costa@email.com',
    phone: '(31) 96543-2109',
    totalOrders: 5,
    totalSpent: 'R$ 1.890,00',
    lastPurchase: '2026-01-14',
    segment: 'occasional',
    status: 'active',
    registeredAt: '2025-08-15',
  },
  {
    id: '4',
    name: 'Pedro Oliveira',
    email: 'pedro.oliveira@email.com',
    phone: '(41) 95432-1098',
    totalOrders: 15,
    totalSpent: 'R$ 6.789,00',
    lastPurchase: '2026-01-14',
    segment: 'vip',
    status: 'active',
    registeredAt: '2025-02-08',
  },
  {
    id: '5',
    name: 'Lucas Ferreira',
    email: 'lucas.ferreira@email.com',
    phone: '(51) 94321-0987',
    totalOrders: 3,
    totalSpent: 'R$ 987,00',
    lastPurchase: '2026-01-13',
    segment: 'new',
    status: 'active',
    registeredAt: '2025-11-20',
  },
  {
    id: '6',
    name: 'Beatriz Lima',
    email: 'beatriz.lima@email.com',
    phone: '(71) 93210-8765',
    totalOrders: 6,
    totalSpent: 'R$ 2.345,00',
    lastPurchase: '2026-01-13',
    segment: 'frequent',
    status: 'active',
    registeredAt: '2025-06-30',
  },
  {
    id: '7',
    name: 'Carlos Mendes',
    email: 'carlos.mendes@email.com',
    phone: '(81) 92109-7654',
    totalOrders: 10,
    totalSpent: 'R$ 5.123,00',
    lastPurchase: '2026-01-12',
    segment: 'vip',
    status: 'active',
    registeredAt: '2025-04-18',
  },
  {
    id: '8',
    name: 'Fernanda Lima',
    email: 'fernanda.lima@email.com',
    phone: '(61) 91098-6543',
    totalOrders: 2,
    totalSpent: 'R$ 456,00',
    lastPurchase: '2026-01-12',
    segment: 'new',
    status: 'active',
    registeredAt: '2025-12-05',
  },
  {
    id: '9',
    name: 'Roberto Alves',
    email: 'roberto.alves@email.com',
    phone: '(11) 90987-5432',
    totalOrders: 4,
    totalSpent: 'R$ 1.234,00',
    lastPurchase: '2025-11-20',
    segment: 'occasional',
    status: 'inactive',
    registeredAt: '2025-07-12',
  },
  {
    id: '10',
    name: 'Patrícia Souza',
    email: 'patricia.souza@email.com',
    phone: '(21) 89876-4321',
    totalOrders: 7,
    totalSpent: 'R$ 2.890,00',
    lastPurchase: '2026-01-10',
    segment: 'frequent',
    status: 'active',
    registeredAt: '2025-05-05',
  },
];
