import TopMenu from "../componentes/top-menu";
import NavMenu from "../componentes/nav-menu";
import Mapa from "../componentes/mapa"
import IndicadoresBanner from "../componentes/indicadores-banner";
import style from "./css/home.module.css";

function Home() {
  return (
    <>
      <TopMenu />
      <div className={style.main}>
        <NavMenu />
        <div className={style.section}>
          <IndicadoresBanner />
          <Mapa />
        </div>
      </div>
    </>
  );
}

export default Home;
