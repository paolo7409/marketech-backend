const Sequelize = require("sequelize")
 
const pedido_detalle_model = (conexion) => {
    let pedido_detalle = conexion.define("compras", {
        id : {
            field : "id",
            type : Sequelize.INTEGER,
            primaryKey : true,
            autoIncrement : true,
            allowNull : false
        },
        id_pedido : {
            type: Sequelize.INTEGER,
            references: {
                model: 'pedidos',
                key: 'id'
            }
        },
        id_producto : {
            type: Sequelize.INTEGER,
            references: {
                model: 'productos',
                key: 'id'
            }
        },
        cantidad : {
            field : "cantidad",
            type: Sequelize.INTEGER,
            allowNull : false
        },
        subtotal : {
            field : "subtotal",
            type: Sequelize.DECIMAL,
            allowNull : false
        },
        estado : {
            field : "estado",
            type : Sequelize.TINYINT,
            allowNull : false
        },
    },{
        tableName : "pedido_detalle",
        timestamps : true
    })

    return pedido_detalle
}

module.exports = pedido_detalle_model