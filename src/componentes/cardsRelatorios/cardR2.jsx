import style from "./css/cardR2.module.css";
import { Bar } from "react-chartjs-2";
import categorias from "../../jsons/categorias.json";
import solicitacoes from "../../jsons/solicitacoesEfeturadas.json";
import { useState, useEffect } from "react";
import api from "../../../service/api";
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
  const [categoria, setCategoria] = useState([]);
  const [subcategoria, setSubcategoria] = useState([]);

  useEffect(() => {
    const buscarDados = async () => {
      try {
        const dadosCategoria = await api.get(`/servico/categorias`);
        const dadosSubcategoria = await api.get(`/servico/subcategorias`);
        setCategoria(dadosCategoria.data.result);
        setSubcategoria(dadosSubcategoria.data.result);
      } catch (error) {
        console.error("Erro ao buscar usuário:", error);
      }
    };
    buscarDados();
  }, []);

  const nomesCategorias = categoria.map((categoria) => categoria.nome);

  const resumoDetalhe = categoria.map((item) => {
    const cat = solicitacoes.filter(
      (solicitacao) => solicitacao.categoria_id === item.id
    );
    return cat.length;
  });

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
          {categoria.map((categoria) => {
            return (
              <div key={categoria.id} className={style.espLinha}>
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
