import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import TopMenu from "../../componentes/top-menu";
import NavMenu from "../../componentes/nav-menu";
import solicitacoes from "../../jsons/solicitacoesEfeturadas.json";
import usuarios from "../../jsons/usuarios.json";
import categorias from "../../jsons/categorias.json";
import subcategorias from "../../jsons/subcategoria.json";
import style from "../css/registro.module.css";

const statusIcones = {
  "Pedido Negado": ["Pedido Negado", "block", "#CC3A3A", "#CC3A3A30"],
  "Processando Envio": ["Processando Envio", "help", "#E8A25C", "#E8A25C30"],
  "Aguardando Resposta": [
    "Aguardando Resposta",
    "schedule",
    "#E5CE00",
    "#E5CE0030",
  ],
  "Atendimento Agendado": [
    "Atendimento Agendado",
    "pending_actions",
    "#6399C2",
    "#6399C230",
  ],
  "Solicitação Atendida": [
    "Solicitação Atendida",
    "check_circle",
    "#57CE6E",
    "#57CE6E30",
  ],
};

const setor = [
  "",
  "SEAD",
  "SECULT",
  "SEDEC",
  "SEDESC",
  "SEDUR",
  "SEFAZ",
  "SEGOV",
  "SEINFRA",
  "SEJUV",
  "SEMED",
  "SEMMAS",
  "SEMOB",
  "SEMOP",
  "SEPLAN",
  "SESP",
  "SETUR",
  "SMS",
  "SPPM",
];

