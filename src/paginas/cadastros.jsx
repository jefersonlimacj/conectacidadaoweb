import { useEffect, useState } from "react";
import NavMenu from "../componentes/nav-menu";
import TopMenu from "../componentes/top-menu";
import style from "../paginas/css/cadastros.module.css";
import { useNavigate } from "react-router-dom";
import api from "../../service/api";
import usuariosFinal from "../jsons/usuarios.json"

function Cadastros() {
  const navigate = useNavigate();

  // const [usuarios, setUsuarios] = useState([]);
  // const [enderecos, setEndereco] = useState([]);

  // useEffect(() => {

  //   async function pegarDados() {
  //     const [usuarioRes, enderecoRes] = await Promise.all([
  //       api.get("/lista/usuarios"),
  //       api.get("/lista/usuarios/endereco")
  //     ])
  //     setUsuarios(usuarioRes.data)
  //     setEndereco(enderecoRes.data)
  //   }

  //   pegarDados()

  // }, []);

  // const usuariosFinal = usuarios.map((usuario) => {
  //   const endereco = enderecos.find((end) => end.usuario_id === usuario.id);

  //   return {
  //     ...usuario,
  //     endereco: endereco,
  //   };
  // });

  return (
    <>
      <TopMenu />
      <div className={style.main}>
        <NavMenu />
        <div className={style.section}>
          <p>Selecione o tipo de cadastro:</p>
          <div style={{ display: "flex", flexDirection: "row", gap: "15px" }}>
            <div
              className={style.base}
              onClick={() => navigate("/cadastros/gestoreslista")}
            >
              <span className="material-symbols-rounded">manage_accounts</span>
              <h3>Gestores</h3>
            </div>
            <div
              className={style.base}
              onClick={() => navigate("/cadastros/usuarioslista")}
            >
              <span className="material-symbols-rounded"> person </span>
              <h3>Usuários</h3>
            </div>
          </div>
          <table>
            <thead>
              <tr>
                <th onClick={() => mudarOrdem("id")}>ID</th>
                <th>Status</th>
                <th>Foto</th>
                <th onClick={() => mudarOrdem("nome")}>Nome</th>
                <th onClick={() => mudarOrdem("genero")}>Genero</th>
                <th onClick={() => mudarOrdem("idade")}>Idade</th>
                <th onClick={() => mudarOrdem("bairro")}>Bairro</th>
              </tr>
            </thead>
            <tbody>
              {usuariosFinal.map((usuario) => {
                return (
                  <tr key={usuario.id}>
                    <td>{usuario.id}</td>
                    <td>{usuario.status}</td>
                    <td>
                      <img src={usuario.foto} alt="" />
                    </td>
                    <td>{usuario.nome}</td>
                    <td>{usuario.genero}</td>
                    <td>{usuario.data_nascimento}</td>
                    <td>{usuario.endereco.bairro}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
export default Cadastros;
