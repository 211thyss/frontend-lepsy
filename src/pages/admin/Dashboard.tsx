import { useEffect, useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { AdminLayout } from '../../components/AdminLayout';
import './Dashboard.css';

interface Stats {
  todayAppointments: number;
  upcomingAppointments: number;
  newMessages: number;
  totalPatients: number;
}

interface Appointment {
  id: string;
  appointmentDate: string;
  duration: number;
  type: string;
  format: string;
  status: string;
  patient: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
  };
}

export function Dashboard() {
  const { provider, token } = useAuth();
  const [stats, setStats] = useState<Stats>({
    todayAppointments: 0,
    upcomingAppointments: 0,
    newMessages: 0,
    totalPatients: 0,
  });
  const [todayAppointments, setTodayAppointments] = useState<Appointment[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setIsLoading(true);
        setError(null);

        // Fetch stats
        const statsResponse = await fetch(`${API_URL}/api/dashboard/stats', {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        if (!statsResponse.ok) {
          throw new Error('Erreur lors du chargement des statistiques');
        }

        const statsData = await statsResponse.json();
        setStats(statsData);

        // Fetch today's appointments
        const appointmentsResponse = await fetch(`${API_URL}/api/dashboard/today', {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        if (!appointmentsResponse.ok) {
          throw new Error('Erreur lors du chargement des rendez-vous');
        }

        const appointmentsData = await appointmentsResponse.json();
        setTodayAppointments(appointmentsData.appointments);

      } catch (err) {
        console.error('Dashboard data fetch error:', err);
        setError(err instanceof Error ? err.message : 'Erreur de chargement');
      } finally {
        setIsLoading(false);
      }
    };

    if (token) {
      fetchDashboardData();
    }
  }, [token]);

  if (isLoading) {
    return (
      <div className="dashboard-loading">
        <div className="dashboard-spinner"></div>
        <p>Chargement...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="dashboard-loading">
        <p style={{ color: '#d32f2f' }}>❌ {error}</p>
      </div>
    );
  }

  const formatAppointmentType = (type: string) => {
    const types: Record<string, string> = {
      first_time: 'Première consultation',
      follow_up: 'Suivi',
      assessment: 'Bilan',
      individual: 'Individuel',
      couple: 'Couple',
      neuropsychological: 'Bilan neuropsychologique',
    };
    return types[type] || type;
  };

  const formatAppointmentFormat = (format: string) => {
    return format === 'in_person' ? 'Présentiel' : 'Visioconférence';
  };

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });
  };

  const getStatusLabel = (status: string) => {
    const statuses: Record<string, string> = {
      scheduled: 'Confirmé',
      confirmed: 'Confirmé',
      pending: 'En attente',
      completed: 'Terminé',
      cancelled: 'Annulé',
      no_show: 'Absent',
    };
    return statuses[status] || status;
  };

  const getStatusClass = (status: string) => {
    if (status === 'confirmed' || status === 'scheduled') return 'dashboard-appointment-status--confirmed';
    if (status === 'pending') return 'dashboard-appointment-status--pending';
    return 'dashboard-appointment-status--confirmed';
  };

  const navigateTo = (path: string) => {
    window.history.pushState({}, '', path);
    window.dispatchEvent(new PopStateEvent('popstate'));
  };

  return (
    <AdminLayout>
      <div className="dashboard">
        <div className="dashboard-container">
        {/* Header */}
        <div className="dashboard-header">
          <div>
            <h1 className="dashboard-title">
              Bonjour, {provider?.firstName} 👋
            </h1>
            <p className="dashboard-subtitle">
              Voici un aperçu de votre activité aujourd'hui
            </p>
          </div>
          <div className="dashboard-header-actions">
            <button 
              className="dashboard-btn dashboard-btn--secondary"
              onClick={() => navigateTo('/admin/availability')}
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M10 5V10L13 13M19 10C19 14.9706 14.9706 19 10 19C5.02944 19 1 14.9706 1 10C1 5.02944 5.02944 1 10 1C14.9706 1 19 5.02944 19 10Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Disponibilités
            </button>
            <button 
              className="dashboard-btn dashboard-btn--primary"
              onClick={() => navigateTo('/admin/appointments')}
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M10 5V15M5 10H15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Nouveau RDV
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="dashboard-stats">
          <button 
            className="dashboard-stat-card dashboard-stat-card--primary"
            onClick={() => navigateTo('/admin/appointments')}
          >
            <div className="dashboard-stat-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M8 7V3M16 7V3M7 11H17M5 21H19C20.1046 21 21 20.1046 21 19V7C21 5.89543 20.1046 5 19 5H5C3.89543 5 3 5.89543 3 7V19C3 20.1046 3.89543 21 5 21Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <div className="dashboard-stat-content">
              <p className="dashboard-stat-label">Aujourd'hui</p>
              <p className="dashboard-stat-value">{stats.todayAppointments}</p>
              <p className="dashboard-stat-desc">Rendez-vous</p>
            </div>
          </button>

          <button 
            className="dashboard-stat-card dashboard-stat-card--success"
            onClick={() => navigateTo('/admin/appointments')}
          >
            <div className="dashboard-stat-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M9 5H7C5.89543 5 5 5.89543 5 7V19C5 20.1046 5.89543 21 7 21H17C18.1046 21 19 20.1046 19 19V7C19 5.89543 18.1046 5 17 5H15M9 5C9 6.10457 9.89543 7 11 7H13C14.1046 7 15 6.10457 15 5M9 5C9 3.89543 9.89543 3 11 3H13C14.1046 3 15 3.89543 15 5M12 12H15M12 16H15M9 12H9.01M9 16H9.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <div className="dashboard-stat-content">
              <p className="dashboard-stat-label">À venir</p>
              <p className="dashboard-stat-value">{stats.upcomingAppointments}</p>
              <p className="dashboard-stat-desc">Rendez-vous</p>
            </div>
          </button>

          <button 
            className="dashboard-stat-card dashboard-stat-card--warning"
            onClick={() => navigateTo('/admin/messages')}
          >
            <div className="dashboard-stat-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M3 8L10.89 13.26C11.2187 13.4793 11.6049 13.5963 12 13.5963C12.3951 13.5963 12.7813 13.4793 13.11 13.26L21 8M5 19H19C20.1046 19 21 18.1046 21 17V7C21 5.89543 20.1046 5 19 5H5C3.89543 5 3 5.89543 3 7V17C3 18.1046 3.89543 19 5 19Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <div className="dashboard-stat-content">
              <p className="dashboard-stat-label">Nouveaux</p>
              <p className="dashboard-stat-value">{stats.newMessages}</p>
              <p className="dashboard-stat-desc">Messages</p>
            </div>
          </button>

          <button 
            className="dashboard-stat-card dashboard-stat-card--info"
            onClick={() => navigateTo('/admin/patients')}
          >
            <div className="dashboard-stat-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M17 20H22V18C22 16.3431 20.6569 15 19 15C18.0444 15 17.1931 15.4468 16.6438 16.1429M17 20H7M17 20V18C17 17.3438 16.8736 16.717 16.6438 16.1429M7 20H2V18C2 16.3431 3.34315 15 5 15C5.95561 15 6.80686 15.4468 7.35625 16.1429M7 20V18C7 17.3438 7.12642 16.717 7.35625 16.1429M7.35625 16.1429C8.0935 14.301 9.89482 13 12 13C14.1052 13 15.9065 14.301 16.6438 16.1429M15 7C15 8.65685 13.6569 10 12 10C10.3431 10 9 8.65685 9 7C9 5.34315 10.3431 4 12 4C13.6569 4 15 5.34315 15 7ZM21 10C21 11.1046 20.1046 12 19 12C17.8954 12 17 11.1046 17 10C17 8.89543 17.8954 8 19 8C20.1046 8 21 8.89543 21 10ZM7 10C7 11.1046 6.10457 12 5 12C3.89543 12 3 11.1046 3 10C3 8.89543 3.89543 8 5 8C6.10457 8 7 8.89543 7 10Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <div className="dashboard-stat-content">
              <p className="dashboard-stat-label">Total</p>
              <p className="dashboard-stat-value">{stats.totalPatients}</p>
              <p className="dashboard-stat-desc">Patients</p>
            </div>
          </button>
        </div>

        {/* Quick Actions */}
        <div className="dashboard-section">
          <h2 className="dashboard-section-title">Actions rapides</h2>
          <div className="dashboard-quick-actions">
            <button 
              className="dashboard-action-card"
              onClick={() => navigateTo('/admin/appointments')}
            >
              <div className="dashboard-action-icon dashboard-action-icon--primary">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M8 7V3M16 7V3M7 11H17M5 21H19C20.1046 21 21 20.1046 21 19V7C21 5.89543 20.1046 5 19 5H5C3.89543 5 3 5.89543 3 7V19C3 20.1046 3.89543 21 5 21Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <div className="dashboard-action-content">
                <h3 className="dashboard-action-title">Gérer les rendez-vous</h3>
                <p className="dashboard-action-desc">Voir et modifier vos RDV</p>
              </div>
            </button>

            <button 
              className="dashboard-action-card"
              onClick={() => navigateTo('/admin/messages')}
            >
              <div className="dashboard-action-icon dashboard-action-icon--success">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M3 8L10.89 13.26C11.2187 13.4793 11.6049 13.5963 12 13.5963C12.3951 13.5963 12.7813 13.4793 13.11 13.26L21 8M5 19H19C20.1046 19 21 18.1046 21 17V7C21 5.89543 20.1046 5 19 5H5C3.89543 5 3 5.89543 3 7V17C3 18.1046 3.89543 19 5 19Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <div className="dashboard-action-content">
                <h3 className="dashboard-action-title">Messages</h3>
                <p className="dashboard-action-desc">Répondre aux messages</p>
              </div>
            </button>

            <button 
              className="dashboard-action-card"
              onClick={() => navigateTo('/admin/availability')}
            >
              <div className="dashboard-action-icon dashboard-action-icon--warning">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M10 5V10L13 13M19 10C19 14.9706 14.9706 19 10 19C5.02944 19 1 14.9706 1 10C1 5.02944 5.02944 1 10 1C14.9706 1 19 5.02944 19 10Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <div className="dashboard-action-content">
                <h3 className="dashboard-action-title">Disponibilités</h3>
                <p className="dashboard-action-desc">Gérer vos horaires</p>
              </div>
            </button>

            <button 
              className="dashboard-action-card"
              onClick={() => navigateTo('/admin/profile')}
            >
              <div className="dashboard-action-icon dashboard-action-icon--info">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M16 7C16 9.20914 14.2091 11 12 11C9.79086 11 8 9.20914 8 7C8 4.79086 9.79086 3 12 3C14.2091 3 16 4.79086 16 7Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M12 14C8.13401 14 5 17.134 5 21H19C19 17.134 15.866 14 12 14Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <div className="dashboard-action-content">
                <h3 className="dashboard-action-title">Mon profil</h3>
                <p className="dashboard-action-desc">Modifier mes informations</p>
              </div>
            </button>
          </div>
        </div>

        {/* Today's Appointments */}
        <div className="dashboard-section">
          <div className="dashboard-section-header">
            <h2 className="dashboard-section-title">Rendez-vous d'aujourd'hui</h2>
            <button 
              className="dashboard-link-btn"
              onClick={() => navigateTo('/admin/appointments')}
            >
              Voir tout →
            </button>
          </div>
          
          {todayAppointments.length > 0 ? (
            <div className="dashboard-appointments">
              {todayAppointments.map((appointment) => (
                <div key={appointment.id} className="dashboard-appointment-card">
                  <div className="dashboard-appointment-time">
                    <span className="dashboard-appointment-hour">
                      {formatTime(appointment.appointmentDate)}
                    </span>
                    <span className="dashboard-appointment-duration">
                      {appointment.duration} min
                    </span>
                  </div>
                  <div className="dashboard-appointment-content">
                    <h3 className="dashboard-appointment-patient">
                      {appointment.patient.firstName} {appointment.patient.lastName}
                    </h3>
                    <p className="dashboard-appointment-type">
                      {formatAppointmentType(appointment.type)} • {formatAppointmentFormat(appointment.format)}
                    </p>
                  </div>
                  <div className={`dashboard-appointment-status ${getStatusClass(appointment.status)}`}>
                    {getStatusLabel(appointment.status)}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="dashboard-empty">
              <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
                <path d="M16 14V6M32 14V6M14 22H34M10 42H38C40.2091 42 42 40.2091 42 38V14C42 11.7909 40.2091 10 38 10H10C7.79086 10 6 11.7909 6 14V38C6 40.2091 7.79086 42 10 42Z" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <p>Aucun rendez-vous aujourd'hui</p>
            </div>
          )}
        </div>
      </div>
      </div>
    </AdminLayout>
  );
}
