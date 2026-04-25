import { useEffect, useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { PatientLayout } from '../../components/PatientLayout';
import { API_URL } from '../../config/api';
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
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                  <line x1="16" y1="2" x2="16" y2="6"/>
                  <line x1="8" y1="2" x2="8" y2="6"/>
                  <line x1="3" y1="10" x2="21" y2="10"/>
                </svg>
                <span className="action-text">Prendre rendez-vous</span>
              </a>
              <a href="/patient/appointments" className="action-button">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                  <polyline points="14 2 14 8 20 8"/>
                  <line x1="16" y1="13" x2="8" y2="13"/>
                  <line x1="16" y1="17" x2="8" y2="17"/>
                  <polyline points="10 9 9 9 8 9"/>
                </svg>
                <span className="action-text">Mes rendez-vous</span>
              </a>
              <a href="/patient/profile" className="action-button">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="3"/>
                  <path d="M12 1v6m0 6v6m-6-6h6m6 0h-6"/>
                  <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/>
                </svg>
                <span className="action-text">Paramètres</span>
              </a>
              <a href="/contact" className="action-button">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
                </svg>
                <span className="action-text">Nous contacter</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </PatientLayout>
  );
}
