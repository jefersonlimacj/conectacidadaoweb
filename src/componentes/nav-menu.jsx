import style from "../componentes/css/navMenu.module.css";
import { useNavigate, NavLink } from "react-router-dom";
// import categorias from "../jsons/categorias.json";
import api from "../../service/api";
import { useState, useEffect } from "react";

function NavMenu() {
  const navigate = useNavigate();

  const [categorias, setCategorias] = useState([]);

  useEffect(() => {
    const carregarCategorias = async () => {
      try {
        const pegarCat = await api.get("/servico/categorias");
        setCategorias(pegarCat.data.result);
      } catch (err) {
        throw err;
      }
    };
    carregarCategorias();
  }, []);

  return (
    <>
      <aside>
        <div className={style.userInfo}>
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS84_7_fFb0sw22D9ijKueKKiysMDBLccvWog&s"
            alt="Foto de perfil"
          />
          <p>Olá Ana Maria</p>
          <span>Gestor Nível 3</span>
        </div>
        <nav className={style.menu}>
          <ul>
            <NavLink to="/home">
              <li>
                <span className="material-symbols-rounded">travel_explore</span>
                Mapa
              </li>
            </NavLink>
            <li>
              <div
                onClick={() => navigate("/relatorios")}
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <span className="material-symbols-rounded">finance</span>
                Relatórios
                <i className="material-symbols-rounded"> arrow_right </i>
              </div>

              <div className={style.subMenu}>
                <div className={style.headSubMenu}>
                  <span className="material-symbols-rounded"> finance </span>
                  Relatórios
                </div>
                <ul>
                  <NavLink to="/dashboard">
                    <li> Solicitações </li>
                  </NavLink>
                  <NavLink to="/usuarios">
                    <li> Usuários </li>
                  </NavLink>
                  <NavLink to="/setorresponsavel">
                    <li> Setores </li>
                  </NavLink>
                </ul>
              </div>
            </li>
            <NavLink to="/solicitacoes">
              <li>
                <span className="material-symbols-rounded">
                  mark_chat_unread
                </span>
                Solicitações
              </li>
            </NavLink>
            <NavLink to="/setores">
              <li>
                <span className="material-symbols-rounded"> grid_view </span>
                Setor
              </li>
            </NavLink>
            <li>
              <div
                onClick={() => navigate("/servicos")}
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <span className="material-symbols-rounded"> work </span>
                Serviços
                <i className="material-symbols-rounded"> arrow_right </i>
              </div>
              <div className={`${style.subMenu} ${style.servicos}`}>
                <div className={style.headSubMenu}>
                  <span className="material-symbols-rounded"> work </span>
                  Serviços
                </div>
                <ul>
                  {categorias.map((categoria) => {
                    return (
                      <li
                        key={categoria.id}
                        onClick={() => navigate(`/servico/${categoria.id}`)}
                      >
                        {categoria.nome}
                      </li>
                    );
                  })}
                </ul>
              </div>
            </li>
            <li>
              <div
                onClick={() => navigate("/cadastros")}
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <span className="material-symbols-rounded">
                  manage_accounts
                </span>
                Cadastros
                <i className="material-symbols-rounded"> arrow_right </i>
              </div>

              <div className={style.subMenu}>
                <div className={style.headSubMenu}>
                  <span className="material-symbols-rounded">
                    manage_accounts
                  </span>
                  Cadastros
                </div>
                <ul>
                  <NavLink to="/cadastros/gestoreslista">
                    <li>Gestores</li>
                  </NavLink>
                  <NavLink to="/cadastros/usuarioslista">
                    <li>Usuários</li>
                  </NavLink>
                </ul>
              </div>
            </li>
            <li>
              <span className="material-symbols-rounded"> campaign </span>
              Publicidade
              <i className="material-symbols-rounded"> arrow_right </i>
              <div className={style.subMenu}>
                <div className={style.headSubMenu}>
                  <span className="material-symbols-rounded"> campaign </span>
                  Publicidade
                </div>
                <ul>
                  <li>Banners</li>
                  <li>Notícias</li>
                </ul>
              </div>
            </li>
            <li>
              <span className="material-symbols-rounded">contact_support</span>
              Enquetes
              <i className="material-symbols-rounded"> arrow_right </i>
              <div className={style.subMenu}>
                <div className={style.headSubMenu}>
                  <span className="material-symbols-rounded">
                    contact_support
                  </span>
                  Enquetes
                </div>
                <ul>
                  <li>Enquetes</li>
                  <li>Petições</li>
                  <li>Sugestões</li>
                </ul>
              </div>
            </li>
            <li>
              <span className="material-symbols-rounded"> settings </span>
              Configurações
            </li>
          </ul>
        </nav>
        <footer>
          <a href="/"> Desenvolvido por Gerenciar Tecnologia </a>
        </footer>
      </aside>
    </>
  );
}

export default NavMenu;
