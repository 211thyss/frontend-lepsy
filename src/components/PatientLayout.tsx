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
    { 
      path: '/patient/dashboard', 
      label: 'Tableau de bord', 
      icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
    },
    { 
      path: '/patient/appointments', 
      label: 'Mes rendez-vous', 
      icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
    },
    { 
      path: '/booking', 
      label: 'Prendre RDV', 
      icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
    },
    { 
      path: '/patient/profile', 
      label: 'Profil', 
      icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
    },
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
