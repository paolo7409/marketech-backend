const {Compra} = require("../config/Sequelize")
const {Pedido} = require("../config/Sequelize")
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

const mercadopago = require("mercadopago");
mercadopago.configure({
    access_token: "TEST-4696634682935543-122807-d8f59d2542d8dd6f8145afc475b0030a-694179998",
})
//COMPRADOR EMAIL: test_user_57152140@testuser.com
//VISA: 4009 1753 3280 6176
const procesar = async (req, res) => {
    var preference = {
        back_urls: {
            success: `${req.get("host")}/compra/success`,
            pending: `${req.get("host")}/compra/pending`,
            failure: `${req.get("host")}/compra/failure`
        },
        /*
        items: [
          {
            title: 'Test',
            quantity: 1,
            currency_id: 'ARS',
            unit_price: 10.5
          }
        ]*/
        items: req.body
      };
      
    let respuesta = await mercadopago.preferences.create(preference)
    console.log(respuesta.body);
    req.query.init_point = respuesta.body.init_point;
    req.query.id = respuesta.body.id;
    res.status(200).send(req.query);
    let precio_total = 0;
    for (let i = 0; i < req.body.length; i++) {
        precio_total += req.body[i].unit_price * req.body[i].quantity;
    }

    let pedido = Pedido.build({
        id_usuario: 1,
        codigo: respuesta.body.id,
        precio_total: precio_total,
        estado_pedido: "Pendiente",
        estado: 1,
    });
    pedido
      .save()
      .catch((error) => {
        console.log(error)
      });
    /*
    res.status(500).json({
        ok : true,
        content : '',
        message : "Endpoint de prueba"
    })
    */
}

const success = async (req, res) => {
    Pedido.update({estado_pedido: "Pagado"}, {
        where: {
          codigo: req.query.preference_id,
        },
      })
        .then((resultado) => {
          return res.status(200).json({
            ok: true,
            content: resultado,
            message: "Pago registrado con éxito.",
          });
        })
        .catch((error) => {
          return res.status(500).json({
            ok: false,
            content: error,
            message:
              "Ocurrió un problema al tratar de registrar su pago.",
          });
        });
}

const pending = async (req, res) => {
    res.status(200).send(req.query)
}

const failure = async (req, res) => {
    Pedido.update({estado_pedido: "Cancelado"}, {
        where: {
          codigo: req.query.preference_id,
        },
      })
        .then((resultado) => {
          return res.status(200).json({
            ok: true,
            content: resultado,
            message: "Pago registrado con éxito.",
          });
        })
        .catch((error) => {
          return res.status(500).json({
            ok: false,
            content: error,
            message:
              "Ocurrió un problema al tratar de registrar su pago.",
          });
        });
}

const notificaciones = async (req, res) => {
    console.log(req.query);
    // mercado pago tambien manda informacion por el BODY
    console.log(req.body);
    res.status(200).send("ok")
}

module.exports = {
    comprarProducto,
    procesar,
    success,
    pending,
    failure,
    notificaciones
}