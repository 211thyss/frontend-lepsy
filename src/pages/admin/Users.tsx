import { useState, useEffect } from 'react';
import { AdminLayout } from '../../components/AdminLayout';
import { useAuth } from '../../contexts/AuthContext';
import './Users.css';

interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  role: 'patient' | 'admin' | 'super_admin';
  isActive: boolean;
  lastLogin: string | null;
  createdAt: string;
}

interface AuditLog {
  id: number;
  userId: number;
  action: string;
  performedBy: number;
  performedByName: string;
  ipAddress: string;
  createdAt: string;
}

export function Users() {
  const { provider } = useAuth();
  const [users, setUsers] = useState<User[]>([]);
  const [auditLogs, setAuditLogs] = useState<AuditLog[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState<string>('all');
  const [showAuditLogs, setShowAuditLogs] = useState(false);

  const isSuperAdmin = provider?.role === 'super_admin';

  useEffect(() => {
    fetchUsers();
    if (isSuperAdmin) {
      fetchAuditLogs();
    }
  }, [roleFilter]);

  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem('token');
      const params = new URLSearchParams();
      if (roleFilter !== 'all') params.append('role', roleFilter);
      if (searchTerm) params.append('search', searchTerm);

      const response = await fetch(`http://localhost:5000/api/admin/users?${params}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) throw new Error('Erreur lors du chargement des utilisateurs');

      const data = await response.json();
      setUsers(data.users);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
    } finally {
      setIsLoading(false);
    }
  };

  const fetchAuditLogs = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:5000/api/admin/users/audit-logs?limit=50', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) throw new Error('Erreur lors du chargement des logs');

      const data = await response.json();
      setAuditLogs(data.logs);
    } catch (err) {
      console.error('Erreur audit logs:', err);
    }
  };

  const handleRoleChange = async (userId: number, newRole: string) => {
    if (!isSuperAdmin) {
      alert('Seuls les super administrateurs peuvent changer les rôles');
      return;
    }

    if (!confirm(`Êtes-vous sûr de vouloir changer le rôle de cet utilisateur en "${newRole}" ?`)) {
      return;
    }

    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:5000/api/admin/users/${userId}/role`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ role: newRole }),
      });

      if (!response.ok) throw new Error('Erreur lors du changement de rôle');

      await fetchUsers();
      await fetchAuditLogs();
      alert('Rôle modifié avec succès');
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Erreur inconnue');
    }
  };

  const handleToggleStatus = async (userId: number, currentStatus: boolean) => {
    if (!isSuperAdmin) {
      alert('Seuls les super administrateurs peuvent modifier le statut');
      return;
    }

    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:5000/api/admin/users/${userId}/status`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ isActive: !currentStatus }),
      });

      if (!response.ok) throw new Error('Erreur lors du changement de statut');

      await fetchUsers();
      await fetchAuditLogs();
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Erreur inconnue');
    }
  };

  const handleDeleteUser = async (userId: number, userName: string) => {
    if (!isSuperAdmin) {
      alert('Seuls les super administrateurs peuvent supprimer des utilisateurs');
      return;
    }

    if (!confirm(`Êtes-vous sûr de vouloir supprimer l'utilisateur "${userName}" ? Cette action est irréversible.`)) {
      return;
    }

    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:5000/api/admin/users/${userId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) throw new Error('Erreur lors de la suppression');

      await fetchUsers();
      await fetchAuditLogs();
      alert('Utilisateur supprimé avec succès');
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Erreur inconnue');
    }
  };

  const getRoleBadgeClass = (role: string) => {
    switch (role) {
      case 'super_admin': return 'role-badge super-admin';
      case 'admin': return 'role-badge admin';
      case 'patient': return 'role-badge patient';
      default: return 'role-badge';
    }
  };

  const getRoleLabel = (role: string) => {
    switch (role) {
      case 'super_admin': return 'Super Admin';
      case 'admin': return 'Administrateur';
      case 'patient': return 'Patient';
      default: return role;
    }
  };

  const formatDate = (dateString: string | null) => {
    if (!dateString) return 'Jamais';
    return new Date(dateString).toLocaleDateString('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  if (isLoading) {
    return (
      <AdminLayout>
        <div className="users-page">
          <div className="users-loading">Chargement...</div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="users-page">
        <div className="users-header">
          <div>
            <h1 className="users-title">Gestion des utilisateurs</h1>
            <p className="users-subtitle">
              {users.length} utilisateur{users.length > 1 ? 's' : ''}
            </p>
          </div>
          {isSuperAdmin && (
            <button
              className="users-audit-btn"
              onClick={() => setShowAuditLogs(!showAuditLogs)}
            >
              {showAuditLogs ? 'Masquer les logs' : 'Voir les logs d\'audit'}
            </button>
          )}
        </div>

        {error && (
          <div className="users-error">{error}</div>
        )}

        {!isSuperAdmin && (
          <div className="users-warning">
            Vous n'avez pas les permissions pour modifier les utilisateurs. Seuls les super administrateurs peuvent gérer les rôles.
          </div>
        )}

        <div className="users-filters">
          <input
            type="text"
            className="users-search"
            placeholder="Rechercher par nom ou email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && fetchUsers()}
          />
          <select
            className="users-role-filter"
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
          >
            <option value="all">Tous les rôles</option>
            <option value="patient">Patients</option>
            <option value="admin">Administrateurs</option>
            <option value="super_admin">Super Admins</option>
          </select>
          <button className="users-search-btn" onClick={fetchUsers}>
            Rechercher
          </button>
        </div>

        {showAuditLogs && isSuperAdmin && (
          <div className="users-audit-logs">
            <h2 className="audit-logs-title">Logs d'audit</h2>
            <div className="audit-logs-list">
              {auditLogs.map((log) => (
                <div key={log.id} className="audit-log-item">
                  <div className="audit-log-action">{log.action}</div>
                  <div className="audit-log-details">
                    Par {log.performedByName} • {formatDate(log.createdAt)} • IP: {log.ipAddress}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="users-table-container">
          <table className="users-table">
            <thead>
              <tr>
                <th>Nom</th>
                <th>Email</th>
                <th>Rôle</th>
                <th>Statut</th>
                <th>Dernière connexion</th>
                <th>Créé le</th>
                {isSuperAdmin && <th>Actions</th>}
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id}>
                  <td className="user-name">
                    {user.firstName} {user.lastName}
                  </td>
                  <td>{user.email}</td>
                  <td>
                    {isSuperAdmin ? (
                      <select
                        className={getRoleBadgeClass(user.role)}
                        value={user.role}
                        onChange={(e) => handleRoleChange(user.id, e.target.value)}
                        disabled={user.id === provider?.id}
                      >
                        <option value="patient">Patient</option>
                        <option value="admin">Administrateur</option>
                        <option value="super_admin">Super Admin</option>
                      </select>
                    ) : (
                      <span className={getRoleBadgeClass(user.role)}>
                        {getRoleLabel(user.role)}
                      </span>
                    )}
                  </td>
                  <td>
                    <span className={`status-badge ${user.isActive ? 'active' : 'inactive'}`}>
                      {user.isActive ? 'Actif' : 'Inactif'}
                    </span>
                  </td>
                  <td>{formatDate(user.lastLogin)}</td>
                  <td>{formatDate(user.createdAt)}</td>
                  {isSuperAdmin && (
                    <td className="user-actions">
                      <button
                        className={`action-btn ${user.isActive ? 'deactivate' : 'activate'}`}
                        onClick={() => handleToggleStatus(user.id, user.isActive)}
                        disabled={user.id === provider?.id}
                        title={user.isActive ? 'Désactiver' : 'Activer'}
                      >
                        {user.isActive ? '🚫' : '✓'}
                      </button>
                      <button
                        className="action-btn delete"
                        onClick={() => handleDeleteUser(user.id, `${user.firstName} ${user.lastName}`)}
                        disabled={user.id === provider?.id}
                        title="Supprimer"
                      >
                        🗑️
                      </button>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </AdminLayout>
  );
}
