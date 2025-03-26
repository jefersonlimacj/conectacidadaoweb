import React from "react";
import { Bar } from "react-chartjs-2";
import solicitacoes from "../../jsons/solicitacoesEfeturadas.json";
import categorias from "../../jsons/categorias.json";
import style from "../../componentes/cardsRelatorios/css/cardResSolicitacoesStatusV.module.css";
import { useNavigate } from "react-router-dom";

function ResSolicitacaoStatusB({ total, resumo, rs_id }) {
  const navigate = useNavigate();

  const status = {
    "Pedido Negado": [
      "block",
      "#CC3A3A",
      "#460909",
      "#46090950",
      "Solicitações Negadas",
    ],
    "Processando Envio": [
      "help",
      "#E8A25C",
      "#5E3309",
      "#5E330950",
      "Pendente de Setor Responsável",
    ],
    "Aguardando Resposta": [
      "schedule",
      "#E5CE00",
      "#6D6200",
      "#6D620050",
      "Aguardando Resposta do Setor Responsável",
    ],
    "Atendimento Agendado": [
      "pending_actions",
      "#6399C2",
      "#112f46",
      "#112f4650",
      "Solicitações com Atendimento Agendado",
    ],
    "Solicitação Atendida": [
      "check_circle",
      "#57CE6E",
      "#144b1f",
      "#144b1f50",
      "Solicitações Finalizadas",
    ],
  };

  const detalheStatus = status[rs_id];

  return (
    <div
      className={style.restanteSolicitacoes}
      style={{
        backgroundColor: detalheStatus[1],
        boxShadow: `2px 2px 5px ${detalheStatus[3]}`,
      }}
    >
      <div className={style.titulo} style={{ justifyContent: "space-evenly" }}>
        <span className={`material-symbols-rounded ${style.iconProcessando}`}>
          {detalheStatus[0]}
        </span>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <h1 style={{ color: detalheStatus[2], fontSize: "5rem" }}>
            {total.length}
          </h1>
          <p style={{ textAlign: "center" }}>{detalheStatus[4]}</p>
        </div>
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
            labels: resumo.map((item) => {
              return item.nome;
            }),

            datasets: [
              {
                data: resumo.map((item) => {
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
    </div>
  );
}

export default ResSolicitacaoStatusB;
