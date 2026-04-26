import "./Footer.css";

export function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-grid">
          <div className="footer-brand">
            <img src="/logo.png" alt="GICHT' Gichtenaere" className="footer-logo" />
            <h3 className="footer-title">GICHT' · Gichtenaere</h3>
            <p className="footer-tagline">Un espace bienveillant pour retrouver votre équilibre</p>
          </div>

          <div className="footer-column">
            <h4 className="footer-heading">Navigation</h4>
            <ul className="footer-list">
              <li><a href="/" className="footer-link">Accueil</a></li>
              <li><a href="/#etapes" className="footer-link">Étapes</a></li>
              <li><a href="/#equipe" className="footer-link">Équipe</a></li>
              <li><a href="/#formats" className="footer-link">Formats</a></li>
              <li><a href="/#contact" className="footer-link">Contact</a></li>
            </ul>
          </div>

          <div className="footer-column">
            <h4 className="footer-heading">Contact</h4>
            <ul className="footer-list">
              <li><a href="tel:+33123456789" className="footer-link">+33 1 23 45 67 89</a></li>
              <li><a href="mailto:contact@gichtenaere.fr" className="footer-link">contact@gichtenaere.fr</a></li>
              <li><span className="footer-text">Cabinet en cours d'ouverture</span></li>
            </ul>
          </div>

          <div className="footer-column">
            <h4 className="footer-heading">Engagements</h4>
            <ul className="footer-list">
              <li><span className="footer-text">FFPP</span></li>
              <li><span className="footer-text">Ordre des Psychologues</span></li>
              <li><span className="footer-text">Code de déontologie</span></li>
              <li><span className="footer-text">Formation continue</span></li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p className="footer-copyright">© 2026 GICHT' Gichtenaere. Tous droits réservés.</p>
          <div className="footer-legal">
            <a href="/mentions-legales" className="footer-legal-link">Mentions légales</a>
            <span className="footer-separator">·</span>
            <a href="/politique-confidentialite" className="footer-legal-link">Politique de confidentialité</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
