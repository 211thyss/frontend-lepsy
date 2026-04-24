import "./LegalPages.css";

export function PrivacyPolicy() {
  return (
    <div className="legal-page">
      <div className="legal-container">
        <h1 className="legal-title">Politique de Confidentialité</h1>
        <p className="legal-updated">Dernière mise à jour : {new Date().toLocaleDateString('fr-FR')}</p>

        <section className="legal-section">
          <h2>1. Introduction</h2>
          <p>
            Le cabinet GICHT' Gichtenaere, représenté par Théo Gichtenaere et Cloé Gichtenaere, 
            accorde une importance particulière à la protection de vos données personnelles, 
            notamment les données de santé qui sont considérées comme des données sensibles 
            au sens du Règlement Général sur la Protection des Données (RGPD).
          </p>
          <p>
            Cette politique de confidentialité vous informe sur la manière dont nous collectons, 
            utilisons, stockons et protégeons vos données personnelles dans le cadre de votre 
            accompagnement psychologique.
          </p>
        </section>

        <section className="legal-section">
          <h2>2. Responsable du traitement</h2>
          <div className="legal-info-box">
            <p><strong>Cabinet GICHT' Gichtenaere</strong></p>
            <p>Représenté par : Théo Gichtenaere et Cloé Gichtenaere</p>
            <p>Email : contact@gichtenaere.fr</p>
            <p>Téléphone : +33 1 23 45 67 89</p>
            <p>Adresse : [À définir - Cabinet en cours d'ouverture]</p>
          </div>
        </section>

        <section className="legal-section">
          <h2>3. Données collectées</h2>
          
          <h3>3.1 Données d'identification</h3>
          <ul>
            <li>Nom et prénom</li>
            <li>Date de naissance</li>
            <li>Adresse postale</li>
            <li>Numéro de téléphone</li>
            <li>Adresse email</li>
          </ul>

          <h3>3.2 Données de santé (sensibles)</h3>
          <p className="legal-warning">
            ⚠️ Les données de santé sont des données sensibles bénéficiant d'une protection renforcée.
          </p>
          <ul>
            <li>Informations médicales et psychologiques</li>
            <li>Historique des consultations</li>
            <li>Notes cliniques et observations</li>
            <li>Résultats de tests et bilans neuropsychologiques</li>
            <li>Prescriptions et recommandations thérapeutiques</li>
          </ul>

          <h3>3.3 Données de navigation (site web)</h3>
          <ul>
            <li>Adresse IP</li>
            <li>Type de navigateur</li>
            <li>Pages visitées</li>
            <li>Cookies (avec votre consentement)</li>
          </ul>
        </section>

        <section className="legal-section">
          <h2>4. Finalités du traitement</h2>
          <p>Vos données sont collectées et traitées pour les finalités suivantes :</p>
          <ul>
            <li><strong>Suivi thérapeutique :</strong> Assurer la continuité et la qualité de votre accompagnement psychologique</li>
            <li><strong>Gestion administrative :</strong> Prise de rendez-vous, facturation, gestion du dossier patient</li>
            <li><strong>Obligations légales :</strong> Conservation du dossier médical conformément aux obligations légales</li>
            <li><strong>Communication :</strong> Vous contacter pour confirmer vos rendez-vous ou vous transmettre des informations importantes</li>
            <li><strong>Amélioration des services :</strong> Analyse anonymisée pour améliorer la qualité de nos prestations</li>
          </ul>
        </section>

        <section className="legal-section">
          <h2>5. Base légale du traitement</h2>
          <p>Le traitement de vos données repose sur les bases légales suivantes :</p>
          <ul>
            <li><strong>Consentement explicite :</strong> Pour le traitement des données de santé (Article 9 RGPD)</li>
            <li><strong>Exécution du contrat :</strong> Pour la gestion de votre suivi thérapeutique</li>
            <li><strong>Obligation légale :</strong> Conservation du dossier médical (Code de la santé publique)</li>
            <li><strong>Intérêt légitime :</strong> Amélioration de nos services (données anonymisées)</li>
          </ul>
        </section>

        <section className="legal-section">
          <h2>6. Durée de conservation</h2>
          <div className="legal-info-box">
            <p><strong>Dossier médical :</strong> 20 ans après la dernière consultation (conformément à l'article R.1112-7 du Code de la santé publique)</p>
            <p><strong>Données de facturation :</strong> 10 ans (obligations comptables)</p>
            <p><strong>Données de navigation :</strong> 13 mois maximum</p>
            <p><strong>Consentement cookies :</strong> 13 mois</p>
          </div>
        </section>

        <section className="legal-section">
          <h2>7. Destinataires des données</h2>
          <p>Vos données personnelles sont strictement confidentielles et ne sont accessibles qu'à :</p>
          <ul>
            <li>Les psychologues du cabinet (Théo Gichtenaere, Cloé Gichtenaere)</li>
            <li>Le personnel administratif habilité (sous engagement de confidentialité)</li>
            <li>Les prestataires techniques (hébergement sécurisé, sous contrat de sous-traitance RGPD)</li>
            <li>Les autorités compétentes en cas d'obligation légale</li>
          </ul>
          <p className="legal-warning">
            ⚠️ Nous ne vendons, ne louons et ne partageons jamais vos données avec des tiers à des fins commerciales.
          </p>
        </section>

        <section className="legal-section">
          <h2>8. Sécurité des données</h2>
          <p>Nous mettons en œuvre des mesures techniques et organisationnelles appropriées pour protéger vos données :</p>
          <ul>
            <li>Chiffrement des données sensibles (SSL/TLS)</li>
            <li>Hébergement sécurisé certifié HDS (Hébergeur de Données de Santé)</li>
            <li>Accès restreint et authentification forte</li>
            <li>Sauvegardes régulières et chiffrées</li>
            <li>Politique de mots de passe robuste</li>
            <li>Formation du personnel à la protection des données</li>
            <li>Audits de sécurité réguliers</li>
          </ul>
        </section>

        <section className="legal-section">
          <h2>9. Vos droits</h2>
          <p>Conformément au RGPD, vous disposez des droits suivants :</p>
          
          <h3>9.1 Droit d'accès</h3>
          <p>Vous pouvez obtenir une copie de vos données personnelles.</p>

          <h3>9.2 Droit de rectification</h3>
          <p>Vous pouvez demander la correction de données inexactes ou incomplètes.</p>

          <h3>9.3 Droit à l'effacement ("droit à l'oubli")</h3>
          <p>Vous pouvez demander la suppression de vos données, sauf obligation légale de conservation.</p>

          <h3>9.4 Droit à la limitation du traitement</h3>
          <p>Vous pouvez demander la limitation du traitement de vos données dans certains cas.</p>

          <h3>9.5 Droit à la portabilité</h3>
          <p>Vous pouvez recevoir vos données dans un format structuré et couramment utilisé.</p>

          <h3>9.6 Droit d'opposition</h3>
          <p>Vous pouvez vous opposer au traitement de vos données pour des raisons tenant à votre situation particulière.</p>

          <h3>9.7 Droit de retirer votre consentement</h3>
          <p>Vous pouvez retirer votre consentement à tout moment, sans affecter la licéité du traitement fondé sur le consentement effectué avant le retrait.</p>

          <div className="legal-info-box">
            <p><strong>Pour exercer vos droits :</strong></p>
            <p>Contactez-nous par email : <a href="mailto:contact@gichtenaere.fr">contact@gichtenaere.fr</a></p>
            <p>Ou par courrier : Cabinet GICHT' Gichtenaere, [Adresse à définir]</p>
            <p>Nous vous répondrons dans un délai d'un mois maximum.</p>
          </div>
        </section>

        <section className="legal-section">
          <h2>10. Cookies</h2>
          <p>
            Notre site utilise des cookies pour améliorer votre expérience de navigation. 
            Vous pouvez gérer vos préférences via le bandeau de cookies ou dans les paramètres de votre navigateur.
          </p>
          <p>Types de cookies utilisés :</p>
          <ul>
            <li><strong>Cookies nécessaires :</strong> Indispensables au fonctionnement du site</li>
            <li><strong>Cookies analytiques :</strong> Mesure d'audience (avec votre consentement)</li>
          </ul>
          <p className="legal-warning">
            ⚠️ Aucune donnée de santé n'est collectée via les cookies.
          </p>
        </section>

        <section className="legal-section">
          <h2>11. Transfert de données hors UE</h2>
          <p>
            Vos données sont hébergées en France et ne font l'objet d'aucun transfert hors de l'Union Européenne.
          </p>
        </section>

        <section className="legal-section">
          <h2>12. Réclamation</h2>
          <p>
            Si vous estimez que vos droits ne sont pas respectés, vous pouvez introduire une réclamation auprès de la CNIL :
          </p>
          <div className="legal-info-box">
            <p><strong>Commission Nationale de l'Informatique et des Libertés (CNIL)</strong></p>
            <p>3 Place de Fontenoy - TSA 80715</p>
            <p>75334 PARIS CEDEX 07</p>
            <p>Téléphone : 01 53 73 22 22</p>
            <p>Site web : <a href="https://www.cnil.fr" target="_blank" rel="noopener noreferrer">www.cnil.fr</a></p>
          </div>
        </section>

        <section className="legal-section">
          <h2>13. Modifications</h2>
          <p>
            Nous nous réservons le droit de modifier cette politique de confidentialité à tout moment. 
            Toute modification sera publiée sur cette page avec une nouvelle date de mise à jour.
          </p>
        </section>

        <section className="legal-section">
          <h2>14. Contact</h2>
          <p>
            Pour toute question concernant cette politique de confidentialité ou le traitement de vos données personnelles :
          </p>
          <div className="legal-info-box">
            <p>Email : <a href="mailto:contact@gichtenaere.fr">contact@gichtenaere.fr</a></p>
            <p>Téléphone : <a href="tel:+33123456789">+33 1 23 45 67 89</a></p>
          </div>
        </section>
      </div>
    </div>
  );
}
