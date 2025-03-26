import CardTabela from "../componentes/cardsRelatorios/cardTabela";
import NavMenu from "../componentes/nav-menu";
import TopMenu from "../componentes/top-menu";
import style from "../paginas/css/solicitacoes.module.css";
import solicitacoes from "../jsons/solicitacoesEfeturadas.json";
import ResSolicitacoesStatusV from "../componentes/cardsRelatorios/cardResSolicitacoesStatusV";
import ResSolicitacoesStatus from "../componentes/cardsRelatorios/cardResSolicitacoesStatus";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

function Solicitacoes() {
  return (
    <>
      <TopMenu />
      <div className={style.main}>
        <NavMenu />
        <div className={style.section}>
          <ResSolicitacoesStatusV />
          <div className={style.cartoes}>
            <ResSolicitacoesStatus
              _lista={solicitacoes}
              _statusTipo="Aguardando Resposta"
            />
            <ResSolicitacoesStatus
              _lista={solicitacoes}
              _statusTipo="Atendimento Agendado"
            />
            <ResSolicitacoesStatus
              _lista={solicitacoes}
              _statusTipo="Solicitação Atendida"
            />
            <ResSolicitacoesStatus
              _lista={solicitacoes}
              _statusTipo="Pedido Negado"
            />
          </div>
          <p>Todas as solicitações:</p>
          <CardTabela _listaSolicitacoes={solicitacoes} />
        </div>
      </div>
    </>
  );
}

export default Solicitacoes;
