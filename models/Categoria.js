const Sequelize = require("sequelize")

const categoria_model = (conexion) => {
    let categoria = conexion.define("categorias", {
        id : {
            field : "id",
            type : Sequelize.INTEGER,
            primaryKey : true,
            autoIncrement : true,
            allowNull : false
        },
        nombre : {
            field : "nombre",
            type : Sequelize.STRING,
            allowNull : false
        },
        estado : {
            field : "estado",
            type : Sequelize.TINYINT,
            allowNull : false
        },
    },{
        tableName : "categorias",
        timestamps : true
    })

    return categoria;
}

module.exports = categoria_model