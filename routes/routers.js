const router = require('express').Router();
const { connection } = require("./../dbconnection");
const { get, post, del, put } = require("./../syntaxeSQL");

connection.connect();

let queryString;

router.get("/get", (request, response) => {

    queryString = get();
    
    connection.query(queryString, (erroSQL, returnSQL) => {
        if (erroSQL) throw erroSQL;
        if (returnSQL !== "") {
            response.status(200).json(returnSQL);
        } else {
            response.status(404).json({Error: "Não foi possível retornar as informações solicitadas"});
        }
    });

});

router.post("/post", (request, response) => {
    
    if (request.body.nome_produto != undefined && request.body.valor_produto != undefined) {
    
    const nomeProduto = request.body.nome_produto;
    const valorProduto = request.body.valor_produto;

    queryString = post(nomeProduto, valorProduto);
 
        connection.query(queryString, (erroSQL, returnSQL) => {
            if (erroSQL) throw erroSQL;
            response.status(201).json(returnSQL);
        });
    }else {
        response.status(401).json({"Error": "Verifique os parâmentros informados"});
    }
});

router.delete("/delete", (request, response) => {
    console.log(request.query.id_produto);
    if (request.query.id_produto !== undefined) {
        const idProduto = request.query.id_produto;

        queryString = del(idProduto);

        if (idProduto != undefined) {
            connection.query(queryString, (erroSQL, returnSQL) => {
                if (erroSQL) throw erroSQL;
                response.status(200).json(returnSQL);
            });
        }  
    } else {
        response.status(401).json({"Error": "Verifique os parâmentros informados"});
    }
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