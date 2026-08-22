import { ShoppingCart, Filter, Download, Plus, Search, Eye, Edit, Trash2, CheckCircle, Clock, AlertCircle, XCircle } from 'lucide-react';
import { allOrders } from '../../../data/dashboard';

interface OrdersPageProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  orderStatusFilter: string;
  setOrderStatusFilter: (status: string) => void;
}

const OrdersPage = ({ searchTerm, setSearchTerm, orderStatusFilter, setOrderStatusFilter }: OrdersPageProps) => {
  const filteredOrders = allOrders.filter(order => {
    const matchesSearch = order.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.product.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = orderStatusFilter === 'all' || order.status === orderStatusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return <span className="status-badge status-completed"><CheckCircle size={14} /> Concluído</span>;
      case 'processing':
        return <span className="status-badge status-processing"><Clock size={14} /> Processando</span>;
      case 'pending':
        return <span className="status-badge status-pending"><AlertCircle size={14} /> Pendente</span>;
      case 'cancelled':
        return <span className="status-badge status-cancelled"><XCircle size={14} /> Cancelado</span>;
      default:
        return <span className="status-badge">{status}</span>;
    }
  };

  const getPaymentMethodLabel = (method: string) => {
    switch (method) {
      case 'credit_card': return 'Cartão de Crédito';
      case 'debit_card': return 'Cartão de Débito';
      case 'pix': return 'PIX';
      case 'boleto': return 'Boleto';
      case 'whatsapp_pay': return 'WhatsApp Pay';
      default: return method;
    }
  };

  const totalOrders = filteredOrders.length;
  const totalRevenue = filteredOrders.reduce((acc, order) => {
    const value = parseFloat(order.value.replace('R$', '').replace('.', '').replace(',', '.'));
    return acc + (isNaN(value) ? 0 : value);
  }, 0);

  return (
    <div className="dashboard-content">
      <div className="content-header">
        <div>
          <h2>Pedidos</h2>
          <p>Gerencie todos os pedidos da sua loja</p>
        </div>
        <button className="btn-primary">
          <Plus size={20} />
          Novo Pedido
        </button>
      </div>

      {/* Stats Cards */}
      <div className="metrics-grid">
        <div className="metric-card glow-green">
          <div className="metric-header">
            <span className="metric-label">Total de Pedidos</span>
            <ShoppingCart size={18} className="icon-green" />
          </div>
          <div className="metric-value">{totalOrders}</div>
        </div>
        <div className="metric-card glow-cyan">
          <div className="metric-header">
            <span className="metric-label">Receita Total</span>
            <CheckCircle size={18} className="icon-cyan" />
          </div>
          <div className="metric-value">R$ {totalRevenue.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</div>
        </div>
        <div className="metric-card glow-purple">
          <div className="metric-header">
            <span className="metric-label">Pedidos Pendentes</span>
            <Clock size={18} className="icon-purple" />
          </div>
          <div className="metric-value">{filteredOrders.filter(o => o.status === 'pending').length}</div>
        </div>
        <div className="metric-card glow-magenta">
          <div className="metric-header">
            <span className="metric-label">Em Processamento</span>
            <AlertCircle size={18} className="icon-magenta" />
          </div>
          <div className="metric-value">{filteredOrders.filter(o => o.status === 'processing').length}</div>
        </div>
      </div>

      {/* Filters */}
      <div className="table-filters">
        <div className="search-box">
          <Search size={18} />
          <input 
            type="text" 
            placeholder="Buscar por cliente, produto ou ID..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="filters-group">
          <div className="filter-select">
            <Filter size={16} />
            <select 
              value={orderStatusFilter}
              onChange={(e) => setOrderStatusFilter(e.target.value)}
            >
              <option value="all">Todos Status</option>
              <option value="pending">Pendentes</option>
              <option value="processing">Processando</option>
              <option value="completed">Concluídos</option>
              <option value="cancelled">Cancelados</option>
            </select>
          </div>
          
          <button className="btn-secondary">
            <Download size={16} />
            Exportar
          </button>
        </div>
      </div>

      {/* Orders Table */}
      <div className="table-container glow-green">
        <table className="data-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Cliente</th>
              <th>Produto</th>
              <th>Valor</th>
              <th>Status</th>
              <th>Pagamento</th>
              <th>Data</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {filteredOrders.map((order) => (
              <tr key={order.id}>
                <td className="font-semibold">{order.id}</td>
                <td>
                  <div>
                    <div className="font-medium">{order.customer}</div>
                    <div className="text-small text-gray">{order.customerEmail}</div>
                  </div>
                </td>
                <td>{order.product}</td>
                <td className="font-semibold">{order.value}</td>
                <td>{getStatusBadge(order.status)}</td>
                <td>{getPaymentMethodLabel(order.paymentMethod)}</td>
                <td>{new Date(order.date).toLocaleDateString('pt-BR')}</td>
                <td>
                  <div className="actions-cell">
                    <button className="action-btn" title="Visualizar">
                      <Eye size={16} />
                    </button>
                    <button className="action-btn" title="Editar">
                      <Edit size={16} />
                    </button>
                    <button className="action-btn" title="Excluir">
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        
        {filteredOrders.length === 0 && (
          <div className="empty-state">
            <ShoppingCart size={48} className="icon-gray" />
            <h3>Nenhum pedido encontrado</h3>
            <p>Tente ajustar os filtros ou busque por outro termo</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrdersPage;
