import React from "react";
import style from "./css/cardR1.module.css";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import solicitacoes from "../../jsons/solicitacoesEfeturadas.json";

ChartJS.register(ArcElement, Tooltip, Legend);

function CardR1() {
  const atendidas = solicitacoes.filter(
    (sol) => sol.status === "Solicitação Atendida"
  );

  const negadas = solicitacoes.filter((sol) => sol.status === "Pedido Negado");

  const totalS = solicitacoes.length;
  const totalA = atendidas.length;
  const totalN = negadas.length;

  return (
    <div className={style.base}>
      <h5>Geral</h5>
      <div className={style.grafico}>
        <Doughnut
          options={{
            responsive: true,
            aspectRatio: 1,
            plugins: {
              legend: {
                display: false,
              },
              tooltip: {
                enabled: true,
              },
            },
          }}
          data={{
            labels: ["Solicitadas", "Atendidas", "Negadas"],
            datasets: [
              {
                data: [totalS - (totalA + totalN), totalA, totalN],
                backgroundColor: ["#cccccc", "#055695", "#CC3A3A"],
                borderRadius: 5,
              },
            ],
          }}
        />
      </div>
      <div className={style.dividerH}></div>
      <div className={style.indiceRes}>
        <div className={style.indice}>
          <div className={style.bloc}></div>
          <p>Total de Solicitações: {totalS}</p>
        </div>
        <div className={style.indice}>
          <div className={style.blocA}></div>
          <p>Total de Atendidas: {totalA}</p>
        </div>
        <div className={style.indice}>
          <div className={style.blocN}></div>
          <p>Total de Negadas: {totalN}</p>
        </div>
      </div>
    </div>
  );
}

export default CardR1;
