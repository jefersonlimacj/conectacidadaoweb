import style from "../componentes/css/mapa.module.css";

function Mapa() {
  return (
    <>
      <div className={style.telaMapa}>
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d3890.590982443622!2d-38.39244283837584!3d-12.805040396090211!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1spt-BR!2sbr!4v1740228438613!5m2!1spt-BR!2sbr"
          style={{ border: 0 }}
          loading="lazy"
        ></iframe>
      </div>
    </>
  );
}

export default Mapa;
