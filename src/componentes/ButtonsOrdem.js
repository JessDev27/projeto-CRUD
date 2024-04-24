import React from "react";

function ButtonsOrdem(props) {
  return (
    <div>
      <button
        className="btn-setas"
        onClick={() => props.setOrdem({ direcao: "cima" })}
      >
        ↑
      </button>
      <button
        className="btn-setas"
        onClick={() => props.setOrdem({ direcao: "baixo" })}
      >
        ↓
      </button>
    </div>
  );
}

export default ButtonsOrdem;
