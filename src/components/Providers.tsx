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
      x: direction > 0 ? 100 : -100,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction > 0 ? -100 : 100,
      opacity: 0,
    }),
  };

  return (
    <section className="providers" id="equipe" aria-labelledby="providers-title">
      <div className="providers-inner">
        <motion.h2 
          id="providers-title" 
          className="providers-title"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <span className="providers-title-plain">Rencontrez </span>
          <span className="providers-title-accent">notre équipe</span>
        </motion.h2>

        <div className="providers-card">
          <motion.button
            className="providers-nav providers-nav--prev"
            onClick={handlePrev}
            aria-label="Profil précédent"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <NavArrowLeft strokeWidth={2.5} />
          </motion.button>

          <motion.button
            className="providers-nav providers-nav--next"
            onClick={handleNext}
            aria-label="Profil suivant"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <NavArrowRight strokeWidth={2.5} />
          </motion.button>

          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={activeProvider.id}
              className="providers-card-content"
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: "spring", stiffness: 300, damping: 30 },
                opacity: { duration: 0.3 },
              }}
            >
              <motion.div 
                className="providers-card-text"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.5 }}
              >
                <h3 className="providers-card-name">{activeProvider.name}</h3>
                <p className="providers-card-title">{activeProvider.title}</p>
                <p className="providers-card-description">{activeProvider.description}</p>
              </motion.div>

              <motion.div 
                className="providers-card-image-wrapper"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3, duration: 0.5 }}
              >
                <img
                  src={activeProvider.image}
                  alt={activeProvider.name}
                  className="providers-card-image"
                />
              </motion.div>
            </motion.div>
          </AnimatePresence>

          <div className="providers-avatars">
            {providers.map((provider, index) => (
              <motion.button
                key={provider.id}
                className={
                  activeId === provider.id
                    ? "providers-avatar providers-avatar--active"
                    : "providers-avatar"
                }
                onClick={() => {
                  setDirection(index > activeIndex ? 1 : -1);
                  setActiveId(provider.id);
                }}
                aria-label={`Voir le profil de ${provider.name}`}
                whileHover={{ y: -4 }}
                whileTap={{ scale: 0.95 }}
              >
                <motion.img
                  src={provider.avatar}
                  alt={`Photo de ${provider.name}`}
                  className="providers-avatar-image"
                  loading="lazy"
                  animate={{
                    scale: activeId === provider.id ? 1.08 : 1,
                  }}
                  transition={{ duration: 0.3 }}
                />
                <span className="providers-avatar-name">{provider.name.split(' ')[0]}</span>
                <span className="providers-avatar-title">{provider.title}</span>
              </motion.button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
