import { Package, Filter, Download, Plus, Search, Edit, Trash2, AlertCircle, Tag, TrendingUp, CheckCircle, Eye, Share2 } from 'lucide-react';
import { products } from '../../../data/dashboard';

interface ProductsPageProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  productStatusFilter: string;
  setProductStatusFilter: (status: string) => void;
}

const ProductsPage = ({ searchTerm, setSearchTerm, productStatusFilter, setProductStatusFilter }: ProductsPageProps) => {
  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = productStatusFilter === 'all' || product.status === productStatusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <span className="status-badge status-completed"><CheckCircle size={12} /> Ativo</span>;
      case 'inactive':
        return <span className="status-badge status-cancelled">Inativo</span>;
      case 'low_stock':
        return <span className="status-badge status-low-stock"><AlertCircle size={12} /> Estoque Baixo</span>;
      default:
        return <span className="status-badge">{status}</span>;
    }
  };

  const getProductEmoji = (category: string) => {
    const emojis: Record<string, string> = {
      'Eletrônicos': '📱',
      'Acessórios': '🎧',
      'Casa': '🏠',
      'Beleza': '💄',
      'Esportes': '⚽',
      'Livros': '📚'
    };
    return emojis[category] || '📦';
  };

  const totalProducts = filteredProducts.length;
  const activeProducts = filteredProducts.filter(p => p.status === 'active').length;
  const lowStockProducts = filteredProducts.filter(p => p.status === 'low_stock').length;
  const totalRevenue = filteredProducts.reduce((acc, product) => {
    const value = parseFloat(product.revenue.replace('R$', '').replace('.', '').replace(',', '.'));
    return acc + (isNaN(value) ? 0 : value);
  }, 0);

  const handleShareProduct = (product: typeof products[0]) => {
    const message = `🌟 *${product.name}*\n\n${product.description}\n\n💰 Preço: ${product.price}\n📦 Estoque: ${product.stock} un.\n\n🛒 Compre agora!`;
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="dashboard-content">
      <div className="content-header">
        <div>
          <h2>Produtos</h2>
          <p>Gerencie seu catálogo de produtos e vendas</p>
        </div>
        <button className="btn-primary">
          <Plus size={20} />
          Novo Produto
        </button>
      </div>

      {/* Stats Cards */}
      <div className="metrics-grid">
        <div className="metric-card glow-cyan">
          <div className="metric-header">
            <span className="metric-label">Total de Produtos</span>
            <Package size={18} className="icon-cyan" />
          </div>
          <div className="metric-value">{totalProducts}</div>
        </div>
        <div className="metric-card glow-green">
          <div className="metric-header">
            <span className="metric-label">Produtos Ativos</span>
            <CheckCircle size={18} className="icon-green" />
          </div>
          <div className="metric-value">{activeProducts}</div>
        </div>
        <div className="metric-card glow-magenta">
          <div className="metric-header">
            <span className="metric-label">Estoque Baixo</span>
            <AlertCircle size={18} className="icon-magenta" />
          </div>
          <div className="metric-value">{lowStockProducts}</div>
        </div>
        <div className="metric-card glow-purple">
          <div className="metric-header">
            <span className="metric-label">Receita Total</span>
            <TrendingUp size={18} className="icon-purple" />
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
            placeholder="Buscar por nome ou categoria..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="filters-group">
          <div className="filter-select">
            <Filter size={16} />
            <select 
              value={productStatusFilter}
              onChange={(e) => setProductStatusFilter(e.target.value)}
            >
              <option value="all">Todos Status</option>
              <option value="active">Ativos</option>
              <option value="inactive">Inativos</option>
              <option value="low_stock">Estoque Baixo</option>
            </select>
          </div>
          
          <button className="btn-secondary">
            <Download size={16} />
            Exportar
          </button>
        </div>
      </div>

      {/* Products Grid */}
      <div className="products-grid-container">
        {filteredProducts.map((product) => (
          <div key={product.id} className="product-card glow-cyan">
            <div className="product-card-header">
              <div className="product-icon-with-emoji">
                <span className="product-emoji-icon">{getProductEmoji(product.category)}</span>
              </div>
              <div className="product-actions">
                <button className="action-btn-sm" title="Visualizar">
                  <Eye size={14} />
                </button>
                <button className="action-btn-sm" title="Editar">
                  <Edit size={14} />
                </button>
                <button className="action-btn-sm" title="Excluir">
                  <Trash2 size={14} />
                </button>
                <button 
                  className="action-btn-sm action-share" 
                  title="Compartilhar no WhatsApp"
                  onClick={() => handleShareProduct(product)}
                >
                  <Share2 size={14} />
                </button>
              </div>
            </div>
            
            <div className="product-card-body">
              <div className="product-category">
                <Tag size={12} />
                {product.category}
              </div>
              <h3 className="product-name">{product.name}</h3>
              <p className="product-description">{product.description}</p>
              
              <div className="product-stats-row">
                <div className="stat-item">
                  <span className="stat-label">Preço</span>
                  <span className="stat-value price">{product.price}</span>
                </div>
                <div className="stat-item">
                  <span className="stat-label">Custo</span>
                  <span className="stat-value">{product.cost}</span>
                </div>
              </div>
              
              <div className="product-stats-row">
                <div className="stat-item">
                  <span className="stat-label">Estoque</span>
                  <span className={`stat-value ${product.stock <= product.minStock ? 'low-stock' : ''}`}>
                    {product.stock} un.
                  </span>
                </div>
                <div className="stat-item">
                  <span className="stat-label">Vendas</span>
                  <span className="stat-value">{product.sales}</span>
                </div>
              </div>
              
              <div className="product-revenue">
                <span className="revenue-label">Receita Total:</span>
                <span className="revenue-value">{product.revenue}</span>
              </div>
              
              <div className="product-status">
                {getStatusBadge(product.status)}
              </div>
            </div>
          </div>
        ))}
        
        {filteredProducts.length === 0 && (
          <div className="empty-state">
            <Package size={48} className="icon-gray" />
            <h3>Nenhum produto encontrado</h3>
            <p>Tente ajustar os filtros ou busque por outro termo</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductsPage;
