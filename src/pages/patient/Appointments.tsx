import { useEffect, useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { PatientLayout } from '../../components/PatientLayout';
import { API_URL } from '../../config/api';
import { Calendar, Clock, User, CheckCircle, XmarkCircle, WarningCircle } from 'iconoir-react';
import './Appointments.css';

interface Appointment {
  id: string;
  appointmentDate: string;
  duration: number;
  type: string;
  status: string;
  notes?: string;
  provider: {
    firstName: string;
    lastName: string;
    title?: string;
  };
}

export function PatientAppointments() {
  const { token } = useAuth();
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'upcoming' | 'past'>('upcoming');

  useEffect(() => {
    fetchAppointments();
  }, [token, filter]);

  const fetchAppointments = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(`${API_URL}/api/patient/appointments`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const data = await response.json();
        let filtered = data.appointments || [];
        
        const now = new Date();
        if (filter === 'upcoming') {
          filtered = filtered.filter((apt: Appointment) => new Date(apt.appointmentDate) >= now);
        } else if (filter === 'past') {
          filtered = filtered.filter((apt: Appointment) => new Date(apt.appointmentDate) < now);
        }
        
        setAppointments(filtered);
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
    });
  };

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString('fr-FR', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusInfo = (status: string) => {
    const statusMap: Record<string, { label: string; class: string; icon: JSX.Element }> = {
      pending: { 
        label: 'En attente', 
        class: 'status-warning',
        icon: <WarningCircle width={20} height={20} />
      },
      confirmed: { 
        label: 'Confirmé', 
        class: 'status-success',
        icon: <CheckCircle width={20} height={20} />
      },
      completed: { 
        label: 'Terminé', 
        class: 'status-secondary',
        icon: <CheckCircle width={20} height={20} />
      },
      cancelled: { 
        label: 'Annulé', 
        class: 'status-danger',
        icon: <XmarkCircle width={20} height={20} />
      },
    };
    return statusMap[status] || { label: status, class: 'status-secondary', icon: <WarningCircle width={20} height={20} /> };
  };

  return (
    <PatientLayout>
      <div className="patient-appointments">
        <div className="appointments-header">
          <h1>Mes rendez-vous</h1>
          <p className="appointments-subtitle">
            Consultez et gérez vos rendez-vous
          </p>
        </div>

        <div className="appointments-filters">
          <button
            className={`filter-btn ${filter === 'upcoming' ? 'active' : ''}`}
            onClick={() => setFilter('upcoming')}
          >
            À venir
          </button>
          <button
            className={`filter-btn ${filter === 'past' ? 'active' : ''}`}
            onClick={() => setFilter('past')}
          >
            Passés
          </button>
          <button
            className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
            onClick={() => setFilter('all')}
          >
            Tous
          </button>
        </div>

        {isLoading ? (
          <div className="loading-state">
            <p>Chargement...</p>
          </div>
        ) : appointments.length === 0 ? (
          <div className="empty-state">
            <Calendar width={64} height={64} strokeWidth={1.5} />
            <h3>Aucun rendez-vous</h3>
            <p>
              {filter === 'upcoming' 
                ? "Vous n'avez pas de rendez-vous à venir"
                : filter === 'past'
                ? "Vous n'avez pas de rendez-vous passés"
                : "Vous n'avez pas encore de rendez-vous"}
            </p>
            <a href="/booking" className="btn-primary">
              Prendre rendez-vous
            </a>
          </div>
        ) : (
          <div className="appointments-list">
            {appointments.map((apt) => {
              const statusInfo = getStatusInfo(apt.status);
              return (
                <div key={apt.id} className="appointment-card">
                  <div className="appointment-card-header">
                    <div className="appointment-date-time">
                      <div className="date-info">
                        <Calendar width={20} height={20} />
                        <span>{formatDate(apt.appointmentDate)}</span>
                      </div>
                      <div className="time-info">
                        <Clock width={20} height={20} />
                        <span>{formatTime(apt.appointmentDate)} ({apt.duration} min)</span>
                      </div>
                    </div>
                    <div className={`appointment-status ${statusInfo.class}`}>
                      {statusInfo.icon}
                      <span>{statusInfo.label}</span>
                    </div>
                  </div>

                  <div className="appointment-card-body">
                    <div className="provider-info">
                      <User width={20} height={20} />
                      <div>
                        <div className="provider-name">
                          {apt.provider.title || 'Dr.'} {apt.provider.firstName} {apt.provider.lastName}
                        </div>
                        <div className="appointment-type">{apt.type}</div>
                      </div>
                    </div>

                    {apt.notes && (
                      <div className="appointment-notes">
                        <strong>Notes :</strong>
                        <p>{apt.notes}</p>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </PatientLayout>
  );
}
