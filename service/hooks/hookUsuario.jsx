import { useState, useEffect } from "react";
import api from "../api.jsx"

const useUsuario = (u_id) => {
    const [usuario, setUsuario] = useState(null);
    const [statusUsuario, setStatusUsuario] = useState(null);
    const [dataNasc, setDataNasc] = useState(null);
    const [loading, setLoading] = useState(true);
    const [erro, setErro] = useState(null);
  
    useEffect(() => {
      const pegarUsuario = async () => {
        try {
          const response = await api.get(`/cadastro/usuarios/${u_id}`);
          const dados = response.data.result[0];
  
          setUsuario(dados);
          setStatusUsuario(dados.statusUsuario);
          setDataNasc(dados.dataNascimento.split("T")[0]);
        } catch (error) {
          setErro(error);
        } finally {
          setLoading(false);
        }
      };
  
      if (u_id) pegarUsuario();
    }, [u_id]);

    const alterarStatus = async () => {
        try {
    
          const atualizacaoStatus = statusUsuario === "ativo" ? "inativo" : "ativo";
    
          const response = await api.patch(`/cadastro/usuarios/${u_id}`, {
            statusUsuario: atualizacaoStatus,
          });
    
          if (response.status === 200){        
          setStatusUsuario(atualizacaoStatus);
          }
    
          console.log(statusUsuario);
        } catch (error) {
          console.log(error);
        }
      };
    
  
    return { usuario, statusUsuario, setStatusUsuario, dataNasc, loading, erro, alterarStatus };
  };
  
  export default useUsuario;