import TopMenu from "../../componentes/top-menu";
import NavMenu from "../../componentes/nav-menu";
import style from "../css/servico.module.css";
import { useParams, useNavigate } from "react-router-dom";
import categorias from "../../jsons/categorias.json";
import solicitacoes from "../../jsons/solicitacoesEfeturadas.json";
import CXStatus from "../../componentes/cardsRelatorios/cardCXStatus";
import Subcategorias from "../../jsons/subcategoria.json";
import { useState } from "react";
import CardTabela from "../../componentes/cardsRelatorios/cardTabela";

function Servico() {
  const { ct_id } = useParams();
  const navigate = useNavigate();

  const detalhesCategoria = categorias[ct_id];

  const [lista, setLista] = useState([]);

  const solCategorias = solicitacoes.filter((sol) => {
    return sol.categoria_id === detalhesCategoria.categoria_id;
  });

  const solCatSubN = solCategorias.map((item) => {
    return { subcategoria_id: item.subcategoria_id, id: item.id };
  });

  const resSubCategoria = solCatSubN.reduce((acc, item) => {
    let itemFiltrado = acc.find(
      (itemB) => itemB.subcategoria_id === item.subcategoria_id
    );

    if (itemFiltrado) {
      itemFiltrado.quantidade += 1;
    } else {
      acc.push({
        subcategoria_id: item.subcategoria_id,
        nome: Subcategorias[item.subcategoria_id].nome,
        quantidade: 1,
      });
    }

    return acc;
  }, []);

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
                    navigate(`/editarcategoria/${detalhesCategoria.categoria_id}`)
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
            <div className={style.linhaStatus} >
              <div className={style.cxDialogo}>
                <p>Todos os dados referêntes a:</p>
                <div
                  className={style.iconeCategoriaP}
                  style={{
                    backgroundColor: detalhesCategoria.cor,
                    boxShadow: `1px 1px 8px ${detalhesCategoria.cor + "88"}`,
                  }}
                >
                  <span
                    className="material-symbols-rounded"
                    style={{ color: "white" }}
                  >
                    {detalhesCategoria.icone}
                  </span>
                </div>
                <h2 style={{ color: detalhesCategoria.cor, textAlign: "center" }}>
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
                  return (
                    <tr
                      key={item.subcategoria_id}
                      onClick={() => determinarLista(item.subcategoria_id)}
                    >
                      <td>
                        <strong>{item.subcategoria_id}</strong>
                      </td>
                      <td>{item.nome}</td>
                      <td>{item.quantidade}</td>
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
