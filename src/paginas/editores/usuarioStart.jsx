import { useEffect, useState, useRef } from "react";
import NavMenu from "../../componentes/nav-menu";
import TopMenu from "../../componentes/top-menu";
import style from "../../paginas/css/usuarioedit.module.css";
import api from "../../../service/api.jsx";

function CriarUsuario() {
  const [verSenha, setVerSenha] = useState(false);
  const [verSenhaR, setVerSenhaR] = useState(false);

  const [senhaCheck, setSenhaCheck] = useState("");
  const [senhaReCheck, setSenhaReCheck] = useState("");
  const [emailCheck, setEmailCheck] = useState("");
  const [emailReCheck, setEmailReCheck] = useState("");

  const [divMsg, setDivMsg] = useState("");
  const [divMsg2, setDivMsg2] = useState("");

  const [inputImagemUsuario, setInputImagemUsuario] = useState("");

  useEffect(() => {
    if (senhaCheck === "" || senhaReCheck === "") {
      setDivMsg2("");
    } else if (senhaCheck === senhaReCheck) {
      setDivMsg2(
        <div>
          <p className={style.msgErro} style={{ color: "green" }}>
            As senhas conferem.
          </p>
          <span className="material-symbols-rounded" style={{ color: "green" }}>
            check_circle
          </span>
        </div>
      );
    } else {
      setDivMsg2(
        <div>
          <p className={style.msgErro} style={{ color: "red" }}>
            As senhas não são iguais.
          </p>
          <span className="material-symbols-rounded" style={{ color: "red" }}>
            dangerous
          </span>
        </div>
      );
    }
  }, [senhaCheck, senhaReCheck]);

  useEffect(() => {
    if (emailCheck === "" || emailReCheck === "") {
      setDivMsg("");
    } else if (emailCheck === emailReCheck) {
      setDivMsg(
        <div>
          <p className={style.msgErro} style={{ color: "green" }}>
            Os e-mails conferem.
          </p>
          <span className="material-symbols-rounded" style={{ color: "green" }}>
            check_circle
          </span>
        </div>
      );
    } else {
      setDivMsg(
        <div>
          <p className={style.msgErro} style={{ color: "red" }}>
            Os e-mails não são iguais.
          </p>
          <span className="material-symbols-rounded" style={{ color: "red" }}>
            dangerous
          </span>
        </div>
      );
    }
  }, [emailCheck, emailReCheck]);

  const alterarModoSenha = () => {
    setVerSenha(!verSenha);
  };
  const alterarModoSenhaR = () => {
    setVerSenhaR(!verSenhaR);
  };

  const [nome, setNome] = useState("");
  const [sobrenome, setSobrenome] = useState("");
  const [genero, setGenero] = useState("");
  const [foto, setFoto] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [telefone, setTelefone] = useState("");
  const [cpf, setCpf] = useState("");
  const [dataNascimento, setDataNascimento] = useState("");
  const [rua, setRua] = useState("");
  const [numero, setNumero] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [bairro, setBairro] = useState("");
  const [complemento, setComplemento] = useState("");
  const [cidade, setCidade] = useState("");
  const [estado, setEstado] = useState("");
  const [cep, setCep] = useState("");

  const cadastrarUsuario = async (e) => {
    e.preventDefault();

    if (senhaCheck !== senhaReCheck) {
      alert("As senhas não conferem.");
      return;
    }

    if (emailCheck !== emailReCheck) {
      alert("Os e-mails não conferem.");
      return;
    }

    try {
      const response = await api.post("/cadastrar", {
        nome,
        sobrenome,
        genero,
        foto,
        email,
        senha,
        telefone,
        cpf,
        dataNascimento,
        rua,
        numero,
        whatsapp,
        bairro,
        complemento,
        cidade,
        estado,
        cep,
      });
      alert(response.data.mensagem);
    } catch (error) {
      console.error("Erro ao cadastrar:", error);
      alert("Erro ao cadastrar usuário. Tente novamente.");
    }
  };

  const carregarImagemCad = (e) => {
    if (e.target.files && e.target.files[0]) {
      const imageUrl = URL.createObjectURL(e.target.files[0]);
      console.log(imageUrl);
      setInputImagemUsuario(imageUrl);
      setFoto(imageUrl);
    }
  };

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
                    width: "80%",
                  }}
                >
                  <div
                    style={{
                      width: "100%",
                    }}
                  >
                    <input
                      type="text"
                      placeholder="Nome"
                      onChange={(e) => setNome(e.target.value)}
                    />
                    <input
                      type="text"
                      placeholder="Sobrenome"
                      onChange={(e) => setSobrenome(e.target.value)}
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
                      <select
                        name=""
                        id="genero"
                        onChange={(e) => setGenero(e.target.value)}
                      >
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
                        onChange={(e) => setDataNascimento(e.target.value)}
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
                    <input
                      type="text"
                      id="cpf"
                      onChange={(e) => setCpf(e.target.value)}
                    />
                  </div>
                </div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    width: "20%",
                    height: "20vh",
                  }}
                >
                  <label
                    className={style.carregarFoto}
                    style={{
                      backgroundImage: `url(${inputImagemUsuario})`,
                      cursor: "pointer",
                    }}
                  >
                    <span className="material-symbols-rounded">
                      {inputImagemUsuario === "" ? "add_a_photo" : ""}
                    </span>
                    <input
                      type="file"
                      alt="Sem Foto"
                      typeof="image/*"
                      name="fotoUsuario"
                      onChange={carregarImagemCad}
                    />
                  </label>
                </div>
              </div>

              <div className={style.dividerH} />
              <h3>Informações de Cadastro</h3>
              <input
                type="text"
                placeholder="e-mail"
                onChange={(e) => {
                  setEmailCheck(e.target.value);
                  setEmail(e.target.value);
                }}
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
                    onChange={(e) => {
                      setSenhaReCheck(e.target.value);
                      setSenha(e.target.value);
                    }}
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
                onChange={(e) => setRua(e.target.value)}
              />
              <div>
                <input
                  type="text"
                  name=""
                  id="numero"
                  placeholder="Número"
                  onChange={(e) => setNumero(e.target.value)}
                />
                <input
                  type="text"
                  name=""
                  id="bairro"
                  placeholder="Bairro"
                  onChange={(e) => setBairro(e.target.value)}
                />
              </div>
              <input
                type="text"
                name=""
                id="complemento"
                placeholder="Complemento"
                onChange={(e) => setComplemento(e.target.value)}
              />
              <div>
                <input
                  type="text"
                  name=""
                  id="cidade"
                  placeholder="Cidade"
                  onChange={(e) => setCidade(e.target.value)}
                />
                <input
                  type="text"
                  name=""
                  id="estado"
                  placeholder="Estado"
                  onChange={(e) => setEstado(e.target.value)}
                />
                <input
                  type="text"
                  name=""
                  id="cep"
                  placeholder="CEP"
                  onChange={(e) => setCep(e.target.value)}
                />
              </div>

              <div>
                <p>Telefone para Contato:</p>
                <input
                  type="tel"
                  name=""
                  id="telefone"
                  onChange={(e) => setTelefone(e.target.value)}
                />
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "0px",
                  }}
                >
                  <input
                    type="checkbox"
                    name=""
                    id=""
                    onChange={(e) => setWhatsapp(e.target.checked)}
                  />
                  <p>Whatsapp?</p>
                </div>
              </div>
              <div className={style.dividerH} />
            </form>
            <button className={style.submitBtn} onClick={cadastrarUsuario}>
              Cadastrar
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default CriarUsuario;
