import style from "../../paginas/css/usuarioedit.module.css";
import TopMenu from "../../componentes/top-menu";
import NavMenu from "../../componentes/nav-menu";
import { useParams, useNavigate } from "react-router-dom";
import usuarios from "../../jsons/usuarios.json";
import { useState, useEffect } from "react";
import api from "../../../service/api.jsx";

function EditarUsuario() {
  const { u_id } = useParams();

  const [usuario, setUsuario] = useState([]);

  const atualizarUsuario = async () => {
    const camposEditados = Object.fromEntries(
      Object.entries({
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
      }).filter(([chave, valor]) => valor && valor !== usuario[chave]) // Exclui undefined, "", e valores inalterados
    );

    // Se nenhum campo foi alterado, avisa e não faz a requisição
    if (Object.keys(camposEditados).length === 0) {
      alert("Nenhuma alteração foi feita.");
      return;
    }

    try {
      const response = await api.patch(
        `/cadastro/usuarios/${u_id}`,
        camposEditados
      );

      alert(response.data.mensagem);

      navigate("/cadastros/usuarioslista");
    } catch (erro) {
      console.error("Erro ao atualizar usuário:", erro);
      alert("Erro ao atualizar usuário.");
    }
  };

  useEffect(() => {
    ////////////////////////////////////////////////  -- TRAZ TODAS AS INFORMAÇÕES DO USUÁRIO DO BANCO

    const pegarUsuario = async () => {
      try {
        const dadosUsuario = await api.get(`/cadastro/usuarios/${u_id}`);
        setUsuario(dadosUsuario.data.result[0]); // Atualiza o estado do Usuário com os dados recebidos

        const dataISO = dadosUsuario.data.result[0].dataNascimento; //Pega a data em formato YYYY-MM-DDTHH:mm:ss.sssZ
        setDataNasc(dataISO.split("T")[0]); //Transforma a data em yyyy-MM-DD
      } catch (error) {
        console.error("Erro ao buscar usuário:", error);
      }
    };

    if (u_id) {
      pegarUsuario(); // Apenas chama a função se u_id existir
    }
  }, [u_id]); //

  const [dataNasc, setDataNasc] = useState("");

  // const usuario = usuarios[u_id];

  const navigate = useNavigate();
  const [verSenha, setVerSenha] = useState(false);

  const [inputImagemUsuario, setInputImagemUsuario] = useState("");

  const alterarModoSenha = () => {
    setVerSenha(!verSenha);
  };

  const [nome, setNome] = useState();
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

  const carregarImagemCad = (e) => {
    if (e.target.files && e.target.files[0]) {
      const imageUrl = URL.createObjectURL(e.target.files[0]);
      console.log(imageUrl);
      setInputImagemUsuario(imageUrl);
      // setFoto(imageUrl);
    }
  };

  return (
    <>
      <TopMenu />
      <div className={style.main}>
        <NavMenu />
        <div className={style.section}>
          <div className={style.base}>
            <h1 style={{ textAlign: "center" }}>
              Editar Informações do Usuário
            </h1>
            <div className={style.cxTexto}>
              <p>Edite abaixo informações do usuário.</p>
            </div>
            <div className={style.dividerH}></div>
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
                      name="nome"
                      defaultValue={usuario.nome}
                      onChange={(e) => setNome(e.target.value)}
                    />
                    <input
                      type="text"
                      name="sobrenome"
                      defaultValue={usuario.sobrenome}
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
                        name="genero"
                        id="genero"
                        onChange={(e) => setGenero(e.target.value)}
                        value={usuario.genero}
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
                        name="data"
                        id="data_nasc"
                        onChange={(e) => setDataNascimento(e.target.value)}
                        defaultValue={dataNasc}
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
                      name="cpf"
                      onChange={(e) => setCpf(e.target.value)}
                      defaultValue={usuario.cpf}
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
                      name="foto"
                      onChange={carregarImagemCad}
                    />
                  </label>
                </div>
              </div>

              <div className={style.dividerH} />
              <h3>Informações de Cadastro</h3>

              <div>
                <input
                  type="text"
                  placeholder="e-mail"
                  name="email"
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                  defaultValue={usuario.email}
                />
                <div className={style.inputPassword}>
                  <input
                    type={verSenha === false ? "password" : "text"}
                    placeholder="Senha"
                    name="senha"
                    onChange={(e) => setSenha(e.target.value)}
                    defaultValue={usuario.senha}
                  />
                  <span
                    className="material-symbols-rounded"
                    onClick={alterarModoSenha}
                  >
                    {verSenha === false ? "visibility_off" : "visibility"}
                  </span>
                </div>
              </div>
              <div className={style.dividerH} />
              <h3>Informações de Contato</h3>
              <input
                type="text"
                name="rua"
                id="rua"
                placeholder="Rua"
                onChange={(e) => setRua(e.target.value)}
                defaultValue={usuario.rua}
              />
              <div>
                <input
                  type="text"
                  name="numero"
                  id="numero"
                  placeholder="Número"
                  onChange={(e) => setNumero(e.target.value)}
                  defaultValue={usuario.numero}
                />
                <input
                  type="text"
                  name="bairro"
                  id="bairro"
                  placeholder="Bairro"
                  onChange={(e) => setBairro(e.target.value)}
                  defaultValue={usuario.bairro}
                />
              </div>
              <input
                type="text"
                name="complemento"
                id="complemento"
                placeholder="Complemento"
                onChange={(e) => setComplemento(e.target.value)}
                defaultValue={usuario.complemento}
              />
              <div>
                <input
                  type="text"
                  name="cidade"
                  id="cidade"
                  placeholder="Cidade"
                  onChange={(e) => setCidade(e.target.value)}
                  defaultValue={usuario.cidade}
                />
                <input
                  type="text"
                  name="estado"
                  id="estado"
                  placeholder="Estado"
                  onChange={(e) => setEstado(e.target.value)}
                  defaultValue={usuario.estado}
                />
                <input
                  type="text"
                  name="cep"
                  id="cep"
                  placeholder="CEP"
                  onChange={(e) => setCep(e.target.value)}
                  defaultValue={usuario.cep}
                />
              </div>

              <div>
                <p>Telefone para Contato:</p>
                <input
                  type="tel"
                  name="telefone"
                  id="telefone"
                  onChange={(e) => setTelefone(e.target.value)}
                  defaultValue={usuario.telefone}
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
                    name="whatsapp"
                    id="whatsapp"
                    onChange={(e) => setWhatsapp(e.target.checked)}
                    defaultChecked={usuario.whatsapp}
                  />
                  <p>Whatsapp?</p>
                </div>
              </div>
              <div className={style.dividerH} />
            </form>
            <div style={{ display: "flex", flexDirection: "row", gap: "15px", width:"100%", alignItems:"center", justifyContent:"center" }}>
              <a href="/cadastros/usuarioslista">Voltar</a>
              <button className={style.submitBtn} onClick={atualizarUsuario}>
                Atualizar
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default EditarUsuario;
