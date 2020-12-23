const {Reclamo, Usuario, Producto, Compra} = require('../config/Sequelize')

const obtenerReclamos = (req,res)=>{
    Reclamo.findAll({where: {estado:1}})
        .then((resultado) => {

            if (resultado.length === 0){
                res.status(200).json({
                    ok: false,
                    content: resultado,
                    message: "Por el momento ningun usuario ha reclamado algo"
                })
            }
            
            else{
                res.status(200).json({
                    ok: true,
                    content: resultado,
                    message: "Reclamos obtenidos exitosamente"
                })
            }
        })
        .catch((error)=>{
            res.status(500).json({
                ok: false,
                content: error,
                message: "Ocurrio un error al tratar de obtener los resultados deseados"
            })
        })
}

const insertarReclamo = (req,res)=>{

    const CrearReclamo = () => {
        let nuevoReclamo = Reclamo.build(req.body);
        nuevoReclamo.save().then(resultado=>{
            res.status(200).json({
                ok: true,
                content: resultado,
                message: "Reclamo creado exitosamente"
            })
        })
        .catch(error =>{
            res.status(500).json({
                ok: false,
                content: error,
                message: "Ocurrio un error al tratar de crear el reclamo deseado"
            })
        })
    }

    const validarCompra = () => {
        Compra.findByPk(req.body.id_compra).then((compraEncontrada) => {
            if (compraEncontrada){
                CrearReclamo()
            }

            else {
                res.status(404).json({
                    ok : false,
                    content : null,
                    message : "La compra de la cual se le desea reclamar no existe"
                })
            }
        }).catch((error) => {
            res.status(500).json({
                ok : false,
                content : error,
                message : "Ocurrio un error al tratar de crear el reclamo deseado"
            })
        })
    }

    const validarProducto = () => {
        Producto.findByPk(req.body.id_producto).then((productoEncontrado) => {
            if (productoEncontrado){
                validarCompra()
            }

            else {
                res.status(404).json({
                    ok : false,
                    content : null,
                    message : "El producto del cual se le desea reclamar no existe"
                })
            }
        }).catch((error) => {
            res.status(500).json({
                ok : false,
                content : error,
                message : "Ocurrio un error al tratar de crear el reclamo deseado"
            })
        })

    }

    const validarUsuario = () => {
        Usuario.findByPk(req.body.id_usuario).then((usuarioEncontrado) => {
            if (usuarioEncontrado){
                validarProducto()
            }
            
            else {
                res.status(404).json({
                    ok : false,
                    content : null,
                    message : "El usuario al cual se le desea reclamar no existe"
                })
            }
        }).catch((error) => {
            res.status(500).json({
                ok : false,
                content : error,
                message : "Ocurrio un error al tratar de crear el reclamo deseado"
            })
        })
    }

    validarUsuario()
}

module.exports = {
    obtenerReclamos,
    insertarReclamo
}