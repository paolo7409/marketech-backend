const Sequelize = require("sequelize")
 
const compra_model = (conexion) => {
    let compra = conexion.define("compras", {
        id : {
            field : "id",
            type : Sequelize.INTEGER,
            primaryKey : true,
            autoIncrement : true,
            allowNull : false
        },
        
        id_usuario : {
            type: Sequelize.INTEGER,
            references: {
                model: 'usuarios',
                key: 'id_usuario'
            }
        },
        id_producto : {
            type: Sequelize.INTEGER,
            references: {
                model: 'productos',
                key: 'id'
            }
        }
    },{
        tableName : "compras",
        timestamps : true
    })

    return compra
}

module.exports = compra_model