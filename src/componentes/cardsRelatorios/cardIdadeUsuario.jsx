import style from "./css/cardIdadeUsuario.module.css";
import { Bar, Doughnut } from "react-chartjs-2";

function IdadeUsuario({ _list }) {
  const usuarios = _list;

  const anoAtual = new Date().getFullYear();

  const idades = usuarios.map((user) => {
    const DataNascimento = user.dataNascimento;

    const idade = anoAtual - DataNascimento.split("-")[0];

    return idade;
  });

  const idadesAte18 = idades.filter((idade) => idade < 18);
  const idadesAte25 = idades.filter((idade) => idade > 18 && idade <= 25);
  const idadesAte35 = idades.filter((idade) => idade > 25 && idade <= 35);
  const idadesAte45 = idades.filter((idade) => idade > 35 && idade <= 45);
  const idadesAte55 = idades.filter((idade) => idade > 45 && idade <= 55);
  const idades65 = idades.filter((idade) => idade > 55);

  return (
    <>
      <div className={style.base}>
        <p>Número de Usuários por Idade</p>
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
            hidden: false,
            labels: [
              "Até 18",
              "19 a 25",
              "26 a 35",
              "36 a 45",
              "46 a 55",
              "Acima de 55",
            ],
            datasets: [
              {
                data: [
                  idadesAte18.length,
                  idadesAte25.length,
                  idadesAte35.length,
                  idadesAte45.length,
                  idadesAte55.length,
                  idades65.length,
                ],
                backgroundColor: [
                  "#0099FF99",
                  "#FF000099",
                  "#E6E60099",
                  "#8000FF99",
                  "#00B81F99",
                  "#00C88499",
                ],
                hoverBackgroundColor: [
                  "#0099FF",
                  "#FF0000",
                  "#E6E600",
                  "#8000FF",
                  "#00B81F",
                  "#00C884",
                ],
                borderRadius: 5,
              },
            ],
          }}
        />
      </div>
    </>
  );
}

export default IdadeUsuario;
