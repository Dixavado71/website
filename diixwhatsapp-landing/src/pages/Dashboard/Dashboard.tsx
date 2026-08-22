import { useState } from 'react';
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
  ArrowUpRight
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
import '../../styles/index.css';

const Dashboard = () => {
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  const [showNotifications, setShowNotifications] = useState(false);
  const [selectedPeriod, setSelectedPeriod] = useState('7d');
  const [searchTerm, setSearchTerm] = useState('');
  const [orderStatusFilter, setOrderStatusFilter] = useState('all');
  const [productStatusFilter, setProductStatusFilter] = useState('all');
  const [customerSegmentFilter, setCustomerSegmentFilter] = useState('all');

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
            <button 
              className="notification-btn"
              onClick={() => setShowNotifications(!showNotifications)}
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
              <div className="content-header">
                <h2>{menuItems.find(item => item.id === activeTab)?.label}</h2>
                <p>Em desenvolvimento - Esta funcionalidade estará disponível em breve</p>
              </div>
              <div className="empty-state" style={{ padding: '60px 20px' }}>
                <Bot size={64} className="icon-gray" />
                <h3>Funcionalidade em Desenvolvimento</h3>
                <p>Estamos trabalhando para trazer esta funcionalidade o mais breve possível.</p>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
