import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  TrendingUp, 
  ShoppingCart, 
  Users, 
  MessageSquare, 
  BarChart3,
  Activity,
  Package,
  DollarSign,
  Settings,
  LogOut,
  Menu,
  X,
  Bell,
  Search,
  ChevronDown,
  Store,
  Bot,
  FileText,
  HelpCircle,
  Play,
  Pause,
  Eye,
  Edit,
  Zap,
  ArrowUpRight,
  Download,
  Table,
  Moon,
  Shield,
  CreditCard,
  Mail,
  Phone,
  CheckCircle2,
  Info,
  Sun,
  Wifi
} from 'lucide-react';
import { 
  AreaChart, 
  Area, 
  PieChart, 
  Pie, 
  Cell,
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Legend
} from 'recharts';
import { 
  dashboardMetrics, 
  monthlyRevenueData,
  conversationsByChannel, 
  automationFlows,
  topProducts,
  customerSegments,
  recentOrders, 
  activeConversations,
  notifications
} from '../../data/dashboard';
import OrdersPage from './components/OrdersPage';
import ProductsPage from './components/ProductsPage';
import CustomersPage from './components/CustomersPage';
import ConversationsPage from './components/ConversationsPage';
import StorePage from './components/StorePage';
import AutomationPage from './components/AutomationPage';
import FinancialPage from './components/FinancialPage';
import { useToast } from '../../components/Toast/Toast';
import './Dashboard.css';

