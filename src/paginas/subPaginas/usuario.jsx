import { useParams, useNavigate } from "react-router-dom";
import TopMenu from "../../componentes/top-menu";
import NavMenu from "../../componentes/nav-menu";
import CardTabela from "../../componentes/cardsRelatorios/cardTabela";
import style from "../css/usuario.module.css";
import solicitacoesEfetuadas from "../../jsons/solicitacoesEfeturadas.json";
import api from "../../../service/api.jsx";
import useUsuario from "../../../service/hooks/hookUsuario.jsx";

function Usuario() {
  const navigate = useNavigate();

  const { u_id } = useParams();

  const {usuario, statusUsuario, setStatusUsuario, dataNasc, loading, erro, alterarStatus} = useUsuario(u_id)

  if (loading) return <p>Carregando...</p>;
  if (erro) return <p>Erro ao carregar usuário</p>;

  const fotoUsuario = usuario.foto;

  
  const idade = (dataNascimento) => {
    const data = new Date();
    const dataNasc = new Date(dataNascimento);
    const diferenca = Math.abs(data.getTime() - dataNasc.getTime());
    return Math.floor(diferenca / (1000 * 60 * 60 * 24 * 365.25));
  };

  const solicitacoes = solicitacoesEfetuadas.filter(
    (solicitacao) => solicitacao.usuario_id === usuario.id - 1 // <<<--- CORRIGIR ISSO DEPOIS
  );

  const totalSolicitacoes = solicitacoes.length;

  const solicitacoesAtendidas = solicitacoes.filter(
    (solicitacao) => solicitacao.status === "Solicitação Atendida"
  ).length;

  const solicitacoesNegadas = solicitacoes.filter(
    (solicitacao) => solicitacao.status === "Pedido Negado"
  ).length;

  const solProcessando = solicitacoes.filter(
    (solicitacao) => solicitacao.status === "Processando Envio"
  ).length;

  const solAguardando = solicitacoes.filter(
    (solicitacao) => solicitacao.status === "Aguardando Resposta"
  ).length;
  const solAgendado = solicitacoes.filter(
    (solicitacao) => solicitacao.status === "Atendimento Agendado"
  ).length;

  const solicitacoesEmAndamento = solProcessando + solAguardando + solAgendado;

  const copiarLink = () => {
    navigator.clipboard
      .writeText(window.location.href)
      .then(() => alert("Link do Perfil copiado!"))
      .catch((err) => console.error("Erro ao copiar:", err));
  };

  return (
    <>
      <TopMenu />
      <div className={style.main}>
        <NavMenu />
        <div className={style.section}>
          <div className={style.base}>
            <div className={style.topoUserInfo}>
              <p>Detalhes do Usuário</p>
              <div className={style.dividerH}></div>
              <div
                onClick={() => copiarLink()}
                style={{ cursor: "pointer" }}
                className={style.btnCompartilhar}
                title="Compartilhar"
              >
                <span className="material-symbols-rounded"> share </span>
              </div>
              <div
                style={{ cursor: "pointer" }}
                className={style.btnCompartilhar}
                title="Editar"
                onClick={() =>
                  navigate(`/cadastros/usuarioslista/editar/${usuario.id}`)
                }
              >
                <span className="material-symbols-rounded"> edit </span>
              </div>
              <div
                className={style.btnBloquear}
                style={{
                  backgroundColor:
                    statusUsuario === "ativo" ? "#950505" : "green",
                }}
                title={
                  statusUsuario === true
                    ? "Bloquear Usuário"
                    : "Desbloquear Usuário"
                }
                onClick={alterarStatus}
              >
                <span className="material-symbols-rounded">
                  {statusUsuario === "ativo" ? "lock" : "lock_open"}
                </span>
              </div>
            </div>
            <div></div>
            <div className={style.userInfo}>
              <div
                className={style.foto}
                style={{ backgroundImage: `url(${fotoUsuario})` }}
              ></div>
              <div className={style.info}>
                <p>
                  <strong>Nome:</strong> {usuario.nome} {usuario.sobrenome}
                </p>
                <p>
                  <strong>Data de Nascimento:</strong> {dataNasc}
                </p>
                <p>
                  <strong>Idade:</strong> {idade(usuario.dataNascimento)}
                </p>
                <p>
                  <strong>Sexo:</strong> {usuario.genero}
                </p>
                <p>
                  <strong>Bairro:</strong> {usuario.rua},{usuario.numero},{" "}
                  {usuario.complemento}, {usuario.cidade} -{usuario.estado} CEP:
                  {usuario.cep}
                </p>
                <p>
                  <strong>Telefone:</strong> {usuario.telefone}
                </p>
                <p>
                  <strong>Email:</strong> {usuario.email}
                </p>
              </div>
              <div className={style.envios}>
                <div className={style.totalSol}>
                  <p>Solicitações Enviadas</p>
                  <div className={style.numero}>
                    <h1 style={{ color: "#055695" }}>{totalSolicitacoes}</h1>
                    <p>Solicitações</p>
                  </div>
                </div>
                <div className={style.dividerV}></div>
                <div className={style.totalSol}>
                  <p>Solicitações Atendidas</p>
                  <div className={style.numero}>
                    <h1 style={{ color: "#57CE6E" }}>
                      {solicitacoesAtendidas}
                    </h1>
                    <p>Solicitações</p>
                  </div>
                </div>
                <div className={style.dividerV}></div>
                <div className={style.totalSol}>
                  <p>Solicitações em Andamento</p>
                  <div className={style.numero}>
                    <h1 style={{ color: "#E8A25C" }}>
                      {solicitacoesEmAndamento}
                    </h1>
                    <p>Solicitações</p>
                  </div>
                </div>
                <div className={style.dividerV}></div>
                <div className={style.totalSol}>
                  <p>Solicitações Negadas</p>
                  <div className={style.numero}>
                    <h1 style={{ color: "#CC3A3A" }}>{solicitacoesNegadas}</h1>
                    <p>Solicitações</p>
                  </div>
                </div>
              </div>
            </div>
            <div
              className={style.statusUsuarioRibbon}
              style={{
                backgroundColor:
                  statusUsuario === "ativo" ? "greenyellow" : "#550000",
              }}
            >
              <h2
                style={{
                  color: statusUsuario === "ativo" ? "green" : "#ff5252",
                  transition: "all 0.5s",
                }}
              >
                {statusUsuario === "ativo" ? "Ativo" : "Inativo"}
              </h2>
            </div>
          </div>
          <p>
            {`Todas as Solicitações de: `}
            <strong style={{ fontSize: "larger" }}>
              {usuario.nome} {usuario.sobrenome}
            </strong>
          </p>
          <CardTabela
            _listaSolicitacoes={solicitacoes}
            _listaUsuarios={usuario}
          />
        </div>
      </div>
    </>
  );
}

export default Usuario;
