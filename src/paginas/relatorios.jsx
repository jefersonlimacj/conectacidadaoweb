import NavMenu from "../componentes/nav-menu";
import TopMenu from "../componentes/top-menu";
import style from "../paginas/css/cadastros.module.css";
import { useNavigate } from "react-router-dom";

function Relatorios() {

    const navigate = useNavigate();

  return (
    <>
      <TopMenu />
      <div className={style.main}>
        <NavMenu />
        <div className={style.section}>
          <p>Selecione o tipo de Relatório</p>
          <div style={{ display: "flex", flexDirection: "row", gap: "15px" }}>
            <div className={style.base} onClick={()=>navigate("/solicitacoes")}>
              <span className="material-symbols-rounded"> mark_chat_unread </span>
              <h3>Solicitações</h3>
            </div>
            <div className={style.base}  onClick={()=>navigate("/usuarios")}>
              <span className="material-symbols-rounded"> person </span>
              <h3>Usuários</h3>
            </div>
            <div className={style.base}  onClick={()=>navigate("/setores")}>
              <span className="material-symbols-rounded"> grid_view </span>
              <h3>Setores</h3>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Relatorios;
