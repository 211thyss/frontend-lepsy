import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { NavArrowLeft, NavArrowRight } from "iconoir-react";
import "./Providers.css";

const providers = [
  {
    id: 1,
    name: "Théo Gichtenaere",
    title: "Psychologue clinicien",
    description: "Théo a rejoint le cabinet en 2018 et possède une expertise approfondie dans l'accompagnement des adultes et adolescents. Spécialisé dans les thérapies cognitivo-comportementales, il propose une approche intégrative et bienveillante pour vous aider à surmonter vos difficultés et retrouver un équilibre de vie durable.",
    specialties: ["TCC", "Adultes", "Adolescents", "Anxiété", "Dépression"],
    avatar: "/providers/theo-avatar.jpg",
    image: "/providers/theo-full.png",
  },
  {
    id: 2,
    name: "Cloé Gichtenaere",
    title: "Neuropsychologue",
    description: "Cloé est neuropsychologue diplômée depuis 2015. Passionnée par le fonctionnement cognitif et les neurosciences, elle propose des bilans neuropsychologiques complets et un accompagnement personnalisé. Son approche vise à optimiser vos capacités cognitives et à mieux comprendre votre fonctionnement unique.",
    specialties: ["Neuropsychologie", "Bilans cognitifs", "Attention", "Mémoire"],
    avatar: "/providers/cloe-avatar.jpg",
    image: "/providers/cloe-full.jpg",
  },
] as const;

export function Providers() {
  const [activeId, setActiveId] = useState(1);
  const [direction, setDirection] = useState(0);
  const activeProvider = providers.find((p) => p.id === activeId) || providers[0];
  const activeIndex = providers.findIndex((p) => p.id === activeId);

  const handlePrev = () => {
    setDirection(-1);
    const newIndex = activeIndex === 0 ? providers.length - 1 : activeIndex - 1;
    setActiveId(providers[newIndex].id);
  };

  const handleNext = () => {
    setDirection(1);
    const newIndex = activeIndex === providers.length - 1 ? 0 : activeIndex + 1;
    setActiveId(providers[newIndex].id);
  };

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.8,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
    },
    exit: (direction: number) => ({
      x: direction > 0 ? -1000 : 1000,
      opacity: 0,
      scale: 0.8,
    }),
  };

  return (
    <section className="providers" id="equipe" aria-labelledby="providers-title">
      <div className="providers-inner">
        <motion.div
          className="providers-header"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <h2 id="providers-title" className="providers-title">
            <span className="providers-title-plain">Rencontrez </span>
            <span className="providers-title-accent">notre équipe</span>
          </h2>
          <p className="providers-subtitle">
            Des professionnels passionnés à votre écoute
          </p>
        </motion.div>

        <div className="providers-card-wrapper">
          <motion.button
            className="providers-nav providers-nav--prev"
            onClick={handlePrev}
            aria-label="Profil précédent"
            whileHover={{ scale: 1.1, x: -4 }}
            whileTap={{ scale: 0.95 }}
          >
            <NavArrowLeft strokeWidth={2.5} />
          </motion.button>

          <motion.button
            className="providers-nav providers-nav--next"
            onClick={handleNext}
            aria-label="Profil suivant"
            whileHover={{ scale: 1.1, x: 4 }}
            whileTap={{ scale: 0.95 }}
          >
            <NavArrowRight strokeWidth={2.5} />
          </motion.button>

          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={activeProvider.id}
              className="providers-card"
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: "spring", stiffness: 200, damping: 25 },
                opacity: { duration: 0.4 },
                scale: { duration: 0.4 },
              }}
            >
              <div className="providers-card-grid">
                <motion.div
                  className="providers-card-content"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.5 }}
                >
                  <div className="providers-card-badge">
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
                    >
                      ✨
                    </motion.span>
                  </div>
                  
                  <h3 className="providers-card-name">{activeProvider.name}</h3>
                  <p className="providers-card-title">{activeProvider.title}</p>
                  
                  <div className="providers-card-specialties">
                    {activeProvider.specialties.map((specialty, index) => (
                      <motion.span
                        key={specialty}
                        className="providers-specialty-tag"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.3 + index * 0.1 }}
                      >
                        {specialty}
                      </motion.span>
                    ))}
                  </div>
                  
                  <p className="providers-card-description">{activeProvider.description}</p>
                  
                  <motion.a
                    href="/prendre-rdv"
                    className="providers-card-cta"
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Prendre rendez-vous
                  </motion.a>
                </motion.div>

                <motion.div
                  className="providers-card-image-wrapper"
                  initial={{ opacity: 0, scale: 0.9, rotate: -5 }}
                  animate={{ opacity: 1, scale: 1, rotate: 0 }}
                  transition={{ delay: 0.3, duration: 0.6 }}
                >
                  <div className="providers-image-decoration" />
                  <img
                    src={activeProvider.image}
                    alt={activeProvider.name}
                    className="providers-card-image"
                  />
                </motion.div>
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="providers-dots">
            {providers.map((provider, index) => (
              <motion.button
                key={provider.id}
                className={`providers-dot ${activeId === provider.id ? "active" : ""}`}
                onClick={() => {
                  setDirection(index > activeIndex ? 1 : -1);
                  setActiveId(provider.id);
                }}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
                aria-label={`Voir ${provider.name}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
