import style from "../css/gestoredit.module.css";
import TopMenu from "../../componentes/top-menu";
import NavMenu from "../../componentes/nav-menu";
import { useParams } from "react-router-dom";
import usuarios from "../../jsons/usuarios.json";

function EditarUsuario() {
  const { u_id } = useParams();

  const usuario = usuarios[u_id];

  return (
    <>
      <TopMenu />
      <div className={style.main}>
        <NavMenu />
        <div className={style.section}>
          <div className={style.baseCadastroGestor}>
            <h1 style={{ textAlign: "center" }}>Editar Informações do Usuário</h1>
            <div className={style.cxTexto}>
              <p>
                Edite abaixo informações do usuário.
              </p>
            </div>
            <div className={style.dividerH}></div>
            <form action="" className={style.formCadastro}>
              <label for="firstName">Nome:</label>
              <input
                type="text"
                id="firstName"
                name="first_name"
                placeholder={usuario.nome}
                required
              />

              <label for="lastName">Sobrenome:</label>
              <input
                type="text"
                id="lastName"
                name="last_name"
                placeholder={usuario.nome}
                required
              />

              <label for="email">Email:</label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder={usuario.email}
                required
              />

              <label for="password">Senha:</label>
              <input type="password" id="password" name="password" required />

              <label for="confirmPassword">Confirmar Senha:</label>
              <input
                type="password"
                id="confirmPassword"
                name="password_confirmation"
                required
              />

              <label for="profilePicture">Foto de Perfil:</label>
              <div style={{ width: "100px" }}></div>
              <input
                type="file"
                id="profilePicture"
                name="profile_picture"
                accept="image/*"
              />

              <button type="submit">Cadastrar</button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
export default EditarUsuario;
