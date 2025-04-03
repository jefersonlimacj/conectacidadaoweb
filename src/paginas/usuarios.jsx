import NavMenu from "../componentes/nav-menu";
import TopMenu from "../componentes/top-menu";
import style from "./css/usuarios.module.css";
import usuarios from "../jsons/usuarios.json";
import TabelaUsuario from "../componentes/cardsRelatorios/cardTabelaUsuarios";
import BairroUsuario from "../componentes/cardsRelatorios/cardBairroUsuario";
import GeneroUsuario from "../componentes/cardsRelatorios/cardGerenoUsuario";
import IdadeUsuario from "../componentes/cardsRelatorios/cardIdadeUsuario";
import api from "../../service/api";
import { useState, useEffect } from "react";


function Usuarios() {
  const [usuarios, setUsuarios] = useState([]);
  const [dataNasc, setDataNasc] = useState();

  useEffect(() => {
    const pegarUsuario = async () => {
      try {
        const dadosUsuario = await api.get(`/cadastro/usuarios`);
        setUsuarios(dadosUsuario.data.result); // Atualiza o estado do Usuário com os dados recebidos
      } catch (error) {
        console.error("Erro ao buscar usuário:", error);
      }
    };

    pegarUsuario();
  }, []);
  
  const userAtivos = usuarios.filter((usuario) => usuario.statusUsuario === "ativo");
  const userInativos = usuarios.filter(
    (usuario) => usuario.statusUsuario === "inativo"
  );

  return (
    <>
      <TopMenu />
      <div className={style.main}>
        <NavMenu />
        <div className={style.section}>
          <div className={style.titulo}>
            <p>Dados dos Usuários</p>
            <div className={style.dividerH}></div>
          </div>
          <div className={style.userResumo}>
            <div>
              <p>Total de cadastrados:</p>
              <h1 style={{ color: "#055695" }}>{usuarios.length}</h1>
            </div>
            <div>
              <p>Usuários Ativos:</p>
              <h1 style={{ color: "green" }}>{userAtivos.length}</h1>
            </div>
            <div>
              <p>Usuários Bloqueado:</p>
              <h1 style={{ color: "red" }}>{userInativos.length}</h1>
            </div>
          </div>
          <div className={style.graficos}>
            <GeneroUsuario _list={usuarios} />
            <IdadeUsuario _list={usuarios} />
            <BairroUsuario _list={usuarios} />
          </div>
          <div className={style.graficos}>
            <p>Solicitantes 5+</p>
            <p>Indice de Retorno</p>
            {/* Pegar a frequência de acesso no app dentro do período demarcar os ultimos 30 dias*/}
          </div>
          <TabelaUsuario _list={usuarios} />
        </div>
      </div>
    </>
  );
}

export default Usuarios;
