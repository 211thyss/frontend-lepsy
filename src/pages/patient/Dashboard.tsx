import { useEffect, useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { PatientLayout } from '../../components/PatientLayout';
import { API_URL } from '../../config/api';
import { Calendar, FileText, Settings, ChatBubble } from 'iconoir-react';
import './Dashboard.css';

interface Appointment {
  id: string;
  appointmentDate: string;
  duration: number;
  type: string;
  status: string;
  provider: {
    firstName: string;
    lastName: string;
  };
}

export function PatientDashboard() {
  const { provider: user, token } = useAuth();
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchUpcomingAppointments();
  }, [token]);

  const fetchUpcomingAppointments = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(`${API_URL}/api/patient/appointments?limit=3`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const data = await response.json();
        setAppointments(data.appointments || []);
      }
    } catch (error) {
      console.error('Fetch appointments error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusBadge = (status: string) => {
    const badges: Record<string, { label: string; class: string }> = {
      pending: { label: 'En attente', class: 'badge-warning' },
      confirmed: { label: 'Confirmé', class: 'badge-success' },
      completed: { label: 'Terminé', class: 'badge-secondary' },
      cancelled: { label: 'Annulé', class: 'badge-danger' },
    };
    return badges[status] || { label: status, class: 'badge-secondary' };
  };

  return (
    <PatientLayout>
      <div className="patient-dashboard">
        <div className="dashboard-header">
          <h1>Bonjour {user?.firstName}</h1>
          <p className="dashboard-subtitle">
            {user?.isVerified 
              ? 'Bienvenue dans votre espace personnel' 
              : 'Votre compte est en attente de vérification'}
          </p>
        </div>

        {!user?.isVerified && (
          <div className="verification-banner">
            <div className="banner-content">
              <h3>Compte en attente de vérification</h3>
              <p>Votre compte sera vérifié après votre premier rendez-vous. Vous aurez alors accès à toutes les fonctionnalités.</p>
            </div>
          </div>
        )}

        <div className="dashboard-grid">
          <div className="dashboard-card">
            <div className="card-header">
              <h2>Prochains rendez-vous</h2>
              <a href="/patient/appointments" className="card-link">Voir tout</a>
            </div>
            
            {isLoading ? (
              <div className="loading">Chargement...</div>
            ) : appointments.length === 0 ? (
              <div className="empty-state">
                <p>Aucun rendez-vous à venir</p>
                <a href="/booking" className="btn-primary">Prendre rendez-vous</a>
              </div>
            ) : (
              <div className="appointments-list">
                {appointments.map((apt) => (
                  <div key={apt.id} className="appointment-item">
                    <div className="appointment-date">
                      {formatDate(apt.appointmentDate)}
                    </div>
                    <div className="appointment-details">
                      <span className="appointment-provider">
                        Dr. {apt.provider.firstName} {apt.provider.lastName}
                      </span>
                      <span className={`badge ${getStatusBadge(apt.status).class}`}>
                        {getStatusBadge(apt.status).label}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="dashboard-card">
            <div className="card-header">
              <h2>Actions rapides</h2>
            </div>
            <div className="quick-actions">
              <a href="/booking" className="action-button">
                <Calendar width={24} height={24} strokeWidth={2} />
                <span className="action-text">Prendre rendez-vous</span>
              </a>
              <a href="/patient/appointments" className="action-button">
                <FileText width={24} height={24} strokeWidth={2} />
                <span className="action-text">Mes rendez-vous</span>
              </a>
              <a href="/patient/profile" className="action-button">
                <Settings width={24} height={24} strokeWidth={2} />
                <span className="action-text">Paramètres</span>
              </a>
              <a href="/contact" className="action-button">
                <ChatBubble width={24} height={24} strokeWidth={2} />
                <span className="action-text">Nous contacter</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </PatientLayout>
  );
}
