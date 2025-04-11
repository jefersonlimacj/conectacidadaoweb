import fs from "fs"

const categorias = [
  { id: 1, nome: "Abastecimento / Saneamento", subcategorias: [1, 2, 3, 4, 5] },
  { id: 2, nome: "Comércio Irregular", subcategorias: [6, 7, 8, 9, 10] },
  { id: 3, nome: "Iluminação / Energia", subcategorias: [11, 12, 13, 14, 15] },
  { id: 4, nome: "Limpeza / Manutenção", subcategorias: [16, 17, 18, 19, 20] },
  { id: 5, nome: "Meio Ambiente", subcategorias: [21, 22, 23, 24, 25] },
  { id: 6, nome: "Pedestre / Ciclista", subcategorias: [26, 27, 28, 29, 30] },
  { id: 7, nome: "Saúde", subcategorias: [31, 32, 33, 34, 35] },
  { id: 8, nome: "Segurança", subcategorias: [36, 37, 38, 39, 40] },
  { id: 9, nome: "Transporte Público", subcategorias: [41, 42, 43, 44, 45] },
  { id: 10, nome: "Urbanismo", subcategorias: [46, 47, 48, 49, 50] },
  { id: 11, nome: "Vias / Trânsito", subcategorias: [51, 52, 53, 54, 55] },
  { id: 12, nome: "Esportes", subcategorias: [56, 57, 58, 59, 60, 61] },
  { id: 13, nome: "Piscina", subcategorias: [62, 63, 64, 65] }
];

const statusList = ["Pedido Negado", "Processando Envio", "Aguardando Resposta", "Atendimento Agendado", "Solicitação Atendida"];

function randomBetween(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomDate(start, end) {
  const date = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
  return date.toISOString();
}

function randomCoords() {
  return {
    latitude: (randomBetween(-12600, -12300) / 1000).toFixed(6),
    longitude: (randomBetween(-38700, -38400) / 1000).toFixed(6)
  };
}

const results = [];

for (let i = 0; i < 2000; i++) {
  const usuario_id = randomBetween(1, 42);
  const categoria = categorias[randomBetween(0, categorias.length - 1)];
  const categoria_id = categoria.id;
  const subcategoria_id = categoria.subcategorias[randomBetween(0, categoria.subcategorias.length - 1)];
  const data = randomDate(new Date("2024-01-01"), new Date("2024-12-31"));
  const soma = usuario_id + categoria_id + subcategoria_id;
  const protocolo = `${usuario_id}${categoria_id}${subcategoria_id}${data.substring(0, 10).replace(/-/g, "")}${soma}`;
  const coords = randomCoords();

  results.push({
    id: i,
    protocolo,
    usuario_id,
    categoria_id,
    subcategoria_id,
    fotos: "",
    status: statusList[randomBetween(0, statusList.length - 1)],
    endereco: `Rua ${randomBetween(1, 500)} - Simões Filho`,
    latitude: coords.latitude,
    longitude: coords.longitude,
    comentario: `Solicitação relacionada a ${categoria.nome} e subcategoria ${subcategoria_id}`,
    data
  });
}

fs.writeFileSync('resultado.txt', JSON.stringify(results, null, 2), 'utf8');
console.log("Arquivo resultado.txt salvo com sucesso!");