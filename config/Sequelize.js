const Sequelize = require('sequelize');
const usuario_model = require("../models/Usuario")
const producto_model = require("../models/Producto")
const reclamo_model = require("../models/Reclamo")
const categoria_model = require("../models/Categoria")
const compra_model = require("../models/Compra")
const pedido_model = require("../models/Pedido")
const pedido_detalle_model = require("../models/Pedido_detalle")

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
const Categoria = categoria_model(conexion)
const Producto = producto_model(conexion)
const Compra = compra_model(conexion)
const Reclamo = reclamo_model(conexion)
const Pedido = pedido_model(conexion)
const Pedido_detalle = pedido_detalle_model(conexion)

module.exports = {
    conexion: conexion,
    Usuario,
    Producto,
    Reclamo,
    Categoria,
    Compra,
    Pedido,
    Pedido_detalle,
}