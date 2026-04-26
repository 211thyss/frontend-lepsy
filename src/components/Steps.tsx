import { ArrowRight } from "@phosphor-icons/react";
import "./Steps.css";

const cards = [
  {
    title: "Remplissez le formulaire",
    description:
      "Remplissez le formulaire en ligne. Une personne vous rappelle pour vous orienter simplement.",
    bg: "#4a6630",
    textColor: "#ffffff",
    iconSrc: "/icons/icon_3_3d-1-276x300.png",
    showArrow: true,
    variant: "dark" as const,
  },
  {
    title: "Trouver la bonne personne pour vous",
    description:
      "Une personne vous aide à trouver quelqu'un qui vous correspond et qui a un créneau pour vous.",
    bg: "#8aad6e",
    textColor: "#1e2e19",
    iconSrc: "/icons/icon_2_3d-2.png",
    showArrow: false,
    variant: "light" as const,
  },
  {
    title: "Assister à votre premier rendez-vous",
    description:
      "Lors du premier rendez-vous, vous parlez de vous et vous voyez ensemble la suite des séances.",
    bg: "#cdddb8",
    textColor: "#1e2e19",
    iconSrc: "/icons/icon_1_3d-1.png",
    showArrow: false,
    variant: "light" as const,
  },
] as const;

export function Steps() {
  return (
    <section className="steps" id="etapes" aria-labelledby="steps-title">
      <div className="steps-inner">
        <h2 id="steps-title" className="steps-title">
          <span className="steps-title-plain">Quelques étapes pour </span>
          <span className="steps-title-accent">commencer</span>
        </h2>

        <ul className="steps-grid">
          {cards.map((card) => {
            return (
              <li
                key={card.title}
                className={
                  card.variant === "dark"
                    ? "steps-card steps-card--dark"
                    : "steps-card"
                }
                style={{ backgroundColor: card.bg, color: card.textColor }}
              >
                <img 
                  src={card.iconSrc} 
                  alt="" 
                  className="steps-card-icon"
                  loading="lazy"
                  aria-hidden="true"
                />
                <div className="steps-card-body">
                  <h3 className="steps-card-title">{card.title}</h3>
                  <p className="steps-card-desc">{card.description}</p>
                </div>
                {card.showArrow ? (
                  <a className="steps-card-arrow" href="#contact" aria-label="Passer à l'étape suivante">
                    <ArrowRight size={22} weight="bold" aria-hidden />
                  </a>
                ) : null}
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
