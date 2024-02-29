import React, { useState, useEffect } from "react";
import NotesParEleve from "./notes_par_eleve";

const SelectionEleve = () => {
  // const [data, setData] = useState([]);
  const [affichage, setAffichage] = useState("");

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const result = await session.run(`
  //           MATCH (e:Élève)
  //           RETURN e.id, e.nom, e.prénom
  //       `);
  //       console.log("Résultat de la requête Neo4j :", result.records);
  //       setData(
  //         result.records.map((record) => ({
  //           élève: record.get("e").properties,
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

  const handleSelectChange = (event) => {
    setAffichage(event.target.value);
  };

  return (
    <div
      className="w-auto m-5 px-2 d-flex flex-row justify-content-center"
      style={{ maxHeight: "450px", overflowY: "auto" }}
    >
      {/* menu déroulant permettant de selectionner un eleve */}

      <select onChange={handleSelectChange} className="glass1 h-25 text-white">
        <option className="text-black" value="NotesParEleve">
          Sophie Dubois
        </option>
        <option className="text-black" value="NotesParEleve">
          Jean Dupont
        </option>
        <option className="text-black" value="">
          Marie Durand
        </option>
        <option className="text-black" value="">
          Paul Martin
        </option>
        <option className="text-black" value="NotesParEleve">
          Sophie Dubois
        </option>
        <option className="text-black" value="">
          Jean Ber
        </option>
        <option className="text-black" value="NotesParEleve">
          Marie Kaka
        </option>
        <option className="text-black" value="">
          Paul Miral
        </option>
        {/* changer la façon de faire */}
      </select>
      {affichage === "NotesParEleve" && <NotesParEleve />}
    </div>
  );
};

export default SelectionEleve;
