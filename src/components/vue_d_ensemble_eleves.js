import React, { useState, useEffect } from "react";

const VueDEnsembleEleves = () => {
  // const [data, setData] = useState([]);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const result = await session.run(`
  //           MATCH (e:Élève)-[n:NOTÉ]->(m:Matière)
  //           RETURN e.id, AVG(n.note) as moyenneGenerale
  //           ORDER BY e.id
  //       `);
  //       console.log("Résultat de la requête Neo4j :", result.records);
  //       setData(
  //         result.records.map((record) => ({
  //           élève: record.get("e").properties,
  //           moyenne: record.get("moyenneGenerale"),
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
      className="w-auto h-25 glass-table px-2 custom-scrollbar"
      style={{ maxHeight: "450px", overflowY: "auto" }}
    >
      <table className="w-100">
        {/* i want the thead to not move with the scrollbar */}
        <thead
        // style={{
        //   position: "sticky",
        //   top: "0",

        // }}
        >
          <tr>
            <th className="pb-5">ID</th>
            <th className="pb-5">Nom</th>
            <th className="pb-5">Prénom</th>
            <th className="pb-5">Moyenne Générale</th>
            <th className="pb-5">Appréciation</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>Devulder</td>
            <td>Marie</td>
            <td>14,5</td>
            <td style={{ width: "35%" }} className="pl-5">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </td>
          </tr>
          <tr>
            <td>2</td>
            <td>Rigaud</td>
            <td>Marie</td>
            <td>12,5</td>
            <td style={{ width: "35%" }} className="pl-5">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </td>
          </tr>
          <tr>
            <td>3</td>
            <td>Devulder</td>
            <td>Marie</td>
            <td>14,5</td>
            <td style={{ width: "35%" }} className="pl-5">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </td>
          </tr>
          <tr>
            <td>4</td>
            <td>Rigaud</td>
            <td>Marie</td>
            <td>12,5</td>
            <td style={{ width: "35%" }} className="pl-5">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </td>
          </tr>
          <tr>
            <td>5</td>
            <td>Devulder</td>
            <td>Marie</td>
            <td>14,5</td>
            <td style={{ width: "35%" }} className="pl-5">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </td>
          </tr>
          <tr>
            <td>2</td>
            <td>Rigaud</td>
            <td>Marie</td>
            <td>12,5</td>
            <td style={{ width: "35%" }} className="pl-5">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </td>
          </tr>
          <tr>
            <td>3</td>
            <td>Devulder</td>
            <td>Marie</td>
            <td>14,5</td>
            <td style={{ width: "35%" }} className="pl-5">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </td>
          </tr>
          <tr>
            <td>4</td>
            <td>Rigaud</td>
            <td>Marie</td>
            <td>12,5</td>
            <td style={{ width: "35%" }} className="pl-5">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </td>
          </tr>
          <tr>
            <td>5</td>
            <td>Devulder</td>
            <td>Marie</td>
            <td>14,5</td>
            <td style={{ width: "35%" }} className="pl-5">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </td>
          </tr>
          <tr>
            <td>1</td>
            <td>Devulder</td>
            <td>Marie</td>
            <td>14,5</td>
            <td style={{ width: "35%" }} className="pl-5">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </td>
          </tr>
          <tr>
            <td>2</td>
            <td>Rigaud</td>
            <td>Marie</td>
            <td>12,5</td>
            <td style={{ width: "35%" }} className="pl-5">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </td>
          </tr>
          <tr>
            <td>3</td>
            <td>Devulder</td>
            <td>Marie</td>
            <td>14,5</td>
            <td style={{ width: "35%" }} className="pl-5">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </td>
          </tr>
          <tr>
            <td>4</td>
            <td>Rigaud</td>
            <td>Marie</td>
            <td>12,5</td>
            <td style={{ width: "35%" }} className="pl-5">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </td>
          </tr>
          {/* 
            {data.map((record, index) => (
                <tr key={index}>
                <td>{record.élève.id}</td>
                <td>{record.élève.nom}</td>
                <td>{record.élève.prénom}</td>
                <td>{record.élève.moyenne}</td>
                </tr>
            ))}
          */}
        </tbody>
      </table>
    </div>
  );
};

export default VueDEnsembleEleves;
