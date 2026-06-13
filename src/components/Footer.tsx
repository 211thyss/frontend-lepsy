import "./Footer.css";

export function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-grid">
          <div className="footer-brand">
            <img src="/logo.png" alt="CABINETGichtenaere" className="footer-logo" />
            <h3 className="footer-title">CABINET· Gichtenaere</h3>
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
              <li><a href="tel:+33685455754" className="footer-link">+33 7 59 95 55 05</a></li>
              <li><a href="mailto:contact@gichtenaere.fr" className="footer-link">contact@gichtenaere.fr</a></li>
              <li><span className="footer-text">9 Avenue Albert 1er, 83470 Saint-Maximin-la-Sainte-Baume</span></li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p className="footer-copyright">© 2026 CABINETGichtenaere. Tous droits réservés.</p>
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
