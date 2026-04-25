import { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { PatientLayout } from '../../components/PatientLayout';
import { API_URL } from '../../config/api';
import { User, Mail, Phone, Lock, CheckCircle } from 'iconoir-react';
import './Profile.css';

export function PatientProfile() {
  const { provider: user, token, updateUser } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  
  const [formData, setFormData] = useState({
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    email: user?.email || '',
    phone: user?.phone || '',
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  useEffect(() => {
    if (user) {
      setFormData({
        firstName: user.firstName || '',
        lastName: user.lastName || '',
        email: user.email || '',
        phone: user.phone || '',
      });
    }
  }, [user]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPasswordData({
      ...passwordData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setMessage(null);

    try {
      const response = await fetch(`${API_URL}/api/patient/profile`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        updateUser(data.patient);
        setMessage({ type: 'success', text: 'Profil mis à jour avec succès' });
        setIsEditing(false);
      } else {
        const error = await response.json();
        setMessage({ type: 'error', text: error.error || 'Erreur lors de la mise à jour' });
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'Erreur de connexion au serveur' });
    } finally {
      setIsSaving(false);
    }
  };

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setMessage({ type: 'error', text: 'Les mots de passe ne correspondent pas' });
      return;
    }

    if (passwordData.newPassword.length < 8) {
      setMessage({ type: 'error', text: 'Le mot de passe doit contenir au moins 8 caractères' });
      return;
    }

    setIsSaving(true);
    setMessage(null);

    try {
      const response = await fetch(`${API_URL}/api/patient/password`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          currentPassword: passwordData.currentPassword,
          newPassword: passwordData.newPassword,
        }),
      });

      if (response.ok) {
        setMessage({ type: 'success', text: 'Mot de passe modifié avec succès' });
        setPasswordData({
          currentPassword: '',
          newPassword: '',
          confirmPassword: '',
        });
      } else {
        const error = await response.json();
        setMessage({ type: 'error', text: error.error || 'Erreur lors du changement de mot de passe' });
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'Erreur de connexion au serveur' });
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <PatientLayout>
      <div className="patient-profile">
        <div className="profile-header">
          <h1>Mon profil</h1>
          <p className="profile-subtitle">
            Gérez vos informations personnelles
          </p>
        </div>

        {message && (
          <div className={`message-banner ${message.type}`}>
            {message.type === 'success' && <CheckCircle width={20} height={20} />}
            <span>{message.text}</span>
          </div>
        )}

        {user?.isVerified && (
          <div className="verified-badge">
            <CheckCircle width={20} height={20} />
            <span>Compte vérifié</span>
          </div>
        )}

        <div className="profile-grid">
          {/* Informations personnelles */}
          <div className="profile-card">
            <div className="card-header">
              <h2>Informations personnelles</h2>
              {!isEditing && (
                <button
                  className="btn-edit"
                  onClick={() => setIsEditing(true)}
                >
                  Modifier
                </button>
              )}
            </div>

            <form onSubmit={handleSaveProfile}>
              <div className="form-grid">
                <div className="form-group">
                  <label htmlFor="firstName">
                    <User width={18} height={18} />
                    Prénom
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="lastName">
                    <User width={18} height={18} />
                    Nom
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="email">
                    <Mail width={18} height={18} />
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="phone">
                    <Phone width={18} height={18} />
                    Téléphone
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                  />
                </div>
              </div>

              {isEditing && (
                <div className="form-actions">
                  <button
                    type="button"
                    className="btn-secondary"
                    onClick={() => {
                      setIsEditing(false);
                      setFormData({
                        firstName: user?.firstName || '',
                        lastName: user?.lastName || '',
                        email: user?.email || '',
                        phone: user?.phone || '',
                      });
                    }}
                    disabled={isSaving}
                  >
                    Annuler
                  </button>
                  <button
                    type="submit"
                    className="btn-primary"
                    disabled={isSaving}
                  >
                    {isSaving ? 'Enregistrement...' : 'Enregistrer'}
                  </button>
                </div>
              )}
            </form>
          </div>

          {/* Changer le mot de passe */}
          <div className="profile-card">
            <div className="card-header">
              <h2>Sécurité</h2>
            </div>

            <form onSubmit={handleChangePassword}>
              <div className="form-group">
                <label htmlFor="currentPassword">
                  <Lock width={18} height={18} />
                  Mot de passe actuel
                </label>
                <input
                  type="password"
                  id="currentPassword"
                  name="currentPassword"
                  value={passwordData.currentPassword}
                  onChange={handlePasswordChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="newPassword">
                  <Lock width={18} height={18} />
                  Nouveau mot de passe
                </label>
                <input
                  type="password"
                  id="newPassword"
                  name="newPassword"
                  value={passwordData.newPassword}
                  onChange={handlePasswordChange}
                  required
                  minLength={8}
                />
                <small>Minimum 8 caractères</small>
              </div>

              <div className="form-group">
                <label htmlFor="confirmPassword">
                  <Lock width={18} height={18} />
                  Confirmer le mot de passe
                </label>
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  value={passwordData.confirmPassword}
                  onChange={handlePasswordChange}
                  required
                  minLength={8}
                />
              </div>

              <div className="form-actions">
                <button
                  type="submit"
                  className="btn-primary"
                  disabled={isSaving}
                >
                  {isSaving ? 'Modification...' : 'Changer le mot de passe'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </PatientLayout>
  );
}
