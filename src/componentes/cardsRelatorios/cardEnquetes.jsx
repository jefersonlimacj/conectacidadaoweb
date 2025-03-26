import React from "react";
import style from "./css/cardEnquete.module.css";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
} from "chart.js";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement
);

function CardEnquete() {
  const totalE = 21520;
  const totalR = 10000;
  return (
    <>
      <div className={style.base}>
        <h5>Enquetes</h5>
        <div className={style.grafico}>
          <Bar
            options={{
              responsive: true,
              aspectRatio: false, // Mantenha uma proporção de 1:1
              plugins: {
                scales: {
                  x: {
                    display: false,
                  },
                  y:{
                    display: false,
                  }
                },
                subtitle: {
                  display: false,
                },
                legend: {
                  display: false, // Esconde a legenda
                },

                tooltip: {
                  enabled: false, // Ativa tooltips
                },
              },
            }}
            data={{
              labels: ["Enviadas", "Respondidas"],
              datasets: [
                {
                  data: [totalE, totalR],
                  backgroundColor: ["#cccccc", "#055695"],
                },
              ],
            }}
          />
        </div>
        <div className={style.dividerH}></div>
        <div className={style.indiceRes}>
          <div className={style.indice}>
            <div className={style.bloc}></div>
            <p>Enquetes em Aberto: {totalE}</p>
          </div>
          <div className={style.indice}>
            <div className={style.blocA}></div>
            <p>Enquetes Respondidas: {totalR}</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default CardEnquete;
