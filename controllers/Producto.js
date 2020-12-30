const { Producto } = require("../config/Sequelize");
const { Usuario } = require("../config/Sequelize");
const { Categoria } = require("../config/Sequelize");

const obtenerProductos = (req, res) => {
  
  const myWhere = {};
  if('categoria' in req.query)
    myWhere['id_categoria'] = req.query.categoria;
  myWhere['estado'] = 1;

  const myOrder = [];
  if('order' in req.query && 'campo' in req.query)
    myOrder.push([req.query.campo, req.query.order]);

  Producto.findAll({ 
    where: myWhere,
    order: myOrder
  })
    .then((resultado) => {
        res.status(200).json({
          ok: true,
          content: resultado,
          message: "Éxito.",
        });

    })
    .catch((error) => {
      res.status(500).json({
        ok: false,
        content: error,
        message: "Ocurrio un error.",
      });
    });
};

const insertarProducto = (req, res) => {

  const CrearProducto = () => {
    let producto = Producto.build(req.body);
    producto
      .save()
      .then((resultado) => {
        return res.status(201).json({
          ok: true,
          content: resultado,
          message: "Producto creado exitosamente",
        });
      })
      .catch((error) => {
        return res.status(500).json({
          ok: false,
          content: error,
          message: "Ocurrio un error al tratar de crear el producto",
        });
      });
  };

  const ValidarNombre = () => {
    Producto.findOne({ where: { nombre: req.body.nombre } })
      .then((productoEncontrado) => {
        if (productoEncontrado) {
          res.status(400).json({
            ok: false,
            content: null,
            message: "el nombre ingresado ya esta en uso",
          });
        } else {
          CrearProducto()
        }
      })
      .catch((error) => {
        return res.status(500).json({
          ok: false,
          content: error,
          message: "Ocurrio un error al tratar de crear el producto",
        });
      });
  };

  const ValidarCategoria = () => {
    Categoria.findByPk(req.body.id_categoria)
      .then((categoriaEncontrada) => {
        if (categoriaEncontrada) {
          ValidarNombre();
        } else {
          return res.status(404).json({
            ok: false,
            content: null,
            message: "la categoria no existe",
          });
        }
      })
      .catch((error) => {
        return res.status(500).json({
          ok: false,
          content: error,
          message: "Ocurrio un error al tratar de crear el producto",
        });
      });
  };

  Usuario.findByPk(req.body.id_usuario)
    .then((usuarioEncontrado) => {
      if (usuarioEncontrado) {
        ValidarCategoria();
      } else {
        return res.status(404).json({
          ok: false,
          content: null,
          message: "el usuario no existe",
        });
      }
    })
    .catch((error) => {
      return res.status(500).json({
        ok: false,
        content: error,
        message: "Ocurrio un error al tratar de crear el producto",
      });
    });
};

const actualizarProducto = (req, res) => {
  
  const ValidarNombreRepetido = () => {
    Producto.findOne({ where: { nombre: req.body.nombre } })
      .then((productoEncontrado) => {
        if (productoEncontrado) {
          return res.status(400).json({
            ok: true,
            content: null,
            message: "el nombre ingresado ya esta en uso",
          });
        } else {
          Producto.findByPk(req.params.id).then((producto_encontrado) => {
            Producto.update(req.body, {
              where: {
                id: producto_encontrado.id,
              },
            })
              .then((resultado) => {
                return res.status(200).json({
                  ok: true,
                  content: resultado,
                  message: "Producto actualizado exitosamente",
                });
              })
              .catch((error) => {
                return res.status(500).json({
                  ok: false,
                  content: error,
                  message:
                    "Ocurrió un problema al tratar de actualizar el producto",
                });
              });
          });
        }
      }).catch((error) => {
        return res.status(500).json({
          ok: false,
          content: error,
          message: "Ocurrió un problema al tratar de actualizar el producto",
        });
      });
  };

  Producto.findByPk(req.params.id).then((productoEncontrado) => {
    if (productoEncontrado){
      ValidarNombreRepetido();
    }

    else{
      res.status(404).json({
        ok : false,
        content : null,
        message : "El producto que se desea actualizar no existe"
      })
    }

  }).catch((error) => {
    return res.status(500).json({
      ok: false,
      content: error,
      message: "Ocurrió un problema al tratar de actualizar el producto",
    });
  });
};

const eliminarProducto = (req, res) => {
  Producto.findOne({ where: { id: req.params.id } }).then(
    (producto_encontrado) => {
      Producto.update(
        { estado: 0 },
        {
          where: {
            id: producto_encontrado.id,
          },
        }
      )
        .then((resultado) => {
          return res.status(200).json({
            ok: true,
            content: resultado,
            message: "Producto eliminado exitosamente",
          });
        })
        .catch((error) => {
          return res.status(500).json({
            ok: false,
            content: error,
            message: "Ocurrió un problema al tratar de eliminar el producto deseado",
          });
        });
    }
  );
};

module.exports = {
  obtenerProductos,
  insertarProducto,
  actualizarProducto,
  eliminarProducto,
};
