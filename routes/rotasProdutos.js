const router = require('express').Router();
const { connection } = require("../dbconnection");
const { get, getOne, post, del, put } = require("../syntaxeSQL");

connection.connect();

let queryString;

router.get("/get", async (request, response) => {

    queryString = await get();
    
    connection.query(queryString, (erroSQL, returnSQL) => {
        if (erroSQL !== null) {
            response.status(404).json({"Error": erroSQL.sqlMessage});
        }
        response.status(200).json(returnSQL);
    });
});

router.get("/getOne", async (request, response) => {
    const idProduto = request.query.id_produto;
    
    queryString = await getOne(idProduto);
    
    connection.query(queryString, (erroSQL, returnSQL) => {
        if (erroSQL !== null) {
            response.status(401).json({
                "sqlMessage": erroSQL.sqlMessage,
                "sql": erroSQL.sql
            });
        }
        if (returnSQL !== undefined && returnSQL[0] !== undefined) {
            response.status(200).json({
                returnSQL
            });    
        } else if (erroSQL == null && returnSQL[0] == undefined) {
            response.status(404).json({
                "Error": "Item não encontrado"
            });
        }
    }); 
}); 

router.post("/post", async (request, response, next) => {
    const nomeProduto = request.body.nome_produto;
    const valorProduto = request.body.valor_produto;
        
    queryString = await post(nomeProduto, valorProduto);

    connection.query(queryString, (erroSQL, returnSQL) => {
        if (erroSQL !== null) {
            response.status(401).json({
                "sqlMessage": erroSQL.sqlMessage,
                "sql": erroSQL.sql
            });
        }
        if (returnSQL !== undefined) {
            response.status(200).json({
                "Message": "Item inserido com sucesso",
                "Posição": `id_produto: ${returnSQL.insertId}`
            });    
        } 
    });
});

router.delete("/delete", async (request, response) => {
    const idProduto = request.query.id_produto;

    queryString = await del(idProduto);

    connection.query(queryString, (erroSQL, returnSQL) => {
        if (erroSQL !== null) {
            response.status(401).json({
                "Message": erroSQL.sqlMessage,
                "sql": erroSQL.sql
            });
        };
        if (returnSQL !== undefined && returnSQL.affectedRows == 1) {
            response.status(200).json({
                "Posição": `id_produto: ${idProduto}`,
                "Message": "Item deletado com sucesso"
            });    
        } else if (returnSQL !== undefined && returnSQL.affectedRows == 0) {
            response.status(404).json({
                "Posição": `id_produto: ${idProduto}`,
                "Message": "Item não encontrado"
            });    
        }
    });
});

router.put("/put", async (request, response) => {
    const newValue = request.body.valor_produto;
    const idProduto = request.query.id_produto;

    queryString = await put(newValue, idProduto);

    connection.query(queryString, (erroSQL, returnSQL) => {
        if (erroSQL !== null) {
            response.status(401).json({
                "Message": erroSQL.sqlMessage,
                "sql": erroSQL.sql
            });
        };
        if (returnSQL !== undefined && returnSQL.affectedRows == 1) {
            response.status(200).json({
                "Posição": `id_produto: ${idProduto}`,
                "Message": "Item alterado com sucesso"
            });    
        } else if (returnSQL !== undefined && returnSQL.affectedRows == 0) {
            response.status(404).json({
                "Posição": `id_produto: ${idProduto}`,
                "Message": "Item não encontrado"
            });    
        }
    });
});

module.exports = router;
