import { ReactNode, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { 
  Home, 
  Calendar, 
  Plus, 
  User, 
  LogOut,
  Menu,
  Xmark
} from 'iconoir-react';
import './PatientLayout.css';

interface PatientLayoutProps {
  children: ReactNode;
}

export function PatientLayout({ children }: PatientLayoutProps) {
  const { provider: user, logout } = useAuth();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const navItems = [
    { 
      path: '/patient/dashboard', 
      label: 'Tableau de bord', 
      icon: <Home />
    },
    { 
      path: '/patient/appointments', 
      label: 'Mes rendez-vous', 
      icon: <Calendar />
    },
    { 
      path: '/booking', 
      label: 'Prendre RDV', 
      icon: <Plus />
    },
    { 
      path: '/patient/profile', 
      label: 'Profil', 
      icon: <User />
    },
  ];

  const isActive = (path: string) => {
    return window.location.pathname === path;
  };

  const handleNavClick = (path: string) => {
    window.location.href = path;
    setIsSidebarOpen(false);
  };

  return (
    <div className="patient-layout">
      {/* Sidebar */}
      <aside className={`sidebar ${isSidebarOpen ? 'sidebar-open' : ''}`}>
        <div className="sidebar-header">
          <a href="/" className="sidebar-logo">
            <img src="/logo.png" alt="Logo" />
            <span>GICHT'</span>
          </a>
        </div>

        <nav className="sidebar-nav">
          {navItems.map((item) => (
            <button
              key={item.path}
              onClick={() => handleNavClick(item.path)}
              className={`sidebar-link ${isActive(item.path) ? 'active' : ''}`}
            >
              <span className="sidebar-icon">{item.icon}</span>
              <span className="sidebar-label">{item.label}</span>
            </button>
          ))}
        </nav>

        <div className="sidebar-footer">
          <div className="sidebar-user">
            <div className="sidebar-avatar">
              {user?.firstName?.[0]}{user?.lastName?.[0]}
            </div>
            <div className="sidebar-user-info">
              <div className="sidebar-user-name">{user?.firstName} {user?.lastName}</div>
              <div className="sidebar-user-email">{user?.email}</div>
            </div>
          </div>
          <button onClick={logout} className="sidebar-logout">
            <LogOut />
            <span>Déconnexion</span>
          </button>
        </div>
      </aside>

      {/* Overlay for mobile */}
      {isSidebarOpen && (
        <div 
          className="sidebar-overlay" 
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Main content */}
      <div className="main-wrapper">
        {/* Top bar for mobile */}
        <div className="topbar">
          <button 
            className="topbar-menu"
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          >
            {isSidebarOpen ? <Xmark /> : <Menu />}
          </button>
          <a href="/" className="topbar-logo">
            <img src="/logo.png" alt="Logo" />
          </a>
          <div className="topbar-avatar">
            {user?.firstName?.[0]}{user?.lastName?.[0]}
          </div>
        </div>

        <main className="main-content">
          {children}
        </main>

        <footer className="main-footer">
          <div className="footer-content">
            <p>&copy; 2026 GICHT' Gichtenaere. Tous droits réservés.</p>
            <div className="footer-links">
              <a href="/legal">Mentions légales</a>
              <a href="/privacy">Confidentialité</a>
              <a href="/contact">Contact</a>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
