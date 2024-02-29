//ici, on va afficher les moyennes par matières
import React, { useState, useEffect } from "react";

const NotesParEleve = () => {
  // const [data, setData] = useState([]);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const result = await session.run(`
  //           MATCH (e:Élève)-[n:NOTÉ]->(m:Matière)
  //           RETURN e.id, e.nom, e.prénom, AVG(n.note) as moyenne
  //       `);
  //       console.log("Résultat de la requête Neo4j :", result.records);
  //       setData(
  //         result.records.map((record) => ({
  //           élève: record.get("e").properties,
  //           matière: record.get("m").properties,
  //           moyenne: record.get("moyenne"),
  //         }))
  //       );
  //     } catch (error) {
  //       console.error("Erreur lors de la récupération des données :", error);
  //     } finally {
  //       session.close();
  //     }
  //   };

  //   fetchData();

  //   return () => {
  //     driver.close();
  //   };
  // }, []);

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
            {/* 
            {
              /* {boucle qui mets autant de matiere qu'il y en a dans la base de donnée 
              data.map((record, index) => (
                <th key={index} className="pb-5">
                  {record.matière.nom}
                </th>
              ))
            } 
            */}

            {
              /* {boucle temporaire qui genère pour l'intant 3 matières qui sont ['mathématiques', 'physique', 'anglais']*/
              [
                "Mathématiques",
                "Physique",
                "Anglais",
                "mécaQ",
                "metaheuristique",
                "BDD No SQL",
                "machine learning",
                "IA",
                "Python",
              ].map((matiere, index) => (
                <th key={index} className="pb-5 px-2">
                  {matiere}
                </th>
              ))
            }
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>Devulder</td>
            <td>Mathilde</td>
            <td>14,5</td>
            {/* idem que pour le thead */}
            {["15", "14", "12", "11", "20", "10", "9", "11,5", "17"].map(
              (note, index) => (
                <td key={index}>{note}</td>
              )
            )}
          </tr>

          {/* 
            {data.map((record, index) => (
                <tr key={index}>
                <td>{record.élève.id}</td>
                <td>{record.élève.nom}</td>
                <td>{record.élève.prénom}</td>
                <td>{record.élève.moyenne}</td>
                {data.map((record, index) => (
                  <td key={index}>{record.matière.moyenne}</td>
                ))
                
                }
                </tr>
            ))}
          */}
        </tbody>
      </table>
    </div>
  );
};

export default NotesParEleve;
