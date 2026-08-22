import { useState, useRef, useEffect } from 'react';
import { 
  MessageSquare, 
  Search, 
  Filter, 
  MoreVertical, 
  Phone, 
  Video, 
  Send,
  Paperclip,
  Smile,
  CheckCheck,
  Check,
  Mic,
  Image as ImageIcon,
  Camera,
  Archive,
  Pin,
  Bot,
  Zap,
  MessageCircle,
  X
} from 'lucide-react';
import '../Dashboard.css';

interface ConversationsPageProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
}

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'customer';
  timestamp: string;
  status?: 'sent' | 'delivered' | 'read';
  type?: 'text' | 'image' | 'file' | 'audio';
}

interface Conversation {
  id: string;
  customer: string;
  avatar?: string;
  lastMessage: string;
  time: string;
  unread: number;
  online: boolean;
  pinned: boolean;
  messages: Message[];
  channel: 'whatsapp' | 'instagram' | 'facebook' | 'site';
}

const mockConversations: Conversation[] = [
  {
    id: '1',
    customer: 'Carlos Mendes',
    lastMessage: 'Gostaria de ver os produtos disponíveis',
    time: '2min atrás',
    unread: 2,
    online: true,
    pinned: true,
    channel: 'whatsapp',
    messages: [
      { id: '1', text: 'Olá! Gostaria de ver os produtos disponíveis.', sender: 'customer', timestamp: '10:32', type: 'text' },
      { id: '2', text: 'Olá! 👋 Seja bem-vindo à nossa loja.', sender: 'user', timestamp: '10:32', status: 'read', type: 'text' },
      { id: '3', text: 'Escolha uma opção:\n1. Ver produtos\n2. Fazer pedido\n3. Acompanhar pedido\n4. Falar com atendente', sender: 'user', timestamp: '10:32', status: 'read', type: 'text' },
      { id: '4', text: 'Quero ver os produtos da categoria de eletrônicos.', sender: 'customer', timestamp: '10:35', type: 'text' },
    ]
  },
  {
    id: '2',
    customer: 'Fernanda Lima',
    lastMessage: 'Qual o prazo de entrega?',
    time: '5min atrás',
    unread: 1,
    online: true,
    pinned: false,
    channel: 'instagram',
    messages: [
      { id: '1', text: 'Oi! Qual o prazo de entrega para São Paulo?', sender: 'customer', timestamp: '11:15', type: 'text' },
    ]
  },
  {
    id: '3',
    customer: 'Roberto Alves',
    lastMessage: 'Preciso de ajuda com meu pedido',
    time: '12min atrás',
    unread: 0,
    online: false,
    pinned: false,
    channel: 'whatsapp',
    messages: [
      { id: '1', text: 'Preciso de ajuda com meu pedido #ORD-123', sender: 'customer', timestamp: '10:48', type: 'text' },
      { id: '2', text: 'Claro! Vou verificar para você. 😊', sender: 'user', timestamp: '10:50', status: 'delivered', type: 'text' },
    ]
  },
  {
    id: '4',
    customer: 'Patrícia Souza',
    lastMessage: 'Tem desconto para atacado?',
    time: '18min atrás',
    unread: 1,
    online: false,
    pinned: true,
    channel: 'facebook',
    messages: [
      { id: '1', text: 'Vocês têm desconto para compras no atacado?', sender: 'customer', timestamp: '10:42', type: 'text' },
    ]
  },
  {
    id: '5',
    customer: 'Marcos Henrique',
    lastMessage: 'Quero cancelar meu pedido',
    time: '25min atrás',
    unread: 3,
    online: true,
    pinned: false,
    channel: 'whatsapp',
    messages: [
      { id: '1', text: 'Quero cancelar meu pedido', sender: 'customer', timestamp: '10:35', type: 'text' },
      { id: '2', text: 'Posso ajudar com isso. Qual o número do pedido?', sender: 'user', timestamp: '10:36', status: 'read', type: 'text' },
      { id: '3', text: '#ORD-456', sender: 'customer', timestamp: '10:37', type: 'text' },
      { id: '4', text: 'Já estou verificando...', sender: 'customer', timestamp: '10:38', type: 'text' },
      { id: '5', text: 'Por favor, aguarde um momento.', sender: 'customer', timestamp: '10:39', type: 'text' },
    ]
  },
];

