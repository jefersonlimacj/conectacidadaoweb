import NavMenu from "../../componentes/nav-menu";
import TopMenu from "../../componentes/top-menu";
import style from "../../paginas/css/usuariosLista.module.css";
import CardTabelaUsuarios from "../../componentes/cardsRelatorios/cardTabelaUsuarios";
import usuarios from "../../jsons/usuarios.json";
import { useNavigate } from "react-router-dom";

function UsuariosLista() {
  const navigate = useNavigate();

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
                alignItems: "center",
                width: "100%",
                justifyContent: "space-between",
                gap: "10px",
              }}
            >
              <p>Cadastrar novo Usuário</p>
              <div className={style.dividerH} />
              <button
                onClick={() => {
                  navigate("/cadastros/usuarioslista/criar");
                }}
              >
                Cadastrar
              </button>
            </div>
          </div>
          <CardTabelaUsuarios _list={usuarios} />
        </div>
      </div>
    </>
  );
}
export default UsuariosLista;
