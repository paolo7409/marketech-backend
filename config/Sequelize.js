const Sequelize = require('sequelize');
const usuario_model = require("../models/Usuario")
const conexion = new Sequelize(
    "marketech","root", "root",{
        host:"127.0.0.1",
        dialect: "mysql",
        timezone: "-05:00",
        logging: false, 
        dialectOptions : {
            dateStrings: true,
        } 
    }
);

const Usuario = usuario_model(conexion)

module.exports = {
    conexion: conexion,
    Usuario
}