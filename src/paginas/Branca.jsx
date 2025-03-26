import NavMenu from "../componentes/nav-menu";
import TopMenu from "../componentes/top-menu";
import style from "../paginas/css/dashboard.module.css";

function Branca() {
  return (
    <>
      <TopMenu />
      <div className={style.main}>
        <NavMenu />
        <div className={style.section}>
        </div>
      </div>
    </>
  );
}

export default Branca;
