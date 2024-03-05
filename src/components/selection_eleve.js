import React, { useState, useEffect } from "react";
import NotesParEleve from "./notes_par_eleve";
import neo4j from "neo4j-driver";

const SelectionEleve = () => {
  const [eleves, setEleves] = useState([]);
  const [eleveChoisi, setEleveChoisi] = useState("");

  useEffect(() => {
    const driver = neo4j.driver(
      "bolt://localhost:7687",
      neo4j.auth.basic("neo4j", "labdddemathildeetmarie")
    );
    const session = driver.session();

    session
      .run(
        `
        MATCH (e:Élève)
        RETURN e.nom AS nom, e.prénom AS prénom
      `
      )
      .then((result) => {
        const elevesArray = result.records.map((record) => ({
          nom: record.get("nom"),
          prénom: record.get("prénom"),
        }));
        setEleves(elevesArray);
      })
      .catch((error) => {
        console.error(
          "Erreur lors de la récupération des moyennes par élèves: ",
          error
        );
      })
      .finally(() => {
        session.close();
        driver.close();
      });
  }, []);

  const handleSelectChange = (event) => {
    setEleveChoisi(event.target.value);
  };

  return (
    <div
      className="w-auto m-5 px-2 d-flex flex-row justify-content-center"
      style={{ maxHeight: "450px", overflowY: "auto" }}
    >
      {/* menu déroulant permettant de selectionner un eleve */}
      <select onChange={handleSelectChange} className="glass1 h-25 text-white">
        <option value="">Choisissez un élève</option>
        {eleves.map((eleve, index) => (
          <option key={index} value={String(eleve.nom)}>
            {eleve.nom} {eleve.prénom}
          </option>
        ))}
      </select>

      {/* affichage des notes de l'élève sélectionné */}
      <div>
        <NotesParEleve eleve={eleveChoisi} />
      </div>
    </div>
  );
};

export default SelectionEleve;
