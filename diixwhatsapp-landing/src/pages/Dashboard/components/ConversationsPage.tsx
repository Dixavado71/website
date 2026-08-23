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
  User,
  ArrowLeft
} from 'lucide-react';
import '../Dashboard.css';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'customer';
  timestamp: string;
  status?: 'sent' | 'delivered' | 'read';
}

interface Conversation {
  id: string;
  customer: string;
  lastMessage: string;
  time: string;
  unread: number;
  messages: Message[];
  online: boolean;
}

const mockConversations: Conversation[] = [
  {
    id: '1',
    customer: 'Carlos Mendes',
    lastMessage: 'Gostaria de ver os produtos disponíveis',
    time: '2min atrás',
    unread: 2,
    online: true,
    messages: [
      { id: '1', text: 'Olá! Gostaria de ver os produtos disponíveis.', sender: 'customer', timestamp: '10:32' },
      { id: '2', text: 'Olá! 👋 Seja bem-vindo à nossa loja.', sender: 'user', timestamp: '10:32', status: 'read' },
      { id: '3', text: 'Escolha uma opção:\n1. Ver produtos\n2. Fazer pedido\n3. Acompanhar pedido\n4. Falar com atendente', sender: 'user', timestamp: '10:32', status: 'read' },
      { id: '4', text: 'Quero ver os produtos da categoria de eletrônicos.', sender: 'customer', timestamp: '10:35' },
    ]
  },
  {
    id: '2',
    customer: 'Fernanda Lima',
    lastMessage: 'Qual o prazo de entrega?',
    time: '5min atrás',
    unread: 1,
    online: true,
    messages: [
      { id: '1', text: 'Oi, qual o prazo de entrega para São Paulo?', sender: 'customer', timestamp: '11:15' },
    ]
  },
  {
    id: '3',
    customer: 'Roberto Alves',
    lastMessage: 'Preciso de ajuda com meu pedido',
    time: '12min atrás',
    unread: 0,
    online: false,
    messages: [
      { id: '1', text: 'Preciso de ajuda com meu pedido #ORD-123', sender: 'customer', timestamp: '09:45' },
      { id: '2', text: 'Claro! Vou verificar seu pedido agora mesmo.', sender: 'user', timestamp: '09:46', status: 'delivered' },
    ]
  },
  {
    id: '4',
    customer: 'Patrícia Souza',
    lastMessage: 'Tem desconto para atacado?',
    time: '18min atrás',
    unread: 1,
    online: true,
    messages: [
      { id: '1', text: 'Vocês têm desconto para compras no atacado?', sender: 'customer', timestamp: '14:20' },
    ]
  },
  {
    id: '5',
    customer: 'Marcos Henrique',
    lastMessage: 'Quero cancelar meu pedido',
    time: '25min atrás',
    unread: 3,
    online: false,
    messages: [
      { id: '1', text: 'Quero cancelar meu pedido', sender: 'customer', timestamp: '13:50' },
      { id: '2', text: 'Pode me informar o número do pedido?', sender: 'customer', timestamp: '13:51' },
      { id: '3', text: 'É urgente!', sender: 'customer', timestamp: '13:52' },
    ]
  },
];

interface ConversationsPageProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
}

