import React from "react";
import "./paginaCriar.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function PaginaCriar({ novoItem, setNovoItem, adicionarNovoItem }) {
  const navigate = useNavigate();
  const [validacao, setValidacao] = useState({
    nome: true,
    description: true,
    genero: true,
    dataNascimento: true,
  });

  const [mensagem, setMensagem] = useState({
    nome: "",
    description: "",
    genero: "",
    dataNascimento: "",
  });

  async function validar() {
    const itemValido = {
      nome: novoItem.nome !== "",
      description: novoItem.description !== "",
      genero: novoItem.genero !== "",
      dataNascimento: novoItem.dataNascimento !== "",
    };

    const mensagens = {
      nome: itemValido.nome ? "" : "O nome é obrigatório.",
      description: itemValido.description ? "" : "O email é obrigatório.",
      genero: itemValido.genero ? "" : "Selecione uma opção.",
      dataNascimento: itemValido.dataNascimento
        ? ""
        : "informe sua data de nascimento.",
    };

    setValidacao(itemValido);
    setMensagem(mensagens);
  }

  function onclick() {
    if (
      validacao.nome === false ||
      validacao.description === false ||
      validacao.genero === false ||
      validacao.dataNascimento
    ) {
      return;
    }
    adicionarNovoItem();
  }

  useEffect(() => {
    validar();
  }, [novoItem]);

  return (
    <div className="box-itens container">
      <label htmlFor="nome">Nome</label>
      <input
        id="nome"
        type="text"
        placeholder="Nome"
        value={novoItem.nome}
        onChange={(e) => setNovoItem({ ...novoItem, nome: e.target.value })}
        style={{
          border: validacao.nome ? " 1px solid green" : " 1px solid red",
        }}
      ></input>
      {validacao.nome === false && <span>{mensagem.nome}</span>}
      <label htmlFor="email">Email</label>
      <input
        id="email"
        type="text"
        placeholder="Email"
        value={novoItem.description}
        onChange={(e) =>
          setNovoItem({ ...novoItem, description: e.target.value })
        }
        style={{
          border: validacao.description ? " 1px solid green" : " 1px solid red",
        }}
      ></input>
      {validacao.description === false && <span>{mensagem.description}</span>}
      {/* 
      <label htmlFor="date">Data de nascimento</label>
      <input
        type="date"
        id="date"
        className="inpData"
        value={novoItem.dataNascimento}
        onChange={(e) => 
          setNovoItem({ ...novoItem, dataNascimento: e.target.value })
        }
        style={{
          border: validacao.dataNascimento ? " 1px solid green" : " 1px solid red",
        }}
      ></input>
      {validacao.dataNascimento === false && <span>{mensagem.dataNascimento}</span>} */}

      <div className="boxGenero">
        <label htmlFor="genero">Gênero</label>
        <select
          id="genero"
          required="required"
          value={novoItem.genero}
          onChange={(e) => setNovoItem({ ...novoItem, genero: e.target.value })}
          style={{
            border: validacao.genero ? " 1px solid green " : " 1px solid red ",
          }}
        >
          <option value="">Selecione uma opção</option>
          <option value="Feminino">Feminino</option>
          <option value="Masculino">Masculino</option>
        </select>
        {validacao.genero === false && <span>{mensagem.genero}</span>}
      </div>
      <div className="boxCheckbox">
        <input type="checkbox" id="checkbox"></input>
        <label htmlFor="checkbox">
          Declaro que concordo com os termos de uso do site.
        </label>
      </div>

      <div className="btn">
        <button className="btn-add" onClick={onclick}>
          Adicionar
        </button>
        <button className="btn-add" onClick={() => navigate("/")}>
          Cancelar
        </button>
      </div>
    </div>
  );
}

export default PaginaCriar;
