const Sequelize = require("sequelize")
 
const pedido_model = (conexion) => {
    let pedido = conexion.define("compras", {
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
        precio_total : {
            field : "precio_total",
            type: Sequelize.DECIMAL,
            allowNull : false
        },
        estado_pedido : {
            field : "estado_pedido",
            type: Sequelize.STRING,
            allowNull : false
        },
        estado : {
            field : "estado",
            type : Sequelize.TINYINT,
            allowNull : false
        },
    },{
        tableName : "pedidos",
        timestamps : true
    })

    return pedido
}

module.exports = pedido_model