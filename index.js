const rotas = require("./routes/routers");
const app = require("./server");

app.use("/", rotas);

app.listen(3000, () => {
    console.log(`Servidor rodando na porta 3000`);
});
