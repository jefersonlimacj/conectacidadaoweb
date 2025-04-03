import { useState, useEffect } from "react";
import style from "./css/cardTabelaUsuarios.module.css";
import { useNavigate } from "react-router-dom";

function TabelaUsuario({ _list }) {
  const navigate = useNavigate();
  const usuarios = _list;

  const [ordem, setOrdem] = useState(1);
  const [colunaOrdem, setColunaOrdem] = useState(null);

  const mudarOrdem = (coluna) => {
    setOrdem(coluna === colunaOrdem ? -ordem : 1);
    setColunaOrdem(coluna);
  };

  const ordemUsuarios = colunaOrdem
    ? [...usuarios].sort((a, b) => {
        let inicio, fim;
        if (colunaOrdem === "bairro") {
          inicio = a.bairro;
          fim = b.bairro;
        } else {
          inicio = a[colunaOrdem];
          fim = b[colunaOrdem];
        }
        return inicio < fim ? -ordem : ordem;
      })
    : usuarios;

  return (
    <>
      <div className={style.filtroUsuarios}>
        <p>Filtro de Usuários:</p>
        <div className={style.dividerH}></div>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
          }}
        >
          <div className={style.camposFiltro}>
            <p>Nome:</p>
            <input type="text" name="" id="" />
            <p>Bairro:</p>
            <input type="text" name="" id="" />
            <p>Gênero:</p>
            <select name="" id="">
              <option value=""> Masculino </option>
              <option value=""> Feminino </option>
              <option value=""> Preferem Não Dizer </option>
            </select>
          </div>
          <button>Filtrar</button>
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
              <th>Ver / Editar</th>
            </tr>
          </thead>
          <tbody>
            {ordemUsuarios.map((usuario) => {
              const idade = (dataNascimento) => {
                const data = new Date();
                const dataNasc = new Date(dataNascimento);
                const diferenca = Math.abs(data.getTime() - dataNasc.getTime());
                return Math.floor(diferenca / (1000 * 60 * 60 * 24 * 365.25));
              };

              return (
                <tr key={usuario.id}>
                  <td style={{ paddingLeft: "10px" }}>{usuario.id}</td>
                  <td>
                    <div
                      className={style.cxStatus}
                      style={{
                        backgroundColor:
                          usuario.statusUsuario === "ativo"
                            ? "greenyellow"
                            : "#FF0000",
                      }}
                    >
                      <span
                        className="material-symbols-rounded"
                        style={{
                          color:
                            usuario.statusUsuario === "ativo" ? "green" : "#330000",
                        }}
                      >
                        {usuario.statusUsuario === "ativo" ? "lock_open" : "lock"}
                      </span>
                    </div>
                  </td>
                  <td>
                    <img
                      style={{ borderRadius: "10px" }}
                      src={`https://picsum.photos/seed/${usuario.id}-1/200`}
                      alt={`Foto do usuário: ${usuario.nome}`}
                    />
                  </td>
                  <td>{usuario.nome}</td>
                  <td>{usuario.genero}</td>
                  <td>{idade(usuario.dataNascimento)}</td>
                  <td>{usuario.bairro}</td>
                  <td
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "space-between",
                      alignItems: "center",
                      gap: "10px",
                    }}
                  >
                    <div
                      className={style.actBtn}
                      onClick={() => navigate(`/usuario/${usuario.id}`)}
                    >
                      <span className="material-symbols-rounded">
                        visibility
                      </span>
                    </div>
                    <div
                      className={style.actBtn}
                      onClick={() =>
                        navigate(
                          `/cadastros/usuarioslista/editar/${usuario.id}`
                        )
                      }
                    >
                      <span className="material-symbols-rounded"> edit </span>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default TabelaUsuario;
