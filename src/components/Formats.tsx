import { ArrowUpRight } from "@phosphor-icons/react";
import "./Formats.css";

const formats = [
  {
    id: 1,
    title: "Entretiens individuels, de couple et familiaux",
    subtitle: "Centré sur vous",
    description:
      "Enfants, adolescents, adultes et personnes âgées. Troubles du sommeil, anxiété, dépression, phobies, burn-out, TOC, deuil, difficultés scolaires ou relationnelles, traumatisme, et autres problématiques rencontrées au cours de la vie.",
    icon: "👤",
    variant: "light" as const,
  },
  {
    id: 2,
    title: "Bilans psychologiques et neuropsychologiques",
    subtitle: "Évaluations complètes",
    description:
      "Bilans psychologiques et neuropsychologiques pour enfants, adolescents, adultes et personnes vieillissantes — TDAH, autisme (TSA), bilan global, bilan cognitif et remédiation cognitive.",
    icon: "👥",
    variant: "dark" as const,
  },
] as const;

export function Formats() {
  return (
    <section className="formats" id="formats" aria-labelledby="formats-title">
      <div className="formats-inner">
        <h2 id="formats-title" className="formats-title">
          <span className="formats-title-plain">Formats </span>
          <span className="formats-title-accent">d'accompagnement</span>
        </h2>

        <div className="formats-grid">
          {formats.map((format) => (
            <div
              key={format.id}
              className={
                format.variant === "dark"
                  ? "formats-card formats-card--dark"
                  : "formats-card"
              }
            >
              <div className="formats-card-icon" aria-hidden="true">{format.icon}</div>
              
              <div className="formats-card-content">
                <h3 className="formats-card-title">{format.title}</h3>
                <span className="formats-card-subtitle">{format.subtitle}</span>
                <p className="formats-card-description">{format.description}</p>
              </div>

              <button className="formats-card-arrow" aria-label={`En savoir plus sur l'accompagnement ${format.title.toLowerCase()}`}>
                <ArrowUpRight size={24} weight="bold" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
