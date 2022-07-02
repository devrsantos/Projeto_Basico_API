const rotasProdutos = require("./routes/rotasProdutos");
const rotasUsuarios = require("./routes/rotasUsuarios");
const app = require("express")();
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use((request, response, next) => {
    response.append('Access-Control-Allow-Origin', ['*']);
    response.append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    response.append('Access-Control-Allow-Headers', 'Content-Type');
    next();
});
app.use("/produtos", rotasProdutos);
app.use("/usuarios", rotasUsuarios);

module.exports = app;
