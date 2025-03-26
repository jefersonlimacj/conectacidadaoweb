import style from "../css/gestoredit.module.css";
import TopMenu from "../../componentes/top-menu";
import NavMenu from "../../componentes/nav-menu";

function CriarGestor() {

  return (
    <>
      <TopMenu />
      <div className={style.main}>
        <NavMenu />
        <div className={style.section}>
          <div className={style.baseCadastroGestor}>
            <h1 style={{ textAlign: "center" }}>Cadastrar novo Gestor</h1>
            <div className={style.cxTexto}>
              <p>
                Para criar novo gestor é necessário preencher corretamente o
                formulário abaixo com os respectivos dados cadastrais. Os campos
                com * são de preenchimento obrigatório e essenciais para o
                sistema.
              </p>
            </div>
            <div className={style.dividerH}></div>
            <form action="" className={style.formCadastro}>
              <label for="firstName">Nome:</label>
              <input type="text" id="firstName" name="first_name" required />

              <label for="lastName">Sobrenome:</label>
              <input type="text" id="lastName" name="last_name" required />

              <label for="email">Email:</label>
              <input type="email" id="email" name="email" required />

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
export default CriarGestor;
