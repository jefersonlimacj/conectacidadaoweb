import express from "express";
import { pegarUsuarios, pegarEndereco } from "../editores/usuario.js"

const rota = express.Router();

rota.get("/lista/usuarios", pegarUsuarios);
rota.get("/lista/usuarios/endereco", pegarEndereco);


export default rota