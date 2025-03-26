import style from "./css/cardR2.module.css";
import { Bar } from "react-chartjs-2";
import categorias from "../../jsons/categorias.json";
import solicitacoes from "../../jsons/solicitacoesEfeturadas.json";
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

function CardR2() {
  const nomesCategorias = categorias.map((categoria) => categoria.nome);

  const abastecimento = solicitacoes.filter((item) => item.categoria_id === 0);
  const comercio = solicitacoes.filter((item) => item.categoria_id === 1);
  const energia = solicitacoes.filter((item) => item.categoria_id === 2);
  const limpeza = solicitacoes.filter((item) => item.categoria_id === 3);
  const ambiente = solicitacoes.filter((item) => item.categoria_id === 4);
  const pedestre = solicitacoes.filter((item) => item.categoria_id === 5);
  const saude = solicitacoes.filter((item) => item.categoria_id === 6);
  const seguranca = solicitacoes.filter((item) => item.categoria_id === 7);
  const transporte = solicitacoes.filter((item) => item.categoria_id === 8);
  const urbanismo = solicitacoes.filter((item) => item.categoria_id === 9);
  const transito = solicitacoes.filter((item) => item.categoria_id === 10);

  const resumoDetalhe = [
    abastecimento.length,
    comercio.length,
    energia.length,
    limpeza.length,
    ambiente.length,
    pedestre.length,
    saude.length,
    seguranca.length,
    transporte.length,
    urbanismo.length,
    transito.length,
  ];

  return (
    <>
      <div className={style.base}>
        <h5>Ranking Solicitações</h5>
        <div className={style.grafico}>
          <Bar
            options={{
              responsive: true,
              aspectRatio: false,
              scales: {
                x: {
                  display: false,
                },
              },
              plugins: {
                legend: {
                  display: false,
                },
              },
            }}
            width={"100%"}
            data={{
              labels: nomesCategorias,
              hidden: false,
              datasets: [
                {
                  data: resumoDetalhe,
                  backgroundColor: [
                    "#0099FF99",
                    "#FF000099",
                    "#E6E60099",
                    "#8000FF99",
                    "#00B81F99",
                    "#00C88499",
                    "#1100FF99",
                    "#00781C99",
                    "#78C80099",
                    "#FFA10099",
                    "#58585899",
                  ],
                  hoverBackgroundColor: [
                    "#0099FF",
                    "#FF0000",
                    "#E6E600",
                    "#8000FF",
                    "#00B81F",
                    "#00C884",
                    "#1100FF",
                    "#00781C",
                    "#78C800",
                    "#FFA100",
                    "#585858",
                  ],
                  borderRadius: 5,
                },
              ],
            }}
          />
        </div>
        <div className={style.linha}>
          {categorias.map((categoria) => {
            return (
              <div key={categoria.categoria_id} className={style.espLinha}>
                <p>{categoria.nome}</p>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default CardR2;
