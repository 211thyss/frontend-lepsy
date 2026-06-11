import { motion } from "framer-motion";
import { ArrowUpRight, CalendarCheck, CreditCard, SealCheck } from "@phosphor-icons/react";
import "./Tarifs.css";

const tarifs = [
  {
    id: 1,
    category: "Consultations",
    subtitle: "Séances individuelles et familiales",
    variant: "light" as const,
    items: [
      { name: "Consultation initiale (1er RDV / anamnèse)", price: "60€", duration: "45–60 min" },
      { name: "Consultation de suivi (remédiation cognitive, psychothérapie)", price: "60€", duration: "45 min" },
      { name: "Consultation en visioconférence", price: "70€", duration: "45 min" },
      { name: "Consultation le dimanche", price: "80€", duration: "45 min" },
    ],
  },
  {
    id: 2,
    category: "Bilans",
    subtitle: "Évaluations complètes",
    variant: "olive" as const,
    items: [
      { name: "Bilan attentionnel TDAH — Enfant", price: "350€", duration: "Plusieurs séances" },
      { name: "Bilan attentionnel TDAH — Adulte", price: "200€", duration: "Plusieurs séances" },
      { name: "Bilan cognitif (test de QI, dossier MDPH, etc.)", price: "350€", duration: "Plusieurs séances" },
      { name: "Bilan consultation mémoire", price: "350€", duration: "Plusieurs séances" },
      { name: "Bilan fonctionnel (cognition sociale, mémoire, attention, etc.)", price: "350€", duration: "Plusieurs séances" },
      { name: "Bilan neuropsychologique / psychologique complet", price: "500€", duration: "Plusieurs séances" },
    ],
  },
] as const;

const pcoInfo = [
  {
    title: "Qu'est-ce que la PCO ?",
    description:
      "Les plateformes de coordination et d'orientation (PCO) accueillent les enfants dont le développement suscite des inquiétudes, afin d'orienter les familles concernées vers les différents professionnels et structures compétents.",
  },
  {
    title: "Bilans et diagnostic",
    description:
      "Elles permettent de réaliser les bilans complémentaires pour établir un diagnostic le cas échéant, dans un délai raisonnable.",
  },
  {
    title: "Interventions précoces",
    description:
      "Mise en œuvre des interventions pluridisciplinaires adéquates sans attendre le diagnostic, pour accompagner l'enfant dès les premiers signes.",
  },
  {
    title: "Réseau de professionnels",
    description:
      "Elles s'appuient sur un réseau de professionnels libéraux conventionnés : psychologues, psychomotriciens, ergothérapeutes, en liaison avec médecins, orthophonistes, orthoptistes, kinésithérapeutes, etc.",
  },
] as const;

const fadeUp = {
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] as const },
};

export function Tarifs() {
  return (
    <div className="tarifs-page">
      <section className="tarifs-page-pricing" aria-labelledby="tarifs-grid-title">
        <div className="tarifs-page-container">
          <motion.div className="tarifs-page-section-head" {...fadeUp}>
            <h2 id="tarifs-grid-title" className="tarifs-page-section-title">
              <span className="tarifs-page-section-title-plain">Des tarifs </span>
              <span className="tarifs-page-section-title-accent">transparents</span>
            </h2>
            <p className="tarifs-page-section-desc">
              Nos tarifs sont donnés à titre indicatif et peuvent être adaptés selon votre situation.
              N'hésitez pas à en discuter directement avec votre praticien.
            </p>
            <motion.div className="tarifs-page-badges-column" {...fadeUp} transition={{ ...fadeUp.transition, delay: 0.05 }}>
              <div className="tarifs-page-badge">Carte bancaire</div>
              <div className="tarifs-page-badge">Espèce</div>
              <div className="tarifs-page-badge">Chèque</div>
              <div className="tarifs-page-badge">Dispositif Doctolib</div>
            </motion.div>
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
              <span className="tarifs-page-section-title-plain">Plateforme de coordination </span>
              <span className="tarifs-page-section-title-accent">et d'orientation (PCO)</span>
            </h2>
            <p className="tarifs-page-section-desc">
              Un dispositif d'accompagnement précoce pour les enfants présentant des troubles du
              neurodéveloppement.
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
              <strong>Pour en savoir plus :</strong> consultez le site officiel{" "}
              <a 
                href="https://handicap.gouv.fr/les-plateformes-de-coordination-et-dorientation-pco"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: '#2a4538', fontWeight: 600, textDecoration: 'underline' }}
              >
                handicap.gouv.fr
              </a>
              {" "}ou contactez-nous pour vérifier votre éligibilité.
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
