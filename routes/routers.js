const router = require('express').Router();
const { connection } = require("./../dbconnection");
const { get, post, del, put } = require("./../syntaxeSQL");

connection.connect();

let queryString;

router.get("/get", (request, response) => {

    queryString = get();
    
    connection.query(queryString, (erroSQL, returnSQL) => {
        if (erroSQL) throw erroSQL;
        response.json(returnSQL);
    });

});

router.post("/post", (request, response) => {

    const nomeProduto = request.body.nome_produto;
    const valorProduto = request.body.valor_produto;

    queryString = post(nomeProduto, valorProduto);

    connection.query(queryString, (erroSQL, returnSQL) => {
        if (erroSQL) throw erroSQL;
        response.json(returnSQL);
    });

});

router.delete("/delete", (request, response) => {

    const idProduto = request.query.id_produto;

    queryString = del(idProduto);

    connection.query(queryString, (erroSQL, returnSQL) => {
        if (erroSQL) throw erroSQL;
        response.json(returnSQL);
    });
});

router.put("/put", (request, response) => {
    const newValue = request.body.valor_produto;
    const idProduto = request.query.id_produto;

    queryString = put(newValue, idProduto);

    connection.query(queryString, (erroSQL, returnSQL) => {
        if (erroSQL) throw erroSQL;
        response.json(returnSQL);
    });
});

module.exports = router;