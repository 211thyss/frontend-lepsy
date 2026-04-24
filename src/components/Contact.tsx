import { useState } from "react";
import "./Contact.css";

export function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Ici tu peux ajouter l'envoi du formulaire vers un backend
    console.log("Form submitted:", formData);
    setIsSubmitted(true);
    
    // Reset après 3 secondes
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({ name: "", email: "", phone: "", message: "" });
    }, 3000);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <section className="contact" id="contact" aria-labelledby="contact-title">
      <div className="contact-inner">
        <div className="contact-content">
          <div className="contact-info">
            <h2 id="contact-title" className="contact-title">
              <span className="contact-title-plain">Prenons </span>
              <span className="contact-title-accent">contact</span>
            </h2>
            <p className="contact-description">
              Vous souhaitez commencer un accompagnement ou simplement poser une question ? 
              Remplissez ce formulaire et nous vous recontacterons dans les plus brefs délais.
            </p>

            <div className="contact-details">
              <div className="contact-detail-item">
                <h3 className="contact-detail-label">Adresse</h3>
                <p className="contact-detail-text">
                  Cabinet en cours d'ouverture<br />
                  <span style={{ fontSize: '0.9em', opacity: 0.7 }}>L'adresse sera communiquée prochainement</span>
                </p>
              </div>

              <div className="contact-detail-item">
                <h3 className="contact-detail-label">Téléphone</h3>
                <p className="contact-detail-text">
                  <a href="tel:+33123456789" className="contact-link">
                    +33 1 23 45 67 89
                  </a>
                </p>
              </div>

              <div className="contact-detail-item">
                <h3 className="contact-detail-label">Email</h3>
                <p className="contact-detail-text">
                  <a href="mailto:contact@gichtenaere.fr" className="contact-link">
                    contact@gichtenaere.fr
                  </a>
                </p>
              </div>

              <div className="contact-detail-item">
                <h3 className="contact-detail-label">Horaires</h3>
                <p className="contact-detail-text">
                  À définir<br />
                  <span style={{ fontSize: '0.9em', opacity: 0.7 }}>Nous vous informerons dès l'ouverture</span>
                </p>
              </div>
            </div>
          </div>

          <div className="contact-form-wrapper">
            <div aria-live="polite" aria-atomic="true">
              {isSubmitted ? (
                <div className="contact-success" role="status">
                  <div className="contact-success-icon" aria-hidden="true">✓</div>
                  <h3 className="contact-success-title">Message envoyé !</h3>
                  <p className="contact-success-text">
                    Nous vous recontacterons très prochainement.
                  </p>
                </div>
              ) : (
                <form className="contact-form" onSubmit={handleSubmit}>
                  <div className="contact-form-group">
                    <label htmlFor="name" className="contact-label">
                      Nom complet
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="contact-input"
                      required
                      aria-required="true"
                    />
                  </div>

                  <div className="contact-form-row">
                    <div className="contact-form-group">
                      <label htmlFor="email" className="contact-label">
                        Email
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="contact-input"
                        required
                        aria-required="true"
                      />
                    </div>

                    <div className="contact-form-group">
                      <label htmlFor="phone" className="contact-label">
                        Téléphone
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="contact-input"
                        aria-required="false"
                      />
                    </div>
                  </div>

                  <div className="contact-form-group">
                    <label htmlFor="message" className="contact-label">
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      className="contact-textarea"
                      rows={5}
                      required
                      aria-required="true"
                    />
                  </div>

                  <button type="submit" className="contact-submit">
                    Envoyer le message
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
