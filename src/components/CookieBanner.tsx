import { useEffect, useState } from "react";
import "./CookieBanner.css";

export function CookieBanner() {
  const [isVisible, setIsVisible] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("cookie-consent");
    if (!consent) {
      setIsVisible(true);
    }
  }, []);

  const acceptAll = () => {
    localStorage.setItem("cookie-consent", JSON.stringify({
      necessary: true,
      analytics: true,
      timestamp: new Date().toISOString()
    }));
    setIsVisible(false);
  };

  const decline = () => {
    localStorage.setItem("cookie-consent", JSON.stringify({
      necessary: true,
      analytics: false,
      timestamp: new Date().toISOString()
    }));
    setIsVisible(false);
  };

  const handlePrivacyClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    window.history.pushState({}, "", "/politique-confidentialite");
    window.dispatchEvent(new PopStateEvent("popstate"));
  };

  if (!isVisible) return null;

  return (
    <div className="cookie-overlay">
      <div className="cookie-card" role="dialog" aria-labelledby="cookie-title" aria-describedby="cookie-desc">
        <span id="cookie-title" className="cookie-title">🍪 Gestion des cookies</span>
        
        <p id="cookie-desc" className="cookie-description">
          Nous utilisons des cookies pour améliorer votre expérience sur notre site. 
          Certains sont essentiels, d'autres nous aident à analyser son utilisation.{" "}
          <a href="/politique-confidentialite" onClick={handlePrivacyClick} className="cookie-policy-link">
            Politique de confidentialité
          </a>
        </p>

        {showDetails && (
          <div className="cookie-details">
            <div className="cookie-category">
              <label className="cookie-category-label">
                <input 
                  type="checkbox" 
                  checked 
                  disabled 
                  aria-label="Cookies nécessaires (obligatoires)"
                />
                <span>Cookies nécessaires (obligatoires)</span>
              </label>
              <p className="cookie-category-desc">
                Indispensables au fonctionnement du site. Permettent la navigation et l'utilisation des fonctionnalités de base.
              </p>
            </div>

            <div className="cookie-category">
              <label className="cookie-category-label">
                <input 
                  type="checkbox" 
                  id="analytics-cookies"
                  aria-label="Cookies analytiques (optionnels)"
                />
                <span>Cookies analytiques (optionnels)</span>
              </label>
              <p className="cookie-category-desc">
                Mesure d'audience et amélioration du site. Aucune donnée de santé collectée.
              </p>
            </div>
          </div>
        )}

        <div className="cookie-actions">
          <button 
            className="cookie-prefs"
            onClick={() => setShowDetails(!showDetails)}
            aria-expanded={showDetails}
          >
            {showDetails ? "Masquer" : "Gérer les préférences"}
          </button>
          
          <button 
            className="cookie-decline"
            onClick={decline}
          >
            Refuser
          </button>
          
          <button 
            className="cookie-accept"
            onClick={acceptAll}
          >
            Accepter
          </button>
        </div>
      </div>
    </div>
  );
}
