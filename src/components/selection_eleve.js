import React, { useState, useEffect } from "react";
import neo4j from "neo4j-driver";

const SelectionEleve = () => {
  const [eleves, setEleves] = useState([]);
  const [eleveChoisi, setEleveChoisi] = useState("");
  const [notesEleve, setNotesEleve] = useState([]);

  useEffect(() => {
    const driver = neo4j.driver(
      "bolt://localhost:7687",
      neo4j.auth.basic("neo4j", "labdddemathildeetmarie")
    );
    const session = driver.session();

    // Charger la liste des élèves
    session
      .run(
        `
        MATCH (e:Élève)
        RETURN e.nom AS nom, e.prénom AS prénom
      `
      )
      .then((result) => {
        const eleveChoisiArray = result.records.map((record) => ({
          nom: record.get("nom"),
          prénom: record.get("prénom"),
        }));
        setEleves(eleveChoisiArray);
      })
      .catch((error) => {
        console.error(
          "Erreur lors de la récupération des élèves: ",
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

  const handleEleveClick = (nom, prenom) => {
    // Charger les notes de l'élève sélectionné
    const driver = neo4j.driver(
      "bolt://localhost:7687",
      neo4j.auth.basic("neo4j", "labdddemathildeetmarie")
    );
    const session = driver.session();

    session
      .run(
        `
        MATCH (e:Élève {prenom: 'Prénom', nom: 'Nom'})

        OPTIONAL MATCH (e)-[a:A_NOTE]->(n:Note)-[r:APPARTIENT_A]->(m:eleveChoisi)

        RETURN
          eleveChoisi
          e.nom AS nom,
          e.prenom AS prenom,
          m.nom AS eleveChoisi,
          COALESCE(a.valeur, 0) AS note; 

      `,
        { nom, prenom }
      )
      .then((result) => {
        const eleveChoisiArray = result.records.map((record) => ({
          nom: record.get("nom"),
          prénom: record.get("prénom"),
          matiere: record.get("matiere"),
          note: record.get("note"),
        }));
        setNotesEleve(eleveChoisiArray);
      })
      .catch((error) => {
        console.error(
          "Erreur lors de la récupération des notes de l'élève: ",
          error
        );
      })
      //ici essaye d'ouvrir la console (clic droit inspecter sur page web) pour voir si on a le message d'erreur (j'ai pas le truc)
      .finally(() => {
        session.close();
        driver.close();
      });
  };

  return (
    <div className="w-auto m-5 px-2 d-flex flex-row justify-content-center">
      {/* Menu déroulant permettant de sélectionner un élève */}
      <select onChange={handleSelectChange} className="glass1 h-25 text-white">
        <option value="">Choisissez un élève</option>
        {eleves.map((eleve, index) => (
          <option
            key={index}
            value={String(eleve.nom, eleve.prénom)}
            onClick={() => handleEleveClick(eleve.nom, eleve.prénom)}
          >
            {eleve.nom} {eleve.prénom}
          </option>
        ))}
      </select>

      {/* Affichage des notes de l'élève sélectionné */}
      
    
        <h3>Notes de l'élève {eleveChoisi}</h3>
        
        <div className="w-auto glass-table px-2">
        <table>
          <thead>
            <tr>
              <th className="pb-7"> Nom </th>
              <th className="pb-7"> Prénom </th>
              <th className="pb-7"> Matière </th>
              <th className="pb-7"> Note </th>
            </tr>
          </thead>
          <tbody>
            
            {notesEleve.map((eleveChoisi, index) => (
              <tr key={index}>
                <td>{eleveChoisi.nom}</td>
                <td>{eleveChoisi.prénom}</td>
                <td>{eleveChoisi.matiere}</td>
                <td>{eleveChoisi.note}</td>
              </tr>
            ))}
            {eleveChoisi.length === 0 && (
            <tr>
              <td colSpan="2">Aucune donnée à afficher</td>
            </tr>
          )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SelectionEleve;
