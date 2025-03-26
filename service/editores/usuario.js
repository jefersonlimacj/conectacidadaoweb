import { db } from "../db.js";

export const pegarUsuarios = (req, res) => {
  const sql = `SELECT * FROM cone6675_conectacidadao.usuarios`;

  db.query(sql, (err, result) => {
    if (err) {
      return res.status(500).json({ erro: "Erro" });
    }
    return res.status(200).json(result);
  });
};

export const pegarEndereco = (req, res) => {
  const sql = `SELECT * FROM cone6675_conectacidadao.enderecos`;

  db.query(sql, (err, result) => {
    if (err) {
      return res
        .status(500)
        .json({ erro: "Não foi possível encontrar o Caminho" });
    } else {
      res.status(200).json(result);
    }
  });
};
