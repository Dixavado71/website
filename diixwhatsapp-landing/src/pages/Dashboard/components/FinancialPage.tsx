import { useState, useEffect } from 'react';
import { 
  DollarSign, 
  CreditCard, 
  TrendingUp, 
  Download,
  Calendar,
  Filter,
  Search,
  Plus,
  Eye,
  Edit,
  Trash2,
  ArrowUpRight,
  ArrowDownRight,
  PieChart as PieChartIcon,
  BarChart3,
  Wallet,
  Receipt,
  FileText,
  XCircle,
  CheckCircle2
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts';
import '../Dashboard.css';

interface Transaction {
  id: string;
  description: string;
  type: 'income' | 'expense';
  value: number;
  date: string;
  status: 'completed' | 'pending';
  category: string;
}

interface FinancialPageProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
}

const FinancialPage = ({ searchTerm, setSearchTerm }: FinancialPageProps) => {
  const [periodFilter, setPeriodFilter] = useState('month');
  const [typeFilter, setTypeFilter] = useState('all');
  const [loading, setLoading] = useState(true);

  const transactions: Transaction[] = [
    { id: '1', description: 'Venda - Kit Skincare Premium', type: 'income', value: 297.00, date: '2026-08-22', status: 'completed', category: 'Vendas' },
    { id: '2', description: 'Venda - Smartwatch Pro', type: 'income', value: 549.00, date: '2026-08-22', status: 'completed', category: 'Vendas' },
    { id: '3', description: 'Assinatura Plano Business', type: 'expense', value: 99.90, date: '2026-08-21', status: 'completed', category: 'Assinaturas' },
    { id: '4', description: 'Venda - Fone Bluetooth', type: 'income', value: 189.00, date: '2026-08-21', status: 'pending', category: 'Vendas' },
    { id: '5', description: 'Serviço de Marketing', type: 'expense', value: 450.00, date: '2026-08-20', status: 'completed', category: 'Marketing' },
    { id: '6', description: 'Venda - Teclado Mecânico', type: 'income', value: 429.00, date: '2026-08-20', status: 'completed', category: 'Vendas' },
    { id: '7', description: 'Hospedagem Cloud', type: 'expense', value: 127.50, date: '2026-08-19', status: 'completed', category: 'Infraestrutura' },
    { id: '8', description: 'Venda - Câmera DSLR Pro', type: 'income', value: 2990.00, date: '2026-08-19', status: 'completed', category: 'Vendas' },
  ];

  // Simular carregamento de dados
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const filteredTransactions = transactions.filter(t => {
    const matchesSearch = t.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = typeFilter === 'all' || t.type === typeFilter;
    return matchesSearch && matchesType;
  });

  const totalIncome = transactions.filter(t => t.type === 'income').reduce((acc, t) => acc + t.value, 0);
  const totalExpense = transactions.filter(t => t.type === 'expense').reduce((acc, t) => acc + t.value, 0);
  const balance = totalIncome - totalExpense;

  const paymentMethods = [
    { name: 'Cartão de Crédito', value: 3455.00, percentage: 78, icon: CreditCard, color: '#00ff88' },
    { name: 'Pix', value: 890.00, percentage: 20, icon: DollarSign, color: '#00e5ff' },
    { name: 'Boleto', value: 88.00, percentage: 2, icon: Receipt, color: '#b92ed1' },
  ];

  const chartData = [
    { name: 'Receitas', value: totalIncome, fill: '#00ff88' },
    { name: 'Despesas', value: totalExpense, fill: '#ff2ed1' },
    { name: 'Saldo', value: balance, fill: '#00e5ff' },
  ];

  const pieData = paymentMethods.map(method => ({
    name: method.name,
    value: method.value,
    color: method.color,
  }));

  const exportReport = (format: string) => {
    console.log(`Exporting financial report as ${format}...`);
  };

  if (loading) {
    return (
      <div className="dashboard-content">
        <div className="skeleton-container">
          <div className="skeleton-header"></div>
          <div className="skeleton-metrics-grid">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="skeleton-metric-card"></div>
            ))}
          </div>
          <div className="skeleton-charts-grid">
            <div className="skeleton-chart-card"></div>
            <div className="skeleton-chart-card"></div>
          </div>
          <div className="skeleton-table"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard-content">
      <div className="content-header">
        <div className="header-title-group">
          <div className="header-icon-wrapper icon-cyan-bg">
            <Wallet size={24} />
          </div>
          <div>
            <h2>Financeiro</h2>
            <p>Acompanhe receitas, despesas e saldo da sua empresa</p>
          </div>
        </div>
        <div className="header-actions-group">
          <button className="btn-outline" onClick={() => exportReport('pdf')}>
            <FileText size={18} />
            PDF
          </button>
          <button className="btn-outline" onClick={() => exportReport('excel')}>
            <Download size={18} />
            Excel
          </button>
        </div>
      </div>

      {/* Metrics */}
      <div className="metrics-grid">
        <div className="metric-card glow-green">
          <div className="metric-header">
            <span className="metric-label">Receita Total</span>
            <div className="metric-icon icon-green">
              <ArrowUpRight size={18} />
            </div>
          </div>
          <div className="metric-value">R$ {totalIncome.toFixed(2).replace('.', ',')}</div>
          <div className="metric-change positive">+15.3% vs mês anterior</div>
        </div>

        <div className="metric-card glow-magenta">
          <div className="metric-header">
            <span className="metric-label">Despesas Totais</span>
            <div className="metric-icon icon-magenta">
              <ArrowDownRight size={18} />
            </div>
          </div>
          <div className="metric-value">R$ {totalExpense.toFixed(2).replace('.', ',')}</div>
          <div className="metric-change negative">+8.2% vs mês anterior</div>
        </div>

        <div className="metric-card glow-cyan">
          <div className="metric-header">
            <span className="metric-label">Saldo Atual</span>
            <div className="metric-icon icon-cyan">
              <DollarSign size={18} />
            </div>
          </div>
          <div className="metric-value">R$ {balance.toFixed(2).replace('.', ',')}</div>
          <div className="metric-change positive">+12.5% vs mês anterior</div>
        </div>

        <div className="metric-card glow-purple">
          <div className="metric-header">
            <span className="metric-label">Ticket Médio</span>
            <div className="metric-icon icon-purple">
              <TrendingUp size={18} />
            </div>
          </div>
          <div className="metric-value">R$ 489,00</div>
          <div className="metric-change positive">+7.8% vs mês anterior</div>
        </div>
      </div>

      {/* Charts Section with Recharts */}
      <div className="charts-section">
        <div className="chart-card glow-green">
          <div className="chart-header">
            <h3>
              <BarChart3 size={20} className="icon-green" />
              Receitas vs Despesas vs Saldo
            </h3>
          </div>
          <div className="chart-placeholder" style={{ height: '300px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#2d3748" />
                <XAxis dataKey="name" stroke="#a0aec0" />
                <YAxis stroke="#a0aec0" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#1a202c', 
                    border: '1px solid #2d3748',
                    borderRadius: '8px',
                    color: '#fff'
                  }}
                  formatter={(value: any) => `R$ ${Number(value).toFixed(2).replace('.', ',')}`}
                />
                <Bar dataKey="value" radius={[8, 8, 0, 0]}>
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="chart-card glow-purple">
          <div className="chart-header">
            <h3>
              <PieChartIcon size={20} className="icon-purple" />
              Métodos de Pagamento
            </h3>
          </div>
          <div className="chart-placeholder" style={{ height: '300px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }: { name: string; percent: number }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#1a202c', 
                    border: '1px solid #2d3748',
                    borderRadius: '8px',
                    color: '#fff'
                  }}
                  formatter={(value: any) => `R$ ${Number(value).toFixed(2).replace('.', ',')}`}
                />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Filters and Actions */}
      <div className="table-actions">
        <div className="search-box">
          <Search size={18} />
          <input 
            type="text" 
            placeholder="Buscar transações..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="filters-group">
          <button className="filter-btn">
            <Calendar size={18} />
            <select 
              value={periodFilter}
              onChange={(e) => setPeriodFilter(e.target.value)}
            >
              <option value="week">Última Semana</option>
              <option value="month">Este Mês</option>
              <option value="quarter">Este Trimestre</option>
              <option value="year">Este Ano</option>
            </select>
          </button>

          <button className="filter-btn">
            <Filter size={18} />
            <select 
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
            >
              <option value="all">Todos Tipos</option>
              <option value="income">Receitas</option>
              <option value="expense">Despesas</option>
            </select>
          </button>

          <button className="btn-primary">
            <Plus size={18} />
            Nova Transação
          </button>
        </div>
      </div>

      {/* Transactions Table */}
      <div className="transactions-card glow-cyan">
        <div className="chart-header">
          <h3>
            <Receipt size={20} className="icon-cyan" />
            Transações Recentes
          </h3>
          <div className="header-actions">
            <button className="btn-outline" onClick={() => exportReport('csv')}>
              <Download size={16} />
              Exportar
            </button>
          </div>
        </div>

        <div className="transactions-table">
          <div className="transactions-header">
            <span>Descrição</span>
            <span>Categoria</span>
            <span>Data</span>
            <span>Status</span>
            <span>Valor</span>
            <span>Ações</span>
          </div>
          {filteredTransactions.map((transaction) => (
            <div key={transaction.id} className="transaction-row">
              <div className="transaction-description">
                <div className={`transaction-icon ${transaction.type === 'income' ? 'icon-green' : 'icon-magenta'}`}>
                  {transaction.type === 'income' ? <ArrowUpRight size={16} /> : <ArrowDownRight size={16} />}
                </div>
                <span>{transaction.description}</span>
              </div>
              <span className="transaction-category">{transaction.category}</span>
              <span className="transaction-date">
                {new Date(transaction.date).toLocaleDateString('pt-BR')}
              </span>
              <span className={`transaction-status status-${transaction.status}`}>
                {transaction.status === 'completed' ? (
                  <>
                    <CheckCircle2 size={12} />
                    Concluído
                  </>
                ) : (
                  <>
                    <XCircle size={12} />
                    Pendente
                  </>
                )}
              </span>
              <span className={`transaction-value ${transaction.type === 'income' ? 'value-income' : 'value-expense'}`}>
                {transaction.type === 'income' ? '+' : '-'} R$ {transaction.value.toFixed(2).replace('.', ',')}
              </span>
              <div className="transaction-actions">
                <button className="action-btn-small" title="Visualizar">
                  <Eye size={14} />
                </button>
                <button className="action-btn-small" title="Editar">
                  <Edit size={14} />
                </button>
                <button className="action-btn-small" title="Excluir">
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Payment Methods */}
      <div className="payment-methods-grid">
        {paymentMethods.map((method, index) => (
          <div key={index} className="payment-card">
            <div className="payment-icon">
              <method.icon size={24} />
            </div>
            <div className="payment-info">
              <h4>{method.name}</h4>
              <span>R$ {method.value.toFixed(2).replace('.', ',')}</span>
              <span className="payment-percentage">{method.percentage}% do total</span>
            </div>
            <div className="payment-progress">
              <div 
                className={`payment-progress-bar payment-${method.name.toLowerCase().split(' ')[0]}`}
                style={{ width: `${method.percentage}%` }}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FinancialPage;
