import { useState } from 'react';
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
  User
} from 'lucide-react';
import { activeConversations } from '../../../data/dashboard';
import '../Dashboard.css';

interface ConversationsPageProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
}

const ConversationsPage = ({ searchTerm, setSearchTerm }: ConversationsPageProps) => {
  const [selectedConversation, setSelectedConversation] = useState<string | null>(null);
  const [messageInput, setMessageInput] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  const filteredConversations = activeConversations.filter(conv => {
    const matchesSearch = conv.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         conv.lastMessage.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || 
                         (filterStatus === 'unread' && conv.unread > 0) ||
                         (filterStatus === 'read' && conv.unread === 0);
    return matchesSearch && matchesFilter;
  });

  const selectedConv = activeConversations.find(c => c.id === selectedConversation);

  const handleSendMessage = () => {
    if (messageInput.trim()) {
      console.log('Sending message:', messageInput);
      setMessageInput('');
    }
  };

  return (
    <div className="dashboard-content">
      <div className="content-header">
        <h2>Conversas</h2>
        <p>Gerencie todas as conversas com seus clientes</p>
      </div>

      <div className="conversations-container">
        {/* Conversations List */}
        <div className="conversations-list-panel">
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
                onClick={() => setSelectedConversation(conv.id)}
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
                  <div className="conversation-avatar-large">
                    <User size={32} />
                  </div>
                  <div>
                    <h3>{selectedConv?.customer}</h3>
                    <span className="chat-status">Online agora</span>
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
                <div className="message received">
                  <div className="message-bubble">
                    <p>Olá! Gostaria de ver os produtos disponíveis.</p>
                    <span className="message-time">10:32</span>
                  </div>
                </div>

                <div className="message sent">
                  <div className="message-bubble">
                    <p>Olá! 👋 Seja bem-vindo à nossa loja.</p>
                    <span className="message-time">10:32</span>
                    <CheckCheck size={14} className="message-check" />
                  </div>
                </div>

                <div className="message sent">
                  <div className="message-bubble">
                    <p>Escolha uma opção:<br/>1. Ver produtos<br/>2. Fazer pedido<br/>3. Acompanhar pedido<br/>4. Falar com atendente</p>
                    <span className="message-time">10:32</span>
                    <CheckCheck size={14} className="message-check" />
                  </div>
                </div>

                <div className="message received">
                  <div className="message-bubble">
                    <p>Quero ver os produtos da categoria de eletrônicos.</p>
                    <span className="message-time">10:35</span>
                  </div>
                </div>
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
