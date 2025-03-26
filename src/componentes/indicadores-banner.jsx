import style from "../componentes/css/indicadoresBanner.module.css";
import solicitacoes from "../jsons/solicitacoesEfeturadas.json"

function IndicadoresBanner() {

  const indPN = solicitacoes.filter((item) => item.status === "Pedido Negado")
  const indPE = solicitacoes.filter((item) => item.status === "Processando Envio")
  const indAR = solicitacoes.filter((item) => item.status === "Aguardando Resposta")
  const indAA = solicitacoes.filter((item) => item.status === "Atendimento Agendado")
  const indSA = solicitacoes.filter((item) => item.status === "Solicitação Atendida")

  return (
    <>
      <div className={style.indicadores}>
        <div className={style.topoResumo}>
          <h4> Indicadores </h4>
          <h4 className={style.mesReferencia}> Março 2025 </h4>
        </div>
        <ul>
          <li>
            <a>
              <span className={`material-symbols-rounded`} style={{backgroundColor:"#CC3A3A"}}>
                block
              </span>
              <p> Cancelados </p>
            </a>
            <p className={style.cancelado}> {indPN.length} </p>
          </li>
          <li>
            <a>
              <span className={`material-symbols-rounded`} style={{backgroundColor:"#E8A25C"}}>warning</span>
              <p>Processando Envio</p>
            </a>
            <p className={style.enviando}> {indPE.length} </p>
          </li>
          <li>
            <a>
              <span className={`material-symbols-rounded`} style={{backgroundColor:"#E5CE00"}}>
                schedule
              </span>
              <p>Aguardando Resposta</p>
            </a>
            <p className={style.aguardando}> {indAR.length} </p>
          </li>
          <li>
            <a>
              <span className={`material-symbols-rounded`} style={{backgroundColor:"#6399C2"}}>
                pending_actions
              </span>
              <p>Atendimento Agendado</p>
            </a>
            <p className={style.agendado}> {indAA.length} </p>
          </li>
          <li>
            <a>
              <span className={`material-symbols-rounded`} style={{backgroundColor:"#57CE6E"}}>
                check_circle
              </span>
              <p>Feito</p>
            </a>
            <p className={style.feito}> {indSA.length} </p>
          </li>
        </ul>
      </div>
    </>
  );
}

export default IndicadoresBanner;
