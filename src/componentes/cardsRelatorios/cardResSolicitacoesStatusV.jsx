import React from 'react';
import { Bar } from "react-chartjs-2";
import solicitacoes from "../../jsons/solicitacoesEfeturadas.json";
import categorias from "../../jsons/categorias.json";
import style from "../../componentes/cardsRelatorios/css/cardResSolicitacoesStatusV.module.css";
import { useNavigate } from 'react-router-dom';

function ResSolicitacaoStatusV() {

  const navigate = useNavigate()

    const pendentes = solicitacoes.filter(
        (solicitacao) => solicitacao.status === "Processando Envio"
      );
    
      const solicitacoesPendentes = pendentes.reduce((acc, solicitacao) => {
        const tipos = acc.find(
          (tipo) => tipo.categoria_id === solicitacao.categoria_id
        );
    
        if (tipos) {
          tipos.quantidade += 1;
        } else {
          acc.push({
            categoria_id: solicitacao.categoria_id,
            nome: categorias[solicitacao.categoria_id].nome,
            quantidade: 1,
          });
        }
    
        return acc;
      }, []);

    return (
        <div
            className={style.restanteSolicitacoes}
            onClick={() => {
              navigate(`/resumostatus/Processando Envio`);
            }}
          >
            <div className={style.titulo}>
              <span
                className={`material-symbols-rounded ${style.iconProcessando}`}
              >
                help
              </span>
              <p>
                Total de solicitações<br />
                Aguardando avalaiação:
              </p>
              <h1>{pendentes.length}</h1>
            </div>
            <div className={style.graficoProcessando}>
              <Bar
                options={{
                  responsive: true,
                  aspectRatio: false,
                  scales: {
                    x: { display: false },
                  },
                  plugins: {
                    y: {
                      display: false,
                    },
                    x: {
                      display: false,
                    },
                    legend: {
                      display: false,
                    },
                  },
                }}
                width={"100%"}
                data={{
                  labels: solicitacoesPendentes.map((item) => {
                    return item.nome;
                  }),

                  datasets: [
                    {
                      data: solicitacoesPendentes.map((item) => {
                        return item.quantidade;
                      }),
                      tension: 0.5,
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
                      ],hoverBackgroundColor: [
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
          </div>
    );
}

export default ResSolicitacaoStatusV;