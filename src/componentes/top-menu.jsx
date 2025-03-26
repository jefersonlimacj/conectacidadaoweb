import style from "../componentes/css/topMenu.module.css";
import { NavLink } from "react-router-dom";

function TopMenu() {
  return (
    <>
      <div className={style.topMenu}>
        <img src="\assets\Conecta_Cidadao_logo2.png" alt="" />
        <div className={style.acoesBtn} title="Sair">
          <NavLink to={"/"}>
            <div className={style.btnAct}>
              <i className="material-symbols-rounded">logout </i>
            </div>
          </NavLink>
        </div>
      </div>
    </>
  );
}

export default TopMenu;
