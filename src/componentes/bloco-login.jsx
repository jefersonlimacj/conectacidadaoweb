import style from "./css/blocoLogin.module.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../service/api";

function BlocoLogin() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  const navigate = useNavigate();

  const logarUsuario = async (event) => {
    event.preventDefault(); // Evita o recarregamento da página

    try {
      const response = await api.post("/login", { email, senha });

      if (response.status === 200) { //Se OK no servidor redireciona, ainda preciso criar o tokem para autenticação
        navigate("/home");
      } else {
        console.error("Login falhou. Status:", response.status);
      }
    } catch (error) {
      console.error("Erro ao fazer login:", error);
    }
  
  };

  return (
    <>
      <div className={style.cxLogin}>
        <div className={style.cxColumn}>
          <div className={style.contImagem}>
            <img src="assets/Conecta_Cidadao_logo1.png" />
          </div>
          <form className={style.login} onSubmit={logarUsuario}>
            <input
              type="email"
              name=""
              id="nome"
              placeholder="E-mail"
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              name=""
              id="senha"
              placeholder="Senha"
              onChange={(e) => setSenha(e.target.value)}
            />
            <div className={style.fimForm}>
              <button type="submit">
                Entrar
              </button>
              <a href="/inatividade">Esqueci minha senha</a>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default BlocoLogin;
