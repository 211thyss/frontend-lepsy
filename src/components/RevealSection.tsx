import { motion } from "framer-motion";
import "./RevealSection.css";

export function RevealSection() {
  return (
    <section className="reveal-section">
      <motion.div 
        className="reveal-content"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <motion.h2 
          className="reveal-title"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <span className="reveal-title-plain">Prêt à commencer </span>
          <span className="reveal-title-accent">votre parcours ?</span>
        </motion.h2>
        
        <motion.p 
          className="reveal-description"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          Prenez rendez-vous dès maintenant et faites le premier pas vers un mieux-être durable.
        </motion.p>
        
        <motion.a 
          href="/prendre-rdv" 
          className="reveal-cta"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.6 }}
          whileHover={{ scale: 1.05, y: -2 }}
          whileTap={{ scale: 0.98 }}
        >
          Prendre rendez-vous
        </motion.a>
      </motion.div>
    </section>
  );
}
