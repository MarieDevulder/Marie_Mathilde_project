import React, { useState } from "react";
import MoyenneParMatiere from "./moyennes_par_matiere";
import VueDEnsembleEleves from "./vue_d_ensemble_eleves";
import NotesParEleve from "./notes_par_eleve";
import SelectionEleve from "./selection_eleve";

const Boutons = () => {
  const [affichage, setAffichage] = useState("");

  return (
    <div className="w-100 h-100 flex-row justify-content-between">
      <h1 className="pt-5">Type de rélevé de note</h1>
      <button
        className="glass1 text-white"
        onClick={() => setAffichage("moyennesMatière")}
      >
        Moyennes par matière
      </button>
      <button
        className="glass1 text-white"
        onClick={() => setAffichage("notesÉlèves")}
      >
        Notes élèves
      </button>
      {/* <button
        className="glass1 text-white"
        onClick={() => setAffichage("notesParÉlève")}
      >
        Notes par élève
      </button> */}
      {/* je veux qu'en cliquant sur le bouton "Notes par élève" on affiche un component de selection d'eleve et que quand cet eleve est selectionné la on affiche le composant "NotesParEleve" */}

      <button
        className="glass1 text-white"
        onClick={() => setAffichage("SelectionEleve")}
      >
        Notes par élève
      </button>

      {affichage === "moyennesMatière" && <MoyenneParMatiere />}
      {affichage === "notesÉlèves" && <VueDEnsembleEleves />}
      {affichage === "notesParÉlève" && <NotesParEleve />}
      {affichage === "SelectionEleve" && <SelectionEleve />}
    </div>
  );
};

export default Boutons;
