import React from "react";
import Boutons from "./components/boutons";
import { useState, useEffect } from "react";
// import neo4j from "neo4j-driver";

function App() {
  // const [nodes, setNodes] = useState([]);

  // useEffect(() => {
  //   const driver = neo4j.driver(
  //     "bolt://localhost:7687",
  //     neo4j.auth.basic("neo4j", "labdddemathildeetmarie")
  //   );
  //   const session = driver.session();

  //   session
  //     .run("MATCH (n) RETURN n LIMIT 10")
  //     .then((result) => {
  //       const nodesArray = result.records.map(
  //         (record) => record.get("n").properties
  //       );
  //       setNodes(nodesArray);
  //     })
  //     .catch((error) => {
  //       console.error("Something went wrong: ", error);
  //     })
  //     .then(() => {
  //       session.close();
  //       driver.close();
  //     });
  // }, []);

  return (
    <div
      className="App text-center text-white m-0 p-0"
      style={{ width: "100vw", height: "100vh" }}
    >
      <main>
        <Boutons />
      </main>
    </div>
  );
}

export default App;
