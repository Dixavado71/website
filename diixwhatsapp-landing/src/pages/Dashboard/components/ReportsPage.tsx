import { useState } from 'react';
import { 
  FileText, 
  Download, 
  Calendar, 
  TrendingUp, 
  ShoppingCart, 
  Users, 
  MessageSquare,
  DollarSign,
  Package,
  BarChart3,
  PieChart as PieChartIcon,
  Activity,
  Filter,
  ChevronDown,
  ArrowUpRight,
  ArrowDownRight,
  Printer,
  Share2
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
  Legend,
  BarChart,
  Bar,
  LineChart,
  Line
} from 'recharts';
import '../../../styles/index.css';

interface ReportsPageProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
}

const revenueData = [
  { month: 'Jan', revenue: 12500, orders: 145, customers: 89 },
  { month: 'Fev', revenue: 15800, orders: 178, customers: 102 },
  { month: 'Mar', revenue: 18200, orders: 201, customers: 125 },
  { month: 'Abr', revenue: 21500, orders: 234, customers: 145 },
  { month: 'Mai', revenue: 24800, orders: 267, customers: 168 },
  { month: 'Jun', revenue: 28100, orders: 298, customers: 189 },
  { month: 'Jul', revenue: 31400, orders: 325, customers: 210 },
];

const salesByCategory = [
  { name: 'Eletrônicos', value: 35, color: '#00FF88' },
  { name: 'Beleza', value: 25, color: '#00D4FF' },
  { name: 'Periféricos', value: 20, color: '#B95EFF' },
  { name: 'Acessórios', value: 15, color: '#FF5ED6' },
  { name: 'Outros', value: 5, color: '#FFAA5E' },
];

const dailyPerformance = [
  { day: 'Seg', conversations: 145, conversions: 32, revenue: 4200 },
  { day: 'Ter', conversations: 168, conversions: 38, revenue: 4850 },
  { day: 'Qua', conversations: 192, conversions: 45, revenue: 5600 },
  { day: 'Qui', conversations: 178, conversions: 41, revenue: 5200 },
  { day: 'Sex', conversations: 215, conversions: 52, revenue: 6800 },
  { day: 'Sáb', conversations: 156, conversions: 35, revenue: 4500 },
  { day: 'Dom', conversations: 98, conversions: 22, revenue: 2900 },
];

const customerBehavior = [
  { segment: 'Novos', percentage: 35, count: 245, trend: 'up' },
  { segment: 'Recorrentes', percentage: 45, count: 315, trend: 'up' },
  { segment: 'Inativos', percentage: 12, count: 84, trend: 'down' },
  { segment: 'VIP', percentage: 8, count: 56, trend: 'stable' },
];

const topProducts = [
  { id: 1, name: 'iPhone 15 Pro', sales: 145, revenue: 724500, growth: 12.5 },
  { id: 2, name: 'MacBook Air M3', sales: 98, revenue: 686000, growth: 8.3 },
  { id: 3, name: 'AirPods Pro 2', sales: 234, revenue: 116766, growth: 15.7 },
  { id: 4, name: 'Samsung S24 Ultra', sales: 112, revenue: 671888, growth: -3.2 },
  { id: 5, name: 'iPad Air 5', sales: 87, revenue: 304413, growth: 5.9 },
];

const conversionFunnel = [
  { stage: 'Visitantes', value: 5000, color: '#00FF88' },
  { stage: 'Iniciaram Conversa', value: 3200, color: '#00D4FF' },
  { stage: 'Visualizaram Produtos', value: 2100, color: '#B95EFF' },
  { stage: 'Adicionaram ao Carrinho', value: 890, color: '#FF5ED6' },
  { stage: 'Finalizaram Compra', value: 425, color: '#FFAA5E' },
];

