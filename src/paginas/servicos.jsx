import style from "../paginas/css/servicos.module.css";
import TopMenu from "../componentes/top-menu";
import NavMenu from "../componentes/nav-menu";
// import categorias from "../jsons/categorias.json";
// import subcategorias from "../jsons/subcategoria.json";
import status from "../jsons/status.json";
import solicitacoes from "../jsons/solicitacoesEfeturadas.json";
import { useNavigate } from "react-router-dom";
import { Bar } from "react-chartjs-2";
import api from "../../service/api";
import { useEffect, useState } from "react";

function Servicos() {
  const navigate = useNavigate();

  const [categorias, setCategorias] = useState([]);
  const [subcategorias, setSubcategorias] = useState([]);

  const editarStatusCat = async (ct_id, statusAtual) => {
    const novoStatus = statusAtual === "ativo" ? "inativo" : "ativo";
    try {
      await api.patch(`/servico/categorias/status/${ct_id}`, {
        statusCat: novoStatus,
      });

      // Atualiza a lista renderizada na tela após a alteração
      setCategorias((prev) =>
        prev.map((item) =>
          item.id === ct_id ? { ...item, statusCat: novoStatus } : item
        )
      );

      // alert(`Status alterado para: ${novoStatus}`);
    } catch (err) {
      console.error("Erro ao alterar status:", err);
    }
  };

  useEffect(() => {
    const carregarCategorias = async () => {
      try {
        const pegarCat = await api.get("/servico/categorias");
        const pegarSubCat = await api.get("/servico/subcategorias");
        setCategorias(pegarCat.data.result);
        setSubcategorias(pegarSubCat.data.result);
      } catch (err) {
        throw err;
      }
    };
    carregarCategorias();
  }, []);

  return (
    <>
      <TopMenu />
      <div className={style.main}>
        <NavMenu />
        <div className={style.section}>
          <div className={style.base}>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <p>Criar Nova Categoria</p>
              <div className={style.dividerH}></div>
              <button onClick={() => navigate("/criarcategoria")}>Criar</button>
            </div>
          </div>
          <div className={style.base}>
            <table>
              <thead>
                <tr>
                  <th>Icone</th>
                  <th>Nome</th>
                  <th>SubCategorias</th>
                  <th>Detalhes</th>
                  <th>Ações</th>
                </tr>
              </thead>
              <tbody>
                {categorias.map((categoria) => {
                  const subCat = subcategorias.filter(
                    (item) => item.categoria_id == categoria.id
                  );

                  const solCat = solicitacoes.filter(
                    (item) => item.id === categoria.id
                  );

                  const statusPN = solCat.filter(
                    (item) => item.status === "Pedido Negado"
                  );
                  const statusPE = solCat.filter(
                    (item) => item.status === "Processando Envio"
                  );
                  const statusAR = solCat.filter(
                    (item) => item.status === "Aguardando Resposta"
                  );
                  const statusAA = solCat.filter(
                    (item) => item.status === "Atendimento Agendado"
                  );
                  const statusSA = solCat.filter(
                    (item) => item.status === "Solicitação Atendida"
                  );
                  return (
                    <tr
                      key={categoria.id}
                      style={{
                        opacity: categoria.statusCat === "ativo" ? 1 : 0.4,
                      }}
                    >
                      <td>
                        <div
                          className={style.iconeCategoria}
                          style={{
                            backgroundColor:
                              categoria.statusCat === "ativo"
                                ? categoria.corPrimaria
                                : "grey",
                          }}
                        >
                          <span
                            className="material-symbols-rounded"
                            style={{
                              color:
                                categoria.statusCat === "ativo"
                                  ? categoria.corSecundaria
                                  : "black",
                            }}
                          >
                            {categoria.icone}
                          </span>
                        </div>
                      </td>
                      <td>
                        <strong>{categoria.nome}</strong>
                      </td>
                      <td>
                        <div className={style.listaSubCategorias}>
                          {subCat.slice(-3).map((item) => {
                            return <p key={item.id}>{item.nome}</p>;
                          })}
                          <a
                            onClick={() => navigate(`/servico/${categoria.id}`)}
                          >
                            Ver mais...
                          </a>
                        </div>
                      </td>
                      <td>
                        <div className={style.grafico}>
                          <Bar
                            options={{
                              responsive: true,
                              aspectRatio: false,
                              plugins: { legend: { display: false } },
                              scales: {
                                x: {
                                  display: false,
                                },
                                y: {
                                  display: true,
                                },
                              },
                            }}
                            data={{
                              labels: status.map((item) => item.status),
                              datasets: [
                                {
                                  data: [
                                    statusPN.length,
                                    statusPE.length,
                                    statusAR.length,
                                    statusAA.length,
                                    statusSA.length,
                                  ],
                                  backgroundColor: [
                                    "#CC3A3A",
                                    "#E8A25C",
                                    "#E5CE00",
                                    "#6399C2",
                                    "#57CE6E",
                                  ],
                                },
                              ],
                            }}
                          />
                        </div>
                      </td>
                      <td>
                        <div className={style.actCat}>
                          <span
                            className={`material-symbols-rounded ${style.actBatBtn}`}
                            onClick={
                              categoria.statusCat === "ativo"
                                ? () =>
                                    navigate(`/editarcategoria/${categoria.id}`)
                                : () => {}
                            }
                          >
                            edit
                          </span>
                          <span
                            style={{
                              backgroundColor:
                                categoria.statusCat === "ativo"
                                  ? "white"
                                  : "red",
                            }}
                            onClick={() => {
                              editarStatusCat(
                                categoria.id,
                                categoria.statusCat
                              );
                            }}
                            className={`material-symbols-rounded ${style.actBatBtn}`}
                          >
                            block
                          </span>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}

export default Servicos;
