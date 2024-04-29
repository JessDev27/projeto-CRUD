import React from "react";
import "./App.css";
import ButtonsOrdem from "./componentes/ButtonsOrdem";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import PaginaEdit from "./componentes/PaginaEdit";
import "./home.css";

function Home({ lista, setLista }) {
  const [ordem, setOrdem] = useState({ nome: "", direcao: "" });
  const [filtro, setFiltro] = useState("");
  const [paginaAtual, setPaginaAtual] = useState(0);
  const [itensPorPagina, setItensPorPagina] = useState(5);
  const [modalConfirma, setModalConfirma] = useState(false);
  const [itemParaExcluir, setItemParaExcluir] = useState(null);

  const navigate = useNavigate();

  const sortedLista = lista.toSorted((a, b) => {
    if (a[ordem.nome] > b[ordem.nome]) {
      return ordem.direcao === "cima" ? 1 : -1;
    } else {
      return ordem.direcao === "cima" ? -1 : 1;
    }
  });

  const filterLista = sortedLista.filter(
    (item) => item.nome.includes(filtro) || item.description.includes(filtro)
  );

  const inicio = paginaAtual * itensPorPagina;
  const final = (paginaAtual + 1) * itensPorPagina;
  const pageLista = filterLista.slice(inicio, final);

  const totalPaginas = Math.ceil(filterLista.length / itensPorPagina);
  const paginaAnterior = paginaAtual !== 0;
  const proximaPagina = paginaAtual !== totalPaginas - 1;

  async function listarDados() {
    try {
      const resp = await fetch("http://localhost:3001/Postagens", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const dados = await resp.json();
      setLista(dados);
    } catch (error) {
      console.log("Erro na API");
    }
  }

  async function excluirItem(id) {
    try {
      await fetch(`http://localhost:3001/Postagens/${id}`, {
        method: "DELETE",
      });
      setLista(lista.filter((item) => item.id !== id));
      setModalConfirma(false);
    } catch (error) {
      console.log("Erro na exclusão!");
    }
  }

  const editarItem = (id) => {
    navigate(`/PaginaEdit/${id}`);
  };

  useEffect(() => {
    listarDados();
  }, []);

  return (
    <div className="conteudo">
      <div className="conteudo">
        <h1> Usuários </h1>
        <table className="container">
          <thead>
            <tr>
              <th>
                <div className="celulaNome">
                  Nome
                  <ButtonsOrdem setOrdem={setOrdem} />
                </div>
              </th>
              <th>Email</th>
              <th>Gênero</th>
              <th>Data de nascimento</th>
              <th>
                <label>Filtro</label>
                <input
                  type="text"
                  value={filtro}
                  onChange={(e) => setFiltro(e.target.value)}
                ></input>
              </th>
            </tr>
          </thead>
          <tbody>
            {pageLista.map((item) => (
              <tr key={item.id}>
                <td data-label="Nome">{item.nome}</td>
                <td data-label="Email">{item.description}</td>
                <td data-label="Gênero">{item.genero}</td>
                <td data-label="dataNascimento">{item.dataNascimento}</td>
                <td>
                  <div className="btn-edit">
                    <button
                      onClick={() => {
                        setModalConfirma(true);
                        setItemParaExcluir(item);
                      }}
                    >
                      ✖️
                    </button>
                    <Link to={`/PaginaEdit/${item.id}`}>
                      <button> ✎ </button>
                    </Link>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div>
          <button
            onClick={() => setPaginaAtual(paginaAtual - 1)}
            disabled={!paginaAnterior}
          >
            {"<<"}
          </button>
          <button
            onClick={() => setPaginaAtual(paginaAtual + 1)}
            disabled={!proximaPagina}
          >
            {">>"}
          </button>
        </div>
        {modalConfirma && (
          <div className="modal">
            <div className="boxModal">
              <p>Deseja realmente excluir ?</p>
              <div className="btnModal">
                <button
                  onClick={() => {
                    excluirItem(itemParaExcluir.id);
                  }}
                >
                  Confirmar
                </button>
                <button
                  onClick={() => {
                    setModalConfirma(false);
                  }}
                >
                  Cancelar
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      <div>
        <Link to="/PaginaCriar">
          <button className="btn-criar">Criar novo usuário</button>
        </Link>
      </div>
    </div>
  );
}

export default Home;
