import "./FormatsAccompagnement.css";

export function FormatsAccompagnement() {
  return (
    <main className="formats-accompagnement-page">
        <div className="formats-accompagnement-container">
          <header className="formats-accompagnement-header">
            <h1 className="formats-accompagnement-title">
              <span className="formats-accompagnement-title-plain">Formats </span>
              <span className="formats-accompagnement-title-accent">d'accompagnement</span>
            </h1>
            <p className="formats-accompagnement-subtitle">
              Découvrez nos différents types d'accompagnement adaptés à vos besoins
            </p>
          </header>

          {/* Bilans psychologiques et neuropsychologiques */}
          <section className="formats-section" id="bilans">
            <h2 className="formats-section-title">Bilans psychologiques et neuropsychologiques</h2>
            
            <div className="formats-publics">
              <h3 className="formats-subtitle">Par public</h3>
              <ul className="formats-list formats-list-grid">
                <li className="formats-public-card">Enfant</li>
                <li className="formats-public-card">Adolescent</li>
                <li className="formats-public-card">Adulte</li>
                <li className="formats-public-card">Personne vieillissante</li>
              </ul>
            </div>

            <div className="formats-types">
              <h3 className="formats-subtitle">Types de bilans proposés</h3>
              <div className="formats-cards-grid">
                <div className="formats-bilan-card" id="bilan-tdah">
                  <h4 className="formats-bilan-title">Bilan TDAH</h4>
                  <p className="formats-bilan-desc">
                    Évaluation complète du trouble du déficit de l'attention avec ou sans hyperactivité.
                  </p>
                </div>

                <div className="formats-bilan-card" id="bilan-autisme">
                  <h4 className="formats-bilan-title">Bilan autisme (TSA)</h4>
                  <p className="formats-bilan-desc">
                    Diagnostic des troubles du spectre autistique.
                  </p>
                </div>

                <div className="formats-bilan-card">
                  <h4 className="formats-bilan-title">Bilan psychologique</h4>
                  <p className="formats-bilan-desc">
                    Évaluation complète du fonctionnement psychologique.
                  </p>
                </div>

                <div className="formats-bilan-card">
                  <h4 className="formats-bilan-title">Bilan neuropsychologique</h4>
                  <p className="formats-bilan-desc">
                    Analyse des fonctions cognitives (mémoire, attention, fonctions exécutives).
                  </p>
                </div>

                <div className="formats-bilan-card" id="bilan-cognitif">
                  <h4 className="formats-bilan-title">Bilan cognitif (Test de QI, MDPH,... )</h4>
                  <p className="formats-bilan-desc">
                    Évaluation spécialisée des capacités cognitives et accompagnement personnalisé.
                  </p>
                </div>

                <div className="formats-bilan-card">
                  <h4 className="formats-bilan-title">Remédiation cognitive</h4>
                  <p className="formats-bilan-desc">
                    Rééducation des fonctions cognitives altérées par une approche thérapeutique adaptée.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Entretiens individuels */}
          <section className="formats-section" id="accompagnement-individuel">
            <h2 className="formats-section-title">Entretiens individuels</h2>
            
            <p className="formats-section-intro">
              <strong>Public :</strong> Enfants, adolescents, adultes, personnes âgées
            </p>

            <h3 className="formats-subtitle">Motifs pris en charge</h3>
            <ul className="formats-motifs-list">
              <li>Troubles du sommeil, énurésie, hyperactivité</li>
              <li>Épisodes dépressifs, angoisses, phobies</li>
              <li>Trouble de l'attachement, difficultés à gérer ses émotions</li>
              <li>Difficultés à s'affirmer, séparation, traumatisme</li>
              <li>Deuil insurmontable, sentiment d'échec</li>
              <li>Difficultés scolaires, difficultés relationnelles</li>
              <li>Burn-out, TOC</li>
              <li>Et autres problématiques rencontrées au cours du cycle de vie</li>
            </ul>
          </section>

          {/* Thérapies de couple */}
          <section className="formats-section" id="therapies-couple">
            <h2 className="formats-section-title">Thérapies de couple</h2>
            
            <ul className="formats-motifs-list">
              <li>Difficultés de communication</li>
              <li>Crises conjugales, séparation</li>
              <li>Reconstruction après un traumatisme partagé</li>
            </ul>
          </section>

          {/* Thérapies familiales */}
          <section className="formats-section" id="therapies-familiales">
            <h2 className="formats-section-title">Thérapies familiales</h2>
            
            <ul className="formats-motifs-list">
              <li>Conflits parent-enfant / parent-adolescent</li>
              <li>Recomposition familiale</li>
              <li>Accompagnement autour d'un diagnostic (TDAH, autisme…)</li>
            </ul>
          </section>
        </div>
      </main>
  );
}
