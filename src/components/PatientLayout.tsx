import { ReactNode, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import './PatientLayout.css';

interface PatientLayoutProps {
  children: ReactNode;
}

export function PatientLayout({ children }: PatientLayoutProps) {
  const { provider: user, logout } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { path: '/patient/dashboard', label: 'Tableau de bord', icon: '🏠' },
    { path: '/patient/appointments', label: 'Mes rendez-vous', icon: '📅' },
    { path: '/booking', label: 'Prendre RDV', icon: '➕' },
    { path: '/patient/profile', label: 'Profil', icon: '👤' },
  ];

  const isActive = (path: string) => {
    return window.location.pathname === path;
  };

  return (
    <div className="patient-layout">
      <nav className="patient-nav">
        <div className="nav-container">
          <div className="nav-brand">
            <a href="/">
              <img src="/logo.png" alt="Logo" className="nav-logo" />
            </a>
            <span className="nav-title">Espace Patient</span>
          </div>

          <button 
            className="mobile-menu-toggle"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? '✕' : '☰'}
          </button>

          <div className={`nav-menu ${isMobileMenuOpen ? 'mobile-open' : ''}`}>
            <div className="nav-links">
              {navItems.map((item) => (
                <a
                  key={item.path}
                  href={item.path}
                  className={`nav-link ${isActive(item.path) ? 'active' : ''}`}
                >
                  <span className="nav-icon">{item.icon}</span>
                  <span className="nav-label">{item.label}</span>
                </a>
              ))}
            </div>

            <div className="nav-user">
              <div className="user-info">
                <div className="user-avatar">
                  {user?.firstName?.[0]}{user?.lastName?.[0]}
                </div>
                <div className="user-details">
                  <div className="user-name">{user?.firstName} {user?.lastName}</div>
                  <div className="user-email">{user?.email}</div>
                </div>
              </div>
              <button onClick={logout} className="btn-logout">
                Déconnexion
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className="patient-main">
        {children}
      </main>

      <footer className="patient-footer">
        <div className="footer-container">
          <p>&copy; 2024 GICHT' Gichtenaere. Tous droits réservés.</p>
          <div className="footer-links">
            <a href="/legal">Mentions légales</a>
            <a href="/privacy">Confidentialité</a>
            <a href="/contact">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
