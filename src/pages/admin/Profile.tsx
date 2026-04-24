import { useEffect, useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { AdminLayout } from '../../components/AdminLayout';
import './Appointments.css';

export function Profile() {
  const { provider, token } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    bio: '',
    adeliNumber: '',
  });
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [avatarPreview, setAvatarPreview] = useState('');
  const [message, setMessage] = useState({ type: '', text: '' });

  useEffect(() => {
    if (provider) {
      setFormData({
        firstName: provider.firstName || '',
        lastName: provider.lastName || '',
        email: provider.email || '',
        phone: '',
        bio: '',
        adeliNumber: '',
      });
      setAvatarPreview(provider.avatarUrl || '');
    }
    fetchFullProfile();
  }, [provider, token]);

  const fetchFullProfile = async () => {
    try {
      const response = await fetch(`${API_URL}/api/auth/profile', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const data = await response.json();
        setFormData({
          firstName: data.firstName || '',
          lastName: data.lastName || '',
          email: data.email || '',
          phone: data.phone || '',
          bio: data.bio || '',
          adeliNumber: data.adeliNumber || '',
        });
      }
    } catch (error) {
      console.error('Fetch profile error:', error);
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Convertir en base64 pour l'aperçu
    const reader = new FileReader();
    reader.onloadend = async () => {
      const base64String = reader.result as string;
      setAvatarPreview(base64String);

      // Envoyer au backend
      try {
        const response = await fetch(`${API_URL}/api/admin/profile/avatar', {
          method: 'PATCH',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ avatarUrl: base64String }),
        });

        if (response.ok) {
          setMessage({ type: 'success', text: 'Photo de profil mise à jour !' });
          // Mettre à jour le localStorage
          const storedProvider = localStorage.getItem('provider');
          if (storedProvider) {
            const providerData = JSON.parse(storedProvider);
            providerData.avatarUrl = base64String;
            localStorage.setItem('provider', JSON.stringify(providerData));
            // Dispatcher un événement pour notifier le changement
            window.dispatchEvent(new Event('providerUpdated'));
          }
          setTimeout(() => setMessage({ type: '', text: '' }), 3000);
        }
      } catch (error) {
        console.error('Upload avatar error:', error);
        setMessage({ type: 'error', text: 'Erreur lors de l\'upload' });
      }
    };
    reader.readAsDataURL(file);
  };

  const handleSaveProfile = async () => {
    try {
      const response = await fetch(`${API_URL}/api/admin/profile/info', {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          firstName: formData.firstName,
          lastName: formData.lastName,
          phone: formData.phone,
          bio: formData.bio,
        }),
      });

      if (response.ok) {
        setMessage({ type: 'success', text: 'Profil mis à jour avec succès !' });
        setIsEditing(false);
        // Mettre à jour le localStorage
        const storedProvider = localStorage.getItem('provider');
        if (storedProvider) {
          const providerData = JSON.parse(storedProvider);
          providerData.firstName = formData.firstName;
          providerData.lastName = formData.lastName;
          localStorage.setItem('provider', JSON.stringify(providerData));
          // Dispatcher un événement pour notifier le changement
          window.dispatchEvent(new Event('providerUpdated'));
        }
        setTimeout(() => setMessage({ type: '', text: '' }), 3000);
      }
    } catch (error) {
      console.error('Update profile error:', error);
      setMessage({ type: 'error', text: 'Erreur lors de la mise à jour' });
    }
  };

  const handleChangePassword = async () => {
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setMessage({ type: 'error', text: 'Les mots de passe ne correspondent pas' });
      return;
    }

    try {
      const response = await fetch(`${API_URL}/api/admin/profile/password', {
        method: 'PATCH',
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
        setMessage({ type: 'success', text: 'Mot de passe modifié avec succès !' });
        setIsChangingPassword(false);
        setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
        setTimeout(() => setMessage({ type: '', text: '' }), 3000);
      } else {
        const error = await response.json();
        setMessage({ type: 'error', text: error.error || 'Erreur' });
      }
    } catch (error) {
      console.error('Change password error:', error);
      setMessage({ type: 'error', text: 'Erreur lors du changement de mot de passe' });
    }
  };

  const getInitials = () => {
    return `${formData.firstName.charAt(0)}${formData.lastName.charAt(0)}`.toUpperCase();
  };

  return (
    <AdminLayout>
      <div className="profile-page">
        <div className="page-header">
          <div>
            <h1>Mon profil</h1>
            <p className="page-subtitle">Gérez vos informations personnelles</p>
          </div>
        </div>

        {message.text && (
          <div className={`alert alert-${message.type}`}>
            {message.text}
          </div>
        )}

        <div className="profile-grid">
          {/* Photo de profil */}
          <div className="profile-card">
            <h2 className="card-title">Photo de profil</h2>
            <div className="avatar-section">
              <div className="avatar-large">
                {avatarPreview ? (
                  <img src={avatarPreview} alt="Profile" />
                ) : (
                  <span>{getInitials()}</span>
                )}
              </div>
              <div className="avatar-actions">
                <label htmlFor="avatar-upload" className="btn-upload">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M17 8l-5-5-5 5M12 3v12" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  Changer la photo
                </label>
                <input
                  id="avatar-upload"
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  style={{ display: 'none' }}
                />
                <p className="avatar-hint">JPG, PNG ou GIF (max. 2MB)</p>
              </div>
            </div>
          </div>

          {/* Informations personnelles */}
          <div className="profile-card">
            <div className="card-header">
              <h2 className="card-title">Informations personnelles</h2>
              {!isEditing && (
                <button className="btn-edit" onClick={() => setIsEditing(true)}>
                  Modifier
                </button>
              )}
            </div>
            <div className="form-grid">
              <div className="form-group">
                <label>Prénom</label>
                <input
                  type="text"
                  value={formData.firstName}
                  onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                  disabled={!isEditing}
                  className="form-input"
                />
              </div>
              <div className="form-group">
                <label>Nom</label>
                <input
                  type="text"
                  value={formData.lastName}
                  onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                  disabled={!isEditing}
                  className="form-input"
                />
              </div>
              <div className="form-group">
                <label>Email</label>
                <input
                  type="email"
                  value={formData.email}
                  disabled
                  className="form-input"
                />
              </div>
              <div className="form-group">
                <label>Téléphone</label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  disabled={!isEditing}
                  className="form-input"
                />
              </div>
              <div className="form-group form-group-full">
                <label>Numéro ADELI</label>
                <input
                  type="text"
                  value={formData.adeliNumber}
                  disabled
                  className="form-input"
                />
              </div>
              <div className="form-group form-group-full">
                <label>Biographie</label>
                <textarea
                  value={formData.bio}
                  onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                  disabled={!isEditing}
                  className="form-textarea"
                  rows={4}
                  placeholder="Parlez de votre parcours, vos spécialités..."
                />
              </div>
            </div>
            {isEditing && (
              <div className="form-actions">
                <button className="btn-secondary" onClick={() => setIsEditing(false)}>
                  Annuler
                </button>
                <button className="btn-primary" onClick={handleSaveProfile}>
                  Enregistrer
                </button>
              </div>
            )}
          </div>

          {/* Sécurité */}
          <div className="profile-card">
            <h2 className="card-title">Sécurité</h2>
            {!isChangingPassword ? (
              <button className="btn-secondary" onClick={() => setIsChangingPassword(true)}>
                Changer le mot de passe
              </button>
            ) : (
              <div className="form-grid">
                <div className="form-group form-group-full">
                  <label>Mot de passe actuel</label>
                  <input
                    type="password"
                    value={passwordData.currentPassword}
                    onChange={(e) => setPasswordData({ ...passwordData, currentPassword: e.target.value })}
                    className="form-input"
                  />
                </div>
                <div className="form-group form-group-full">
                  <label>Nouveau mot de passe</label>
                  <input
                    type="password"
                    value={passwordData.newPassword}
                    onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
                    className="form-input"
                  />
                </div>
                <div className="form-group form-group-full">
                  <label>Confirmer le mot de passe</label>
                  <input
                    type="password"
                    value={passwordData.confirmPassword}
                    onChange={(e) => setPasswordData({ ...passwordData, confirmPassword: e.target.value })}
                    className="form-input"
                  />
                </div>
                <div className="form-actions">
                  <button className="btn-secondary" onClick={() => setIsChangingPassword(false)}>
                    Annuler
                  </button>
                  <button className="btn-primary" onClick={handleChangePassword}>
                    Modifier le mot de passe
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
