import { useEffect, useState } from "react";
import NavMenu from "../componentes/nav-menu";
import TopMenu from "../componentes/top-menu";
import style from "../paginas/css/cadastros.module.css";
import { useNavigate } from "react-router-dom";
import api from "../../service/api";
import usuariosFinal from "../jsons/usuarios.json";

function Cadastros() {
  const navigate = useNavigate();

  return (
    <>
      <TopMenu />
      <div className={style.main}>
        <NavMenu />
        <div className={style.section}>
          <p>Selecione o tipo de cadastro:</p>
          <div style={{ display: "flex", flexDirection: "row", gap: "15px" }}>
            <div
              className={style.base}
              onClick={() => navigate("/cadastros/gestoreslista")}
            >
              <span className="material-symbols-rounded">manage_accounts</span>
              <h3>Gestores</h3>
            </div>
            <div
              className={style.base}
              onClick={() => navigate("/cadastros/usuarioslista")}
            >
              <span className="material-symbols-rounded"> person </span>
              <h3>Usuários</h3>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default Cadastros;
