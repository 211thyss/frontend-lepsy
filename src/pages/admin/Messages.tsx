import { useEffect, useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { AdminLayout } from '../../components/AdminLayout';
import './Appointments.css';

interface Message {
  id: string;
  name: string;
  email: string;
  phone: string;
  message: string;
  status: string;
  createdAt: string;
  repliedAt: string | null;
}

export function Messages() {
  const { token } = useAuth();
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    fetchMessages();
  }, [token, filter]);

  const fetchMessages = async () => {
    try {
      setIsLoading(true);
      const url = filter === 'all' 
        ? 'http://localhost:5000/api/admin/messages'
        : `http://localhost:5000/api/admin/messages?status=${filter}`;

      const response = await fetch(url, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const data = await response.json();
        setMessages(data.messages);
      }
    } catch (error) {
      console.error('Fetch messages error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const markAsRead = async (id: string) => {
    try {
      await fetch(`http://localhost:5000/api/admin/messages/${id}/read`, {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      fetchMessages();
    } catch (error) {
      console.error('Mark as read error:', error);
    }
  };

  const markAsReplied = async (id: string) => {
    try {
      await fetch(`http://localhost:5000/api/admin/messages/${id}/replied`, {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      fetchMessages();
    } catch (error) {
      console.error('Mark as replied error:', error);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', { 
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusBadge = (status: string) => {
    const badges: Record<string, { label: string; class: string }> = {
      new: { label: 'Nouveau', class: 'badge-warning' },
      read: { label: 'Lu', class: 'badge-info' },
      replied: { label: 'Répondu', class: 'badge-success' },
      archived: { label: 'Archivé', class: 'badge-secondary' },
    };
    return badges[status] || { label: status, class: 'badge-secondary' };
  };

  const newMessagesCount = messages.filter(m => m.status === 'new').length;

  return (
    <AdminLayout>
      <div className="messages-page">
        <div className="page-header">
          <div>
            <h1>Messages</h1>
            <p className="page-subtitle">
              {newMessagesCount > 0 && (
                <span className="highlight-badge">{newMessagesCount} nouveau{newMessagesCount > 1 ? 'x' : ''}</span>
              )}
              {messages.length} message{messages.length > 1 ? 's' : ''} au total
            </p>
          </div>
          <div className="header-actions">
            <select 
              className="filter-select"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
            >
              <option value="all">Tous</option>
              <option value="new">Nouveaux</option>
              <option value="read">Lus</option>
              <option value="replied">Répondus</option>
              <option value="archived">Archivés</option>
            </select>
          </div>
        </div>

        <div className="page-content-list">
          {isLoading ? (
            <div className="loading">Chargement...</div>
          ) : messages.length === 0 ? (
            <div className="empty-state">
              <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <polyline points="22,6 12,13 2,6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <p>Aucun message trouvé</p>
            </div>
          ) : (
            <div className="messages-list">
              {messages.map((msg) => (
                <div key={msg.id} className={`message-card ${msg.status === 'new' ? 'message-unread' : ''}`}>
                  <div className="message-header">
                    <div className="message-sender">
                      <div className="sender-avatar">
                        {msg.name.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <h3>{msg.name}</h3>
                        <div className="sender-contact">
                          <span>{msg.email}</span>
                          {msg.phone && <span> • {msg.phone}</span>}
                        </div>
                      </div>
                    </div>
                    <div className="message-meta">
                      <span className={`badge ${getStatusBadge(msg.status).class}`}>
                        {getStatusBadge(msg.status).label}
                      </span>
                      <span className="message-date">{formatDate(msg.createdAt)}</span>
                    </div>
                  </div>
                  <div className="message-content">
                    {msg.message}
                  </div>
                  <div className="message-actions">
                    {msg.status === 'new' && (
                      <button 
                        className="btn-action btn-action-primary"
                        onClick={() => markAsRead(msg.id)}
                      >
                        Marquer comme lu
                      </button>
                    )}
                    {(msg.status === 'read' || msg.status === 'new') && (
                      <button 
                        className="btn-action btn-action-success"
                        onClick={() => markAsReplied(msg.id)}
                      >
                        Marquer comme répondu
                      </button>
                    )}
                    <a 
                      href={`mailto:${msg.email}`}
                      className="btn-action btn-action-secondary"
                    >
                      Répondre par email
                    </a>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  );
}
