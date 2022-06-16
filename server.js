const rotas = require("./routes/routers");
const app = require("express")();
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: true }));
app.use((request, response, next) => {
    response.append('Access-Control-Allow-Origin', ['*']);
    response.append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    response.append('Access-Control-Allow-Headers', 'Content-Type');
    next();
});
app.use("/", rotas);

module.exports = app;