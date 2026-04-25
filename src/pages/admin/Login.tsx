import { useState, FormEvent } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { API_URL } from '../../config/api';
import './Login.css';

type Mode = 'login' | 'register';

interface FormData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  adeliNumber: string;
  phone: string;
  confirmPassword: string;
}

interface FormErrors {
  [key: string]: string;
}

export function Login() {
  const [mode, setMode] = useState<Mode>('login');
  const [formData, setFormData] = useState<FormData>({
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    adeliNumber: '',
    phone: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();

  const validateEmail = (email: string): string | null => {
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return 'Format d\'email invalide';
    }
    return null;
  };

  const validatePassword = (password: string): string | null => {
    if (password.length < 8) {
      return 'Le mot de passe doit contenir au moins 8 caractères';
    }
    if (!/[a-z]/.test(password)) {
      return 'Le mot de passe doit contenir au moins une minuscule';
    }
    if (!/[A-Z]/.test(password)) {
      return 'Le mot de passe doit contenir au moins une majuscule';
    }
    if (!/\d/.test(password)) {
      return 'Le mot de passe doit contenir au moins un chiffre';
    }
    if (!/[!@#$%^&*]/.test(password)) {
      return 'Le mot de passe doit contenir au moins un caractère spécial (!@#$%^&*)';
    }
    return null;
  };

  const validateField = (field: keyof FormData, value: string): string | null => {
    switch (field) {
      case 'email':
        return validateEmail(value);
      case 'password':
        return null;
      default:
        return null;
    }
  };

  const handleFieldChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Validate on change
    const error = validateField(field, value);
    setErrors(prev => {
      const newErrors = { ...prev };
      if (error) {
        newErrors[field] = error;
      } else {
        delete newErrors[field];
      }
      return newErrors;
    });
  };

  const handleLoginSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      await login(formData.email, formData.password);
      
      // Rediriger selon le rôle
      const storedProvider = localStorage.getItem('provider');
      if (storedProvider && storedProvider !== 'undefined') {
        const user = JSON.parse(storedProvider);
        if (user.role === 'patient') {
          window.location.href = '/patient/dashboard';
        } else {
          window.location.href = '/admin/dashboard';
        }
      } else {
        window.location.href = '/';
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur de connexion');
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegisterSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    setErrors({});

    // Validation
    const newErrors: FormErrors = {};
    
    if (!formData.firstName.trim()) {
      newErrors.firstName = 'Le prénom est requis';
    }
    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Le nom est requis';
    }
    
    const emailError = validateEmail(formData.email);
    if (emailError) {
      newErrors.email = emailError;
    }
    
    const passwordError = validatePassword(formData.password);
    if (passwordError) {
      newErrors.password = passwordError;
    }
    
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Les mots de passe ne correspondent pas';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch(`${API_URL}/api/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          password: formData.password,
          phone: formData.phone || null,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Erreur lors de l\'inscription');
      }

      // Auto-login after registration
      await login(formData.email, formData.password);
      window.location.href = '/patient/dashboard';
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur lors de l\'inscription');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <div className="login-card">
          <div className="login-header">
            <img src="/logo.png" alt="Logo GICHT'" className="login-logo" />
            <h1 className="login-title">
              {mode === 'login' ? 'Connexion' : 'Créer un compte'}
            </h1>
            <p className="login-subtitle">
              {mode === 'login' 
                ? 'Connectez-vous à votre espace personnel'
                : 'Inscrivez-vous pour prendre rendez-vous'}
            </p>
          </div>

          {error && (
            <div className="login-error" role="alert">
              {error}
            </div>
          )}

          <form className="login-form" onSubmit={mode === 'login' ? handleLoginSubmit : handleRegisterSubmit}>
            {mode === 'register' && (
              <>
                <div className="login-form-group">
                  <label htmlFor="firstName" className="login-label">
                    Prénom
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    value={formData.firstName}
                    onChange={(e) => handleFieldChange('firstName', e.target.value)}
                    className="login-input"
                    placeholder="Théo"
                    required
                    disabled={isLoading}
                  />
                  {errors.firstName && <span className="login-field-error">{errors.firstName}</span>}
                </div>

                <div className="login-form-group">
                  <label htmlFor="lastName" className="login-label">
                    Nom
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    value={formData.lastName}
                    onChange={(e) => handleFieldChange('lastName', e.target.value)}
                    className="login-input"
                    placeholder="Gicht"
                    required
                    disabled={isLoading}
                  />
                  {errors.lastName && <span className="login-field-error">{errors.lastName}</span>}
                </div>
              </>
            )}

              <div className="login-form-group">
                <label htmlFor="email" className="login-label">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  value={formData.email}
                  onChange={(e) => handleFieldChange('email', e.target.value)}
                  className="login-input"
                  placeholder="votre.email@exemple.fr"
                  required
                  autoComplete="email"
                  disabled={isLoading}
                />
                {errors.email && <span className="login-field-error">{errors.email}</span>}
              </div>

              <div className="login-form-group">
                <label htmlFor="password" className="login-label">
                  Mot de passe
                </label>
                <input
                  type="password"
                  id="password"
                  value={formData.password}
                  onChange={(e) => handleFieldChange('password', e.target.value)}
                  className="login-input"
                  placeholder="••••••••"
                  required
                  autoComplete="current-password"
                  disabled={isLoading}
                />
                {errors.password && <span className="login-field-error">{errors.password}</span>}
              </div>

            {mode === 'register' && (
              <>
                <div className="login-form-group">
                  <label htmlFor="confirmPassword" className="login-label">
                    Confirmer le mot de passe
                  </label>
                  <input
                    type="password"
                    id="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={(e) => handleFieldChange('confirmPassword', e.target.value)}
                    className="login-input"
                    placeholder="••••••••"
                    required
                    disabled={isLoading}
                  />
                  {errors.confirmPassword && <span className="login-field-error">{errors.confirmPassword}</span>}
                </div>

                <div className="login-form-group">
                  <label htmlFor="phone" className="login-label">
                    Téléphone (optionnel)
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    value={formData.phone}
                    onChange={(e) => handleFieldChange('phone', e.target.value)}
                    className="login-input"
                    placeholder="06 12 34 56 78"
                    disabled={isLoading}
                  />
                </div>
              </>
            )}

              <button
                type="submit"
                className="login-button"
                disabled={isLoading}
              >
                {isLoading 
                  ? (mode === 'login' ? 'Connexion...' : 'Inscription...') 
                  : (mode === 'login' ? 'Se connecter' : 'S\'inscrire')}
              </button>
            </form>

            <div className="login-footer">
              {mode === 'login' ? (
                <>
                  <p className="login-footer-text">
                    Connectez-vous avec vos identifiants
                  </p>
                  <button 
                    className="login-mode-toggle"
                    onClick={() => setMode('register')}
                  >
                    Pas encore de compte ? S'inscrire
                  </button>
                </>
              ) : (
                <button 
                  className="login-mode-toggle"
                  onClick={() => setMode('login')}
                >
                  Déjà un compte ? Se connecter
                </button>
              )}
            </div>
        </div>

        <a href="/" className="login-back-link">
          ← Retour au site
        </a>
      </div>
    </div>
  );
}
