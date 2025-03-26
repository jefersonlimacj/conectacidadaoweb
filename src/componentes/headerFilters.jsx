import style from "../componentes/css/headerFilter.module.css";
import { useState } from "react";

function Headerfilters() {
  const getHoje = () => {
    const hoje = new Date();
    return hoje.toISOString();
  };

  const getPrimeiroDia = () => {
    const hoje = new Date();
    const primeiroDia = new Date(hoje.getFullYear(), hoje.getMonth(), 1);
    return primeiroDia.toISOString();
  };

  const [dataInicio, setDataInicio] = useState(getPrimeiroDia());
  const [dataFim, setDataFim] = useState(getHoje());

  return (
    <>
      <div className={style.pesquisa}>
        <span>Pesquisa</span>
        <div className={style.divider}></div>
        <div className={style.rowPesquisa}>
          <div className={style.campoPesquisa}>
            <p
              style={{
                color: "#909090",
                fontSize: "0.7rem",
                marginLeft: "10px",
              }}
            >
              De:
            </p>
            <input
              type="date"
              value={dataInicio.split("T")[0]}
              onChange={(e) => setDataInicio(e.target.value)}
            />
            <div className={style.dividerV}></div>
            <p style={{ color: "#909090", fontSize: "0.7rem" }}>Até:</p>
            <input
              type="date"
              value={dataFim.split("T")[0]}
              onChange={(e) => setDataFim(e.target.value)}
            />
          </div>
          <button
            className={style.buttonPesq}
            onClick={() => console.log(dataInicio, dataFim)}
          >
            <div className={style.btnPesquisa}>
              <span className="material-symbols-rounded"> search </span>
            </div>
          </button>
        </div>
      </div>
    </>
  );
}

export default Headerfilters;