const ReportsPage = ({ searchTerm, setSearchTerm }: ReportsPageProps) => {
  const [selectedPeriod, setSelectedPeriod] = useState('30d');
  const [selectedReport, setSelectedReport] = useState('overview');
  const [showFilters, setShowFilters] = useState(false);
  const [exportFormat, setExportFormat] = useState('pdf');

  const reportTypes = [
    { id: 'overview', label: 'Visão Geral', icon: BarChart3 },
    { id: 'sales', label: 'Vendas', icon: ShoppingCart },
    { id: 'customers', label: 'Clientes', icon: Users },
    { id: 'conversations', label: 'Conversas', icon: MessageSquare },
    { id: 'financial', label: 'Financeiro', icon: DollarSign },
    { id: 'products', label: 'Produtos', icon: Package },
  ];

  const handleExport = () => {
    console.log(`Exportando relatório em ${exportFormat}...`);
  };

  return (
    <div className="dashboard-content">
      <div className="content-header">
        <div className="header-left">
          <h2>📊 Relatórios</h2>
          <p>Analise o desempenho do seu negócio com dados detalhados</p>
        </div>
        
        <div className="header-actions">
          <div className="period-selector-large">
            <button 
              className={selectedPeriod === '7d' ? 'active' : ''}
              onClick={() => setSelectedPeriod('7d')}
            >
              7 Dias
            </button>
            <button 
              className={selectedPeriod === '30d' ? 'active' : ''}
              onClick={() => setSelectedPeriod('30d')}
            >
              30 Dias
            </button>
            <button 
              className={selectedPeriod === '90d' ? 'active' : ''}
              onClick={() => setSelectedPeriod('90d')}
            >
              90 Dias
            </button>
            <button 
              className={selectedPeriod === 'custom' ? 'active' : ''}
              onClick={() => setSelectedPeriod('custom')}
            >
              <Calendar size={16} />
              Personalizado
            </button>
          </div>
          
          <button 
            className="btn-export"
            onClick={() => setShowFilters(!showFilters)}
          >
            <Filter size={18} />
            Filtros
          </button>
          
          <div className="dropdown-container">
            <button 
              className="btn-export primary"
              onClick={handleExport}
            >
              <Download size={18} />
              Exportar
              <ChevronDown size={16} />
            </button>
            <div className="dropdown-menu">
              <button onClick={() => setExportFormat('pdf')}>📄 PDF</button>
              <button onClick={() => setExportFormat('excel')}>📊 Excel</button>
              <button onClick={() => setExportFormat('csv')}>📝 CSV</button>
            </div>
          </div>
        </div>
      </div>

      {/* Filters Panel */}
      {showFilters && (
        <div className="filters-panel">
          <div className="filter-group">
            <label>Canal</label>
            <select>
              <option>Todos os canais</option>
              <option>WhatsApp</option>
              <option>Instagram</option>
              <option>Facebook</option>
              <option>Site</option>
            </select>
          </div>
          <div className="filter-group">
            <label>Categoria</label>
            <select>
              <option>Todas categorias</option>
              <option>Eletrônicos</option>
              <option>Beleza</option>
              <option>Periféricos</option>
            </select>
          </div>
          <div className="filter-group">
            <label>Status</label>
            <select>
              <option>Todos status</option>
              <option>Pago</option>
              <option>Pendente</option>
              <option>Cancelado</option>
            </select>
          </div>
          <button className="btn-apply-filters">Aplicar Filtros</button>
        </div>
      )}

      {/* Report Type Tabs */}
      <div className="report-tabs">
        {reportTypes.map((type) => (
          <button
            key={type.id}
            className={`report-tab ${selectedReport === type.id ? 'active' : ''}`}
            onClick={() => setSelectedReport(type.id)}
          >
            <type.icon size={18} />
            {type.label}
          </button>
        ))}
      </div>

      {/* Key Metrics Cards */}
      <div className="reports-metrics-grid">
        <div className="report-metric-card glow-green">
          <div className="metric-icon-wrapper icon-green">
            <TrendingUp size={24} />
          </div>
          <div className="metric-info">
            <span className="metric-label">Receita Total</span>
            <span className="metric-value">R$ 152.300</span>
            <span className="metric-change positive">
              <ArrowUpRight size={14} /> +18.5% vs período anterior
            </span>
          </div>
        </div>

        <div className="report-metric-card glow-cyan">
          <div className="metric-icon-wrapper icon-cyan">
            <ShoppingCart size={24} />
          </div>
          <div className="metric-info">
            <span className="metric-label">Total de Pedidos</span>
            <span className="metric-value">1.648</span>
            <span className="metric-change positive">
              <ArrowUpRight size={14} /> +12.3% vs período anterior
            </span>
          </div>
        </div>

        <div className="report-metric-card glow-purple">
          <div className="metric-icon-wrapper icon-purple">
            <Users size={24} />
          </div>
          <div className="metric-info">
            <span className="metric-label">Clientes Ativos</span>
            <span className="metric-value">700</span>
            <span className="metric-change positive">
              <ArrowUpRight size={14} /> +8.7% vs período anterior
            </span>
          </div>
        </div>

        <div className="report-metric-card glow-magenta">
          <div className="metric-icon-wrapper icon-magenta">
            <MessageSquare size={24} />
          </div>
          <div className="metric-info">
            <span className="metric-label">Taxa de Conversão</span>
            <span className="metric-value">25.8%</span>
            <span className="metric-change negative">
              <ArrowDownRight size={14} /> -2.1% vs período anterior
            </span>
          </div>
        </div>
      </div>

      {/* Main Charts Section */}
      <div className="reports-charts-section">
        {/* Revenue Evolution Chart */}
        <div className="report-chart-card full-width glow-green">
          <div className="chart-header">
            <div className="chart-title">
              <Activity size={20} className="icon-green" />
              <h3>Evolução da Receita</h3>
            </div>
            <button className="chart-action-btn">
              <Share2 size={18} />
            </button>
          </div>
          
          <div className="chart-container-large">
            <ResponsiveContainer width="100%" height={320}>
              <AreaChart data={revenueData}>
                <defs>
                  <linearGradient id="colorRevenueReport" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#00FF88" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="#00FF88" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.08)" />
                <XAxis dataKey="month" stroke="#6b7280" fontSize={12} />
                <YAxis stroke="#6b7280" fontSize={12} tickFormatter={(value) => `R$${value/1000}k`} />
                <Tooltip 
                  contentStyle={{ 
                    background: 'rgba(15, 15, 23, 0.98)', 
                    border: '1px solid rgba(0,255,136,0.2)',
                    borderRadius: '12px',
                    color: '#fff',
                    boxShadow: '0 8px 32px rgba(0,255,136,0.1)'
                  }} 
                />
                <Legend />
                <Area 
                  type="monotone" 
                  dataKey="revenue" 
                  stroke="#00FF88" 
                  strokeWidth={3}
                  fillOpacity={1} 
                  fill="url(#colorRevenueReport)" 
                  name="Receita (R$)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Secondary Charts Row */}
        <div className="reports-secondary-grid">
          {/* Sales by Category */}
          <div className="report-chart-card glow-cyan">
            <div className="chart-header">
              <div className="chart-title">
                <PieChartIcon size={20} className="icon-cyan" />
                <h3>Vendas por Categoria</h3>
              </div>
            </div>
            
            <div className="chart-container">
              <ResponsiveContainer width="100%" height={220}>
                <PieChart>
                  <Pie
                    data={salesByCategory}
                    cx="50%"
                    cy="50%"
                    innerRadius={55}
                    outerRadius={90}
                    paddingAngle={3}
                    dataKey="value"
                  >
                    {salesByCategory.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ 
                      background: 'rgba(15, 15, 23, 0.98)', 
                      border: '1px solid rgba(0,212,255,0.2)',
                      borderRadius: '12px',
                      color: '#fff'
                    }} 
                  />
                </PieChart>
              </ResponsiveContainer>
              
              <div className="category-legend">
                {salesByCategory.map((category, idx) => (
                  <div key={idx} className="legend-item-modern">
                    <span className="legend-dot-modern" style={{ background: category.color }}></span>
                    <span className="legend-label">{category.name}</span>
                    <span className="legend-value">{category.value}%</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Daily Performance */}
          <div className="report-chart-card glow-purple">
            <div className="chart-header">
              <div className="chart-title">
                <BarChart3 size={20} className="icon-purple" />
                <h3>Performance Diária</h3>
              </div>
            </div>
            
            <div className="chart-container">
              <ResponsiveContainer width="100%" height={220}>
                <BarChart data={dailyPerformance}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.08)" />
                  <XAxis dataKey="day" stroke="#6b7280" fontSize={12} />
                  <YAxis stroke="#6b7280" fontSize={12} />
                  <Tooltip 
                    contentStyle={{ 
                      background: 'rgba(15, 15, 23, 0.98)', 
                      border: '1px solid rgba(185,94,255,0.2)',
                      borderRadius: '12px',
                      color: '#fff'
                    }} 
                  />
                  <Legend />
                  <Bar dataKey="conversations" fill="#00D4FF" name="Conversas" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="conversions" fill="#B95EFF" name="Conversões" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Conversion Funnel */}
        <div className="report-chart-card full-width glow-magenta">
          <div className="chart-header">
            <div className="chart-title">
              <Activity size={20} className="icon-magenta" />
              <h3>Funil de Conversão</h3>
            </div>
          </div>
          
          <div className="funnel-container">
            {conversionFunnel.map((stage, idx) => (
              <div key={idx} className="funnel-stage">
                <div className="funnel-bar-wrapper">
                  <div 
                    className="funnel-bar"
                    style={{ 
                      width: `${(stage.value / 5000) * 100}%`,
                      background: stage.color
                    }}
                  >
                    <span className="funnel-label">{stage.stage}</span>
                  </div>
                </div>
                <span className="funnel-value">{stage.value.toLocaleString()}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Top Products Table */}
        <div className="report-chart-card full-width glow-green">
          <div className="chart-header">
            <div className="chart-title">
              <Package size={20} className="icon-green" />
              <h3>Top 5 Produtos Mais Vendidos</h3>
            </div>
            <button className="btn-see-all">Ver todos</button>
          </div>
          
          <div className="products-table-modern">
            <div className="table-header">
              <span>Produto</span>
              <span>Vendas</span>
              <span>Receita</span>
              <span>Crescimento</span>
            </div>
            {topProducts.map((product) => (
              <div key={product.id} className="table-row-modern">
                <div className="product-info">
                  <div className="product-icon">📦</div>
                  <span className="product-name">{product.name}</span>
                </div>
                <span className="table-data">{product.sales}</span>
                <span className="table-data revenue">R$ {product.revenue.toLocaleString()}</span>
                <span className={`table-data growth ${product.growth >= 0 ? 'positive' : 'negative'}`}>
                  {product.growth >= 0 ? '+' : ''}{product.growth}%
                  {product.growth >= 0 ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Customer Behavior */}
        <div className="report-chart-card full-width glow-cyan">
          <div className="chart-header">
            <div className="chart-title">
              <Users size={20} className="icon-cyan" />
              <h3>Comportamento do Cliente</h3>
            </div>
          </div>
          
          <div className="behavior-grid">
            {customerBehavior.map((segment, idx) => (
              <div key={idx} className="behavior-card">
                <div className="behavior-header">
                  <span className="behavior-segment">{segment.segment}</span>
                  {segment.trend === 'up' && <ArrowUpRight size={16} className="text-green" />}
                  {segment.trend === 'down' && <ArrowDownRight size={16} className="text-red" />}
                  {segment.trend === 'stable' && <Activity size={16} className="text-gray" />}
                </div>
                <div className="behavior-percentage">{segment.percentage}%</div>
                <div className="behavior-count">{segment.count} clientes</div>
                <div className="behavior-bar-bg">
                  <div 
                    className="behavior-bar-fill"
                    style={{ 
                      width: `${segment.percentage}%`,
                      background: idx === 0 ? '#00FF88' : idx === 1 ? '#00D4FF' : idx === 2 ? '#FF5ED6' : '#B95EFF'
                    }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportsPage;
