//ici, on va afficher les moyennes par matières
import React, { useState, useEffect } from "react";
import neo4j from "neo4j-driver";

const MoyenneParMatiere = () => {
  const [nodes, setNodes] = useState([]);

  useEffect(() => {
    const driver = neo4j.driver(
      "bolt://localhost:7687",
      neo4j.auth.basic("neo4j", "labdddemathildeetmarie")
    );
    const session = driver.session();

    session
      .run("MATCH (n:Matière) RETURN n")
      .then((result) => {
        const nodesArray = result.records.map((record) => ({
          record: record.get("n").properties,
        }));
        setNodes(nodesArray);
      })
      .catch((error) => {
        console.error("Something went wrong: ", error);
      })
      .then(() => {
        session.close();
        driver.close();
      });
  }, []);

  return (
    <div className="w-auto glass-table px-2 scroller">
      <table className="w-100">
        <thead>
          <tr>
            <th className="pb-5">ID</th>
            <th className="pb-5">Matière</th>
            {/* <th className="pb-5">Min</th>
            <th className="pb-5">Max</th>
            <th className="pb-5">Moyenne</th>
            <th className="pb-5">Appréciation</th> */}
          </tr>
        </thead>
        <tbody>
          {nodes.map((node, index) => (
            <tr key={index}>{JSON.stringify(node)}</tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MoyenneParMatiere;
