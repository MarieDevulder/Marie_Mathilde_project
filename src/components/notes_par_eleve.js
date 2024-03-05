//ici, on va afficher les moyennes par matières
import React, { useState, useEffect } from "react";
import neo4j from "neo4j-driver";

const NotesParEleve = () => {
  const [eleves, setEleves] = useState([]);
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
        RETURN e.id AS id, e.nom AS nom, e.prénom AS prénom, avg(a.valeur) AS moyenne, m.nom AS matiere, a.valeur AS note

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

        const matieresArray = result.records.map((record) => ({
          matiere: record.get("matiere"),
          note: record.get("note"),
        }));
        setMatieres(matieresArray);
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

  return (
    <div
      className="w-100 glass-table-2 px-2"
      style={{ maxWidth: "10000px", overflowX: "auto" }}
    >
      <table className="w-100">
        <thead>
          <tr>
            <th className="pb-5 px-2">ID</th>
            <th className="pb-5 px-2">Nom</th>
            <th className="pb-5 px-2">Prénom</th>
            <th className="pb-5 px-2">Moyenne Générale</th>

            {
              // boucle qui mets autant de matiere qu'il y en a dans la base de donnée
              matieres.map((record, index) => (
                <th key={index} className="pb-5">
                  {matieres.matiere}
                </th>
              ))
            }
          </tr>
        </thead>
        <tbody>
          <tr>
            {eleves.map((eleves, index) => (
              <tr key={index}>
                <td>{String(eleves.id)}</td>
                <td>{eleves.nom}</td>
                <td>{eleves.prénom}</td>
                <td>{eleves.moyenne}</td>
                {matieres.map((matieres, index) => (
                  <td key={index}>{matieres.note}</td>
                ))}
              </tr>
            ))}
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default NotesParEleve;
