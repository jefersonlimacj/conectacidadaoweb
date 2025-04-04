import style from "../css/categoriaEdit.module.css";
import NavMenu from "../../componentes/nav-menu";
import TopMenu from "../../componentes/top-menu";
import { useNavigate } from "react-router-dom";
import Categorias from "../../jsons/categorias.json";
import Subcategorias from "../../jsons/subcategoria.json";
import { useState } from "react";


function CategoriaStart() {

  const navigate = useNavigate();
  const [cor, setCor] = useState("#555");
  const [cor2, setCor2] = useState("#ddd");
  const [icone, setIcone] = useState("help");
  const [nome, setNome] = useState("Sua Categoria aqui");

  const [nomeSubCat, setNomeSubCat] = useState("Sua Subcategoria aqui...");
  const [subCategorias, setSubcategorias] = useState([]);

  const novaCategoriaId = Categorias.length;

  const adicionarCategoria = () => {
    if (nome.trim() !== "") {
      const novaCategoria = {
        categoria_id: novaCategoriaId,
        nome: nome,
        cor: cor,
        corFont: cor2,
        icone: icone,
      };
      console.log(novaCategoria);
      navigate("/servicos")
    }
  };

  const adicionarSubcategoria = () => {
    if (nomeSubCat.trim() !== "") {
      const novoItem = {
        subcategoria_id: subCategorias.length,
        nome: nomeSubCat,
        categoria_id: novaCategoriaId,
      };

      console.log(novoItem);
      subCategorias.push(novoItem);
      setNomeSubCat("");
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
                  placeholder={nome}
                  onChange={(e) => setNome(e.target.value)}
                />
              </div>
              <div className={style.formLinha2}>
                <div className={style.inputL2}>
                  <p>Cor 1:</p>
                  <input
                    type="color"
                    defaultValue={cor}
                    className={style.inputColor}
                    onChange={(e) => setCor(e.target.value)}
                  />
                </div>
                <div className={style.inputL2}>
                  <p>Cor 2:</p>
                  <input
                    type="color"
                    defaultValue={cor2}
                    className={style.inputColor}
                    onChange={(e) => setCor2(e.target.value)}
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
                      defaultValue={icone}
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
                    backgroundColor: cor,
                    boxShadow: `3px 3px 10px ${cor + "50"}`,
                  }}
                >
                  <span
                    className="material-symbols-rounded"
                    style={{ color: cor2 }}
                  >
                    {icone}
                  </span>
                </div>
                <h1 style={{ color: cor }}>{nome}</h1>
              </div>
            </form>
            <div className={style.dividerH}></div>
            <p>
              <strong>{`Subcategorias de ${nome}`}</strong>
            </p>
            <div className={style.cadastroNovaSubCat}>
              <p style={{ width: "20%" }}>Cadastrar nova Subcategoria</p>
              <div className={style.dividerH}></div>
              <input
                type="text"
                name=""
                id=""
                placeholder={nomeSubCat}
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
                onClick={() => adicionarSubcategoria()}
              >
                <span className="material-symbols-rounded">playlist_add</span>
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
                  <th>X</th>
                </tr>
              </thead>
              <tbody>
                {subCategorias.length === 0 ? (
                  <tr>
                    <td>Não há Subcategorias</td>
                    <td>-</td>
                    <td>-</td>
                    <td>-</td>
                  </tr>
                ) : (
                  subCategorias.map((subcategoria) => {
                    return (
                      <tr key={subcategoria.subcategoria_id}>
                        <td>{subcategoria.subcategoria_id}</td>
                        <td>{subcategoria.nome}</td>
                        <td>
                          <span className="material-symbols-rounded">edit</span>
                        </td>
                        <td>
                          <span className="material-symbols-rounded">
                            block
                          </span>
                        </td>
                      </tr>
                    );
                  })
                )}
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
              <a href="/servicos">cancelar</a>
              <button
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "10px",
                }}
                onClick={() => adicionarCategoria()}
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
export default CategoriaStart;
