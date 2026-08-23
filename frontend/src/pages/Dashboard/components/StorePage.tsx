import { useState } from 'react';
import { 
  Package,
  Plus,
  Search,
  Filter,
  MoreVertical,
  Edit,
  Trash2,
  Eye,
  DollarSign,
  TrendingUp,
  AlertTriangle,
  Check
} from 'lucide-react';
import { topProducts } from '../../../data/dashboard';
import '../../../styles/index.css';

interface StorePageProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
}

interface Product {
  id: string;
  name: string;
  stock: number;
  sales: number;
  revenue: string;
  category?: string;
  status?: string;
  image?: string;
}

const StorePage = ({ searchTerm, setSearchTerm }: StorePageProps) => {
  const [productStatusFilter, setProductStatusFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');

  const allProducts: Product[] = [
    ...topProducts.map(p => ({ ...p, category: 'Eletrônicos', status: 'active' as string, image: '📱' })),
    { id: '6', name: 'Câmera DSLR Pro', stock: 8, sales: 45, revenue: 'R$ 134.550', category: 'Eletrônicos', status: 'active', image: '📷' },
    { id: '7', name: 'Monitor 27" 4K', stock: 3, sales: 38, revenue: 'R$ 91.200', category: 'Eletrônicos', status: 'low-stock', image: '🖥️' },
    { id: '8', name: 'Mouse Gamer RGB', stock: 0, sales: 156, revenue: 'R$ 23.400', category: 'Acessórios', status: 'out-of-stock', image: '🖱️' },
    { id: '9', name: 'Headset Wireless', stock: 25, sales: 89, revenue: 'R$ 44.500', category: 'Acessórios', status: 'active', image: '🎧' },
    { id: '10', name: 'Tablet Premium', stock: 12, sales: 67, revenue: 'R$ 134.000', category: 'Eletrônicos', status: 'active', image: '📱' },
  ];

  const filteredProducts = allProducts.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || product.category === categoryFilter;
    const matchesStatus = productStatusFilter === 'all' || 
                         (productStatusFilter === 'active' && product.status === 'active') ||
                         (productStatusFilter === 'low-stock' && product.status === 'low-stock') ||
                         (productStatusFilter === 'out-of-stock' && product.status === 'out-of-stock');
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const categories = ['all', ...Array.from(new Set(allProducts.map(p => p.category || 'Geral')))];

  return (
    <div className="dashboard-content">
      <div className="content-header">
        <h2>Loja Virtual</h2>
        <p>Gerencie sua loja online e produtos</p>
      </div>

      {/* Metrics */}
      <div className="metrics-grid">
        <div className="metric-card glow-cyan">
          <div className="metric-header">
            <span className="metric-label">Total de Produtos</span>
            <div className="metric-icon icon-cyan">
              <Package size={18} />
            </div>
          </div>
          <div className="metric-value">{allProducts.length}</div>
          <div className="metric-change positive">+5 vs mês anterior</div>
        </div>

        <div className="metric-card glow-green">
          <div className="metric-header">
            <span className="metric-label">Produtos Ativos</span>
            <div className="metric-icon icon-green">
              <Check size={18} />
            </div>
          </div>
          <div className="metric-value">{allProducts.filter(p => p.status === 'active').length}</div>
          <div className="metric-change positive">+3 vs mês anterior</div>
        </div>

        <div className="metric-card glow-magenta">
          <div className="metric-header">
            <span className="metric-label">Estoque Baixo</span>
            <div className="metric-icon icon-magenta">
              <AlertTriangle size={18} />
            </div>
          </div>
          <div className="metric-value">{allProducts.filter(p => p.status === 'low-stock' || p.status === 'out-of-stock').length}</div>
          <div className="metric-change negative">Requer atenção</div>
        </div>

        <div className="metric-card glow-purple">
          <div className="metric-header">
            <span className="metric-label">Receita Total</span>
            <div className="metric-icon icon-purple">
              <DollarSign size={18} />
            </div>
          </div>
          <div className="metric-value">R$ 427.650</div>
          <div className="metric-change positive">+18.5% vs mês anterior</div>
        </div>
      </div>

      {/* Filters and Actions */}
      <div className="table-actions">
        <div className="search-box">
          <Search size={18} />
          <input 
            type="text" 
            placeholder="Buscar produtos..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="filters-group">
          <button className="filter-btn">
            <Filter size={18} />
            <select 
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
            >
              <option value="all">Todas Categorias</option>
              {categories.filter(c => c !== 'all').map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </button>

          <button className="filter-btn">
            <Filter size={18} />
            <select 
              value={productStatusFilter}
              onChange={(e) => setProductStatusFilter(e.target.value)}
            >
              <option value="all">Todos Status</option>
              <option value="active">Ativos</option>
              <option value="low-stock">Estoque Baixo</option>
              <option value="out-of-stock">Sem Estoque</option>
            </select>
          </button>

          <button className="btn-primary">
            <Plus size={18} />
            Novo Produto
          </button>
        </div>
      </div>

      {/* Products Grid */}
      <div className="products-grid-full">
        {filteredProducts.map((product) => (
          <div key={product.id} className="product-card-dashboard">
            <div className="product-card-image">
              <span className="product-emoji">{product.image}</span>
              <span className={`product-status-badge status-${product.status}`}>
                {product.status === 'active' ? 'Ativo' : 
                 product.status === 'low-stock' ? 'Estoque Baixo' : 'Sem Estoque'}
              </span>
            </div>
            
            <div className="product-card-info">
              <h4>{product.name}</h4>
              <span className="product-category">{product.category}</span>
              
              <div className="product-card-stats">
                <div className="stat-item">
                  <Package size={14} />
                  <span>Estoque: {product.stock}</span>
                </div>
                <div className="stat-item">
                  <TrendingUp size={14} />
                  <span>{product.sales} vendas</span>
                </div>
                <div className="stat-item">
                  <DollarSign size={14} />
                  <span>{product.revenue}</span>
                </div>
              </div>

              <div className="product-card-actions">
                <button className="action-btn-small" title="Visualizar">
                  <Eye size={16} />
                </button>
                <button className="action-btn-small" title="Editar">
                  <Edit size={16} />
                </button>
                <button className="action-btn-small" title="Excluir">
                  <Trash2 size={16} />
                </button>
                <button className="action-btn-small" title="Mais opções">
                  <MoreVertical size={16} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StorePage;
