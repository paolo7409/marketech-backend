const Sequelize = require('sequelize');
const usuario_model = require("../models/Usuario")
const producto_model = require("../models/Producto")
const conexion = new Sequelize(
    "marketech_node","romario", "innovahora",{
        host:"127.0.0.1",
        dialect: "mysql",
        port: '3303',
        timezone: "-05:00",
        logging: false, 
        dialectOptions : {
            dateStrings: true,
        } 
    }
);

const Usuario = usuario_model(conexion)
const Producto = producto_model(conexion)

module.exports = {
    conexion: conexion,
    Usuario,
    Producto
}