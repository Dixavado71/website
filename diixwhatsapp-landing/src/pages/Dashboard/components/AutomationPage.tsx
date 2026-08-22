import { useState } from 'react';
import { 
  Plus, 
  Search, 
  Filter, 
  Edit, 
  Trash2, 
  Play,
  Pause,
  Eye,
  Zap,
  MessageSquare,
  TrendingUp,
  Users,
  Clock,
  DollarSign
} from 'lucide-react';
import { automationFlows } from '../../../data/dashboard';
import '../Dashboard.css';

interface AutomationPageProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
}

interface Flow {
  id: string;
  name: string;
  messages: number;
  conversions: number;
  growth?: number;
  active: boolean;
  type?: string;
  icon?: string;
}

const AutomationPage = ({ searchTerm, setSearchTerm }: AutomationPageProps) => {
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterType, setFilterType] = useState('all');

  const allFlows: Flow[] = [
    ...automationFlows.map(f => ({ ...f, type: 'vendas' as string, icon: '🤖', growth: 15.5 })),
    { id: '4', name: 'Recuperação de Carrinho', messages: 892, conversions: 156, growth: 22.3, active: true, type: 'vendas', icon: '🛒' },
    { id: '5', name: 'Pós-Venda', messages: 654, conversions: 89, growth: 15.7, active: true, type: 'suporte', icon: '💬' },
    { id: '6', name: 'Reativação de Clientes', messages: 423, conversions: 67, growth: -5.2, active: false, type: 'marketing', icon: '🎯' },
  ];

  const filteredFlows = allFlows.filter(flow => {
    const matchesSearch = flow.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === 'all' || flow.type === filterType;
    const matchesStatus = filterStatus === 'all' || 
                         (filterStatus === 'active' && flow.active) ||
                         (filterStatus === 'inactive' && !flow.active);
    return matchesSearch && matchesType && matchesStatus;
  });

  const toggleFlowStatus = (flowId: string) => {
    console.log('Toggle flow:', flowId);
  };

  return (
    <div className="dashboard-content">
      <div className="content-header">
        <h2>Automação</h2>
        <p>Crie e gerencie fluxos automatizados de atendimento</p>
      </div>

      {/* Metrics */}
      <div className="metrics-grid">
        <div className="metric-card glow-magenta">
          <div className="metric-header">
            <span className="metric-label">Total de Fluxos</span>
            <div className="metric-icon icon-magenta">
              <Zap size={18} />
            </div>
          </div>
          <div className="metric-value">{allFlows.length}</div>
          <div className="metric-change positive">+2 vs mês anterior</div>
        </div>

        <div className="metric-card glow-green">
          <div className="metric-header">
            <span className="metric-label">Fluxos Ativos</span>
            <div className="metric-icon icon-green">
              <Play size={18} />
            </div>
          </div>
          <div className="metric-value">{allFlows.filter(f => f.active).length}</div>
          <div className="metric-change positive">+1 vs mês anterior</div>
        </div>

        <div className="metric-card glow-cyan">
          <div className="metric-header">
            <span className="metric-label">Mensagens Enviadas</span>
            <div className="metric-icon icon-cyan">
              <MessageSquare size={18} />
            </div>
          </div>
          <div className="metric-value">
            {allFlows.reduce((acc, flow) => acc + flow.messages, 0).toLocaleString()}
          </div>
          <div className="metric-change positive">+28.4% vs mês anterior</div>
        </div>

        <div className="metric-card glow-purple">
          <div className="metric-header">
            <span className="metric-label">Total de Conversões</span>
            <div className="metric-icon icon-purple">
              <TrendingUp size={18} />
            </div>
          </div>
          <div className="metric-value">
            {allFlows.reduce((acc, flow) => acc + flow.conversions, 0).toLocaleString()}
          </div>
          <div className="metric-change positive">+35.2% vs mês anterior</div>
        </div>
      </div>

      {/* Filters and Actions */}
      <div className="table-actions">
        <div className="search-box">
          <Search size={18} />
          <input 
            type="text" 
            placeholder="Buscar fluxos..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="filters-group">
          <button className="filter-btn">
            <Filter size={18} />
            <select 
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
            >
              <option value="all">Todos Tipos</option>
              <option value="vendas">Vendas</option>
              <option value="suporte">Suporte</option>
              <option value="marketing">Marketing</option>
            </select>
          </button>

          <button className="filter-btn">
            <Filter size={18} />
            <select 
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
            >
              <option value="all">Todos Status</option>
              <option value="active">Ativos</option>
              <option value="inactive">Inativos</option>
            </select>
          </button>

          <button className="btn-primary">
            <Plus size={18} />
            Novo Fluxo
          </button>
        </div>
      </div>

      {/* Automation Flows Table */}
      <div className="automation-card-full glow-magenta">
        <div className="flows-table-full">
          <div className="flows-header">
            <span>Nome do Fluxo</span>
            <span>Tipo</span>
            <span>Mensagens</span>
            <span>Conversões</span>
            <span>Taxa</span>
            <span>Status</span>
            <span>Ações</span>
          </div>
          {filteredFlows.map((flow) => (
            <div key={flow.id} className="flows-row">
              <div className="flow-name">
                <span className="flow-emoji">{flow.icon}</span>
                <Zap size={16} className={flow.active ? 'icon-green' : 'icon-gray'} />
                <span>{flow.name}</span>
              </div>
              <span className="flow-type">
                <span className={`type-badge type-${flow.type}`}>
                  {flow.type === 'vendas' ? 'Vendas' : 
                   flow.type === 'suporte' ? 'Suporte' : 'Marketing'}
                </span>
              </span>
              <span className="flow-messages">{flow.messages.toLocaleString()}</span>
              <span className="flow-conversions">
                {flow.conversions.toLocaleString()}
                {flow.growth !== undefined && flow.growth > 0 ? (
                  <TrendingUp size={14} className="icon-green" />
                ) : flow.growth !== undefined ? (
                  <TrendingUp size={14} className="icon-magenta" style={{ transform: 'rotate(180deg)' }} />
                ) : null}
              </span>
              <span className="flow-rate">
                {((flow.conversions / flow.messages) * 100).toFixed(1)}%
              </span>
              <span className={`flow-status ${flow.active ? 'status-active' : 'status-inactive'}`}>
                {flow.active ? 'Ativo' : 'Inativo'}
              </span>
              <div className="flow-actions">
                <button className="action-btn" title="Visualizar">
                  <Eye size={16} />
                </button>
                <button className="action-btn" title="Editar">
                  <Edit size={16} />
                </button>
                <button className="action-btn" title={flow.active ? 'Pausar' : 'Ativar'} onClick={() => toggleFlowStatus(flow.id)}>
                  {flow.active ? <Pause size={16} /> : <Play size={16} />}
                </button>
                <button className="action-btn" title="Excluir">
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Stats */}
      <div className="automation-stats-grid">
        <div className="stat-card">
          <div className="stat-icon icon-green">
            <Clock size={24} />
          </div>
          <div className="stat-info">
            <span className="stat-label">Tempo Médio de Resposta</span>
            <span className="stat-value">&lt; 1 segundo</span>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon icon-cyan">
            <Users size={24} />
          </div>
          <div className="stat-info">
            <span className="stat-label">Clientes Atendidos</span>
            <span className="stat-value">3.456</span>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon icon-purple">
            <TrendingUp size={24} />
          </div>
          <div className="stat-info">
            <span className="stat-label">Aumento em Vendas</span>
            <span className="stat-value">+40%</span>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon icon-magenta">
            <DollarSign size={24} />
          </div>
          <div className="stat-info">
            <span className="stat-label">Redução de Custos</span>
            <span className="stat-value">-70%</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AutomationPage;
