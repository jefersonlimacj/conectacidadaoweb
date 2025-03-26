import mysql from "mysql2";
import dotenv from "dotenv";

dotenv.config();

export const db = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_DB,
  waitForConnections: true,
});

db.query("SELECT 1", (err, resp) => {
    if(err){
        console.log("Não foi possível conectar-se ao Banco ", err)
    }else{
        console.log("Banco conectado com sucesso!!!")
    }
});
