const {Compra} = require("../config/Sequelize")
const {Producto} = require("../config/Sequelize")
const {Usuario} = require("../config/Sequelize")

const comprarProducto = (req, res) => {

    const crearCompra = () => {
        const nuevaCompra = Compra.build({id_usuario : req.body.usuarioId, id_producto : req.params.id})
        nuevaCompra.save().then((compraCreada) => {
            if (compraCreada){
                res.status(201).json({
                    ok : true,
                    content : compraCreada,
                    message : "Compra realizada exitosamente"
                })
            }

            else {
                res.status(400).json({
                    ok : true,
                    content : null,
                    message : "Ocurrio un error al tratar de crear la compra deseada"
                })
            }
        }).catch((error) => {
            res.status(500).json({
                ok : false,
                content : error,
                message : "Ocurrio un error al tratar de comprar el producto deseado"
            })
        })
    }

    const reducirStock = () => {
        Producto.findByPk(req.params.id).then((productoEncontrado) => {
            if (productoEncontrado){
                const nuevoStock = productoEncontrado.stock - 1
                Producto.update({ stock : nuevoStock }, { where : { id : req.params.id} }).then((productoReducido) => {
                    crearCompra()
                }).catch((error) => {
                    res.status(500).json({
                        ok : false,
                        content : error,
                        message : "Ocurrio un error al tratar de comprar el producto deseado"
                    })
                })
            }

            else{
                res.status(404).json({
                    ok : false,
                    content : null,
                    message : "el producto que se desea comprar no existe"
                })
            }
        }).catch((error) => {
            res.status(500).json({
                ok : false,
                content : error,
                message : "Ocurrio un error al tratar de comprar el producto deseado"
            })
        })
    }

    const validarProducto = () => {
        Producto.findByPk(req.params.id).then((productoEncontrado) => {
            if (productoEncontrado){
                if (productoEncontrado.stock === 0){
                    res.status(404).json({
                        ok : false,
                        content : null,
                        message : "el producto que se desea comprar esta agotado"
                    })
                }

                else{
                    reducirStock()
                }
            }

            else{
                res.status(404).json({
                    ok : false,
                    content : null,
                    message : "el producto que se desea comprar no existe"
                })
            }
        }).catch((error) => {
            res.status(500).json({
                ok : false,
                content : error,
                message : "Ocurrio un error al tratar de comprar el producto deseado"
            })
        })
    }

    const validarUsuario = () => {
        Usuario.findByPk(req.body.usuarioId).then((usuarioEncontrado) => {
            if (usuarioEncontrado){
                validarProducto()
            }

            else{
                res.status(404).json({
                    ok : false,
                    content : null,
                    message : "el usuario que desea comprar el producto no existe"
                })
            }
        }).catch((error) => {
            res.status(500).json({
                ok : false,
                content : error,
                message : "Ocurrio un error al tratar de comprar el producto deseado"
            })
        })
    }

    validarUsuario()
};

module.exports = {
    comprarProducto
}