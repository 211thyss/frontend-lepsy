import { Wrench } from 'iconoir-react';
import './Maintenance.css';

export function Maintenance() {
  return (
    <div className="maintenance-page">
      <div className="maintenance-container">
        <div className="maintenance-icon">
          <Wrench width={80} height={80} strokeWidth={1.5} />
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
