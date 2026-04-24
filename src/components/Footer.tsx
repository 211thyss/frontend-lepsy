import "./Footer.css";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-wave" aria-hidden="true">
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path d="M0,0 C300,80 600,80 900,40 C1050,20 1150,0 1200,0 L1200,120 L0,120 Z" />
        </svg>
      </div>

      <div className="footer-content">
        <div className="footer-main">
          <div className="footer-brand">
            <img src="/logo.png" alt="Logo GICHT' Gichtenaere" className="footer-logo" loading="lazy" />
            <h3 className="footer-brand-name">GICHT' · Gichtenaere</h3>
            <p className="footer-tagline">
              Un espace bienveillant pour retrouver votre équilibre
            </p>
          </div>

          <div className="footer-links">
            <div className="footer-column">
              <h4 className="footer-column-title">Navigation</h4>
              <ul className="footer-list">
                <li><a href="#" className="footer-link">Accueil</a></li>
                <li><a href="#etapes" className="footer-link">Étapes</a></li>
                <li><a href="#equipe" className="footer-link">Équipe</a></li>
                <li><a href="#formats" className="footer-link">Formats</a></li>
                <li><a href="#contact" className="footer-link">Contact</a></li>
              </ul>
            </div>

            <div className="footer-column">
              <h4 className="footer-column-title">Informations</h4>
              <ul className="footer-list">
                <li><a href="tel:+33123456789" className="footer-link">+33 1 23 45 67 89</a></li>
                <li><a href="mailto:contact@gichtenaere.fr" className="footer-link">contact@gichtenaere.fr</a></li>
                <li className="footer-text">Cabinet en cours d'ouverture</li>
              </ul>
            </div>

            <div className="footer-column">
              <h4 className="footer-column-title">Engagements</h4>
              <ul className="footer-list">
                <li className="footer-text">FFPP</li>
                <li className="footer-text">Ordre des Psychologues</li>
                <li className="footer-text">Code de déontologie</li>
                <li className="footer-text">Formation continue</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p className="footer-copyright">
            © {currentYear} GICHT' Gichtenaere. Tous droits réservés.
          </p>
          <div className="footer-legal">
            <a href="/mentions-legales" className="footer-legal-link" onClick={(e) => {
              e.preventDefault();
              window.history.pushState({}, "", "/mentions-legales");
              window.dispatchEvent(new PopStateEvent("popstate"));
            }}>Mentions légales</a>
            <span className="footer-separator">·</span>
            <a href="/politique-confidentialite" className="footer-legal-link" onClick={(e) => {
              e.preventDefault();
              window.history.pushState({}, "", "/politique-confidentialite");
              window.dispatchEvent(new PopStateEvent("popstate"));
            }}>Politique de confidentialité</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
