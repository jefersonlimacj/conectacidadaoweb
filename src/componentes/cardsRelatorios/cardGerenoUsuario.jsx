import { plugins } from "chart.js";
import style from "./css/cardGeneroUsuario.module.css";
import { Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

function GeneroUsuario({ _list }) {
  const usuarios = _list;

  const generos = usuarios.map((user) => user.genero);

  const feminino = generos.filter((genero) => genero === "Feminino");
  const masculino = generos.filter((genero) => genero === "Masculino");
  const naoInformado = generos.filter(
    (genero) => genero === "Prefere não informar"
  );

  return (
    <>
      <div className={style.base}>
        <Doughnut
          options={{
            plugins: {
              legend: {
                display: true,
                position: "bottom",
              },
            },
          }}
          data={{
            labels: ["Feminino", "Masculino", "Prefere não informar"],
            hidden: false,
            datasets: [
              {
                data: [feminino.length, masculino.length, naoInformado.length],
                backgroundColor: ["#ff26ba99", "#1c51ff99", "#99999999"],
                hoverBackgroundColor: ["#ff26ba", "#1c51ff", "#999999"],
                borderRadius: 5,
                borderWidth: 2,
              },
            ],
          }}
        />
      </div>
    </>
  );
}

export default GeneroUsuario;
