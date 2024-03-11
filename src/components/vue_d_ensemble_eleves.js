import React, { useState, useEffect } from "react";
import neo4j from "neo4j-driver";

const VueDEnsembleEleves = () => {
  const [eleves, setEleves] = useState([]);

  useEffect(() => {
    const driver = neo4j.driver(
      "bolt://localhost:7687",
      neo4j.auth.basic("neo4j", "labdddemathildeetmarie")
    );
    const session = driver.session();

    session
      .run(
        `
        MATCH (e:Élève)-[a:A_NOTE]->(n:Note)-[r:APPARTIENT_A]->(m:Matière)
        RETURN
        e.id AS id,
        e.nom AS nom,
        e.prénom AS prénom,
        avg(a.valeur) AS moyenne
        ORDER BY moyenne DESC
      `
      )
      .then((result) => {
        const elevesArray = result.records.map((record) => ({
          id: record.get("id"),
          nom: record.get("nom"),
          prénom: record.get("prénom"),
          moyenne: parseFloat(record.get("moyenne")).toFixed(2), // Arrondir la moyenne à deux décimales
        }));
        setEleves(elevesArray);
      })
      .catch((error) => {
        console.error(
          "Erreur lors de la récupération des moyennes par matière: ",
          error
        );
      })
      .finally(() => {
        session.close();
        driver.close();
      });
  }, []);

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
    <div
      className="w-auto h-25 glass-table px-2 custom-scrollbar"
      style={{ maxHeight: "450px", overflowY: "auto" }}
    >
      <table className="w-100">
        <thead>
          <tr>
            <th className="pb-5">ID</th>
            <th className="pb-5">Nom</th>
            <th className="pb-5">Prénom</th>
            <th className="pb-5">Moyenne Générale</th>
            <th className="pb-5">Appréciation</th>
          </tr>
        </thead>
        <tbody>
          {eleves.map((eleve, index) => (
            <tr key={index}>
              <td>{String(eleve.id)}</td>
              <td>{eleve.nom}</td>
              <td>{eleve.prénom}</td>
              <td>{eleve.moyenne}</td>
              <td>{getAppreciation(parseFloat(eleve.moyenne))}</td>
            </tr>
          ))}
          {eleves.length === 0 && (
            <tr>
              <td colSpan="2">Aucune donnée à afficher</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default VueDEnsembleEleves;
