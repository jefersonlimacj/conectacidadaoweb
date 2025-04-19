import style from "../../paginas/css/setoredit.module.css";
import TopMenu from "../../componentes/top-menu";
import NavMenu from "../../componentes/nav-menu";
import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import api from "../../../service/api";

function EditarSetor() {
  const { st_id } = useParams();
  const navigate = useNavigate();
  const [setor, setSetor] = useState([]);
  const [usuarios, setUsuarios] = useState([]);
  const [responsavel, setResponsavel] = useState(0);

  console.log(setor.responsavel);

  useEffect(() => {
    const carregarDados = async () => {
      try {
        const dados = await api.get(`/servico/setores/${st_id}`);
        const pessoas = await api.get(`/cadastro/usuarios`);
        let setor = dados.data.result[0];
        setSetor(setor);
        setUsuarios(pessoas.data.result);
        setResponsavel(setor.responsavel);
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
          <div className={style.base}>
            <h1 style={{ textAlign: "center" }}>{setor.sigla}</h1>
            <p>{setor.nome}</p>
            <div className={style.dividerH} />
            <form action="" className={style.formCadastro}>
              <h3>Informações do Setor</h3>
              <div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    width: "500px",
                  }}
                >
                  <input
                    type="text"
                    defaultValue={setor.nome}
                    onChange={(e) => setNome(e.target.value)}
                  />
                  <input
                    type="text"
                    defaultValue={setor.sigla}
                    onChange={(e) => setSobrenome(e.target.value)}
                  />
                  <input
                    type="emial"
                    defaultValue={setor.email}
                    onChange={(e) => setSobrenome(e.target.value)}
                  />
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      width: "100%",
                    }}
                  >
                    <p>Responsável:</p>
                    <select
                      style={{ width: "100%" }}
                      value={responsavel}
                      onChange={(e) => setResponsavel(e.target.value)}
                    >
                      <option value="0">Selecione um Responsável</option>
                      {usuarios.map((pessoa) => {
                        return (
                          <option key={pessoa.id} value={pessoa.id}>
                            {pessoa.nome} {pessoa.sobrenome}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                  <input
                    type="submit"
                    className={style.submitBtn}
                    value="Salvar"
                  />
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default EditarSetor;