function Registro() {
  const { p_id } = useParams();

  const navigate = useNavigate();

  const solicitacao = solicitacoes[p_id];
  const atualizacoes = solicitacoes[p_id].att;

  const [status, setStatus] = useState(solicitacao.status);

  const [img1, setImg1] = useState("");
  const [img2, setImg2] = useState("");
  const [img3, setImg3] = useState("");

  const [iconStatus, setIconStatus] = useState(
    statusIcones[solicitacao.status] || [
      "Não Encontrado",
      "help",
      "#000000",
      "#CCCCCC",
    ]
  );

  useEffect(() => {
    setIconStatus(
      statusIcones[status] || ["Não Encontrado", "help", "#000000", "#CCCCCC"]
    );
  }, [status]);

  //Caso não esteja correto o ID do Registro
  if (!solicitacao) {
    return (
      <>
        <TopMenu />
        <div className={style.main}>
          <NavMenu />
          <div
            className={style.section}
            style={{
              marginLeft: "12vw",
              marginTop: "8vh",
              padding: "15px",
              width: "88vw",
              height: "92vh",
              minHeight: "92vh",
              display: "flex",
              gap: "15px",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <h2>Solicitação Não Encontrada!</h2>
            <p>
              Id não encontrado, retorne a tela
              <a
                href="/dashboard"
                style={{ fontSize: "small", cursor: "pointer" }}
              >
                Dashboard
              </a>
              e consulte a solicitação.
            </p>
          </div>
        </div>
      </>
    );
  }

  const lat = solicitacao?.latitude;
  const lng = solicitacao?.longitude;

  const mapaUrl = useMemo(
    () => `https://www.google.com/maps?q=${lat},${lng}&z=15&output=embed`,
    [lat, lng]
  );

  //  nImagens fixas para evitar mudanças a cada renderização
  const urlImage = `https://picsum.photos/seed/${solicitacao.id}-1/200`;
  const urlImage1 = `https://picsum.photos/seed/${solicitacao.id}-3/200`;
  const urlImage2 = `https://picsum.photos/seed/${solicitacao.id}-7/200`;

  const carregarImg1 = (e) => {
    if (e.target.files && e.target.files[0]) {
      const imageUrl = URL.createObjectURL(e.target.files[0]);
      setImg1(imageUrl);
    }
  };
  const carregarImg2 = (e) => {
    if (e.target.files && e.target.files[0]) {
      const imageUrl = URL.createObjectURL(e.target.files[0]);
      setImg2(imageUrl);
    }
  };
  const carregarImg3 = (e) => {
    if (e.target.files && e.target.files[0]) {
      const imageUrl = URL.createObjectURL(e.target.files[0]);
      setImg3(imageUrl);
    }
  };

  return (
    <>
      <TopMenu />
      <div className={style.main}>
        <NavMenu />
        <div className={style.section}>
          <div
            className={style.base}
            style={{
              background: `linear-gradient(135deg, ${
                categorias[solicitacao.categoria_id]?.cor + "50"
              }, #ffffff, #ffffff )`,
            }}
          >
            <div className={style.linhaHead}>
              <div className={style.infos}>
                <div
                  className={style.iconCategoria}
                  style={{
                    backgroundColor:
                      categorias[solicitacao.categoria_id]?.cor || "#000000",
                  }}
                >
                  <span
                    className="material-symbols-rounded"
                    style={{
                      color:
                        categorias[solicitacao.categoria_id]?.corFont ||
                        "#FFFFFF",
                    }}
                  >
                    {categorias[solicitacao.categoria_id]?.icone || "help"}
                  </span>
                </div>
                <div className={style.dadosSolicitacao}>
                  <p
                    className={style.tituloSubCategoria}
                    style={{ color: categorias[solicitacao.categoria_id]?.cor }}
                  >
                    {subcategorias[solicitacao.subcategoria_id]?.nome ||
                      "Sem informação"}
                  </p>
                  <p className={style.subTituloCategoria}>
                    {categorias[solicitacao.categoria_id]?.nome ||
                      "Sem informação"}
                  </p>
                  <div style={{ display: "flex", flexDirection: "row" }}>
                    <p>Solicitante:</p>
                    <a
                      onClick={() =>
                        navigate(`/usuario/${solicitacao.usuario_id}`)
                      }
                      style={{ cursor: "pointer" }}
                    >
                      <p style={{ fontWeight: "bold", margin: "0 10px" }}>
                        {usuarios[solicitacao.usuario_id]?.nome ||
                          "Desconhecido"}
                      </p>
                    </a>
                  </div>
                  <div style={{ display: "flex", flexDirection: "row" }}>
                    <p>Nº Prot.: </p>
                    <a href="#" style={{ margin: "0 10px" }}>
                      #{solicitacao.protocolo}
                    </a>
                  </div>
                  <p>
                    Data: <strong>{solicitacao.data}</strong>
                  </p>
                  <p>
                    Endereço: <strong>{solicitacao.endereco}</strong>
                  </p>
                </div>
              </div>
              <div className={style.fotos}>
                <div
                  className={style.foto}
                  style={{ backgroundImage: `url(${urlImage})` }}
                  alt={`Foto 1 Solicitação: ${solicitacao.protocolo}`}
                ></div>
                <div
                  className={style.foto}
                  style={{ backgroundImage: `url(${urlImage1})` }}
                  alt={`Foto 2 Solicitação: ${solicitacao.protocolo}`}
                ></div>
                <div
                  className={style.foto}
                  style={{ backgroundImage: `url(${urlImage2})` }}
                  alt={`Foto 3 Solicitação: ${solicitacao.protocolo}`}
                ></div>
              </div>
            </div>
            <div style={{ display: "flex", flexDirection: "row", gap: "15px" }}>
              <div className={style.infosE}>
                <p style={{ fontSize: "smaller", fontWeight: "bold" }}>
                  Comentário do Usuário:
                </p>
                <div className={style.campoComentario}>
                  <p>{solicitacao?.comentario || "Sem Comentários"}</p>
                </div>
                <iframe
                  src={mapaUrl}
                  height="100%"
                  style={{
                    border: "3px solid white",
                    borderRadius: "15px",
                    boxShadow: "2px 2px 5px #00000020",
                  }}
                  loading="lazy"
                ></iframe>
              </div>
              <div className={style.registroD}>
                <div className={style.status}>
                  <p>Vincular:</p>
                  <input type="text" />
                  <p>Status Atual:</p>
                  <div
                    className={style.alterarStatus}
                    style={{
                      backgroundColor: iconStatus[2],
                      boxShadow: `5px 5px 10px ${iconStatus[3]}`,
                    }}
                  >
                    <div className={style.circuloIcone}>
                      <span
                        className="material-symbols-rounded"
                        style={{ color: `${iconStatus[2]}` }}
                      >
                        {iconStatus[1]}
                      </span>
                    </div>
                    <select
                      value={status}
                      onChange={(e) => setStatus(e.target.value)}
                    >
                      {Object.keys(statusIcones).map((key) => (
                        <option key={key} value={key}>
                          {key}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className={style.opGestorL1}>
                  <div className={style.espSetor}>
                    <p>Setor Resp.:</p>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        gap: "5px",
                      }}
                    >
                      <p>Op1:</p>
                      <select name="" id="">
                        {setor.map((set) => (
                          <option key={set} value={set}>
                            {set}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        gap: "5px",
                      }}
                    >
                      <p>Op2:</p>
                      <select name="" id="">
                        {setor.map((set) => (
                          <option key={set} value={set}>
                            {set}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        gap: "5px",
                      }}
                    >
                      <p>Programação:</p>
                      <input type="date" name="" id="" />
                    </div>
                  </div>
                </div>
                <div className={style.opGestorL2}>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "5px",
                      width: "40%",
                      height: "100%",
                    }}
                  >
                    <p>Justificativa do Gestor</p>
                    <textarea style={{outline:"none"}}
                      name=""
                      id=""
                      placeholder="Deixe seu comentário aqui..."
                    ></textarea>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      gap: "10px",
                      height: "100%",
                    }}
                  >
                    <p>Adicione as fotos:</p>
                    <div className={style.inputFotos}>
                      <label
                        className={style.carregarFoto}
                        style={{ backgroundImage: `url(${img1})` }}
                      >
                        <span className="material-symbols-rounded">
                          add_a_photo
                        </span>
                        <input
                          type="file"
                          alt={`Foto 1 Gestor: prot.: ${solicitacao.protocolo}`}
                          onChange={carregarImg1}
                        />
                      </label>
                      <label
                        className={style.carregarFoto}
                        style={{ backgroundImage: `url(${img2})` }}
                      >
                        <span className="material-symbols-rounded">
                          add_a_photo
                        </span>
                        <input
                          type="file"
                          alt={`Foto 2 Gestor: prot.: ${solicitacao.protocolo}`}
                          onChange={carregarImg2}
                        />
                      </label>
                      <label
                        className={style.carregarFoto}
                        style={{ backgroundImage: `url(${img3})` }}
                      >
                        <span className="material-symbols-rounded">
                          add_a_photo
                        </span>
                        <input
                          type="file"
                          alt={`Foto 3 Gestor: prot.: ${solicitacao.protocolo}`}
                          onChange={carregarImg3}
                        />
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className={style.rodapeSolicitacao}>
              <div className={style.dividerH}></div>
              <a href="/dashboard">Cancelar</a>
              <button type="button">Atualizar</button>
            </div>
            <p>
              <strong>Registro de atualizações da solicitação</strong>
            </p>
            <table className={style.tabelaAtt}>
              <thead>
                <tr>
                  <th>Versão Att.:</th>
                  <th>Data Att.:</th>
                  <th>Status Att.:</th>
                  <th>Data Agendamento</th>
                  <th>Setor 1</th>
                  <th>Setor 2</th>
                  <th>Justificativa</th>
                  <th>Gestor</th>
                </tr>
              </thead>
              <tbody>
                {atualizacoes < 1 ? (
                  <tr>
                    <td style={{ textAlign: "center" }}>Sem Atualizações</td>
                    <td style={{ textAlign: "center" }}>-</td>
                    <td style={{ textAlign: "center" }}>-</td>
                    <td style={{ textAlign: "center" }}>-</td>
                    <td style={{ textAlign: "center" }}>-</td>
                    <td style={{ textAlign: "center" }}>-</td>
                    <td style={{ textAlign: "center" }}>-</td>
                    <td style={{ textAlign: "center" }}>-</td>
                  </tr>
                ) : (
                  atualizacoes.map((att) => {
                    const data = (dataIso) => {
                      if (dataIso == "") {
                        return "-";
                      }
                      const data = new Date(dataIso);
                      return `${String(data.getDate()).padStart(
                        2,
                        "0"
                      )}/${String(data.getMonth() + 1).padStart(
                        2,
                        "0"
                      )}/${data.getFullYear()}`;
                    };
                    return (
                      <tr key={att.versaoAtt}>
                        <td>Nº: {att.versaoAtt}</td>
                        <td>{data(att.dataAtt)}</td>
                        <td>{att.statusAtt}</td>
                        <td>{data(att.dataAgendamento)}</td>
                        <td>{att.setorResp1}</td>
                        <td>{att.setorResp2}</td>
                        <td>{att.justificativa}</td>
                        <td>{att.nomeGestor}</td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}

export default Registro;
