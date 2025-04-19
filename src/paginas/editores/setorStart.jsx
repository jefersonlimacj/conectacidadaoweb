import style from "../../paginas/css/setoredit.module.css";
import TopMenu from "../../componentes/top-menu";
import NavMenu from "../../componentes/nav-menu";
import api from "../../../service/api";
import { useState, useEffect } from "react";

function CriarSetor() {
  const [listUsuarios, setUsuarios] = useState([]);

  useEffect(() => {
    const carregarDados = async () => {
      try {
        const pessoas = await api.get(`/cadastro/usuarios`);
        setUsuarios(pessoas.data.result);
        console.log(setor);
      } catch (e) {
        e;
      }
    };

    carregarDados();
  }, []);

  const usuarios = listUsuarios.filter((item) => item.bairro === "Barra");
  return (
    <>
      <TopMenu />
      <div className={style.main}>
        <NavMenu />
        <div className={style.section}>
          <div className={style.base}>
            <h1 style={{ textAlign: "center" }}>
              Crie um novo Setor Responsável
            </h1>
            <p>Preencha todas as informações para criar novo setor.</p>
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
                    placeholder="Nome"
                    onChange={(e) => setNome(e.target.value)}
                  />
                  <input
                    type="text"
                    placeholder="Sigla"
                    onChange={(e) => setSobrenome(e.target.value)}
                  />
                  <input
                    type="text"
                    placeholder="email"
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
                    <select name="" id="" style={{ width: "100%" }}>
                      <option value="0">Selecione um Responsável</option>
                      {usuarios.map((pessoa) => {
                        return (
                          <option key={pessoa.id}>
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

export default CriarSetor;
