import React from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import PaginaCriar from "./componentes/PaginaCriar";
import PaginaEdit from "./componentes/PaginaEdit";
import Home from "./Home";
import { useState } from "react";

function App() {
  const [novoItem, setNovoItem] = useState({
    nome: "",
    description: "",
    genero: "",
    dataNascimento: "",
  });

  const [lista, setLista] = useState([]);
  const navigate = useNavigate();

  async function adicionarNovoItem() {
    try {
      const resp = await fetch("http://localhost:3001/Postagens", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(novoItem),
      });
      const data = await resp.json();
      setLista([...lista, data]);
      navigate("/");
    } catch (error) {
      console.log("Erro na API");
    } finally {
      setNovoItem({
        nome: "",
        description: "",
        genero: "",
        dataNascimento: "",
      });
    }
  }

  return (
    <Routes>
      <Route
        path="/"
        element={
          <Home
            lista={lista}
            setLista={setLista}
            novoItem={novoItem}
            setNovoItem={setNovoItem}
          />
        }
      />
      <Route
        path="/PaginaCriar"
        element={
          <PaginaCriar
            novoItem={novoItem}
            setNovoItem={setNovoItem}
            adicionarNovoItem={adicionarNovoItem}
          />
        }
      />
      <Route
        path="/PaginaEdit/:id"
        element={<PaginaEdit lista={lista} setLista={setLista} />}
      />
    </Routes>
  );
}

export default App;
