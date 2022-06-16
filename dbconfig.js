const keys = require("./myAccessKeys");

const configLocalhost = {
    host: "localhost",
    user: keys.userLocalhost,
    password: keys.keyLocalhost,
    database: "loja"
};

module.exports = {
    configLocalhost
};