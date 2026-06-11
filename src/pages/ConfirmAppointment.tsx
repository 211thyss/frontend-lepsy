import { useEffect, useState } from 'react';
import { CheckCircle, XmarkCircle, Clock } from 'iconoir-react';
import './ConfirmAppointment.css';

export function ConfirmAppointment() {
  const [status, setStatus] = useState<'loading' | 'success' | 'error' | 'expired'>('loading');
  const [message, setMessage] = useState('');
  const [needsAuth, setNeedsAuth] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get('token');

    if (!token) {
      setStatus('error');
      setMessage('Token de confirmation manquant');
      return;
    }

    confirmAppointment(token);
  }, []);

  const confirmAppointment = async (token: string) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL || 'http://localhost:3000'}/api/appointments/confirm/${token}`
      );

      const data = await response.json();

      if (response.ok) {
        setStatus('success');
        setMessage(data.message || 'Votre rendez-vous a été confirmé avec succès!');
        
        // Check if user is logged in
        const authToken = localStorage.getItem('token');
        if (!authToken) {
          setNeedsAuth(true);
          // Redirect to login after 3 seconds
          setTimeout(() => {
            window.location.href = '/login?redirect=/patient/dashboard&appointmentConfirmed=true';
          }, 3000);
        } else {
          // Redirect to patient portal after 3 seconds
          setTimeout(() => {
            window.location.href = '/patient/dashboard';
          }, 3000);
        }
      } else {
        if (data.error?.includes('expiré')) {
          setStatus('expired');
        } else {
          setStatus('error');
        }
        setMessage(data.error || 'Erreur lors de la confirmation');
      }
    } catch (error) {
      console.error('Error confirming appointment:', error);
      setStatus('error');
      setMessage('Une erreur est survenue. Veuillez réessayer.');
    }
  };

  return (
    <div className="confirm-appointment-page">
      <div className="confirm-appointment-container">
        {status === 'loading' && (
          <div className="confirm-status loading">
            <Clock className="confirm-icon spin" strokeWidth={2} />
            <h1>Confirmation en cours...</h1>
            <p>Veuillez patienter</p>
          </div>
        )}

        {status === 'success' && (
          <div className="confirm-status success">
            <CheckCircle className="confirm-icon" strokeWidth={2} />
            <h1>Rendez-vous confirmé !</h1>
            <p>{message}</p>
            {needsAuth ? (
              <div className="confirm-next-steps">
                <p className="next-step-text">
                  Pour accéder à votre espace patient et gérer vos rendez-vous, veuillez vous connecter ou créer un compte.
                </p>
                <p className="redirect-text">Redirection automatique vers la page de connexion...</p>
                <button 
                  className="confirm-btn primary"
                  onClick={() => window.location.href = '/login?redirect=/patient/dashboard&appointmentConfirmed=true'}
                >
                  Se connecter maintenant
                </button>
              </div>
            ) : (
              <div className="confirm-next-steps">
                <p className="next-step-text">
                  Vous allez être redirigé vers votre espace patient...
                </p>
                <button 
                  className="confirm-btn primary"
                  onClick={() => window.location.href = '/patient/dashboard'}
                >
                  Accéder à mon espace
                </button>
              </div>
            )}
          </div>
        )}

        {status === 'expired' && (
          <div className="confirm-status error">
            <XmarkCircle className="confirm-icon" strokeWidth={2} />
            <h1>Lien expiré</h1>
            <p>{message}</p>
            <div className="confirm-next-steps">
              <p className="next-step-text">
                Le lien de confirmation a expiré. Veuillez nous contacter pour reprogrammer votre rendez-vous.
              </p>
              <button 
                className="confirm-btn secondary"
                onClick={() => window.location.href = '/contact'}
              >
                Nous contacter
              </button>
            </div>
          </div>
        )}

        {status === 'error' && (
          <div className="confirm-status error">
            <XmarkCircle className="confirm-icon" strokeWidth={2} />
            <h1>Erreur</h1>
            <p>{message}</p>
            <div className="confirm-next-steps">
              <button 
                className="confirm-btn secondary"
                onClick={() => window.location.href = '/'}
              >
                Retour à l'accueil
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
