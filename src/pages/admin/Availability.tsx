import { AdminLayout } from '../../components/AdminLayout';
import './Appointments.css';

export function Availability() {
  return (
    <AdminLayout>
      <div className="availability-page">
        <div className="page-header">
          <h1>Disponibilités</h1>
        </div>
        <div className="page-content">
          <p>Gestion des horaires et disponibilités...</p>
        </div>
      </div>
    </AdminLayout>
  );
}
