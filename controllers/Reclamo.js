const {Reclamo} = require('../config/Sequelize')

const obtenerReclamo = (req,res)=>{
    Reclamo.findAll({where: {estado:1}})
        .then((resultado) => {
            res.status(200).json({
                ok:true,
                content:resultado,
                message:null
            })
        })
        .catch((err)=>{
            res.status(500).json({
                ok:false,
                content:err,
                message:"No se encontro ningun reclamo activo"
            })
        })
}

const insertarReclamo = (req,res)=>{
    let reclamo = Reclamo.build(req.body);
    reclamo.save().then(resultado=>{
        res.status(200).json({
            ok:true,
            content:resultado,
            message:null
        })
    })
    .catch(err=>{
        res.status(500).json({
            ok:false,
            content:err,
            message:"Error al guardar la informacion"
        })
    })
}

module.exports = {
    obtenerReclamo,
    insertarReclamo
}