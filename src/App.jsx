import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "../src/paginas/dashboard";
import Login from "../src/paginas/login";
import Home from "../src/paginas/home";
import Inatividade from "../src/paginas/inatividade";
import RecuperarSenha2 from "../src/paginas/recuparar-senha2";
import RecuperarSenha from "../src/paginas/recuperar-senha";
import Registro from "../src/paginas/subPaginas/registro";
import Usuario from "../src/paginas/subPaginas/usuario";
import Solicitacoes from "../src/paginas/Solicitacoes";
import Usuarios from "./paginas/usuarios";
import ResumoStatus from "./paginas/subPaginas/resStatus";
import Servico from "../src/paginas/subPaginas/servico";
import Servicos from "../src/paginas/servicos";
import CategoriaEdit from "./paginas/editores/categoriaEdit";
import CategoriaStart from "./paginas/editores/categoriaStart";
import Cadastros from "./paginas/cadastros";
import GestoresLista from "./paginas/subPaginas/gestoresLista";
import UsuariosLista from "./paginas/subPaginas/usuariosLista";
import CriarGestor from "./paginas/editores/gestorStart";
import EditarGestor from "./paginas/editores/gestoredit";
import CriarUsuario from "./paginas/editores/usuarioStart";
import EditarUsuario from "./paginas/editores/usuarioEdit";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/recuperar-senha" element={<RecuperarSenha />} />
          <Route path="/recuperar-senha2" element={<RecuperarSenha2 />} />
          <Route path="/inatividade" element={<Inatividade />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/registro/:p_id" element={<Registro />} />
          <Route path="/solicitacoes" element={<Solicitacoes />} />
          <Route path="/usuarios" element={<Usuarios />} />
          <Route path="/usuario/:u_id" element={<Usuario />} />
          <Route path="/resumostatus/:rs_id" element={<ResumoStatus />} />
          <Route path="/servicos" element={<Servicos />} />
          <Route path="/servico/:ct_id" element={<Servico />} />
          <Route path="/editarcategoria/:ct_id" element={<CategoriaEdit />} />
          <Route path="/criarcategoria" element={<CategoriaStart />} />
          <Route path="/cadastros" element={<Cadastros />} />
          <Route path="/cadastros/gestoreslista" element={<GestoresLista />} />
          <Route
            path="/cadastros/gestoreslista/criar"
            element={<CriarGestor />}
          />
          <Route
            path="/cadastros/gestoreslista/editar/:g_id"
            element={<EditarGestor />}
          />
          <Route path="/cadastros/usuarioslista" element={<UsuariosLista />} />
          <Route
            path="/cadastros/usuarioslista/criar"
            element={<CriarUsuario />}
          />
          <Route
            path="/cadastros/usuarioslista/editar/:u_id"
            element={<EditarUsuario />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
export default App;
