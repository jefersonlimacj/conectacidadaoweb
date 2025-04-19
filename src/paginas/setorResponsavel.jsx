import NavMenu from "../componentes/nav-menu";
import TopMenu from "../componentes/top-menu";
import style from "../paginas/css/setorResponsavel.module.css";
import api from "../../service/api";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function SetorResponsavel() {
  const navigate = useNavigate();
  const [setores, setSetores] = useState([]);
  const [responsavel, setResponsavel] = useState([]);

  useEffect(() => {
    const carregarDados = async () => {
      try {
        const setores = await api.get("/servico/setores");
        const gestor = await api.get("/cadastro/usuarios");
        setSetores(setores.data.result);
        setResponsavel(gestor.data.result);
      } catch (e) {
        e;
      }
    };

    carregarDados();
  }, []);

  return (
    <>
      <TopMenu />
      <div className={style.main}>
        <NavMenu />
        <div className={style.section}>
          <div className={style.linhaT}>
            <p style={{ textWrap: "nowrap" }}>Setor Responsável</p>
            <div className={style.dividerH} />
          </div>
          <div className={style.base}>
            <div className={style.linhaT}>
              <p style={{ textWrap: "nowrap" }}>Criar novo Setor</p>
              <div className={style.dividerH} />
              <button onClick={() => navigate("/servico/setor/criar")}>
                Criar
              </button>
            </div>
          </div>
          <div className={style.base}>
            <div className={style.linhaT}>
              <p style={{ textWrap: "nowrap" }}>
                Lista de Setores Responsáveis
              </p>
              <div className={style.dividerH} />
            </div>
            <div className={style.dividerH} />
            <table>
              <thead>
                <tr>
                  <th style={{ width: "5%" }}>Id</th>
                  <th style={{ width: "10%" }}>Sigla</th>
                  <th style={{ width: "20%" }}>Nome</th>
                  <th style={{ width: "30%" }}>E-mail</th>
                  <th style={{ width: "20%" }}>Responsável</th>
                  <th style={{ width: "15%" }}>Ver/Editar</th>
                </tr>
              </thead>
              <tbody>
                {setores.map((setor) => {
                  return (
                    <tr key={setor.id}>
                      <td style={{ paddingLeft: "15px" }}>{setor.id}</td>
                      <td>{setor.sigla}</td>
                      <td>{setor.nome}</td>
                      <td>{setor.email}</td>
                      <td>
                        {responsavel[setor.responsavel - 1]?.nome ||
                          "Carregando"}{" "}
                        {responsavel[setor.responsavel - 1]?.sobrenome || "..."}
                      </td>
                      <td>
                        <div className={style.linhaT}>
                          <div
                            className={style.actBtn}
                            onClick={() =>
                              navigate(`/servico/setor/editar/${setor.id}`)
                            }
                          >
                            <span className="material-symbols-rounded">
                              edit
                            </span>
                          </div>
                        </div>
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

export default SetorResponsavel;
