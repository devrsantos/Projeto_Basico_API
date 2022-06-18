const get = () => {
    return `SELECT * from loja.produtos`;
};

const getID = params => {
    return `SELECT * from loja.produtos WHERE id_produto= ${params}`;
};

const post = (params1, params2) => {
    return `INSERT INTO loja.produtos(nome_produto,valor_produto)VALUE("${params1}","${params2}")`;
};

const del = params => {
    return `DELETE FROM loja.produtos WHERE id_produto= ${params}`;
};

const put = (newValue, params) => {
    return `UPDATE loja.produtos SET valor_produto = ${newValue} WHERE id_produto= ${params}`;
};

module.exports = {
    get,
    getID,
    post,
    del,
    put
}