const Sequelize = require('sequelize');
const usuario_model = require("../models/Usuario")
const producto_model = require("../models/Producto")
const reclamo_model = require("../models/Reclamo")
const categoria_model = require("../models/Categoria")
const compra_model = require("../models/Compra")

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
const Categoria = categoria_model(conexion)
const Producto = producto_model(conexion)
const Compra = compra_model(conexion)
const Reclamo = reclamo_model(conexion)

module.exports = {
    conexion: conexion,
    Usuario,
    Producto,
    Reclamo,
    Categoria,
    Compra
}