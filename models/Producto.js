const Sequelize = require("sequelize")

const producto_model = (conexion) => {
    let producto = conexion.define("productos", {
        id : {
            field : "id",
            type : Sequelize.INTEGER,
            primaryKey : true,
            autoIncrement : true,
            allowNull : false
        },
        
        id_categoria : {
            type: Sequelize.INTEGER,
            references: {
                model: 'categorias',
                key: 'id'
            }
        },
        id_usuario : {
            type: Sequelize.INTEGER,
            references: {
                model: 'usuarios',
                key: 'id_usuario'
            }
        },
        imagen : {
            field : "imagen",
            type : Sequelize.STRING,
            allowNull : true
        },
        nombre : {
            field : "nombre",
            type : Sequelize.STRING,
            allowNull : false
        },
        descripcion : {
            field : "descripcion",
            type : Sequelize.TEXT,
            allowNull : false
        },
        stock : {
            field : "stock",
            type : Sequelize.INTEGER,
            allowNull : false
        },
        precio : {
            field : "precio",
            type : Sequelize.DECIMAL,
            allowNull : false
        },
        precio_oferta : {
            field : "precio_oferta",
            type : Sequelize.DECIMAL,
            allowNull : true
        },

        estado : {
            field : "estado",
            type : Sequelize.TINYINT,
            allowNull : false
        },

    },{
        tableName : "productos",
        timestamps : true
    })

    producto.prototype.mostrarNombre = function(parametro) {
        return this.nombre;
    }

    return producto
}

module.exports = producto_model