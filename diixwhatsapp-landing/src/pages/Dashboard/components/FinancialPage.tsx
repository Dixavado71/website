import { useState } from 'react';
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
  ArrowDownRight
} from 'lucide-react';
import '../../../styles/index.css';

interface FinancialPageProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
}

const FinancialPage = ({ searchTerm, setSearchTerm }: FinancialPageProps) => {
  const [periodFilter, setPeriodFilter] = useState('month');
  const [typeFilter, setTypeFilter] = useState('all');

  const transactions = [
    { id: '1', description: 'Venda - Kit Skincare Premium', type: 'income', value: 297.00, date: '2026-08-22', status: 'completed', category: 'Vendas' },
    { id: '2', description: 'Venda - Smartwatch Pro', type: 'income', value: 549.00, date: '2026-08-22', status: 'completed', category: 'Vendas' },
    { id: '3', description: 'Assinatura Plano Business', type: 'expense', value: 99.90, date: '2026-08-21', status: 'completed', category: 'Assinaturas' },
    { id: '4', description: 'Venda - Fone Bluetooth', type: 'income', value: 189.00, date: '2026-08-21', status: 'pending', category: 'Vendas' },
    { id: '5', description: 'Serviço de Marketing', type: 'expense', value: 450.00, date: '2026-08-20', status: 'completed', category: 'Marketing' },
    { id: '6', description: 'Venda - Teclado Mecânico', type: 'income', value: 429.00, date: '2026-08-20', status: 'completed', category: 'Vendas' },
    { id: '7', description: 'Hospedagem Cloud', type: 'expense', value: 127.50, date: '2026-08-19', status: 'completed', category: 'Infraestrutura' },
    { id: '8', description: 'Venda - Câmera DSLR Pro', type: 'income', value: 2990.00, date: '2026-08-19', status: 'completed', category: 'Vendas' },
  ];

  const filteredTransactions = transactions.filter(t => {
    const matchesSearch = t.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = typeFilter === 'all' || t.type === typeFilter;
    return matchesSearch && matchesType;
  });

  const totalIncome = transactions.filter(t => t.type === 'income').reduce((acc, t) => acc + t.value, 0);
  const totalExpense = transactions.filter(t => t.type === 'expense').reduce((acc, t) => acc + t.value, 0);
  const balance = totalIncome - totalExpense;

  return (
    <div className="dashboard-content">
      <div className="content-header">
        <h2>Financeiro</h2>
        <p>Acompanhe receitas, despesas e saldo da sua empresa</p>
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
          <h3>Transações Recentes</h3>
          <div className="header-actions">
            <button className="btn-outline">
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
                {transaction.status === 'completed' ? 'Concluído' : 'Pendente'}
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
        <div className="payment-card">
          <div className="payment-icon">
            <CreditCard size={24} />
          </div>
          <div className="payment-info">
            <h4>Cartão de Crédito</h4>
            <span>R$ 3.455,00</span>
            <span className="payment-percentage">78% do total</span>
          </div>
        </div>

        <div className="payment-card">
          <div className="payment-icon">
            <DollarSign size={24} />
          </div>
          <div className="payment-info">
            <h4>Pix</h4>
            <span>R$ 890,00</span>
            <span className="payment-percentage">20% do total</span>
          </div>
        </div>

        <div className="payment-card">
          <div className="payment-icon">
            <CreditCard size={24} />
          </div>
          <div className="payment-info">
            <h4>Boleto</h4>
            <span>R$ 88,00</span>
            <span className="payment-percentage">2% do total</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FinancialPage;
