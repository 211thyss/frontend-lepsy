import { ArrowUpRight } from "@phosphor-icons/react";
import { motion } from "framer-motion";
import "./TarifsSection.css";

const tarifsHighlights = [
  {
    id: 1,
    category: "Consultations",
    items: [
      { name: "Consultation initiale", price: "60€" },
      { name: "Consultation de suivi", price: "60€" },
      { name: "Visioconférence", price: "70€" },
      { name: "Dimanche", price: "80€" },
    ],
    color: "green",
  },
  {
    id: 2,
    category: "Bilans",
    items: [
      { name: "TDAH Enfant", price: "350€" },
      { name: "TDAH Adulte", price: "200€" },
      { name: "Bilan cognitif", price: "350€" },
      { name: "Bilan complet", price: "500€" },
    ],
    color: "olive",
  },
] as const;

export function TarifsSection() {
  return (
    <section className="tarifs-section" id="tarifs" aria-labelledby="tarifs-title">
      <div className="tarifs-section-inner">
        <motion.div
          className="tarifs-header-content"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <h2 id="tarifs-title" className="tarifs-section-title">
            <span className="tarifs-section-title-plain">Des tarifs </span>
            <span className="tarifs-section-title-accent">transparents</span>
          </h2>
          <p className="tarifs-section-subtitle">
            Consultations remboursables avec le dispositif PCO • Paiement CB, chèque et espèce acceptés
          </p>
        </motion.div>

        <div className="tarifs-cards-wrapper">
          {tarifsHighlights.map((tarif, index) => (
            <motion.div
              key={tarif.id}
              className={`tarifs-highlight-card tarifs-highlight-card--${tarif.color}`}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
            >
              <h3 className="tarifs-highlight-category">{tarif.category}</h3>
              <ul className="tarifs-highlight-list">
                {tarif.items.map((item, idx) => (
                  <li key={idx} className="tarifs-highlight-item">
                    <span className="tarifs-highlight-name">{item.name}</span>
                    <span className="tarifs-highlight-dots"></span>
                    <span className="tarifs-highlight-price">{item.price}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}

          <motion.div
            className="tarifs-cta-card"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <div className="tarifs-cta-content">
              <span className="tarifs-cta-label">Tarifs complets</span>
              <h3 className="tarifs-cta-title">Découvrez tous nos tarifs</h3>
              <p className="tarifs-cta-description">
                Bilans, thérapies familiales, remédiation cognitive et informations PCO
              </p>
              <a href="/tarifs" className="tarifs-cta-link">
                Voir la grille tarifaire
                <ArrowUpRight size={20} weight="bold" />
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
