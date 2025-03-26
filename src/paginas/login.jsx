import BlocoLogin from "../componentes/bloco-login";
import style from "./css/login.module.css"

function Login() {
  return (
    <>
      <div className={style.mainContainer}>
        <div className={style.loginPlace}>
          <BlocoLogin />
        </div>
        <div className={style.footer}>
          <a href="/">Desenvolvido por Gerenciar Tecnologia</a>
        </div>
      </div>
    </>
  );
}

export default Login;
