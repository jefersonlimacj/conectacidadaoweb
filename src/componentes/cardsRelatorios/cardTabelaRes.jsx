import style from "../../componentes/cardsRelatorios/css/cardTabelaRes.module.css";
import solicitacoes from "../../jsons/solicitacoesEfeturadas.json";

function CardTabelaRes() {

  const abastecimento = solicitacoes.filter((item) => item.categoria_id === 0);
  const abastecimentoPN = abastecimento.filter((sol) => sol.status === "Pedido Negado");
  const abastecimentoPE = abastecimento.filter((sol) => sol.status === "Processando Envio");
  const abastecimentoAR = abastecimento.filter((sol) => sol.status === "Aguardando Resposta");
  const abastecimentoAA = abastecimento.filter((sol) => sol.status === "Atendimento Agendado");
  const abastecimentoSA = abastecimento.filter((sol) => sol.status === "Solicitação Atendida");

  
  const comercio = solicitacoes.filter((item) => item.categoria_id === 1);
  const comercioPN = comercio.filter((sol) => sol.status === "Pedido Negado");
  const comercioPE = comercio.filter((sol) => sol.status === "Processando Envio");
  const comercioAR = comercio.filter((sol) => sol.status === "Aguardando Resposta");
  const comercioAA = comercio.filter((sol) => sol.status === "Atendimento Agendado");
  const comercioSA = comercio.filter((sol) => sol.status === "Solicitação Atendida");

  const energia = solicitacoes.filter((item) => item.categoria_id === 2);
  const energiaPN = energia.filter((sol) => sol.status === "Pedido Negado");
  const energiaPE = energia.filter((sol) => sol.status === "Processando Envio");
  const energiaAR = energia.filter((sol) => sol.status === "Aguardando Resposta");
  const energiaAA = energia.filter((sol) => sol.status === "Atendimento Agendado");
  const energiaSA = energia.filter((sol) => sol.status === "Solicitação Atendida");

  const limpeza = solicitacoes.filter((item) => item.categoria_id === 3);
  const limpezaPN = limpeza.filter((sol) => sol.status === "Pedido Negado");
  const limpezaPE = limpeza.filter((sol) => sol.status === "Processando Envio");
  const limpezaAR = limpeza.filter((sol) => sol.status === "Aguardando Resposta");
  const limpezaAA = limpeza.filter((sol) => sol.status === "Atendimento Agendado");
  const limpezaSA = limpeza.filter((sol) => sol.status === "Solicitação Atendida");

  const ambiente = solicitacoes.filter((item) => item.categoria_id === 4);
  const ambientePN = ambiente.filter((sol) => sol.status === "Pedido Negado");
  const ambientePE = ambiente.filter((sol) => sol.status === "Processando Envio");
  const ambienteAR = ambiente.filter((sol) => sol.status === "Aguardando Resposta");
  const ambienteAA = ambiente.filter((sol) => sol.status === "Atendimento Agendado");
  const ambienteSA = ambiente.filter((sol) => sol.status === "Solicitação Atendida");

  const pedestre = solicitacoes.filter((item) => item.categoria_id === 5);
  const pedestrePN = pedestre.filter((sol) => sol.status === "Pedido Negado");
  const pedestrePE = pedestre.filter((sol) => sol.status === "Processando Envio");
  const pedestreAR = pedestre.filter((sol) => sol.status === "Aguardando Resposta");
  const pedestreAA = pedestre.filter((sol) => sol.status === "Atendimento Agendado");
  const pedestreSA = pedestre.filter((sol) => sol.status === "Solicitação Atendida");

  const saude = solicitacoes.filter((item) => item.categoria_id === 6);
  const saudePN = saude.filter((sol) => sol.status === "Pedido Negado");
  const saudePE = saude.filter((sol) => sol.status === "Processando Envio");
  const saudeAR = saude.filter((sol) => sol.status === "Aguardando Resposta");
  const saudeAA = saude.filter((sol) => sol.status === "Atendimento Agendado");
  const saudeSA = saude.filter((sol) => sol.status === "Solicitação Atendida");

  const seguranca = solicitacoes.filter((item) => item.categoria_id === 7);
  const segurancaPN = seguranca.filter((sol) => sol.status === "Pedido Negado");
  const segurancaPE = seguranca.filter((sol) => sol.status === "Processando Envio");
  const segurancaAR = seguranca.filter((sol) => sol.status === "Aguardando Resposta");
  const segurancaAA = seguranca.filter((sol) => sol.status === "Atendimento Agendado");
  const segurancaSA = seguranca.filter((sol) => sol.status === "Solicitação Atendida");

  const transporte = solicitacoes.filter((item) => item.categoria_id === 8);
  const transportePN = transporte.filter((sol) => sol.status === "Pedido Negado");
  const transportePE = transporte.filter((sol) => sol.status === "Processando Envio");
  const transporteAR = transporte.filter((sol) => sol.status === "Aguardando Resposta");
  const transporteAA = transporte.filter((sol) => sol.status === "Atendimento Agendado");
  const transporteSA = transporte.filter((sol) => sol.status === "Solicitação Atendida");

  const urbanismo = solicitacoes.filter((item) => item.categoria_id === 9);
  const urbanismoPN = urbanismo.filter((sol) => sol.status === "Pedido Negado");
  const urbanismoPE = urbanismo.filter((sol) => sol.status === "Processando Envio");
  const urbanismoAR = urbanismo.filter((sol) => sol.status === "Aguardando Resposta");
  const urbanismoAA = urbanismo.filter((sol) => sol.status === "Atendimento Agendado");
  const urbanismoSA = urbanismo.filter((sol) => sol.status === "Solicitação Atendida");

  const transito = solicitacoes.filter((item) => item.categoria_id === 10);
  const transitoPN = transito.filter((sol) => sol.status === "Pedido Negado");
  const transitoPE = transito.filter((sol) => sol.status === "Processando Envio");
  const transitoAR = transito.filter((sol) => sol.status === "Aguardando Resposta");
  const transitoAA = transito.filter((sol) => sol.status === "Atendimento Agendado");
  const transitoSA = transito.filter((sol) => sol.status === "Solicitação Atendida");

  const resumoDetalhe = [
    {

      categoria_id: 0,      
      nome: "Abastecimento / Saneamento",
      total: abastecimento,
      pn: abastecimentoPN,
      pe: abastecimentoPE,
      ar: abastecimentoAR,
      aa: abastecimentoAA,
      sa: abastecimentoSA
    },{
      categoria_id: 1,
      nome: "Comércio Irregular",
      total: comercio,
      pn: comercioPN,
      pe: comercioPE,
      ar: comercioAR,
      aa: comercioAA,
      sa: comercioSA
    },{
      categoria_id: 2,
      nome: "Iluminação / Energia",
      total: energia,
      pn: energiaPN,
      pe: energiaPE,
      ar: energiaAR,
      aa: energiaAA,
      sa: energiaSA
    },{
      categoria_id: 3,
      nome: "Limpeza / Manutenção",
      total: limpeza,
      pn: limpezaPN,
      pe: limpezaPE,
      ar: limpezaAR,
      aa: limpezaAA,
      sa: limpezaSA
    },{
      categoria_id: 4,
      nome: "Meio Ambiente",
      total: ambiente,
      pn: ambientePN,
      pe: ambientePE,
      ar: ambienteAR,
      aa: ambienteAA,
      sa: ambienteSA
    },{
      categoria_id: 5,
      nome: "Pedestre / Ciclista",
      total: pedestre,
      pn: pedestrePN,
      pe: pedestrePE,
      ar: pedestreAR,
      aa: pedestreAA,
      sa: pedestreSA
    },{
      categoria_id: 6,
      nome: "Saúde",
      total: saude,
      pn: saudePN,
      pe: saudePE,
      ar: saudeAR,
      aa: saudeAA,
      sa: saudeSA
    },{
      categoria_id: 7,
      nome: "Segurança",
      total: seguranca,
      pn: segurancaPN,
      pe: segurancaPE,
      ar: segurancaAR,
      aa: segurancaAA,
      sa: segurancaSA
    },{
      categoria_id: 8,
      nome: "Transporte Público",
      total: transporte,
      pn: transportePN,
      pe: transportePE,
      ar: transporteAR,
      aa: transporteAA,
      sa: transporteSA
    },{
      categoria_id: 9,
      nome: "Urbanismo",
      total: urbanismo,
      pn: urbanismoPN,
      pe: urbanismoPE,
      ar: urbanismoAR,
      aa: urbanismoAA,
      sa: urbanismoSA
    },{
      categoria_id: 10,
      nome: "Vias / Trânsito",
      total: transito,
      pn: transitoPN,
      pe: transitoPE,
      ar: transitoAR,
      aa: transitoAA,
      sa: transitoSA
    },
  ]

  return (
    <>
      <div className={style.base}>
        <table>
          <thead>
            <tr>
              <th> Id </th>
              <th> Categoria </th>
              <th style={{ color: "#CC3A3A" }}> Pedido Negado </th>
              <th style={{ color: "#E8A25C" }}> Processando </th>
              <th style={{ color: "#E5CE00" }}> Aguardando </th>
              <th style={{ color: "#6399C2" }}> Agendado</th>
              <th style={{ color: "#57CE6E" }}> Atendido </th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            {resumoDetalhe.map((categoria, index) => {
              return (
                <tr key={index} onClick={() => console.log(index)}>
                  <td>{categoria.categoria_id}</td>
                  <td>{categoria.nome}</td>
                  <td>{categoria.pn.length}</td>
                  <td>{categoria.pe.length}</td>
                  <td>{categoria.ar.length}</td>
                  <td>{categoria.aa.length}</td>
                  <td>{categoria.sa.length}</td>
                  <td>{categoria.total.length}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default CardTabelaRes;
