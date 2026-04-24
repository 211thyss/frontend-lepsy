import { useState, useEffect, useRef } from "react";
import { useAuth } from "../contexts/AuthContext";
import "./Navbar.css";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLLIElement>(null);
  const { provider, isAuthenticated, logout } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleHomeClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    if (window.location.pathname !== "/") {
      window.history.pushState({}, "", "/");
      window.dispatchEvent(new PopStateEvent("popstate"));
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleDashboardClick = () => {
    window.location.href = "/admin/dashboard";
  };

  const handleLogout = () => {
    logout();
  };

  return (
    <nav className={isScrolled ? "navbar navbar--scrolled" : "navbar"}>
      <div className="navbar-inner">
        <a href="/" className="navbar-logo" aria-label="Retour à l'accueil" onClick={handleHomeClick}>
          <img src="/logo.png" alt="Logo GICHT' Gichtenaere" className="navbar-logo-image" />
          <span className="navbar-logo-text" aria-hidden="true">GICHT' · Gichtenaere</span>
        </a>

        <ul className="navbar-menu" role="navigation" aria-label="Navigation principale">
          <li>
            <a href="/" className="navbar-link" onClick={handleHomeClick}>
              Accueil
            </a>
          </li>
          <li>
            <a href="#etapes" className="navbar-link">
              Étapes
            </a>
          </li>
          <li>
            <a href="#equipe" className="navbar-link">
              Équipe
            </a>
          </li>
          <li>
            <a href="/blog" className="navbar-link">
              Blog
            </a>
          </li>
          <li>
            <a href="#contact" className="navbar-link">
              Contact
            </a>
          </li>
          
          {isAuthenticated && provider ? (
            <li className="navbar-profile" ref={dropdownRef}>
              <button
                className="navbar-profile-button"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                aria-expanded={isDropdownOpen}
                aria-haspopup="true"
              >
                {provider.avatarUrl ? (
                  <img
                    src={provider.avatarUrl}
                    alt={`${provider.firstName} ${provider.lastName}`}
                    className="navbar-profile-avatar"
                  />
                ) : (
                  <div className="navbar-profile-avatar navbar-profile-avatar--placeholder">
                    {provider.firstName[0]}{provider.lastName[0]}
                  </div>
                )}
                <span className="navbar-profile-name">
                  {provider.firstName}
                </span>
                <svg
                  className={`navbar-profile-arrow ${isDropdownOpen ? 'navbar-profile-arrow--open' : ''}`}
                  width="12"
                  height="12"
                  viewBox="0 0 12 12"
                  fill="none"
                >
                  <path d="M2 4L6 8L10 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </button>

              {isDropdownOpen && (
                <div className="navbar-dropdown">
                  <div className="navbar-dropdown-header">
                    <p className="navbar-dropdown-name">
                      {provider.firstName} {provider.lastName}
                    </p>
                    <p className="navbar-dropdown-title">{provider.title}</p>
                  </div>
                  <div className="navbar-dropdown-divider" />
                  <button
                    className="navbar-dropdown-item"
                    onClick={handleDashboardClick}
                  >
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <path d="M2 8H8V2H2V8ZM2 14H8V10H2V14ZM10 14H16V8H10V14ZM10 2V6H16V2H10Z" fill="currentColor"/>
                    </svg>
                    Tableau de bord
                  </button>
                  <button
                    className="navbar-dropdown-item"
                    onClick={handleLogout}
                  >
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <path d="M6 14H3C2.73478 14 2.48043 13.8946 2.29289 13.7071C2.10536 13.5196 2 13.2652 2 13V3C2 2.73478 2.10536 2.48043 2.29289 2.29289C2.48043 2.10536 2.73478 2 3 2H6M11 11L14 8M14 8L11 5M14 8H6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    Déconnexion
                  </button>
                </div>
              )}
            </li>
          ) : (
            <li>
              <a href="/login" className="navbar-link navbar-link--cta">
                Connexion
              </a>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
}
