import { useEffect, useState, useRef } from "react";
import NavMenu from "../../componentes/nav-menu";
import TopMenu from "../../componentes/top-menu";
import style from "../../paginas/css/usuarioedit.module.css";
import api from "../../../service/api";


function CriarUsuario() {
  const [verSenha, setVerSenha] = useState(false);
  const [verSenhaR, setVerSenhaR] = useState(false);

  const [senhaCheck, setSenhaCheck] = useState("");
  const [senhaReCheck, setSenhaReCheck] = useState();
  const [emailCheck, setEmailCheck] = useState("");
  const [emailReCheck, setEmailReCheck] = useState();

  const [divMsg, setDivMsg] = useState("");
  const [divMsg2, setDivMsg2] = useState("");

  const inputNome = useRef();
  const inputSobrenome = useRef();
  const inputGenero = useRef();
  const inputDataNasc = useRef();
  const inputCPF = useRef();
  const inputFoto = useRef();
  const inputEmail = useRef();
  const inputSenha = useRef();
  const inputRua = useRef();
  const inputNumero = useRef();
  const inputBairro = useRef();
  const inputComplemento = useRef();
  const inputTelefone = useRef();
  const inputWpp = useRef();

  useEffect(() => {
    const msgValid = () => {
      if (senhaCheck === "") {
        return setDivMsg("");
      } else if (senhaCheck === senhaReCheck) {
        const divConferem = (
          <div>
            <p className={style.msgErro} style={{ color: "green" }}>
              As senhas conferem.
            </p>
            <span
              className="material-symbols-rounded"
              style={{ color: "green" }}
            >
              check_circle
            </span>
          </div>
        );
        return divConferem;
      } else {
        const divNaoConferem = (
          <div>
            <p className={style.msgErro} style={{ color: "red" }}>
              Senhas não são iguas.
            </p>
            <span className="material-symbols-rounded" style={{ color: "red" }}>
              dangerous
            </span>
          </div>
        );
        return divNaoConferem;
      }
    };
    return setDivMsg2(msgValid());
  }, [senhaReCheck]);

  useEffect(() => {
    const msgValid = () => {
      if (emailCheck === "") {
        return setDivMsg("");
      } else if (emailCheck === emailReCheck) {
        const divConferem = (
          <div>
            <p className={style.msgErro} style={{ color: "green" }}>
              Os emails conferem.
            </p>
            <span
              className="material-symbols-rounded"
              style={{ color: "green" }}
            >
              check_circle
            </span>
          </div>
        );
        return divConferem;
      } else {
        const divNaoConferem = (
          <div>
            <p className={style.msgErro} style={{ color: "red" }}>
              Os emails não são iguas.
            </p>
            <span className="material-symbols-rounded" style={{ color: "red" }}>
              dangerous
            </span>
          </div>
        );
        return divNaoConferem;
      }
    };
    return setDivMsg(msgValid());
  }, [emailReCheck]);

  const alterarModoSenha = () => {
    setVerSenha(!verSenha);
  };
  const alterarModoSenhaR = () => {
    setVerSenhaR(!verSenhaR);
  };

  async function criarUsuario() {
    const sqlCreate = {
      nome: inputNome.current.value,
      sobrenome: inputSobrenome.current.value,
      genero: inputGenero.current.value,
      foto: inputFoto.current.value,
      email: inputEmail.current.value,
      senha: inputSenha.current.value,
      telefone: inputTelefone.current.value,
      cpf: inputCPF.current.value,
      data_nascimento: inputDataNasc.current.value,
    };

    const sqlEndereco = {
      rua: inputRua.current.value,
      numero: inputNumero.current.value,
      bairro: inputBairro.current.value,
      cidade: "Nome da Cidade",
      estado: "UF",
      cep: "00000-000",
    };

    console.log(sqlCreate, sqlEndereco);
  }
  return (
    <>
      <TopMenu />
      <div className={style.main}>
        <NavMenu />
        <div className={style.section}>
          <div className={style.base}>
            <h1>Cadastrar Novo Usuário</h1>
            <p>
              Ao criar o usuário receberá um e-mail no cadastrado para definir
              sua senha.
            </p>
            <div className={style.dividerH} />
            <form action="" className={style.formCadastro}>
              <h3>Informações Pessoais</h3>
              <div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    width: "70%",
                  }}
                >
                  <div
                    style={{
                      width: "100%",
                    }}
                  >
                    <input type="text" placeholder="Nome" ref={inputNome} />
                    <input
                      type="text"
                      placeholder="Sobrenome"
                      ref={inputSobrenome}
                    />
                  </div>
                  <div
                    style={{
                      width: "100%",
                    }}
                  >
                    <div>
                      <p>
                        <strong>Gênero:</strong>
                      </p>
                      <select name="" id="genero" ref={inputGenero}>
                        <option value="x"></option>
                        <option value="Feminino">Feminino</option>
                        <option value="Masculino">Masculino</option>
                        <option value="Prefiro não dizer">
                          Prefiro não dizer
                        </option>
                      </select>
                    </div>
                    <div style={{ width: "60%" }}>
                      <p>
                        <strong>Data de Nasc.:</strong>
                      </p>
                      <input
                        type="date"
                        name=""
                        id="data_nasc"
                        ref={inputDataNasc}
                      />
                    </div>
                  </div>
                  <div
                    style={{
                      width: "100%",
                    }}
                  >
                    <p>
                      <strong>CPF:</strong>
                    </p>
                    <input type="text" id="cpf" ref={inputCPF} />
                  </div>
                </div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    backgroundColor: "yellow",
                    width: "30%",
                    height: "20vh",
                  }}
                >
                  foto
                  <input type="text" id="foto" ref={inputFoto} />
                </div>
              </div>

              <div className={style.dividerH} />
              <h3>Informações de Cadastro</h3>
              <input
                type="text"
                placeholder="e-mail"
                onChange={(e) => setEmailCheck(e.target.value)}
                ref={inputEmail}
              />
              <input
                type="text"
                placeholder="Repita o e-mail"
                onChange={(e) => setEmailReCheck(e.target.value)}
              />
              <div style={{ transition: "0.5s easy" }}>{divMsg}</div>
              <div>
                <div className={style.inputPassword}>
                  <input
                    type={verSenha === false ? "password" : "text"}
                    placeholder="Senha"
                    onChange={(e) => setSenhaCheck(e.target.value)}
                    ref={inputSenha}
                  />
                  <span
                    className="material-symbols-rounded"
                    onClick={alterarModoSenha}
                  >
                    {verSenha === false ? "visibility_off" : "visibility"}
                  </span>
                </div>
                <div className={style.inputPassword}>
                  <input
                    type={verSenhaR === false ? "password" : "text"}
                    placeholder="Repita a senha"
                    onChange={(e) => setSenhaReCheck(e.target.value)}
                  />
                  <span
                    className="material-symbols-rounded"
                    onClick={alterarModoSenhaR}
                  >
                    {verSenhaR === false ? "visibility_off" : "visibility"}
                  </span>
                </div>
              </div>
              <div>{divMsg2}</div>
              <div className={style.dividerH} />
              <h3>Informações de Contato</h3>
              <input
                type="text"
                name=""
                id="rua"
                placeholder="Rua"
                ref={inputRua}
              />
              <div>
                <input
                  type="text"
                  name=""
                  id="numero"
                  placeholder="Número"
                  ref={inputNumero}
                />
                <input
                  type="text"
                  name=""
                  id="bairro"
                  placeholder="Bairro"
                  ref={inputBairro}
                />
              </div>
              <input
                type="text"
                name=""
                id="complemento"
                placeholder="Complemento"
                ref={inputComplemento}
              />
              <div>
                <p>Telefone para Contato:</p>
                <input type="tel" name="" id="telefone" ref={inputTelefone} />
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "0px",
                  }}
                >
                  <input type="checkbox" name="" id="" ref={inputWpp} />
                  <p>Whatsapp?</p>
                </div>
              </div>
              <div className={style.dividerH} />
            </form>
            <button className={style.submitBtn} onClick={criarUsuario}>
              Cadastrar
            </button>
          </div>
          
        </div>
      </div>
    </>
  );
}

export default CriarUsuario;
