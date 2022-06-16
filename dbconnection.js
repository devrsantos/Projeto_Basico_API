const mysql = require("mysql");
const { configLocalhost } = require("./dbconfig");

const connection = mysql.createConnection(configLocalhost);

module.exports = {
    connection
};