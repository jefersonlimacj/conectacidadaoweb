import style from "../css/resStatus.module.css";
import NavMenu from "../../componentes/nav-menu";
import TopMenu from "../../componentes/top-menu";
import { useNavigate, useParams } from "react-router-dom";
import ResSolicitacoesStatusB from "../../componentes/cardsRelatorios/cardResSolicitacoesStatusB";
import solicitacoes from "../../jsons/solicitacoesEfeturadas.json";
// import categorias from "../../jsons/categorias.json";
import CardTabela from "../../componentes/cardsRelatorios/cardTabela";
import api from "../../../service/api";
import { useState, useEffect } from "react";

function ResumoStatus() {
  const navigate = useNavigate();
  const { rs_id } = useParams();

  const [usuarios, setUsuarios] = useState({});
    const [categoria, setCategoria] = useState([]);
    const [subcategoria, setSubcategoria] = useState([]);
  
    useEffect(() => {
      const buscarDados = async () => {
        try {
          const dadosUsuario = await api.get(`/cadastro/usuarios`);
          const dadosCategoria = await api.get(`/servico/categorias`);
          const dadosSubcategoria = await api.get(`/servico/subcategorias`);
          setUsuarios(dadosUsuario.data.result);
          setCategoria(dadosCategoria.data.result);
          setSubcategoria(dadosSubcategoria.data.result);
        } catch (error) {
          console.error("Erro ao buscar usuário:", error);
        }
      };
      buscarDados();
    }, []);

  const pendentes = solicitacoes.filter(
    (solicitacao) => solicitacao.status === rs_id
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
        nome: `${categoria[solicitacao.categoria_id]?.nome || "Carregando..."}`,
        quantidade: 1,
      });
    }

    return acc;
  }, []);

  return (
    <>
      <TopMenu />
      <div className={style.main}>
        <NavMenu />
        <div className={style.section}>
          <ResSolicitacoesStatusB total={pendentes} resumo={solicitacoesPendentes} rs_id={rs_id}/>
          <CardTabela _listaSolicitacoes={pendentes}/>
        </div>
      </div>
    </>
  );
}
export default ResumoStatus;
