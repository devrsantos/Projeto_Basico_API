const router = require('express').Router();
const { connection } = require("./../dbconnection");
const { get, post, del, put } = require("./../syntaxeSQL");

connection.connect();

let queryString;

router.get("/get", async (request, response) => {

    queryString = await get();
    
    connection.query(queryString, (erroSQL, returnSQL) => {
        if (erroSQL) {
            response.status(404).json({"Error": erroSQL.sqlMessage});
            throw erroSQL.sqlMessage;
        }
        response.status(200).json(returnSQL);
    });
});

router.post("/post", async (request, response) => {
    const nomeProduto = request.body.nome_produto;
    const valorProduto = request.body.valor_produto;
        
    queryString = await post(nomeProduto, valorProduto);

    connection.query(queryString, (erroSQL, returnSQL) => {
        if (erroSQL) {
            response.status(401).json({"Error": erroSQL.sqlMessage});
            throw erroSQL;
        }
        response.status(201).json(returnSQL);
    });
});

router.delete("/delete", async (request, response) => {
    const idProduto = request.query.id_produto;

    queryString = await del(idProduto);

    connection.query(queryString, (erroSQL, returnSQL) => {
        if (erroSQL) {
            response.status(401).json({"Error": erroSQL.sqlMessage});
            throw erroSQL.sqlMessage;
        };
        response.status(200).json(returnSQL);
    });
});

router.put("/put", async (request, response) => {
    const newValue = request.body.valor_produto;
    const idProduto = request.query.id_produto;

    queryString = await put(newValue, idProduto);

    connection.query(queryString, (erroSQL, returnSQL) => {
        if (erroSQL) {
            response.status(401).json({"Error": erroSQL.sqlMessage});
            throw erroSQL.sqlMessage;
        }
        response.status(200).json(returnSQL);
    });
});

module.exports = router;
