import { useEffect, useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { AdminLayout } from '../../components/AdminLayout';
import './Appointments.css';

interface Appointment {
  id: string;
  appointmentDate: string;
  duration: number;
  type: string;
  reason: string;
  format: string;
  status: string;
  notes: string;
  patient: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
  };
}

export function Appointments() {
  const { token } = useAuth();
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    fetchAppointments();
  }, [token, filter]);

  const fetchAppointments = async () => {
    try {
      setIsLoading(true);
      const url = filter === 'all' 
        ? `${API_URL}/api/admin/appointments'
        : `http://localhost:5000/api/admin/appointments?status=${filter}`;

      const response = await fetch(url, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const data = await response.json();
        setAppointments(data.appointments);
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
      scheduled: { label: 'Planifié', class: 'badge-info' },
      completed: { label: 'Terminé', class: 'badge-secondary' },
      cancelled: { label: 'Annulé', class: 'badge-danger' },
      no_show: { label: 'Absent', class: 'badge-dark' },
    };
    return badges[status] || { label: status, class: 'badge-secondary' };
  };

  return (
    <AdminLayout>
      <div className="appointments-page">
        <div className="page-header">
          <h1>Rendez-vous</h1>
          <div className="header-actions">
            <select 
              className="filter-select"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
            >
              <option value="all">Tous</option>
              <option value="pending">En attente</option>
              <option value="confirmed">Confirmés</option>
              <option value="completed">Terminés</option>
              <option value="cancelled">Annulés</option>
            </select>
          </div>
        </div>

        <div className="page-content">
          {isLoading ? (
            <div className="loading">Chargement...</div>
          ) : appointments.length === 0 ? (
            <div className="empty-state">
              <p>Aucun rendez-vous trouvé</p>
            </div>
          ) : (
            <div className="appointments-list">
              {appointments.map((apt) => (
                <div key={apt.id} className="appointment-item">
                  <div className="appointment-header">
                    <div className="appointment-patient">
                      <h3>{apt.patient.firstName} {apt.patient.lastName}</h3>
                      <p>{apt.patient.email} • {apt.patient.phone}</p>
                    </div>
                    <span className={`badge ${getStatusBadge(apt.status).class}`}>
                      {getStatusBadge(apt.status).label}
                    </span>
                  </div>
                  <div className="appointment-details">
                    <div className="detail-item">
                      <strong>Date:</strong> {formatDate(apt.appointmentDate)}
                    </div>
                    <div className="detail-item">
                      <strong>Durée:</strong> {apt.duration} min
                    </div>
                    <div className="detail-item">
                      <strong>Format:</strong> {apt.format === 'in_person' ? 'Présentiel' : 'Visioconférence'}
                    </div>
                    <div className="detail-item">
                      <strong>Motif:</strong> {apt.reason}
                    </div>
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
