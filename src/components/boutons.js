import React, { useState } from "react";
import MoyenneParMatiere from "./moyennes_par_matiere";
import VueDEnsembleEleves from "./vue_d_ensemble_eleves";
import SelectionEleve from "./selection_eleve";

const Boutons = () => {
  const [affichage, setAffichage] = useState("");

  return (
    <div className="w-100 h-100 flex-row justify-content-between">
      <h1 className="py-5">Choisissez ce que vous voulez afficher</h1>
      <button
        className="glass1 text-white fs-3"
        onClick={() => setAffichage("moyennesMatière")}
      >
        Moyennes par matière
      </button>
      <button
        className="glass1 text-white fs-3"
        onClick={() => setAffichage("notesÉlèves")}
      >
        Vue d'ensemble des élèves
      </button>
      <button
        className="glass1 text-white fs-3"
        onClick={() => setAffichage("SelectionEleve")}
      >
        Notes par élève
      </button>

      {affichage === "moyennesMatière" && <MoyenneParMatiere />}
      {affichage === "notesÉlèves" && <VueDEnsembleEleves />}
      {affichage === "SelectionEleve" && <SelectionEleve />}
    </div>
  );
};

export default Boutons;
