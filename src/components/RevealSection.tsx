import "./RevealSection.css";

export function RevealSection() {
  return (
    <section className="reveal-section">
      <div className="reveal-content">
        <h2 className="reveal-title">
          <span className="reveal-title-accent">Prêt à commencer</span>
          <span className="reveal-title-plain"> votre parcours ?</span>
        </h2>
        <p className="reveal-description">
          Prenez rendez-vous dès maintenant et faites le premier pas vers un mieux-être durable.
        </p>
        <a href="/prendre-rdv" className="reveal-cta">
          Prendre rendez-vous
        </a>
      </div>
    </section>
  );
}
