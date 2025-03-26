import NavMenu from "../../componentes/nav-menu";
import TopMenu from "../../componentes/top-menu";
import style from "../../paginas/css/gestoresLista.module.css";
import usuarios from "../../jsons/gestao.json";
import { useNavigate } from "react-router-dom";

function GestoresLista() {
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
                justifyContent: "space-between",
                gap: "10px",
              }}
            >
              <p>Cadastrar novo Gestor</p>
              <div className={style.dividerH} />
              <button
                onClick={() => {
                  navigate("/cadastros/gestoreslista/criar");
                }}
              >
                Cadastrar
              </button>
            </div>
          </div>
          <div className={style.base}>
            <div className={style.filtros}>
              <p style={{ textAlign: "left" }}>Filtro de Pesquisa</p>
              <div className={style.dividerH}></div>
              <div className={style.filtros}>
                <input type="text" placeholder="Por nome" />
                <input type="text" placeholder="Por Setor" />
                <select name="" id="">
                  <option value=""></option>
                  <option value="ativo">Ativo</option>
                  <option value="bloqueado">Bloqueado</option>
                </select>
                <input type="submit" value={"Buscar"} />
              </div>
            </div>
            <div className={style.dividerH}></div>
            <table>
              <thead>
                <tr>
                  <th>Id</th>
                  <th>Foto</th>
                  <th>Nome</th>
                  <th>Nível</th>
                  <th>Setor</th>
                  <th>Status</th>
                  <th>Ações</th>
                </tr>
              </thead>
              <tbody>
                {usuarios.map((usuario) => {
                  return (
                    <tr key={usuario.gestor_id} onClick={() => navigate(`/cadastros/gestoreslista/editar/${usuario.gestor_id}`)}>
                      <td>{usuario.gestor_id}</td>
                      <td>
                        <img
                          src={`https://picsum.photos/seed/${usuario.gestor_id}-1/200`}
                          alt={`Foto de ${usuario.gestor_id}`}
                        />
                      </td>
                      <td>{usuario.nome}</td>
                      <td>{usuario.nivel}</td>
                      <td>{usuario.setorResp}</td>
                      <td>{usuario.status}</td>
                      <td>
                        <button>s</button>
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
export default GestoresLista;
