import TopMenu from "../../componentes/top-menu";
import NavMenu from "../../componentes/nav-menu";
import style from "../css/servico.module.css";
import { useParams, useNavigate } from "react-router-dom";
// import categorias from "../../jsons/categorias.json";
import solicitacoes from "../../jsons/solicitacoesEfeturadas.json";
import CXStatus from "../../componentes/cardsRelatorios/cardCXStatus";
// import Subcategorias from "../../jsons/subcategoria.json";
import { useState, useEffect } from "react";
import CardTabela from "../../componentes/cardsRelatorios/cardTabela";
import api from "../../../service/api";

function Servico() {
  const { ct_id } = useParams();
  const navigate = useNavigate();

  const [lista, setLista] = useState([]);

  const [categoria, setCategoria] = useState([]);

  const [Subcategorias, setSubcategorias] = useState([]);

  const [detalhesCategoria, setDetalhesCategoria] = useState(ct_id);

  useEffect(() => {
    const carregarCategoria = async () => {
      try {
        const respostaCategoria = await api.get(`/servico/categorias/${ct_id}`);
        const respostaSubCategoria = await api.get(`/servico/subcategorias`);
        let dados = respostaCategoria.data.result[0];
        let listaSub = respostaSubCategoria.data.result;
        let filtroListaSub = listaSub.filter(
          (item) => item.categoria_id === dados.id
        );
        setCategoria(dados);
        setSubcategorias(filtroListaSub);
        setDetalhesCategoria(dados);
      } catch (err) {
        throw err;
      }
    };
    carregarCategoria();
  }, [ct_id]);

  const solCategorias = solicitacoes.filter((sol) => {
    return sol.categoria_id === categoria.id;
  });

  const resSubCategoria = Subcategorias.filter((item) => {
    return item.categoria_id === categoria.id;
  });

  const determinarLista = (subCatId) => {
    const lista = solCategorias.filter(
      (item) => item.subcategoria_id === subCatId
    );

    return setLista(lista);
  };

  const solCatPN = solCategorias.filter((sol) => {
    return sol.status === "Pedido Negado";
  });
  const solCatPE = solCategorias.filter((sol) => {
    return sol.status === "Processando Envio";
  });
  const solCatAR = solCategorias.filter((sol) => {
    return sol.status === "Aguardando Resposta";
  });
  const solCatAA = solCategorias.filter((sol) => {
    return sol.status === "Atendimento Agendado";
  });
  const solCatSA = solCategorias.filter((sol) => {
    return sol.status === "Solicitação Atendida";
  });

  return (
    <>
      <TopMenu />
      <div className={style.main}>
        <NavMenu />
        <div className={style.section}>
          <div className={style.base}>
            <div className={style.optTopo}>
              <div className={style.catOpt}>
                <p
                  className={style.btnAct}
                  onClick={() => navigate("/servicos")}
                >
                  <span className="material-symbols-rounded"> arrow_back </span>
                  Voltar
                </p>
                <p>Detalhes da Categoria</p>
              </div>
              <div className={style.dividerH}></div>
              <div className={style.actOpt}>
                <div
                  className={style.btnAct}
                  title="Editar Categoria"
                  onClick={() =>
                    navigate(
                      `/editarcategoria/${ct_id}`
                    )
                  }
                >
                  <span className="material-symbols-rounded"> edit </span>
                </div>
                <div className={style.btnAct}>
                  <span
                    className="material-symbols-rounded"
                    title="Desativar Categoria"
                  >
                    block
                  </span>
                </div>
              </div>
            </div>
            <div className={style.linhaStatus}>
              <div className={style.cxDialogo}>
                <p>Todos os dados referêntes a:</p>
                <div
                  className={style.iconeCategoriaP}
                  style={{
                    backgroundColor: detalhesCategoria.corPrimaria,
                    boxShadow: `1px 1px 8px ${
                      detalhesCategoria.corPrimaria + "88"
                    }`,
                  }}
                >
                  <span
                    className="material-symbols-rounded"
                    style={{ color: detalhesCategoria.corSecundaria }}
                  >
                    {detalhesCategoria.icone}
                  </span>
                </div>
                <h2
                  style={{
                    color: detalhesCategoria.corPrimaria,
                    textAlign: "center",
                  }}
                >
                  {detalhesCategoria.nome}
                </h2>
              </div>
              <CXStatus
                _listaQntStatus={solCatPN}
                _nome="Pedido Negado"
                _click={() => setLista(solCatPN)}
              />
              <CXStatus
                _listaQntStatus={solCatPE}
                _nome="Processando Envio"
                _click={() => setLista(solCatPE)}
              />
              <CXStatus
                _listaQntStatus={solCatAR}
                _nome="Aguardando Resposta"
                _click={() => setLista(solCatAR)}
              />
              <CXStatus
                _listaQntStatus={solCatAA}
                _nome="Atendimento Agendado"
                _click={() => setLista(solCatAA)}
              />
              <CXStatus
                _listaQntStatus={solCatSA}
                _nome="Solicitação Atendida"
                _click={() => setLista(solCatSA)}
              />
            </div>
            <table>
              <thead>
                <tr>
                  <th>Id</th>
                  <th>Subcategoria</th>
                  <th>Qnt.</th>
                </tr>
              </thead>
              <tbody>
                {resSubCategoria.map((item) => {
                  const totalSolicitacoes = solicitacoes.filter(
                    (sol) => sol.subcategoria_id === item.id
                  ).length;

                  return (
                    <tr key={item.id} onClick={() => determinarLista(item.id)}>
                      <td style={{ paddingLeft: "15px" }}>
                        <strong>{item.id}</strong>
                      </td>
                      <td>{item.nome}</td>
                      <td>{totalSolicitacoes}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <CardTabela _listaSolicitacoes={lista} />
        </div>
      </div>
    </>
  );
}
export default Servico;
