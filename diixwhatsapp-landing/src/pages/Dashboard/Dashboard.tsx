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
  HelpCircle
} from 'lucide-react';
import { dashboardMetrics, salesChartData, recentOrders, activeConversations } from '../../data/dashboard';
import './Dashboard.css';

const Dashboard = () => {
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');

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
            <button className="notification-btn">
              <Bell size={20} />
              <span className="notification-badge">3</span>
            </button>
            
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
          <div className="charts-grid">
            {/* Sales Chart */}
            <div className="chart-card glow-cyan">
              <div className="chart-header">
                <h3>Vendas da Semana</h3>
                <BarChart3 size={20} className="icon-cyan" />
              </div>
              
              <div className="chart-container">
                <svg className="sales-chart" viewBox="0 0 400 200" preserveAspectRatio="none">
                  {[0, 50, 100, 150, 200].map((y) => (
                    <line
                      key={y}
                      x1="0"
                      y1={y}
                      x2="400"
                      y2={y}
                      stroke="rgba(255,255,255,0.05)"
                      strokeWidth="1"
                    />
                  ))}
                  
                  <path
                    d={`M0,200 L0,${200 - salesChartData[0].value * 2} L57,${200 - salesChartData[1].value * 2} L114,${200 - salesChartData[2].value * 2} L171,${200 - salesChartData[3].value * 2} L228,${200 - salesChartData[4].value * 2} L285,${200 - salesChartData[5].value * 2} L342,${200 - salesChartData[6].value * 2} L400,${200 - salesChartData[6].value * 2} L400,200 Z`}
                    fill="rgba(0, 229, 255, 0.1)"
                  />
                  
                  <polyline
                    points={salesChartData.map((point, idx) => 
                      `${idx * 57},${200 - point.value * 2}`
                    ).join(' ')}
                    fill="none"
                    stroke="#00E5FF"
                    strokeWidth="2"
                  />
                  
                  {salesChartData.map((point, idx) => (
                    <circle
                      key={idx}
                      cx={idx * 57}
                      cy={200 - point.value * 2}
                      r="4"
                      fill="#00E5FF"
                    />
                  ))}
                </svg>
                
                <div className="chart-x-labels">
                  {salesChartData.map((point, idx) => (
                    <span key={idx}>{point.label}</span>
                  ))}
                </div>
              </div>
            </div>

            {/* Recent Orders */}
            <div className="orders-card glow-purple">
              <div className="chart-header">
                <h3>Pedidos Recentes</h3>
                <Activity size={20} className="icon-purple" />
              </div>
              
              <div className="orders-list">
                {recentOrders.slice(0, 5).map((order) => (
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
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