const quickReplies = [
  { id: '1', text: 'Olá! 👋 Seja bem-vindo à nossa loja. Como posso ajudar?' },
  { id: '2', text: 'Nosso prazo de entrega é de 3 a 7 dias úteis para todo o Brasil. 📦' },
  { id: '3', text: 'Aceitamos os seguintes pagamentos: Cartão de Crédito, PIX, Boleto e WhatsApp Pay. 💳' },
  { id: '4', text: 'Sim! Oferecemos desconto especial para compras no atacado. Entre em contato para mais detalhes. 🏷️' },
  { id: '5', text: 'Para acompanhar seu pedido, por favor informe o número do pedido. 📍' },
];

const botTemplates = [
  { id: '1', name: 'Boas-vindas', text: 'Olá! 👋 Bem-vindo(a) à nossa loja! Eu sou o assistente virtual e estou aqui para ajudar. Escolha uma opção:\n\n1️⃣ Ver produtos\n2️⃣ Fazer pedido\n3️⃣ Acompanhar pedido\n4️⃣ Falar com atendente' },
  { id: '2', name: 'Catálogo', text: '🛍️ *Confira nosso catálogo:*\n\n• Eletrônicos - 20% OFF\n• Beleza - Compre 2 Pague 1\n• Periféricos - Frete Grátis\n\nDigite o número da categoria que deseja ver!' },
  { id: '3', name: 'Pagamento', text: '💳 *Formas de Pagamento:*\n\n✅ Cartão de Crédito (até 12x)\n✅ PIX (5% de desconto)\n✅ Boleto Bancário\n✅ WhatsApp Pay\n\nQual forma prefere?' },
  { id: '4', name: 'Encerramento', text: 'Obrigado por entrar em contato! 😊\n\nSe tiver mais dúvidas, estamos à disposição.\n\nTenha um ótimo dia! 🌟' },
];

