import { Users, Filter, Download, Plus, Search, Mail, Phone, Calendar, TrendingUp, Tag, ShoppingCart, CheckCircle, Eye, Edit, Trash2 } from 'lucide-react';
import { customers } from '../../../data/dashboard';

interface CustomersPageProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  customerSegmentFilter: string;
  setCustomerSegmentFilter: (segment: string) => void;
}

const CustomersPage = ({ searchTerm, setSearchTerm, customerSegmentFilter, setCustomerSegmentFilter }: CustomersPageProps) => {
  const filteredCustomers = customers.filter(customer => {
    const matchesSearch = customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         customer.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSegment = customerSegmentFilter === 'all' || customer.segment === customerSegmentFilter;
    return matchesSearch && matchesSegment;
  });

  const getSegmentBadge = (segment: string) => {
    switch (segment) {
      case 'vip':
        return <span className="segment-badge segment-vip">VIP</span>;
      case 'frequent':
        return <span className="segment-badge segment-frequent">Frequente</span>;
      case 'occasional':
        return <span className="segment-badge segment-occasional">Ocasional</span>;
      case 'new':
        return <span className="segment-badge segment-new">Novo</span>;
      default:
        return <span className="segment-badge">{segment}</span>;
    }
  };

  const totalCustomers = filteredCustomers.length;
  const vipCustomers = filteredCustomers.filter(c => c.segment === 'vip').length;
  const activeCustomers = filteredCustomers.filter(c => c.status === 'active').length;
  const totalRevenue = filteredCustomers.reduce((acc, customer) => {
    const value = parseFloat(customer.totalSpent.replace('R$', '').replace('.', '').replace(',', '.'));
    return acc + (isNaN(value) ? 0 : value);
  }, 0);

  return (
    <div className="dashboard-content">
      <div className="content-header">
        <div>
          <h2>Clientes</h2>
          <p>Gerencie sua base de clientes</p>
        </div>
        <button className="btn-primary">
          <Plus size={20} />
          Novo Cliente
        </button>
      </div>

      {/* Stats Cards */}
      <div className="metrics-grid">
        <div className="metric-card glow-purple">
          <div className="metric-header">
            <span className="metric-label">Total de Clientes</span>
            <Users size={18} className="icon-purple" />
          </div>
          <div className="metric-value">{totalCustomers}</div>
        </div>
        <div className="metric-card glow-yellow">
          <div className="metric-header">
            <span className="metric-label">Clientes VIP</span>
            <Tag size={18} className="icon-yellow" />
          </div>
          <div className="metric-value">{vipCustomers}</div>
        </div>
        <div className="metric-card glow-green">
          <div className="metric-header">
            <span className="metric-label">Clientes Ativos</span>
            <CheckCircle size={18} className="icon-green" />
          </div>
          <div className="metric-value">{activeCustomers}</div>
        </div>
        <div className="metric-card glow-cyan">
          <div className="metric-header">
            <span className="metric-label">Receita Total</span>
            <TrendingUp size={18} className="icon-cyan" />
          </div>
          <div className="metric-value">R$ {totalRevenue.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</div>
        </div>
      </div>

      {/* Filters */}
      <div className="table-filters">
        <div className="search-box">
          <Search size={18} />
          <input 
            type="text" 
            placeholder="Buscar por nome ou e-mail..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="filters-group">
          <div className="filter-select">
            <Filter size={16} />
            <select 
              value={customerSegmentFilter}
              onChange={(e) => setCustomerSegmentFilter(e.target.value)}
            >
              <option value="all">Todos Segmentos</option>
              <option value="vip">VIP</option>
              <option value="frequent">Frequente</option>
              <option value="occasional">Ocasional</option>
              <option value="new">Novo</option>
            </select>
          </div>
          
          <button className="btn-secondary">
            <Download size={16} />
            Exportar
          </button>
        </div>
      </div>

      {/* Customers Table */}
      <div className="table-container glow-purple">
        <table className="data-table">
          <thead>
            <tr>
              <th>Cliente</th>
              <th>Contato</th>
              <th>Segmento</th>
              <th>Pedidos</th>
              <th>Total Gasto</th>
              <th>Última Compra</th>
              <th>Status</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {filteredCustomers.map((customer) => (
              <tr key={customer.id}>
                <td>
                  <div className="customer-info">
                    <div className="customer-avatar">
                      {customer.name.charAt(0)}
                    </div>
                    <div>
                      <div className="font-semibold">{customer.name}</div>
                      <div className="text-small text-gray">{customer.email}</div>
                    </div>
                  </div>
                </td>
                <td>
                  <div className="contact-info">
                    <div className="contact-item">
                      <Mail size={14} />
                      {customer.email}
                    </div>
                    <div className="contact-item">
                      <Phone size={14} />
                      {customer.phone}
                    </div>
                  </div>
                </td>
                <td>{getSegmentBadge(customer.segment)}</td>
                <td>
                  <div className="orders-count">
                    <ShoppingCart size={14} />
                    {customer.totalOrders} pedidos
                  </div>
                </td>
                <td className="font-semibold">{customer.totalSpent}</td>
                <td>
                  <div className="date-cell">
                    <Calendar size={14} />
                    {new Date(customer.lastPurchase).toLocaleDateString('pt-BR')}
                  </div>
                </td>
                <td>
                  <span className={`status-badge ${customer.status === 'active' ? 'status-completed' : 'status-cancelled'}`}>
                    {customer.status === 'active' ? 'Ativo' : 'Inativo'}
                  </span>
                </td>
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
        
        {filteredCustomers.length === 0 && (
          <div className="empty-state">
            <Users size={48} className="icon-gray" />
            <h3>Nenhum cliente encontrado</h3>
            <p>Tente ajustar os filtros ou busque por outro termo</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CustomersPage;