const Dashboard = () => {
  const navigate = useNavigate();
  const toast = useToast();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  const [showNotifications, setShowNotifications] = useState(false);
  const [selectedPeriod, setSelectedPeriod] = useState('7d');
  const [searchTerm, setSearchTerm] = useState('');
  const [orderStatusFilter, setOrderStatusFilter] = useState('all');
  const [productStatusFilter, setProductStatusFilter] = useState('all');
  const [customerSegmentFilter, setCustomerSegmentFilter] = useState('all');
  const [reportPeriod, setReportPeriod] = useState('30d');
  const [reportType, setReportType] = useState('all');
  const [isExporting, setIsExporting] = useState(false);
  const [searchHelpQuery, setSearchHelpQuery] = useState('');
  const [expandedFaq, setExpandedFaq] = useState<string | null>(null);
  // Dark mode persistence - initialize from localStorage directly
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem('theme');
    return savedTheme ? savedTheme === 'dark' : true;
  });
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  // Dark mode persistence - only sync to localStorage (already initialized in useState)
  useEffect(() => {
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
    document.documentElement.setAttribute('data-theme', isDarkMode ? 'dark' : 'light');
  }, [isDarkMode]);

  // Online/Offline detection
  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      toast.addToast('Conexão restabelecida!', 'success', 3000);
    };
    const handleOffline = () => {
      setIsOnline(false);
      toast.addToast('Você está offline. Algumas funcionalidades podem não estar disponíveis.', 'warning', 5000);
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, [toast]);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    toast.addToast(`Modo ${!isDarkMode ? 'escuro' : 'claro'} ativado`, 'info', 2000);
  };

  const faqItems = [
    {
      id: 'faq1',
      icon: Info,
      iconClass: 'icon-blue',
      question: 'Como configurar meu primeiro fluxo de automação?',
      answer: 'Acesse a página de Automação, clique em "Novo Fluxo", escolha o tipo de fluxo e configure as mensagens e gatilhos desejados.'
    },
    {
      id: 'faq2',
      icon: Info,
      iconClass: 'icon-cyan',
      question: 'Como integrar com meu WhatsApp Business?',
      answer: 'Vá em Configurações > Integrações, selecione WhatsApp Business e siga as instruções para conectar seu número.'
    },
    {
      id: 'faq3',
      icon: Info,
      iconClass: 'icon-purple',
      question: 'Como exportar relatórios em PDF ou Excel?',
      answer: 'Na página de Relatórios, utilize os botões "Exportar PDF" ou "Exportar Excel" no topo da página para baixar seus dados.'
    },
    {
      id: 'faq4',
      icon: Info,
      iconClass: 'icon-magenta',
      question: 'Como ativar a loja virtual?',
      answer: 'Em Configurações > Loja Virtual, ative a opção "Loja Ativa" e personalize sua URL de acesso.'
    },
    {
      id: 'faq5',
      icon: Info,
      iconClass: 'icon-green',
      question: 'Quais formas de pagamento estão disponíveis?',
      answer: 'O sistema suporta Pix, Cartão de Crédito, Boleto e pode ser integrado com principais gateways de pagamento.'
    }
  ];

  const filteredFaqItems = faqItems.filter(item => 
    searchHelpQuery === '' || 
    item.question.toLowerCase().includes(searchHelpQuery.toLowerCase()) ||
    item.answer.toLowerCase().includes(searchHelpQuery.toLowerCase())
  );

  const menuItems = [
    { id: 'overview', label: 'Visão Geral', icon: BarChart3 },
    { id: 'orders', label: 'Pedidos', icon: ShoppingCart },
    { id: 'products', label: 'Produtos', icon: Package },
    { id: 'customers', label: 'Clientes', icon: Users },
    { id: 'conversations', label: 'Conversas', icon: MessageSquare },
    { id: 'store', label: 'Loja Virtual', icon: Store },
    { id: 'automation', label: 'Automação', icon: Bot },
    { id: 'financial', label: 'Financeiro', icon: DollarSign },
    { id: 'reports', label: 'Relatórios', icon: FileText },
    { id: 'settings', label: 'Configurações', icon: Settings },
    { id: 'help', label: 'Ajuda', icon: HelpCircle },
  ];

  const handleLogout = () => {
    navigate('/');
  };

  const toggleFlowStatus = (flowId: string) => {
    console.log('Toggle flow:', flowId);
  };

  const handleExportReport = (format: 'pdf' | 'excel') => {
    setIsExporting(true);
    console.log(`Exporting report as ${format}...`);
    setTimeout(() => {
      setIsExporting(false);
      toast.addToast(`Relatório exportado com sucesso em formato ${format.toUpperCase()}!`, 'success', 3000);
    }, 1500);
  };

  const handleFilterChange = (filterType: string, value: string) => {
    if (filterType === 'period') setReportPeriod(value);
    if (filterType === 'type') setReportType(value);
    toast.addToast('Filtro atualizado', 'info', 2000);
  };

  return (
    <div className="dashboard-container">
      {/* Sidebar */}
      <aside className={`sidebar ${isMobileMenuOpen ? 'mobile-open' : ''}`}>
        <div className="sidebar-header">
          <h1 className="sidebar-logo gradient-text">DIixWhatsApp</h1>
          <button 
            className="close-sidebar-btn"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <X size={20} />
          </button>
        </div>

        <nav className="sidebar-nav">
          {menuItems.map((item) => (
            <button
              key={item.id}
              className={`sidebar-nav-item ${activeTab === item.id ? 'active' : ''}`}
              onClick={() => {
                setActiveTab(item.id);
                setIsMobileMenuOpen(false);
              }}
            >
              <item.icon size={20} />
              <span>{item.label}</span>
            </button>
          ))}
        </nav>

        <div className="sidebar-footer">
          <button className="sidebar-nav-item logout-btn" onClick={handleLogout}>
            <LogOut size={20} />
            <span>Sair</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="main-content">
        {/* Top Bar */}
        <header className="top-bar">
          <div className="top-bar-left">
            <button 
              className="toggle-sidebar-btn"
              onClick={() => setIsMobileMenuOpen(true)}
            >
              <Menu size={24} />
            </button>
            <div className="search-box">
              <Search size={18} />
              <input type="text" placeholder="Buscar..." />
            </div>
          </div>

          <div className="top-bar-right">
            {/* Online/Offline Indicator */}
            <div className={`connection-status ${isOnline ? 'online' : 'offline'}`} title={isOnline ? 'Online' : 'Offline'}>
              <Wifi size={16} />
            </div>

            {/* Dark Mode Toggle */}
            <button 
              className="theme-toggle-btn"
              onClick={toggleDarkMode}
              aria-label={isDarkMode ? 'Ativar modo claro' : 'Ativar modo escuro'}
            >
              {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>

            <button 
              className="notification-btn"
              onClick={() => setShowNotifications(!showNotifications)}
              aria-label="Notificações"
            >
              <Bell size={20} />
              <span className="notification-badge">{notifications.filter(n => !n.read).length}</span>
            </button>

            {showNotifications && (
              <div className="notifications-dropdown">
                <div className="notifications-header">
                  <h4>Notificações</h4>
                  <button className="mark-all-read">Marcar todas como lidas</button>
                </div>
                <div className="notifications-list">
                  {notifications.map((notification) => (
                    <div key={notification.id} className={`notification-item ${!notification.read ? 'unread' : ''}`}>
                      <div className={`notification-icon ${
                        notification.type === 'order' ? 'icon-green' :
                        notification.type === 'message' ? 'icon-cyan' :
                        notification.type === 'payment' ? 'icon-purple' :
                        notification.type === 'stock' ? 'icon-magenta' : 'icon-blue'
                      }`}>
                        {notification.type === 'order' ? <ShoppingCart size={16} /> :
                         notification.type === 'message' ? <MessageSquare size={16} /> :
                         notification.type === 'payment' ? <DollarSign size={16} /> :
                         notification.type === 'stock' ? <Package size={16} /> :
                         <Zap size={16} />}
                      </div>
                      <div className="notification-content">
                        <p>{notification.message}</p>
                        <span>{notification.time}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            <div className="user-menu">
              <div className="user-avatar">
                <span>U</span>
              </div>
              <span className="user-name">Usuário</span>
              <ChevronDown size={16} />
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <div className="dashboard-content">
          {activeTab === 'overview' && (
            <>
              <div className="content-header">
                <h2>Visão Geral</h2>
                <p>Bem-vindo ao seu painel de controle</p>
              </div>

              {/* Metrics Grid */}
              <div className="metrics-grid">
            {dashboardMetrics.map((metric, idx) => (
              <div key={idx} className={`metric-card glow-${idx === 0 ? 'green' : idx === 1 ? 'cyan' : idx === 2 ? 'purple' : 'magenta'}`}>
                <div className="metric-header">
                  <span className="metric-label">{metric.label}</span>
                  <div className={`metric-icon ${idx === 0 ? 'icon-green' : idx === 1 ? 'icon-cyan' : idx === 2 ? 'icon-purple' : 'icon-magenta'}`}>
                    {idx === 0 ? <TrendingUp size={18} /> :
                     idx === 1 ? <ShoppingCart size={18} /> :
                     idx === 2 ? <Users size={18} /> :
                     <MessageSquare size={18} />}
                  </div>
                </div>
                <div className="metric-value">{metric.value}</div>
                <div className={`metric-change ${metric.positive ? 'positive' : 'negative'}`}>
                  {metric.change} vs mês anterior
                </div>
              </div>
            ))}
          </div>

          {/* Charts Section */}
          <div className="charts-section">
            {/* Revenue Chart - Main */}
            <div className="chart-card-full glow-green">
              <div className="chart-header">
                <h3>Evolução do Faturamento</h3>
                <div className="period-selector">
                  <button 
                    className={selectedPeriod === '7d' ? 'active' : ''}
                    onClick={() => setSelectedPeriod('7d')}
                  >
                    7D
                  </button>
                  <button 
                    className={selectedPeriod === '30d' ? 'active' : ''}
                    onClick={() => setSelectedPeriod('30d')}
                  >
                    30D
                  </button>
                  <button 
                    className={selectedPeriod === '90d' ? 'active' : ''}
                    onClick={() => setSelectedPeriod('90d')}
                  >
                    90D
                  </button>
                </div>
              </div>
              
              <div className="chart-container-large">
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={monthlyRevenueData}>
                    <defs>
                      <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#00FF88" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#00FF88" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                    <XAxis dataKey="month" stroke="#6b7280" />
                    <YAxis stroke="#6b7280" />
                    <Tooltip 
                      contentStyle={{ 
                        background: 'rgba(15, 15, 23, 0.95)', 
                        border: '1px solid rgba(255,255,255,0.1)',
                        borderRadius: '8px',
                        color: '#fff'
                      }} 
                    />
                    <Legend />
                    <Area 
                      type="monotone" 
                      dataKey="revenue" 
                      stroke="#00FF88" 
                      strokeWidth={2}
                      fillOpacity={1} 
                      fill="url(#colorRevenue)" 
                      name="Faturamento (R$)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Secondary Charts Row */}
            <div className="secondary-charts-grid">
              {/* Channel Distribution */}
              <div className="chart-card glow-cyan">
                <div className="chart-header">
                  <h3>Canais de Atendimento</h3>
                  <MessageSquare size={20} className="icon-cyan" />
                </div>
                
                <div className="chart-container">
                  <ResponsiveContainer width="100%" height={200}>
                    <PieChart>
                      <Pie
                        data={conversationsByChannel}
                        cx="50%"
                        cy="50%"
                        innerRadius={50}
                        outerRadius={80}
                        paddingAngle={5}
                        dataKey="value"
                      >
                        {conversationsByChannel.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip 
                        contentStyle={{ 
                          background: 'rgba(15, 15, 23, 0.95)', 
                          border: '1px solid rgba(255,255,255,0.1)',
                          borderRadius: '8px',
                          color: '#fff'
                        }} 
                      />
                    </PieChart>
                  </ResponsiveContainer>
                  
                  <div className="channel-legend">
                    {conversationsByChannel.map((channel, idx) => (
                      <div key={idx} className="legend-item">
                        <span className="legend-dot" style={{ background: channel.color }}></span>
                        <span>{channel.label}: {channel.value}%</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Customer Segments */}
              <div className="chart-card glow-purple">
                <div className="chart-header">
                  <h3>Segmento de Clientes</h3>
                  <Users size={20} className="icon-purple" />
                </div>
                
                <div className="segments-list">
                  {customerSegments.map((segment, idx) => (
                    <div key={idx} className="segment-item">
                      <div className="segment-info">
                        <span className="segment-name">{segment.segment}</span>
                        <span className="segment-count">{segment.count} clientes</span>
                      </div>
                      <div className="segment-bar">
                        <div 
                          className="segment-progress" 
                          style={{ 
                            width: `${segment.percentage}%`,
                            background: segment.color 
                          }}
                        ></div>
                      </div>
                      <span className="segment-percentage">{segment.percentage}%</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Automation Flows */}
          <div className="automation-card glow-magenta">
            <div className="chart-header">
              <h3>Fluxos de Automação</h3>
              <Bot size={20} className="icon-magenta" />
            </div>
            
            <div className="flows-table">
              <div className="flows-header">
                <span>Nome do Fluxo</span>
                <span>Mensagens</span>
                <span>Conversões</span>
                <span>Status</span>
                <span>Ações</span>
              </div>
              {automationFlows.map((flow) => (
                <div key={flow.id} className="flows-row">
                  <div className="flow-name">
                    <Zap size={16} className={flow.active ? 'icon-green' : 'icon-gray'} />
                    <span>{flow.name}</span>
                  </div>
                  <span className="flow-messages">{flow.messages}</span>
                  <span className="flow-conversions">
                    {flow.conversions}
                    <ArrowUpRight size={14} className="icon-green" />
                  </span>
                  <span className={`flow-status ${flow.active ? 'status-active' : 'status-inactive'}`}>
                    {flow.active ? 'Ativo' : 'Inativo'}
                  </span>
                  <div className="flow-actions">
                    <button className="action-btn" title="Editar">
                      <Edit size={16} />
                    </button>
                    <button className="action-btn" title={flow.active ? 'Pausar' : 'Ativar'} onClick={() => toggleFlowStatus(flow.id)}>
                      {flow.active ? <Pause size={16} /> : <Play size={16} />}
                    </button>
                    <button className="action-btn" title="Visualizar">
                      <Eye size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Top Products & Recent Orders */}
          <div className="products-orders-grid">
            {/* Top Products */}
            <div className="products-card glow-cyan">
              <div className="chart-header">
                <h3>Produtos Mais Vendidos</h3>
                <Package size={20} className="icon-cyan" />
              </div>
              
              <div className="products-list">
                {topProducts.map((product, idx) => (
                  <div key={product.id} className="product-item">
                    <div className="product-rank">#{idx + 1}</div>
                    <div className="product-info">
                      <span className="product-name">{product.name}</span>
                      <span className="product-stock">Estoque: {product.stock}</span>
                    </div>
                    <div className="product-stats">
                      <span className="product-sales">{product.sales} vendas</span>
                      <span className="product-revenue">{product.revenue}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Orders */}
            <div className="orders-card glow-purple">
              <div className="chart-header">
                <h3>Pedidos Recentes</h3>
                <Activity size={20} className="icon-purple" />
              </div>
              
              <div className="orders-list-scrollable">
                {recentOrders.slice(0, 6).map((order) => (
                  <div key={order.id} className="order-item">
                    <div className="order-info">
                      <div className="order-icon">
                        <ShoppingCart size={16} />
                      </div>
                      <div>
                        <div className="order-customer">{order.customer}</div>
                        <div className="order-product">{order.product}</div>
                      </div>
                    </div>
                    <div className="order-details">
                      <div className="order-value">{order.value}</div>
                      <div className={`order-status status-${order.status}`}>
                        {order.status === 'completed' ? 'Concluído' :
                         order.status === 'processing' ? 'Processando' :
                         order.status === 'pending' ? 'Pendente' :
                         'Cancelado'}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Active Conversations */}
          <div className="conversations-card glow-magenta">
            <div className="chart-header">
              <h3>Conversas Ativas</h3>
              <MessageSquare size={20} className="icon-magenta" />
              <button className="view-all-btn">Ver todas</button>
            </div>
            
            <div className="conversations-grid">
              {activeConversations.map((conversation) => (
                <div key={conversation.id} className="conversation-item">
                  <div className="conversation-header">
                    <div className="conversation-customer">{conversation.customer}</div>
                    {conversation.unread > 0 && (
                      <span className="conversation-badge">{conversation.unread}</span>
                    )}
                  </div>
                  <p className="conversation-message">{conversation.lastMessage}</p>
                  <span className="conversation-time">{conversation.time}</span>
                </div>
              ))}
            </div>
          </div>
            </>
          )}

          {activeTab === 'orders' && (
            <OrdersPage 
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              orderStatusFilter={orderStatusFilter}
              setOrderStatusFilter={setOrderStatusFilter}
            />
          )}

          {activeTab === 'products' && (
            <ProductsPage 
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              productStatusFilter={productStatusFilter}
              setProductStatusFilter={setProductStatusFilter}
            />
          )}

          {activeTab === 'customers' && (
            <CustomersPage 
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              customerSegmentFilter={customerSegmentFilter}
              setCustomerSegmentFilter={setCustomerSegmentFilter}
            />
          )}

          {activeTab === 'conversations' && (
            <ConversationsPage 
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
            />
          )}

          {activeTab === 'store' && (
            <StorePage 
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
            />
          )}

          {activeTab === 'automation' && (
            <AutomationPage 
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
            />
          )}

          {activeTab === 'financial' && (
            <FinancialPage 
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
            />
          )}

          {['reports', 'settings', 'help'].includes(activeTab) && (
            <div className="dashboard-content">
              {/* Página de Relatórios */}
              {activeTab === 'reports' && (
                <>
                  <div className="content-header">
                    <h2 className="flex-items-center gap-2">
                      <FileText size={24} className="icon-cyan" />
                      Relatórios e Analytics
                    </h2>
                    <p>Analise o desempenho do seu negócio com relatórios detalhados</p>
                  </div>

                  <div className="reports-actions-bar">
                    <div className="report-filters">
                      <select 
                        className="report-type-select" 
                        value={reportPeriod}
                        onChange={(e) => handleFilterChange('period', e.target.value)}
                      >
                        <option value="7d">Últimos 7 dias</option>
                        <option value="30d">Últimos 30 dias</option>
                        <option value="90d">Últimos 90 dias</option>
                        <option value="12m">Últimos 12 meses</option>
                      </select>
                      <select 
                        className="report-type-select"
                        value={reportType}
                        onChange={(e) => handleFilterChange('type', e.target.value)}
                      >
                        <option value="all">Todos os Relatórios</option>
                        <option value="sales">Vendas</option>
                        <option value="customers">Clientes</option>
                        <option value="products">Produtos</option>
                        <option value="financial">Financeiro</option>
                        <option value="automation">Automação</option>
                        <option value="conversations">Conversas</option>
                      </select>
                    </div>
                    <div className="report-actions">
                      <button 
                        className="export-btn"
                        onClick={() => handleExportReport('pdf')}
                        disabled={isExporting}
                      >
                        <Download size={16} />
                        <span>{isExporting ? 'Exportando...' : 'Exportar PDF'}</span>
                      </button>
                      <button 
                        className="export-btn"
                        onClick={() => handleExportReport('excel')}
                        disabled={isExporting}
                      >
                        <Table size={16} />
                        <span>{isExporting ? 'Exportando...' : 'Exportar Excel'}</span>
                      </button>
                    </div>
                  </div>

                  <div className="reports-grid">
                    <div className="report-card glow-green">
                      <div className="report-icon">
                        <TrendingUp size={24} />
                      </div>
                      <h3>Relatório de Vendas</h3>
                      <p>Análise completa do desempenho de vendas por período, produto e canal</p>
                      <div className="report-stats">
                        <span>+15.3% Crescimento</span>
                        <span>R$ 44.540 Total</span>
                      </div>
                      <button className="view-report-btn">Ver Relatório</button>
                    </div>

                    <div className="report-card glow-cyan">
                      <div className="report-icon">
                        <Users size={24} />
                      </div>
                      <h3>Relatório de Clientes</h3>
                      <p>Segmentação, comportamento e métricas de retenção de clientes</p>
                      <div className="report-stats">
                        <span>3.456 Clientes</span>
                        <span>78% Retenção</span>
                      </div>
                      <button className="view-report-btn">Ver Relatório</button>
                    </div>

                    <div className="report-card glow-purple">
                      <div className="report-icon">
                        <Package size={24} />
                      </div>
                      <h3>Relatório de Produtos</h3>
                      <p>Desempenho de produtos, estoque e giro de mercadorias</p>
                      <div className="report-stats">
                        <span>156 Produtos</span>
                        <span>89% Em Estoque</span>
                      </div>
                      <button className="view-report-btn">Ver Relatório</button>
                    </div>

                    <div className="report-card glow-magenta">
                      <div className="report-icon">
                        <DollarSign size={24} />
                      </div>
                      <h3>Relatório Financeiro</h3>
                      <p>Receitas, despesas, fluxo de caixa e projeções financeiras</p>
                      <div className="report-stats">
                        <span>R$ 37.766 Saldo</span>
                        <span>+12.5% Lucro</span>
                      </div>
                      <button className="view-report-btn">Ver Relatório</button>
                    </div>

                    <div className="report-card glow-green">
                      <div className="report-icon">
                        <Bot size={24} />
                      </div>
                      <h3>Relatório de Automação</h3>
                      <p>Eficiência dos fluxos automatizados e taxa de conversão</p>
                      <div className="report-stats">
                        <span>8 Fluxos</span>
                        <span>671 Conversões</span>
                      </div>
                      <button className="view-report-btn">Ver Relatório</button>
                    </div>

                    <div className="report-card glow-cyan">
                      <div className="report-icon">
                        <MessageSquare size={24} />
                      </div>
                      <h3>Relatório de Conversas</h3>
                      <p>Métricas de atendimento, tempo de resposta e satisfação</p>
                      <div className="report-stats">
                        <span>&lt; 1s Resposta</span>
                        <span>98% Satisfação</span>
                      </div>
                      <button className="view-report-btn">Ver Relatório</button>
                    </div>
                  </div>
                </>
              )}

              {/* Página de Configurações */}
              {activeTab === 'settings' && (
                <>
                  <div className="content-header">
                    <h2 className="flex-items-center gap-2">
                      <Settings size={24} className="icon-purple" />
                      Configurações
                    </h2>
                    <p>Gerencie as preferências e configurações da sua conta</p>
                  </div>

                  <div className="settings-grid">
                    <div className="settings-card">
                      <div className="settings-header">
                        <Shield size={20} className="icon-green" />
                        <h3>Segurança</h3>
                      </div>
                      <div className="settings-content">
                        <div className="setting-item">
                          <div className="setting-info">
                            <span className="setting-label">Autenticação de Dois Fatores</span>
                            <span className="setting-desc">Proteja sua conta com 2FA</span>
                          </div>
                          <label className="toggle-switch">
                            <input type="checkbox" defaultChecked />
                            <span className="toggle-slider"></span>
                          </label>
                        </div>
                        <div className="setting-item">
                          <div className="setting-info">
                            <span className="setting-label">Senha Forte</span>
                            <span className="setting-desc">Exigir senha complexa</span>
                          </div>
                          <button className="btn-outline">Alterar Senha</button>
                        </div>
                        <div className="setting-item">
                          <div className="setting-info">
                            <span className="setting-label">Sessões Ativas</span>
                            <span className="setting-desc">2 dispositivos conectados</span>
                          </div>
                          <button className="btn-link">Gerenciar</button>
                        </div>
                      </div>
                    </div>

                    <div className="settings-card">
                      <div className="settings-header">
                        <Bell size={20} className="icon-cyan" />
                        <h3>Notificações</h3>
                      </div>
                      <div className="settings-content">
                        <div className="setting-item">
                          <div className="setting-info">
                            <span className="setting-label">Notificações Push</span>
                            <span className="setting-desc">Receba alertas no navegador</span>
                          </div>
                          <label className="toggle-switch">
                            <input type="checkbox" defaultChecked />
                            <span className="toggle-slider"></span>
                          </label>
                        </div>
                        <div className="setting-item">
                          <div className="setting-info">
                            <span className="setting-label">Email de Pedidos</span>
                            <span className="setting-desc">Notifique novos pedidos</span>
                          </div>
                          <label className="toggle-switch">
                            <input type="checkbox" defaultChecked />
                            <span className="toggle-slider"></span>
                          </label>
                        </div>
                        <div className="setting-item">
                          <div className="setting-info">
                            <span className="setting-label">Alertas de Estoque</span>
                            <span className="setting-desc">Aviso de produto baixo</span>
                          </div>
                          <label className="toggle-switch">
                            <input type="checkbox" />
                            <span className="toggle-slider"></span>
                          </label>
                        </div>
                      </div>
                    </div>

                    <div className="settings-card">
                      <div className="settings-header">
                        <Moon size={20} className="icon-purple" />
                        <h3>Aparência</h3>
                      </div>
                      <div className="settings-content">
                        <div className="setting-item">
                          <div className="setting-info">
                            <span className="setting-label">Tema Escuro</span>
                            <span className="setting-desc">Modo noturno ativado</span>
                          </div>
                          <label className="toggle-switch">
                            <input type="checkbox" defaultChecked />
                            <span className="toggle-slider"></span>
                          </label>
                        </div>
                        <div className="setting-item">
                          <div className="setting-info">
                            <span className="setting-label">Idioma</span>
                            <span className="setting-desc">Português (Brasil)</span>
                          </div>
                          <select className="setting-select">
                            <option>Português</option>
                            <option>English</option>
                            <option>Español</option>
                          </select>
                        </div>
                      </div>
                    </div>

                    <div className="settings-card">
                      <div className="settings-header">
                        <Store size={20} className="icon-magenta" />
                        <h3>Loja Virtual</h3>
                      </div>
                      <div className="settings-content">
                        <div className="setting-item">
                          <div className="setting-info">
                            <span className="setting-label">Loja Ativa</span>
                            <span className="setting-desc">Visível para clientes</span>
                          </div>
                          <label className="toggle-switch">
                            <input type="checkbox" defaultChecked />
                            <span className="toggle-slider"></span>
                          </label>
                        </div>
                        <div className="setting-item">
                          <div className="setting-info">
                            <span className="setting-label">URL da Loja</span>
                            <span className="setting-desc">sualoja.diix.com.br</span>
                          </div>
                          <button className="btn-outline">Editar</button>
                        </div>
                      </div>
                    </div>

                    <div className="settings-card">
                      <div className="settings-header">
                        <Bot size={20} className="icon-green" />
                        <h3>Chatbot</h3>
                      </div>
                      <div className="settings-content">
                        <div className="setting-item">
                          <div className="setting-info">
                            <span className="setting-label">Chatbot Ativo</span>
                            <span className="setting-desc">Respostas automáticas</span>
                          </div>
                          <label className="toggle-switch">
                            <input type="checkbox" defaultChecked />
                            <span className="toggle-slider"></span>
                          </label>
                        </div>
                        <div className="setting-item">
                          <div className="setting-info">
                            <span className="setting-label">Tempo de Resposta</span>
                            <span className="setting-desc">&lt; 1 segundo</span>
                          </div>
                          <button className="btn-outline">Configurar</button>
                        </div>
                      </div>
                    </div>

                    <div className="settings-card">
                      <div className="settings-header">
                        <CreditCard size={20} className="icon-cyan" />
                        <h3>Pagamentos</h3>
                      </div>
                      <div className="settings-content">
                        <div className="setting-item">
                          <div className="setting-info">
                            <span className="setting-label">Pix</span>
                            <span className="setting-desc">Chave cadastrada</span>
                          </div>
                          <CheckCircle2 size={20} className="icon-green" />
                        </div>
                        <div className="setting-item">
                          <div className="setting-info">
                            <span className="setting-label">Cartão de Crédito</span>
                            <span className="setting-desc">Gateway configurado</span>
                          </div>
                          <CheckCircle2 size={20} className="icon-green" />
                        </div>
                        <div className="setting-item">
                          <div className="setting-info">
                            <span className="setting-label">Boleto</span>
                            <span className="setting-desc">Banco registrado</span>
                          </div>
                          <CheckCircle2 size={20} className="icon-green" />
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              )}

              {/* Página de Ajuda */}
              {activeTab === 'help' && (
                <>
                  <div className="content-header">
                    <h2 className="flex-items-center gap-2">
                      <HelpCircle size={24} className="icon-magenta" />
                      Central de Ajuda
                    </h2>
                    <p>Encontre respostas e suporte para utilizar o DIixWhatsApp</p>
                  </div>

                  <div className="help-search-box">
                    <Search size={20} />
                    <input 
                      type="text" 
                      placeholder="Como podemos ajudar? Digite sua dúvida..." 
                      value={searchHelpQuery}
                      onChange={(e) => setSearchHelpQuery(e.target.value)}
                    />
                  </div>

                  {searchHelpQuery && (
                    <div className="search-results-info">
                      <span>{filteredFaqItems.length} resultado(s) encontrado(s)</span>
                    </div>
                  )}

                  <div className="help-categories">
                    <h3>Categorias</h3>
                    <div className="help-grid">
                      <div className="help-category-card">
                        <ShoppingCart size={32} className="icon-green" />
                        <h4>Pedidos</h4>
                        <p>Gerencie pedidos, status e entregas</p>
                        <span className="help-count">12 artigos</span>
                      </div>
                      <div className="help-category-card">
                        <Package size={32} className="icon-cyan" />
                        <h4>Produtos</h4>
                        <p>Cadastre e organize seus produtos</p>
                        <span className="help-count">8 artigos</span>
                      </div>
                      <div className="help-category-card">
                        <Users size={32} className="icon-purple" />
                        <h4>Clientes</h4>
                        <p>Gerencie clientes e relacionamentos</p>
                        <span className="help-count">10 artigos</span>
                      </div>
                      <div className="help-category-card">
                        <MessageSquare size={32} className="icon-magenta" />
                        <h4>Conversas</h4>
                        <p>Atendimento e chatbot</p>
                        <span className="help-count">15 artigos</span>
                      </div>
                      <div className="help-category-card">
                        <Bot size={32} className="icon-green" />
                        <h4>Automação</h4>
                        <p>Fluxos automatizados de atendimento</p>
                        <span className="help-count">9 artigos</span>
                      </div>
                      <div className="help-category-card">
                        <DollarSign size={32} className="icon-cyan" />
                        <h4>Financeiro</h4>
                        <p>Receitas, despesas e relatórios</p>
                        <span className="help-count">7 artigos</span>
                      </div>
                    </div>
                  </div>

                  <div className="help-faq">
                    <h3>Perguntas Frequentes</h3>
                    <div className="faq-list">
                      {filteredFaqItems.length > 0 ? (
                        filteredFaqItems.map((item) => (
                          <details 
                            key={item.id} 
                            className="faq-item"
                            open={expandedFaq === item.id}
                            onToggle={(e) => {
                              if ((e.target as HTMLDetailsElement).open) {
                                setExpandedFaq(item.id);
                              } else {
                                setExpandedFaq(null);
                              }
                            }}
                          >
                            <summary>
                              <item.icon size={18} className={item.iconClass} />
                              <span>{item.question}</span>
                            </summary>
                            <p>{item.answer}</p>
                          </details>
                        ))
                      ) : (
                        <div className="no-results">
                          <Info size={48} className="icon-gray" />
                          <p>Nenhum resultado encontrado para "{searchHelpQuery}"</p>
                          <span>Tente buscar por outros termos ou navegue pelas categorias</span>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="help-contact">
                    <h3>Precisa de mais ajuda?</h3>
                    <p>Nossa equipe está pronta para atender você</p>
                    <div className="contact-options">
                      <button className="contact-btn">
                        <Mail size={20} />
                        <span>Email</span>
                      </button>
                      <button className="contact-btn">
                        <Phone size={20} />
                        <span>Telefone</span>
                      </button>
                      <button className="contact-btn">
                        <MessageSquare size={20} />
                        <span>Chat Online</span>
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
