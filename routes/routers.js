const router = require('express').Router();
const { connection } = require("./../dbconnection");
const { get, post, del, put } = require("./../syntaxeSQL");

connection.connect();

let queryString;

router.get("/get", async (request, response) => {

    queryString = await get();
    
    try {
        connection.query(queryString, (erroSQL, returnSQL) => {
            if (erroSQL) throw erroSQL;
            if (returnSQL !== "") {
                response.status(200).json(returnSQL);
            } 
        });
    } catch (error) {
        response.status(404).json({Error: "Não foi possível retornar as informações solicitadas"});
    } finally {
        console.log("Requisição Concluída");
    }
});

router.post("/post", async (request, response) => {
        const nomeProduto = request.body.nome_produto;
        const valorProduto = request.body.valor_produto;
        
        queryString = await post(nomeProduto, valorProduto);

        try {
            connection.query(queryString, (erroSQL, returnSQL) => {
                if (erroSQL) throw erroSQL;
                response.status(201).json(returnSQL);
            });
        } catch (error) {
            response.status(401).json({"Error": error});
        } finally {
            console.log("Requisição Concluída");
        }
});

router.delete("/delete", async (request, response) => {
    const idProduto = request.query.id_produto;

    queryString = await del(idProduto);

    try {
        if (idProduto != undefined) {
            connection.query(queryString, (erroSQL, returnSQL) => {
                if (erroSQL) throw erroSQL;
                response.status(200).json(returnSQL);
            });
        }  
    } catch (error) {
        response.status(401).json({"Error": "Verifique os parâmentros informados"});
    } finally {
        console.log("Requisição Concluída");
    }
});

router.put("/put", async (request, response) => {
    const newValue = request.body.valor_produto;
    const idProduto = request.query.id_produto;

    queryString = await put(newValue, idProduto);

    try {
        connection.query(queryString, (erroSQL, returnSQL) => {
            if (erroSQL) throw erroSQL;
            response.status(200).json(returnSQL);
        });
    } catch (error) {
        response.status(401).json({"Error": "Verifique os parâmentros informados"});
    } finally {
        console.log("Requisição Concluída");
    }
});

module.exports = router;