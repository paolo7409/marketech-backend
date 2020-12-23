const { Producto } = require("../config/Sequelize");
const { Usuario } = require("../config/Sequelize");
const { Categoria } = require("../config/Sequelize");

const obtenerProductosdeCategoria = (req, res) => {
  const verificarEstado = () => {
    Producto.findAll({ where: { estado: 1 } })
      .then((resultado) => {
        let productosenventa = "";
        productosenventa = resultado.filter((producto) => producto.stock >= 1);

        res.status(200).json({
          ok: true,
          content: productosenventa,
          message: "Productos encontrados con éxito",
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

  const verificarCategoria = () => {
    Categoria.findOne({ where: { nombre: req.params.nombre } })
      .then((resultado) => {
        if (resultado) {
          verificarEstado();
        } else {
          res.status(404).json({
            ok: false,
            content: null,
            message:
              "La categoria de la cual se desean obtener sus productos no existe",
          });
        }
      })
      .catch((error) => {
        res.status(500).json({
          ok: false,
          content: error,
          message:
            "Ocurrio un error al tratar de obtener los productos de la categoria buscada",
        });
      });
  };

  verificarCategoria();
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
  obtenerProductosdeCategoria,
  insertarProducto,
  actualizarProducto,
  eliminarProducto,
};
