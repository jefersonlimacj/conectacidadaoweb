import style from "../paginas/css/dashboard.module.css";
import CardR1 from "../componentes/cardsRelatorios/cardR1";
import CardR2 from "../componentes/cardsRelatorios/cardR2";
import TopMenu from "../componentes/top-menu";
import NavMenu from "../componentes/nav-menu";
import CardTabela from "../componentes/cardsRelatorios/cardTabela";
import CardEnquete from "../componentes/cardsRelatorios/cardEnquetes";
import CardTabelaRes from "../componentes/cardsRelatorios/cardTabelaRes";
import HeaderFilters from "../componentes/headerFilters";
import solicitacoes from "../jsons/solicitacoesEfeturadas.json";
import { useState, useEffect } from "react";
import api from "../../service/api";

function Dashboard() {
  const [usuarios, setUsuarios] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [subcategorias, setSubcategorias] = useState([]);

  useEffect(() => {
    const pegarUsuario = async () => {
      try {
        const dadosUsuario = await api.get(`/cadastro/usuarios`);
        const dadosCategoria = await api.get(`/servico/categorias`);
        const dadosSubcategoria = await api.get(`/servico/subcategorias`);
        setUsuarios(dadosUsuario.data.result);
        setCategorias(dadosCategoria.data.result);
        setSubcategorias(dadosSubcategoria.data.result);
      } catch (error) {
        console.error("Erro ao buscar usuário:", error);
      }
    };
    pegarUsuario();
  }, []);

  const processando = solicitacoes.filter(
    (item) => item.status === "Processando Envio"
  );

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
          <CardTabela
            _listaSolicitacoes={processando}
            _listaUsuarios={usuarios}
            _listaCategorias={categorias}
            _listaSubcategorias={subcategorias}
          />
        </div>
      </div>
    </>
  );
}

export default Dashboard;
