import React, { useState, useEffect } from "react";
import neo4j from "neo4j-driver";

const MoyenneParMatiere = () => {
  const [matieres, setMatieres] = useState([]);

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
       
        WITH
          m.id AS id,
          m.nom AS matiere,
          a.valeur AS note

        RETURN
          id,
          matiere,
          MIN(note) AS minimum,
          MAX(note) AS maximum,
          AVG(note) AS moyenne;


      `
      )
      .then((result) => {
        const matieresArray = result.records.map((record) => ({
          id: record.get("id"),
          matiere: record.get("matiere"),
          min: record.get("minimum"),
          max: record.get("maximum"),
          moyenne: record.get("moyenne").toFixed(2), // Arrondir la moyenne à deux décimales
        }));
        setMatieres(matieresArray);
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
    <div className="w-auto glass-table px-2 scroller">
      <table className="w-100">
        <thead>
          <tr>
            <th className="pb-5">ID matière</th>
            <th className="pb-5">Matière</th>
            <th className="pb-5">Minimum</th>
            <th className="pb-5">Maximum</th>
            <th className="pb-5">Moyenne</th>
          </tr>
        </thead>
        <tbody>
          {matieres.map((matiere, index) => (
            <tr key={index}>
              <td>
                {
                  String(
                    matiere.id
                  ) /* obligée de le mettre en string car pb sinon */
                }
              </td>
              <td>{matiere.matiere}</td>
              <td>{String(matiere.min)}</td>
              <td>{String(matiere.max)}</td>
              <td>{String(matiere.moyenne)}</td>
            </tr>
          ))}
          {/* Vérifiez s'il y a des données à afficher */}
          {matieres.length === 0 && (
            <tr>
              <td colSpan="2">Aucune donnée à afficher</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default MoyenneParMatiere;
