import { useState } from 'react';
import { 
  Settings,
  User,
  Bell,
  Lock,
  CreditCard,
  Globe,
  Smartphone,
  MessageSquare,
  Bot,
  Zap,
  Palette,
  Shield,
  Database,
  Mail,
  Phone,
  Building,
  Upload,
  Trash2,
  Edit,
  Check,
  X,
  ChevronRight,
  ToggleLeft,
  ToggleRight,
  Wallet,
  Link,
  QrCode,
  Send,
  ShoppingCart,
  Package,
  Star
} from 'lucide-react';
import '../../../styles/index.css';

interface SettingsPageProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
}

const SettingsPage = ({ searchTerm, setSearchTerm }: SettingsPageProps) => {
  const [activeSection, setActiveSection] = useState('general');
  const [notifications, setNotifications] = useState({
    email: true,
    push: true,
    sms: false,
    newOrder: true,
    newMessage: true,
    lowStock: true,
    paymentReceived: true,
  });
  const [whatsappConnected, setWhatsappConnected] = useState(true);
  const [autoReplyEnabled, setAutoReplyEnabled] = useState(true);
  const [darkMode, setDarkMode] = useState(true);

  const settingsSections = [
    { id: 'general', label: 'Geral', icon: User },
    { id: 'company', label: 'Empresa', icon: Building },
    { id: 'whatsapp', label: 'WhatsApp', icon: MessageSquare },
    { id: 'automation', label: 'Automação', icon: Bot },
    { id: 'notifications', label: 'Notificações', icon: Bell },
    { id: 'payment', label: 'Pagamento', icon: CreditCard },
    { id: 'appearance', label: 'Aparência', icon: Palette },
    { id: 'security', label: 'Segurança', icon: Lock },
    { id: 'integrations', label: 'Integrações', icon: Link },
    { id: 'data', label: 'Dados', icon: Database },
  ];

  const toggleNotification = (key: keyof typeof notifications) => {
    setNotifications(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="dashboard-content">
      <div className="content-header">
        <div className="header-left">
          <h2>⚙️ Configurações</h2>
          <p>Personalize e gerencie as configurações da sua conta</p>
        </div>
      </div>

      <div className="settings-container">
        {/* Settings Sidebar */}
        <aside className="settings-sidebar">
          <nav className="settings-nav">
            {settingsSections.map((section) => (
              <button
                key={section.id}
                className={`settings-nav-item ${activeSection === section.id ? 'active' : ''}`}
                onClick={() => setActiveSection(section.id)}
              >
                <section.icon size={20} />
                <span>{section.label}</span>
                <ChevronRight size={16} />
              </button>
            ))}
          </nav>
        </aside>

        {/* Settings Content */}
        <main className="settings-content">
          {/* General Settings */}
          {activeSection === 'general' && (
            <div className="settings-section">
              <div className="section-header">
                <User size={24} className="icon-green" />
                <h3>Configurações Gerais</h3>
              </div>

              <div className="settings-card">
                <div className="settings-group">
                  <label className="settings-label">Foto de Perfil</label>
                  <div className="profile-upload">
                    <div className="profile-avatar-large">
                      <span>U</span>
                    </div>
                    <div className="profile-actions">
                      <button className="btn-upload">
                        <Upload size={16} />
                        Alterar Foto
                      </button>
                      <button className="btn-remove">
                        <Trash2 size={16} />
                        Remover
                      </button>
                    </div>
                  </div>
                </div>

                <div className="settings-group">
                  <label className="settings-label">Nome Completo</label>
                  <input 
                    type="text" 
                    className="settings-input"
                    defaultValue="Usuário Admin"
                  />
                </div>

                <div className="settings-group">
                  <label className="settings-label">E-mail</label>
                  <input 
                    type="email" 
                    className="settings-input"
                    defaultValue="usuario@empresa.com"
                  />
                </div>

                <div className="settings-group">
                  <label className="settings-label">Telefone</label>
                  <input 
                    type="tel" 
                    className="settings-input"
                    defaultValue="+55 11 99999-9999"
                  />
                </div>

                <div className="settings-group">
                  <label className="settings-label">Idioma</label>
                  <select className="settings-select">
                    <option>Português (Brasil)</option>
                    <option>English (US)</option>
                    <option>Español</option>
                  </select>
                </div>

                <div className="settings-group">
                  <label className="settings-label">Fuso Horário</label>
                  <select className="settings-select">
                    <option>(GMT-03:00) Brasília</option>
                    <option>(GMT-04:00) Manaus</option>
                    <option>(GMT-02:00) Fernando de Noronha</option>
                  </select>
                </div>

                <div className="settings-actions">
                  <button className="btn-cancel">Cancelar</button>
                  <button className="btn-save">Salvar Alterações</button>
                </div>
              </div>
            </div>
          )}

          {/* Company Settings */}
          {activeSection === 'company' && (
            <div className="settings-section">
              <div className="section-header">
                <Building size={24} className="icon-cyan" />
                <h3>Dados da Empresa</h3>
              </div>

              <div className="settings-card">
                <div className="settings-group">
                  <label className="settings-label">Nome da Empresa</label>
                  <input 
                    type="text" 
                    className="settings-input"
                    defaultValue="DiixWhatsApp Ltda"
                  />
                </div>

                <div className="settings-group">
                  <label className="settings-label">CNPJ</label>
                  <input 
                    type="text" 
                    className="settings-input"
                    defaultValue="00.000.000/0000-00"
                  />
                </div>

                <div className="settings-group">
                  <label className="settings-label">Endereço Completo</label>
                  <input 
                    type="text" 
                    className="settings-input"
                    defaultValue="Rua Exemplo, 123 - São Paulo, SP"
                  />
                </div>

                <div className="settings-row">
                  <div className="settings-group half">
                    <label className="settings-label">CEP</label>
                    <input 
                      type="text" 
                      className="settings-input"
                      defaultValue="00000-000"
                    />
                  </div>
                  <div className="settings-group half">
                    <label className="settings-label">Número</label>
                    <input 
                      type="text" 
                      className="settings-input"
                      defaultValue="123"
                    />
                  </div>
                </div>

                <div className="settings-group">
                  <label className="settings-label">Site</label>
                  <input 
                    type="url" 
                    className="settings-input"
                    defaultValue="https://www.diixwhatsapp.com.br"
                  />
                </div>

                <div className="settings-group">
                  <label className="settings-label">Descrição da Empresa</label>
                  <textarea 
                    className="settings-textarea"
                    rows={4}
                    defaultValue="Solução completa em automação de WhatsApp para empresas."
                  ></textarea>
                </div>

                <div className="settings-actions">
                  <button className="btn-cancel">Cancelar</button>
                  <button className="btn-save">Salvar Dados</button>
                </div>
              </div>
            </div>
          )}

          {/* WhatsApp Settings */}
          {activeSection === 'whatsapp' && (
            <div className="settings-section">
              <div className="section-header">
                <MessageSquare size={24} className="icon-green" />
                <h3>Conexão WhatsApp</h3>
              </div>

              <div className="settings-card">
                <div className="connection-status-card connected">
                  <div className="status-icon">
                    <Check size={32} />
                  </div>
                  <div className="status-info">
                    <h4>WhatsApp Conectado</h4>
                    <p>+55 11 99999-9999 • Última sincronização: agora</p>
                  </div>
                  <button className="btn-disconnect">Desconectar</button>
                </div>

                <div className="settings-group">
                  <label className="settings-label">QR Code para Nova Conexão</label>
                  <div className="qr-code-container">
                    <div className="qr-code-placeholder">
                      <QrCode size={180} />
                      <p>Escaneie com o WhatsApp</p>
                    </div>
                  </div>
                </div>

                <div className="settings-group">
                  <div className="settings-toggle-row">
                    <div className="toggle-info">
                      <label className="settings-label">Resposta Automática</label>
                      <p className="toggle-description">Enviar mensagem automática quando receber novas conversas</p>
                    </div>
                    <button 
                      className="toggle-btn"
                      onClick={() => setAutoReplyEnabled(!autoReplyEnabled)}
                    >
                      {autoReplyEnabled ? <ToggleRight size={32} className="text-green" /> : <ToggleLeft size={32} />}
                    </button>
                  </div>
                </div>

                {autoReplyEnabled && (
                  <div className="settings-group">
                    <label className="settings-label">Mensagem de Saudação</label>
                    <textarea 
                      className="settings-textarea"
                      rows={4}
                      defaultValue="Olá! 👋 Bem-vindo à nossa loja. Como podemos ajudar você hoje?"
                    ></textarea>
                  </div>
                )}

                <div className="settings-group">
                  <label className="settings-label">Horário de Atendimento</label>
                  <div className="business-hours">
                    <div className="hour-row">
                      <span>Segunda a Sexta</span>
                      <input type="time" className="time-input" defaultValue="09:00" />
                      <span>às</span>
                      <input type="time" className="time-input" defaultValue="18:00" />
                    </div>
                    <div className="hour-row">
                      <span>Sábado</span>
                      <input type="time" className="time-input" defaultValue="09:00" />
                      <span>às</span>
                      <input type="time" className="time-input" defaultValue="13:00" />
                    </div>
                    <div className="hour-row">
                      <span>Domingo</span>
                      <span className="closed">Fechado</span>
                    </div>
                  </div>
                </div>

                <div className="settings-actions">
                  <button className="btn-cancel">Cancelar</button>
                  <button className="btn-save">Salvar Configurações</button>
                </div>
              </div>
            </div>
          )}

          {/* Automation Settings */}
          {activeSection === 'automation' && (
            <div className="settings-section">
              <div className="section-header">
                <Bot size={24} className="icon-magenta" />
                <h3>Automação & Chatbot</h3>
              </div>

              <div className="settings-card">
                <div className="automation-flows-list">
                  <div className="flow-config-item">
                    <div className="flow-header">
                      <Zap size={20} className="icon-green" />
                      <span>Boas-vindas Automático</span>
                      <button className="toggle-small active">Ativo</button>
                    </div>
                    <p className="flow-description">Envia mensagem de saudação quando um novo cliente inicia conversa</p>
                    <button className="btn-edit-flow"><Edit size={16} /> Editar Fluxo</button>
                  </div>

                  <div className="flow-config-item">
                    <div className="flow-header">
                      <Bot size={20} className="icon-cyan" />
                      <span>Menu Interativo</span>
                      <button className="toggle-small active">Ativo</button>
                    </div>
                    <p className="flow-description">Mostra opções de menu para o cliente escolher</p>
                    <button className="btn-edit-flow"><Edit size={16} /> Editar Fluxo</button>
                  </div>

                  <div className="flow-config-item">
                    <div className="flow-header">
                      <ShoppingCart size={20} className="icon-purple" />
                      <span>Recuperação de Carrinho</span>
                      <button className="toggle-small">Inativo</button>
                    </div>
                    <p className="flow-description">Envia lembrete para clientes que abandonaram o carrinho</p>
                    <button className="btn-edit-flow"><Edit size={16} /> Editar Fluxo</button>
                  </div>

                  <div className="flow-config-item">
                    <div className="flow-header">
                      <Star size={20} className="icon-magenta" />
                      <span>Avaliação Pós-Compra</span>
                      <button className="toggle-small active">Ativo</button>
                    </div>
                    <p className="flow-description">Solicita avaliação do cliente após entrega do produto</p>
                    <button className="btn-edit-flow"><Edit size={16} /> Editar Fluxo</button>
                  </div>
                </div>

                <button className="btn-new-flow">
                  <Zap size={18} />
                  Criar Novo Fluxo
                </button>
              </div>
            </div>
          )}

          {/* Notifications Settings */}
          {activeSection === 'notifications' && (
            <div className="settings-section">
              <div className="section-header">
                <Bell size={24} className="icon-yellow" />
                <h3>Preferências de Notificação</h3>
              </div>

              <div className="settings-card">
                <h4 className="settings-subtitle">Canais de Notificação</h4>
                
                <div className="notification-channels">
                  <div className="channel-option">
                    <Mail size={20} className="icon-blue" />
                    <span>E-mail</span>
                    <button 
                      className="toggle-btn-small"
                      onClick={() => toggleNotification('email')}
                    >
                      {notifications.email ? <ToggleRight size={28} className="text-green" /> : <ToggleLeft size={28} />}
                    </button>
                  </div>

                  <div className="channel-option">
                    <Bell size={20} className="icon-purple" />
                    <span>Push no Navegador</span>
                    <button 
                      className="toggle-btn-small"
                      onClick={() => toggleNotification('push')}
                    >
                      {notifications.push ? <ToggleRight size={28} className="text-green" /> : <ToggleLeft size={28} />}
                    </button>
                  </div>

                  <div className="channel-option">
                    <Smartphone size={20} className="icon-green" />
                    <span>SMS</span>
                    <button 
                      className="toggle-btn-small"
                      onClick={() => toggleNotification('sms')}
                    >
                      {notifications.sms ? <ToggleRight size={28} className="text-green" /> : <ToggleLeft size={28} />}
                    </button>
                  </div>
                </div>

                <h4 className="settings-subtitle">Tipos de Notificação</h4>
                
                <div className="notification-types">
                  <div className="notification-type-item">
                    <div className="type-info">
                      <ShoppingCart size={18} className="icon-green" />
                      <span>Novo Pedido</span>
                    </div>
                    <button 
                      className="toggle-btn-small"
                      onClick={() => toggleNotification('newOrder')}
                    >
                      {notifications.newOrder ? <ToggleRight size={28} className="text-green" /> : <ToggleLeft size={28} />}
                    </button>
                  </div>

                  <div className="notification-type-item">
                    <div className="type-info">
                      <MessageSquare size={18} className="icon-cyan" />
                      <span>Nova Mensagem</span>
                    </div>
                    <button 
                      className="toggle-btn-small"
                      onClick={() => toggleNotification('newMessage')}
                    >
                      {notifications.newMessage ? <ToggleRight size={28} className="text-green" /> : <ToggleLeft size={28} />}
                    </button>
                  </div>

                  <div className="notification-type-item">
                    <div className="type-info">
                      <Wallet size={18} className="icon-purple" />
                      <span>Pagamento Recebido</span>
                    </div>
                    <button 
                      className="toggle-btn-small"
                      onClick={() => toggleNotification('paymentReceived')}
                    >
                      {notifications.paymentReceived ? <ToggleRight size={28} className="text-green" /> : <ToggleLeft size={28} />}
                    </button>
                  </div>

                  <div className="notification-type-item">
                    <div className="type-info">
                      <Package size={18} className="icon-magenta" />
                      <span>Estoque Baixo</span>
                    </div>
                    <button 
                      className="toggle-btn-small"
                      onClick={() => toggleNotification('lowStock')}
                    >
                      {notifications.lowStock ? <ToggleRight size={28} className="text-green" /> : <ToggleLeft size={28} />}
                    </button>
                  </div>
                </div>

                <div className="settings-actions">
                  <button className="btn-cancel">Cancelar</button>
                  <button className="btn-save">Salvar Preferências</button>
                </div>
              </div>
            </div>
          )}

          {/* Payment Settings */}
          {activeSection === 'payment' && (
            <div className="settings-section">
              <div className="section-header">
                <CreditCard size={24} className="icon-green" />
                <h3>Métodos de Pagamento</h3>
              </div>

              <div className="settings-card">
                <div className="payment-methods">
                  <div className="payment-method-card active">
                    <div className="method-icon">💳</div>
                    <div className="method-info">
                      <h4>Cartão de Crédito</h4>
                      <p>Visa, Mastercard, Elo, Amex</p>
                    </div>
                    <button className="method-toggle active">Ativo</button>
                  </div>

                  <div className="payment-method-card active">
                    <div className="method-icon">🏦</div>
                    <div className="method-info">
                      <h4>PIX</h4>
                      <p>Chave CNPJ: 00.000.000/0000-00</p>
                    </div>
                    <button className="method-toggle active">Ativo</button>
                  </div>

                  <div className="payment-method-card">
                    <div className="method-icon">📄</div>
                    <div className="method-info">
                      <h4>Boleto Bancário</h4>
                      <p>Vencimento em 3 dias úteis</p>
                    </div>
                    <button className="method-toggle">Inativo</button>
                  </div>

                  <div className="payment-method-card active">
                    <div className="method-icon">📱</div>
                    <div className="method-info">
                      <h4>WhatsApp Pay</h4>
                      <p>Pagamento direto pelo WhatsApp</p>
                    </div>
                    <button className="method-toggle active">Ativo</button>
                  </div>
                </div>

                <div className="settings-group">
                  <label className="settings-label">Chave PIX</label>
                  <input 
                    type="text" 
                    className="settings-input"
                    defaultValue="00.000.000/0000-00"
                  />
                </div>

                <div className="settings-actions">
                  <button className="btn-cancel">Cancelar</button>
                  <button className="btn-save">Salvar Métodos</button>
                </div>
              </div>
            </div>
          )}

          {/* Appearance Settings */}
          {activeSection === 'appearance' && (
            <div className="settings-section">
              <div className="section-header">
                <Palette size={24} className="icon-purple" />
                <h3>Aparência & Temas</h3>
              </div>

              <div className="settings-card">
                <div className="theme-options">
                  <div className="theme-card selected">
                    <div className="theme-preview dark">
                      <div className="preview-sidebar"></div>
                      <div className="preview-content"></div>
                    </div>
                    <h4>Tema Escuro</h4>
                    <p>Padrão</p>
                  </div>

                  <div className="theme-card">
                    <div className="theme-preview light">
                      <div className="preview-sidebar"></div>
                      <div className="preview-content"></div>
                    </div>
                    <h4>Tema Claro</h4>
                    <p>Em breve</p>
                  </div>

                  <div className="theme-card">
                    <div className="theme-preview custom">
                      <div className="preview-sidebar"></div>
                      <div className="preview-content"></div>
                    </div>
                    <h4>Personalizado</h4>
                    <p>Em breve</p>
                  </div>
                </div>

                <div className="settings-group">
                  <label className="settings-label">Cor Principal</label>
                  <div className="color-picker">
                    <button className="color-option selected" style={{ background: '#00FF88' }}></button>
                    <button className="color-option" style={{ background: '#00D4FF' }}></button>
                    <button className="color-option" style={{ background: '#B95EFF' }}></button>
                    <button className="color-option" style={{ background: '#FF5ED6' }}></button>
                    <button className="color-option" style={{ background: '#FFAA5E' }}></button>
                  </div>
                </div>

                <div className="settings-actions">
                  <button className="btn-cancel">Cancelar</button>
                  <button className="btn-save">Aplicar Tema</button>
                </div>
              </div>
            </div>
          )}

          {/* Security Settings */}
          {activeSection === 'security' && (
            <div className="settings-section">
              <div className="section-header">
                <Lock size={24} className="icon-red" />
                <h3>Segurança da Conta</h3>
              </div>

              <div className="settings-card">
                <div className="settings-group">
                  <label className="settings-label">Senha Atual</label>
                  <input 
                    type="password" 
                    className="settings-input"
                    placeholder="••••••••"
                  />
                </div>

                <div className="settings-group">
                  <label className="settings-label">Nova Senha</label>
                  <input 
                    type="password" 
                    className="settings-input"
                    placeholder="Mínimo 8 caracteres"
                  />
                </div>

                <div className="settings-group">
                  <label className="settings-label">Confirmar Nova Senha</label>
                  <input 
                    type="password" 
                    className="settings-input"
                    placeholder="Repita a nova senha"
                  />
                </div>

                <div className="two-factor-auth">
                  <div className="fa-header">
                    <Shield size={24} className="icon-green" />
                    <h4>Autenticação de Dois Fatores</h4>
                  </div>
                  <p>Adicione uma camada extra de segurança à sua conta</p>
                  <button className="btn-enable-2fa">
                    <Shield size={18} />
                    Ativar 2FA
                  </button>
                </div>

                <div className="sessions-list">
                  <h4>Sessões Ativas</h4>
                  <div className="session-item">
                    <div className="session-info">
                      <Smartphone size={18} />
                      <div>
                        <p>Chrome • Windows</p>
                        <span>São Paulo, BR • Agora</span>
                      </div>
                    </div>
                    <span className="session-current">Sessão Atual</span>
                  </div>
                </div>

                <div className="danger-zone">
                  <h4>Zona de Perigo</h4>
                  <p>Ações irreversíveis na sua conta</p>
                  <button className="btn-danger">
                    <Trash2 size={18} />
                    Excluir Conta
                  </button>
                </div>

                <div className="settings-actions">
                  <button className="btn-cancel">Cancelar</button>
                  <button className="btn-save">Alterar Senha</button>
                </div>
              </div>
            </div>
          )}

          {/* Integrations Settings */}
          {activeSection === 'integrations' && (
            <div className="settings-section">
              <div className="section-header">
                <Link size={24} className="icon-cyan" />
                <h3>Integrações</h3>
              </div>

              <div className="settings-card">
                <div className="integrations-grid">
                  <div className="integration-card connected">
                    <div className="integration-icon">🛍️</div>
                    <div className="integration-info">
                      <h4>Shopify</h4>
                      <p>Sincronização de produtos e pedidos</p>
                    </div>
                    <button className="btn-integration-active">Conectado</button>
                  </div>

                  <div className="integration-card">
                    <div className="integration-icon">📦</div>
                    <div className="integration-info">
                      <h4>Nuvemshop</h4>
                      <p>Integração completa de e-commerce</p>
                    </div>
                    <button className="btn-integration">Conectar</button>
                  </div>

                  <div className="integration-card connected">
                    <div className="integration-icon">📊</div>
                    <div className="integration-info">
                      <h4>Google Analytics</h4>
                      <p>Rastreamento de conversões</p>
                    </div>
                    <button className="btn-integration-active">Conectado</button>
                  </div>

                  <div className="integration-card">
                    <div className="integration-icon">📧</div>
                    <div className="integration-info">
                      <h4>Mailchimp</h4>
                      <p>Marketing por e-mail</p>
                    </div>
                    <button className="btn-integration">Conectar</button>
                  </div>

                  <div className="integration-card">
                    <div className="integration-icon">🚚</div>
                    <div className="integration-info">
                      <h4>Melhor Envio</h4>
                      <p>Cálculo de frete automático</p>
                    </div>
                    <button className="btn-integration">Conectar</button>
                  </div>

                  <div className="integration-card">
                    <div className="integration-icon">💬</div>
                    <div className="integration-info">
                      <h4>Instagram</h4>
                      <p>Direct e comentários</p>
                    </div>
                    <button className="btn-integration">Conectar</button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Data Settings */}
          {activeSection === 'data' && (
            <div className="settings-section">
              <div className="section-header">
                <Database size={24} className="icon-magenta" />
                <h3>Gestão de Dados</h3>
              </div>

              <div className="settings-card">
                <div className="data-usage">
                  <h4>Uso de Armazenamento</h4>
                  <div className="storage-bar">
                    <div className="storage-used" style={{ width: '45%' }}></div>
                  </div>
                  <p>4.5 GB de 10 GB utilizados</p>
                </div>

                <div className="data-actions-grid">
                  <div className="data-action-card">
                    <Download size={32} className="icon-green" />
                    <h4>Exportar Dados</h4>
                    <p>Baixe todos os seus dados em formato JSON</p>
                    <button className="btn-data-action">
                      <Download size={16} />
                      Exportar
                    </button>
                  </div>

                  <div className="data-action-card">
                    <Upload size={32} className="icon-cyan" />
                    <h4>Importar Dados</h4>
                    <p>Restaure dados de um backup anterior</p>
                    <button className="btn-data-action">
                      <Upload size={16} />
                      Importar
                    </button>
                  </div>

                  <div className="data-action-card">
                    <Trash2 size={32} className="icon-red" />
                    <h4>Limpar Cache</h4>
                    <p>Remova dados temporários do sistema</p>
                    <button className="btn-data-action danger">
                      <Trash2 size={16} />
                      Limpar
                    </button>
                  </div>
                </div>

                <div className="backup-settings">
                  <h4>Backup Automático</h4>
                  <div className="settings-toggle-row">
                    <div className="toggle-info">
                      <label className="settings-label">Habilitar Backup Diário</label>
                      <p className="toggle-description">Seus dados serão salvos automaticamente todos os dias</p>
                    </div>
                    <button className="toggle-btn">
                      <ToggleRight size={32} className="text-green" />
                    </button>
                  </div>
                </div>

                <div className="settings-actions">
                  <button className="btn-cancel">Cancelar</button>
                  <button className="btn-save">Salvar Configurações</button>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default SettingsPage;
