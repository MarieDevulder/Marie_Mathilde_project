import React, { useState, useEffect } from "react";
import neo4j from "neo4j-driver";

const SelectionEleve = () => {
  const [eleves, setEleves] = useState([]);
  const [eleveChoisi, setEleveChoisi] = useState("");
  const [notesEleve, setNotesEleve] = useState([]);
  const [moyenne, setMoyenne] = useState(null);

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
        ORDER BY nom, prénom
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
        console.error("Erreur lors de la récupération des élèves: ", error);
      })
      .finally(() => {
        session.close();
        driver.close();
      });
  }, []);

  const handleSelectChange = (event) => {
    var nom = event.target.value.split(" ")[0];
    var prenom = event.target.value.split(" ")[1];
    setEleveChoisi(event.target.value);
    handleEleveClick(nom, prenom);
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
        MATCH (e:Élève WHERE (e.nom='NAME' AND e.prénom = 'FIRSTNAME'))-[a:A_NOTE]->(n:Note)-[r:APPARTIENT_A]->(m:Matière)
       
        WITH
          e.nom AS nom,
          e.prénom AS prénom,
          m.id AS id,
          m.nom AS matiere,
          a.valeur AS note

        RETURN
          *
        ORDER BY matiere

      `
          .replace("NAME", nom)
          .replace("FIRSTNAME", prenom),

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

        // Calculer la moyenne
        const moy =
          eleveChoisiArray.reduce((acc, curr) => acc + curr.note.low, 0) /
          eleveChoisiArray.length;
        setMoyenne(moy);
      })
      .catch((error) => {
        console.error(
          "Erreur lors de la récupération des notes de l'élève: ",
          error
        );
      })

      .finally(() => {
        session.close();
        driver.close();
      });
  };

  const getAppreciation = (moyenne) => {
    if (moyenne >= 0 && moyenne <= 5) {
      return "Médiocre, il est plus que temps de se bouger";
    } else if (moyenne > 5 && moyenne < 8) {
      return "Très insuffisant, il faut remonter la pente";
    } else if (moyenne >= 8 && moyenne < 10) {
      return "Insuffisant, il faut faire davantage d'efforts";
    } else if (moyenne >= 10 && moyenne < 12) {
      return "Suffisant mais il faut pousser un peu plus";
    } else if (moyenne >= 12 && moyenne < 14) {
      return "Correct, poursuivre";
    } else if (moyenne >= 14 && moyenne < 16) {
      return "Très satisfaisant, continuer";
    } else if (moyenne >= 16 && moyenne < 19) {
      return "Excellent, à poursuivre";
    } else if (moyenne > 19) {
      return "Quelle excellence, surclassment ?";
    } else {
      return "Appréciation indéterminée";
    }
  };

  return (
    <div className="w-auto m-5 d-flex flex-row justify-content-center">
      {/* Menu déroulant permettant de sélectionner un élève */}
      <select
        onChange={handleSelectChange}
        className="glass1 h-25 w-auto text-white fs-4 text-center"
      >
        <option value="">Choisissez un élève</option>
        {eleves.map((eleve, index) => (
          <option key={index} value={String(eleve.nom + " " + eleve.prénom)}>
            {eleve.nom} {eleve.prénom}
          </option>
        ))}
      </select>

      <div className="w-50 glass-table px-2 d-flex flex-column justify-content-between m-0">
        <table>
          <thead>
            <tr>
              <th className="pb-7"> Matière </th>
              <th className="pb-7"> Note </th>

              <th colSpan="2" className="text-uppercase text-warning pb-7">
                Moyenne générale : <span className="fs-4">{moyenne}</span>{" "}
                <br /> {eleveChoisi && getAppreciation(moyenne)}
              </th>
            </tr>
          </thead>
          <tbody>
            {notesEleve.map((eleveChoisi, index) => (
              <tr key={index}>
                <td>{eleveChoisi.matiere}</td>
                <td>{eleveChoisi.note.low}</td>
              </tr>
            ))}
            {eleveChoisi.length === 0 && (
              <tr>
                <td colSpan="2">Veuillez sélectionner un élève :)</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SelectionEleve;
