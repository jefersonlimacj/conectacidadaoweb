import style from "./css/inatividade.module.css";

function Inatividade() {
  const imgDefault =
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS84_7_fFb0sw22D9ijKueKKiysMDBLccvWog&s";

  return (
    <>
      <div className={style.mainContainer}>
        <div className={style.validacaoContent}>
          <img src="\assets\Conecta_Cidadao_logo1.png" alt="" />
          <div className={style.msgDesconectado}>
            <div className={style.textoDesconectado}>
              <span>Olá, Ana Maria</span>
              <p>, você foi desconectado por tempo de inatividade.</p>
            </div>
            <p className={style.textoSecundario}>
              digite a baixo sua senha, para confirmar sua identidade.
            </p>
          </div>
          <div className={style.senhaConfirmacao}>
            <div className={style.fotoUsuario}>
              <div
                className={style.foto}
                style={{
                  backgroundImage: `url(${imgDefault})`,
                  backgroundSize: "contain",
                }}
              ></div>
            </div>
            <form className={style.campoSenha}>
              <input type="password" />
              <button type="submit">
                <i className="material-symbols-rounded"> arrow_right </i>
              </button>
            </form>
          </div>
          <a href="/">sair</a>
        </div>
        <div className={style.footer}>
          <a href="/">Desenvolvido por Gerenciar Tecnologia</a>
        </div>
      </div>
    </>
  );
}

export default Inatividade;
