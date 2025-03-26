import style from "./css/cardResSolicitacoesStatus.module.css";
import { Doughnut } from "react-chartjs-2";
import { Navigate, useNavigate } from "react-router-dom";

const statusIcones = {
  "Pedido Negado": ["block", "#CC3A3A", "#460909", "#46090950"],
  "Aguardando Resposta": ["schedule", "#E5CE00", "#6D6200", "#6D620050"],
  "Atendimento Agendado": [
    "pending_actions",
    "#6399C2",
    "#112f46",
    "#112f4650",
  ],
  "Solicitação Atendida": ["check_circle", "#57CE6E", "#144b1f", "#144b1f50"],
};

function ResSolicitacoesStatus({ _lista, _statusTipo }) {
  const navigate = useNavigate();

  const solicitacoes = _lista;

  const detalhesStatus = () => statusIcones[_statusTipo];

  const detalhes = detalhesStatus(_statusTipo);

  const valorTotal = solicitacoes.length;

  const valorFiltro = solicitacoes.filter(
    (item) => item.status === _statusTipo
  ).length;

  const valorTotalFiltrado = valorTotal - valorFiltro;

  const porcentagem = () => {
    if (valorFiltro == 0 && valorTotal == 0) {
      return 0
    } else {
      return (valorFiltro / valorTotal) * 100;
    }
  };
  return (
    <>
      <div
        onClick={() => navigate(`/resumostatus/${_statusTipo}`)}
        className={style.cardSolicitacao}
        style={{
          border: `1.5px solid ${detalhes[1]}`,
          boxShadow: `2px 2px 6px ${detalhes[3]}`,
        }}
      >
        <div className={style.titulo} style={{ backgroundColor: detalhes[1] }}>
          <span
            className="material-symbols-rounded"
            style={{ color: detalhes[2] }}
          >
            {detalhes[0]}
          </span>
          <p style={{ color: detalhes[2] }}> {_statusTipo} </p>
        </div>
        <div className={style.grafico}>
          <h1
            style={{
              position: "absolute",
              alignSelf: "center",
              color: detalhes[2],
            }}
          >
            {porcentagem().toFixed(1)}
            <p style={{ color: detalhes[2] }}>%</p>
          </h1>
          <Doughnut
            data={{
              datasets: [
                {
                  labels: ["Pendentes", "Total"],
                  data: [valorFiltro, valorTotalFiltrado],
                  backgroundColor: [detalhes[1], "#EEEEEE"],
                  borderRadius: 10,
                },
              ],
            }}
          />
        </div>
        <div className={style.legenda}>
          <p>
            Total de {_statusTipo}:{" "}
            <strong style={{ color: detalhes[1] }}>{valorFiltro}</strong>
          </p>
        </div>
      </div>
    </>
  );
}

export default ResSolicitacoesStatus;
