import style from "../css/categoriaEdit.module.css";
import NavMenu from "../../componentes/nav-menu";
import TopMenu from "../../componentes/top-menu";
import { useParams, useNavigate } from "react-router-dom";
// import Categorias from "../../jsons/categorias.json";
// import Subcategorias from "../../jsons/subcategoria.json";
import { useState, useEffect } from "react";
import api from "../../../service/api";

function CategoriaEdit() {
  const { ct_id } = useParams();

  const navigate = useNavigate();

  const [categoria, setCategoria] = useState([]);

  const [subCategorias, setSubcategorias] = useState([]);

  useEffect(() => {
    const carregarCategoria = async () => {
      try {
        const respostaCategoria = await api.get(`/servico/categorias/${ct_id}`);
        const respostaSubCategoria = await api.get(`/servico/subcategorias`);
        let dados = respostaCategoria.data.result[0];
        let listaSub = respostaSubCategoria.data.result;
        setCategoria(dados);
        setCorPrimaria(dados.corPrimaria);
        setCorSecundaria(dados.corSecundaria);
        setIcone(dados.icone);
        setSubcategorias(listaSub);
      } catch (err) {
        throw err;
      }
    };
    carregarCategoria();
  }, []);

  const [corPrimaria, setCorPrimaria] = useState(categoria.corPrimaria);
  const [corSecundaria, setCorSecundaria] = useState(categoria.corSecundaria);
  const [icone, setIcone] = useState(categoria.icone);
  const [nome, setNome] = useState(categoria.nome);

  const [nomeSubCat, setNomeSubCat] = useState("");
  const [statusSubCat, setStatusSubCat] = useState("");

  const adicionarSubcategoria = async () => {
    const categoria_id = ct_id;

    if (nomeSubCat.trim() === "") return;

    try {
      const resposta = await api.post("/servico/subcategorias", {
        nome: nomeSubCat,
        categoria_id,
      });

      if (resposta.status === 201) {
        // Opcionalmente, você pode retornar a subcategoria criada do backend com ID
        const novaSub = {
          subcategoria_id: resposta.data.id || Date.now(), // fallback
          nome: nomeSubCat,
          categoria_id,
        };

        setSubcategorias((prev) => [...prev, novaSub]);
        alert(resposta.data.mensagem);
      }
    } catch (err) {
      console.error("Erro ao adicionar subcategoria:", err);
      alert("Erro ao adicionar subcategoria");
    }
    setNomeSubCat("");
  };

  const editarNomeSubCat = async (sct_id) => {
    try {
      await api.patch(`/servico/subcategorias/${sct_id}`, {
        nome: nomeSubCat,
        sct_id: sct_id,
      });
      alert("Subcategoria Alterada");
    } catch (err) {
      throw err;
    }
  };

  const editarStatusSubCat = async (sct_id, statusAtual) => {
    const novoStatus = statusAtual === "ativo" ? "inativo" : "ativo";

    try {
      await api.patch(`/servico/subcategorias/status/${sct_id}`, {
        statusSubCat: novoStatus,
        sct_id,
      });

      // Atualiza a lista renderizada na tela após a alteração
      setSubcategorias((prev) =>
        prev.map((item) =>
          item.id === sct_id ? { ...item, statusSubcat: novoStatus } : item
        )
      );

      alert(`Status alterado para: ${novoStatus}`);
    } catch (err) {
      console.error("Erro ao alterar status:", err);
    }
  };

  const filtroSubCat = subCategorias.filter(
    (item) => item.categoria_id == ct_id
  );

  const salvarCategoria = async () => {
    try {
      const dadosAtualizados = {};

      if (nome !== categoria.nome) dadosAtualizados.nome = nome;
      if (corPrimaria !== categoria.corPrimaria)
        dadosAtualizados.corPrimaria = corPrimaria;
      if (corSecundaria !== categoria.corSecundaria)
        dadosAtualizados.corSecundaria = corSecundaria;
      if (icone !== categoria.icone) dadosAtualizados.icone = icone;

      if (Object.keys(dadosAtualizados).length === 0) {
        alert("Nada foi alterado.");
        return;
      }

      const resposta = await api.patch(
        `/servico/categorias/${ct_id}`,
        dadosAtualizados
      );

      alert("Categoria atualizada com sucesso!");
      navigate("/servicos");
      console.log(resposta.data);
    } catch (error) {
      console.error("Erro ao salvar categoria:", error);
      alert("Erro ao salvar categoria.");
    }
  };

  return (
    <>
      <TopMenu />
      <div className={style.main}>
        <NavMenu />
        <div className={style.section}>
          <div className={style.base}>
            <div className={style.topoEdit}>
              <h2>Categoria</h2>
              <p>
                Edite aqui suas configurações e adicione novas Subcategorias.
              </p>
            </div>
            <div className={style.dividerH}></div>
            <form action="" className={style.editCategorias}>
              <div className={style.formLinha1}>
                <p>Nome:</p>
                <input
                  type="text"
                  className={style.inputNome}
                  onChange={(e) => setNome(e.target.value)}
                  defaultValue={categoria.nome}
                />
              </div>
              <div className={style.formLinha2}>
                <div className={style.inputL2}>
                  <p>Cor 1:</p>
                  <input
                    type="color"
                    defaultValue={categoria.corPrimaria}
                    className={style.inputColor}
                    onChange={(e) => setCorPrimaria(e.target.value)}
                  />
                </div>
                <div className={style.inputL2}>
                  <p>Cor 2:</p>
                  <input
                    type="color"
                    className={style.inputColor}
                    onChange={(e) => setCorSecundaria(e.target.value)}
                    defaultValue={categoria.corSecundaria}
                  />
                </div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <div className={style.inputL2}>
                    <p>Icone:</p>
                    <input
                      type="text"
                      onChange={(e) => setIcone(e.target.value)}
                      defaultValue={categoria.icone}
                    />
                    <span
                      className="material-symbols-rounded"
                      style={{ fontSize: "medium" }}
                      title="escolha o ícone desejado copie o icon_name e cole nesse campo."
                    >
                      help
                    </span>
                  </div>
                  <p style={{ fontSize: "x-small" }}>
                    Para adicionar um novo ícone, vá até o site
                    <a
                      href="https://fonts.google.com/icons"
                      target="_blank"
                      style={{ fontSize: "x-small" }}
                    >
                      Google Icones
                    </a>
                  </p>
                </div>
              </div>
              <div className={style.dividerH}></div>
              <p>Prévia:</p>
              <div className={style.formLinha3}>
                <div
                  className={style.previaIcone}
                  style={{
                    backgroundColor: corPrimaria,
                    boxShadow: `3px 3px 10px ${corPrimaria + "50"}`,
                  }}
                >
                  <span
                    className="material-symbols-rounded"
                    style={{ color: corSecundaria }}
                  >
                    {icone}
                  </span>
                </div>
                <h1 style={{ color: corPrimaria }}>{nome}</h1>
              </div>
            </form>
            <div className={style.dividerH}></div>
            <p>
              <strong>{`Subcategorias de ${categoria.nome}`}</strong>
            </p>
            <div className={style.cadastroNovaSubCat}>
              <p style={{ width: "20%" }}>Cadastrar nova Subcategoria</p>
              <div className={style.dividerH}></div>
              <input
                type="text"
                name="subcategoria"
                id=""
                onChange={(e) => setNomeSubCat(e.target.value)}
              />
              <button
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "10px",
                }}
                onClick={() => {
                  adicionarSubcategoria();
                }}
              >
                <span className="material-symbols-rounded"> playlist_add </span>
                Adicionar
              </button>
            </div>
            <div className={style.dividerH}></div>
            <table className={style.tabelaSubcategorias}>
              <thead>
                <tr>
                  <th>Id</th>
                  <th>Nome</th>
                  <th>Editar</th>
                  <th> - </th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {filtroSubCat.map((subcategoria) => {
                  return (
                    <tr
                      key={subcategoria.id}
                      style={{
                        alignItems: "center",
                        justifyContent: "space-beetwen",
                      }}
                    >
                      <td
                        style={{
                          paddingLeft: "15px",
                        }}
                      >
                        {subcategoria.id}
                      </td>
                      <td>
                        <input
                          type="text"
                          defaultValue={subcategoria.nome}
                          className={style.inputLista}
                          onChange={(e) => setNomeSubCat(e.target.value)}
                        />
                      </td>
                      <td>
                        <span
                          className={`material-symbols-rounded ${style.btnEditSubClass}`}
                          style={{ fontSize: "medium" }}
                          onClick={() => editarNomeSubCat(subcategoria.id)}
                        >
                          edit
                        </span>
                      </td>
                      <td>
                        <div
                          style={{
                            width: "100px",
                            height: "25px",
                            display: "flex",
                            flexDirection: "row",
                            alignItems: "center",
                            justifyContent: "center",
                            borderRadius: "15px",
                            backgroundColor:
                              subcategoria.statusSubcat === "ativo"
                                ? "green"
                                : "#950505",
                            color:
                              subcategoria.statusSubcat === "ativo"
                                ? "greenyellow"
                                : "#ff582a",
                          }}
                        >
                          {subcategoria.statusSubcat === "ativo"
                            ? "Ativo"
                            : "Inativo"}
                        </div>
                      </td>
                      <td>
                        <div
                          className={style.btnBloquear}
                          title={
                            statusSubCat === "ativo"
                              ? "Inativar Subcategoria"
                              : "Ativar Subcategoria"
                          }
                          onClick={() => {
                            editarStatusSubCat(
                              subcategoria.id,
                              subcategoria.statusSubcat
                            );
                          }}
                        >
                          <span className="material-symbols-rounded">
                            {subcategoria.statusSubcat === "ativo"
                              ? "lock_open"
                              : "lock"}
                          </span>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            <div className={style.dividerH}></div>
            <div
              style={{
                width: "100%",
                display: "flex",
                flexDirection: "row",
                justifyContent: "end",
                alignItems: "center",
                padding: "0 15px",
                gap: "15px",
              }}
            >
              <a href="/servicos">Voltar</a>
              <button
                onClick={() => salvarCategoria()}
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "10px",
                }}
              >
                <span
                  className="material-symbols-rounded"
                  style={{ color: "white" }}
                >
                  save_as
                </span>
                Salvar
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default CategoriaEdit;
