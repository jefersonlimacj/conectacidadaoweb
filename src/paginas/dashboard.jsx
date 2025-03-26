import style from "../paginas/css/dashboard.module.css";
import CardR1 from "../componentes/cardsRelatorios/cardR1";
import CardR2 from "../componentes/cardsRelatorios/cardR2";
import TopMenu from "../componentes/top-menu";
import NavMenu from "../componentes/nav-menu";
import CardTabela from "../componentes/cardsRelatorios/cardTabela";
import CardEnquete from "../componentes/cardsRelatorios/cardEnquetes";
import CardTabelaRes from "../componentes/cardsRelatorios/cardTabelaRes";
import HeaderFilters from "../componentes/headerFilters";
import solicitacoes from "../jsons/solicitacoesEfeturadas.json"

function Dashboard() {

  const processando = solicitacoes.filter((item) => item.status === "Processando Envio")
  
  return (
    <>
      <TopMenu />
      <div className={style.main}>
        <NavMenu />
        <div className={style.section}>
          <HeaderFilters />
          <div className={style.dashboardContent}>
            <div className={style.eContent}>
              <CardR1 />
              <CardEnquete />
            </div>
            <div className={style.dContent}>
              <CardR2 />
              <p>Número das Solicitações Por Status</p>
              <CardTabelaRes />
            </div>
          </div>
          <p>Solicitações não Finalizadas</p>
          <CardTabela _listaSolicitacoes={processando}/>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
