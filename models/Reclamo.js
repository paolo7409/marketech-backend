const Sequelize = require('sequelize');

const reclamo_model = (conexion)=>{
    let reclamo = conexion.define("reclamos",{
        id:{
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
                key: 'usuario_id'
            }
        },
        id_producto : {
            type: Sequelize.INTEGER,
            references: {
                model: 'productos',
                key: 'id'
            }
        },
        mensaje : {
            field:"mensaje",
            type: Sequelize.STRING,
            allowNull:false
        },
        estado: {
            field:"estado",
            type: Sequelize.TINYINT,

        }
    },{
        tablename:"reclamos",
        timestamps:true
    })

    reclamo.prototype.mostrarReclamo = function(parametro){
        return this.mensaje
    }

    return reclamo;
}

module.exports = reclamo_model;