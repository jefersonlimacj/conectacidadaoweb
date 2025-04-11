import style from "../css/categoriaEdit.module.css";
import NavMenu from "../../componentes/nav-menu";
import TopMenu from "../../componentes/top-menu";
import { useNavigate } from "react-router-dom";
import Categorias from "../../jsons/categorias.json";
import Subcategorias from "../../jsons/subcategoria.json";
import { useEffect, useState } from "react";
import api from "../../../service/api";

function CategoriaStart() {
  const navigate = useNavigate();
  const [corPrimaria, setCorPrimaria] = useState("#555");
  const [corSecundaria, setCorSecundaria] = useState("#ddd");
  const [icone, setIcone] = useState("help");
  const [nome, setNome] = useState("Sua Categoria aqui");

  const adicionarCategoria = async (e) => {
    e.preventDefault();

    try {
      const novaCategoria = await api.post("/servico/categorias", {
        nome,
        corPrimaria,
        corSecundaria,
        icone,
      });
      alert(novaCategoria.data.mensagem);
      console.log(novaCategoria);
      navigate("/servicos");
    } catch (err) {
      return err;
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
                Insira a baixo as informações para criar uma nova Categoria.
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
                    defaultValue={corPrimaria}
                    className={style.inputColor}
                    onChange={(e) => setCorPrimaria(e.target.value)}
                  />
                </div>
                <div className={style.inputL2}>
                  <p>Cor 2:</p>
                  <input
                    type="color"
                    defaultValue={corSecundaria}
                    className={style.inputColor}
                    onChange={(e) => setCorSecundaria(e.target.value)}
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
                onClick={(e) => adicionarCategoria(e)}
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
