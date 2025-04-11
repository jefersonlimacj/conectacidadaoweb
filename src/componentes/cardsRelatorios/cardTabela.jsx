import { useNavigate } from "react-router-dom";
// import categoria from "../../jsons/categorias.json";
// import subCategoria from "../../jsons/subcategoria.json";
import style from "../../componentes/cardsRelatorios/css/cardTabela.module.css";
import { useState, useEffect } from "react";
import api from "../../../service/api";

// Função para formatar data ISO para "dd/mm/yyyy"
const formatarData = (dataIso) => {
  const data = new Date(dataIso);
  return `${String(data.getDate()).padStart(2, "0")}/${String(
    data.getMonth() + 1
  ).padStart(2, "0")}/${data.getFullYear()}`;
};

// Mapeamento de ícones e cores por status
const statusIcones = {
  "Pedido Negado": ["block", "#CC3A3A"],
  "Processando Envio": ["help", "#E8A25C"],
  "Aguardando Resposta": ["schedule", "#E5CE00"],
  "Atendimento Agendado": ["pending_actions", "#6399C2"],
  "Solicitação Atendida": ["check_circle", "#57CE6E"],
};

const iconStatus = (status) => statusIcones[status] || ["help", "#000000"];

function CardTabela({
  _listaSolicitacoes,
}) {
  if (!_listaSolicitacoes) {
    return (
      <>
        <thead>
          <tr>
            <th>Selecione uma Opção</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Falta uma Lista</td>
          </tr>
        </tbody>
      </>
    );
  }
  const navigate = useNavigate();

  const [ordem, setOrdem] = useState(1);
  const [colunaOrdem, setColunaOrdem] = useState(null);

  const [usuarios, setUsuarios] = useState({});
  const [categoria, setCategoria] = useState([]);
  const [subcategoria, setSubcategoria] = useState([]);

  useEffect(() => {
    const pegarUsuario = async () => {
      try {
        const dadosUsuario = await api.get(`/cadastro/usuarios`);
        const dadosCategoria = await api.get(`/servico/categorias`);
        const dadosSubcategoria = await api.get(`/servico/subcategorias`);
        setUsuarios(dadosUsuario.data.result);
        setCategoria(dadosCategoria.data.result);
        setSubcategoria(dadosSubcategoria.data.result);
      } catch (error) {
        console.error("Erro ao buscar usuário:", error);
      }
    };
    pegarUsuario();
  }, []);

  const solicitacoes = _listaSolicitacoes;
  //usar essa const para filtrar depois, apenas as "Processando Envio"

  console.log(solicitacoes)

  const mudarOrdem = (coluna) => {
    setOrdem(coluna === colunaOrdem ? -ordem : 1);
    setColunaOrdem(coluna);
  };

  // Ordenação condicional para evitar cálculos desnecessários
  const ordemSolicitacoes = colunaOrdem
    ? [...solicitacoes].sort((a, b) =>
        a[colunaOrdem] < b[colunaOrdem] ? -ordem : ordem
      )
    : solicitacoes;

  return (
    <div className={style.base}>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          width: "100%",
          margin: "15px 0",
        }}
      >
        <div className={style.camposFiltro}>
          <p>Categoria:</p>
          <input type="text" name="" id="" />
          <p>Setor:</p>
          <input type="text" name="" id="" />
          <p>Status:</p>
          <select name="" id="">
            <option value=""></option>
            <option value="">Pedido Negado</option>
            <option value="">Processando Envio</option>
            <option value="">Aguardando Resposta</option>
            <option value="">Atendimento Agendado</option>
            <option value="">Solicitação Atendida</option>
          </select>
        </div>
        <button>Filtrar</button>
      </div>

      <table>
        <thead>
          <tr>
            <th>Tipo</th>
            <th onClick={() => mudarOrdem("usuario_id")}>Usuário</th>
            <th onClick={() => mudarOrdem("categoria_id")}>Categoria</th>
            <th onClick={() => mudarOrdem("subcategoria_id")}>Sub-Categoria</th>
            <th>Foto</th>
            <th onClick={() => mudarOrdem("id")}>Setor Resp.</th>
            <th onClick={() => mudarOrdem("data")}>Data</th>
            <th onClick={() => mudarOrdem("status")}>Status</th>
          </tr>
        </thead>
        <tbody>
          {ordemSolicitacoes.map((solicitacao) => {
            const urlImage = `https://picsum.photos/seed/${solicitacao.id}-1/200`;
            const statusInfo = iconStatus(solicitacao.status);

            console.log(solicitacao)

            return (
              <tr
                key={solicitacao.protocolo}
                onClick={() => navigate(`/registro/${solicitacao.id}`)}
              >
                <td>
                  <div
                    className={style.iconCategoria}
                    style={{
                      backgroundColor:
                        categoria[solicitacao.categoria_id - 1]?.corPrimaria,
                    }}
                  >
                    <span
                      className="material-symbols-rounded"
                      style={{
                        color:
                          categoria[solicitacao.categoria_id - 1]?.corSecundaria,
                      }}
                    >
                      {categoria[solicitacao.categoria_id - 1]?.icone}
                    </span>
                  </div>
                </td>
                <td>
                  {`${
                    usuarios[solicitacao.usuario_id - 1]?.nome || "Buscando..."
                  } ${usuarios[solicitacao.usuario_id - 1]?.sobrenome || ""}`}
                </td>
                <td>
                  {categoria[solicitacao.categoria_id - 1]?.nome || "Não Informado"}
                </td>
                <td>
                  {subcategoria[solicitacao.subcategoria_id - 1]?.nome ||
                    "Não Informado"}
                </td>
                <td>
                  <img
                    src={urlImage}
                    alt={`Foto de ${
                      usuarios[solicitacao.usuario_id - 1]?.nome || "Desconhecido"
                    }`}
                  />
                </td>
                <td>Secretaria</td>
                <td>{formatarData(solicitacao.data)}</td>
                <td
                  style={{ display: "flex", alignItems: "center", gap: "5px" }}
                >
                  <div
                    className={style.iconStatus}
                    style={{ backgroundColor: statusInfo[1] }}
                  >
                    <span className="material-symbols-rounded">
                      {statusInfo[0]}
                    </span>
                  </div>
                  {solicitacao.status}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default CardTabela;
