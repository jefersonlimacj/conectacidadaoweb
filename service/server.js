import express from "express";
import cors from "cors";
import rota from "./rotas/usuario.js" 

const app = express();

app.use(express.json());

app.use(cors({origin: "http://localhost:5173",}));

// methods: ["GET", "POST", "PUT", "DELETE"],
// allowedHeaders: ["Content-Type", "Authorization"],

app.use("/", rota)

app.listen(5172);
