import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

function PaginaEdit({ lista, setLista }) {
  const [validacao, setValidacao] = useState({
    nome: true,
    description: true,
  });
  const [novoItem, setNovoItem] = useState({ nome: "", description: "" });
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    async function itemParaEdicao() {
      try {
        const resp = await fetch(`http://localhost:3001/Postagens/${id}`);
        const data = await resp.json();
        setNovoItem(data);
      } catch (error) {}
    }
    itemParaEdicao();
  }, [id]);

  async function atualizarTabela() {
    try {
      // async function validar() {
      //   let itemValido = {
      //     nome: true,
      //     description: true,
      //   };
      //   if (novoItem.nome === "") {
      //     itemValido.nome = false;
      //   }

      //   if (novoItem.description === "") {
      //     itemValido.description = false;
      //   }

      //   setValidacao({
      //     nome: itemValido.nome,
      //     description: itemValido.description,
      //   });
      // }

      const resp = await fetch(`http://localhost:3001/Postagens/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(novoItem),
      });
      const data = await resp.json();

      setLista(lista.map((item) => (item.id === id ? data : item)));
      setNovoItem({ nome: "", description: "" });
      navigate("/");
    } catch (error) {
      console.log("Erro na atualização!");
    }
  }

  return (
    <div className="boxEdit">
      <table>
        <thead>
          <tr>
            <th>Nome</th>
            <th>Descrição</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <input
                className="inputEdit"
                type="text"
                placeholder="Digite aqui"
                value={novoItem.nome}
                onChange={(e) => {
                  setNovoItem({ ...novoItem, nome: e.target.value });
                }}
                style={{
                  border: validacao.nome
                    ? " 1px solid green"
                    : " 1px solid red",
                }}
              ></input>
            </td>
            <td>
              <input
                className="inputEdit"
                type="text"
                placeholder="Digite aqui"
                value={novoItem.description}
                onChange={(e) => {
                  setNovoItem({
                    ...novoItem,
                    description: e.target.value,
                  });
                }}
                style={{
                  border: validacao.description
                    ? " 1px solid green"
                    : " 1px solid red",
                }}
              ></input>
            </td>
          </tr>
        </tbody>
      </table>
      <button onClick={atualizarTabela}>Enviar</button>
    </div>
  );
}

export default PaginaEdit;
