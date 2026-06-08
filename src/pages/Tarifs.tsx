import { motion } from "framer-motion";
import { ArrowUpRight, CalendarCheck, CreditCard, SealCheck } from "@phosphor-icons/react";
import "./Tarifs.css";

const tarifs = [
  {
    id: 1,
    category: "Bilans",
    subtitle: "Psychologiques & neuropsychologiques",
    variant: "light" as const,
    items: [
      { name: "Bilan psychologique complet", price: "300€", duration: "Plusieurs séances" },
      { name: "Bilan neuropsychologique", price: "350€", duration: "Plusieurs séances" },
      { name: "Bilan TDAH", price: "320€", duration: "Plusieurs séances" },
      { name: "Bilan autisme (TSA)", price: "380€", duration: "Plusieurs séances" },
      { name: "Consultation mémoire", price: "280€", duration: "Plusieurs séances" },
    ],
  },
  {
    id: 2,
    category: "Suivis",
    subtitle: "Consultations individuelles",
    variant: "olive" as const,
    items: [
      { name: "Séance adulte", price: "60€", duration: "45–50 min" },
      { name: "Séance enfant / ado", price: "55€", duration: "45 min" },
      { name: "Remédiation cognitive", price: "65€", duration: "45–50 min" },
    ],
  },
  {
    id: 3,
    category: "Couple",
    subtitle: "Thérapie de couple",
    variant: "sage" as const,
    items: [{ name: "Séance de couple", price: "80€", duration: "60 min" }],
  },
  {
    id: 4,
    category: "Famille",
    subtitle: "Thérapie familiale",
    variant: "mint" as const,
    items: [{ name: "Séance familiale", price: "90€", duration: "60 min" }],
  },
] as const;

const pcoInfo = [
  {
    title: "Qu'est-ce que la PCO ?",
    description:
      "La Prise en Charge Obligatoire permet un remboursement partiel de vos consultations par l'Assurance Maladie.",
  },
  {
    title: "Conditions d'accès",
    description:
      "Sur orientation de votre médecin traitant, vous pouvez bénéficier de 8 séances remboursées par an.",
  },
  {
    title: "Remboursement",
    description:
      "60 % pris en charge par l'Assurance Maladie, complété par votre mutuelle selon votre contrat.",
  },
  {
    title: "Comment en bénéficier ?",
    description:
      "Parlez-en à votre médecin traitant, qui vous orientera vers un psychologue partenaire du dispositif.",
  },
] as const;

const paymentBadges = ["Carte bancaire", "Chèque", "Dispositif PCO"] as const;

const fadeUp = {
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] as const },
};

