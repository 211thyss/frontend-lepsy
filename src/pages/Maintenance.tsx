import './Maintenance.css';

export function Maintenance() {
  return (
    <div className="maintenance-page">
      <div className="maintenance-container">
        <div className="maintenance-icon">
          <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/>
          </svg>
        </div>
        <h1 className="maintenance-title">Maintenance en cours</h1>
        <p className="maintenance-text">
          Cette section est temporairement indisponible pour maintenance.
        </p>
        <p className="maintenance-subtext">
          Nous travaillons à améliorer votre expérience. Merci de votre patience.
        </p>
        <a href="/" className="maintenance-button">
          Retour à l'accueil
        </a>
      </div>
    </div>
  );
}
