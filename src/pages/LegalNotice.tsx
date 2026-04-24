import "./LegalPages.css";

export function LegalNotice() {
  return (
    <div className="legal-page">
      <div className="legal-container">
        <h1 className="legal-title">Mentions Légales</h1>
        <p className="legal-updated">Dernière mise à jour : {new Date().toLocaleDateString('fr-FR')}</p>

        <section className="legal-section">
          <h2>1. Éditeur du site</h2>
          <div className="legal-info-box">
            <p><strong>Raison sociale :</strong> Cabinet GICHT' Gichtenaere</p>
            <p><strong>Forme juridique :</strong> [À compléter - Ex: Entreprise individuelle / SELARL]</p>
            <p><strong>Adresse :</strong> [À définir - Cabinet en cours d'ouverture]</p>
            <p><strong>Téléphone :</strong> <a href="tel:+33123456789">+33 1 23 45 67 89</a></p>
            <p><strong>Email :</strong> <a href="mailto:contact@gichtenaere.fr">contact@gichtenaere.fr</a></p>
            <p><strong>SIRET :</strong> [À compléter]</p>
          </div>
        </section>

        <section className="legal-section">
          <h2>2. Praticiens</h2>
          
          <h3>2.1 Théo Gichtenaere - Psychologue clinicien</h3>
          <div className="legal-info-box">
            <p><strong>Titre :</strong> Psychologue clinicien</p>
            <p><strong>Numéro ADELI :</strong> [À compléter - Format: XX XXXXXXXX X]</p>
            <p><strong>Diplôme :</strong> Master 2 en Psychologie Clinique</p>
            <p><strong>Université :</strong> [À compléter]</p>
            <p><strong>Année d'obtention :</strong> [À compléter]</p>
            <p><strong>Spécialisation :</strong> Thérapies cognitivo-comportementales, accompagnement des adultes et adolescents</p>
          </div>

          <h3>2.2 Cloé Gichtenaere - Neuropsychologue</h3>
          <div className="legal-info-box">
            <p><strong>Titre :</strong> Neuropsychologue</p>
            <p><strong>Numéro ADELI :</strong> [À compléter - Format: XX XXXXXXXX X]</p>
            <p><strong>Diplôme :</strong> Master 2 en Neuropsychologie</p>
            <p><strong>Université :</strong> [À compléter]</p>
            <p><strong>Année d'obtention :</strong> [À compléter]</p>
            <p><strong>Spécialisation :</strong> Bilans neuropsychologiques, accompagnement personnalisé</p>
          </div>

          <div className="legal-warning">
            <p>
              ℹ️ Le numéro ADELI est un identifiant unique attribué par l'Agence Régionale de Santé (ARS) 
              à tous les professionnels de santé. Il garantit que le praticien est enregistré et autorisé 
              à exercer en France.
            </p>
          </div>
        </section>

        <section className="legal-section">
          <h2>3. Assurance professionnelle</h2>
          <div className="legal-info-box">
            <p><strong>Compagnie d'assurance :</strong> [À compléter - Ex: MACSF, Allianz, AXA]</p>
            <p><strong>Numéro de police :</strong> [À compléter]</p>
            <p><strong>Adresse de l'assureur :</strong> [À compléter]</p>
            <p><strong>Couverture géographique :</strong> France métropolitaine</p>
            <p><strong>Garanties :</strong> Responsabilité civile professionnelle</p>
          </div>
          <p>
            Conformément à l'article L.1142-2 du Code de la santé publique, les psychologues sont tenus 
            de souscrire une assurance de responsabilité civile professionnelle.
          </p>
        </section>

        <section className="legal-section">
          <h2>4. Cadre déontologique</h2>
          
          <h3>4.1 Code de déontologie</h3>
          <p>
            Les psychologues du cabinet respectent le Code de déontologie des psychologues 
            (actualisé en février 2012), qui définit les principes éthiques et les règles 
            professionnelles de la profession.
          </p>

          <h3>4.2 Organismes professionnels</h3>
          <ul>
            <li><strong>FFPP :</strong> Fédération Française des Psychologues et de Psychologie</li>
            <li><strong>SNP :</strong> Syndicat National des Psychologues</li>
          </ul>

          <h3>4.3 Principes fondamentaux</h3>
          <ul>
            <li>Respect de la personne dans sa dimension psychique</li>
            <li>Compétence et formation continue</li>
            <li>Responsabilité et autonomie professionnelle</li>
            <li>Rigueur scientifique et méthodologique</li>
            <li>Respect du secret professionnel</li>
            <li>Indépendance professionnelle</li>
          </ul>
        </section>

        <section className="legal-section">
          <h2>5. Secret professionnel</h2>
          <p>
            Conformément à l'article 226-13 du Code pénal, les psychologues sont tenus au secret 
            professionnel. Toutes les informations communiquées lors des consultations sont strictement 
            confidentielles et ne peuvent être divulguées sans votre consentement explicite, 
            sauf dans les cas prévus par la loi.
          </p>
          <div className="legal-warning">
            <p>
              ⚠️ Exceptions légales au secret professionnel :
            </p>
            <ul>
              <li>Danger imminent pour vous-même ou autrui</li>
              <li>Maltraitance de mineurs ou de personnes vulnérables</li>
              <li>Réquisition judiciaire</li>
            </ul>
          </div>
        </section>

        <section className="legal-section">
          <h2>6. Directeur de publication</h2>
          <div className="legal-info-box">
            <p><strong>Nom :</strong> Théo Gichtenaere</p>
            <p><strong>Qualité :</strong> Co-gérant</p>
            <p><strong>Email :</strong> <a href="mailto:contact@gichtenaere.fr">contact@gichtenaere.fr</a></p>
          </div>
        </section>

        <section className="legal-section">
          <h2>7. Hébergement du site</h2>
          <div className="legal-info-box">
            <p><strong>Hébergeur :</strong> [À compléter - Ex: OVH, Vercel, Netlify]</p>
            <p><strong>Raison sociale :</strong> [À compléter]</p>
            <p><strong>Adresse :</strong> [À compléter]</p>
            <p><strong>Téléphone :</strong> [À compléter]</p>
            <p><strong>Site web :</strong> [À compléter]</p>
          </div>
          <p className="legal-warning">
            ℹ️ L'hébergement des données de santé nécessite une certification HDS 
            (Hébergeur de Données de Santé) conformément à l'article L.1111-8 du Code de la santé publique.
          </p>
        </section>

        <section className="legal-section">
          <h2>8. Conception et développement</h2>
          <div className="legal-info-box">
            <p><strong>Développement :</strong> [À compléter]</p>
            <p><strong>Design :</strong> [À compléter]</p>
          </div>
        </section>

        <section className="legal-section">
          <h2>9. Propriété intellectuelle</h2>
          <p>
            L'ensemble du contenu de ce site (textes, images, vidéos, logos, graphismes, etc.) 
            est la propriété exclusive du Cabinet GICHT' Gichtenaere, sauf mention contraire.
          </p>
          <p>
            Toute reproduction, représentation, modification, publication ou adaptation de tout 
            ou partie des éléments du site, quel que soit le moyen ou le procédé utilisé, est 
            interdite sans l'autorisation écrite préalable du cabinet.
          </p>
          <p>
            Toute exploitation non autorisée du site ou de l'un des éléments qu'il contient sera 
            considérée comme constitutive d'une contrefaçon et poursuivie conformément aux 
            dispositions des articles L.335-2 et suivants du Code de la Propriété Intellectuelle.
          </p>
        </section>

        <section className="legal-section">
          <h2>10. Liens hypertextes</h2>
          <p>
            Le site peut contenir des liens vers d'autres sites internet. Le Cabinet GICHT' Gichtenaere 
            n'exerce aucun contrôle sur ces sites et décline toute responsabilité quant à leur contenu.
          </p>
          <p>
            La création de liens hypertextes vers le site www.gichtenaere.fr nécessite une autorisation 
            préalable écrite.
          </p>
        </section>

        <section className="legal-section">
          <h2>11. Limitation de responsabilité</h2>
          <p>
            Le Cabinet GICHT' Gichtenaere s'efforce d'assurer l'exactitude et la mise à jour des 
            informations diffusées sur ce site. Toutefois, il ne peut garantir l'exactitude, 
            la précision ou l'exhaustivité des informations mises à disposition.
          </p>
          <p>
            Le cabinet ne pourra être tenu responsable des dommages directs ou indirects résultant 
            de l'utilisation du site ou de l'impossibilité d'y accéder.
          </p>
          <p className="legal-warning">
            ⚠️ Les informations présentes sur ce site ne remplacent pas une consultation 
            avec un professionnel de santé.
          </p>
        </section>

        <section className="legal-section">
          <h2>12. Tarifs et modalités de paiement</h2>
          <div className="legal-info-box">
            <p><strong>Consultation individuelle :</strong> [À compléter] €</p>
            <p><strong>Consultation de couple :</strong> [À compléter] €</p>
            <p><strong>Bilan neuropsychologique :</strong> [À compléter] €</p>
            <p><strong>Durée de consultation :</strong> [À compléter] minutes</p>
          </div>
          <p>
            <strong>Moyens de paiement acceptés :</strong> Espèces, chèque, virement bancaire, [carte bancaire si applicable]
          </p>
          <p>
            <strong>Remboursement :</strong> Les consultations avec un psychologue ne sont généralement pas 
            remboursées par la Sécurité sociale. Certaines mutuelles proposent une prise en charge partielle. 
            Nous vous invitons à vous renseigner auprès de votre mutuelle.
          </p>
          <p>
            <strong>Annulation :</strong> Toute consultation non annulée au moins 48h à l'avance pourra être facturée.
          </p>
        </section>

        <section className="legal-section">
          <h2>13. Droit applicable et juridiction</h2>
          <p>
            Les présentes mentions légales sont régies par le droit français. En cas de litige, 
            et après tentative de recherche d'une solution amiable, les tribunaux français seront 
            seuls compétents.
          </p>
        </section>

        <section className="legal-section">
          <h2>14. Médiation</h2>
          <p>
            Conformément à l'article L.612-1 du Code de la consommation, en cas de litige, vous pouvez 
            recourir gratuitement à un médiateur de la consommation :
          </p>
          <div className="legal-info-box">
            <p><strong>Médiateur de la consommation :</strong> [À compléter]</p>
            <p><strong>Adresse :</strong> [À compléter]</p>
            <p><strong>Site web :</strong> [À compléter]</p>
          </div>
        </section>

        <section className="legal-section">
          <h2>15. Contact</h2>
          <p>
            Pour toute question concernant ces mentions légales :
          </p>
          <div className="legal-info-box">
            <p>Email : <a href="mailto:contact@gichtenaere.fr">contact@gichtenaere.fr</a></p>
            <p>Téléphone : <a href="tel:+33123456789">+33 1 23 45 67 89</a></p>
            <p>Adresse : [À définir - Cabinet en cours d'ouverture]</p>
          </div>
        </section>
      </div>
    </div>
  );
}
