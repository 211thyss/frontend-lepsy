import { ReactNode, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import './AdminLayout.css';

interface AdminLayoutProps {
  children: ReactNode;
}

export function AdminLayout({ children }: AdminLayoutProps) {
  const { provider, logout } = useAuth();
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  const menuItems = [
    {
      id: 'dashboard',
      label: 'Tableau de bord',
      icon: (
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <path d="M3 4C3 3.44772 3.44772 3 4 3H7C7.55228 3 8 3.44772 8 4V7C8 7.55228 7.55228 8 7 8H4C3.44772 8 3 7.55228 3 7V4Z" stroke="currentColor" strokeWidth="2"/>
          <path d="M12 4C12 3.44772 12.4477 3 13 3H16C16.5523 3 17 3.44772 17 4V7C17 7.55228 16.5523 8 16 8H13C12.4477 8 12 7.55228 12 7V4Z" stroke="currentColor" strokeWidth="2"/>
          <path d="M3 13C3 12.4477 3.44772 12 4 12H7C7.55228 12 8 12.4477 8 13V16C8 16.5523 7.55228 17 7 17H4C3.44772 17 3 16.5523 3 16V13Z" stroke="currentColor" strokeWidth="2"/>
          <path d="M12 13C12 12.4477 12.4477 12 13 12H16C16.5523 12 17 12.4477 17 13V16C17 16.5523 16.5523 17 16 17H13C12.4477 17 12 16.5523 12 16V13Z" stroke="currentColor" strokeWidth="2"/>
        </svg>
      ),
      path: '/admin/dashboard',
      roles: ['admin', 'super_admin'],
    },
    {
      id: 'appointments',
      label: 'Rendez-vous',
      icon: (
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <path d="M6 2V5M14 2V5M5 9H15M4 17H16C17.1046 17 18 16.1046 18 15V5C18 3.89543 17.1046 3 16 3H4C2.89543 3 2 3.89543 2 5V15C2 16.1046 2.89543 17 4 17Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
      path: '/admin/appointments',
      roles: ['admin', 'super_admin'],
    },
    {
      id: 'patients',
      label: 'Patients',
      icon: (
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <path d="M13 16H17V14C17 12.3431 15.6569 11 14 11C13.0444 11 12.1931 11.4468 11.6438 12.1429M13 16H7M13 16V14C13 13.3438 12.8736 12.717 11.6438 12.1429M7 16H3V14C3 12.3431 4.34315 11 6 11C6.95561 11 7.80686 11.4468 8.35625 12.1429M7 16V14C7 13.3438 7.12642 12.717 8.35625 12.1429M11.6438 12.1429C10.9065 10.301 9.10518 9 7 9C4.89482 9 3.0935 10.301 2.35625 12.1429M11 5C11 6.65685 9.65685 8 8 8C6.34315 8 5 6.65685 5 5C5 3.34315 6.34315 2 8 2C9.65685 2 11 3.34315 11 5ZM17 7C17 8.10457 16.1046 9 15 9C13.8954 9 13 8.10457 13 7C13 5.89543 13.8954 5 15 5C16.1046 5 17 5.89543 17 7Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
      path: '/admin/patients',
      roles: ['admin', 'super_admin'],
    },
    {
      id: 'articles',
      label: 'Articles',
      icon: (
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <path d="M9 5H7C5.89543 5 5 5.89543 5 7V15C5 16.1046 5.89543 17 7 17H13C14.1046 17 15 16.1046 15 15V7C15 5.89543 14.1046 5 13 5H11M9 5C9 6.10457 9.89543 7 11 7H11C12.1046 7 13 6.10457 13 5M9 5C9 3.89543 9.89543 3 11 3H11C12.1046 3 13 3.89543 13 5M8 10H12M8 13H12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
      path: '/admin/articles',
      roles: ['admin', 'super_admin'],
    },
    {
      id: 'messages',
      label: 'Messages',
      icon: (
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <path d="M2 6L8.89 10.26C9.2187 10.4793 9.6049 10.5963 10 10.5963C10.3951 10.5963 10.7813 10.4793 11.11 10.26L18 6M4 15H16C17.1046 15 18 14.1046 18 13V5C18 3.89543 17.1046 3 16 3H4C2.89543 3 2 3.89543 2 5V13C2 14.1046 2.89543 15 4 15Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
      path: '/admin/messages',
      roles: ['admin', 'super_admin'],
    },
    {
      id: 'availability',
      label: 'Disponibilités',
      icon: (
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <path d="M10 4V10L13 13M19 10C19 14.9706 14.9706 19 10 19C5.02944 19 1 14.9706 1 10C1 5.02944 5.02944 1 10 1C14.9706 1 19 5.02944 19 10Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
      path: '/admin/availability',
      roles: ['admin', 'super_admin'],
    },
    {
      id: 'profile',
      label: 'Mon profil',
      icon: (
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <path d="M13 5C13 6.65685 11.6569 8 10 8C8.34315 8 7 6.65685 7 5C7 3.34315 8.34315 2 10 2C11.6569 2 13 3.34315 13 5Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M10 11C6.13401 11 3 14.134 3 18H17C17 14.134 13.866 11 10 11Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
      path: '/admin/profile',
      roles: ['admin', 'super_admin'],
    },
    {
      id: 'users',
      label: 'Utilisateurs',
      icon: (
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <path d="M9 6C9 7.65685 7.65685 9 6 9C4.34315 9 3 7.65685 3 6C3 4.34315 4.34315 3 6 3C7.65685 3 9 4.34315 9 6Z" stroke="currentColor" strokeWidth="2"/>
          <path d="M17 6C17 7.65685 15.6569 9 14 9C12.3431 9 11 7.65685 11 6C11 4.34315 12.3431 3 14 3C15.6569 3 17 4.34315 17 6Z" stroke="currentColor" strokeWidth="2"/>
          <path d="M12 11H8C5.79086 11 4 12.7909 4 15V17H12M12 11C14.2091 11 16 12.7909 16 15V17H12M12 11V17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
      path: '/admin/users',
      roles: ['super_admin'],
    },
  ];

  // Filter menu items based on user role
  const filteredMenuItems = menuItems.filter(item => {
    if (!item.roles) return true; // No role restriction
    return item.roles.includes(provider?.role || '');
  });

  const navigateTo = (path: string) => {
    window.history.pushState({}, '', path);
    window.dispatchEvent(new PopStateEvent('popstate'));
  };

  const isActive = (path: string) => window.location.pathname === path;

  return (
    <div className="admin-layout">
      {/* Sidebar */}
      <aside className={`admin-sidebar ${isSidebarCollapsed ? 'collapsed' : ''}`}>
        <div className="admin-sidebar-header">
          <div className="admin-sidebar-logo">
            <div className="admin-logo-icon">G</div>
            {!isSidebarCollapsed && <span className="admin-logo-text">GICHT'</span>}
          </div>
          <button
            className="admin-sidebar-toggle"
            onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M15 6L9 12L15 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>

        <nav className="admin-sidebar-nav">
          {filteredMenuItems.map((item) => (
            <button
              key={item.id}
              className={`admin-nav-item ${isActive(item.path) ? 'active' : ''}`}
              onClick={() => navigateTo(item.path)}
            >
              <span className="admin-nav-icon">{item.icon}</span>
              {!isSidebarCollapsed && <span className="admin-nav-label">{item.label}</span>}
            </button>
          ))}
        </nav>

        <div className="admin-sidebar-footer">
          <div className="admin-user-info">
            <div className="admin-user-avatar">
              {provider?.avatarUrl ? (
                <img src={provider.avatarUrl} alt="Profile" />
              ) : (
                `${provider?.firstName?.charAt(0)}${provider?.lastName?.charAt(0)}`
              )}
            </div>
            {!isSidebarCollapsed && (
              <div className="admin-user-details">
                <p className="admin-user-name">{provider?.firstName} {provider?.lastName}</p>
                <p className="admin-user-role">{provider?.title}</p>
              </div>
            )}
          </div>
          <button className="admin-logout-btn" onClick={logout} title="Déconnexion">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M13 14L17 10M17 10L13 6M17 10H7M7 17H4C2.89543 17 2 16.1046 2 15V5C2 3.89543 2.89543 3 4 3H7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="admin-main">
        {children}
      </main>
    </div>
  );
}
