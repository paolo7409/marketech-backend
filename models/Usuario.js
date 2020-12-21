const Sequelize = require("sequelize")
const crypto = require("crypto")
const jsonwebtoken = require("jsonwebtoken")

const usuario_model = (conexion) => {
    let usuario = conexion.define("usuarios", {
        id : {
            field : "id",
            type : Sequelize.INTEGER,
            primaryKey : true,
            autoIncrement : true,
            allowNull : false
        },
    },{
        tableName : "usuarios",
        timestamps : true
    })

    return usuario
}

module.exports = usuario_model