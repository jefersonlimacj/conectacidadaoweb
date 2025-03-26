import style from "../../paginas/css/servico.module.css";
import Status from "../../jsons/status.json";

function CXStatus({ _listaQntStatus, _nome, _click }) {
  const dados = _listaQntStatus;

  const detalhesStatus = Status.find((item) => item.status === _nome);

  return (
    <>
      <div
        onClick={_click}
        className={style.iconesStatus}
        style={{
          border: `5px solid ${detalhesStatus.cor}`,
          boxShadow: `2px 2px 8px ${detalhesStatus.cor + "80"}`,
        }}
      >
        {dados.length > 0 ? (
          <>
            <strong style={{ textAlign: "center" }}>{_nome}</strong>
            <h1
              className={style.nPrincipal}
              style={{ color: detalhesStatus.cor }}
            >
              {dados.length}
            </h1>
            <p>{dados.length === 1 ? "Solicitação" : "Solicitações"}</p>
          </>
        ) : (
          <>
            <div className={style.semDados}>
              <p>Sem dados disponíveis</p>
            </div>
          </>
        )}
      </div>
    </>
  );
}
export default CXStatus;