export function Tarifs() {
  return (
    <div className="tarifs-page">
      <header className="tarifs-page-hero">
        <div className="tarifs-page-hero-inner">
          <motion.p className="tarifs-page-eyebrow" {...fadeUp}>
            GITCH&apos; · Gichtenaere
          </motion.p>
          <motion.h1 className="tarifs-page-title" {...fadeUp} transition={{ ...fadeUp.transition, delay: 0.05 }}>
            <span className="tarifs-page-title-plain">Des tarifs </span>
            <span className="tarifs-page-title-accent">transparents</span>
          </motion.h1>
          <motion.p className="tarifs-page-lead" {...fadeUp} transition={{ ...fadeUp.transition, delay: 0.1 }}>
            Consultations, bilans et accompagnements — des prix clairs, sans surprise. Paiement par carte
            bancaire ou chèque.
          </motion.p>
          <motion.ul className="tarifs-page-badges" {...fadeUp} transition={{ ...fadeUp.transition, delay: 0.15 }}>
            {paymentBadges.map((badge) => (
              <li key={badge} className="tarifs-page-badge">
                {badge}
              </li>
            ))}
          </motion.ul>
        </div>
      </header>

      <section className="tarifs-page-pricing" aria-labelledby="tarifs-grid-title">
        <div className="tarifs-page-container">
          <motion.div className="tarifs-page-section-head" {...fadeUp}>
            <h2 id="tarifs-grid-title" className="tarifs-page-section-title">
              <span className="tarifs-page-section-title-plain">Grille </span>
              <span className="tarifs-page-section-title-accent">tarifaire</span>
            </h2>
            <p className="tarifs-page-section-desc">
              Tous les tarifs sont indiqués TTC. Les bilans s&apos;étalent sur plusieurs séances selon
              votre situation.
            </p>
          </motion.div>

          <div className="tarifs-page-grid">
            {tarifs.map((tarif, index) => (
              <motion.article
                key={tarif.id}
                className={`tarifs-page-card tarifs-page-card--${tarif.variant}`}
                initial={{ opacity: 0, y: 36 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] as const }}
              >
                <div className="tarifs-page-card-head">
                  <h3 className="tarifs-page-card-category">{tarif.category}</h3>
                  <p className="tarifs-page-card-subtitle">{tarif.subtitle}</p>
                </div>
                <ul className="tarifs-page-card-list">
                  {tarif.items.map((item) => (
                    <li key={item.name} className="tarifs-page-card-item">
                      <div className="tarifs-page-item-info">
                        <span className="tarifs-page-item-name">{item.name}</span>
                        <span className="tarifs-page-item-duration">{item.duration}</span>
                      </div>
                      <span className="tarifs-page-item-dots" aria-hidden />
                      <span className="tarifs-page-item-price">{item.price}</span>
                    </li>
                  ))}
                </ul>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <section className="tarifs-page-pco" aria-labelledby="tarifs-pco-title">
        <div className="tarifs-page-container">
          <motion.div className="tarifs-page-section-head" {...fadeUp}>
            <div className="tarifs-page-pco-label">
              <SealCheck size={18} weight="duotone" aria-hidden />
              Remboursement
            </div>
            <h2 id="tarifs-pco-title" className="tarifs-page-section-title">
              <span className="tarifs-page-section-title-plain">Prise en charge </span>
              <span className="tarifs-page-section-title-accent">obligatoire</span>
            </h2>
            <p className="tarifs-page-section-desc">
              Certaines consultations peuvent être partiellement remboursées dans le cadre du dispositif
              PCO.
            </p>
          </motion.div>

          <div className="tarifs-page-pco-grid">
            {pcoInfo.map((info, index) => (
              <motion.div
                key={info.title}
                className="tarifs-page-pco-card"
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.45, delay: index * 0.07, ease: [0.22, 1, 0.36, 1] as const }}
              >
                <span className="tarifs-page-pco-index">0{index + 1}</span>
                <h3 className="tarifs-page-pco-card-title">{info.title}</h3>
                <p className="tarifs-page-pco-card-desc">{info.description}</p>
              </motion.div>
            ))}
          </div>

          <motion.aside className="tarifs-page-pco-note" {...fadeUp}>
            <CreditCard size={22} weight="duotone" aria-hidden />
            <p>
              <strong>Bon à savoir :</strong> pour vérifier votre éligibilité au dispositif PCO,
              contactez-nous ou parlez-en à votre médecin traitant.
            </p>
          </motion.aside>
        </div>
      </section>

      <section className="tarifs-page-cta" aria-labelledby="tarifs-cta-title">
        <div className="tarifs-page-container">
          <motion.div
            className="tarifs-page-cta-card"
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] as const }}
          >
            <CalendarCheck size={44} weight="duotone" className="tarifs-page-cta-icon" aria-hidden />
            <h2 id="tarifs-cta-title" className="tarifs-page-cta-title">
              Prêt à prendre rendez-vous ?
            </h2>
            <p className="tarifs-page-cta-desc">
              Réservez votre consultation en ligne via Doctolib, ou écrivez-nous directement.
            </p>
            <div className="tarifs-page-cta-actions">
              <a
                href="https://www.doctolib.fr"
                target="_blank"
                rel="noopener noreferrer"
                className="tarifs-page-cta-primary"
              >
                Prendre rendez-vous
                <ArrowUpRight size={20} weight="bold" aria-hidden />
              </a>
              <a href="/#contact" className="tarifs-page-cta-secondary">
                Nous écrire
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
