import style from "./css/blocoLogin.module.css";

function BlocoLogin() {
  return (
    <>
      <div className={style.cxLogin}>
        <div className={style.cxColumn}>
          <div className={style.contImagem}>
            <img src="assets/Conecta_Cidadao_logo1.png" />
          </div>
          <form action="/home" className={style.login}>
            <input type="email" name="" id="nome" placeholder="E-mail" />
            <input type="password" name="" id="senha" placeholder="Senha" />
            <div className={style.fimForm}>
              <button type="submit">Entrar</button>
              <a href="/inatividade">Esqueci minha senha</a>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default BlocoLogin;
