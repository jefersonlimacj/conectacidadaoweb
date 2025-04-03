import style from "./css/cardBairroUsuario.module.css";
import { Bar } from "react-chartjs-2";

function BairroUsuario({ _list }) {
  const usuarios = _list;

  const bairros = usuarios.map((user) => user.bairro);

  const contagem = bairros.reduce((acc, bairro) => {
    let itemContado = acc.find((item) => item.bairro === bairro);

    if (itemContado) {
      itemContado.quantidade += 1;
    } else {
      acc.push({ bairro, quantidade: 1 });
    }

    return acc;
  }, []);
  
  return (
    <>
      <div className={style.base}>
        <p>Número de usuários por Bairro</p>
        <div className={style.grafico}>
          <Bar
            options={{
              responsive: true,
              aspectRatio: false,
              plugins: {
                legend: {
                  display: false,
                },
              },
            }}
            width={"100%"}
            data={{
              labels: contagem.map((item) => item.bairro),
              hidden: false,
              datasets: [
                {
                  data: contagem.map((item) => item.quantidade),
                  backgroundColor: ["#05569599", "#99999999"],
                  hoverBackgroundColor: ["#055695", "#999999"],
                  borderRadius: 5,
                },
              ],
            }}
          />
        </div>
      </div>
    </>
  );
}

export default BairroUsuario;
