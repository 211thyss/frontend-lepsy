import { useState } from "react";
import { ArrowLeft, ArrowRight } from "@phosphor-icons/react";
import "./Providers.css";

const providers = [
  {
    id: 1,
    name: "Théo Gichtenaere",
    title: "Psychologue clinicien",
    description: "Théo a rejoint le cabinet en 2018 et possède une expertise approfondie dans l'accompagnement des adultes et adolescents. Spécialisé dans les thérapies cognitivo-comportementales, il propose une approche intégrative et bienveillante pour vous aider à surmonter vos difficultés et retrouver un équilibre de vie durable.",
    avatar: "/providers/theo-avatar.jpg",
    image: "/providers/theo-full.png",
  },
  {
    id: 2,
    name: "Cloé Gichtenaere",
    title: "Neuropsychologue",
    description: "Cloé est neuropsychologue diplômée depuis 2015. Passionnée par le fonctionnement cognitif et les neurosciences, elle propose des bilans neuropsychologiques complets et un accompagnement personnalisé. Son approche vise à optimiser vos capacités cognitives et à mieux comprendre votre fonctionnement unique.",
    avatar: "/providers/cloe-avatar.jpg",
    image: "/providers/cloe-full.jpg",
  },
] as const;

export function Providers() {
  const [activeId, setActiveId] = useState(1);
  const activeProvider = providers.find((p) => p.id === activeId) || providers[0];
  const activeIndex = providers.findIndex((p) => p.id === activeId);

  const handlePrev = () => {
    const newIndex = activeIndex === 0 ? providers.length - 1 : activeIndex - 1;
    setActiveId(providers[newIndex].id);
  };

  const handleNext = () => {
    const newIndex = activeIndex === providers.length - 1 ? 0 : activeIndex + 1;
    setActiveId(providers[newIndex].id);
  };

  return (
    <section className="providers" id="equipe" aria-labelledby="providers-title">
      <div className="providers-inner">
        <h2 id="providers-title" className="providers-title">
          <span className="providers-title-plain">Rencontrez </span>
          <span className="providers-title-accent">notre équipe</span>
        </h2>

        <div className="providers-card">
          <button
            className="providers-nav providers-nav--prev"
            onClick={handlePrev}
            aria-label="Profil précédent"
          >
            <ArrowLeft size={28} weight="bold" />
          </button>

          <button
            className="providers-nav providers-nav--next"
            onClick={handleNext}
            aria-label="Profil suivant"
          >
            <ArrowRight size={28} weight="bold" />
          </button>

          <div className="providers-card-content" key={activeProvider.id}>
            <div className="providers-card-text">
              <h3 className="providers-card-name">{activeProvider.name}</h3>
              <p className="providers-card-title">{activeProvider.title}</p>
              <p className="providers-card-description">{activeProvider.description}</p>
            </div>

            <div className="providers-card-image-wrapper">
              <img
                src={activeProvider.image}
                alt={activeProvider.name}
                className="providers-card-image"
              />
            </div>
          </div>

          <div className="providers-avatars">
            {providers.map((provider) => (
              <button
                key={provider.id}
                className={
                  activeId === provider.id
                    ? "providers-avatar providers-avatar--active"
                    : "providers-avatar"
                }
                onClick={() => setActiveId(provider.id)}
                aria-label={`Voir le profil de ${provider.name}`}
              >
                <img
                  src={provider.avatar}
                  alt={`Photo de ${provider.name}`}
                  className="providers-avatar-image"
                  loading="lazy"
                />
                <span className="providers-avatar-name">{provider.name.split(' ')[0]}</span>
                <span className="providers-avatar-title">{provider.title}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