const ConversationsPage = ({ searchTerm, setSearchTerm }: ConversationsPageProps) => {
  const [selectedConversation, setSelectedConversation] = useState<string | null>(null);
  const [messageInput, setMessageInput] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterChannel, setFilterChannel] = useState('all');
  const [showQuickReplies, setShowQuickReplies] = useState(false);
  const [showBotTemplates, setShowBotTemplates] = useState(false);
  const [conversations, setConversations] = useState<Conversation[]>(mockConversations);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [isTyping, setIsTyping] = useState(false);

  const filteredConversations = conversations.filter(conv => {
    const matchesSearch = conv.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         conv.lastMessage.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || 
                         (filterStatus === 'unread' && conv.unread > 0) ||
                         (filterStatus === 'read' && conv.unread === 0) ||
                         (filterStatus === 'pinned' && conv.pinned);
    const matchesChannel = filterChannel === 'all' || conv.channel === filterChannel;
    return matchesSearch && matchesFilter && matchesChannel;
  });

  const selectedConv = conversations.find(c => c.id === selectedConversation);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [selectedConv?.messages]);

  const handleSendMessage = () => {
    if (messageInput.trim() && selectedConv) {
      const newMessage: Message = {
        id: Date.now().toString(),
        text: messageInput,
        sender: 'user',
        timestamp: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
        status: 'sent',
        type: 'text'
      };
      
      setConversations(prev => prev.map(conv => 
        conv.id === selectedConversation 
          ? { 
              ...conv, 
              messages: [...conv.messages, newMessage],
              lastMessage: messageInput,
              time: 'Agora'
            }
          : conv
      ));
      setMessageInput('');
      
      // Simula resposta automática após alguns segundos
      setTimeout(() => {
        setIsTyping(true);
        setTimeout(() => {
          setIsTyping(false);
          const autoReply: Message = {
            id: (Date.now() + 1).toString(),
            text: 'Obrigado pela mensagem! Em breve um de nossos atendentes irá responder. 😊',
            sender: 'customer',
            timestamp: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
            type: 'text'
          };
          setConversations(prev => prev.map(conv => 
            conv.id === selectedConversation 
              ? { 
                  ...conv, 
                  messages: [...conv.messages, autoReply],
                  lastMessage: autoReply.text,
                  time: 'Agora'
                }
              : conv
          ));
        }, 2000);
      }, 1000);
    }
  };

  const handleQuickReply = (text: string) => {
    setMessageInput(text);
    setShowQuickReplies(false);
  };

  const handleBotTemplate = (text: string) => {
    setMessageInput(text);
    setShowBotTemplates(false);
  };

  const handlePinConversation = (convId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setConversations(prev => prev.map(conv => 
      conv.id === convId ? { ...conv, pinned: !conv.pinned } : conv
    ));
  };

  const handleArchiveConversation = (convId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    // Implementar arquivamento
    console.log('Arquivar conversa:', convId);
  };

  const getChannelIcon = (channel: string) => {
    switch (channel) {
      case 'whatsapp': return '📱';
      case 'instagram': return '📸';
      case 'facebook': return '📘';
      case 'site': return '🌐';
      default: return '💬';
    }
  };

  const getMessageStatusIcon = (status?: string) => {
    switch (status) {
      case 'sent': return <Check size={14} className="message-check" />;
      case 'delivered': return <CheckCheck size={14} className="message-check" style={{ opacity: 0.5 }} />;
      case 'read': return <CheckCheck size={14} className="message-check read" />;
      default: return null;
    }
  };

  return (
    <div className="dashboard-content">
      <div className="content-header">
        <h2>💬 Conversas</h2>
        <p>Gerencie todas as conversas com seus clientes em um só lugar</p>
      </div>

      <div className="conversations-container-whatsapp">
        {/* Conversations List Panel */}
        <div className="conversations-list-panel-wa">
          {/* Header com busca e filtros */}
          <div className="conversations-header-wa">
            <div className="search-box-wa">
              <Search size={18} />
              <input 
                type="text" 
                placeholder="Pesquisar ou começar nova conversa" 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <div className="filters-row">
              <button className="filter-btn-wa" onClick={() => setShowQuickReplies(!showQuickReplies)}>
                <Zap size={18} />
                <span>Respostas</span>
              </button>
              
              <button className="filter-btn-wa" onClick={() => setShowBotTemplates(!showBotTemplates)}>
                <Bot size={18} />
                <span>Bot</span>
              </button>
              
              <div className="dropdown-filter">
                <Filter size={18} />
                <select 
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                >
                  <option value="all">Todas</option>
                  <option value="unread">Não lidas</option>
                  <option value="read">Lidas</option>
                  <option value="pinned">Fixadas</option>
                </select>
              </div>
              
              <div className="dropdown-filter">
                <MessageCircle size={18} />
                <select 
                  value={filterChannel}
                  onChange={(e) => setFilterChannel(e.target.value)}
                >
                  <option value="all">Todos canais</option>
                  <option value="whatsapp">WhatsApp</option>
                  <option value="instagram">Instagram</option>
                  <option value="facebook">Facebook</option>
                  <option value="site">Site</option>
                </select>
              </div>
            </div>
          </div>

          {/* Quick Replies Panel */}
          {showQuickReplies && (
            <div className="quick-replies-panel">
              <div className="panel-header">
                <Zap size={16} />
                <span>Respostas Rápidas</span>
                <button onClick={() => setShowQuickReplies(false)}><X size={16} /></button>
              </div>
              <div className="quick-replies-list">
                {quickReplies.map(reply => (
                  <button 
                    key={reply.id}
                    className="quick-reply-item"
                    onClick={() => handleQuickReply(reply.text)}
                  >
                    {reply.text.substring(0, 50)}...
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Bot Templates Panel */}
          {showBotTemplates && (
            <div className="quick-replies-panel">
              <div className="panel-header">
                <Bot size={16} />
                <span>Templates do Bot</span>
                <button onClick={() => setShowBotTemplates(false)}><X size={16} /></button>
              </div>
              <div className="quick-replies-list">
                {botTemplates.map(template => (
                  <button 
                    key={template.id}
                    className="quick-reply-item"
                    onClick={() => handleBotTemplate(template.text)}
                  >
                    <strong>{template.name}</strong>
                    <span>{template.text.substring(0, 40)}...</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Lista de Conversas */}
          <div className="conversations-list-full-wa">
            {filteredConversations.length === 0 ? (
              <div className="no-conversations">
                <MessageSquare size={48} />
                <p>Nenhuma conversa encontrada</p>
              </div>
            ) : (
              filteredConversations.map((conv) => (
                <div 
                  key={conv.id} 
                  className={`conversation-list-item-wa ${selectedConversation === conv.id ? 'selected' : ''} ${conv.pinned ? 'pinned' : ''}`}
                  onClick={() => setSelectedConversation(conv.id)}
                >
                  <div className="conversation-avatar-wa">
                    <span className="avatar-emoji">{getChannelIcon(conv.channel)}</span>
                    {conv.online && <span className="online-indicator"></span>}
                  </div>
                  <div className="conversation-preview-wa">
                    <div className="conversation-preview-header-wa">
                      <div className="customer-info">
                        <span className="conversation-customer-name-wa">{conv.customer}</span>
                        {conv.pinned && <Pin size={12} className="pin-icon" />}
                      </div>
                      <div className="time-actions">
                        <span className="conversation-time-small-wa">{conv.time}</span>
                        <div className="conversation-actions-mini">
                          <button 
                            className="action-mini"
                            onClick={(e) => handlePinConversation(conv.id, e)}
                            title={conv.pinned ? 'Desafixar' : 'Fixar'}
                          >
                            <Pin size={14} className={conv.pinned ? 'pinned' : ''} />
                          </button>
                          <button 
                            className="action-mini"
                            onClick={(e) => handleArchiveConversation(conv.id, e)}
                            title="Arquivar"
                          >
                            <Archive size={14} />
                          </button>
                        </div>
                      </div>
                    </div>
                    <p className="conversation-preview-message-wa">{conv.lastMessage}</p>
                  </div>
                  {conv.unread > 0 && (
                    <span className="conversation-unread-badge-wa">{conv.unread}</span>
                  )}
                </div>
              ))
            )}
          </div>
        </div>

        {/* Chat Area */}
        <div className="chat-area-wa">
          {selectedConversation ? (
            <>
              {/* Chat Header */}
              <div className="chat-header-wa">
                <div className="chat-header-info-wa">
                  <div className="conversation-avatar-large-wa">
                    <span className="avatar-emoji-large">{selectedConv && getChannelIcon(selectedConv.channel)}</span>
                  </div>
                  <div>
                    <h3>{selectedConv?.customer}</h3>
                    <span className="chat-status-wa">
                      {selectedConv?.online ? '🟢 Online' : '🔴 Offline'}
                    </span>
                  </div>
                </div>
                <div className="chat-actions-wa">
                  <button className="chat-action-btn-wa" title="Chamada de voz">
                    <Phone size={20} />
                  </button>
                  <button className="chat-action-btn-wa" title="Chamada de vídeo">
                    <Video size={20} />
                  </button>
                  <button className="chat-action-btn-wa" title="Buscar na conversa">
                    <Search size={20} />
                  </button>
                  <button className="chat-action-btn-wa" title="Mais opções">
                    <MoreVertical size={20} />
                  </button>
                </div>
              </div>

              {/* Chat Messages */}
              <div className="chat-messages-wa">
                {selectedConv?.messages.map((msg) => (
                  <div 
                    key={msg.id} 
                    className={`message-wa ${msg.sender === 'user' ? 'sent' : 'received'}`}
                  >
                    <div className={`message-bubble-wa ${msg.sender}`}>
                      <p className="message-text">{msg.text}</p>
                      <div className="message-meta">
                        <span className="message-time-wa">{msg.timestamp}</span>
                        {msg.sender === 'user' && getMessageStatusIcon(msg.status)}
                      </div>
                    </div>
                  </div>
                ))}
                
                {isTyping && (
                  <div className="message-wa received">
                    <div className="message-bubble-wa received typing">
                      <div className="typing-indicator">
                        <span></span>
                        <span></span>
                        <span></span>
                      </div>
                    </div>
                  </div>
                )}
                
                <div ref={messagesEndRef} />
              </div>

              {/* Chat Input */}
              <div className="chat-input-area-wa">
                <button className="chat-input-btn-wa" title="Emoticons">
                  <Smile size={22} />
                </button>
                <button className="chat-input-btn-wa" title="Anexar arquivo">
                  <Paperclip size={22} />
                </button>
                <button className="chat-input-btn-wa" title="Câmera">
                  <Camera size={22} />
                </button>
                <button className="chat-input-btn-wa" title="Imagem">
                  <ImageIcon size={22} />
                </button>
                <input 
                  type="text" 
                  placeholder="Digite sua mensagem..." 
                  value={messageInput}
                  onChange={(e) => setMessageInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  className="chat-input-field-wa"
                />
                {messageInput.trim() ? (
                  <button 
                    className="chat-send-btn-wa"
                    onClick={handleSendMessage}
                  >
                    <Send size={22} />
                  </button>
                ) : (
                  <button className="chat-input-btn-wa" title="Gravar áudio">
                    <Mic size={22} />
                  </button>
                )}
              </div>
            </>
          ) : (
            <div className="chat-empty-state-wa">
              <div className="empty-state-icon">
                <MessageSquare size={80} />
              </div>
              <h3>DiixWhatsApp Conversas</h3>
              <p>Envie e receba mensagens dos seus clientes</p>
              <p className="empty-subtitle">Selecione uma conversa para começar</p>
              
              <div className="features-grid">
                <div className="feature-item">
                  <Bot size={32} />
                  <span>Chatbot Automático</span>
                </div>
                <div className="feature-item">
                  <Zap size={32} />
                  <span>Respostas Rápidas</span>
                </div>
                <div className="feature-item">
                  <MessageCircle size={32} />
                  <span>Múltiplos Canais</span>
                </div>
                <div className="feature-item">
                  <CheckCheck size={32} />
                  <span>Status de Leitura</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ConversationsPage;
