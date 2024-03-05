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
        RETURN e.id AS id, e.nom AS nom, e.prénom AS prénom, avg(a.valeur) AS moyenne
      `
      )
      .then((result) => {
        const elevesArray = result.records.map((record) => ({
          id: record.get("id"),
          nom: record.get("nom"),
          prénom: record.get("prénom"),
          moyenne: record.get("moyenne").toFixed(2), // Arrondir la moyenne à deux décimales
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
          {eleves.map((eleves, index) => (
            <tr key={index}>
              <td>{String(eleves.id)}</td>
              <td>{eleves.nom}</td>
              <td>{eleves.prénom}</td>
              <td>{eleves.moyenne}</td>
              <td>
                {eleves.moyenne >= 10 ? (
                  <p>Bravo !</p>
                ) : (
                  <p>Peut mieux faire...</p>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default VueDEnsembleEleves;