const ConversationsPage = ({ searchTerm, setSearchTerm }: ConversationsPageProps) => {
  const [selectedConversation, setSelectedConversation] = useState<string | null>(null);
  const [messageInput, setMessageInput] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [conversations, setConversations] = useState<Conversation[]>(mockConversations);
  const [showMobileList, setShowMobileList] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const filteredConversations = conversations.filter(conv => {
    const matchesSearch = conv.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         conv.lastMessage.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || 
                         (filterStatus === 'unread' && conv.unread > 0) ||
                         (filterStatus === 'read' && conv.unread === 0);
    return matchesSearch && matchesFilter;
  });

  const selectedConv = conversations.find(c => c.id === selectedConversation);

  const handleSendMessage = () => {
    if (messageInput.trim() && selectedConversation) {
      const newMessage: Message = {
        id: Date.now().toString(),
        text: messageInput,
        sender: 'user',
        timestamp: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
        status: 'sent'
      };

      setConversations(prev => prev.map(conv => {
        if (conv.id === selectedConversation) {
          return {
            ...conv,
            messages: [...conv.messages, newMessage],
            lastMessage: messageInput,
            time: 'Agora'
          };
        }
        return conv;
      }));

      setMessageInput('');
      
      // Simula resposta automática após 2 segundos
      setTimeout(() => {
        const autoReply: Message = {
          id: (Date.now() + 1).toString(),
          text: 'Obrigado pelo contato! Em breve um de nossos atendentes irá responder. 🤖',
          sender: 'customer',
          timestamp: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })
        };

        setConversations(prev => prev.map(conv => {
          if (conv.id === selectedConversation) {
            return {
              ...conv,
              messages: [...conv.messages, autoReply],
              lastMessage: autoReply.text,
              time: 'Agora'
            };
          }
          return conv;
        }));
      }, 2000);
    }
  };

  const handleSelectConversation = (id: string) => {
    setSelectedConversation(id);
    setShowMobileList(false);
    
    // Mark as read
    setConversations(prev => prev.map(conv => {
      if (conv.id === id) {
        return { ...conv, unread: 0 };
      }
      return conv;
    }));
  };

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [selectedConv?.messages]);

  return (
    <div className="dashboard-content">
      <div className="content-header">
        <h2>Conversas</h2>
        <p>Gerencie todas as conversas com seus clientes - Estilo WhatsApp</p>
      </div>

      <div className="conversations-container">
        {/* Conversations List */}
        <div className={`conversations-list-panel ${showMobileList ? 'mobile-visible' : ''}`}>
          <div className="conversations-header">
            <div className="search-box">
              <Search size={18} />
              <input 
                type="text" 
                placeholder="Buscar conversas..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <button className="filter-btn">
              <Filter size={18} />
              <select 
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
              >
                <option value="all">Todas</option>
                <option value="unread">Não lidas</option>
                <option value="read">Lidas</option>
              </select>
            </button>
          </div>

          <div className="conversations-list-full">
            {filteredConversations.map((conv) => (
              <div 
                key={conv.id} 
                className={`conversation-list-item ${selectedConversation === conv.id ? 'selected' : ''}`}
                onClick={() => handleSelectConversation(conv.id)}
              >
                <div className="conversation-avatar">
                  <User size={24} />
                </div>
                <div className="conversation-preview">
                  <div className="conversation-preview-header">
                    <span className="conversation-customer-name">{conv.customer}</span>
                    <span className="conversation-time-small">{conv.time}</span>
                  </div>
                  <p className="conversation-preview-message">{conv.lastMessage}</p>
                </div>
                {conv.unread > 0 && (
                  <span className="conversation-unread-badge">{conv.unread}</span>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Chat Area */}
        <div className="chat-area">
          {selectedConversation ? (
            <>
              <div className="chat-header">
                <div className="chat-header-info">
                  <button 
                    className="chat-action-btn mobile-only"
                    onClick={() => setShowMobileList(true)}
                    style={{ display: 'none' }}
                  >
                    <ArrowLeft size={20} />
                  </button>
                  <div className="conversation-avatar-large">
                    <User size={32} />
                  </div>
                  <div>
                    <h3>{selectedConv?.customer}</h3>
                    <span className="chat-status">
                      {selectedConv?.online ? 'Online agora' : 'Visto por último hoje'}
                    </span>
                  </div>
                </div>
                <div className="chat-actions">
                  <button className="chat-action-btn" title="Chamada de voz">
                    <Phone size={20} />
                  </button>
                  <button className="chat-action-btn" title="Chamada de vídeo">
                    <Video size={20} />
                  </button>
                  <button className="chat-action-btn" title="Mais opções">
                    <MoreVertical size={20} />
                  </button>
                </div>
              </div>

              <div className="chat-messages">
                {selectedConv?.messages.map((msg) => (
                  <div 
                    key={msg.id} 
                    className={`message ${msg.sender === 'user' ? 'sent' : 'received'}`}
                  >
                    <div className="message-bubble">
                      <p>{msg.text}</p>
                      <span className="message-time">
                        {msg.timestamp}
                        {msg.sender === 'user' && msg.status && (
                          <CheckCheck size={14} className={`message-check ${msg.status === 'read' ? 'text-blue-400' : ''}`} />
                        )}
                      </span>
                    </div>
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>

              <div className="chat-input-area">
                <button className="chat-input-btn" title="Anexar arquivo">
                  <Paperclip size={20} />
                </button>
                <input 
                  type="text" 
                  placeholder="Digite sua mensagem..." 
                  value={messageInput}
                  onChange={(e) => setMessageInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                />
                <button className="chat-input-btn" title="Emoticons">
                  <Smile size={20} />
                </button>
                <button 
                  className="chat-send-btn"
                  onClick={handleSendMessage}
                >
                  <Send size={20} />
                </button>
              </div>
            </>
          ) : (
            <div className="chat-empty-state">
              <MessageSquare size={64} className="icon-gray" />
              <h3>Selecione uma conversa</h3>
              <p>Escolha uma conversa da lista para começar a conversar</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ConversationsPage;
